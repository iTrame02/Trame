import type { MetadataRoute } from "next";

const SITE = "https://www.itrame.ch";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/projets", priority: 0.9 },
    { path: "/tarifs", priority: 0.8 },
    { path: "/a-propos", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
