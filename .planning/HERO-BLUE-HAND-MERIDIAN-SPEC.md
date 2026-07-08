# Hero 主視覺 UX 規格 — Blue Meridian（藍線經緯）

*建立：2026-07-06 11:14 CST*  
*作者：Sally · UX Designer*  
*狀態：DRAFT — Lab 可預覽*  
*預覽：`/design-lab/blue-hand`*

---

## 1. 設計意圖

| 維度 | 說明 |
|------|------|
| 敘事 | **藍圖之手** — 在數位經緯場中伸出，回應使用者存在感 |
| 情緒 | 冷冽、精密、未來藍圖感；互動時「被感知」 |
| 主資產 | `blue_line_hand.svg`（內嵌 PNG，整圖 3D 視差） |
| 輔助 | `blueline.png` + `lines.png` 三層景深 |

---

## 2. 互動模型

| 輸入 | 行為 |
|------|------|
| **Desktop 滑鼠** | 正規化座標 → 手 `rotateX/Y` + `translate3d` + 背景反向視差 |
| **Mobile 陀螺儀** | `gamma/beta` → 同映射；iOS 需「啟用陀螺儀視差」CTA |
| **Idle** | 微呼吸 `sin` 浮動，經緯場慢速旋轉 |
| **Reduced motion** | 靜態置中，關閉視差與動畫 |

平滑：`lerp 0.09` rAF，避免抖動。

---

## 3. 畫面結構（Z 軸）

```
z6  HUD（BLUEPRINT · REACH / 座標 / 8+）
z5  暗角 vignette
z4  游標光暈（跟隨 pointer）
z3  blue_line_hand — 3D preserve-3d + glow
z2  SVG 經緯場（放射線 + 同心弧 + 掃描環）
z1  blueline/lines 三層背景視差
z0  深藍黑底 #010409
```

---

## 4. Motion 參數

| 元素 | 範圍 |
|------|------|
| 手 rotateY | `nx × 26°` |
| 手 rotateX | `-ny × 22°` |
| 手 translateZ | `depth × 36px` + 呼吸 |
| 背景深層 | `nx × -48px` |
| 經緯場 rotate | `nx × 10°` + 時間 |
| 掃描環 | `18°/s` + 手勢偏移 |

---

## 5. RWD

- `100dvh × 100vw` 滿版
- 手寬：`clamp(280px, 72vmin, 680px)`；mobile `84vmin`
- Lab chrome 浮層，stage 全高
- `touch-action: none` 防捲動干擾

---

## 6. 技術備註

- `components/motion/use-interactive-tilt.ts` — 滑鼠 + 陀螺儀統一
- `lib/hero/blue-hand-meridian-motion.ts` — 運動學
- `components/home/hero-blue-hand-meridian.tsx` — 主元件

---

## 7. 待決策

| ID | 問題 |
|----|------|
| BM-1 | 是否接 W1 Hero（取代 Square Bridge / Mesh Snap）？ |
| BM-2 | HUD 正式上線是否隱藏？ |
| BM-3 | 是否加 scroll 進場（首頁 pin）？ |
| BM-4 | 是否疊加 `right_color_hand` 第二階段匯合？ |

---

*Sally：先於 `/design-lab/blue-hand` 移動滑鼠／傾斜手機，感受「被回應」的精密感。*
