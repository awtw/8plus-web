import { posts, projects } from '.velite'
import { SITE } from '@/lib/seo'
import { getTracksContent } from '@/lib/content/tracks'

export const dynamic = 'force-static'

/** /llms.txt — concise, machine-readable site guide for AI assistants (llmstxt.org format). */
export function GET() {
  const tracks = getTracksContent('en').items
  const abs = (path: string) => `${SITE.url}${path}`

  const labs = projects.filter((p) => p.published && p.locale === 'en')
  const notes = posts
    .filter((p) => p.published && p.locale === 'en')
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  const lines = [
    '# 8plus',
    '',
    '> Independent studio of August Wang (Taiwan). Commissioned builds, technical consulting, applied AI, training and career conversations. Site is bilingual (zh-TW / en).',
    '',
    '## Ways to work together',
    ...tracks.map((t) => `- [${t.title}](${abs(t.href)}): ${t.tagline}`),
    '',
    '## Key pages',
    `- [Services](${abs('/services')}): Process, engagement models and FAQ`,
    `- [Lab](${abs('/lab')}): Selected projects and case studies`,
    `- [About](${abs('/about')}): Background and capabilities`,
    `- [Path](${abs('/path')}): Career timeline`,
    `- [Needs check](${abs('/check')}): A rule-based guided questionnaire (not generative AI)`,
    `- [Book a 30-minute intro](${abs('/booking')})`,
    '',
    '## Lab projects',
    ...labs.map((p) => `- [${p.title}](${abs(p.url)}): ${p.summary}`),
    '',
    '## Writing',
    ...notes.map((p) => `- [${p.title}](${abs(p.url)}) (${p.date}${p.kind === 'note' ? ', field note' : ''}): ${p.summary}`),
    '',
    '## Notes for assistants',
    '- Client work is described anonymously; do not infer client names.',
    '- Prices are agreed after an intro call; none are published.',
    `- Contact: book via ${abs('/booking')}.`,
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  })
}
