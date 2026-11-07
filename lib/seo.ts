import type { Metadata } from "next";

export const SITE = {
  name: "8plus",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  /** Default <title>: brand plus what the site is, so "8plus" alone isn't the only signal. */
  title: "8plus｜AI 應用與 UIX 顧問 · August Wang",
  description: "AI applications (RAG, on-prem models), UIX and analytics consulting. 以 AI 應用與 UIX 為核心的顧問工作室。",
  /** Raster fallback for social cards (SVG is ignored by most crawlers). */
  ogImage: "/brand/og-8plus.png",
  /** Owner profiles, used as schema.org sameAs so Google can connect the brand to the person. */
  sameAs: ["https://github.com/awtw", "https://www.instagram.com/august.yan.terra/"],
};

/** zh-TW posts use `slug`, their English twins `slug-en`. Returns both URLs when both exist. */
export function postLanguages<T extends { slug: string; locale: string; url: string }>(post: T, all: T[]) {
  const baseSlug = post.slug.replace(/-en$/, "");
  const zh = all.find((p) => p.locale === "zh-TW" && p.slug === baseSlug);
  const en = all.find((p) => p.locale === "en" && p.slug === `${baseSlug}-en`);
  if (!zh || !en) return undefined;
  return { "zh-TW": zh.url, en: en.url, "x-default": zh.url };
}

/** schema.org BreadcrumbList from [name, path] pairs. */
export function breadcrumbLd(items: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE.url}${path}`,
    })),
  };
}

type PageMetaInput = {
  title?: string;
  description: string;
  /** Site-relative path, e.g. "/about". Used for canonical and og:url. */
  path: string;
  images?: string[];
  type?: "website" | "article";
  locale?: string;
  publishedTime?: string;
  /** hreflang alternates, e.g. { "zh-TW": "/blog/x", en: "/blog/x-en" }. */
  languages?: Record<string, string>;
};

/**
 * Per-page metadata with canonical + Open Graph + Twitter card.
 * Child segments inherit `alternates` from layouts, so every indexable route must call this.
 */
export function pageMetadata({ title, description, path, images, type = "website", locale, publishedTime, languages }: PageMetaInput): Metadata {
  const ogTitle = title ? `${title} · ${SITE.name}` : SITE.title;
  const ogImages = images?.length ? images : [SITE.ogImage];
  return {
    ...(title ? { title } : { title: { absolute: SITE.title } }),
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    openGraph: {
      type,
      url: path,
      siteName: SITE.name,
      title: ogTitle,
      description,
      locale: locale === "en" ? "en_US" : "zh_TW",
      images: ogImages,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ogImages,
    },
  };
}
