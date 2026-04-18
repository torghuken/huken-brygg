import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

const GRAPH_API = "https://graph.facebook.com/v25.0";

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pageToken = process.env.META_PAGE_ACCESS_TOKEN;
  const igUserId = process.env.META_INSTAGRAM_USER_ID;

  if (!pageToken || !igUserId) {
    return NextResponse.json(
      { error: "Missing META_PAGE_ACCESS_TOKEN or META_INSTAGRAM_USER_ID" },
      { status: 500 }
    );
  }

  try {
    // Fetch latest 12 posts from Instagram Business Account
    const url = `${GRAPH_API}/${igUserId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${pageToken}`;
    const res = await fetch(url);

    if (!res.ok) {
      const err = await res.json();
      console.error("Instagram API error:", err);
      return NextResponse.json(
        { error: "Instagram API error", details: err },
        { status: 502 }
      );
    }

    const data = await res.json();
    const posts = data.data || [];

    let upserted = 0;

    for (const post of posts) {
      const { error } = await supabaseAdmin.from("instagram_posts").upsert(
        {
          id: post.id,
          caption: post.caption || null,
          media_type: post.media_type,
          media_url: post.media_url,
          thumbnail_url: post.thumbnail_url || null,
          permalink: post.permalink,
          timestamp: post.timestamp,
          synced_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) {
        console.error("Supabase upsert error:", error);
      } else {
        upserted++;
      }
    }

    // Clean up old posts (keep only latest 12)
    const { data: allPosts } = await supabaseAdmin
      .from("instagram_posts")
      .select("id")
      .order("timestamp", { ascending: false });

    if (allPosts && allPosts.length > 12) {
      const toDelete = allPosts.slice(12).map((p) => p.id);
      await supabaseAdmin
        .from("instagram_posts")
        .delete()
        .in("id", toDelete);
    }

    return NextResponse.json({
      success: true,
      fetched: posts.length,
      upserted,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Sync instagram error:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
