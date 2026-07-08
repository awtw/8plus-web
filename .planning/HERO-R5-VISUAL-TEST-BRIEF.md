# Hero R5 — 主視覺測試方針（10 選）

*建立：2026-07-06 12:00 CST*  
*作者：Sally · UX Designer*  
*依據：`.planning/research/domain-ai-tech-hero-visual-research-2026-07-06.md`*  
*狀態：待選型 — 先卡牆後滿版*

---

## 從研究中提取的 7 條鐵律

1. **禁 AI Slop** — 無紫青漸層主導、無粒子場、無神經網 SVG 背景  
2. **Scroll 敘事** — 靜態進場，捲動推進；禁 4s 循環 autoplay  
3. **結構骨架** — 先定構圖（Terminal / Editorial / Arc），再套 CI  
4. **終局清晰** — 每方案必須落到握手／匯合／定格  
5. **克制 3D** — WebGL 點綴，非滿屏；必須可靜態降級  
6. **工程語意** — 網格、mono、掃描 = 8plus 精密感  
7. **可測** — 每條 3 個成功指標，使用者 10 秒能說出「像什麼」

---

## 10 種測試方針

### R5-01｜Blueprint Grid Scroll（藍圖網格捲動）

| 項目 | 內容 |
|------|------|
| **骨架** | Coordinate / Terminal |
| **敘事** | 靜態 `square_line` 底 → scroll 拉開景深 → 中縫光 → 終局留白給文案 |
| **CI** | `square_line` + `lines` |
| **動效** | GSAP pin scrub only（延伸 W0 `grid-scroll`） |
| **反模式** | 旋轉 PNG、autoplay |
| **成功指標** | ① 未捲動像壁紙 ② 捲動跟手 ③ 不暈不搶字 |
| **Lab** | `/design-lab/grid-scroll`（已有，深化） |

---

### R5-02｜Editorial Handshake（編輯主圖握手）

| 項目 | 內容 |
|------|------|
| **骨架** | Editorial Slab — 非對稱分欄 |
| **敘事** | 左：大標 + pillars；右：`handshake.png` 靜態主圖；scroll 僅微 parallax |
| **CI** | `handshake.png` 主導 |
| **動效** | 文字 stagger on scroll；圖 ≤5% parallax |
| **反模式** | 居中漸層 hero、循環動畫 |
| **成功指標** | ① 像雜誌封面 ② 3 秒讀懂品牌 ③ 手機可讀 |
| **Lab** | 待建 `/design-lab/editorial-hero` |

---

### R5-03｜Scan Construct（掃描建構）

| 項目 | 內容 |
|------|------|
| **骨架** | LiDAR / Terminal |
| **敘事** | 黑底 + 線框邊界 → 橫掃線落下 → handshake 顯影 |
| **CI** | `handshake.png` + procedural 掃描線 |
| **動效** | **scroll 綁 scan progress**（非 4s loop） |
| **反模式** | 獨立 rAF 循環 |
| **成功指標** | ① 「被掃出來」感 ② scroll 回捲可逆 ③ 像儀器非遊戲 |
| **Lab** | 改寫 `/design-lab/scan-build` → scroll 版 |

---

### R5-04｜Wire Converge Arc（線框匯合弧）

| 項目 | 內容 |
|------|------|
| **骨架** | Arc Narrative（單弧） |
| **敘事** | 邊緣 procedural 線匯入 → whiteline 雙手 snap → 定格 |
| **CI** | `whitelinehand_1/2` |
| **動效** | scroll 0–60% 匯線；60–100% 匯合 |
| **反模式** | 無終局的 shimmer 循環 |
| **成功指標** | ① 線條湊成一幅畫 ② 匯合點明確 ③ 極簡不空 |
| **Lab** | 待建 `/design-lab/wire-arc` |

---

### R5-05｜Portal Split（方塊開門）

| 項目 | 內容 |
|------|------|
| **骨架** | Split Stencil |
| **敘事** | 方格門扇合攏 → scroll 裂開 → handshake 顯影 |
| **CI** | `square_line` + `squrare_2` + `handshake` |
| **動效** | scroll 驅動門扇 X；禁 autoplay |
| **反模式** | 方格無限旋轉 |
| **成功指標** | ① 開門一瞬有驚喜 ② 終局 CI 清晰 ③ 不遮文案區 |
| **Lab** | 改寫 `/design-lab/grid-assemble` → scroll 版 |

---

