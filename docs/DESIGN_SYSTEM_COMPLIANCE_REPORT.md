# Design System 合規測試報告

- **紀錄時間戳記**：2026-06-30 CST
- **審查者**：Winston（System Architect）
- **設計來源**：`design_system/cohere`（`DESIGN-zh-tw.md`、`tokens.css`、`components.manifest.json`）
- **計畫依據**：`.planning/UIX_REDESIGN_PLAN.md`
- **掃描範圍**：`components/`（21 檔）、`app/`（13 頁）、`styles/globals.css`、`tailwind.config.ts`、`@8plus/ui` 基礎 primitive

---

## 執行摘要

| 維度 | 結果 | 說明 |
|------|------|------|
| **整體判定** | **部分合規（≈78%）** | 共用殼層與 token 基底已對齊 Cohere；首頁 aurora、inline `rounded-2xl`、`path` 漸層節點、舊 typography 設定仍偏離 |
| Token 基底 | ⚠️ 部分 | `--accent` / `--radius-md` 正確；語意色與 canonical Cohere 有漂移 |
| 共用元件 | ✅ 高 | header / footer / nav / theme / language 一致使用 CSS variables |
| 頁面層 | ⚠️ 混合 | 多數頁面用 `surface-card`；`contact` 未收斂；`path` 第二輪未完成 |
| 建置驗證 | ✅ 通過 | `pnpm typecheck` exit 0 |
| 自動化測試 | ❌ 無 | repo 無 design-system 專用 test / lint rule |

**結論**：目前**不能**宣告「所有元件皆符合 system design」。主幹已落地，殘餘偏差集中在 radius 語彙、ambient 動效、canonical token 值、以及 `tailwind.config.ts` / `@8plus/ui` 遺留品牌色。

---

## 驗收標準（摘自設計規格）

1. **白底 + 冷灰邊框** — 不靠 neon glow / 厚重 glassmorphism
2. **22px signature radius** — 主卡片/容器統一 `--radius-md`（22px）
3. **字體分工** — CohereText display + Unica77 body；淘汰 Inter / `bg-slate-*` 主導
4. **單一互動強調色** — `--accent` 僅 hover / focus / 主 CTA
5. **元件清單** — 優先重用 `components.manifest.json` 定義的 btn / card / badge / field 等群組

---

## 掃描方法

| 步驟 | 工具 / 動作 |
|------|-------------|
| 1 | 靜態 grep：`glass-card`、`gradient-border-card`、`animate-aurora`、`bg-slate-*`、`rounded-2xl`、`prose-slate`、`aug-*` |
| 2 | 人工對照 `design_system/cohere/tokens.css` vs `styles/globals.css` |
| 3 | 逐檔審查 `components/` 與 `app/(site)/**` |
| 4 | 檢查 `@8plus/ui` re-export primitive |
| 5 | 執行 `pnpm typecheck` |

---

## 元件合規矩陣

