---
stepsCompleted: [init, domain-analysis, competitive-landscape, technical-trends, synthesis]
inputDocuments:
  - .planning/HERO-GRID-SCROLL-SPEC.md
  - .planning/HERO-LINE-COMPOSE-SPEC.md
  - docs/BRAND_EXPERIENCE_SPEC.md
  - docs/CI_IDENTITY_SPEC.md
workflowType: research
lastStep: 6
research_type: domain
research_topic: AI 與新潮科技品牌 — 主視覺設計語言（2025–2026）
research_goals: 為 8plus 主視覺重啟提供產業證據、反模式與可測試方向
user_name: August
date: 2026-07-06
web_research_enabled: true
source_verification: true
---

# Research Report: AI／新潮科技主視覺設計

**Date:** 2026-07-06  
**Author:** August  
**Research Type:** domain — AI/Tech Hero Visual Identity

---

## Executive Summary

2025–2026 的「AI 感」主視覺正在**典範轉移**：從紫青漸層、粒子場、神經網 SVG 等**可替換裝飾**，轉向 **結構骨架（structural skeleton）+ scroll 敘事 + 克制材質** 的可信度訊號。

對 **8plus**（工程諮詢、人×數位握手 CI）而言：

- **贏**：座標網格、線框、掃描顯影、scroll 驅動、mono HUD、非對稱編輯版面  
- **輸**：AI slop 六件套（漸層 hero、粒子、循環 autoplay、居中 CTA 藥丸、stock 感）  
- **下一步**：用 10 條**可 A/B 的測試假設**驗證，而非再堆疊單一 fullscreen 動畫

---

## 1. 研究方法

| 來源類型 | 內容 |
|----------|------|
| 產業評論 | Everything Design 60 站 AI 品牌同質化審計 |
| 反模式清單 | Sailop「Hero Anti-Slop」21 構圖骨架 |
| 技術趨勢 | InspireFusion / Cubitrek 2026 網頁趨勢 |
| 實作參考 | Codrops 2026 scroll-grid shader、Builder.io Apple scroll 3D |
| 站內契約 | `BRAND_EXPERIENCE_SPEC`、`CI_IDENTITY_SPEC`、Lab 回饋（L/R 系列不滿意） |

---

## 2. 產業現況：AI 主視覺的「同質化危機」

### 2.1 AI Slop 指紋（應迴避）