### R5-06｜Halftone Trust（半調信任）

| 項目 | 內容 |
|------|------|
| **骨架** | Editorial + Restraint（Cloudphysician 路線） |
| **敘事** | 純黑底；`handshake` 半調主體；極少線條；scroll 只調曝光 |
| **CI** | `handshake.png` only |
| **動效** | 幾乎靜態；scroll 微 vignette |
| **反模式** | glow、粒子、霓虹 |
| **成功指標** | ① B2B 可信 ② 不像 AI SaaS ③ 印刷品質感 |
| **Lab** | 待建 `/design-lab/halftone-trust` |

---

### R5-07｜Kinetic Pillars（動態字標柱）

| 項目 | 內容 |
|------|------|
| **骨架** | Kinetic Type + Static Visual |
| **敘事** | 背景：靜態網格或純黑；前景：三柱文案 scroll reveal；右下小圖 handshake |
| **CI** | 文案主導 + `handshake` 配角 |
| **動效** | GSAP 字標 split／mask；圖不動 |
| **反模式** | 全屏 WebGL |
| **成功指標** | ① 訊息優先 ② AI 爬蟲可讀 H1 ③ 轉換導向 |
| **Lab** | 接 `section-hero` 文案層 prototype |

---

### R5-08｜Shader Grid Plane（著色器網格平面）

| 項目 | 內容 |
|------|------|
| **骨架** | Coordinate + 3D in Flat |
| **敘事** | R3F 單平面 shader 網格；scroll 彎曲平面；階段 2 疊線框手 |
| **CI** | procedural grid + `whitelinehand` |
| **動效** | scroll progress → uniform；hover 微起伏 |
| **反模式** | 重 GLB、多光源秀 |
| **成功指標** | ① 網格銳利不糊 ② 60fps 中階機 ③ reduced-motion 有靜態圖 |
| **Lab** | 待建 `/design-lab/shader-grid` |

---

### R5-09｜Velocity Wire（速度感線框）

| 項目 | 內容 |
|------|------|
| **骨架** | Scroll velocity reactive |
| **敘事** | 線框雙手常駐；**捲動速度**驅動傾斜／呼吸（非滑鼠） |
| **CI** | `whitelinehand_1/2` |
| **動效** | ScrollTrigger velocity → rotateX 微調 |
| **反模式** | 陀螺儀 + 滑鼠 + 循環三疊 |
| **成功指標** | ① 快捲有動能 ② 停住即靜 ③ 不暈 |
| **Lab** | 待建 `/design-lab/velocity-wire` |

---

### R5-10｜Full Arc CI（全譜單弧）

| 項目 | 內容 |
|------|------|
| **骨架** | Inkwell 式單弧 |
| **敘事** | 一條 scroll：`方格底 → 等高線 → 線框手 → handshake` 四幕 |
| **CI** | `square_line` → `lines` → whiteline → handshake |
| **動效** | 單 pin 250% scrub；階段標記 HUD |
| **反模式** | 四幕各自循環 |
| **成功指標** | ① 一鏡到底 ② 每幕可辨 ③ 終局握手記憶點 |
| **Lab** | 待建 `/design-lab/ci-arc` |

---

## 建議測試順序

```
Phase A（低風險，1–2 天）
  R5-01 Blueprint Grid Scroll  ← 已有 W0
  R5-06 Halftone Trust        ← 試極簡對照
  R5-07 Kinetic Pillars       ← 試文案主導

Phase B（敘事弧）
  R5-10 Full Arc CI
  R5-04 Wire Converge Arc
  R5-05 Portal Split

Phase C（技術上限）
  R5-08 Shader Grid
  R5-09 Velocity Wire
```

---

## 使用者回覆格式

```
R5-03 + R5-10
或
R5-06 但要更暖
或
全部不要 3D，只在 R5-01/04/07 選
```

---

## 與舊 R3/R4 的關係

| 舊編號 | R5 對應 | 變更 |
|--------|---------|------|
| L01–L10 線條卡 | R5-04/10 | 改 scroll 敘事，禁循環 |
| D01–D15 方向卡 | 歸檔參考 | 不再新增同型卡 |
| grid-scroll W0 | **R5-01** | 正式納入測試矩陣 |
| wire-weave / scan-build Lab | 改 scroll 或歸檔 | 循環版否決 |

---

*Sally：請先回 2–3 個 R5 編號，我們做卡牆 + scroll Lab，不再做 autoplay 滿版。*