| 元件 | 狀態 | 備註 |
|------|------|------|
| `site-header.tsx` | ✅ PASS | `section-shell`、token 色、rounded-full CTA |
| `site-footer.tsx` | ✅ PASS | `--bg` / `--fg` / `--muted` |
| `mobile-nav.tsx` | ✅ PASS | Sheet + token hover/focus |
| `theme-toggle.tsx` | ✅ PASS | ghost + `--accent` focus ring |
| `language-switcher.tsx` | ✅ PASS | dropdown `rounded-[22px]` 符合 signature |
| `nav-link.tsx` | ✅ PASS | 邏輯層，樣式由父層 token class 控制 |
| `skip-to-main.tsx` | ✅ PASS | a11y utility，無視覺偏差 |
| `detail-cta.tsx` | ✅ PASS | `surface-card-strong` + `brand-button-primary` |
| `design-mode-provider.tsx` | ✅ PASS | 預設 `cohere`；多模式為產品功能 |
| `design-mode-script.tsx` | ✅ PASS | SSR hydration 對齊 `data-design-mode` |
| `logo-theme-launcher.tsx` | ✅ PASS | 模式切換 UI，token 一致 |
| `logo.tsx` | ⚠️ PARTIAL | `mono` / `favicon` 硬編碼 `#050505`、`#FFFFFF`（應走 `--logo-mark`） |
| `qr-dialog.tsx` | ✅ PASS | 無樣式耦合，由 caller 傳入 overlay class |
| `mdx-components.tsx` | ⚠️ PARTIAL | `prose prose-slate` — slate 語彙偏離 Cohere muted |
| `ui/button.tsx` | ⚠️ PARTIAL | re-export `@8plus/ui`；底層含 `aug-*` 舊 variant（站內多數 override） |
| `ui/card.tsx` | ⚠️ PARTIAL | shadcn default `rounded-lg`（非 22px）；站內少用 |
| `ui/sheet.tsx` | ✅ PASS | 由 mobile-nav 以 token border/bg 覆寫 |
| `ui/dropdown-menu.tsx` | ✅ PASS | 未在站內直接使用 |
| `ui/separator.tsx` | ✅ PASS | 標準 shadcn |
| `language-provider.tsx` | ✅ N/A | 邏輯 only |
| `theme-provider.tsx` | ✅ N/A | 邏輯 only |

**元件小計**：15 PASS · 4 PARTIAL · 0 FAIL · 2 N/A

---

## 頁面合規矩陣

| 頁面 | 狀態 | 主要發現 |
|------|------|----------|
| `/` (`page.tsx`) | ⚠️ PARTIAL | `animate-aurora` ×3（違反低 glow 原則）；多處 inline `rounded-2xl`（16px ≠ 22px）；`gradient-border-card` 已 token 化可接受 |
| `/about` | ⚠️ PARTIAL | `surface-card` 正確；內嵌 chip 用 `rounded-2xl` 而非 `var(--radius-md)` |
| `/path` | ❌ FAIL* | `bg-gradient-to-br` 節點、`rounded-xl`、pulse glow；*UIX 計畫標記第二輪收斂未完成 |
| `/blog` | ⚠️ PARTIAL | 列表卡 `gradient-border-card` — 語意 OK，命名仍為舊詞 |
| `/blog/[slug]` | ⚠️ PARTIAL | `prose prose-slate`；globals `.prose` 已部分 token 化 |
| `/projects` | ⚠️ PARTIAL | 同上 + 內嵌 `rounded-2xl` |
| `/projects/[slug]` | ⚠️ PARTIAL | `prose prose-slate` |
| `/services` | ✅ PASS | `surface-card` + `brand-button-*` |
| `/booking` | ✅ PASS | `surface-card` 體系一致 |
| `/contact` | ❌ FAIL | 僅 `prose`，無 `section-shell` 節奏 / Cohere 卡片語彙 |
| `/share` | ✅ PASS* | 三模式（cohere/apple/elevenlabs）為設計功能；cohere 模式合規 |
| `/admin/login` | ✅ PASS | `surface-card`、`eyebrow`、`display-title`、`brand-button-primary` |

**頁面小計**：4 PASS · 6 PARTIAL · 2 FAIL（含 path 已知 WIP）

---

## Token 漂移分析

`styles/globals.css` `:root` vs `design_system/cohere/tokens.css`：

| Token | Canonical (Cohere) | 現況 (globals) | 判定 |
|-------|-------------------|----------------|------|
| `--accent` | `#1863dc` | `#1863dc` | ✅ |
| `--radius-md` | `22px` | `22px` | ✅ |
| `--font-display` | CohereText stack | CohereText + Georgia | ✅ |
| `--font-body` | Unica77 stack | Unica77 stack | ✅ |
| `--fg` | `#000000` | `#0b1020` | ⚠️ 偏藍黑 |
| `--fg-2` | `#212121` | `#2e3b52` | ⚠️ 偏藍灰 |
| `--muted` | `#93939f` | `#60708b` | ⚠️ 飽和度不同 |
| `--surface` | `#fafafa` | `#f8fbff` | ⚠️ 帶藍調 |
| `--border` | `#d9d9dd` | `#d7e0ef` | ⚠️ 可接受冷灰 |
| `--page-bg` | 無（純白） | radial gradient | ⚠️ ambient accent |

