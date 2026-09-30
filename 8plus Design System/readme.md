# 8plus 設計系統 · v2 CI

這是 **8plus**（8plus.app）的設計系統——一個位於台灣、雙語（繁體中文／English）的技術品牌，創辦人 August Wang（`awtw`）。此為 **改版後的 v2 CI**：8plus 已從「前端開發服務商」重新定位為 **架構驅動的技術夥伴（Architecture-led Engineering Partner）**——協助團隊把需求拆成可驗證的架構、把 AI 嵌進真實流程，並交付可信任、可維護的系統。

視覺識別是 **雙色、單一版本的 CI**：兩個飽和的主色場——**國際克萊因藍 `#002FA7`**（技術架構）與 **Pantone Orange 021 C `#FE5000`**（商業交付）——再加深夜色 `#0A0E1A`。滾動時區塊在藍與橘之間 **交替律動**，每個區塊都把 accent 翻轉成互補色。文字恆為白色；表面為半透明白色玻璃，帶標誌性的 **22px** 圓角；字體遵循 **襯線宣示／無襯線執行**（Georgia display、Outfit 內文、JetBrains Mono 標籤）。**沒有亮色模式。**

> 本版取代先前的單色探索。目前的真相來源是附上的 `8plus_web` 專案——`styles/globals.css` 與 `docs/DESIGN_SYSTEM_SPEC.md`（ACTIVE，2026-07-06）。

## 來源
- **附件專案 `8plus_web`** — 上線中的 Next.js 15 網站。核心檔案：`styles/globals.css`（所有 token）、`docs/DESIGN_SYSTEM_SPEC.md`（v2 ACTIVE 規範）、`docs/CI_IDENTITY_SPEC.md`（品牌／CI 研究）、`lib/content/home-sections.ts`（文案）、`components/home/`、`components/logo.tsx`。
- **GitHub `awtw/8plus-web`** — https://github.com/awtw/8plus-web（較早的公開狀態）
- **GitHub `awtw/8plus-ui`** — https://github.com/awtw/8plus-ui（共用元件 ＋ token）

Token 逐字複製自 `styles/globals.css`。Logo 幾何逐字複製自 `components/logo.tsx`——**未重繪**。

---

## 內容基礎 — 8plus 怎麼寫（v2）

改版 **淘汰了先前戲謔的武俠／遊戲黑話**（`全棧修仙`、`微服務老司機`、`約起來`）。v2 的語氣是 **專業、直接、架構優先**——CI 規範明文禁用舊有的自滿語調。

- **定位語：** 「以架構驅動，AI 與體驗落地」／"Architecture-led — AI and product experience, delivered."。首頁主標題對句為 **架構先行，AI 落地／把需求交付成可信系統**。
- **三支柱，永遠 A/B/C：** 架構先行（Architecture first）· AI 導入（AI integration）· 體驗落地（Experience delivery）。
- **區段標籤是 Mono、大寫、加編號：** `01 · STORY`、`02 · LAB`、`03 · SERVICES`、`04 · JOURNAL`、`05 · BOOKING`。也有編輯式標記：`8PLUS.APP · TRUST001`、`NO.01 — 2026`、`FIG.01 — TRUST HANDSHAKE`。
- **導言句短而具體：** 「系統邊界、技術選型、可擴展設計」；「把 AI 嵌進真實流程，而非展示用」。少形容詞、界線清楚。
- **偏好詞彙：** 架構先行、可驗證交付、AI 工作流、體驗落地、技術夥伴、系統邊界、Code Review、顧問陪跑、Discovery、迭代交付、知識轉移。
- **禁用／弱化詞彙：** AI-powered／智能化／顛覆、最便宜／最快上線、純前端外包。
- **`8plus` 永遠小寫。** 中間點 `·` 仍是簽名連接符。
- **英文自信精確；中文專業直接。** 以「你」稱呼讀者。
- **不用 emoji。** 只以 Unicode 箭頭（`→`、`↓`）作輕量內嵌標記。

---

## 視覺基礎（v2 CI）

