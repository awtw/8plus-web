# 8plus 重新設計 — Phase E：重建呈現層 實作計畫 / Checklist

*建立：2026-07-09 CST*
*狀態：計畫（可照做）*
*依據：`00`~`03` 四份 LOCKED SSOT*
*原則：保留地基（Velite/i18n/SEO/Cal.com/部署），只重塑呈現層；逐步替換、每步可驗證；一次一頁不大爆改。*

---

## 驗證方式（每步都要）

- `node_modules/.bin/tsc --noEmit` → 型別零錯。
- `node ./scripts/validate-content.mjs` → 內容通過。
- **本機 Mac**：`pnpm dev` 目視每頁桌機/手機、`pnpm build` 最終驗證（沙盒因 esbuild 平台不符跑不了 build）。
- a11y：對比、focus ring、觸控 ≥44px、`prefers-reduced-motion`。

---

## E0 · 設計系統接線（地基，先做）

**目標**：讓新藍橘 tokens 成為全站真相，且不破壞現有頁面。

- [ ] `styles/globals.css` `:root` 色值換成新值：`--color-blue:#1F4FFF`、`--color-orange:#FF7A18`（目前是舊 `#002FA7`/`#FE5000`）。
- [ ] 於 globals `@import "../design_system/8plus/tokens.css";`（或把 tokens 內容併入 `:root` 與元件層），確認 `.bg-blue/.bg-orange/.bg-dark/.bg-paper`、`.card/.btn*/.eyebrow/.display-*` 可用。
- [ ] shadcn HSL token（`--background`/`--primary`/`--accent`…）對齊：background→藍、primary→橘、radius→16px。
- [ ] `tailwind.config.js` 的 `fontFamily` 對齊 Outfit / JetBrains Mono（移除 Cohere 專有字體名殘留）。
- [ ] **驗收**：現行首頁與各頁仍可 render（顏色改變可接受），`tsc` 過。

---

## E1 · 共用殼層（Header / Footer / Nav / Logo）

**檔案**：`components/site-header.tsx`、`mobile-nav.tsx`、`nav-link.tsx`、`site-footer.tsx`、`logo.tsx`、`logo-home-link.tsx`、`language-switcher.tsx`、`theme-toggle.tsx`

- [ ] `logo.tsx`：改用 C2（`public/brand/logo-mark.svg`/`logo-mono.svg`/`logo-lockup.svg`）；變體 header(白圓橘槓)/mono/lockup；移除舊 `logo-new/logo-light/favicon` 變體邏輯。
- [ ] 導覽項目依 IA：關於／服務／作品(/lab)／部落格／歷程 + 常駐主 CTA「預約諮詢」。
- [ ] `theme-toggle.tsx`：單一版本設計無需明暗切換 → 移除或停用（連同 `next-themes` 使用點）。
- [ ] header 滾動加 `.scrolled` 磨砂；mobile-nav 用新 tokens。
- [ ] footer 三欄（品牌+CTA／導覽鏡像／聯絡 Email·LINE·LinkedIn·履歷）+ 雙語版權。
- [ ] **驗收**：桌機/手機導覽一致、語言切換可用、CTA 常駐、`tsc` 過。

---

## E2 · 首頁（旗艦：Hero signature + 七段）

**檔案**：`app/(site)/page.tsx`、`components/home/home-scroll-root.tsx`、`components/home/sections/section-*.tsx`、`lib/content/home-sections.ts`、`components/motion/use-scroll-pin-progress.ts`

- [ ] **Hero signature 動畫**（依 `03-LOGO-MOTION.md`）：純藍場景，`scroll pin + scrub`：網格建構 → 兩圓滑入 + 橘斜槓 stroke-dashoffset 描繪成 Logo → 標語逐行（stagger ~120ms）→ CTA 淡入 → 定格首屏。只用 transform/opacity/dashoffset；`prefers-reduced-motion` 顯示終態靜圖。
- [ ] 首頁七段順序（依 IA §4.1）：Hero → 三支柱 → 代表案例(/lab) → 最新文章(/blog) → 服務入口 → 信任帶(經歷/技術棧關鍵字) → 收尾 CTA。
- [ ] 場景律動：藍為主、關鍵轉換段（收尾 CTA / 服務）插 `.bg-orange`；section 用 `.scene` + `.card`。
- [ ] 資料沿用 `home-sections.ts`（必要時補三支柱/信任帶欄位，雙語）。
- [ ] **驗收**：Mac `pnpm dev` 看首屏 3 秒訊息、動畫順、行動版 pin 正常、reduced-motion 降級；`tsc` 過。

---

## E3 · 內容頁（逐頁收斂）

每頁：套場景 class、`.card/.btn`、雙語、輕量 reveal（非重動效）。

