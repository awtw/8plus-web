# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-15)

**Core value:** 展示專業能力、累積技術內容、預約諮詢的個人品牌網站
**Current focus:** Phase 4.0 規劃 LOCKED — 待 W0 實作（見 `4.0-IMPLEMENT-PLAN.md`）

## Current Position

Phase: **4.0** ICON 級全站重構
Plan: LOCKED（規劃文件完整）
Status: 規劃已 commit，待 W0
Last activity: 2026-07-01 CST — 完整規劃：OVERVIEW + IMPLEMENT-PLAN + PAGE-BRIEFS + DS DRAFT

Progress: [██░░░░░░░░] 規劃完成，實作未開始

## What Was Done

- ✅ **2026-07-01 CST — Phase 4.0 規劃 LOCKED**: Round 1+2 決策；IA 7 項 + `/sb` `/sc`；`BRAND_EXPERIENCE_SPEC`、`DESIGN_SYSTEM_SPEC` DRAFT、`4.0-IMPLEMENT-PLAN` W0–W6、`CONTENT_INVENTORY`、`4.0-PHASE-OVERVIEW`；checkpoint `28fffff`。
- ✅ **2026-07-01 CST — Phase 4.0 討論 Round 1+2**: AI 線框手+握手；Logo 8+plus；blog 入主 nav；contact→booking；Three.js/R3F。
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
