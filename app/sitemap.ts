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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = new Set([...staticRoutes, ...publicContent(posts).map(p => p.url), ...publicContent(projects).map(p => p.url), ...publicContent(episodes).map(p => p.url)]);
  return [...routes].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/booking" ? 0.9 : 0.7,
  }));
}
