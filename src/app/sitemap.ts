import type { MetadataRoute } from "next";

const SITE = "https://hukenbrygg.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/restaurant`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/late-night-food`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/cocktails`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/meny`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
