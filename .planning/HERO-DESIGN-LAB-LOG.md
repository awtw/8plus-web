# Hero 主視覺 Design Lab 作業記錄

*建立：2026-07-06 08:56 CST*  
*記錄者：Sally（UX Designer）*  
*關聯：Phase 5.0 · `5.0-HOMEPAGE-SCROLL-PLAN.md` · `HERO_CHECKPOINT.md`*

---

## 1. 目標與約束（仍有效）

| 項目 | 內容 |
|------|------|
| 產品目標 | 首頁 Hero = 全站 CI 錨點；六 section 單頁 scroll |
| 視覺原則 **LOCKED** | 以 `public/ci/` 原圖/SVG 為主；**不做** procedural 3D 方塊手追插畫 |
| 版面 | Design Lab 滿版預覽；正式 Hero 待選型後接 `section-hero.tsx` |
| 內容 IA | Hero → About → Lab → Service → Blog → Booking（見 Phase 5.0 規劃） |

---

## 2. 目前程式狀態（2026-07-06）

### 2.1 首頁骨架（Wave 0 ✅）

- `components/home/home-scroll-root.tsx` — 六 section 單根
- `components/home/sections/*` — 六區骨架
- `lib/content/home-sections.ts`、`home-story-chapters.ts`
- `app/(site)/page.tsx` — 僅 `HomeScrollRoot`

### 2.2 Design Lab 路由

| 路由 | 元件 | 現況 |
|------|------|------|
| `/design-lab` | `Hero20Gallery` | 20 卡 CI 雙層預覽牆（Sally R2 variants） |
| `/design-lab/variants` | 同上 | 別名 |
| `/design-lab/mesh-snap` | `MeshSnapLab` | **目前唯一焦點**：`humanface` 電流漸層 |
| `/design-lab/handshake` | `HandshakeLab` | 半調×線框握手（路線 A，舊） |
| `/design-lab/phase4` | Phase 4 三方向 | 舊入口 |
| `/design-lab/canvas` | Canvas 2D 粒子 | 舊入口 |

### 2.3 當前 Lab 主視覺（mesh-snap）

- **已移除**：雙手、blueline 背景、流線、progress slider、自動循環
- **僅保留**：`HeroHumanfaceElectric` — inline SVG 線框 + 電流色漸層（青→紫→粉→青，7s `gradientTransform`）
- 資產：`public/ci/humanface_svg.svg`（依 `humanface.png` 手繪向量；repo 內無使用者原始匯出檔時以此為準）

---

## 3. 探索歷程（依時間）

### 3.1 Phase 5.0 W1 — R3F Co-Hero（❌ 使用者不滿意）

- **時間**：2026-07-02
- **實作**：`section-hero.tsx` + `hero-co-hero-scene.tsx`；GSAP pin；3.2s 進場
- **問題**：方塊 3D 手與 CI 參考圖差距大
- **決策**：視覺優先改為原圖 embed + 動效；R3F 僅在真 3D 需求時使用

### 3.2 20 款 CSS 假動效牆（第一版）

- **時間**：2026-07-02
- **實作**：`hero-20-gallery.tsx` 非原圖風格
- **結果**：方向錯；改為 CI 原圖

### 3.3 CI 原圖 20 款（10 圖 × 2 動效）

- **時間**：2026-07-02
- **產出**：`lib/content/ci-hero-variants.ts` v1；`public/ci/svg/v01–v20.svg`；`ci-hero-variant-preview.tsx`
- **問題**：單圖 + overlay 動效偏輕；握手過程不像

### 3.4 握手 Lab — 路線 A

- **時間**：2026-07-02
- **實作**：`hero-handshake-svg.tsx` + `handshake-motion.ts`；`/design-lab/handshake`
- **語意**：半調手 + 程式線框手 → 參考圖 snap
- **狀態**：保留程式碼；非當前主線

### 3.5 Sally R2 — 拆分資產 20 款

- **時間**：2026-07-02
- **背景**：使用者將兩手圖拆開/拆成兩張，供動畫互動
- **產出**：重寫 `ci-hero-variants.ts` — 雙層 `layers[]`（whitelinehand、red_black SVG、grow、humanface 等配對）
- **實作**：`ci-hero-variant-preview.tsx` 多 `<img>` 入場/snap/crossfade
- **結果**：動效深度不足；使用者仍不滿意

