import { defineConfig, defineCollection, s } from "velite";
import { publicContent } from "./lib/publication";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const posts = defineCollection({
  name: "Post",
  pattern: "content/posts/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      date: s.isodate(),
      tags: s.array(s.string()).optional(),
      summary: s.string(),
      thumbnail: s.string().optional(),
      published: s.boolean().default(true),
      protected: s.boolean().default(false),
      // 'note' = short Field Note (status update); 'article' = long-form post
      kind: s.enum(["article", "note"]).default("article"),
      slug: s.string(),
      locale: s
        .enum(["zh-TW", "zh-Hant", "en"])
        .default("zh-TW")
        .transform((value) => (value === "zh-Hant" ? "zh-TW" : value)),
      html: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      url: `/blog/${data.slug}`,
    })),
});

const projects = defineCollection({
  name: "Project",
  pattern: "content/projects/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.string(),
      baseSlug: s.string().optional(), // 基礎 slug，用於關聯同一項目的不同語言版本
      role: s.string().optional(),
      stack: s.array(s.string()).optional(),
      period: s.string().optional(),
      highlights: s.array(s.string()).optional(),
      links: s.record(s.string()).optional(),
      type: s.enum(["project", "case-study"]).default("project"),
      challenge: s.string().optional(),
      solution: s.string().optional(),
      client: s.string().optional(),
      featured: s.boolean().default(false),
      resultMetrics: s
        .array(
          s.object({
            label: s.string(),
            value: s.string(),
          }),
        )
        .optional(),
      summary: s.string(),
      thumbnail: s.string().optional(),
      published: s.boolean().default(true),
      protected: s.boolean().default(false),
      date: s.isodate().optional(),
      locale: s.string().default("zh-TW"),
      html: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      url: `/lab/${data.slug}`,
    })),
});

const mediaUrl = s
  .string()
  .url()
  .refine((value) => {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      [
        "youtube.com",
        "www.youtube.com",
        "youtu.be",
        "open.spotify.com",
        "podcasts.apple.com",
        "open.firstory.me",
        "player.soundon.fm",
      ].includes(url.hostname)
    );
  }, "Use a supported HTTPS media platform URL");
const episodes = defineCollection({
  name: "Episode",
  pattern: "content/episodes/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .refine((value) => !["ask", "about"].includes(value), "Reserved slug"),
      summary: s.string(),
      locale: s.enum(["zh-TW", "en"]).default("zh-TW"),
      season: s.number().int().min(0).default(0),
      episodeNumber: s.number().int().positive(),
      bucket: s.enum(["BUG", "TECH", "LIFE", "ASK"]),
      status: s.enum(["planned", "recorded", "published"]).default("planned"),
      published: s.boolean().default(true),
      protected: s.boolean().default(false),
      publishedAt: s.isodate().optional(),
      cover: s.string().default("/images/show/ling8-cover.webp"),
      coverAlt: s.string().default("靈機8動 · LING8"),
      videoUrl: mediaUrl.optional(),
      audioUrl: mediaUrl.optional(),
      durationSeconds: s.number().int().positive().optional(),
      chapters: s
        .array(
          s.object({ timeSeconds: s.number().int().min(0), title: s.string() }),
        )
        .default([]),
      sources: s
        .array(
          s.object({
            label: s.string(),
            url: s
              .string()
              .url()
              .refine((value) => value.startsWith("https://")),
            checkedAt: s.isodate(),
          }),
        )
        .default([]),
      transcript: s.string().optional(),
      relatedPostSlugs: s.array(s.string()).default([]),
      html: s.markdown(),
    })
    .superRefine((data, ctx) => {
      if (
        data.status === "published" &&
        (!data.publishedAt || (!data.videoUrl && !data.audioUrl))
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Published episodes need a date and a real media URL",
        });
      }
      if (
        data.chapters.some(
          (chapter, index) =>
            (index > 0 &&
              chapter.timeSeconds <= data.chapters[index - 1].timeSeconds) ||
            (data.durationSeconds !== undefined &&
              chapter.timeSeconds >= data.durationSeconds),
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Chapters must be ordered and within duration",
        });
      }
    })
    .transform((data) => ({ ...data, url: `/show/${data.slug}` })),
});

export default defineConfig({
  root: ".",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, projects, episodes },
  prepare(data) {
    const episodeSlugs = new Set<string>();
    for (const episode of data.episodes) {
      if (episodeSlugs.has(episode.slug)) {
        throw new Error(`Duplicate episode slug: ${episode.slug}. Use a unique slug for each language.`);
      }
      episodeSlugs.add(episode.slug);
    }
    data.posts = publicContent(data.posts);
    data.projects = publicContent(data.projects);
    data.episodes = publicContent(data.episodes);
  },
  mdx: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
});
