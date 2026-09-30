# Codebase Snapshot — 重構前總整理

建立：2026-09-30 23:30 CST｜分支 `feature/claude/2026-07-v3`｜HEAD `badc1cb`｜git 乾淨｜`pnpm typecheck` 通過

## 1. 技術棧
- Next.js 16.2.9（App Router）+ React 19.2 + TypeScript 5.4 + Tailwind 3.4.7（`tailwind.config.js`）
- 內容：Velite（`content/posts`、`content/projects` MDX，中/英各一檔 `*-en.mdx`），輸出 `.velite/`
- 動效：GSAP + ScrollTrigger、framer-motion、three / R3F（幾乎全屬舊 hero 實驗）
- 後端：Supabase（`lib/supabase.ts`）、Server Action `lib/actions/contact.ts`（`CONTACT_WEBHOOK_URL`）、LINE notify、Cal.com embed
- Monorepo：`pnpm-workspace`，`packages/ui`（`@8plus/ui`）
- Build：`pnpm build` = `validate:content` → `velite` → `next build`
- `proxy.ts`（Next 16 middleware）：僅 `/secret` 密碼保護

## 2. 路由（`app/(site)/`）
| 路由 | 狀態 |
|------|------|
| `/` | v2 完成：`HomeScrollRoot` → HeroV2 / About / Lab / Path / Services / Booking |
| `/about` `/path` `/services` `/booking` `/blog(+slug)` | **舊風格，尚未套 v2 CI** |
| `/lab` `/lab/[slug]` | 僅 re-export `projects` 頁（7 行殼）|
| `/projects(+slug)` | 被 `next.config.mjs` 301 → `/lab`，但頁面實作仍在此 |
| `/contact` `/process` `/pricing` | 301 轉走，頁面檔仍在 |
| `/sb` `/sc` | Share 殼（ShareLinkHub，藍/橘 variant）|
| `/share` | 520 行舊頁，301 → `/sb`，死碼 |
| `/admin/login`、`/feed.xml`、sitemap、robots | 在位 |
| `/tool/qrcode` | rewrite → `public/tool/qrcode.html`（2734 行單檔 QR-Beam 工具）|

## 3. Design System 現況
- **SSOT = `8plus Design System/`**（v2 CI，untracked 資料夾，來源資料勿改）：IKB 藍 `#002FA7`、Pantone 橘 `#FE5000`、深夜 `#0A0E1A`；Georgia / Outfit / JetBrains Mono；22px 卡片圓角；藍橘交替 Section
- 並存的舊資料：`design_system/{apple,cohere,elevenlabs,8plus}`（8plus 為 07-09 藍 `#1F4FFF` 橘 `#FF7A18` 版，已與 v2 衝突）、`docs/DESIGN_SYSTEM_SPEC.md`（另一版）
- `styles/globals.css` 為全域 token 入口，含 legacy aurora / lumina / glass 殘留
- `.bg-blue / .bg-orange / .bg-dark` 為區塊場景 class

## 4. 首頁結構（唯一完成的 v2）
- `components/home/hero/hero-v2.tsx`（372 行）+ `hero-backdrops.tsx`
- `components/home/sections/section-{about,lab,path,services,booking}.tsx`
- `home-section-progress-nav.tsx`、`lib/content/home-sections.ts`、`lib/hero/home-editorial-motion.ts`
- i18n：`lib/i18n.ts`（514 行）+ `LanguageProvider`；首頁 locale 為 `zh-TW | en`

## 5. 死碼清單（靜態掃描，無任何 import；刪前建議再驗一次）
- `components/home/`：hero-*（約 21 個舊 hero 實驗）、bento-grid、capabilities-strip、delivery-preview、face-id-visual、featured-case-band、logo-glow、lumina-shell、hero-section
- `components/home/three/`：hero-co-hero-scene、hero-handshake-scene、phase4-lab-panel（其餘 three/* 被 import 鏈仍引用，但源頭多半也是死碼）
- `components/home/sections/`：section-hero、section-blog
- `components/home/scroll-story/`：整組 chapter-* / logo-assembly / scroll-story-root（Phase 3.0 遺留，僅內部互相引用）
- `components/share/`：share-botanical-stage、share-path-timeline
- `lib/hero/*`（各 *-motion.ts）、`lib/three/*`、`lib/content/{hero-line-compose-demos,home-story-chapters,ci-hero-variants,hero-narrative}`
- `app/(site)/share/page.tsx`（301 後不可達）；`projects/`、`contact/`、`process/`、`pricing/` 頁面檔（301 後不可達，但 `lab` 依賴 `projects/page`）
- 依賴可能可瘦身：`three`、`@react-three/*`、`gsap`（首頁仍用）、`framer-motion`（確認用量）

## 6. 已知技術債 / 風險
1. 內頁 v2 CI 未推進（about / path / services / booking / blog / lab）— 見 memory `homepage-v2-progress`
2. `/lab` 依賴 `/projects/page`：刪 projects 前要先搬實作
3. 三套 design token 並存，v2 未取代 `design_system/8plus`
4. i18n 手刻（`lib/i18n.ts` + client `useLanguage`），多數頁面為 `'use client'`，SEO/SSR 受限；`I18N_PLAN.md` 曾規劃 next-intl 遷移未做
5. `public/tool/qrcode.html` 單檔 2.7k 行，獨立於 Next 建置
6. 根目錄雜物：`let`、`lrt`（0 byte）、`igQRCode.jpg`、`lineQRcode.jpg`（與 `public/` 重複）、`tsconfig.tsbuildinfo`（1.2MB，應 gitignore）
7. `.contentlayer/` 舊快取殘留（已改 Velite）
8. `.env.local` 存在（含金鑰，勿提交）
9. 沙盒/他機 `node_modules` 平台不符曾導致 build 失敗，需本機驗證

## 7. 文件地圖
- 進度：`.planning/STATE.md`（Discussion Log 最新 2026-07-13）、`ROADMAP.md`、`PROJECT.md`
- 重設計 SSOT：`.planning/redesign/`（Phase A–D LOCKED，Phase E 進行中）
- 首頁 v2 session：`.planning/call-summaries/2026-07-12-homepage-v2.md`
- 架構/內容：`docs/ARCHITECTURE.md`、`CONTENT_MODEL.md`、`PROJECT_STRUCTURE.md`
- ⚠ STATE.md 頂部 "Current focus" 仍寫 Phase 5.0 Editorial Hero，已過期

## 8. 建議重構順序（待使用者確認）
1. 死碼清理（獨立 commit，`typecheck` + `build` 驗證）
2. Token 收斂：v2 為唯一 SSOT，移除 apple/elevenlabs/cohere 與 `design_system/8plus` 舊版
3. 路由整理：搬 `projects` 實作到 `lab`，刪 301 來源頁與 `/share`
4. 內頁逐頁 v2（about → services → path → booking → lab → blog）
5. i18n / SSR 評估（next-intl）