- [ ] `about`（`app/(site)/about/page.tsx` + `lib/content/about.ts`）：定位摘要→能力範圍→技術棧→價值信念→個人溫度→CTA。
- [ ] `services`（+ 併入 `process`、`pricing`；`lib/content/process-pricing.ts`）：服務主張→能解問題→服務項目→流程→**合作模式(諮詢/Retainer/Workshop/專案制)+「預約了解報價」**（不標金額）→CTA。
- [ ] `path`（`path-milestones.tsx`）：時間軸里程碑→信念收束→CTA。
- [ ] `lab` 列表 + `lab/[slug]` 詳情（Velite `content/projects/*` 不改資料）：卡片列表可篩選；詳情=情境→角色→架構決策→成果→相關→CTA。
- [ ] `blog` 列表 + `blog/[slug]`（`content/posts/*`）：**用 `.bg-paper` 白底閱讀**、目錄、程式碼區塊、相關文章、結尾 CTA。
- [ ] `booking`（Cal.com 內嵌 + contact action）：主 CTA 說明→Cal 內嵌→低承諾輔句→其他聯絡→FAQ(可選)。
- [ ] **驗收**：無單頁保留舊視覺語彙；閱讀頁可讀性優先；`tsc`+`validate-content` 過。

---

## E4 · 隱藏 Link Hubs

**檔案**：`app/(site)/sb/page.tsx`、`sc/page.tsx`、`lib/share-hub/*`、`lib/content/share*.ts`

- [ ] 決策：`/sb` `/sc` 對齊主站藍橘 tokens（原為獨立深底主題）。已解除 `useDesignMode` 依賴（階段 0），改吃場景 class。
- [ ] `/sb` 商務：Email/LinkedIn/履歷/Cal/LINE 商務；`/sc` 社群：IG/LINE 個人/WeChat QR；維持 QR 友善、可獨立分享。
- [ ] **驗收**：兩頁與主站一致、QR/複製可用、`tsc` 過。

---

## E5 · SEO / Meta / 導轉

**檔案**：`app/layout.tsx`、`lib/seo.ts`、`app/sitemap.ts`、`app/robots.ts`、`next.config.mjs`（或 `proxy.ts`/middleware）

- [ ] favicon → `public/brand/favicon.svg`；apple/OG → `og-8plus.svg`；`layout.tsx` icons 更新。
- [ ] 301 導轉：`/contact`→`/booking`、`/process`→`/services#process`、`/pricing`→`/services#pricing`、`/projects`→`/lab`、`/projects/[slug]`→`/lab/[slug]`、`/share`→`/sb`。
- [ ] sitemap 更新 lab 路徑、移除舊/隱藏頁；JSON-LD 檢查。
- [ ] **驗收**：舊網址正確 301、sitemap/robots 乾淨。

---

## E6 · 清理死碼（最後，確認無引用再刪）

- [ ] 刪 `components/home/` 內 0-import 實驗 hero（約 23 個）：`hero-blue-hand-meridian`、`hero-blueline-flow`、`hero-glow`、`hero-grid-assemble`、`hero-grid-scroll`、`hero-halftone-split`、`hero-halftone-trust`、`hero-handshake-svg`、`hero-home-ci`、`hero-humanface-electric`、`hero-logo-orb`、`hero-mesh-snap-svg`、`hero-neon-stage`、`hero-physics-backdrop`、`hero-portal-split`、`hero-preview-card`、`hero-scan-build`、`hero-section`、`hero-square-bridge`、`hero-wave-backdrop`、`hero-wire-weave`、`bento-grid`、`lumina-shell`、`face-id-visual`（刪前各自再 grep 確認 0 引用）。
- [ ] 檢查 `hero-logo-cinema`/`hero-visual`/`architecture-diagram`（各 1 引用）是否新首頁還需要，不需要則連鏈刪除。
- [ ] `styles/globals.css`：移除 aurora/lumina/glass 等 legacy class 與舊 IKB 色殘留（頁面都遷移後）。
- [ ] 清 `lib/content` 內舊實驗資料（`ci-hero-variants.ts`、`hero-line-compose-demos.ts`、`home-story-chapters.ts` 等，確認無引用）。
- [ ] `lib/site-paths.ts`：移除 `isDesignLab` 死檢查。
- [ ] 移除舊 logo 資產（`public/logo-*.svg` 舊版）若不再引用。
- [ ] **驗收**：`tsc`+`validate-content`+本機 `pnpm build` 全過。

---

## 建議執行順序與里程碑

1. **E0 → E1 → E2**（地基＋殼層＋首頁）= 第一個可上線驗證的里程碑。
2. **E3**（逐頁，可平行）。
3. **E4 → E5**（hubs + SEO）。
4. **E6**（清理）→ 進 Phase F（`pnpm build`、合併 main、Vercel）。

每完成 E0/E1/E2… 就 commit（Conventional Commits）並更新 `STATE.md`。

---

## 開放小決策（做到該步再定即可）
- `theme-toggle` 直接移除還是保留為 no-op？（建議移除）
- 信任帶關鍵字清單內容（經歷/技術棧要列哪些）。
- `/lab` 篩選維度（技術別／領域別）。

---

*本計畫為 Phase E 的執行藍圖。開工後每步更新勾選狀態。*
