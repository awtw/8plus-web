---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments:
  - .planning/PROJECT.md
  - .planning/phases/2.3-RESEARCH.md
  - .planning/UIX_REDESIGN_PLAN.md
  - docs/DESIGN_SYSTEM_COMPLIANCE_REPORT.md
workflowType: research
lastStep: 6
research_type: domain
research_topic: 8plus 官網文案、首頁排版與現代 AI 感動效升級
research_goals: 調研 2026 企業 AI 品牌網站趨勢；盤點現站文案/排版/動效缺口；提出可執行修改方針（文案、Bento 首頁、Share、全站動效）供下一階段實作
user_name: August Wang
date: 2026-06-30
web_research_enabled: true
source_verification: true
---

# Research Report: domain

**Date:** 2026-06-30 CST  
**Author:** August Wang  
**Research Type:** domain — 8plus 官網文案、首頁排版與現代 AI 感動效升級

---

## Research Overview

### 方法

1. **站內盤點**：`app/(site)/**`、`lib/i18n.ts`、`lib/content/*.ts`、`components/home/bento-grid.tsx`、`docs/DESIGN_SYSTEM_COMPLIANCE_REPORT.md`
2. **外部調研**：2026 AI 品牌網站趨勢、Bento Grid 動效實作、Cohere / Linear 類企業 AI 設計語彙
3. **約束對齊**：既有 Cohere design system、Phase 2.3 Bento 決策、78% 合規現況

### 核心結論（TL;DR）

| 維度 | 現況 | 建議方向 |
|------|------|----------|
| **品牌定位** | 「架構驅動 + AI 落地」已對，但部分頁面仍殘留舊版「前端開發服務商」語氣 | 統一為 **「企業技術夥伴 / Architecture-led AI delivery」** 敘事 |
| **AI 感** | 靠 Cohere token + Bento，非 cliché 漸層；動效偏少、Bento 格未 stagger | **克制型現代感**：結構性動效 + 1 個 signature moment，避開紫青粒子風 |
| **首頁排版** | Bento 已上線，資訊密度高但視覺節奏扁平、下區塊與上區塊斷層 | 強化 **視覺層級 + scroll reveal + spotlight hover**，重排 testimonial / process 區 |
| **Share** | 三模式成熟、動效最佳；文案與主站 hero 略不同步 | 對齊主站價值主張，強化 **單行 punch line + 可量化信任指標** |
| **全站文案** | `home.services.*`、`about.content` 等 legacy 字串未清 | 第二輪 **i18n / content 模組大掃除** |

---

## 一、產業與領域調研（2026）

### 1.1 AI 品牌網站的「同質化陷阱」

