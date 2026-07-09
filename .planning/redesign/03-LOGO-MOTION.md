# 8plus 重新設計 — Phase D：Logo / 主視覺 / 首頁動畫

*建立：2026-07-09 CST*
*狀態：DRAFT — 待 August 確認*
*依據：`02-DESIGN-SYSTEM.md`（藍橘四場景）*

---

## 1. Logo 定案（C2 · 比例斜線）

承接舊「兩圓＋斜線」品牌資產，重繪為藍橘系統版本：**小圓（左上）＋大圓（右下）＋橘色斜槓**。語意＝比例／成長／加值（plus）。

### 幾何（viewBox 64×64）

- 小圓：`cx18 cy18 r9`
- 大圓：`cx46 cy46 r13`
- 斜槓：`M48 12 → L16 52`，`stroke-width 7`、圓端、橘 `#FF7A18`

### 產出資產（`public/brand/`）

| 檔案 | 用途 | 說明 |
|------|------|------|
| `logo-mark.svg` | 藍底 header / 主要 | 白圓 + 橘斜槓（透明底） |
| `logo-mono.svg` | 彈性單色 | 全 `currentColor`（含斜槓），隨文字色 |
| `logo-lockup.svg` | 橫式 標誌+字 | mark + 「8plus」字標（currentColor） |
| `favicon.svg` | 分頁 / 捷徑 | 白圓角底 + 深墨圓 + 橘斜槓，16–32px 可辨識 |
| `og-8plus.svg` | 社群分享卡 | 1200×630 藍底 + 橘半圓 + 標語 |

### 使用規則

- 藍/深底：用 `logo-mark.svg`（白圓橘槓）或 `logo-mono` 白。
- 白/paper 底：`logo-mono` 設 `color:var(--ink)`（深墨圓 + 橘槓維持）。
- 最小尺寸：mark 20px、favicon 16px。四周留白 ≥ 小圓直徑。
- 斜槓橘色**不可換色**；圓可隨場景前景色。
- 禁止：加陰影、漸層、旋轉變形、拉伸比例。

### 待確認
- 斜槓粗細（目前 7/64）與角度是否 OK？
- favicon 要不要也做藍底版本（藍底白圓橘槓）供深色分頁列？

---

## 2. 首頁 Signature 動畫（唯一重動效）

**紀律**：全站只有首頁 Hero 一個重動效；內頁只做輕量 reveal。禁 autoplay 循環、禁選型牆。`prefers-reduced-motion` 直接顯示終態靜圖。

### 概念：「Logo 組裝 → 標語顯影」scroll pin

呼應 Logo 的「兩圓 + 斜線」與品牌「把分散的需求，組裝成一個系統」。

### Storyboard（scroll 進度 0 → 1，GSAP pin + scrub）

| 進度 | 畫面 | 動作 |
|------|------|------|
| 0.00 | 藍場景，散落的細線與兩個未對位的圓（白），mono eyebrow 淡入 | 進場 |
| 0.15 | 兩圓向定位滑動、對齊到 Logo 位置 | 位移 + 縮放 |
| 0.35 | 橘色斜槓從左上「畫」出（stroke-dashoffset），連接兩圓 → Logo 成形 | 線條描繪 |
| 0.55 | Logo 縮到左上角定位，H1 標語逐字/逐行 reveal | 交棒到文字 |
| 0.80 | 副標 + 主 CTA（橘）＋ 低承諾輔句淡入上移 | CTA 進場 |
| 1.00 | 定格為首頁首屏靜態（Logo 左上、標語、CTA、右下橘半圓） | 收束 |

- 底色：Hero 用 `.bg-dark` 深色島開場（§設計系統允許），或純 `.bg-blue`——**二選一待你定**。
- 技術：既有 `gsap` + `components/motion/use-scroll-pin-progress.ts`（Phase 0 保留的共用 hook）。
- 效能：只用 transform / opacity / stroke-dashoffset（不觸發 layout）；行動版縮短 pin 距離。
- 降級：`prefers-reduced-motion` → 直接顯示 1.00 終態，無 pin。

### 內頁輕量 reveal（統一）
- 進場：opacity 0→1 + translateY 12px→0，250ms，`--ease`，一次性、不循環。
- 卡片/區塊 stagger ≤ 80ms。

### 待確認
1. Hero 底色：深色島開場 vs 純藍？
2. 動畫隱喻：「Logo 組裝」是否合你意，還是想要別的（例如線框手／網格建構）？
3. 標語 reveal 要逐字、逐行、還是整段淡入？

---

*確認後鎖定，進入 Phase E（逐頁重建呈現層，從首頁 Hero 開始）。*
