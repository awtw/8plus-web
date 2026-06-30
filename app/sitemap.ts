import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

const staticRoutes = [
  "",
  "/services",
  "/projects",
  "/blog",
  "/about",
  "/booking",
  "/path",
  "/contact",
  "/process",
  "/pricing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/booking" ? 0.9 : 0.7,
  }));
}