[Everything Design — *Every AI Company Looks the Same*](https://www.everything.design/blog/branding-for-ai-companies) 對 60 個 AI 網站審計：

| 現象 | 比例 |
|------|------|
| 紫→青（或近親）漸層 hero | 94% |
| H1 含 AI-powered / next-generation 等 | 81% |
| 庫存／AI 生成圖 | 71% |
| 向非技術決策者解釋「模型是什麼」 | 0% |

常見結構：**hero → logo strip → 四 feature 卡 → CTA**，視覺可互換。

[Sailop — *Hero Section Anti-Slop*](https://sailop.com/blog/hero-section-anti-slop-21-compositions-2026) 指出：**60%+** v0/Lovable 站為「居中標題 + 漸層 + 藥丸按鈕」— 使用者 0.3 秒內歸類為「AI 生成頁」。

### 2.2 2026 正向典範：不是更炫，是更「可信」

同篇文章與案例（Cloudphysician、Vecton）：

- **克制 = 成熟**：醫療 AI 刻意不用暗色 glow，改溫暖、可信、醫療級  
- **結構 > 參數**：選定骨架（Editorial Slab、Terminal、Coordinate）後，字體／色票／留白一貫衍生  
- **說清楚問題鏈**：problem → outcome，而非「AI stack logo 牆」

**對 8plus 啟示**：諮詢品牌應像「精密儀器 + 人」，不是「又一間 AI SaaS」。

---

## 3. 新潮科技主視覺的五大語言（2026）

### 3.1 Scroll 敘事（Table Stakes）

- [Cubitrek 2026](https://cubitrek.com/blog/top-10-website-design-trends-for-2026-the-ultimate-guide)：`scroll-driven animations`、View Transitions 已可 production  
- [InspireFusion 2026](https://www.inspirefusion.com/web-design-inspiration-trends-2026/)：動畫綁 scroll 位置，非 autoplay 循環  
- [Builder.io — Apple scroll 3D](https://www.builder.io/blog/webgl-scroll-animation)：`progress 0–1` 驅動場景，**無時鐘** → 可 scrub、可降級  

**8plus 已有**：GSAP ScrollTrigger、`grid-scroll` W0 雛形。  
**缺口**：scroll 應驅動**敘事階段**（底 → 線 → 形 → 握手），非僅視差裝飾。

### 3.2 幾何／網格／線框（Structural Anchor）

- [Codrops — Reactive Depth grid shader](https://tympanus.net/codrops/2026/02/17/reactive-depth-building-a-scroll-driven-3d-image-tube-with-react-three-fiber/)：網格由 **shader 數學生成**，非貼圖旋轉；scroll + hover 共用同一運動系統  
- Awwwards [Noomo Labs 3D hero](https://www.awwwards.com/inspiration/immersive-3d-hero-section-noomo-labs)：玻璃／3D 作**單一錨點**，非滿屏特效  

**8plus CI 對齊**：`square_line`、`whitelinehand`、`handshake` — 應作**結構錨點**，非循環入場貼圖。

### 3.3 Kinetic Typography（文字即動效）

標題隨 scroll 分裂／縮放，圖像可靜態（[InspireFusion #8](https://www.inspirefusion.com/web-design-inspiration-trends-2026/)）。  
利於 **AI-readable**（文字在 HTML，非 Lottie 圖）。

### 3.4 3D in Flat Context（點綴非主導）

一個 sculptural 元素 + 平面編輯版面；Stripe 式克制 3D。  
8plus R3F 應 **lazy + reduced-motion fallback**，禁止常駐重 WebGL 粒子。

### 3.5 Anti-Slop 編輯構圖

Sailop 骨架範例（與 8plus 相關度高）：

| 骨架 | 特徵 | 8plus 適配 |
|------|------|------------|
| **Coordinate / Terminal** | mono 標籤、網格、metadata | 工程諮詢、Blueprint 感 |
| **Editorial Slab** | 非對稱分欄、大留白 | 主 CI 握手作編輯主圖 |
| **Split Stencil** | 遮罩揭示 | 線條 → 半調握手 |
| **Arc Narrative** | 單弧 scroll 故事 | 六章精簡為單屏弧 |

---

## 4. 技術與效能約束（實作邊界）

| 能力 | 建議 | 避免 |
|------|------|------|
| Scroll | GSAP pin + scrub；CSS `scroll-timeline` 輕量層 | 無 scroll 的 rAF 循環 hero |
| 網格 | 靜態底 + scroll 變形；或 shader 線 | PNG 無限旋轉暈眩 |
| 向量動畫 | `humanface_svg` 真 path；procedural SVG overlay | 假裝對嵌入 PNG SVG stroke |
| 互動 | scroll 主導；hover 微反饋 | 滑鼠+陀螺儀+循環三搶戲 |
| 降級 | `prefers-reduced-motion` 靜態終局 | 僅關動畫不留構圖 |
| 效能 | DPR cap、單 Canvas、section lazy | 首屏多 WebGL |

---

## 5. 與 8plus 品牌／CI 的對照

### 5.1 品牌核心（不可丟）

- **人 × 數位**：握手、線框手、紅黑／藍手為敘事終點  
- **精密／架構**：方格透視、掃描、等高線 = 「系統與工程」  
- **克制單色**：灰黑白 + 少量電流藍點綴（非 94% 紫青漸層）

### 5.2 Lab 失敗模式歸納（內部）

| 嘗試 | 使用者反應 | 根因假設 |
|------|------------|----------|
| 藍線經緯 + 陀螺儀 | 不滿意 | 特效搶戲、缺敘事終點 |
| V05 半調裂合滿版 | 不滿意 | 循環 autoplay 像 demo 非 hero |
| L05/L06/L03 循環 Lab | 不滿意 | 未與 scroll／信任敘事綁定 |
| Grid scroll W0 | 方向正確 | **靜態底 + scroll 才動** 待深化 |

### 5.3 差異化機會

8plus 不是「賣模型」— 主視覺應傳達：

1. **架構在場**（grid／blueprint）  
2. **人在場**（線框／握手）  
3. **時間在場**（scroll 階段，非 GIF 循環）  
4. **專業在場**（編輯構圖、mono 標籤，非 slop）

---

## 6. 競品／靈感光譜（簡表）

| 類型 | 代表 | 可借 | 不借 |
|------|------|------|------|
| AI 同質化 SaaS | 多數 startup hero | 資訊架構清晰度 | 漸層粒子 H1 |
| 克制 B2B AI | Cloudphysician、Vecton | 可信度、問題鏈 | 醫療溫暖色（除非品牌擴張） |
| 沉浸式工作室 | Noomo、Awwwards SOTD | 單一 3D 錨點、scroll 章節 | 全站 WebGL 重量 |
| 開發者工具 | Stripe、Linear 系 | 網格、mono、暗色 | 完全無人的冷抽象 |
| 編輯型 | Inkwell 敘事 | 單弧幾何錨點 | 過長 scroll 影響轉換 |

---

## 7. 研究結論（給 UX／開發）

### 7.1 設計原則（R5 LOCKED 候選）

1. **No Autoplay Hero** — 進場靜態，scroll 才推進  
2. **One Arc** — 單屏內 3–4 階段，非 4s 循環  
3. **Structural Skeleton First** — 先定構圖骨架再填 CI 資產  
4. **Anti-Slop Palette** — 禁紫青漸層主導；用 CI 黑＋白線＋單點藍  
5. **Terminal Metadata** — HUD／座標強化「工程精密」  
6. **Trust Endpoint** — 每條方向必須有清晰終局（握手／匯合／定格）  
7. **Progressive WebGL** — 3D 僅在階段 3+ 或 hover，且可靜態降級  

### 7.2 驗證方法

- 每方向：**1 張 mood 卡 + 1 個 scroll Lab + 3 條成功指標**  
- 使用者回覆格式：`R5-0X + 喜歡／不喜歡一詞`  
- 避免一次實作 10 個滿版；先 **牆上 10 卡 → 選 2 → 滿版**

---

## References

1. [Everything Design — Branding for AI Companies (2026)](https://www.everything.design/blog/branding-for-ai-companies)  
2. [Sailop — Hero Section Anti-Slop (2026)](https://sailop.com/blog/hero-section-anti-slop-21-compositions-2026)  
3. [Cubitrek — Web Design Trends 2026](https://cubitrek.com/blog/top-10-website-design-trends-for-2026-the-ultimate-guide)  
4. [InspireFusion — 10 Web Design Trends 2026](https://www.inspirefusion.com/web-design-inspiration-trends-2026/)  
5. [Codrops — Scroll-Driven 3D Image Tube + Grid Shader (Feb 2026)](https://tympanus.net/codrops/2026/02/17/reactive-depth-building-a-scroll-driven-3d-image-tube-with-react-three-fiber/)  
6. [Builder.io — Apple-style Scroll 3D](https://www.builder.io/blog/webgl-scroll-animation)  
7. [Awwwards — Noomo Labs Immersive 3D Hero](https://www.awwwards.com/inspiration/immersive-3d-hero-section-noomo-labs)  
8. 站內：`.planning/research/domain-home-hero-futuristic-research-2026-07-01.md`

---

*研究完成：2026-07-06 12:00 CST — 供 Sally R5 測試方針提取*
