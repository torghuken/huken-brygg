import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

const GRAPH_API = "https://graph.facebook.com/v25.0";

export async function GET(req: NextRequest) {
  // Verify cron secret (prevents unauthorized calls)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pageToken = process.env.META_PAGE_ACCESS_TOKEN;
  const pageId = process.env.META_PAGE_ID;

  if (!pageToken || !pageId) {
    return NextResponse.json(
      { error: "Missing META_PAGE_ACCESS_TOKEN or META_PAGE_ID" },
      { status: 500 }
    );
  }

  try {
    // Fetch upcoming events from Facebook Page
    const url = `${GRAPH_API}/${pageId}/events?fields=id,name,description,start_time,end_time,cover,place&time_filter=upcoming&access_token=${pageToken}`;
    const res = await fetch(url);

    if (!res.ok) {
      const err = await res.json();
      console.error("Facebook API error:", err);
      return NextResponse.json(
        { error: "Facebook API error", details: err },
        { status: 502 }
      );
    }

    const data = await res.json();
    const events = data.data || [];

    let upserted = 0;

    for (const event of events) {
      const { error } = await supabaseAdmin.from("events").upsert(
        {
          facebook_event_id: event.id,
          title: event.name,
          description: event.description || null,
          start_time: event.start_time,
          end_time: event.end_time || null,
          cover_url: event.cover?.source || null,
          place: event.place?.name || null,
          synced_at: new Date().toISOString(),
        },
        { onConflict: "facebook_event_id" }
      );

      if (error) {
        console.error("Supabase upsert error:", error);
      } else {
        upserted++;
      }
    }

    return NextResponse.json({
      success: true,
      fetched: events.length,
      upserted,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Sync facebook error:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