來源：[Everything Design — Every AI Company Looks the Same](https://www.everything.design/blog/branding-for-ai-companies)、[Sailop — 73 Design Patterns 2026](https://sailop.com/blog/from-ai-slop-to-signature-73-patterns-2026)

**高頻 cliché（應避免）**

- 紫→青漸層 hero、神經網路背景、粒子場
- H1 開頭「AI-powered / next-generation / intelligent」
- hero → logo strip → 四張 feature card → CTA 的固定模板
- 過度 hover scale、到處 spring bounce

**2026 贏家模式**

- **克制即成熟**：用留白、編輯式排版、單一 accent 傳達 AI 可信度（Cloudphysician、SISA 案例）
- **動效服務敘事**：動效解釋「不可見的架構」，而非裝飾（Deep Tech 網站趨勢，[Everything Design](https://www.everything.design/blog/website-agency-deep-tech-startup)）
- **一個 signature animation**：全站 1–2 個高度打磨的時刻，其餘 150–200ms 功能性過渡
- **具體品類定位**：取代泛稱「AI 顧問」→「架構驅動的 AI 工作流落地」

### 1.2 8plus 的參考座標（已投資方向）

| 參考 | 8plus 已採用 | 可再深化 |
|------|-------------|----------|
| **Cohere** | CohereText + Unica77、22px radius、白底冷灰、單色 accent `#1863dc` | Voronoi/細胞語彙可作 **極淡背景紋理**（靜態 SVG，非動畫） |
| **Linear** | 未直接引用 | 可借 **stagger reveal、邊框 spotlight、mono label** |
| **ElevenLabs** | Share 第三模式 | 主站保持 Cohere 主線，Share 作實驗島 |
| **Bento Grid** | `components/home/bento-grid.tsx` + Framer Motion 入場 | [Aceternity](https://ui.aceternity.com/blog/how-to-create-a-bento-grid-with-tailwindcss-nextjs-and-framer-motion)、[OGBlocks](https://ogblocks.dev/blog/animated-bento-grid-for-react) 的 `whileInView` + mouse spotlight |

### 1.3 技術棧建議（與現有 repo 對齊）

| 需求 | 建議 | 理由 |
|------|------|------|
| 入場 / stagger | **Framer Motion**（已安裝） | 首頁、Share 已用；擴展 `whileInView` + `staggerChildren` |
| 卡片 spotlight | CSS `radial-gradient` + `mousemove` on BentoCard | 低成本 premium 感，GPU compositing |
| 平滑捲動 | **可選** Lenis | 僅當要做 scrollytelling 時引入；個人品牌站非必須 |
| 複雜時間軸 | GSAP ScrollTrigger | 過重；`/path` 暫不建議 |
| 3D / 粒子 | **不建議** | 與 Cohere 克制原則衝突、維護成本高 |
| 效能 | `prefers-reduced-motion` 全域降級 | a11y + 行動端 60fps |

---

## 二、現站盤點

### 2.1 文案層 — 痛點與不一致

#### 首頁（`lib/i18n.ts` → `home.*`）

| 欄位 | 現況 | 問題 |
|------|------|------|
| `heroTitle1/2` | 以架構驅動 / AI 與體驗落地 | ✅ 方向正確；英文第二行略長，mobile 換行可再短 |
| `heroLead` | 長句三合一（架構+AI+UX） | 資訊完整但 scan 成本高；建議拆 **lead + 三個 bullet chip** |
| `home.services.*` | 前端開發 / 架構設計 / 技術諮詢 | ❌ **legacy**，Bento 已改用 `pillars`，此區塊未清 |
| `subtitle` | 舊版「專注於前端工程…」 | ❌ 未在 UI 使用但仍在 i18n，易誤導後續編輯 |
| `statDomains: "4"` | 數字無語境 | 訪客不知「4」代表什麼；改 **具名場景** 或加 tooltip |
| Case Study 標籤 | 硬編碼英文 `Case Study` / `Archive` / `Lab` | 中英混用；應走 `t()` |

#### Share（`lib/content/share.ts`）

| 欄位 | 現況 | 建議 |
|------|------|------|
| `lead` | 與 home `heroLead` 語意相近 | 改更短、更口語的 **電梯簡報版**（≤40 字 zh） |
| `stats` | 全端工程 / 企業架構 / AI 導入 | 好；可改 **數字化**（8+ 年、3 類交付、Cal.com 直約）與主站 `heroStats` 對齊 |
| `role` | 工程顧問 · 架構設計 · 產品落地 | ✅ |
| `social.github.badge` | `100+ repos` | 可驗證則留；否則改 **「開源實驗」** 避免過度承諾 |

#### 全站 legacy 字串（待清）

- `about.content`：「我們是專注於前端工程和技術諮詢的**團隊**」— 個人品牌應為 **I / 我**
- `services.description`（舊 title 區）：「提供全方位的前端開發…」— 與新 `services.headline` 重複且語氣舊
- `projects.description`：「精選的技術 Lab」— 可補 **case study 與 lab 差異** 一句話
- `blog.description`：泛稱「分享前端技術」— 可升級為 **架構 / AI 工作流 / 交付實務**

#### 文案語氣原則（建議鎖定）

```
第一人稱（我）+ 第二人稱（你/你的團隊）
具體動詞：拆解、校準、交付、驗證
避免：AI-powered、賦能、一站式、領先的
英文：短句、主動語態；標題 ≤6 words
```

### 2.2 首頁排版 — 現況與缺口

**現有結構**（`app/(site)/page.tsx`）

```
BentoGrid (hero 3col + profile 1col + pillars×2 + trust + case study + pricing + pillar3)
→ testimonials 2col
→ process 3 steps
→ posts | projects 2col
→ closing CTA
```

**優點**

- Bento 符合 2026 趨勢與 Phase 2.3 決策
- 轉換路徑完整：booking / pricing / process / contact
- `surface-card` + token 一致

**缺口**

| # | 問題 | 影響 |
|---|------|------|
| 1 | Bento 內多數 cell **無獨立 motion**（僅 hero/profile 有 `cardVariants`） | 進場平淡，AI 感不足 |
| 2 | pillars 只顯示 3 個但 grid 分散；第三個 pillar 孤立在右下 | 視覺重心失衡 |
| 3 | testimonial / process / posts 區 **脫離 Bento 語彙**，變傳統 section | 上下半頁像兩個設計系統 |
| 4 | `heroStats` 中 `Cal.com` 作 value 不直覺 | 信任訊號弱 |
| 5 | 無 **scroll-triggered** 動效 | 長頁缺少現代節奏 |
| 6 | 缺少 **signature visual**（極淡 voronoi / 架構示意線框） | 記憶點不足 |

### 2.3 動效現況

| 頁面 | 動效 | 評分 |
|------|------|------|
| `/` | hero fade-up；其餘靜態 | ⚠️ 不足 |
| `/share` | page stagger + spring ease + 背景 radial blur | ✅ 最佳參考 |
| 其他頁 | 基本無 | — |
| globals | `--motion-fast: 150ms`；已移除 aurora（STATE 紀錄） | ✅ 合規 |

**Share 可複製到主站的 pattern**

```tsx
// share/page.tsx 已驗證
pageVariants: staggerChildren 0.07
itemVariants: opacity 0→1, y 14→0, ease [0.34, 1.56, 0.64, 1]
背景: 雙 radial-gradient blur（非粒子）
```

### 2.4 Design System 合規殘餘（影響視覺現代感）

來源：`docs/DESIGN_SYSTEM_COMPLIANCE_REPORT.md`（2026-06-30）

- `/contact` 未收斂 → 全站體驗斷層
- `/path` 漸層節點 → 與主站 Cohere 不一致
- `rounded-2xl` vs `--radius-md` 混用 → 精緻感打折
- `prose-slate` → 內容頁色溫不統一

---

## 三、修改方針

### 3.1 文案修改方針

#### P0 — 首頁 + Share（高曝光）

**首頁 Hero（zh 建議稿）**

| 欄位 | 建議文案 |
|------|----------|
| eyebrow | `8plus · Architecture & AI Delivery`（維持） |
| heroTitle1 | `把複雜需求` |
| heroTitle2 | `做成可交付的系統` |
| heroLead | `從架構設計、AI 工作流導入到產品體驗——我協助團隊在真實限制下做出能驗證、能維護的交付。` |
| chips（新增） | `架構路線圖` · `AI 落地` · `體驗校準` |

**首頁 Hero（en 建議稿）**

| heroTitle1 | `Turn complex requirements` |
| heroTitle2 | `into shippable systems` |
| heroLead | `Architecture, AI workflow integration, and product experience — aligned so your team can verify, ship, and maintain.` |

**Share lead（zh）**

> `工程顧問 · 架構與 AI 落地。掃碼或預約，30 分鐘把問題理清。`

**Share lead（en）**

> `Engineering partner for architecture and AI delivery. Scan or book — 30 minutes to frame the problem.`

**heroStats 調整**

| 現況 | 建議 |
|------|------|
| 8+ / 實戰年資 | 保留 |
| 4 / 專長場景 | → `SaaS · 企業後台 · AI 工作流 · 平台重構`（或改數字為 `3` 大交付類型並加 label） |
| Cal.com / 合作入口 | → `30 min` / `Discovery Call` |

#### P1 — 全站語氣統一

1. 刪除或標記 deprecated：`home.subtitle`、`home.services.*`
2. `about`：全面改第一人稱（`lib/content/about.ts`）
3. `projects` / `blog` description：補 **與主站定位一致** 的一句 lead
4. 硬編碼英文標籤 → `i18n` keys：`home.labelCaseStudy`、`home.labelArchive`、`home.labelLab`
5. `process-pricing` / `trust` content：檢查中英文長度平衡（mobile 不爆版）

#### P2 — 微文案（轉換優化）

- closing CTA：加入 **社會證明錨點**（例：「已有 X 類型團隊透過 Discovery Call 啟動合作」— 若無真實數據則用質化描述）
- FAQ：補「AI 導入是否只做 demo？」「遠端協作如何進行？」
- booking cards：與 process step 01 用語對齊

### 3.2 首頁排版修改方針

#### 方案：**Bento+ 分層敘事**（在現有 Bento 上演進，非推翻）

```
┌─────────────────────────────────────────────────────────┐
│ L1 Hero Bento（維持 3+1，加 signature 背景紋理）          │
├─────────────────────────────────────────────────────────┤
│ L2 能力三角（3 pillars 等寬橫排，mobile stack）           │
├─────────────────────────────────────────────────────────┤
│ L3 證明帶：TrustBar + Case Study 2col（case study 加大）  │
├─────────────────────────────────────────────────────────┤
│ L4 轉換帶：Process 精簡 3-step + Pricing teaser 並列    │
├─────────────────────────────────────────────────────────┤
│ L5 內容帶：Posts | Projects（維持，加 BentoCard 包裝）    │
├─────────────────────────────────────────────────────────┤
│ L6 Testimonials（移入 L3 下方或 L4 前，避免孤立）         │
├─────────────────────────────────────────────────────────┤
│ L7 Closing CTA（維持 surface-card-strong）               │
└─────────────────────────────────────────────────────────┘
```

**具體調整**

1. **Pillars 獨立成 L2 section**：三欄等寬，每卡 icon + title + 一行描述 + ghost link「了解更多 → /services」
2. **Case Study 升級為 L3 主角**：`colSpan={2}` + 可選產品截圖 / 架構示意（靜態 SVG）
3. **Testimonials 上移**：緊接 trust/case study，形成「證明鏈」
4. **Posts/Projects 外層改 BentoCard**：視覺與上半統一
5. **間距**：section 間 `space-y-8 lg:space-y-12`（現 `space-y-4` 偏緊）

#### 響應式

- mobile：hero CTA sticky 不建議（干擾閱讀）；維持 in-flow CTA
- tablet：Bento 2col；pillars 1col stack
- desktop：維持 4col grid

### 3.3 動效與「AI 感」修改方針

#### 原則：**Structural Motion, Not Decoration**

| 層級 | 做法 | 檔案 |
|------|------|------|
| **全站** | `prefers-reduced-motion: reduce` 時關閉 stagger / parallax | `globals.css` |
| **Bento 入場** | `whileInView` + `viewport: { once: true, margin: "-80px" }` + stagger 0.05s | `page.tsx` / 新 `motion-presets.ts` |
| **Card hover** | 邊框 `--hover-border` + 微 elevation（已有 token）+ 可選 spotlight | `bento-grid.tsx` |
| **Hero signature** | 極淡 **靜態** Voronoi SVG 於 hero 卡背景（opacity 3–5%） | `public/patterns/voronoi-subtle.svg` |
| **文字** | Hero 標題 **逐行** fade-up（2 lines stagger） | framer-motion `staggerChildren` on h1 |
| **Share→主站** | 複用 share 的 `pageVariants` / `itemVariants` 至共用 hook | `lib/motion.ts` |
| **不做** | 粒子、神經網路、紫青漸層、全頁視差、自訂 cursor | — |

#### 建議新增共用模組

```
lib/motion.ts          — variants 集中管理
components/motion-reveal.tsx — whileInView wrapper
components/bento-spotlight-card.tsx — mouse radial highlight（可選）
```

#### 「AI 感」的正確來源（非視覺特效）

1. **文案具體化**：寫「RAG 權限邊界」「sprint 可驗證交付」而非「智能賦能」
2. **Case study 指標**：`resultMetrics` chips 可見
3. **Process 可視化**：步驟編號 + duration mono label（CohereMono 風）
4. **Blog 主題**：AI workflow、architecture-first（已有 2026-06-30 文章）
5. **編輯式排版**：display serif 大標 + 冷灰 body（已具備）

---

## 四、分頁修改清單

| 頁面 | 文案 | 排版 | 動效 | 優先 |
|------|------|------|------|------|
| `/` | P0 hero + stats + labels | Bento+ 分層 | stagger + spotlight | **P0** |
| `/share` | P0 lead + stats 對齊 | 微調 spacing | 已佳，抽共用 | **P0** |
| `/services` | 檢查 items 與 pillars 一致 | 可加 icon | section reveal | P1 |
| `/process` | 與 home process 區用語統一 | ProcessSteps 已有 | step stagger | P1 |
| `/pricing` | tier 描述更具體 | 維持 | card reveal | P1 |
| `/contact` | lead 可加 LINE 選項 | **收斂 Cohere 卡片** | form focus ring | **P0** |
| `/about` | 第一人稱 | 已有 surface-card | 輕量 reveal | P1 |
| `/path` | milestone 企業化（部分完成） | 去漸層節點 | timeline draw（可選） | P1 |
| `/projects` | lab vs case study 說明 | 列表卡統一 | hover | P2 |
| `/blog` | description 升級 | 列表卡統一 | hover | P2 |
| `/booking` | 與 discovery 用語對齊 | 維持 | — | P2 |

---

## 五、實作路線圖（建議 Phase 2.4）

### Wave 1 — 文案與轉換（1–2 天）

- [ ] 更新 `lib/i18n.ts` home hero / stats / labels
- [ ] 更新 `lib/content/share.ts` lead + stats
- [ ] 清除 deprecated i18n keys
- [ ] Case Study / Archive / Lab 標籤 i18n 化

### Wave 2 — 首頁排版（2–3 天）

- [ ] Pillars 獨立 L2 section
- [ ] Testimonials 上移
- [ ] Posts/Projects BentoCard 包裝
- [ ] Section 間距調整
- [ ] 可選：hero voronoi 背景

### Wave 3 — 動效系統（2 天）

- [ ] `lib/motion.ts` + `MotionReveal`
- [ ] Bento `whileInView` stagger
- [ ] BentoCard spotlight hover
- [ ] `prefers-reduced-motion` 降級
- [ ] Share variants 抽共用

### Wave 4 — 全站收斂（2–3 天）

- [ ] `/contact` Cohere 收斂
- [ ] `/path` 節點 token 化完成
- [ ] `rounded-2xl` → `--radius-md` 清掃
- [ ] `prose-slate` 移除
- [ ] Design system grep gate（CI 建議）

---

## 六、驗收標準

| 指標 | 目標 |
|------|------|
| 文案一致性 | 全站無「團隊」「前端開發服務商」legacy 語氣；hero/share 價值主張一致 |
| 視覺現代感 | 首頁有 scroll reveal；Share 級 stagger 擴展至主 Bento |
| AI 感 | 具體交付語彙 + case metrics；**無** AI cliché 視覺 |
| 效能 | LCP 不劣化；`pnpm build` 通過 |
| a11y | `prefers-reduced-motion` 有效；動效不阻擋操作 |
| DS 合規 | 合規率 78% → **≥90%**（contact/path/radius 清完） |

---

## 七、風險與取捨

| 風險 | 緩解 |
|------|------|
| 動效過多 → 像 startup demo | 遵守「每屏最多 1 種入場動效」 |
| 文案改動影響 SEO | hero H1 保留關鍵字「架構」「AI」；改 meta description 同步 |
| Bento 重排破壞既有 QA | 分 wave 合併；每 wave `pnpm build` |
| Lenis/GSAP 依賴膨脹 | 僅 Framer Motion + CSS，不新增重型庫 |

---

## 八、引用來源

1. [Everything Design — Every AI Company Looks the Same](https://www.everything.design/blog/branding-for-ai-companies)（2026 AI 品牌同質化）
2. [Everything Design — Deep Tech Startup Websites](https://www.everything.design/blog/website-agency-deep-tech-startup)（結構性動效）
3. [Sailop — 73 Design Patterns 2026](https://sailop.com/blog/from-ai-slop-to-signature-73-patterns-2026)（打破 AI default）
4. [Aceternity UI — Bento Grid + Framer Motion](https://ui.aceternity.com/blog/how-to-create-a-bento-grid-with-tailwindcss-nextjs-and-framer-motion)
5. [OGBlocks — Animated Bento Grid](https://ogblocks.dev/blog/animated-bento-grid-for-react)
6. [Pentagram — Cohere Brand](https://www.pentagram.com/work/cohere)（New Nature / Voronoi）
7. [oh-my-design — Cohere Design System](https://oh-my-design.kr/design-systems/cohere)（enterprise command deck）
8. 內部：`docs/DESIGN_SYSTEM_COMPLIANCE_REPORT.md`、`.planning/phases/2.3-RESEARCH.md`、`.planning/UIX_REDESIGN_PLAN.md`

---

## 九、下一步行動

使用者確認後可擇一啟動：

1. **Wave 1 文案 PR** — 只改 `i18n` + `share.ts`，最快見效
2. **Wave 2+3 首頁體驗 PR** — 排版 + 動效
3. **全 Phase 2.4 執行** — `/gsd-execute-phase` 或 `/gsd-plan-phase`

---

*Domain Research 交付 · Mary (BA) · 2026-06-30 CST*
