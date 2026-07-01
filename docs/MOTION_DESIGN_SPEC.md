# 8plus Motion & Scroll 設計契約

*建立：2026-06-30 CST*  
*LOCKED：2026-06-30 CST — Round 3 確認*  
*依據：`.planning/phases/3.0-RESET-AND-DISCUSS.md`、`docs/StoryAboutMe.md`、`docs/CI_IDENTITY_SPEC.md`*

---

## 0. 執行摘要

首頁 = **暗色電影感 scroll story**（參考 [WRK ACF-01](https://www.wrk-timepieces.com/products/acf-01) 的章節 pin、scrub、大標拆字、精密拆解敘事）。  
全站其餘頁面共用同一 motion 語言，強度較輕。  
視覺錨點 = **8plus Logo 幾何**（雙圓 + 斜切），動效可自由發揮，但須服務敘事、維持精密工程感。

---

## 1. 參考標竿

### 1.1 主參考 — WRK ACF-01

| WRK 手法 | 8plus 轉譯 |
|----------|------------|
| 暗色高技術極簡 | 全站 dark cinematic 基調 |
| 大標題拆行（`ADVANCED / HOROLOGY / ENGINEERING`） | `ARCHITECTURE / DELIVERY / PARTNER` 等章節標 |
| Scroll pin + 區塊內容切換 | 首頁 6 章節 pin narrative |
| 零件標記 A/B/C + 說明 | 架構層 / 服務模組標記（mono 標籤） |
| 規格表 / 數據 reveal | 專案 metrics、技術棧表 |
| 水平 timeline（Swipe to Explore） | **僅 `/path`** 職涯 timeline；首頁 Ch1 精簡敘事 + 連結 |
| 景深產品攝影 + parallax | Logo 3D 層次、專案預覽卡 parallax |
| 極慢、可 scrub 的動畫 | Logo 組裝、章節轉場 timeline |

*WRK 由 Studio 28K 設計、Ruud Luijten 開發 — 標竿為「滾動即敘事」而非臨摹腕錶內容。*

### 1.2 次要參考（待補）

使用者可再補 1–2 個連結；目前以 WRK 為唯一確認標竿。

---

## 2. 視覺與動效原則

### 2.1 基調

| 項目 | 決定 |
|------|------|
| 主題 | **Dark cinematic only** — 全站 dark，**關閉 light mode 切換** |
| 質感 | 精密、克制、工程感 — 像機芯拆解，不像遊戲 HUD |
| Logo | 雙圓斜切符號 = 所有 signature 動效的原子形狀 |
| 字體 | CohereText 章節標 / Unica77 內文 / CohereMono 標籤 |

### 2.2 動效邊界（Round 2）

| 類型 | 狀態 |
|------|------|
| 氣泡粒子 | **不優先** — 可用，但須轉化為 logo 幾何或資料節點，禁止滿屏飄浮 cliché |
| 霓虹 HUD | 允許輕量技術標記（mono 角標），禁止遮擋閱讀的掃描線主導 |
| Glitch | 僅章節轉場點綴，禁止全頁常駐 |
| 假 loading / 假進度 | **禁止** |
| 其餘 | **可自由發揮**，前提：服務章節敘事 + 符合 logo 語彙 |

### 2.3 Scroll 模式（首頁）

| 模式 | 用途 |
|------|------|
| **Scrub + Pin** | Ch0–Ch4 主敘事；滾動進度驅動 timeline |
| **Reveal stagger** | 列表、卡片、metrics 進場 |
| **Parallax** | Logo 層、專案預覽、背景景深 |
| **Typography motion** | 章節大標拆字、字距/透明度隨 scroll |
| **Progress nav** | 右側章節 dot（01–06），可選 |

### 2.4 內頁（輕量）

- 共用 `MotionReveal`、`MotionHeading`、`MotionParallax` 元件
- 不做完整 pin story；保留 section reveal + 標題 typography

### 2.5 無障礙

- `prefers-reduced-motion: reduce` → 關閉 scrub/pin/parallax，保留靜態排版與一次 fade
- 所有動效區塊需有非動效 fallback 內容可讀

### 2.6 技術選型（建議）

| 層級 | 工具 |
|------|------|
| Scroll scrub / pin | **GSAP + ScrollTrigger**（✅ Round 3 確認） |
| 進場 / stagger / 手勢 | **Framer Motion** |
| Logo / 精密動效 | Canvas / SVG morph / CSS（依原型決定） |
| 效能 | `will-change` 節制、mobile 降級 parallax 層數 |

*待使用者確認是否接受 GSAP 依賴。*

---

## 3. 首頁 Scroll 敘事（6 章）

```
Ch0 Logo      → 符號組裝、精密對位
Ch1 Story     → 我是誰（潤飾自 StoryAboutMe）
Ch2 Lab       → 實驗、文章、技術探索
Ch3 Projects  → 案例與交付成果
Ch4 Services  → 顧問服務模組
Ch5 Connect   → 預約諮詢 + LINE 官方帳號
```

### Ch0 — Logo（Opening）

**情緒**：進站 3 秒 — 精密、現代、可信  
**動效**：
- 雙圓從離軸 → 對位 → 斜切劃過（scrub 或 auto intro）
- 可選：薄光帶沿斜切軌跡（非粒子場）
- 大標 `8plus` fade in；副標拆行

**文案（草案）**

| 元素 | zh-TW | en |
|------|-------|-----|
| Eyebrow | `PRECISION · ENGINEERING` | same |
| 主標 | `8plus` | `8plus` |
| 副標 L1 | 架構驅動的技術夥伴 | Architecture-led engineering partner |
| 副標 L2 | 把複雜需求做成可交付的系統 | Turning complex requirements into deliverable systems |

---

*Round 3：實作時依效果選 SVG morph / Canvas / CSS，不預先鎖死。*

---

### Ch1 — Story（關於我）

**來源**：`docs/StoryAboutMe.md`（潤飾）  
**原則**：首頁 **精簡四段** pin 切換；**不載入完整職涯 timeline** — 詳細里程碑留 **`/path`**（WRK 式橫滑 timeline 在 path 實作）  
**動效**：Pin 區塊；4 段文字隨 scroll 切換；結尾 `→ 完整職涯` 連結 `/path`

**潤飾文案 — Beat 1：起點**

> 我從小習慣自學。大學讀生物與化學，成績不差，卻清楚那不是我要走一輩子的路。藝術比賽培養了對形式與秩序的敏感 — 後來這份敏感，都用在程式與系統設計上。

**Beat 2：轉折**

> 在交大分子醫學所，我用 R 與 Python 做基因定序分析，也修了資工課程。一次課堂專案的前後端整合，讓教授看見我的能力，也開啟了接案與自學的路 — 從 HTML 到 React、從腳本到架構。

**Beat 3：實戰**

> 替代役夜間進修、退伍後挑戰純後端、進入電商與 SaaS — 我親手處理過 SLA、藍綠部署、租戶隔離、跨國合規與成本控管。前端大改版時推動共用元件庫，讓工程與產品在同一套語言裡協作。

**Beat 4：信念**

> 自由接案與正職並行，讓我從設計、前端到後端都走過一輪。我愈發確信：**好的架構是長期價值，倉促上線只是延後付帳。** 這也是 8plus 存在的原因。

**章節標（WRK 式拆字）**

```
SELF
DRIVEN
ENGINEERING
```

**i18n**：中英同步 — 文案進 `lib/i18n.ts` 或 `lib/content/home-scroll.ts`（`zh-TW` + `en`）

---

### Ch2 — Lab

**內容**：最新 blog、技術實驗、design-lab 入口、探索中的想法  
**動效**：卡片 stagger reveal；可選水平 scroll 文章列  
**文案**

| 元素 | zh-TW |
|------|-------|
| Eyebrow | `R&D · LAB` |
| 標題 | 持續實驗的技術筆記 |
| 內文 | 架構決策、工具鏈、AI 工作流 — 寫下來的才算數。 |

---

### Ch3 — Projects

**內容**：`getFeaturedCaseStudy` + 精選專案；metrics 表格式 reveal（WRK specs 感）  
**動效**：Parallax 預覽卡；metrics scrub 數字滾動  
**文案**

| 元素 | zh-TW |
|------|-------|
| Eyebrow | `CASE STUDIES` |
| 標題 | 可驗證的交付 |
| 內文 | 從架構設計到上線維運 — 每個專案都有可衡量的結果。 |

---

### Ch4 — Services

**內容**：`home.pillars` / process / pricing 精簡版  
**動效**：A/B/C 模組標記 + pin 切換（對應 WRK 零件拆解）  
**文案**

| 模組 | 標記 | zh-TW |
|------|------|-------|
| 架構顧問 | A | 系統邊界、技術選型、可擴展設計 |
| AI 工作流 | B | 把 AI 嵌進真實流程，而非展示用 |
| 體驗交付 | C | Next.js 生產級模式、Code Review、迭代上線 |

**章節標**

```
CONSULT
BUILD
DELIVER
```

---

### Ch5 — Connect（CTA）

**動效**：雙 CTA 進場；LINE QR 淡入  
**行動**

| CTA | 目標 |
|-----|------|
| 預約 30 分鐘諮詢 | `/booking` |
| 加入 LINE 官方帳號 | `getLineAddFriendUrl()` — `@482ykgdg` |

**文案**

| 元素 | zh-TW |
|------|-------|
| 標題 | 聊聊你的系統挑戰 |
| 內文 | 無論是架構卡關、AI 導入或團隊需要第二意見 — 先用 30 分鐘對齊方向。 |
| Primary | 預約諮詢 |
| Secondary | LINE 官方問答 |

---

## 4. Design System 銜接（概要）

詳見待建 `docs/DESIGN_SYSTEM_SPEC.md`。本階段共識：

| Token | 方向 |
|-------|------|
| `--radius-sm/md/lg` | 8 / 16 / **22px**（22 為卡片預設） |
| Dark palette | 基於 lumina/cinema 深色，accent 保留 `#1863dc` 或電影感藍白 |
| `--motion-*` | duration、ease 統一（待 DS 文件定義） |
| 元件 | `components/motion/*` + `components/ds/*` |

---

## 5. Round 3 決策（2026-06-30 CST）— LOCKED

| # | 議題 | 決定 |
|---|------|------|
| 1 | GSAP + ScrollTrigger | ✅ **接受** |
| 2 | 職涯 timeline | **僅 `/path`**；首頁 Ch1 精簡四段 + 連結 path |
| 3 | 英文版 | ✅ **i18n 同步**（zh-TW + en） |
| 4 | Logo 動效技術 | **實作時選最佳**（SVG / Canvas / CSS 不拘） |
| 5 | 主題 | **全站 dark**；**移除 ThemeToggle**（header + mobile nav） |

---

## 6. 實作 Wave

| Wave | 範圍 | 驗收 |
|------|------|------|
| W0 | Dark DS token、移除 light 切換、GSAP 安裝、`components/motion/*` 骨架 | build 通過；全站 dark |
| W1 | Ch0 Logo + Ch1 Story pin prototype | `/` 或 `/design-lab` 可演示 scrub |
| W2 | Ch2–Ch5 + i18n 文案 | 完整首頁 narrative 中英 |
| W3 | `/path` WRK timeline + 內頁輕量 motion | path 橫滑；about/services/contact |
| W4 | a11y、mobile 降級、perf | reduced-motion；Lighthouse |

*細節：`.planning/phases/3.0-IMPLEMENT-PLAN.md`*

---

*LOCKED — 變更須更新 `.planning/MOTION_CHECKPOINT.md` 並標註時間戳。*
