# Handoff: 8plus.app v2 — Editorial multi-page site

## Overview
This is the redesigned **8plus.app** personal/consulting site for August Wang (`awtw`), a Taipei-based, bilingual (繁體中文 / English) **architecture-led engineering partner**. The design is an editorial, magazine-style site with a hash-routed multi-page IA, built on the **8plus v2 CI** design system (dual saturated color fields — International Klein Blue `#002FA7` and Pantone Orange `#FE5000` — alternating blue↔orange as you move between pages/sections).

Target codebase to implement in: **`8plus_web`** — a Next.js 15 app (App Router, TypeScript, Tailwind, shadcn/ui, Velite content, Vercel). Content lives in `content/projects/*.mdx`, `lib/content/*.ts`; components in `components/home/`, `components/logo.tsx`; tokens in `styles/globals.css`.

## About the design files
The files in `design_files/` are **design references created in HTML/JSX** (a React-via-Babel prototype that runs standalone in the browser). They are **not production code to copy verbatim** — they demonstrate intended look, layout, copy, IA and interactions. The task is to **recreate these designs in `8plus_web`'s existing Next.js environment**, using its established patterns (App Router pages/routes, server/client components, Tailwind + shadcn/ui, the tokens already in `styles/globals.css`). Where the prototype hardcodes values inline, prefer the codebase's tokens/components.

The prototype simulates routing with **hash routes in a single file** (`ui_kit/index.html` + `ui_kit/ScreensV2.jsx`). In `8plus_web` these map to **real App Router routes** (see IA below).

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy (zh + en), and interactions are all specified. Recreate pixel-close using the codebase's libraries. Exact token values are in `design_files/tokens/` and `design_files/styles.css`, and summarized under **Design Tokens** below.

---

## Information architecture / routing
Single scrolling **home** overview + focused **sub-pages**. Top nav and each section's "了解更多/查看全部" link route to the sub-page. Prototype hash → target route:

| Prototype hash | Route | Page |
|---|---|---|
| `#/` | `/` | Home (scroll overview: Hero → About → Lab → Path → Services → Booking) |
| `#/about` | `/about` | 關於我 — full life-story |
| `#/lab` | `/lab` | 作品集 — project archive grid |
| `#/lab/:id` | `/lab/[slug]` | Single project detail |
| `#/services` | `/services` | 服務 — service cards |
| `#/services/:id` | `/services/[slug]` | Single service detail |
| `#/path` | `/path` | 學職涯歷程 — career timeline |
| `#/booking` | `/booking` | 預約 — full vertical booking page |
| `#/journal` | `/journal` | (reserved — "coming soon" placeholder; blog to be added later) |

- **Section order on the scrolling home**: Hero → **01 STORY 關於我** → **02 LAB 作品集** → **03 PATH 歷程** → **04 SERVICES 服務** → **05 BOOKING 預約**. (JOURNAL is intentionally removed from the home/nav until articles exist; its route is reserved.)
- **Field alternation** (blue↔orange) per section: Hero `blue` → About `orange` → Lab `blue` → Path `orange` → Services `blue` → Booking `blue`. Each field flips `--accent` to the complementary color (blue field → orange accent; orange field → blue accent).
- **Header** is transparent over the hero/field at the top and frosts (dark blur) after scrolling >64px. On sub-pages the scroll container background matches that page's field color so the header + breadcrumb area is seamless (orange pages get an orange top; blue pages a blue top).
- Sub-pages show a slim **back bar**: `← 首頁 / <breadcrumb>`.

---

## Screens / views

### Global chrome
- **Header** (`sticky top:0`, z 50): left = animated 8plus logo + "8plus" wordmark; center-left = nav (關於 / Lab / 歷程 / 服務 / 預約, JetBrains Mono 14px, opacity .75→1 on hover); right = language dropdown (繁中 ▾ / EN). Height 4.5rem. Mobile (<960px per codebase, prototype uses a sheet): hamburger opens a right sheet with the same nav + a booking CTA.
- **Animated logo**: the mark = small circle (cx32 cy29 r18), thick diagonal slash (`M53 9H68L36 91H21L53 9Z`), large circle (cx70 cy64 r28) — geometry **verbatim from `components/logo.tsx`, do not redraw**. Signature animation (home header): small circle + slash white; **large circle filled orange `var(--color-orange)` with a white 2px stroke + orange drop-shadow glow**; two circles gently "breathe" (scale 1↔1.08, 3.2s ease-in-out, staggered .5s), slash opacity sheen. Respect `prefers-reduced-motion`.
- **Footer**: `bg-dark` (deep night) field, hairline top border, logo + wordmark + tagline "架構驅動的技術夥伴 / Architecture-led engineering partner" + © line "© <year> 8plus · Made in Taiwan" + Next.js 15 · Velite · Vercel note.