### 3.6 V03 藍紅 Mesh Snap — 深動畫 Lab

- **時間**：2026-07-02 ~ 2026-07-03
- **路由**：`/design-lab/mesh-snap`
- **迭代**：
  1. progress 驅動雙手位移 + 橋接線 + `two_color_hand.png` 定格
  2. 藍手分指 clip + rotate/skew + displacement（`blue-hand-warp.ts`）
  3. 使用者要求：藍手 SVG 線條 ET 食指觸碰 — 發現 `blue_line_hand.svg` / `right_color_hand.svg` **內嵌 PNG，無 vector path**
  4. 改 procedural mesh rig — 使用者否定（要的是原 SVG 扭曲感）
  5. blueline.png 三層背景 + 8 條流線 + 雙手 — **不滿意**
  6. **重置**：僅 `humanface` 電流漸層（現行）

---

## 4. CI 資產清單（`public/ci/`）

### 4.1 握手 / 手

| 檔案 | 說明 | 動畫備註 |
|------|------|----------|
| `handshake.png` | 主 CI（半調×線框握手 + HUD） | 可整圖 / 左右 mask 拆 |
| `handshake-reference.png` | 參考定格 | 握手 Lab 終態 |
| `blue_line_hand.svg` | 藍線框手 | ⚠️ 內嵌 PNG，非真 path |
| `right_color_hand.svg` | 紅 mesh 手 | ⚠️ 內嵌 PNG |
| `whitelinehand_1.png` / `_2.png` | 白線框左右手 | 適合左右入場 snap |
| `red_black_hand_red.svg` / `_black.svg` | 紅/黑白手分層 | 上下 reach |
| `two_color_hand.png` | 藍紅握手合成 | 終態錨點 |
| `two_blue_hand_left.svg` / `_right.svg` | 藍手拆分 | 新增於 2026-07-02 |

### 4.2 人臉 / 敘事

| 檔案 | 說明 |
|------|------|
| `humanface.png` | 線框 bust + 同心圓 |
| `humanface_2.png` | 隧道輪廓臉 |
| `humanface_svg.svg` | 向量線框（Lab 電流漸層用） |
| `facewithline.png` | 側臉 + 宇宙圓 |
| `glassface_1.png` / `_2.png` | 液態黑鉻 / 銀鉻臉 |
| `whiteface.png` | 全身白線框 |

### 4.3 場域 / 背景

| 檔案 | 說明 |
|------|------|
| `blueline.png` | 藍色波浪線場（曾作流線背景） |
| `lines.png` / `lines_2.png` | 等高線白/灰 |
| `grow_1.png` / `grow_2.png` | 點陣漩渦 |
| `square_line.png` / `squrare_2.png` | 方塊透視 |
| `do it too.jpeg` | Tron 上下 grid |

---

## 5. 關鍵技術發現

1. **多數 `.svg` 為 PNG 包裝** — `blue_line_hand.svg`、`right_color_hand.svg`、`red_black_hand_*.svg` 等使用 `<image xlink:href="data:image/png;base64,...">`，無法逐條 animate stroke。
2. **真・線條動畫需** Illustrator/Figma 匯出 **outline SVG**（`<path>` / `<line>`），或接受 clip+transform 對點陣的「剛體扭曲」。
3. **`<img src="*.svg">` 不跑 SVG 內建 `<animate>`** — 需 inline SVG 或 React 元件。
4. **使用者反覆否定**：procedural 幾何手、淺層 CSS 動效、與 CI 差距大的 3D。

---

## 6. Sally 20 款主視覺提案（R2，供選型參考）

