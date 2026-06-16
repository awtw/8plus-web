import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const files = [
  'app/(site)/page.tsx',
  'app/(site)/about/page.tsx',
  'app/(site)/share/page.tsx',
  'app/(site)/path/page.tsx',
  'components/site-header.tsx',
  'components/mobile-nav.tsx',
  'lib/i18n.ts',
  'app/layout.tsx',
]

const projectDir = path.join(root, 'content/projects')

const forbidden = [
  { name: 'old name', re: /王中禹/ },
  { name: 'resume zh link', re: /1n5j7DQ7-O0W9BnqM7AflffGT8C3yat62rQTz9QpyahA/ },
  { name: 'resume en link', re: /1G26EC_crJEpGAyD40WY-l67m1osq_uG2bI3P5eKOjQs/ },
  { name: 'linkedin link', re: /linkedin\.com\/in\//i },
  { name: 'wrong thesis', re: /AI 輔助之胸部 X 光影像分析 — 以深度學習偵測肺結節/ },
  { name: 'wrong thesis en', re: /AI-Assisted Chest X-Ray Analysis for Pulmonary Nodule Detection/ },
  { name: 'old years zh', re: /5\+ 年/ },
  { name: 'old years en', re: /5\+ Years/ },
  { name: 'placeholder summary', re: /此為預設內容，作為 SideProjects 條目與連結的佔位。/ },
]

const required = [
  { name: 'archive label', file: 'app/(site)/page.tsx', re: /Archive/ },
  { name: 'lab label', file: 'app/(site)/page.tsx', re: /\bLab\b/ },
  { name: 'theme toggle provider', file: 'app/layout.tsx', re: /ThemeProvider/ },
]

let failed = false

for (const rel of files) {
  const abs = path.join(root, rel)
  const content = await fs.readFile(abs, 'utf8')

  for (const rule of forbidden) {
    if (rule.re.test(content)) {
      console.error(`[content-check] ${rel}: forbidden pattern found -> ${rule.name}`)
      failed = true
    }
  }
}

for (const rule of required) {
  const content = await fs.readFile(path.join(root, rule.file), 'utf8')
  if (!rule.re.test(content)) {
    console.error(`[content-check] ${rule.file}: missing required pattern -> ${rule.name}`)
    failed = true
  }
}

const projectFiles = (await fs.readdir(projectDir)).filter((file) => file.endsWith('.mdx'))
const projectLocales = new Map()

function frontmatterValue(content, key) {
  const match = content.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, 'm'))
  return match?.[1]?.trim()
}

for (const file of projectFiles) {
  const content = await fs.readFile(path.join(projectDir, file), 'utf8')
  const locale = frontmatterValue(content, 'locale')
  const slug = frontmatterValue(content, 'baseSlug') ?? frontmatterValue(content, 'slug')

  if (!locale || !slug) {
    console.error(`[content-check] content/projects/${file}: missing locale or slug`)
    failed = true
    continue
  }

  const locales = projectLocales.get(slug) ?? new Set()
  locales.add(locale)
  projectLocales.set(slug, locales)
}

for (const [slug, locales] of projectLocales.entries()) {
  if (!locales.has('zh-TW') || !locales.has('en')) {
    console.error(`[content-check] content/projects: Lab locale pair incomplete -> ${slug} (${Array.from(locales).join(', ')})`)
    failed = true
  }
}

if (failed) {
  console.error('[content-check] failed')
  process.exit(1)
}

console.log('[content-check] passed')