### Hero (home, blue field)
- Full-viewport section with a switchable animated backdrop (prototype offers 25 variants; the default is `combo` — perspective tunnel + floating work cards). In `8plus_web` use the existing hero background system; a single tasteful animated backdrop is enough.
- Layout is **corner** (content bottom-left, backdrop right): masthead meta row (`8PLUS.APP · TRUST001` … `NO.01 — 2026`, JetBrains Mono 12px uppercase, hairline under) → accent mono kicker `架構驅動 · AI 落地` → serif display H1 (`AI 沒有魔法，只有工程` / `對的架構，接住你的需求`, Georgia display, `clamp(1.7rem,3vw,2.7rem)`, weight 600, line-height 1.2) → two CTAs (`預約諮詢` primary → /booking, `看作品` secondary → /lab) → **A/B/C pillars** as a hairline-divided list (each row: accent-outlined mono badge A/B/C + title 15px/600 + muted desc on its own line):
  - A · 架構先行 — 系統邊界、技術選型、可擴展設計
  - B · AI 導入 — 把 AI 嵌進真實流程，而非展示用
  - C · 落地體驗 — 雲地混合 × LLM／RAG 實際上線
- Scroll cue at bottom: mono "↓ 往下滾動，認識 8plus".
- Pillars are **always A/B/C** (three, never four) — this is a locked CI content rule.

### 01 · STORY 關於我 (`/about`, orange field)
Full polished life story (source: `8plus_web/docs/StoryAboutMe.md`). Centered/left single column:
- Status/kicker mono accent: `AUGUST WANG · awtw · 架構驅動的技術夥伴`
- Serif display headline: `自學驅動的工程之路——從生醫到全端與雲端`
- Lead paragraph (intro).
- **Six chapters** as an editorial numbered list (hairline dividers; left col = mono number + eyebrow label, right col = title 18/600 + body 15.5/300, `line-height 1.85`, `max-width 58ch`): 01 起點·自學與美感 / 02 轉向·交大與第一行程式 / 03 累積·替代役與自建品牌「1914」/ 04 挑戰·純後端與主導技術 / 05 實戰·電商與 SaaS 架構體悟 / 06 現在·自由接案與架構觀. (Chinese + English copy in `ui_kit/ScreensV2.jsx` → `ABOUT_STORY()`.)
- **Belief pull-quote** (left orange/accent 3px border): 「好的架構，創造長期價值；遠勝匆匆上線的短期收益。」
- **工作之外的我** eyebrow + lead + chips: 合唱·歌唱課 / 體操課 / 飛輪教練（持照）/ 追劇·沙發馬鈴薯.
- Booking CTA at the end.

### 02 · LAB 作品集 (`/lab`, blue field)
- Eyebrow growth-arc note: `從青澀無框架 → 設計感動畫 → 商業電商／品牌形象`.
- **Equal-height card grid** (2 cols desktop, `grid-auto-rows: 1fr` so every card is identical height; 1 col mobile). 12 real projects, ordered as a growth arc. Each card: top **thumbnail** (150px, `background-size:cover`, real screenshot from `content` assets; striped placeholder if none) + era Badge + `↗` + title + one-line tag + tech-stack chips. Whole card is a link to the detail route.
- Projects (id / era / title): `r-analysis` 青澀期 R 分析 · `power-bi` 青澀期 Power BI 關聯探索 · `experimentlab` 探索期 醫學分析原型平台 · `1914` 品牌期 1914 精油品牌官網 · `shuyan-art` 品牌期 shuyan_art · `crm-series` 產品期 CRM 設計系列 · `ecommerce-dashboard` 產品期 電商管理後台 · `flash-sale-api` 規模期 Flash Sale API · `smart-community-backend` 規模期 智慧社區後端 · `b18` 品牌形象 b18 品牌官網 · `e-cooperative` 現在 光復協作平台 · `8plus` 現在 8plus 諮詢平台. In `8plus_web` these already exist as `content/projects/*.mdx` — drive the list from Velite, not hardcoded.

### Lab detail (`/lab/[slug]`, blue field)
Back bar → era Badge + `← 所有作品` → title (h2) → summary (`max-width 54ch`) → **screenshot** (full-width, `border-radius 18`, from `public/og/labs/<slug>/web.png`) → two columns: 「

