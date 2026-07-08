# Hero 網格底 — Scroll 驅動規格

*建立：2026-07-06 11:56 CST*  
*作者：Sally · UX Designer*  
*狀態：W0 原型 — Lab 可捲動預覽*  
*預覽：`/design-lab/grid-scroll`*

---

## 1. 設計命題（從頭來過）

| 原則 | 說明 |
|------|------|
| **靜態預設** | 進場、停留、未捲動 → 方格場 **完全靜止** |
| **Scroll 才動** | 所有視差 / 縮放 / 景深 / 光暈 **綁 scroll progress** |
| **無自動循環** | 不用 rAF 循環、不用入場 autoplay |
| **無滑鼠視差** | 本階段排除 pointer/陀螺儀（避免與 scroll 搶戲） |

---

## 2. 資產

| 層 | 資產 | 靜態態 | Scroll 後 |
|----|------|--------|-----------|
| z0 | `#000` | 純黑 | 不變 |
| z1 | `square_line.png` | cover 置中 | Y 視差 · 微 scale · 亮度↑ |
| z2 | `lines.png`（optional） | opacity 0 | progress↑ 淡入地形線 |
| z3 | procedural 中縫 | opacity 0 | progress>0.25 光帶 |
| z4 | vignette | 標準暗角 | progress↑ 收緊 |

**終局形體（W1+）**：暫空 — 先驗證「網格底 + scroll」手感。

---

## 3. Scroll 曲線（pin 區間 `+=180%`）

| progress | 使用者感受 |
|----------|------------|
| 0% | 靜態方格滿版，像一張底圖 |
| 0–30% | 方格開始「被吸入」— 輕微上移 + scale |
| 30–70% | 景深拉開 — 第二層 lines 淡入 |
| 70–100% | 中縫光帶 · vignette 收緊 · 準備接下一 section |

`scrub: 0.65` — 跟手但不飄。

`prefers-reduced-motion`：靜態 z1，無 scrub。

---

## 4. 技術

- GSAP `ScrollTrigger` pin + scrub（與 `section-hero` 同基建）
- `lib/hero/grid-scroll-motion.ts` — progress → CSS vars
- `components/home/hero-grid-scroll.tsx`
- Lab：`/design-lab/grid-scroll` — 下方 dummy 區塊供捲動

---

## 5. 待決策

| ID | 問題 |
|----|------|
| GS-1 | 方格用 `square_line` only 還是疊 `squrare_2`？ |
| GS-2 | scroll 終點接什麼形體？（握手 / 線框 / 無） |
| GS-3 | 首頁 Hero pin 長度 `180%` vs `250%`？ |

---

*Sally：請在 Lab **慢慢捲** — 靜止時應像壁紙，捲動才活。*