**色彩——雙主色、交替。** 兩個飽和色場：克萊因藍 `#002FA7` 與 Pantone 橘 `#FE5000`，加全屏媒體用的深夜色 `#0A0E1A`。`.bg-blue`／`.bg-orange`／`.bg-dark` 各自設定 `--bg` 並把 `--accent` 翻轉成互補色（藍底 → 橘 accent，橘底 → 藍 accent）。文字為白色階梯：`--fg #fff`、`--fg-2 .88`、`--muted .76`、`--meta .6`。**沒有亮色模式**——`color-scheme: dark`。切勿寫死顏色；從當前色場讀 `--bg`／`--accent`。

**字體——襯線宣示、無襯線執行。** Display 用 **Georgia**（襯線）→ Outfit 備援，用於 H1–H2（H1 `clamp(2.75–4.5rem)`／600／`-0.04em`；H2 `clamp(1.75–3rem)`／400／`-0.03em`）。內文／UI 用 **Outfit** 300–400，16px／1.6（最寬 65ch）。標籤／eyebrow／區段編號用 **JetBrains Mono**，大寫，`0.12em`。**內文禁止 700+。** 兩款 webfont 皆與原始碼（`next/font/google`）完全對應；Georgia 為系統襯線體。

**間距與版面。** 8px 基準網格。1440px 最大容器；gutter 16 → 24 → 32。區段節奏 48／64／80px。最小觸控目標 44px。

**圓角。** `--radius-sm` 8px（dialog）、**`--radius-md` 22px——簽名**（所有主卡片）、`--radius-pill`（按鈕與 Badge）。主卡片絕不用 16px（`rounded-2xl`）。

**表面／卡片。** 色場上的半透明白玻璃：`--surface rgba(255,255,255,.08)`、細線 `--border-soft .12`／`--border .22`、22px 圓角。`glass-card`（預設）、`glass-card-strong`（更濃）、`gradient-border-card`（hover：上浮 2px ＋ 浮現漸層細線框）。卡片必須疊在色場上才正確。

**深度——用線環，不用陰影。** 層級以 1px 細線環（`--elev-ring`）表達，而非投影。只有 hover 上浮用柔和陰影（`--shadow-hover`）。整體扁平、分層、半透明。

**背景。** 飽和實色場（不用漸層頁面底）。其上：**柔光噪點 ＋ 半調紋理**（`noise-field`）、緩慢的 **極光漂移** 光暈、shimmer 強調。Hero 為編輯／雜誌風——刊頭橫線、襯線標題、支柱網格。

**動效。** 簽名 `--transition-base: all 0.35s cubic-bezier(0.16, 1, 0.3, 1)`；`--motion-fast` 150ms／`--motion-base` 200ms；標準 ease `cubic-bezier(0.2,0,0,1)`。卡片 hover 上浮 2px；header 滾動超過 64px 後磨砂。每頁一個簽名動效時刻——其餘克制。所有動畫遵守 `prefers-reduced-motion`。

**按鈕。** 藥丸形。`primary` = 白底／色場色文字 → **hover 翻轉成 accent 填色**；`secondary` = 透明 ＋ 白色細線框；`ghost`；`link`（accent 底線）。一頁最多兩個主要 CTA。

**無障礙。** 白字 on 藍 ≈ 10.9:1；白字 on 橘 ≈ 3.2:1——橘底大字白字沒問題，但小字內文避免 76% 白（提高至 `--fg`）。

---

## 圖示（Iconography）