**Links section (updated)**: no longer a full-width orange band. It now sits inside the blue body field as one `glass-card` strip (`padding 22px 26px`, flex-wrap, `gap 16px 28px`): left = small accent dot + mono "連結" label (`flex: none`); right = link pills (transparent, `border 1px solid var(--border)`, hover → `border-color`/`color: var(--accent)`, orange only appears as the accent dot and on hover, not as a background field). Do this for any other "orange band used just to hold 1–2 links" pattern — prefer the inline glass-card strip over a full bleed color section.
我做了什麼」bullet points + 「技術棧」chips → CTAs: `聊聊類似專案` → /booking, and `查看線上作品 ↗` (external `links.website`/`github` from the mdx frontmatter) when present.

### 03 · PATH 歷程 (`/path`, orange field)
Career timeline (`ol`, left hairline rail, dot markers; active item = accent dot + glow). Data from `lib/content/about.ts` / resume content — real roles: 2026 中國信託（法金 AI）高級架構師 (active) · 2025 優配科技 · 2024 台達電子 · 2021 91APP（電商 SaaS、千萬級推播、藍綠部署、多租戶）· 2018 交大 分子醫學與生物工程所. Each row: mono year (accent if active) + period + title + sub-role + desc + tag chips.

### 04 · SERVICES 服務 (`/services`, blue field)
Card grid (2 col), 4 services, each links to detail: A 程式架構諮詢 · B 網站開發 · C 設計包案 · D 整體資訊規劃 (Badge `A · SERVICE` + title + desc + `↗`).

### Service detail (`/services/[slug]`, blue field)
Back bar → Badge + `← 所有服務` → title → desc → three columns: 服務包含 / 合作流程 (numbered) / 交付產出 → CTA `預約 30 分鐘諮詢` → /booking. Content in `SERVICES_DATA()`.

### 05 · BOOKING 預約
Two presentations — **differentiate them**:
- **Home teaser** (blue field): status badge `Available for consulting` on top → SectionHead → lead → two **parallel equal-height cards**: left 「諮詢包含」(3 bullets) | right 「線上預約」preview card (30 分鐘 / Cal Video 視訊 / 台北 GMT+8 + a `前往完整預約頁` button → /booking). Contacts grid below. **No interactive calendar on home.**
- **Full page** (`/booking`, blue field): **vertical single column** (`max-width 820`, centered). Order: status badge (top) → SectionHead (預約 30 分鐘諮詢) → lead → **interactive calendar embed** (a cal.com month_view replica; in `8plus_web` use the real cal.com embed for `august-wang-113/30min`) → 「諮詢包含」card → contacts grid. **No "前往完整預約頁" button** (already on the page).
- **Cal embed** (replica): faux browser chrome bar (`cal.com/august-wang-113/30min`) → three columns: event header (August Wang · 30 分鐘諮詢 · 30分鐘 / Cal Video / 台北 GMT+8, **no avatar**) | month grid (July 2026, weekdays start Sunday, today=8 outlined, selected=9 orange) | when a date is selected, a **third time-slot column** (12h/24h toggle + orange slot buttons; list scrolls internally, `max-height ≈ 245`). Selecting a slot reveals a `下一步` → confirmation ("預約完成"). In production, replace with the live cal.com embed.
- **Contacts** (no public email): LINE `@482ykgdg` · Instagram `@august.yan.terra` · GitHub `github.com/awtw` · **LinkedIn** `https://www.linkedin.com/in/shuyan-wang-0b9370141`.

---

## Interactions & behavior
- **Routing**: nav + section "了解更多/查看全部" + hero CTAs navigate to routes; scroll resets to top on route change. Left/right arrow keys page through scenes (prototype hero only). Sub-pages frost the header.
- **Card hover**: `gradient-border-card` pattern — translateY(-2px), border brightens, gradient hairline reveals, soft shadow (see `effects.css`).
- **Buttons**: pill. Primary = white fill / field-colored text → **hover flips to accent fill**; secondary = transparent + white hairline; link = accent underline.
- **Signature motion budget**: one signature moment per page; everything else restrained. All animation honors `prefers-reduced-motion`.
- **Booking flow state**: `loading` (spinner ~1.1s) → calendar; `sel` (selected day) reveals slot column; `time` (selected slot) reveals confirm; `done` shows the booked confirmation.

## State management
- `lang` ("zh" | "en") — global, drives all copy.
- `route` { page, id } — from hash in prototype; real App Router params in production.
- `scrolled` — boolean for header frost.
- Booking: `sel`, `time`, `done`, `loading`.

