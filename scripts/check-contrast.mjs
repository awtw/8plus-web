// WCAG contrast check for the CI colour fields (blue / orange / dark).
// Pairs are hand-listed from styles/globals.css tokens. Run: pnpm check:contrast
// Exits 1 when a pair required at AA fails. Composites rgba text over the field colour.

const FIELDS = { blue: '#002FA7', orange: '#FE5000', dark: '#0A0E1A' }

// [label, fg (hex or [hex, alpha]), field, required ratio, known?]
// known = failing today, tracked in .planning/redesign/BASELINE-2026-10-01.md (needs design decision)
// 4.5 = normal text, 3 = large text (>=24px or >=18.66px bold) / UI components
const PAIRS = [
  ['fg on blue', '#FFFFFF', 'blue', 4.5],
  ['fg-2 (88%) on blue', ['#FFFFFF', 0.88], 'blue', 4.5],
  ['muted (76%) on blue', ['#FFFFFF', 0.76], 'blue', 4.5],
  ['accent orange on blue (UI/large)', '#FE5000', 'blue', 3],
  ['fg on orange', '#FFFFFF', 'orange', 4.5, true],
  ['fg-2 (88%) on orange', ['#FFFFFF', 0.88], 'orange', 4.5, true],
  ['muted (76%) on orange', ['#FFFFFF', 0.76], 'orange', 4.5, true],
  ['dark ink on orange', '#0A0E1A', 'orange', 4.5],
  ['accent blue on orange (UI/large)', '#002FA7', 'orange', 3],
  ['fg on dark', '#FFFFFF', 'dark', 4.5],
  ['muted (76%) on dark', ['#FFFFFF', 0.76], 'dark', 4.5],
  ['accent orange on dark', '#FE5000', 'dark', 4.5],
  ['white on accent button (orange)', '#FFFFFF', 'orange', 4.5, true],
]

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const lin = (c) => {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

let failed = false
console.log('pair'.padEnd(38), 'ratio'.padStart(6), ' need  result')
for (const [label, fgSpec, field, need, known] of PAIRS) {
  const bg = rgb(FIELDS[field])
  const [hex, alpha] = Array.isArray(fgSpec) ? fgSpec : [fgSpec, 1]
  const fg = rgb(hex).map((c, i) => Math.round(c * alpha + bg[i] * (1 - alpha)))
  const r = ratio(fg, bg)
  const ok = r >= need
  if (!ok && !known) failed = true
  console.log(label.padEnd(38), r.toFixed(2).padStart(6), String(need).padStart(5), ' ', ok ? 'pass' : known ? 'KNOWN' : 'FAIL')
}
process.exit(failed ? 1 : 0)