| ID | 名稱 | 核心配對 | 狀態 |
|----|------|----------|------|
| V01 | 線框匯合 | whitelinehand_1 + _2 | 牆上可預覽 |
| V02 | 紅黑橋接 | red_black SVG 上下 | 牆上可預覽 |
| V03 | 藍紅 Mesh Snap | blue_line + right_color | Lab 已改 humanface |
| V04 | 主 CI 掃描 | handshake.png | 牆上可預覽 |
| V05 | 半調×線框拆 | handshake 左右半 | 牆上可預覽 |
| V06 | 側臉守望 | facewithline + 雙手 | 牆上可預覽 |
| V07 | 隧道凝視 | humanface_2 ↔ humanface | 牆上可預覽 |
| V08 | 液態人格 | glassface crossfade | 牆上可預覽 |
| V09 | 全身線框見證 | whiteface + handshake | 牆上可預覽 |
| V10 | 點陣漩渦握手 | grow + whitelinehand | 牆上可預覽 |
| V11 | 雙漩渦對話 | grow_1 + grow_2 | 牆上可預覽 |
| V12 | 等高線地形 | lines + 藍彩手 | 牆上可預覽 |
| V13 | 方塊開門 | square_line split | 牆上可預覽 |
| V14 | 藍線波場 | blueline + 線框手 | 牆上可預覽 |
| V15 | Tron 隧道 | do it too + 紅黑手 | 牆上可預覽 |
| V16 | 信任光橋 | handshake pulse | 牆上可預覽 |
| V17 | 召喚之手 | whitehand_3 + 第二手 | 牆上可預覽 |
| V18 | 掃描配對 | Lidar + 雙手 | 牆上可預覽 |
| V19 | CI 全譜章 | 分鏡四段 | 牆上可預覽 |
| V20 | 極簡握手 | 純線框雙手 | 牆上可預覽 |

**Sally 推薦（未 LOCKED）**：V01 / V02 / V03 最接近拆分資產語意；正式 Hero 需使用者選編號後再接滿版。

---

## 7. 程式檔案索引

```
lib/content/ci-hero-variants.ts      # 20 款定義（R2 雙層）
lib/hero/handshake-motion.ts         # 握手 Lab motion
lib/hero/mesh-snap-motion.ts         # mesh-snap progress（現少用）
lib/hero/mesh-hand-rig.ts            # procedural 藍手（已擱置）
lib/hero/blue-hand-warp.ts           # clip 扭曲（已擱置）

components/home/hero-humanface-electric.tsx   # ★ 現行 Lab 主視覺
components/home/hero-blueline-flow.tsx        # 流場版（已不掛載）
components/home/hero-mesh-snap-svg.tsx        # 握手/扭曲版（已不掛載）
components/home/hero-handshake-svg.tsx        # 握手 Lab

components/design-lab/hero-20-gallery.tsx
components/design-lab/ci-hero-variant-preview.tsx
components/design-lab/mesh-snap-lab.tsx       # ★ 現行入口
components/design-lab/handshake-lab.tsx
```

---

## 8. Wave 進度（Phase 5.0）

| Wave | 內容 | 狀態 |
|------|------|------|
| W0 | 六 section 骨架 | ✅ |
| W1 | Hero CI 主視覺 | ⚠️ 多輪探索；**未定稿** |
| W2 | About + Lab | 未做 |
| W3 | Service + Blog | 未做 |
| W4 | Booking Cal.com | 未做 |
| W5 | i18n / a11y | 未做 |

---

## 9. 待決策（D-hero）

| # | 問題 | 選項 |
|---|------|------|
| D1 | Hero 主視覺錨點 | 握手系 / humanface 系 / 分鏡敘事（V19） |
| D2 | 藍手動畫 | 需使用者提供 **outline SVG** vs 接受 clip 扭曲 |
| D3 | 20 款牆 | 是否凍結或下架，專注單一方向 |
| D4 | humanface_svg | 使用者自有匯出檔是否覆蓋現有手繪版 |
| D5 | 電流漸層 | 是否作 Hero 過渡態，或僅 About/品牌段 |

---

## 10. 下一步建議（Sally）

1. **確認 D1**：humanface 電流是否為新 Hero 方向，或僅 Lab 過渡。
2. 若回握手線：**匯出真 vector SVG** 或指定 V01/V02/V03 接 `section-hero`。
3. 更新 `HERO_CHECKPOINT.md` 與 `section-hero.tsx` 僅在使用者 LOCKED 編號後。
4. W2 About 可並行 — 內容來源 `docs/StoryAboutMe.md` 已備。

---

*下次更新：Hero 方向 LOCKED 或新一輪 Lab 迭代後。*
