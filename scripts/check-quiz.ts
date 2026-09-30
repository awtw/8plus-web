// Exhaustive check: every path through the needs-check tree yields a complete outcome (zh + en).
// Run: pnpm check:quiz
import { TRACK_QUESTIONS } from '../lib/quiz/tree'
import { buildOutcome } from '../lib/quiz/outcome'
import type { TrackKey } from '../lib/content/tracks'

let paths = 0
const bad: string[] = []
for (const track of Object.keys(TRACK_QUESTIONS) as TrackKey[]) {
  const [q0, q1, q2] = TRACK_QUESTIONS[track]
  for (const a of q0.options) for (const b of q1.options) for (const c of q2.options) {
    for (const locale of ['zh-TW', 'en'] as const) {
      paths++
      const o = buildOutcome({ track, picks: [a.id, b.id, c.id] }, locale)
      if (!o.headline || !o.scope || !o.firstStep || o.situation.length !== 3 || o.agenda.length === 0 || o.links.length === 0 || o.note.length > 300) {
        bad.push(`${track}/${a.id}/${b.id}/${c.id}/${locale}`)
      }
    }
  }
}
console.log(`${paths} paths checked`)
if (bad.length) { console.error('INCOMPLETE:', bad.slice(0, 10)); process.exit(1) }
