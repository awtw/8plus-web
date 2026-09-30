/** Reading time (minutes) from rendered HTML: CJK ~400 chars/min, Latin ~220 words/min. */
export function readingMinutes(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ')
  const cjk = (text.match(/[㐀-鿿豈-﫿]/g) ?? []).length
  const latin = (text.replace(/[㐀-鿿豈-﫿]/g, ' ').match(/[A-Za-z0-9]+/g) ?? []).length
  return Math.max(1, Math.round(cjk / 400 + latin / 220))
}

export type TocItem = { id: string; text: string }

/** h2 headings (ids come from rehype-slug). */
export function extractToc(html: string): TocItem[] {
  return [...html.matchAll(/<h2[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, '').trim(),
  }))
}
