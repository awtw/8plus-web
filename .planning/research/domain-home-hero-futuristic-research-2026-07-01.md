---
stepsCompleted: [init, domain-synthesis]
inputDocuments:
  - docs/BRAND_EXPERIENCE_SPEC.md
  - docs/MOTION_DESIGN_SPEC.md
  - docs/CI_IDENTITY_SPEC.md
  - docs/HERO_DESIGN_STYLES.md
  - .planning/phases/4.0-ROUND2-LOCKED.md
workflowType: research
lastStep: 1
research_type: domain
research_topic: 8plus 首頁主視覺 — 動畫化、現代未來感沉浸式體驗
research_goals: 為 Phase 4 主視覺重構提供 20 個可實作方向，對齊線框手敘事與技術棧
user_name: August
date: 2026-07-01
web_research_enabled: true
source_verification: true
---

# Research Report: domain

**Date:** 2026-07-01  
**Author:** August  
**Research Type:** domain — Immersive Web / Futuristic Hero Design

---

## Research Overview

### 方法

- 站內契約：`BRAND_EXPERIENCE_SPEC`（Void→Portal 六章）、`4.0-ROUND2-LOCKED`（R3F + GSAP）
- 產業調研：2025–2026 Awwwards 沉浸式 scroll-driven 3D（[Digital Strategy Force 2026](https://digitalstrategyforce.com/journal/why-are-immersive-experiences-dominating-the-2026-awwwards/)、[Inkwell case](https://www.awwwards.com/inkwell-a-scroll-driven-narrative-for-ais-most-stealth-player.html)、[Codrops GSAP 3D 2025](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/)）
- 技術對照：R3F wireframe portfolio 趨勢（低 opacity 白線、雕塑感非 glow blob）

### 產業結論（2025–2026）

| 趨勢 | 8plus 適配 |
|------|------------|
| Scroll = 導演軌，非裝飾 | 六章 pin + scrub，`progress 0–1` 驅動 uniform |
| WebGL 為敘事層，非 hero 貼圖 | R3F 僅 `/`，lazy + reduced-motion fallback |
| 幾何結構錨點（Inkwell wheel） | Logo 三層 + 線框手 + 握手交疊 |
| 克制互動（hover 微反饋） | 禁止滿屏粒子 cliché、紫青 AI slop |
| 效能分級 | DPR cap、靜態 SVG 降級 |

### 品牌邊界（勿越界）

- ✅ 白線 mesh、mono 標籤、暗色電影感、架構隱喻
- ❌ 全站全息箔、液態金屬主導、常駐 glitch、假 loading
- Share 頁已驗證：暖光暈 + snap 可；全息/液態否決 → 主站同樣克制

---

## 二十方向 × 實作路徑

> 共通架構：`components/home/scroll-story/*` + `lib/motion/gsap-client.ts` + `dynamic` R3F Canvas  
> 共通 pattern：`ScrollTrigger` → `uProgress` / `timeline.progress()` → shader 或 morph

---

### #01 Void Snap Assembly｜虛空精密組裝

| 維度 | 內容 |
|------|------|
| **概念** | 純黑虛空；Logo 三層（小圓→大圓→斜線）sequential snap，像機芯對位 |
| **未來感** | 極簡、Apple Vision 開機感 — 少即是多 |
| **實作** | `components/logo.tsx` 拆 3 SVG layer；GSAP timeline `stagger + ease: "expo.out"`；ScrollTrigger pin Ch0 |
| **技術** | GSAP + SVG transform；無 WebGL |
| **複雜度** | L |
| **章節** | Ch0 Void（契約基線） |

---

### #02 Vertex Scatter Mesh｜頂點洪流成形

| 維度 | 內容 |
|------|------|
| **概念** | 線框右手頂點從隨機雲收斂為手掌 — 「AI 構築」 |
| **未來感** | 數位孿生、生成式 mesh |
| **實作** | GLB hand → `BufferGeometry` clone；`position.lerp(target, uProgress)` in `useFrame`；`meshBasicMaterial wireframe` |
| **技術** | R3F + custom `ShaderMaterial` 或 CPU lerp（mobile 友好） |
| **複雜度** | M |
| **章節** | Ch1 Mesh |

---

### #03 Spline Camera Narrative｜軌道攝影敘事

| 維度 | 內容 |
|------|------|
| **概念** | 攝影機沿 Catmull-Rom 曲線滑行，每個 scroll checkpoint 揭露新構圖 |
| **未來感** | 2026 得獎站標配 — scroll 像剪輯 |
| **實作** | `THREE.CatmullRomCurve3` + `drei` 輔助；GSAP tween `curve.getPoint(t)` → `camera.position`；`lookAt` 握手中心 |
| **技術** | R3F `CameraRig` 元件 + ScrollTrigger scrub |
| **複雜度** | H |
| **章節** | Ch2 Reach → Ch3 Handshake 過渡 |
| **參考** | [Codrops cinematic 3D scroll](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/) |

---

### #04 Edge Intersection Glow｜交握高能線

| 維度 | 內容 |
|------|------|
| **概念** | 雙手交疊處 accent 線段 pulse — 協作能量（非全屏 glow） |
| **未來感** | 精密工程接合點發光 |
| **實作** | 雙 mesh `depthTest`；fragment shader 檢測 edge proximity / 第二 pass bloom（`@react-three/postprocessing` 輕量） |
| **技術** | R3F + `EffectComposer` + `uProgress` 驅動 intensity |
| **複雜度** | H |
| **章節** | Ch3 Handshake（Signature） |

---

### #05 LiDAR Scan Reveal｜雷射掃描顯影

| 維度 | 內容 |
|------|------|
| **概念** | 水平掃描線自上而下，點雲逐行顯影出手部 wireframe |
| **未來感** | 建築/醫療掃描 — 強工程感 |
| **實作** | Shader `discard if vWorldY > uScanY`；或 Canvas 2D 採樣點逐行；scroll 驅動 `uScanY` |
| **技術** | R3F ShaderMaterial 或沿用 `logo-sampler` 點陣邏輯擴展至 hand UV |
| **複雜度** | M |
| **章節** | Ch1 替代或 Ch1 入場前奏 |

---

### #06 Blueprint Orthographic｜藍圖正交投影

| 維度 | 內容 |
|------|------|
| **概念** | 短暫切換正交相機 + 網格地面 — 架構藍圖隱喻 |
| **未來感** | BIM / 系統設計圖 |
| **實作** | `OrthographicCamera` lerp；`Grid` + `drei`；scroll 區間切換 persp↔ortho |
| **技術** | R3F 雙相機 + GSAP |
| **複雜度** | M |
| **章節** | Ch1 或 Ch4 Manifesto 轉場 |

---

### #07 Magnetic Field Lines｜磁力場曲線

| 維度 | 內容 |
|------|------|
| **概念** | 細白曲線向手掌匯聚 — 「架構引力」 |
| **未來感** | 科學可視化、克制 |
| **實作** | `THREE.Line` 陣列 + 每 frame 更新 control points（簡化 Bezier）；pointer 微擾 optional |
| **技術** | R3F + `useFrame`；粒子數 <200 |
| **複雜度** | M |
| **章節** | Ch2 Reach 背景層 |

---

### #08 Kinetic Split Typography｜拆字電影標

| 維度 | 內容 |
|------|------|
| **概念** | `ARCHITECTURE / LED / PARTNER` 大字拆行，字距隨 scroll 收斂 |
| **未來感** | WRK / 高級鐘錶站排版 |
| **實作** | DOM + GSAP SplitText（或 CSS `clip-path`）；與 R3F 分層 `z-index` |
| **技術** | GSAP ScrollTrigger + `components/motion/scroll-chapter.tsx` |
| **複雜度** | M |
| **章節** | Ch2 Reach |

---

### #09 Depth Fog Corridor｜霧廊景深

| 維度 | 內容 |
|------|------|
| **概念** | 黑色霧中手部浮現，scroll 推進景深 |
| **未來感** | 電影開場、賽博但克制 |
| **實作** | `scene.fog = new FogExp2('#000', 0.02)`；camera dolly；手 mesh `fog: true` |
| **技術** | R3F 場景設定 + scrub |
| **複雜度** | M |
| **章節** | Ch0→Ch1 過渡 |
| **注意** | 避免 DivyTR 式 matrix rain — 僅霧 + 線框 |

---

### #10 Data Node Constellation｜資料節點星座

| 維度 | 內容 |
|------|------|
| **概念** | Logo 像素採樣點 + 鄰近連線 — 系統節點圖，非滿屏飄浮 |
| **未來感** | 架構圖、知識圖譜 |
| **實作** | 沿用 `lib/hero/logo-sampler.ts` + Canvas/R3F `Points`；連線距離閾值；Ch0 背景 |
| **技術** | Canvas 2D（已有）或 R3F `Points` + `LineSegments` |
| **複雜度** | M |
| **章節** | Ch0 襯底（弱化 opacity 0.12） |

---

### #11 Rim Light Shader Pass｜邊緣光掃掠

| 維度 | 內容 |
|------|------|
| **概念** | 單向 rim light 沿 mesh 法線掃過 — 未來感但不全息 |
| **未來感** | 產品渲染、精密零件 |
| **實作** | Custom fragment：`fresnel * uSweep`；scroll 驅動 sweep angle |
| **技術** | R3F ShaderMaterial |
| **複雜度** | M |
| **章節** | Ch2–Ch3 手部強調 |

---

### #12 Dual-Layer DOM + WebGL｜雙軌合成

| 維度 | 內容 |
|------|------|
| **概念** | 左/上 DOM 文案 pin；右/下 R3F viewport — Inkwell 式場景分鏡 |
| **未來感** | 編輯 + 3D 混排 |
| **實作** | CSS grid `1fr 1fr`；`ScrollTrigger pin` 外層；R3F `View` portal（drei）或 fixed canvas |
| **技術** | Next layout + R3F `View` / 全屏 canvas + DOM overlay |
| **複雜度** | H |
| **章節** | Ch1–Ch3 全段 |

---

### #13 Handshake Morph Blend｜握手形變

| 維度 | 內容 |
|------|------|
| **概念** | 伸手姿勢 morph → 握手姿勢；進度 = scroll |
| **未來感** | 有機但幾何 — 信任敘事核心 |
| **實作** | 兩 GLB `SkeletonUtils.clone` + `drei/useAnimations` 或 `morphTargetInfluences` lerp |
| **技術** | R3F + GLTF 預 rig |
| **複雜度** | H |
| **章節** | Ch2→Ch3（契約 Signature） |

---

### #14 Mono Telemetry Boot｜系統啟動標籤

| 維度 | 內容 |
|------|------|
| **概念** | 角落 CohereMono 標籤逐行打字機顯示 `MESH::ASSEMBLE` `LINK::HANDSHAKE` |
| **未來感** | 終端機、但不遮內容 |
| **實作** | React state + GSAP `text` plugin 或 CSS `steps()` animation |
| **技術** | DOM only；`prefers-reduced-motion` 一次顯示全文 |
| **複雜度** | L |
| **章節** | Ch1–Ch3 輔助層 |

---

### #15 Portal Grid Six Gates｜六門入口網格

| 維度 | 內容 |
|------|------|
| **概念** | Ch5 六路由以透視網格排列，hover 線框 glow |
| **未來感** | 傳送門、空間導航 |
| **實作** | CSS `perspective` + `transform-style: preserve-3d`；或 R3F 六平面 billboard |
| **技術** | Framer Motion hover + CSS；R3F 可選 |
| **複雜度** | M |
| **章節** | Ch5 Portal |

---

### #16 Scroll Velocity Adaptive｜速度自適應節奏

| 維度 | 內容 |
|------|------|
| **概念** | 快滑時略過中間幀、慢滑時精細 scrub — 電影感節奏 |
| **未來感** | 高級互動質感 |
| **實作** | GSAP `ScrollTrigger.normalizeScroll` + Lenis；`scrub: 0.5–2` 依裝置 |
| **技術** | `lib/motion/gsap-client.ts` + Lenis（可選） |
| **複雜度** | M |
| **章節** | 全站首頁 scroll 層 |

---

### #17 Instanced Wireframe Particles｜實例化線框微粒

| 維度 | 內容 |
|------|------|
| **概念** | 沿手部輪廓的微型線框三角 — GPU instancing |
| **未來感** | 高效能未來感微粒 |
| **實作** | `InstancedMesh` + 輪廓採樣點；`uProgress` 控制 spread→attach |
| **技術** | R3F + Three.js instancing |
| **複雜度** | H |
| **章節** | Ch1 強化版 |

---

### #18 ASCII-to-Mesh Dissolve｜字元溶解成形

| 維度 | 內容 |
|------|------|
| **概念** | 短暫 mono 字元矩陣 → dissolve 為 wireframe hand |
| **未來感** | 駭客/engineering 美學 |
| **實作** | Canvas text grid → texture → shader dissolve；或 DOM overlay fade out 同步 R3F fade in |
| **技術** | Hybrid 2D→3D handoff |
| **複雜度** | M |
| **章節** | Ch0→Ch1 轉場（1–2 秒區間） |

---

### #19 Reduced-Motion Poster Hero｜靜態海報降級

| 維度 | 內容 |
|------|------|
| **概念** | 單張分層 SVG：Logo + 握手剪影 + 六章文案全可見 |
| **未來感** | 編輯海報 — 動效關閉仍高質 |
| **實作** | `useReducedMotion()` branch；跳過 Canvas；`components/home/hero-fallback.tsx` |
| **技術** | React + SVG stack（a11y 必備） |
| **複雜度** | L |
| **章節** | 全章 fallback |

---

### #20 Composite Signature Stack｜混合主線（推薦）

| 維度 | 內容 |
|------|------|
| **概念** | **組合拳**：#01 Void + #02 Mesh + #03 Camera + #04 Handshake + #08 Type + #15 Portal |
| **未來感** | 完整 Phase 4 殿堂 — 敘事 > 單一特效 |
| **實作** | `scroll-story-root.tsx` 六章；每章獨立 timeline；共享 `uProgress` context |
| **技術** | GSAP master timeline + R3F lazy + motion reveal 內頁 |
| **複雜度** | H（分 Wave 交付） |
| **章節** | Ch0–Ch5 完整 |

---

## 對照總表

| # | 方向 | 技術主軸 | 複雜度 | 品牌契合 | 未來感 | 效能 |
|---|------|----------|--------|----------|--------|------|
| 01 | Void Snap | GSAP/SVG | L | ★★★★★ | ★★★★☆ | ★★★★★ |
| 02 | Vertex Mesh | R3F | M | ★★★★★ | ★★★★★ | ★★★★☆ |
| 03 | Spline Camera | R3F+GSAP | H | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| 04 | Edge Glow | R3F shader | H | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| 05 | LiDAR Scan | Shader | M | ★★★★★ | ★★★★★ | ★★★★☆ |
| 06 | Blueprint | R3F | M | ★★★★★ | ★★★★☆ | ★★★★☆ |
| 07 | Field Lines | R3F Lines | M | ★★★★☆ | ★★★★☆ | ★★★★★ |
| 08 | Kinetic Type | GSAP | M | ★★★★★ | ★★★★☆ | ★★★★★ |
| 09 | Fog Corridor | R3F | M | ★★★★☆ | ★★★★★ | ★★★★☆ |
| 10 | Data Nodes | Canvas/R3F | M | ★★★★★ | ★★★★☆ | ★★★★☆ |
| 11 | Rim Sweep | Shader | M | ★★★★☆ | ★★★★★ | ★★★★☆ |
| 12 | DOM+WebGL | Hybrid | H | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| 13 | Handshake Morph | GLTF | H | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| 14 | Mono Boot | DOM | L | ★★★★☆ | ★★★☆☆ | ★★★★★ |
| 15 | Portal Grid | CSS/R3F | M | ★★★★☆ | ★★★★☆ | ★★★★★ |
| 16 | Velocity Scrub | GSAP | M | ★★★★☆ | ★★★★☆ | ★★★★☆ |
| 17 | Instanced FX | R3F | H | ★★★☆☆ | ★★★★★ | ★★★★☆ |
| 18 | ASCII Dissolve | Hybrid | M | ★★★★★ | ★★★★☆ | ★★★★☆ |
| 19 | Poster Fallback | SVG | L | ★★★★★ | ★★★☆☆ | ★★★★★ |
| 20 | Composite Stack | 全系 | H | ★★★★★ | ★★★★★ | ★★★★☆ |

---

## 建議實作路線（Wave）

| 優先 | 方向 | Wave |
|------|------|------|
| P0 | #20 骨架 + #01 Ch0 + #19 fallback | W1 |
| P0 | #02 Ch1 + #13 握手 morph 原型 | W2 |
| P1 | #03 camera + #04 edge glow + #08 typography | W2–W3 |
| P2 | #05/#06/#07 擇一強化 Ch1–Ch2 | W3 |
| P3 | #15 Portal + #14 mono 點綴 | W3 |

---

## 檔案落點（建議）

```
components/home/scroll-story/
  scroll-story-root.tsx      # 六章編排
  chapter-void.tsx           # #01
  chapter-mesh.tsx           # #02 + R3F Canvas
  chapter-reach.tsx          # #03 #08
  chapter-handshake.tsx      # #04 #13
  chapter-manifesto.tsx
  chapter-portal.tsx         # #15
components/home/three/
  hand-scene.tsx             # R3F 根
  hand-mesh.tsx              # wireframe + uProgress
  camera-rig.tsx             # #03
lib/motion/
  scroll-progress.ts         # 共享 progress
  gsap-client.ts
```

---

## 引用

1. [Why Immersive Experiences Dominate 2026 Awwwards](https://digitalstrategyforce.com/journal/why-are-immersive-experiences-dominating-the-2026-awwwards/) — scroll-driven 3D 敘事為主趨勢  
2. [Inkwell — Awwwards case](https://www.awwwards.com/inkwell-a-scroll-driven-narrative-for-ais-most-stealth-player.html) — 幾何錨點 + 單弧敘事  
3. [Codrops — Cinematic 3D Scroll with GSAP](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/) — camera path + shader depth  
4. 站內 `docs/BRAND_EXPERIENCE_SPEC.md` — Phase 4 LOCKED 契約

---

*2026-07-01 CST — domain research complete*
