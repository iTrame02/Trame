import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/merci", "/v2"] },
    sitemap: "https://www.itrame.ch/sitemap.xml",
  };
}
