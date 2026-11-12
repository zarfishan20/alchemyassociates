import type { MetadataRoute } from "next";

const siteUrl = "https://www.alchemyassociates.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV !== "production") {
    return [];
  }

  const pages = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/news", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  return pages.map((page) => ({
    url: new URL(page.path, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
