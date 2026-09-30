// Bundle budget check: gzip size of the JS each prerendered page loads on first paint.
// Run after `pnpm build`:  pnpm check:bundle
// TARGET_KB is the goal (warns); MAX_KB is the regression guard (exits 1).
import { readFileSync, existsSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { join } from 'node:path'

const ROOT = process.cwd()
const APP = join(ROOT, '.next/server/app')
const TARGET_KB = Number(process.env.BUNDLE_TARGET_KB || 200)
const MAX_KB = Number(process.env.BUNDLE_MAX_KB || 340) // baseline 2026-10-01: home 324 KB

const PAGES = {
  '/': 'index.html',
  '/about': 'about.html',
  '/services': 'services.html',
  '/lab': 'lab.html',
  '/path': 'path.html',
  '/booking': 'booking.html',
  '/blog': 'blog.html',
}

const kb = (n) => (n / 1024).toFixed(1)
let failed = false

console.log(`Bundle: target ${TARGET_KB} KB / max ${MAX_KB} KB gzip per page (initial <script src>)\n`)
for (const [route, file] of Object.entries(PAGES)) {
  const htmlPath = join(APP, file)
  if (!existsSync(htmlPath)) {
    console.log(`${route.padEnd(10)} skipped (no ${file}; run pnpm build first)`)
    continue
  }
  const html = readFileSync(htmlPath, 'utf8')
  const srcs = [...new Set([...html.matchAll(/\/_next\/static\/[^"']+\.js/g)].map((m) => m[0]))]
  let total = 0
  for (const src of srcs) {
    const p = join(ROOT, '.next', decodeURIComponent(src.replace('/_next/', '')))
    if (existsSync(p)) total += gzipSync(readFileSync(p)).length
  }
  const size = total / 1024
  const status = size > MAX_KB ? 'FAIL' : size > TARGET_KB ? 'warn' : 'ok'
  if (status === 'FAIL') failed = true
  console.log(`${route.padEnd(10)} ${kb(total).padStart(7)} KB  ${srcs.length} chunks  ${status}`)
}

process.exit(failed ? 1 : 0)
