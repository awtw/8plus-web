import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

import { posts, projects, episodes } from ".velite";
import { publicContent } from "@/lib/publication";

const staticRoutes = [
  "",
  "/lab",
  "/about",
  "/services",
  "/training",
  "/career",
  "/check",
  "/path",
  "/blog",
  "/booking",
  "/show",
  "/show/ask",
];

type Entry = { url: string; date?: string };

const latest = (dates: (string | undefined)[]) =>
  dates.filter((d): d is string => Boolean(d)).sort().at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPosts = publicContent(posts);
  const publicProjects = publicContent(projects);
  const publicEpisodes = publicContent(episodes);

  // lastmod must reflect real content changes; Google ignores it when it is always "now".
  const listingDates: Record<string, string | undefined> = {
    "": latest(publicPosts.map((p) => p.date)),
    "/blog": latest(publicPosts.map((p) => p.date)),
    "/lab": latest(publicProjects.map((p) => p.date)),
    "/show": latest(publicEpisodes.map((e) => e.publishedAt)),
  };

  const entries: Entry[] = [
    ...staticRoutes.map((url) => ({ url, date: listingDates[url] })),
    ...publicPosts.map((p) => ({ url: p.url, date: p.date })),
    ...publicProjects.map((p) => ({ url: p.url, date: p.date })),
    ...publicEpisodes.map((e) => ({ url: e.url, date: e.publishedAt })),
  ];

  const byUrl = new Map<string, Entry>();
  for (const entry of entries) {
    if (!byUrl.has(entry.url)) byUrl.set(entry.url, entry);
  }

  return [...byUrl.values()].map(({ url, date }) => ({
    url: `${SITE.url}${url}`,
    ...(date ? { lastModified: new Date(date) } : {}),
    changeFrequency: url === "" || url === "/blog" ? "weekly" : "monthly",
    priority: url === "" ? 1 : url === "/booking" ? 0.9 : 0.7,
  }));
}