**延伸 token**（設計系統未宣告，實作自用）：`--accent-soft`、`--accent-glow`、`--hover-*`、`--shadow-hover` — 支援 hover 體驗，但首頁 aurora 過度依賴。

---

## 共用 Class 審查

| Class | 定義位置 | 合規 |
|-------|----------|------|
| `.surface-card` | globals | ✅ 使用 `--radius-md`、冷灰邊框 |
| `.surface-card-strong` | globals | ✅ |
| `.gradient-border-card` | globals | ⚠️ 已 token 化；名稱仍暗示舊漸層語彙 |
| `.glass-card` | globals | ⚠️ 別名至 surface-card；建議淘汰引用 |
| `.brand-button-primary/secondary` | globals | ✅ Cohere ghost + fg 反色 CTA |
| `.display-title` / `.eyebrow` | globals | ✅ |
| `.animate-aurora` | globals | ❌ 與「無 ambient glow」衝突 |

---

## 基礎設施殘債

### `tailwind.config.ts`

- `brand.*` 硬編碼 hex（`#2563EB` accent 與 Cohere `#1863dc` 不一致）
- `@tailwindcss/typography` 仍綁 `colors.brand.gray.*`，與 CSS variable 雙軌

### `@8plus/ui`

- `button.tsx` 保留 `aug-primary` / `aug-booking` 等舊 variant + 硬編碼色
- `colors.ts` 的 `aug.accent: #8b5cf6` 與 Cohere 單色 accent 策略衝突
- 站內多數以 className override，但 primitive 層未收斂

---

## 建置驗證

```text
pnpm typecheck  →  exit 0  (2026-06-30)
```

未執行 `pnpm build`（耗時）；上次 STATE 紀錄 build 已通過。

---

## 修復優先序

| 優先 | 項目 | 影響 |
|------|------|------|
| P0 | 移除首頁 `animate-aurora` 或改為靜態 `--page-bg` | 設計原則違反最明顯 |
| P0 | `/contact` 收斂至 `section-shell` + `surface-card` | 唯一明顯未改版頁 |
| P1 | 全域 `rounded-2xl` → `rounded-[var(--radius-md)]` 或 utility `.cohere-radius` | 22px 簽名半徑 |
| P1 | 完成 `/path` 第二輪（節點去漸層、glow） | UIX 計畫未勾項 |
| P2 | `prose-slate` → `prose`（globals 已 token 化） | 內容頁一致性 |
| P2 | 同步 `tailwind.config.ts` typography 至 CSS variables | 消除雙軌色 |
| P3 | `@8plus/ui` 移除 `aug-*` variant 或對齊 Cohere token | 長期 primitive 衛生 |
| P3 | 新增 `scripts/validate-design-system.mjs` grep gate | 防止回歸 |

---

## 建議自動化測試（尚未實作）

```bash
# 建議 CI gate（示意）
rg -l 'animate-aurora|bg-slate-|prose-slate|glass-card' app components \
  && exit 1 || exit 0
```

可擴充為：

- token 值 diff：`design_system/cohere/tokens.css` vs `globals.css :root`
- `rounded-2xl` 在 `app/` 出現即 warn（主容器應走 `--radius-md`）

---

## 最終判定

| 問題 | 回答 |
|------|------|
| 所有元件是否符合 system design？ | **否** — 78% 區間，殼層與多數頁面已合規 |
| 可上線嗎？ | 視覺可接受；品牌一致性未達 100% |
| 最大風險 | radius 混用（16px vs 22px）、ambient 動效、path/contact 離群 |

---

*報告產出：Winston / BMAD Architect · 2026-06-30*
