
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    summary: { type: 'string', required: true },
    thumbnail: { type: 'string', required: false },
    published: { type: 'boolean', default: true },
    protected: { type: 'boolean', default: false },
    slug: { type: 'string', required: true }
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/blog/${doc.slug}` }
  }
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    role: { type: 'string', required: false },
    stack: { type: 'list', of: { type: 'string' } },
    period: { type: 'string', required: false },
    highlights: { type: 'list', of: { type: 'string' } },
    links: { type: 'json', required: false },
    summary: { type: 'string', required: true },
    thumbnail: { type: 'string', required: false },
    published: { type: 'boolean', default: true }
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/projects/${doc.slug}` }
  }
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Project],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ]
  },
  disableImportAliasWarning: true
});
