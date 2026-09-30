// Generate lightweight web.webp thumbnails (max 960px wide) from public/og/labs/<id>/.
// Source: web.png, else the first fallback listed below.
// Run: node scripts/generate-lab-thumbs.mjs
import { readdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const ROOT = join(process.cwd(), 'public/og/labs')
for (const id of readdirSync(ROOT)) {
  const src = ['web.png', `${id}.png`, `${id}.jpeg`, `${id}.jpg`].map((f) => join(ROOT, id, f)).find(existsSync)
  if (!src) continue
  const out = join(ROOT, id, 'web.webp')
  await sharp(src).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out)
  console.log(id.padEnd(24), `${Math.round(statSync(src).size / 1024)}KB -> ${Math.round(statSync(out).size / 1024)}KB`)
}
