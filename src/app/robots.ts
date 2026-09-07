import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    ],
    sitemap: "https://hukenbrygg.no/sitemap.xml",
    host: "https://hukenbrygg.no",
  };
}
