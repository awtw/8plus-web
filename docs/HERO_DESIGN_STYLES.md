# 8plus Hero 主視覺 — 20 種設計風格規格與測試手冊

*建立：2026-06-30*  
*角色：UX（Sally）+ 架構（Winston）+ 產業調研*  
*狀態：4 種 Live 預覽 / 16 種規格待選*

---

## 1. 調研結論（Awwwards 級主視覺）

### 1.1 產業觀察

2025–2026 [Awwwards Site of the Year](https://www.awwwards.com/annual-awards-2025/site-of-the-year) 入圍作品（如 Lando Norris、Messenger）共同特徵：

| 維度 | 得獎模式 | 8plus 適配 |
|------|----------|------------|
| 主視覺 | 全幅沉浸式動畫，非側邊裝飾 | Logo 粒子化為中心敘事 |
| 互動 | 游標驅動、scroll 敘事（進階版） | Phase 1：pointer 力場 |
| 技術 | WebGL / Canvas GPU 友善 | Canvas 2D + 效能分級，無 Three.js 依賴 |
| 行動 | 降級策略必備 | `prefers-reduced-motion` + 粒子數分級 |
| 排版 | 動畫在上、內容在下 | 已採用 vertical stack |

### 1.2 架構決策（Winston）

```
┌─────────────────────────────────────┐
│  HeroCanvasStage (client)           │
│  ├─ logo-sampler.ts (像素採樣)       │
│  ├─ visual-modes.ts (模式切換)       │
│  └─ Canvas RAF loop                 │
├─────────────────────────────────────┤
│  HeroSection — 動畫區 + 編輯區      │
├─────────────────────────────────────┤
│  /design-lab — 風格 A/B 測試頁       │
└─────────────────────────────────────┘
```

**刻意不採用**：Three.js（bundle 成本、先前移除）、外部 Pinterest 臨摹（辨識度低）。

**預設上線風格**：`particle-morph`（#01）

---

## 2. 測試方式

### 2.1 Design Lab（Live）

| 路徑 | 用途 |
|------|------|
| `/design-lab` | 預設 particle-morph |
| `/design-lab?style=constellation` | 星座連線 |
| `/design-lab?style=liquid-field` | 流場液態 |
| `/design-lab?style=magnetic-grid` | 磁力網格 |

首頁 `/` 固定使用 **particle-morph**。Lab 頁可切換 4 種已實作風格。

### 2.2 評分表（每種風格填 1–5）

| 指標 | 說明 |
|------|------|
| 品牌契合 | 是否像 8plus（架構、可信、工程感） |
| 驚艷度 | 首屏 3 秒內是否抓住注意力 |
| 可讀性 | 動畫是否干擾下方文案 |
| 效能 | 中階手機是否流暢（目標 ≥50fps） |
| 可維護 | 實作複雜度與長期成本 |

**建議流程**：3 人各填表 → 加總 → 選 top 2 進入 Phase 2 精修。

---

## 3. 二十種風格規格

### #01 Particle Morph 粒子聚合 ✅ Live

| 項目 | 內容 |
|------|------|
| 概念 | Logo 像素採樣為 2400 顆粒子，從散開狀態 2.4s 聚合成形 |
| 互動 | 游標排斥力場；idle 微呼吸 |
| 技術 | Canvas 2D + `logo-sampler.ts` |
| 複雜度 | M |
| 行動策略 | 粒子 1100 / 靜態 logo |
| 品牌分 | ★★★★★ |
| 測試 | `/design-lab?style=particle-morph` |

---

### #02 Constellation Graph 星座連線 ✅ Live

| 項目 | 內容 |
|------|------|
| 概念 | 同粒子系統 + 鄰近粒子連線，科技感星座 |
| 互動 | 同 #01 |
| 技術 | Canvas line stroke |
| 複雜度 | M |
| 品牌分 | ★★★★☆ |
| 測試 | `/design-lab?style=constellation` |

---

### #03 Liquid Flow Field 流場液態 ✅ Live

| 項目 | 內容 |
|------|------|
| 概念 | Perlin 式流場推動粒子，logo 為引力井 |
| 互動 | 流場 + 游標擾動 |
| 技術 | Canvas sin/cos 流場 |
| 複雜度 | M |
| 品牌分 | ★★★★☆ |
| 測試 | `/design-lab?style=liquid-field` |

---

### #04 Magnetic Grid 磁力網格 ✅ Live

| 項目 | 內容 |
|------|------|
| 概念 | 變形網格 + 中央 logo 粒子 |
| 互動 | 網格隨游標彎曲 |
| 技術 | Canvas grid warp |
| 複雜度 | M |
| 品牌分 | ★★★☆☆ |
| 測試 | `/design-lab?style=magnetic-grid` |

---

### #05 Shader Aurora 極光 Shader ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | 全幅 fragment 極光，logo 為遮罩亮區 |
| 技術 | WebGL / OGL 輕量庫 |
| 複雜度 | H |
| 行動 | CSS 靜態極光漸層 |
| 品牌分 | ★★★★☆ |

---

### #06 Wireframe Morph 線框成形 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | Logo 3D 線框從亂線收斂為品牌輪廓 |
| 技術 | Three.js LineSegments 或 SVG morph |
| 複雜度 | H |
| 品牌分 | ★★★★★ |

---

### #07 Glitch RGB Split 故障色差 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | Logo 三通道錯位 + 間歇 glitch burst |
| 技術 | CSS filter + canvas composite |
| 複雜度 | L |
| 品牌分 | ★★★☆☆（偏潮流，工程感弱） |

---

### #08 Holographic Foil 全息箔片 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | 滑鼠角度驅動 iridescent 高光掃過 logo |
| 技術 | CSS conic-gradient + pointer angle |
| 複雜度 | M |
| 品牌分 | ★★★★☆ |

---

### #09 Ink Bleed 墨水暈染 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | Logo 如墨水滴入水中擴散成形 |
| 技術 | Canvas metaball / blur stack |
| 複雜度 | H |
| 品牌分 | ★★★☆☆ |

---

### #10 LiDAR Scan 雷射掃描 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | 水平掃描線掃過，點雲逐行顯影 logo |
| 技術 | Canvas + 採樣點逐行 reveal |
| 複雜度 | M |
| 品牌分 | ★★★★☆ |

---

### #11 Elastic Blob 彈性融球 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | Meta-ball 融合為 logo 剪影 |
| 技術 | Canvas marching squares 或 WebGL |
| 複雜度 | H |
| 品牌分 | ★★★☆☆ |

---

### #12 Orbital Rings 軌道環系 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | Logo 為引力中心，衛星環與粒子軌道 |
| 技術 | Canvas 橢圓軌道 |
| 複雜度 | M |
| 品牌分 | ★★★★☆ |

---

### #13 ASCII Reveal ASCII 顯影 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | 字元雨收斂為 logo 像素矩陣 |
| 技術 | Canvas text grid |
| 複雜度 | M |
| 品牌分 | ★★★★★（工程感強） |

---

### #14 Cinematic Zoom 電影推進 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | 鏡頭穿過粒子雲推進至 logo |
| 技術 | Canvas scale + blur + GSAP |
| 複雜度 | H |
| 品牌分 | ★★★★☆ |

---

### #15 Bauhaus Build 包浩斯組裝 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | 幾何色塊飛入組裝成 logo |
| 技術 | Framer Motion + SVG |
| 複雜度 | M |
| 品牌分 | ★★★☆☆ |

---

### #16 Depth Parallax 深度視差 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | Logo 多層分離，scroll / pointer 視差 |
| 技術 | CSS 3D transform layers |
| 複雜度 | M |
| 品牌分 | ★★★★☆ |

---

### #17 Glass Prism 玻璃棱鏡 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | 折射棱鏡後方 logo，彩虹邊 |
| 技術 | CSS backdrop-filter + SVG displacement |
| 複雜度 | M |
| 品牌分 | ★★★★☆ |

---

### #18 Neon Trace 霓虹描邊 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | Logo path stroke-dashoffset 描邊動畫 |
| 技術 | SVG animate |
| 複雜度 | L |
| 品牌分 | ★★★☆☆ |

---

### #19 Kinetic Typography 動態字標 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | 「8plus」大字標為主視覺，logo 嵌入字標負空間 |
| 技術 | CSS clip-path + motion |
| 複雜度 | M |
| 品牌分 | ★★★★☆ |

---

### #20 Liquid Metal 液態金屬 ⏳ Planned

| 項目 | 內容 |
|------|------|
| 概念 | 金屬液滴融合為 logo，高光隨游標移動 |
| 技術 | WebGL shader 或 Lottie Premium |
| 複雜度 | H |
| 品牌分 | ★★★★☆ |

---

## 4. 對照總表

| # | 風格 | 狀態 | 複雜度 | 品牌契合 | 驚艷度 | 效能友善 |
|---|------|------|--------|----------|--------|----------|
| 01 | Particle Morph | ✅ | M | ★★★★★ | ★★★★★ | ★★★★☆ |
| 02 | Constellation | ✅ | M | ★★★★☆ | ★★★★☆ | ★★★☆☆ |
| 03 | Liquid Field | ✅ | M | ★★★★☆ | ★★★★☆ | ★★★★☆ |
| 04 | Magnetic Grid | ✅ | M | ★★★☆☆ | ★★★☆☆ | ★★★★★ |
| 05 | Shader Aurora | ⏳ | H | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| 06 | Wireframe Morph | ⏳ | H | ★★★★★ | ★★★★★ | ★★★☆☆ |
| 07 | Glitch RGB | ⏳ | L | ★★★☆☆ | ★★★★☆ | ★★★★★ |
| 08 | Holographic Foil | ⏳ | M | ★★★★☆ | ★★★★☆ | ★★★★★ |
| 09 | Ink Bleed | ⏳ | H | ★★★☆☆ | ★★★★☆ | ★★★☆☆ |
| 10 | LiDAR Scan | ⏳ | M | ★★★★☆ | ★★★★★ | ★★★★☆ |
| 11 | Elastic Blob | ⏳ | H | ★★★☆☆ | ★★★★☆ | ★★★☆☆ |
| 12 | Orbital Rings | ⏳ | M | ★★★★☆ | ★★★★☆ | ★★★★☆ |
| 13 | ASCII Reveal | ⏳ | M | ★★★★★ | ★★★★☆ | ★★★★★ |
| 14 | Cinematic Zoom | ⏳ | H | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| 15 | Bauhaus Build | ⏳ | M | ★★★☆☆ | ★★★☆☆ | ★★★★★ |
| 16 | Depth Parallax | ⏳ | M | ★★★★☆ | ★★★☆☆ | ★★★★★ |
| 17 | Glass Prism | ⏳ | M | ★★★★☆ | ★★★★☆ | ★★★★☆ |
| 18 | Neon Trace | ⏳ | L | ★★★☆☆ | ★★★☆☆ | ★★★★★ |
| 19 | Kinetic Type | ⏳ | M | ★★★★☆ | ★★★★☆ | ★★★★★ |
| 20 | Liquid Metal | ⏳ | H | ★★★★☆ | ★★★★★ | ★★★☆☆ |

---

## 5. 檔案對照

| 檔案 | 職責 |
|------|------|
| `components/home/hero-canvas-stage.tsx` | Canvas 動畫引擎 |
| `components/home/hero-section.tsx` | 首頁 Hero 編排 |
| `lib/hero/logo-sampler.ts` | Logo 像素採樣 |
| `lib/hero/visual-modes.ts` | 模式定義 |
| `app/(site)/design-lab/` | 測試頁 |

---

## 6. 下一步建議

1. 團隊在 Design Lab 試 4 種 Live 風格，填評分表  
2. 選定 1 種精修（粒子密度、入場曲線、色溫）  
3. Phase 2 可實作 #10 LiDAR 或 #13 ASCII（工程感最高）  
4. 若需 scroll 敘事 → 評估 GSAP ScrollTrigger（架構升級）

---

*參考： [Awwwards SOTY 2025](https://www.awwwards.com/annual-awards-2025/site-of-the-year) · Immersive Web 2026 趨勢*
