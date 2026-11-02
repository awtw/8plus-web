import { posts } from ".velite";
import { isPublicContent } from "@/lib/publication";
import { blogContent } from "@/lib/content/blog";
import { SITE } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS 2.0 feed of one locale's public posts (also the source for RSS-to-email). */
export function feedResponse(locale: Locale, path: string) {
  const c = blogContent[locale];
  const published = posts
    .filter((post) => post.locale === locale && isPublicContent(post))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 20);

  const items = published
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE.url}${post.url}</link>
      <guid isPermaLink="true">${SITE.url}${post.url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(c.categories[post.category].label)}</category>
      <description>${escapeXml(post.summary)}</description>
    </item>`,
    )
    .join("");

  const title = locale === "en" ? `${SITE.name} Blog (English)` : `${SITE.name} 技術博客`;
  const lastBuild = published[0] ? `\n    <lastBuildDate>${new Date(published[0].date).toUTCString()}</lastBuildDate>` : "";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${SITE.url}/blog</link>
    <atom:link href="${SITE.url}${path}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE.description)}</description>
    <language>${locale === "en" ? "en" : "zh-TW"}</language>${lastBuild}${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
