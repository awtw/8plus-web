import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /sb and /sc are indexable since 2026-11-13 (see docs/SHARE_HUBS.md).
      disallow: ["/admin/", "/share", "/tool"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
