import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const posts = defineCollection({
  name: 'Post',
  pattern: 'content/posts/**/*.mdx',
  schema: s.object({
    title: s.string(),
    date: s.isodate(),
    tags: s.array(s.string()).optional(),
    summary: s.string(),
    thumbnail: s.string().optional(),
    published: s.boolean().default(true),
    protected: s.boolean().default(false),
    slug: s.string(),
    locale: s.string().default('zh-Hant'),
    html: s.markdown()
  }).transform(data => ({
    ...data,
    url: `/blog/${data.slug}`
  }))
})

const projects = defineCollection({
  name: 'Project', 
  pattern: 'content/projects/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.string(),
    baseSlug: s.string().optional(), // 基礎 slug，用於關聯同一項目的不同語言版本
    role: s.string().optional(),
    stack: s.array(s.string()).optional(),
    period: s.string().optional(),
    highlights: s.array(s.string()).optional(),
    links: s.record(s.string()).optional(),
    summary: s.string(),
    thumbnail: s.string().optional(),
    published: s.boolean().default(true),
    locale: s.string().default('zh-TW'),
    html: s.markdown()
  }).transform(data => ({
    ...data,
    url: `/projects/${data.slug}`
  }))
})

export default defineConfig({
  root: '.',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: { posts, projects },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ]
  }
})
