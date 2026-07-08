# Hero 主視覺 UX 規格 — Square Bridge（方塊橋接）

*建立：2026-07-06 10:57 CST*  
*作者：Sally · UX Designer*  
*狀態：DRAFT — Lab 原型可預覽*  
*預覽：`/design-lab/square-bridge`*

---

## 1. 設計意圖

| 維度 | 說明 |
|------|------|
| 敘事 | **架構場域**（方塊透視）+ **人×數位**（紅手×黑白寫實手）上下匯合 |
| 情緒 | 冷靜、結構感、信任建立前的「靠近」 |
| 與 Phase 5.0 | Hero CI 錨點候選；可獨立滿版或接六 section 第一屏 |
| 資產 | 僅 `square_line.png` + `red_black_hand_red.svg` + `red_black_hand_black.svg` |

---

## 2. 畫面結構（Z 軸）

```
z5  碰觸光暈（中心 radial）
z4  紅手（上）— 破版
z4  黑手（下）— 破版
z3  暗角 vignette（可讀性）
z2  square_line 場域 B（反向慢旋、半透明）
z1  square_line 場域 A（主旋 + 縮放）
z0  純黑底 #000000
```

---

## 3. 動效腳本（5.5s 循環）

| 時間 | % | 動作 |
|------|---|------|
| 0.0s | 0% | 黑底 + 方塊場緩慢旋轉/呼吸放大（常駐） |
| 0.4s | 8% | 紅手自畫面上方外（-118%）開始入場 |
| 0.5s | 10% | 黑手自畫面下方外入場（略延遲 2%） |
| 2.6s | 48% | 雙手進入會合區 |
| 2.9–4.3s | 52–78% | **橋接**：微彈性 overshoot + 中心光暈 |
| 4.3–5.5s | 78–100% | 定格呼吸 hold |

`prefers-reduced-motion`：直接顯示會合態（progress ≈ 0.82）。

---

## 4. 破版規則

- Stage `overflow: visible` — 手指可超出安全區
- Root `overflow: hidden` — 僅裁切至 viewport，不出現捲軸
- 手圖 `width: clamp(52vw, 72vmin, 520px)` — 小螢幕仍夠大、大螢幕不過胖
- 紅手 `top: -8%`、黑手 `bottom: -8%` — 刻意露出畫外感

---

## 5. 方塊背景（square_line）

**雙層策略**（避免單層旋轉暈眩）：

| 層 | 動效 | 不透明度 |
|----|------|----------|
| A | `rotate(0→360°)` + `scale(1.05±0.12)` 綁 progress | 0.55 |
| B | 反向 `rotate` ×0.65 + 略大 scale | 0.42 |

容器 `inset: -55%`、`size: 210%` — 旋轉時不露黑邊。

替代方案（待 A/B）：
- 純 `scale` 呼吸不旋轉（暈動敏感用戶）
- 極慢 60s 一圈（更沉穩）

---

## 6. RWD 斷點

| 斷點 | 方塊場 | 紅手 | 黑手 | 會合點 |
|------|--------|------|------|--------|
| ≤390px | scale 1.15 | width 68vmin | width 68vmin | 50% 高 |
| 391–768px | scale 1.08 | width 62vmin | width 62vmin | 51% |
| ≥769px | scale 1.0 | width 52vmin max 520px | 同左 | 50% |

- 容器：`100dvh` × `100dvw`（Lab 全螢幕 chrome 已支援）
- `min()` 防止橫向溢出捲軸
- 安全區：`env(safe-area-inset-*)` padding on chrome only；hero 圖可破版至邊緣

---

## 7. 與首頁 Hero 文案層

| 元素 | 位置 | 備註 |
|------|------|------|
| Logo | 左上 8% | z-index 10，不在會合點 |
| 三柱文案 | bottom 18% | 半透明底 optional；不干擾手部 focal |
| Section dot | 右側 | W1 後接 `home-section-progress-nav` |

會合點約 **畫面中央偏上 2%** — 留 bottom 給 pillars。

---

## 8. 技術備註

- 手 SVG 內為嵌入 PNG — 接受；動效靠 `translateY` + 整圖位移
- 無 GSAP 依賴（Lab 用 rAF）；正式 Hero 可改 ScrollTrigger pin
- 檔案：
  - `components/home/hero-square-bridge.tsx`
  - `lib/hero/square-bridge-motion.ts`
  - `app/(site)/design-lab/square-bridge/page.tsx`

---

## 9. 待決策

| ID | 問題 |
|----|------|
| SB-1 | 方塊場要 **旋轉+縮放** 還是 **只縮放**？ |
| SB-2 | 循環 5.5s 還是進場一次後 hold（首頁用）？ |
| SB-3 | 是否 LOCKED 為 W1 Hero，取代 humanface / 握手系？ |
| SB-4 | 會合後是否 crossfade 到 `red_black_hand.png` 全圖？ |

---

*Sally 建議：先於 `/design-lab/square-bridge` 確認破版與會合感，再決 SB-3。*