## Design tokens (from `styles.css` + `tokens/`)
- **Color fields**: `--color-blue #002FA7`, `--color-orange #FE5000`, `--color-dark #0A0E1A`. `.bg-blue` / `.bg-orange` / `.bg-dark` set `--bg` and flip `--accent` (blue↔orange; dark→orange) + `background: var(--bg)`.
- **Text on fields**: `--fg #fff`, `--fg-2 rgba(255,255,255,.88)`, `--muted .76`, `--meta .6`. No light mode (`color-scheme: dark`).
- **Surfaces / borders**: `--surface rgba(255,255,255,.08)`, `--surface-warm .12`, `--border .22`, `--border-soft .12`, `--hover-border .5`.
- **Radius**: `--radius-sm 8px` (dialogs), **`--radius-md 22px` (signature — all main cards)**, `--radius-pill` (buttons/badges). Never 16px on main cards.
- **Type**: Display = **Georgia** (serif) → Outfit fallback (H1 `clamp(2.75–4.5rem)`/600/`-0.04em`; H2 `clamp(1.75–3rem)`/400/`-0.03em`). Body/UI = **Outfit** 300–400, 16px/1.6, max 65ch. Labels/eyebrows/section numbers = **JetBrains Mono**, uppercase, `0.12em`. Body never ≥700.
- **Spacing**: 8px grid; 1440px max container; gutter 16→24→32; section rhythm 48/64/80; min touch target 44px.
- **Depth**: hairline rings (`--elev-ring`), not shadows; soft shadow only on hover (`--shadow-hover`).
- **Motion**: `--transition-base: all .35s cubic-bezier(.16,1,.3,1)`; `--motion-fast 150ms` / `--motion-base 200ms`; standard ease `cubic-bezier(.2,0,0,1)`. Logo keyframes `logoBreathe` / `logoSlashSheen` in `tokens/effects.css`.
- Full token source: `design_files/tokens/colors.css · typography.css · spacing.css · effects.css · fonts.css` and `design_files/styles.css`.

## Iconography
- Product/marketing UI: **Phosphor Icons** (`@phosphor-icons/react`, ~16px, `weight="bold"`); shadcn primitives use Lucide internally. Thin monochrome line SVGs (`stroke-width 1.8`, `currentColor`, `fill:none`). The prototype uses a few dependency-free inline SVG/Unicode substitutes — swap back to real Phosphor.
- **Logo is the only original mark** — use `components/logo.tsx` / the SVGs in `public/`, never redraw. Emoji is not an icon system (Unicode arrows `→ ↓` only as light inline marks).

## Copy & voice
- `8plus` always lowercase; `·` is the signature connector. English confident/precise; Chinese professional/direct; address the reader as 「你」. No emoji.
- Canonical hero pairing: 「架構先行，AI 落地 / 把需求交付成可信系統」. Preferred vocabulary and the banned/weakened list are in `DESIGN_SYSTEM.md` (do not reuse the old jokey wuxia/gaming tone).

## Assets
- Logo: `8plus_web/public/logo*.svg`, `favicon.svg`, `og/8plus*.svg`.
- Project screenshots: `8plus_web/public/og/labs/<slug>/web.png` (+ some `content.png`, `line.png`, `analysis.png`). Bundled copies of the ones used are under `design_files/ui_kit/labs/`.
- Fonts: Outfit + JetBrains Mono via `next/font/google`; Georgia is the system serif display (no bundled display webfont).

## Files in this bundle
- `DESIGN_SYSTEM.md` — full 8plus v2 CI spec (tokens, voice, components, do/don't).
- `design_files/ui_kit/` — the HTML/JSX prototype: `index.html` (router + shell), `ScreensV2.jsx.txt` (all sections/pages/data), `ChromeV2.jsx.txt` (header/footer + animated logo), `HeroBackdropsV2.jsx.txt` / `HeroBackdrops2V2.jsx.txt` (hero backdrops), `labs/` (project screenshots). The prototype source carries a `.jsx.txt` suffix (read as normal JSX; `index.html` already loads them via that name, so the prototype still runs if you open it). The design-system component source (Button/Card/Badge/Section/Logo/overlays) is **documented in `DESIGN_SYSTEM.md`** — in the prototype these are lightweight `window`-based shims, so you should use your codebase's real shadcn/ui components rather than porting them.
- `design_files/styles.css` + `design_files/tokens/` — global CSS + design tokens.
- `screenshots/` — 01-home, 02-about, 03-lab, 04-lab-detail, 05-path, 06-services, 07-service-detail, 08-booking.

## Implementation notes for 8plus_web
- Recreate the IA as App Router routes; keep home as the scroll overview that links out.
- Drive Lab from `content/projects/*.mdx` (Velite) and Path/About from `lib/content/*.ts` — don't hardcode the arrays the prototype uses.
- Use the real **cal.com** embed on `/booking` (`august-wang-113/30min`); the replica is only to show layout/flow.
- Enforce field alternation, 22px card radius, serif-display/sans-body/mono-label type, and the A/B/C-only pillar rule.
- The prototype's canvas hero backdrops are optional flourish — pick one tasteful animated backdrop; don't block launch on all 25.