- 原始碼的圖示集為 **Phosphor Icons**（`@phosphor-icons/react`——CaretDown、ArrowRight 等），約 16px、`weight="bold"`。CDN：`https://unpkg.com/@phosphor-icons/web`。shadcn 原語內部用 **Lucide**。
- **建議：** 產品／行銷 UI 用 **Phosphor**，細單色線條 SVG（`stroke-width: 1.8`、`stroke: currentColor`、`fill: none`）。不要再引入第三套。*（本系統的卡片／UI Kit 少數處使用無相依的 Unicode 替代字元——正式環境請換回真實 Phosphor。）*
- **Logo 是唯一的原創標誌**——兩圓 ＋ 一粗斜切（象徵兩系統接合 ＋ 架構張力）。切勿重繪；使用 `Logo` 元件或 `assets/` 內的 SVG／PNG。
- **Emoji 不是圖示系統。** Unicode 箭頭只作輕量內嵌標記。
- **禁用視覺：** 全站霓虹／掃描線 HUD、氣泡粒子 logo 主視覺、到處漸層按鈕、Inter 當主標題字、紫青 AI-slop 漸層。

---

## 字體
**Outfit** ＋ **JetBrains Mono** 由 Google Fonts 載入（`tokens/fonts.css`）——與 `app/layout.tsx` 完全對應。**Display 使用 Georgia**，系統襯線體（原始碼 `--font-display` 為 `"Georgia", Outfit, serif`）；不附任何專屬 display webfont。若想用授權襯線體（如 CI 研究提到的 Cohere CohereText），提供字檔即可加 `@font-face`。

## 資產（`assets/`）
逐字複製自 `8plus_web/public`：
- `logo-mono.svg`／`logo-light.svg` — 標誌（色場上為白色）
- `logo-new.svg` — 圓角底磚上的標誌（App icon）
- `favicon.svg`、PNG 變體（`logo-*-512.png`）、`og/8plus.svg`、`og/8plus_L.svg`

---

## 索引／清單

**全域 CSS**
- `styles.css` — 進入點（引入這一個）；`@import` 各 token 檔。
- `tokens/colors.css`（＋ `.bg-blue`／`.bg-orange`／`.bg-dark` 變體）· `typography.css` · `spacing.css` · `effects.css` · `fonts.css`

**元件**（命名空間見 `check_design_system`）
- **核心**（`components/core/`）：`Button`（藥丸）、`Card`（＋ `CardHeader`／`CardTitle`／`CardDescription`／`CardContent`／`CardFooter`）、`Badge`、`Separator`、**`Section`**（交替色場包裝器——CI 簽名）。
- **品牌**（`components/brand/`）：`Logo`
- **覆蓋層**（`components/overlay/`）：`Sheet`（＋部件）、`DropdownMenu`（＋部件）

每個元件都有 `.jsx`、`.d.ts`、`.prompt.md`，以及每個目錄一張共用的 `@dsCard` 展示卡。

**刻意新增**（非 1:1 對應原始語）：
- **`Section`** — 原始碼以 `.bg-blue`／`.bg-orange` utility class 表達交替色場系統；`Section` 把這套（色場 ＋ 翻轉 accent ＋ 噪點 ＋ 容器）打包成一個元件。CI 核心。
- **`Badge`** — 原始碼在各處內嵌 Mono eyebrow 膠囊與指標 chip；打包成單一元件。

**UI Kit**
- `ui_kits/8plus-app/` — 編輯風滾動首頁（藍橘交替區塊、預約流程）。見其 `README.md`。

**基礎規範**（Design System 分頁卡片）
- `guidelines/*.card.html` — 顏色、字體、間距、效果、品牌規格卡。

**其他**
- `SKILL.md` — Agent Skill 包裝。

---

## 注意事項（Caveats）
- **圖示為無相依的 Unicode 替代字元**（少數卡片／kit 處）——正式環境應用 Phosphor（見圖示章節）。
- **Display 字面為系統 Georgia**，非授權襯線體；想用專屬 display 字型請提供字檔。
- 元件為 **外觀** 重現（無 Radix、無 GSAP scroll-pin、無真實 Google Calendar）——保真度優先於真實行為。原始碼的 Cinema／canvas hero 變體簡化為靜態編輯式版面。
- 數值反映 **ACTIVE v2 CI 規範**（`docs/DESIGN_SYSTEM_SPEC.md`，2026-07-06）。原始碼仍留有正在清理的 `apple`／`elevenlabs`／`cohere` design-mode 舊架構；此處刻意排除。
