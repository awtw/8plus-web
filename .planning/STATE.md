# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-15)

**Core value:** 展示專業能力、累積技術內容、預約諮詢的個人品牌網站
**Current focus:** v2 CI 重構（分支 `feature/claude/2026-07-v3`）— 首頁 + 內頁（about/services/path/lab/blog）已套 v2；`/booking` 待確認 email 後 commit；next-intl 待決策。快照見 `.planning/CODEBASE-SNAPSHOT-2026-09-30.md`

## Current Position

Phase: **5.0** 首頁 Scroll 敘事重規劃（承接 Phase 4.0 資產）
Plan: PLANNING — `5.0-HOMEPAGE-SCROLL-PLAN.md`
Status: W1 **DRAFT 上線** — `section-hero` = 白底雜誌封面 → 圖框擴張滿版 → 三柱定格；design-lab 全數排除不沿用
Last activity: 2026-07-06 12:27 CST — Hero Editorial Print 實作（`HERO-HOME-EDITORIAL-SPEC.md`）
Progress: [█████░░░░░] W0 完成；W1 DRAFT；W2–W5 待實作

作業記錄：`.planning/HERO-DESIGN-LAB-LOG.md`

## What Was Done

- ✅ **2026-10-01 CST — ESLint 修復 + GA4 追蹤擴充**: 新增 `eslint.config.mjs`（flat config，`eslint-config-next` core-web-vitals + typescript；`.planning`/`docs`/`_bmad` 等排除）；4 條舊碼規則（`no-explicit-any`、`ban-ts-comment`、`no-require-imports`、`set-state-in-effect`）暫降為 warn，`pnpm lint` 0 error / 25 warn。GA 擴充：每事件自帶 `page_type`/`content_slug`/`device_type`/`site_locale`/`visitor_type`/`visit_count`/session 進度；轉換事件帶 `cta_location`/`pages_before_conversion`/`seconds_to_convert`；新事件 `content_view`/`content_read`/`copy_text`/`web_vital`/`not_found`/`js_error`/`session_summary`。`pnpm typecheck` 通過，尚未 DebugView 實測。
- ✅ **2026-10-01 CST — GA4 埋碼 + 動線事件 + 轉換追蹤**: 新 property `G-KF309NTS2D`（`8plus.app`）；`lib/analytics.ts`（`track`/`EVENTS`/Cal 綁定）+ `components/analytics/analytics.tsx`（僅 production 載入，全站點擊委派、scroll/section/engaged、`entry_source` 首觸來源）；Cal `bookingSuccessful` → `booking_complete`；QR/語言切換用 `data-track`；文件 `docs/ANALYTICS.md`。`pnpm typecheck` 通過；待 DebugView 實測 + GA4 後台標 Key events/自訂維度。
- ✅ **2026-07-11 23:43 CST — QR-Beam 行動端 QR 尺寸收斂**: `public/tool/qrcode.html` 將發送 QR 顯示由接近滿版的 640px 上限，改為手機 260–320px、桌機最高 420px；保留 640×640 canvas 輸出解析度。390px viewport 實測顯示 304×304px，`pnpm build` 通過。
- ✅ **2026-07-11 23:55 CST — QR 垂直長圖結果區**: 「合成垂直長圖」完成後顯示預覽 + **下載長圖** 按鈕（避免非同步合成後自動下載被擋）。
- ✅ **2026-07-01 CST — Phase 4.0 W0 IA + 路由**: nav 6 項（lab/about/services/path/blog/booking）；`/lab`；`/sb` `/sc` Share 殼；redirects；booking 併 contact；`pnpm build` 通過。
- ✅ **2026-07-01 CST — Phase 4.0 規劃 LOCKED**: Round 1+2；`BRAND_EXPERIENCE_SPEC`、`4.0-IMPLEMENT-PLAN` 等；commit `6c054ca`。
- ✅ **2026-07-01 CST — Rebranding 路線**: 重構現有 repo，保留 Velite/i18n/SEO；見 Discussion Log。
- ✅ **2026-06-30 CST — Phase 3.0 W1 首頁 scroll prototype**: `components/home/scroll-story/`；Logo 組裝 + Story pin scrub；替換首頁 Hero；`pnpm build` 通過。
- ✅ **2026-06-30 CST — Phase 3.0 W0 基礎設施**: `gsap`；dark `:root`；`forcedTheme=dark`；ThemeToggle 移除；motion 骨架 + `home-scroll.ts`。
- ✅ **2026-06-30 CST — Phase 3.0 Round 3 LOCKED**: GSAP+ScrollTrigger；職涯 timeline 僅 `/path`；i18n 中英；全站 dark 關 ThemeToggle；`MOTION_DESIGN_SPEC.md` LOCKED。
- ✅ **2026-06-30 CST — Phase 3.0 Round 2 設計契約草案**: 參考 [WRK ACF-01](https://www.wrk-timepieces.com/products/acf-01)；首頁 6 章敘事（Logo→Story→Lab→Projects→Services→Connect）；`docs/StoryAboutMe.md` 潤飾四段；動效可自由發揮但錨定 logo 幾何；產出 `docs/MOTION_DESIGN_SPEC.md` DRAFT。
- ✅ **2026-06-30 CST — Phase 3.0 重置與討論啟動**: 使用者要求清除現行視覺迭代；暫停 Phase 2.5；建立 `.planning/phases/3.0-RESET-AND-DISCUSS.md`；更新 `CI_CHECKPOINT.md`、`STATE.md`；未 revert 程式碼。
- ✅ **2026-06-30 CST — Domain Research（文案/排版/動效）**: `bmad-domain-research` 產出 `.planning/research/domain-8plus-web-copy-motion-modernization-research-2026-06-30.md`；核心原則：克制型 AI 感。
- ✅ **2026-06-30 CST — Phase 2.3 Rebrand 實作**: 方案 B（Cohere + Bento）；移除首頁 aurora；`/path` 節點收斂；`/contact` 表單 + Server Action（`CONTACT_WEBHOOK_URL`）；新增 `/process`、`/pricing`；TrustBar、Testimonial、ProcessSteps、BentoGrid；Velite case-study schema；3 專案升級 case study；5 篇新 blog（中英）；RSS `/feed.xml`、sitemap、robots、JSON-LD；Services FAQ；決策見 `.planning/phases/2.3-RESEARCH.md`；`pnpm typecheck`、`pnpm build` 通過。
- ✅ **2026-06-30 CST — Design System 合規掃描**: Winston 完成全站元件/頁面對照 `design_system/cohere` 審查；報告 `docs/DESIGN_SYSTEM_COMPLIANCE_REPORT.md`；整體約 78% 合規；P0：`/` aurora、`/contact` 未收斂。
- ✅ **2026-06-26 17:35 CST — Share i18n + Path 語氣收斂**: Share 全文案抽至 `lib/content/share.ts`，移除頁面 inline `isZh`；Path 中英文 milestone 移除 Resume/遊戲化語氣，改企業化標題與描述；`path.title`/`path.lead` 更新。
- ✅ **2026-06-26 17:25 CST — 內容模組化第二輪**: About 文案抽至 `lib/content/about.ts`；Path milestones 抽至 `lib/content/path-milestones.tsx`；首頁 pillars 改 `i18n`；Path header 企業化 + `t()`；Share QR 改用 `QrDialog`（Escape、Tab 循環、focus 還原）；`pnpm build` 通過。
- ✅ **2026-06-26 17:05 CST — UX 優化建議實作**: 依 `.planning/UX-OPTIMIZATION-REVIEW.md` 完成 P0–P2：共用 `lib/navigation.ts`、i18n 擴充與 `document.lang` 同步、桌面加入 Services、Footer 站內連結、首頁 blog/projects「查看全部」+ 2 則預覽、詳情頁 `DetailCta`、Services/Booking 雙語、Share 隱藏 header、skip-to-main、active nav、`aria-current`、design mode Palette 按鈕、theme 三態、Path `section-shell` 收斂、QR dialog 語意；`pnpm typecheck`、`pnpm build` 通過。
- ✅ **2026-06-26 16:15 CST — UX 優化分析文件**: Sally（BMAD UX Designer）完成全站 UX 盤點，產出 `.planning/UX-OPTIMIZATION-REVIEW.md`；涵蓋 i18n 不一致、導覽 IA、內容探索斷層、Share layout、a11y、design mode 可發現性等 10 項痛點；依 P0/P1/P2 優先級排列 9 組優化方向與 4 項待產品決策。
- ✅ **2026-06-26 15:49 CST — /path 頁面 theme token 優化**: 依使用者要求「優化並且調整」，將 `/path` 中 milestone node 的固定橘/粉/藍/綠/slate 漸層改為 `var(--accent)` + `var(--fg-2)`；年份、period、副標、描述、bullet、tag、底部 CTA 說明與 active 狀態收斂到 `--muted`、`--fg-2`、`--surface`、`--hover-border`、`--primary-action-hover` 等 theme token，移除未使用 icon import。
- ✅ **2026-06-26 15:46 CST — hover / interactive token 收斂**: 依使用者指出 hover 顏色也應跟 theme 走，新增 `--accent-soft`、`--accent-line`、`--accent-glow`、`--hover-bg`、`--hover-bg-strong`、`--hover-border`、`--hover-fg`、`--primary-action-hover`、`--shadow-hover` 等互動 token；將 card hover、ghost/secondary/primary button hover、language/theme menu、mobile/header CTA、首頁 glow、`/share` social card hover 與 `/path` active/CTA 互動狀態改為 theme-aware。
- ✅ **2026-06-26 15:40 CST — 預設 theme 與 light/dark fallback 調整**: 依使用者要求將預設 design mode 從 Studio / ElevenLabs 改回 Classic / Cohere；light/dark mode 維持優先讀取系統 `prefers-color-scheme`，若使用者未手動設定且瀏覽器無法判定系統偏好，則 fallback 為 dark。
- ✅ **2026-06-26 15:31 CST — 首頁定位文案與 dark mode 修正**: 依使用者要求把首頁主文案改為「架構驅動、AI 導入、優秀使用者體驗、可落地交付」；預設 design mode 改為 Studio / ElevenLabs；Logo 改吃 theme CSS 變數，dark mode 下會用 accent 色凸顯；補齊 classic/cohere、paper/apple、studio/elevenlabs 的 dark mode `--page-bg`、文字、卡片、邊框與 logo token；`pnpm typecheck`、`pnpm build`、localhost:3000 HTML 檢查通過。
- ✅ **2026-06-26 13:43 CST — Cohere design system 第一輪落地**: 已將 `styles/globals.css` 改為 Cohere token 基底，補上 22px 卡片語言、白底/冷灰/單一 accent、字體與 body 背景；同步調整 `app/layout.tsx`、`components/site-header.tsx`、`components/site-footer.tsx`、`components/mobile-nav.tsx`、`components/language-switcher.tsx`、`components/theme-toggle.tsx`，並重寫首頁為企業 command deck 風格。
- ✅ **2026-06-26 14:02 CST — 高曝光內容頁第二輪收斂**: 已將 `about`、`booking`、`services`、`projects`、`blog`、`projects/[slug]`、`blog/[slug]` 與 `admin/login` 改寫為 Cohere 風格的白底/冷灰/22px 卡片語言，並把 booking 的服務項目改成更通用的合作主題。
- ✅ **2026-06-26 14:17 CST — share social media 頁面完成**: 已將 `/share` 改為可切換的三套設計模式，分別對應 Cohere、Apple、ElevenLabs；保留原本社群動線、QR 互動與預約 CTA，並可透過 `?view=` 切換。
- ✅ **2026-06-26 13:43 CST — Cohere design system 導入啟動**: 已讀取 `design_system/cohere` 的 `DESIGN-zh-tw.md`、`tokens.css`、`design-tokens.json` 與 `USAGE.md`，確認這次重構要從白底、22px 圓角、冷灰邊框、低彩度結構與 enterprise command deck 語彙切入。
- ✅ **2026-06-16 12:37 CST — 百分比幾何風格 Logo / Favicon 替換**: 依使用者提供的黑白 `%` 風格參考圖，將 8plus Logo 改為透明底黑色雙圓斜槓符號；favicon / apple / OG 資產則使用白底黑符號，維持小尺寸辨識度；同步更新 `components/logo.tsx`、`public/logo-new.svg`、`public/logo-light.svg`、`public/logo-mono.svg`、`public/favicon.svg`、`public/favicon.ico` 與 `public/og/8plus.svg`。
- ✅ **2026-06-15 15:58 CST — Logo 極簡現代化重設計**: 將 8plus Logo 從漸層科技圖標收斂為黑色圓角底、白色雙環 `8` 與藍色 `+` accent；同步更新 header、mobile menu、footer 與 `public/og/8plus.svg`，並完成 `pnpm typecheck`、`pnpm build`、桌機/手機/手機選單截圖驗證。
- ✅ **Bento Grid 首頁重構**: Aurora 動態背景、glassmorphism 卡片、個人名片、技術棧、最新文章/專案、life photo
- ✅ **/about 頁面重寫**: 整合 resume.2025 全部豐富內容 — 關於我、興趣生活、後端/前端/DevOps 技術棧、重要專案、學經歷、學術論文、生活照片牆
- ✅ **/path 職涯時間軸**: 垂直時間軸顯示 2018-2025 里程碑、左/右交替佈局、含標籤與詳細描述
- ✅ **/share 社交名片島**: 行動優先 Link-in-Bio 風格、玻璃質感 UI、GitHub/LinkedIn/LINE QR/WeChat QR、中英文雙語履歷下載、Cal.com 預約
- ✅ **專案內容遷移**: 從 resume2025 導入 15 個 Velite MDX 專案 (crm-series, 8plus, b18, power-bi, 1914 等)
- ✅ **導航更新**: 加入 Path 連結、使用 i18n 翻譯

## Accumulated Context

### Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Bento Grid + Glassmorphism | 最適合行動端 RWD 的現代佈局 | ✓ Good |
| /share 保持隱藏路由 | 僅供社交平台入口使用，不顯示在主導航 | ✓ Good |
| 時間軸 Desktop 交替排版 | 提供最佳桌機閱讀體驗同時保持行動端可用 | ✓ Good |

### Pending / Next Steps (待用戶決定)

- [ ] 是否需要替部分專案補充英文版本 (MDX)
- [ ] 是否需要獨立「Social Media 分享頁」桌面版手機框模擬器
- [ ] 進入 Phase 3 (next-intl 遷移 + 更多內容)

## Session Continuity

Last session: 2026-06-15 15:58 CST
Stopped at: Logo 已改為極簡現代版，建置與截圖驗證完成
Resume file: None

## Discussion Log

### 2026-10-01 00:20 CST — 聯絡方式曝光政策（Claude）

- 使用者決策：官網主要期待是用 Cal.com 日曆預約，其他聯絡方式盡量減少，可保留 GitHub 連結。`/booking` 已移除 email 與 LINE，改放 GitHub（`github.com/awtw`）。
- `/sb`、`/sc` 是社群分享用的縮網址落地頁，**刻意保留** email / LINE / IG；已記錄於 `docs/SHARE_HUBS.md`，並在 `lib/site-paths.ts`、`lib/content/share-links.ts` 加註解，寫入專案記憶。


### 2026-09-30 23:59 CST — 重構前總整理 + 五步重構執行（Claude）

- 使用者要求整理現階段 code 後重構；確認「按順序全部進行」。快照：`.planning/CODEBASE-SNAPSHOT-2026-09-30.md`。
- **1 死碼清理** `8d1008f`：刪約 80 檔（舊 hero、scroll-story、three、lib/hero、lib/three），移除 `three`/`@react-three` 依賴。
- **2 Token 收斂** `8674f04`：`globals.css` 10,194 → 約 1,440 行；刪 `design_system/*`；品牌 SVG 與 QR 工具改 v2 藍橘（`#002FA7`/`#FE5000`）。
- **3 路由整理** `5b6d357`：projects 實作搬入 `/lab`；刪 `/share` `/contact` `/process` `/pricing` 頁面檔（301 保留）；移除 contact form / LINE notify。
- **4 內頁 v2**：共用 `components/page/`（PageSection/PageHeader）；about `0f4d52b`、services `b3a5053`、path `2852197`、lab `1949db8`、blog `7e00d2c` 已 commit；booking 完成但**未 commit**（頁面公開 email `alec.wang.tpe@gmail.com`，待使用者確認）。
- **5 next-intl/SSR 評估**：`.planning/I18N-SSR-EVALUATION-2026-09-30.md`，建議內頁 v2 後採 next-intl `[locale]` 路由。
- 驗證：`pnpm typecheck`、`pnpm build` 通過；桌機 1280 目視各頁正常；390px 無橫向溢出。
- 遺留：`components/ui/*`、`components/motion/*`、`lib/supabase.ts`、`mdx-components`、`locale-script` 目前無引用（保留待判斷）；untracked `public/og/labs/ckd2026/` 來源不明。


### 2026-07-13 13:15 CST — 8plus Design System 現行設計改造啟動（Winston）

- 使用者要求依 `8plus Design System/` 提供的 v2 CI design system 修改現行網站設計，並指定 `bmad-agent-architect`。
- Winston 已啟動並完成 brownfield 初查：保留 Next.js、既有內容模型、雙語與路由；優先從全域設計語言、字級階層、版面節奏、共用元件四層收斂，不重啟新的視覺方向。
- 已確認設計來源：IKB 藍 `#002FA7`、Pantone 橘 `#FE5000`、深夜色 `#0A0E1A`、Georgia／Outfit／JetBrains Mono、22px 卡片圓角、藍橘交替 Section、每頁單一 signature motion。
- 注意：`8plus Design System/` 目前為未追蹤資料夾；實作時只讀取其規範與資產，不改動或覆寫使用者提供的來源資料。
- 依 `bmad-architecture` 強制啟動門檻，待使用者選擇 Coaching／Fast path，並確認本輪交付目的與受眾後開始修改。

### 2026-07-09 CST — 打掉重練重新設計：Phase A–D 鎖定（Claude / Cowork）

- 使用者定調：於 feature 分支打掉重練（設計/內容/CTA/商業/動畫/Logo），靠 Claude 產出完整 system design，Cowork 一階段一階段做。
- **流程 SSOT**：`.planning/redesign/`。原則「先策略→內容→設計→Logo/動畫→重建→部署，鎖了不回頭」，對治歷史 churn。
- **Phase A（策略）LOCKED** `00-STRATEGY-BRIEF.md`：定位/TA/三支柱整併；四決策=不設硬 KPI、CTA 明確+低承諾並存、定價不公開導向預約、中英雙語到底。
- **Phase B（IA/內容）LOCKED** `01-IA-CONTENT.md`：保留現有九頁；路由+301、逐頁內容骨架、轉換動線；首頁七段順序、信任帶用經歷關鍵字。
- **Phase C（設計系統）LOCKED** `02-DESIGN-SYSTEM.md` + `design_system/8plus/tokens.css` + `style-guide.html`：全新方向＝**藍色滿版 #1F4FFF + 橘強調 #FF7A18 + 白字**，四場景 bg-blue/orange/dark/paper，圓角 16px。
- **Phase D（Logo/動畫）LOCKED** `03-LOGO-MOTION.md` + `public/brand/*.svg`：Logo=C2 兩圓+橘斜槓（mark/mono/lockup/favicon/og）；首頁單一 signature=純藍場景「網格建構+Logo 組裝」scroll pin，標語逐行 reveal，reduced-motion 降級。
- **commits**：`ab59599`(階段0) → `acb306e`(A) → `49e6308`(B) → `267a237`/`d26cc12`(C) → `048522a`/`f4a84fe`(D)。分支 `feature/claude/2026-07-v3`。
- **下一步**：Phase E 逐頁重建呈現層（先首頁 Hero）。注意：沙盒 node_modules 為 macOS 版，esbuild 平台不符 → 無法在此跑 velite/next build；tsc + validate-content 可用。頁面視覺需在本機 `pnpm dev` 檢視迭代。

### 2026-07-08 12:40 CST — 階段 0 執行：藍橘單一基底收斂（Claude / Cowork）

- 承接 12:05 定案，使用者選擇「執行階段 0 清理 codebase」。
- **已移除（整團）**：`app/(site)/design-lab/*`（19 路由）、`components/design-lab/*`（21 元件）、`components/home/hero-canvas-stage.tsx`、`lib/hero/visual-modes.ts`、`lib/hero/logo-sampler.ts`、`lib/content/hero-direction-demos.ts`、`components/design-mode-provider.tsx`、`components/design-mode-script.tsx`、`components/logo-theme-launcher.tsx`。確認 design-lab 叢集自成一體，現行首頁走 `HomeScrollRoot → section-hero.tsx`，不受影響。
- **已改**：`app/layout.tsx` 移除 DesignModeProvider/DesignModeScript 與 `data-design-mode="cohere"`；`app/(site)/share/page.tsx` 解除 `useDesignMode` 依賴（`currentMode` 固定 cohere）。
- **Config**：刪除舊 `tailwind.config.ts`（灰黑白殘留），保留 `tailwind.config.js`（shadcn HSL + animate，`components.json` 指向它）。
- **globals.css**：確認 `data-design-mode` 覆寫已為 0（07-06 已清）；`.bg-blue/.bg-orange/.bg-dark` 三變體在位。aurora/lumina/glass legacy 與頁面耦合，留待階段 3 逐頁收斂。
- **規範**：`docs/BRAND_EXPERIENCE_SPEC.md`（Cinema）標 SUPERSEDED；`docs/CI_IDENTITY_SPEC.md`（Cohere）視覺方向標 SUPERSEDED、策略內容續用。
- **驗證**：`tsc --noEmit` 通過（清 `.next/types` 舊快取後）；`scripts/validate-content.mjs` 通過。⚠️ `velite` / `next build` 因沙盒 `node_modules` 為 macOS 安裝、esbuild 平台不符無法在此執行 — 需在本機 Mac 或 Vercel 乾淨安裝驗證。
- **未決 / 下一步**：階段 1 Logo 藍橘定案；階段 2 Hero 二選一；`site-paths.ts` 仍留 `isDesignLab` 死檢查（無害，可日後清）；aurora/lumina 全站收斂（階段 3）。

### 2026-07-08 12:05 CST — 改版方向定案 + 設計師交手 Brief（Claude / Cowork）

- 使用者要求：重新設計 design system / logo / animation / 內容並重新部署；先讀完 `.planning/` 與 `docs/` 全部文件再給綜合建議。
- **診斷**：真正問題是設計決策 churn（反覆重啟），非設計品質；三套 DS（Cohere / 藍橘 CI v2 / Cinema 線框握手）並存無單一 SSOT；Hero 已迭代 15+ 版全數推翻。策略/內容/技術已成熟穩定。
- **LOCKED 決策**：①Design System SSOT = **CI 雙色藍橘**（DESIGN_SYSTEM_SPEC v2，IKB藍 #002FA7 + Pantone橘 #FE5000，單一版本）；其餘兩套與 `design-lab/*` 一併 SUPERSEDED/清除。②動效 = **單一克制 signature**（僅首頁 Hero 一個重動效，內頁輕量 reveal，禁止再開選型牆）。
- **執行藍圖**：階段0 鎖 SSOT+清衝突源 → 1 Logo 定案 → 2 Hero 收斂為一 → 3 全站頁面收斂藍橘 token → 4 內容潤飾 → 5 build+合併 main+Vercel 部署。
- **產出**：`docs/DESIGN_HANDOFF_BRIEF.md`（設計師交手 Brief + IA 完整包，Markdown）；`.planning/SESSION-2026-07-08-REDESIGN-HANDOFF.md`（本 session 完整紀錄）。
- **待決策**：是否執行階段0 清 codebase；Hero 主視覺方向（握手/線框手 vs 純字體幾何）；藍橘交替比例；Hero 底色純藍 vs 暗底；/sb /sc 是否沿用藍橘。

### 2026-07-06 13:33 CST — UX Round 2：外框間距統一 + 移除 Logo 旁 theme picker（Sally）

- 使用者要求：①外框 padding/margin 全站一致（對齊 `docs-2026-07-06-design-spec.md` container token）；②移除 header/mobile Logo 旁 Palette 設計模式選擇器；③Logo 改白標於 IKB 藍底、走 `--logo-mark`。
- 實作：`.section-shell` 改為 `--container-gutter-*` 響應式 token；新增 `LogoHomeLink` 取代 `LogoThemeLauncher`；`Logo` 新增 `brand` variant（`#002FA7` 底 + 白 mark）；footer 同步 `brand` variant。
- `/share` 自有 view switcher 未動；`logo-theme-launcher.tsx` 檔案保留（待後續清理 DesignModeProvider）。

### 2026-07-06 12:55 CST — DS Round 1：全站藍為主、橘作點綴；首頁套用（Sally）

- 使用者決策：①藍 = 全站主視覺色，橘僅交替/按鈕；②逐輪替換。
- Editorial Hero 紙白 → IKB 藍場：白底 handshake 印刷稿「裱在藍牆上」，scroll 擴張不滿版（保留藍 mat + 底帶給三柱）；文字全白。
- 首頁 Booking section 掛 `.bg-orange`（轉換區橘色點綴）；其餘 section 繼承藍底。
- `brand-button-primary:hover` 改 accent 底 + `--accent-on` 文字（藍/橘場皆成立）。
- Round 2 候選：內頁（about/services/blog/booking 頁）逐頁收斂 + header/footer 微調。

### 2026-07-06 12:43 CST — 新 Design System：CI 雙色單一版本（Sally）

- 使用者要求：新 design system；主色 = `/sb`（`#FE5000` Pantone Orange）與 `/sc`（`#002FA7` IKB 藍）背景；**只做一版**（不分 light/dark）。
- 基礎依據：`docs-2026-07-06-design-spec.md`（使用者提供的設計規格）。
- `globals.css`：`:root` 重寫為 CI 雙色 token；刪除 apple/elevenlabs/cohere-dark/`.dark` 全部覆寫區塊（原 L109–426）；`--page-bg` 改實色；`body::before` 噪點單一版。
- 新增 `.bg-blue` / `.bg-orange` / `.bg-dark` 區塊變體（交替律動，accent 對調）。
- 字體改 Outfit + JetBrains Mono（`next/font/google`，`--font-outfit` / `--font-jbmono`）。
- 文件：`docs/DESIGN_SYSTEM_SPEC.md` 改版 v2 ACTIVE。
- 待辦：DesignModeProvider 清理（`LogoThemeLauncher` 已自 header/mobile 移除）；全站頁面逐步收斂到新 token；Editorial Hero 是否併入藍橘律動待決策。

### 2026-07-06 12:27 CST — Hero 重設計：排除所有 design-lab 方向 → Editorial Print（Sally）

- 使用者要求：重新設計，**撇除 design-lab 內所有任一項**。
- 12:17 的 CI 三幕合成（源自 R5 Lab）隨之否決；`hero-home-ci.tsx`、`home-ci-motion.ts` 已刪除，`HERO-HOME-CI-SPEC.md` 標記 ❌。
- 新方向：**白底編輯誌**（所有 Lab 皆黑底動畫，反向切入）；`handshake.png` 原生白底印刷質感 + 大字標語 H1 + FIG.01 圖框。
- Scroll：雜誌封面 → 圖框 clip-path 擴張滿版 → 三柱 stagger 定格；pin 150%。
- 規格：`.planning/HERO-HOME-EDITORIAL-SPEC.md`
- 新檔：`lib/hero/home-editorial-motion.ts`、`components/motion/use-scroll-pin-progress.ts`（共用 hook，首頁不再 import design-lab）。
- `home-sections.ts` hero 新增 `headline`／`issueMark`／`figureCaption`（中英）。

### 2026-07-06 12:17 CST — Hero 首頁 CI 三幕合成（Sally）

- 使用者要求：用 `public/` 資源 + 現有文件建立主視覺頁設計。
- Sally 判斷：不三選一，把 R5-01/05/06 接成單一 scroll 弧上首頁。
- 規格：`.planning/HERO-HOME-CI-SPEC.md`
- 實作：`lib/hero/home-ci-motion.ts`、`components/home/hero-home-ci.tsx`；`section-hero.tsx` 移除 R3F Co-Hero 改接 CI stage。
- 三支 R5 Lab 原樣保留；R3F scene 檔案保留未掛載。
- 降級：`prefers-reduced-motion` = Act 3 靜態定格。

### 2026-07-06 14:38 CST — 首頁 section 留白對齊內頁

- Sally UX：`--section-y-*` 升至 48/64/80px（= py-12 / sm:py-16 / lg:py-20）
- 新增 `.section-pad-y`；`.home-section-inner` 共用同一 token 鏈
- 內頁 `section-shell py-*` → `section-shell section-pad-y`
- `pnpm build` ✅

### 2026-07-06 12:10 CST — R5 選型三支 Lab（R5-01 + R5-05 + R5-06）

- 使用者選定：R5-06 Halftone Trust、R5-01 Blueprint Grid Scroll、R5-05 Portal Split。
- 選型牆：`/design-lab/r5`
- R5-01：`/design-lab/grid-scroll`（既有，HUD 改 R5-01）
- R5-05：`/design-lab/portal-split` — scroll 門扇裂開 + handshake；`/design-lab/grid-assemble` → redirect
- R5-06：`/design-lab/halftone-trust` — 黑底 handshake，scroll 微曝光/vignette
- 共用：`use-scroll-pin-progress.ts`、`portal-split-motion.ts`、`halftone-trust-motion.ts`
- `pnpm build` ✅

### 2026-07-06 12:00 CST — AI 主視覺領域研究 + R5 測試方針

- 領域研究：`.planning/research/domain-ai-tech-hero-visual-research-2026-07-06.md`
- Sally 提取 10 條 R5 測試方針：`.planning/HERO-R5-VISUAL-TEST-BRIEF.md`
- 原則：Anti-Slop、scroll 敘事、禁 autoplay 循環 hero

### 2026-07-06 11:56 CST — Hero Grid Scroll W0（從頭：靜態底 + scroll 驅動）

- 使用者要求重來：方格底靜態，**僅 scrolling 才有 effect**。
- 規格：`.planning/HERO-GRID-SCROLL-SPEC.md`
- Lab：`/design-lab/grid-scroll` — GSAP pin + scrub 180%

### 2026-07-06 11:39 CST — Hero Line Compose R4（線條組構 10 demo）

- 使用者要求：用現有圖檔 + **線條動畫湊成主視覺**。
- Sally 規格：`.planning/HERO-LINE-COMPOSE-SPEC.md`
- Lab：`/design-lab/line-compose` — L01–L10 procedural 線條 + CI 顯影。

### 2026-07-06 11:23 CST — Hero Direction R3（15 動畫 demo 選型牆）

- 使用者對既有 Lab 方向皆不滿意 → Sally 產出 15 卡動畫預覽 D01–D15。
- 路由：`/design-lab/directions`（`/design-lab` 同內容）。
- 規格：`.planning/HERO-DIRECTION-R3-SPEC.md`

### 2026-07-06 11:18 CST — V05 半調×線框拆解（取代 Blue Meridian Lab）

- 使用者不滿意藍線經緯 → 改 V05：`handshake.png` 左右拆解匯合 + `whitelinehand` 線框 overlay。
- 滑鼠／陀螺儀**微視差**（幅度刻意收小）。
- Lab 路由仍 `/design-lab/blue-hand`；20 款牆 V05 → 全螢幕。

### 2026-07-06 11:14 CST — Hero Blue Meridian 互動主視覺

- 新方向：`blue_line_hand.svg` 滿版 + 滑鼠／陀螺儀 3D 視差 + 經緯場 SVG。
- Sally 規格：`.planning/HERO-BLUE-HAND-MERIDIAN-SPEC.md`
- Lab：`/design-lab/blue-hand` — `hero-blue-hand-meridian.tsx`

### 2026-07-06 10:57 CST — Hero Square Bridge 規格 + Lab

- 使用者新方向：黑底 + `square_line.png` 無限旋轉/放大 + 紅黑雙手破版上下匯合；100vh/vw + RWD。
- Sally 產出 `.planning/HERO-SQUARE-BRIDGE-SPEC.md`。
- Lab：`/design-lab/square-bridge` — `hero-square-bridge.tsx`。

### 2026-07-06 08:56 CST — Hero Design Lab 作業記錄成文

- 使用者要求將目前作業記錄成文件。
- Sally 產出 `.planning/HERO-DESIGN-LAB-LOG.md`：探索歷程、CI 資產、技術發現、20 款提案、檔案索引、待決策 D1–D5。
- 現行 Lab：`/design-lab/mesh-snap` = `humanface` 電流漸層 only；雙手/blueline/流線已移除。
- W1 狀態更正為 **未定稿**（非 W1 完成）。

### 2026-07-02 CST — CI 原圖 20 款 SVG 動效選型牆

- 使用者提供 `public/ci/` 無背景參考圖（10 張）；要求原圖改 SVG + 動效、20 款選型。
- 10 原圖 × 2 動效 = 20 variants（`lib/content/ci-hero-variants.ts`）。
- 產出 `public/ci/svg/v01–v20.svg`（`scripts/generate-ci-svg.mjs`）。
- `/design-lab` = 20 卡預覽牆（原圖 embed + CSS 動畫）。
- `pnpm build` 通過。

### 2026-07-02 CST — Hero 20 動效方向預覽（UX 探索）

- 使用者：對 W1 效果不滿意，要求先出 20 種動畫方向供挑選。
- 新增 `components/design-lab/hero-20-gallery.tsx`：20 張動態 preview 卡（V01–V20）。
- `/design-lab` 改為 20 選 1 預覽頁；保留 `/design-lab/phase4` 舊版入口。
- 風格語彙：黑底、線框、波紋、穿隧、掃描、握手干涉、星塵、脈衝等。
- `pnpm build` 通過。

### 2026-07-02 CST — Phase 5.0 W1 Hero CI 實作

- `section-hero.tsx`：滿版 R3F `hero-co-hero-scene`、3.2s 進場同掃、GSAP pin + 三柱 stagger。
- `prefers-reduced-motion`：靜態 Logo fallback。
- `pnpm build` 通過。

### 2026-07-02 CST — Phase 5.0 W0 實作完成

- `HomeScrollRoot` 取代 `ScrollStoryRoot` + 舊 Cohere 區塊。
- 新增：`lib/content/home-sections.ts`、`home-story-chapters.ts`。
- 新增：`components/home/sections/*`（六 section 骨架）。
- Hero / Booking 為 W1/W4 placeholder；`pnpm build` 待驗證。

### 2026-07-02 CST — Phase 5.0 首頁六 Section 重規劃

- 使用者：新開始；重頭規劃首頁；每 scroll 時尚過場；Hero = CI 重點。
- IA 確立：Hero → About Me（StoryAboutMe 章節化）→ Lab → Service → Blog → Booking（Cal.com 30min）。
- Winston：診斷雙軌首頁（scroll-story + 舊 Cohere 區塊）；建議 `HomeScrollRoot` 單根、R3F 限 Hero、W0–W5 波次。
- Sally：六 section 過場語言、About 六章、Hero Co-Hero 托舉顯影、右側 section dot、待決策 D1–D5。
- 產出：`.planning/phases/5.0-HOMEPAGE-SCROLL-PLAN.md`。
- 與 Phase 4.0 差異：內容區塊上首頁；Portal/Manifesto 併入 Hero + 各 section。

### 2026-07-01 CST — Hero 全畫面重設計 + 滿版硬性需求

- 使用者：**現有方案皆不喜歡**（Co-Hero A、三欄手 Lab、Canvas 2D）。
- 保留意圖：手×Logo 同框互動、#05 同掃、#13 握手、`hand_line.png` 線框美學。
- 硬性需求：**整個畫面重新設計**；版面 **必須滿版**（無右側白邊）。
- 產出：`.planning/HERO_CHECKPOINT.md`；`isDesignLabFullscreenPath` 擴至 `/design-lab/*`；滿版 CSS（`#main-content` fixed、`co-hero-stage` absolute inset、關 `body::before`）。
- 實作原型 **凍結**，下一輪 workshop 再開。

### 2026-07-01 CST — Phase 4.0 Round 1+2 LOCKED + 規劃完整版

- Round 1：現代 AI、scroll 驚喜、Logo 8+plus、線框手+握手、IA 草案。
- Round 2：`/sb` `/sc`、blog 主 nav、contact→booking、Three.js/R3F。
- 產出：`4.0-PHASE-OVERVIEW`、`4.0-IMPLEMENT-PLAN` W0–W6、`CONTENT_INVENTORY`、`4.0-PAGE-BRIEFS`、`BRAND_EXPERIENCE_SPEC`、`DESIGN_SYSTEM_SPEC` DRAFT。
- 實作入口：W0（IA + redirect + `/sb` `/sc` 殼）。

### 2026-07-01 10:10 CST — Rebranding 路線判斷：重構現有 repo 優先

- 使用者詢問 rebranding 應該重頭開始寫，還是重構現在的 repo。
- 判斷：以現有 repo 做有邊界的 rebranding refactor 較合適；不要從零重寫。
- 理由：現有專案已具備 Next.js 15、Velite 內容管線、雙語 i18n、SEO、booking/contact、case studies、blog、Phase 3.0 motion 契約與首頁 scroll prototype，這些屬於可保留的成熟資產。
- 建議邊界：保留內容模型、資料流、路由、SEO 與轉換功能；重構品牌敘事、首頁/內頁視覺語言、Design System token、motion layer、共用 layout shell。
- 重寫僅適合在品牌定位、技術棧、內容模型或目標受眾全部改變時採用；目前不符合。

### 2026-06-26 17:05 CST — UX 優化建議實作完成

- 使用者要求依 UX 分析文件修正；已實作 P0（i18n、導覽 IA、內容探索）、P1（Share 無 header、design mode 可發現性、a11y 基礎）、P2（Path、Booking、theme 三態）。
- 新增：`lib/navigation.ts`、`components/nav-link.tsx`、`components/skip-to-main.tsx`、`components/detail-cta.tsx`。
- 驗證：`pnpm typecheck`、`pnpm build` 通過。

### 2026-06-26 16:15 CST — Sally UX 全站優化分析

- 使用者啟動 `/bmad-agent-ux-designer`，要求分析並提出可優化方向且記錄成文件。
- 已完成全站導覽、關鍵頁面、主題系統、i18n、a11y、轉換動線盤點。
- 產出 `.planning/UX-OPTIMIZATION-REVIEW.md`，P0 優先：i18n 統一、導覽 IA 對齊、首頁內容探索 CTA。
- 待決策：Services 是否上桌面 nav、Share 獨立 layout、首頁預覽數量、Path 語氣收斂程度。

### 2026-06-26 15:49 CST — /path 頁面舊色彩與互動樣式收斂

- 使用者要求繼續優化與調整，因此延續上一輪 hover token 工作，處理 `/path` 中仍殘留的固定 Tailwind 色彩。
- 已將中英文 milestone 的固定漸層色統一改成 `from-[color:var(--accent)] to-[color:var(--fg-2)]`，避免在 paper / studio / dark mode 下出現不一致的舊色系。
- 已把年份、period、subtitle、description、bullet、tag 與底部 CTA 說明文字改用 `--border-soft`、`--muted`、`--fg-2`、`--surface` 等 token。
- 已把 node ring、active shadow、active ring 與 CTA hover 改用 `--bg`、`--accent-glow`、`--hover-border`、`--primary-action-hover`，並移除未使用的 `Robot` icon import。

### 2026-06-26 15:46 CST — hover / interactive color token 跟隨 theme

- 使用者指出 hover 的 color token 也應該隨 theme 修正，避免不同 theme 下互動狀態露出固定藍色、黑色陰影或不合語境的白色混色。
- 已新增共用互動 token：`--accent-soft`、`--accent-line`、`--accent-glow`、`--hover-bg`、`--hover-bg-strong`、`--hover-border`、`--hover-fg`、`--primary-action-hover`、`--shadow-hover`。
- 已將 `.gradient-border-card:hover`、`.ghost-action:hover`、`.brand-button-primary:hover`、`.brand-button-secondary:hover`、shimmer / glow / selection / scrollbar hover 改為使用互動 token。
- 已同步調整 `language-switcher`、`logo-theme-launcher`、`theme-toggle`、`mobile-nav`、`site-header` 的 hover background、border、foreground。
- 已將首頁 aurora glow、`/share` social card / home / language hover，以及 `/path` active ring/shadow 與底部 CTA hover 收斂到 theme-aware token。

### 2026-06-26 15:40 CST — 預設 theme 改回 classic 與 light/dark fallback

- 使用者要求預設改成 class/classic theme；light/dark mode 先抓系統預設，如果沒有再改成 dark。
- 已將 `components/design-mode-provider.tsx` 的 `DEFAULT_MODE` 從 `elevenlabs` 改回 `cohere`，也就是無 URL / localStorage 指定時預設進 classic theme。
- `components/theme-provider.tsx` 保留 `next-themes` 的 `defaultTheme="system"` 與 `enableSystem`，代表一般情況仍優先跟隨系統亮暗模式。
- 已增加窄條件 fallback：只有在使用者沒有手動設定 theme，且瀏覽器同時不符合 dark / light system query 時，才寫入 `theme=dark` 並套用 dark class。

### 2026-06-26 15:31 CST — 首頁文案、studio 預設與 dark mode 修正

- 使用者要求首頁文案重新潤飾，以架構為主軸，導入 AI 與優秀使用者體驗，並強調需求能完整落地而不是空談。
- 已將 hero 改為「以架構驅動 / AI 與體驗落地」，說明 8plus 能把需求拆成可驗證架構、導入 AI 到真實流程，並用 UX 把產品做成可交付、可維護、可被信任的系統。
- 已把三個能力柱改為「架構先行」「AI 導入」「體驗落地」，並將側欄 checklist 改成「可執行路線圖」「架構、AI 到 UX 一起校準」「用可驗證交付取代空談」。
- 已將預設 design mode 改為 Studio / ElevenLabs；仍保留 `?theme=classic`、`?theme=paper`、`?theme=studio` 的 URL 手動切換。
- 已修正 Logo 固定黑色導致暗色背景看不清楚的問題，改為 `--logo-mark` theme token；dark classic 使用藍紫 accent，dark studio 使用橘色 accent，dark paper 使用暖色 accent。
- 已補齊 classic/cohere dark mode 缺少 `--page-bg` 的問題，避免出現白底白字；同時補齊三個 design mode 在 dark mode 下的背景、文字、卡片、邊框與 logo token。
- 驗證：`pnpm typecheck` 通過；`pnpm build` 通過；確認 `localhost:3000` dev server 正在運作，且 `?theme=studio` / `?theme=classic` 都已回傳新首頁文案與 CSS variable logo。

### 2026-06-26 13:43 CST — Cohere design system 導入啟動

- 使用者要求依 `design_system` 內容重設網站，重點不是局部換色，而是把整站改成 Cohere 風格的 enterprise command deck。
- 已確認現況網站仍大量使用 `glass-card`、`gradient-border-card`、`animate-aurora`、`Inter`、`bg-slate-*` 等舊視覺語彙，與新 design system 不一致。
- 這一輪實作會先做 token 基底、共用殼層與首頁主視覺，之後再分頁面把 about/path/services/blog/projects 收斂到同一套語言。

### 2026-06-26 13:43 CST — Cohere design system 第一輪落地

- 已把 `styles/globals.css` 轉成 Cohere token 與共用 component 層，讓舊有 `glass-card` / `gradient-border-card` 先吃到新的色彩與圓角語言。
- 已把 header/footer/mobile nav/language switcher/theme toggle 拉回同一套白底企業風格，避免新版首頁與舊殼層斷裂。
- 已重寫首頁為 command deck 結構，保留 `Archive` 與 `Lab` 的內容契約，`pnpm typecheck` 與 `pnpm build` 已通過。

### 2026-06-26 14:02 CST — 高曝光頁面收斂

- 使用者指出 about 與 booking 的內容與色彩仍偏舊，並要求掃描整個專案調整。
- 已把 booking 的服務清單從固定菜單改成可討論的合作主題，避免把服務範圍框死。
- 已將 about、services、projects、blog 與其 detail page 統一成 Cohere 風格的白底內容頁。
- 掃描後仍可見 `share` 與大型 `path` 頁面保留舊語言，已列為下一輪獨立收斂候選。

### 2026-06-26 14:17 CST — share social media 頁面完成備註

- `/share` 已完成三種可切換設計，現在可用 `?view=cohere`、`?view=apple`、`?view=elevenlabs` 切換視覺。
- 三套設計都保留原本的社群動線、Email 複製、LINE / WeChat QR 與預約 CTA。

### 2026-06-16 12:37 CST — Logo / Favicon 百分比幾何風格替換

- 使用者提供單張黑白 `%` 風格 Logo 參考圖，要求做出類似風格的 Logo 替換，並涵蓋 favicon。
- 設計決策：不直接複製參考圖，改以黑白高對比、左上小圓、右下大圓與厚斜槓建立 8plus 專屬符號；網站 header 使用透明底黑符號，favicon / apple / OG 使用白底黑符號。
- 實作範圍：更新 React 內嵌 Logo 元件、主要 SVG logo、light/mono 版本、SVG favicon、ICO favicon、OG 小圖示。
- 驗證：`pnpm typecheck` 通過；`pnpm build` 通過；以 Google Chrome headless fallback 檢查 `http://localhost:3001` 桌機與行動版首屏，確認 header Logo 與 `/favicon.svg` 掛載正常。
- 截圖證據：`.planning/logo-percent-desktop-2026-06-16.png`、`.planning/logo-percent-mobile-2026-06-16.png`。

### 2026-06-15 15:58 CST — Logo Redesign

- 使用者要求重新設計 Logo，後續明確指定「極簡現代感一點」。
- 設計決策：移除原本紫藍綠漸層、斜線與複雜符號，改用黑色圓角底、白色雙環 `8`、單一藍色 `+` accent。
- 實作範圍：`components/logo.tsx`、`components/mobile-nav.tsx`、`components/site-footer.tsx`、`public/og/8plus.svg`。
- 驗證：`pnpm typecheck` 通過；`pnpm build` 通過；以 Google Chrome headless fallback 截圖驗證桌機、手機與手機選單狀態。
- 截圖證據：`.planning/logo-redesign-desktop-2026-06-15.png`、`.planning/logo-redesign-mobile-2026-06-15.png`、`.planning/logo-redesign-mobile-menu-2026-06-15.png`。

### 2026-09-30 — Lab 新增 ckd2026 與 transcript-plus

- 新增 `content/projects/{ckd2026,transcript-plus}{,-en}.mdx`（緣由、目的、做法、套件與模型），並於 `lib/content/lab.ts` 登錄分組與角色標籤（ckd2026→前端、transcript-plus→全端）。
- ckd-2026 原始碼為私有 repo，僅放線上網站連結；transcript-plus 附 GitHub 連結。圖片沿用 `public/og/labs/` 既有截圖。
- `pnpm build` 通過。

### 2026-09-30 CST — 前衛化評估與計畫（Claude）
- 使用者要求：參考 2026 市場趨勢，評估如何讓官網更前衛、互動佳、手機體驗好、內容更符合主流需求。
- 產出：`.planning/redesign/FUTURE-FORWARD-PLAN-2026-09-30.md`（現況診斷、趨勢適用度、設計方向 Editorial-Tech 2.0、15 項互動、內容缺口、手機專章、護欄、A–G 路線圖、6 項待決策）。
- 結論：視覺已足夠大膽；缺口在互動深度、內容證據力、GEO、手機專屬體驗、效能/無障礙護欄。建議先 C（內容）+ B（手機）。
- 狀態：DRAFT，待使用者回覆 §9 決策後進入 GSD phase 規劃。

### 2026-09-30 CST — 前衛化計畫決策定案（使用者）
- D1 獨立工作室，五軌服務（委託／顧問／AI 實務／教育訓練／職涯探討）；D2 先做規則式「類 LLM」Quiz；D3 接受 Hero 一處 3D；D4 客戶不可署名→全匿名化；D5 內容 1–3 篇／月、情況更新型。
- 計畫已更新：`.planning/redesign/FUTURE-FORWARD-PLAN-2026-09-30.md` §9、§11–13。

### 2026-10-01 CST — Phase 6.0 階段 A 啟動（Claude）
- 新增 `.planning/phases/6.0-FOUNDATION-GUARDRAILS-PLAN.md`（A1–A6）。
- ✅ A1 `lib/motion/tokens.ts` + CSS `--motion-slow/--ease-out/--ease-in-out`；`MotionReveal` 改吃 token。
- ✅ A2 `lib/motion/frame-loop.ts`：分頁隱藏／捲出視窗暫停、<768px 30fps、reduced-motion／saveData 靜態一幀；套用 `hero-backdrops.tsx` `useCv` 與 `hero-v2.tsx` flow/lines。`pnpm typecheck`、`pnpm build` 通過。
- ⚠️ 未能在瀏覽器實測 rAF 暫停（預覽窗 `visibilityState=hidden`）；需實機／聚焦視窗補驗。
- ⚠️ 發現：首頁 Lab 縮圖 `/og/labs/ckd2026/web.png`、`/og/labs/crm/web.png` 404（既有問題，非本次改動）。
- 待做：A3 bundle 預算、A4 對比檢查、A5 分析（待選廠商）、A6 Lighthouse 基準。

### 2026-10-01 CST — Phase 6.0 A3/A4/A6 完成 + Lab 縮圖 404 修復（Claude）
- ✅ 修復：補 `public/og/labs/ckd2026/web.png`、`crm/web.png`（複製，MDX 原引用不變）。
- ✅ A3 `pnpm check:bundle`（目標 200KB warn／340KB fail）；A4 `pnpm check:contrast`；A6 Lighthouse 基準 → `.planning/redesign/BASELINE-2026-10-01.md`。
- ⚠️ 首頁 mobile Perf 66、LCP 6.0s、TBT 450ms、BP 77（Cal.com 第三方 cookie）；內頁 94–95。新增 A7 首頁效能修復。
- ⚠️ 橘色場白字對比 3.30 < AA 4.5 → 待決策 D6。
- 待決策：A5 分析廠商（Plausible／Umami）、D6 橘場文字色。

### 2026-10-01 CST — A7 首頁效能第一輪（Claude）
- ✅ Lab 縮圖 WebP（6.6MB→2.5MB）；✅ Hero CSS 改 SSR `<style>`（CLS 0.91→0、TBT 450→10ms）；首頁 mobile Perf 66→73~89。
- ⏳ Cal.com 延後載入（BP 77 主因）、手機固定輕量 Hero（LCP 波動）。
- ⚠️ 另一會話同時在改 analytics／booking-embed；動 Cal 前先協調。詳見 `.planning/redesign/BASELINE-2026-10-01.md`。

### 2026-10-01 CST — A7 收尾 + B/C' 起手（Claude）
- ✅ 首頁效能：真實節流 Perf 99／LCP 1.7s／CLS 0／BP 100；模擬 89。Cal 延後載入、GA lazyOnload、GSAP 改 IntersectionObserver（首頁 JS 342→299KB）。
- ✅ 修：Hero「往下滾動」被裁切（height→min-height）。
- ✅ B：手機底部 Tab Bar；手機 Hero 調整。✅ C'：五軌內容模型、首頁五卡、`/training`、`/career`。
- 🧪 D6 試驗：`?orange=ink`（`html[data-orange="ink"]`）橘底改深墨字，白字 3.30→墨 5.83 對比；待使用者比較後決定，決定後刪除試驗碼或設為預設。
- 待做：匿名 case study、Field Notes、Lab／Path 手機水平 snap、真機驗證；之後 D（⌘K、Lab 篩選、View Transitions）、E'（類 LLM Quiz）。
- 2026-10-01 CST：D6 決定 — 橘底維持白字（深墨試驗比較後「沒有更清楚」）；試驗碼已移除。橘場白字 3.30 對比列為已知限制（標題大字符合 3:1；`check-contrast` 內標 KNOWN）。

### 2026-10-01 CST 夜 — 階段 C3→G 全數完成（Claude）
- D6 決定：橘底維持白字（已還原深墨試驗）。
- ✅ Field Notes 與匿名案例版型；Lab 手機 snap；Lab 篩選；⌘K 搜尋；View Transitions；閱讀進度／目錄；`/check` 類 LLM 需求診斷；`llms.txt` + JSON-LD；Hero 3D（`?hero=gl`）；Path scrub；磁吸 CTA。
- ⚠️ 待人工：Hero 3D 目視、View Transitions 目視、真機測試、真實案例／推薦語內容、Lab mini demo 素材。
- ⚠️ 並行會話同時在改 `hero-v2.tsx`（kinetic 標題、`hero-neural.tsx`）與自動 commit；本會話僅將 kinetic 起始位移 108%→55% 以恢復 LCP。

### 2026-10-01 CST 深夜 — 使用者回饋修正（Claude）
- ✅ Logo 去藍底：header／footer 改 `variant="default"`（透明）。
- ✅ 全站字體統一無襯線：`--font-display` 改 Outfit + Noto Sans TC / PingFang TC；移除 Georgia；display 標題 weight 400→500。
- ✅ Lab 篩選列改為 `<main>` 直屬的 sticky（原本黏在單一 section 內，捲過就消失）。
- ✅ Hero 預設改 **AI Liquid Core｜液態智慧核心**（`hero-gl.tsx`，取代 neural 粒子）：極慢呼吸、游標為引力拉扯、點擊一次波動、滑過 CTA 內部變亮、往下捲核心解構；無 WebGL／省流量退回 combo。
- 2026-10-01 CST 深夜：Hero 再改為 **Cinematic AI Artifact**（黑色陶瓷＋鉻面三環陀螺儀＋陶瓷核心，橘色僅作邊緣光；游標傾斜、點擊加速旋轉、CTA 發光、捲動分離）。先前的藍色液態版因藍壓藍、與字體／CI 不協調而取代；波紋環面版因低解析度糊成蟲狀光斑而去掉波紋。
- 橘場 About 區塊：藍色線條／圓點改為半透明白，代表成就改為反白焦點晶片；區段導覽點改深色玻璃（不再繼承藍色）。使用者回覆「更不好看」— 待確認指的是 Hero 還是此區塊，必要時還原此區塊 CSS（globals.css 末段 "Orange field refinement"）。

### 2026-10-01 CST 凌晨 — Hero 重做為物理式液態玻璃（Claude）
- 使用者回饋：陀螺儀環「更不好看」、液態感覺假 → 改以數學模擬真實光學：折射進入、內部步進量厚度、Beer-Lambert 吸收、每通道 IOR 色散、Schlick 菲涅爾、HDR 矩形柔光箱環境、ACES 色調映射、距離場 AO、輪廓反鋸齒、玻璃內發光橘色核心；背景壓深藍提高對比。`components/home/hero/hero-gl.tsx`。
- 互動：游標引力拉扯、點擊波動、滑過 CTA 核心變亮、捲動解構；自適應解析度；手機移到下方並調暗避免壓標題。
- 橘場：About 區塊藍邊線改半透明白、單一反白重點卡；右側分頁點改中性深色玻璃；橘場 `--fg-2/--muted/--meta` 提亮（內文對比提升，仍為已知 3.3:1 上限）。
- 工具：無頭 Chrome + CDP 截圖腳本（scratchpad `shot.mjs`）可在預覽窗不顯示時目視驗證。

### 2026-10-01 CST — Sticky 系統統一（Claude）
- 根因：① `html, body {height:100%}` 讓 body 只有一個視窗高，sticky header 的包含區塊到此為止 → 捲過一屏 header 就跑掉，而 `<main>` 直屬的 Lab 篩選列仍黏住；② 非首頁 header 背景實為透明（`bg-background/72` 未生效，僅剩 blur）→ 文字穿透。
- 修法：`body {min-height:100%}`；header 改 `.site-header--solid`（不透明深藍玻璃）；新增 `.sticky-subnav`（top: `var(--header-h)`，SiteHeader 以 ResizeObserver 量測高度）；Lab 篩選列改用 `.sticky-subnav`。之後任何頁面子選單：放在 `<main>` 直屬並加 `sticky-subnav`。
- 驗證（1280×800）：捲至 0／600／2500／底部，header top=0、子選單 top=73、間距 0。
- 橘場 About 區塊：藍色線條改白色半透明、重點 chip 反白、側邊圓點改深色玻璃。
- ⚠️ `hero-gl.tsx` 被另一會話覆寫為「物理式液態玻璃核心」（折射＋Beer-Lambert）；本會話的「黑陶瓷／鉻面三環陀螺儀」版本未保留在磁碟上。
- 2026-10-01 CST：Header 配色回到「跟隨色場」：`SiteHeader` 於頁首中線取樣 `elementsFromPoint` 命中的 `.bg-blue/.bg-orange/.bg-dark`，把其背景色寫入 `--header-bg`（header 與 `.sticky-subnav` 共用；不透明，無穿透；節流 + trailing，不依賴 rAF）。深藍玻璃版已撤除。

### 2026-10-01 CST — Hero 版面精簡（採納外部設計評論）（Claude）
- 首屏只留：玻璃標籤 `01 // 系統架構與 AI 落地`、標題（「AI 沒有魔法」細體 + 「只有工程」粗體，去全形逗號）、一句副標、白色玻璃主按鈕（懸停極光邊框）+「探索作品 →」文字連結。移除頂部 meta 列、A/B/C 三點。
- A/B/C 移至新第二屏 `SectionPrinciples`（bg-dark、三欄卡片）；右側數字圓鈕改為細刻度。
- 3D：玻璃內加入「隱約透出」的經緯線網格與發光節點（有機外形 + 精密結構）；形體放大並略滲入文案區形成景深。
- 未採納：Terminal/Command 視窗式替代版型（待使用者決定）。

### 2026-10-01 CST — CTA 去浮動感（Claude）
- 使用者回饋：「預約諮詢」按鈕浮動感有失專業。移除兩個來源：① 磁吸跟隨游標（刪除 `components/magnetic-fx.tsx` 與對應 CSS／layout 掛載）；② hover 時旋轉的模糊彩色光暈（`.hv-cta.primary::before` conic-gradient + blur）。
- 現行：主按鈕為平面白色膠囊＋深墨字；hover 僅底色 #E6EDFF、active #D5E0FF；只過渡顏色（.15s）；focus 為 2px 白色外框。全站 `.brand-button-primary` 本來就無位移。

### 2026-10-01 CST 凌晨 — Hero 改為「高維度超立方核心」（Claude）
- 使用者提供評論：液態球像「孤立的玩具標本」、太軟爛，需與空間／游標／文字產生能量交換，並偏精準工程感（方案 A 超立方＋B 全域空間＋HUD）。
- `hero-gl.tsx` 重寫：光線步進 tesseract 投影（黑曜石外框／鈦銀內框／8 根連桿／發光核心）；背景網格被「核心＋游標」雙引力井透鏡扭曲（扭曲延伸到左側文案）；核心每 4.5 秒與每次點擊釋放掃描光圈點亮網格；游標傾斜、CTA 懸停充能、捲動時內外框分離；色系黑＋鈦銀＋冰藍／紫外，橘色只留 CTA；物件放大錨定右下並衝出邊界。
- HUD（十字準心、角括號、等寬讀數）只顯示真實數據（游標座標、執行秒數），不放捏造的遙測。
- 液態玻璃版本保留為 `?hero=liquid`；神經粒子 `?hero=neural`。

### 2026-10-01 CST — Hero 三版並存比較（Claude）
- 新增 B「推理核心 · 架構層」`hero-core.tsx`（Canvas 2D，無粒子雲）：三層半透明架構（System Boundary → Stack Selection → Production）+ 沿網格流動的資料脈衝（到達 Production 轉橘）+ 底層運算核心（3.2s 固定節奏 + 掃描環）；游標使附近節點亮起、網格向游標偏折；滑過 CTA 時核心向按鈕射出光束；點擊＝掃描環＋脈衝群；往下捲三層分離下沉。
- 比較：`/?compare=1` 顯示 A／B／C 切換列（A 超立方核心 `gl`＝另一工作階段；B 推理核心 `core`；C 液態玻璃 `liquid`＝另一工作階段在我原版上加了工程網格）。直連：`?hero=gl|core|liquid`。預設仍為 `gl`。
- 待使用者決定：選定後刪除未採用版本與比較列。

### 2026-10-01 CST — 使用者選定 Hero B，並優化（Claude）
- 決定：Hero 採 **B「推理核心 · 架構層」**（`hero-core.tsx`），已設為預設（不需 `?hero=`）；A（`gl`）、C（`liquid`）程式仍在，僅 `?hero=` / `?compare=1` 可見，待使用者確認後刪除。
- B 優化：長方體→**圓盤漏斗**（三層半徑遞減、極座標環+輻條圖）；節點改為 17 個真實 AI 開發流程術語（REQUIREMENTS／DATA CONTRACT／GUARDRAILS／ACCESS CONTROL／EVAL CRITERIA；LLM／EMBEDDINGS／VECTOR DB／RAG／PROMPT／TOOLS；EVALS／OBSERVABILITY／CACHING／COST／CI-CD／FALLBACK）；**滑鼠移到術語顯示說明卡**（此步對 AI 的作用）並點亮相連邊；觸控裝置可點選，閒置時自動導覽；標籤避讓；手機說明列固定在漏斗下方。
- Header：Hero 以 `data-header-color` 宣告自身色（sampled `#010d36`），`tint()` 在 scrollY=0 時取 Header 下方第一個區塊；首頁頂端 Header 改為實色，隨捲動跟隨各區塊（藍／橘／深）；語言切換與手機選單鈕改透明玻璃。
- 2026-10-01 CST：Hero B 動態微調（彈簧物理、曲線脈衝、漂浮、漣漪、聚光、編排入場）；決策紀錄 `.planning/redesign/HERO-MOTION-DECISIONS-2026-10-01.md`。

### 2026-10-01 CST — /path 歷程頁重排（Claude）
- 移除非學經歷的專案項目（8plus 平台、Vue 3／Angular／互動式作品集，中英各 4 筆）；資料加 `kind: work|edu`，現為 6 段工作 + 2 個學位。
- 桌機（≥1024px）新排版 `components/path/path-timeline.tsx`：左側 sticky 索引（隨捲動切換的大年份＋組織＋期間、可點擊迷你時間軸、進度線），右側同時只有當前卡片聚焦、其餘退後；工作／學歷分隔。手機／平板維持單欄直向時間軸。尊重 reduced-motion。
- 移除舊 `path-era.tsx`。Hero 加統計徽章（段數、學位數，皆由資料計算）。
- 2026-10-01 CST：Hero B v3b — 方正架構圖（矩形層板、方塊模組、直角連線、散亂→整理動畫、懸停追溯上下游脈絡）；紀錄於 `HERO-MOTION-DECISIONS-2026-10-01.md`。
- 2026-10-01 CST：Hero B v3c 斜側等角立體方塊（見 HERO-MOTION-DECISIONS）。
- 2026-10-01 CST：/path 手機／平板左側軸線改為進度條（橘色線隨捲動從第一個節點填到視窗中線；走過的節點變橘、目前節點發光；reduced-motion 關閉過渡）。
- 2026-10-01 CST：手機版依標註重排（按鈕堆疊＋動畫置右）；清除 A／C 兩版與比較列。
- 2026-10-01 CST：手機 hero 第二次編排（CTA 同列等寬、動畫全寬放大）；視覺選單改 Shift 顯示。
- 2026-10-01 CST：手機 hero 第三次編排（按鈕堆疊左、動畫放大右、說明卡補左下）。
