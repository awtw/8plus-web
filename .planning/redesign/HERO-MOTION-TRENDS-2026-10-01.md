# Hero 動畫趨勢調研與討論

> 記錄時間：2026-10-01
> 分支：feature/august/2026-10-update
> 對象：`components/home/hero/hero-v2.tsx`

## 主流趨勢（2026-10）

1. **Kinetic Typography（動態字型）**：標題本身當主角，SplitText / variable font。宜只用在 Hero 單一時刻，不要全站濫用。
2. **原生 CSS Scroll-driven Animation**：`animation-timeline: view()/scroll()`，跑在 compositor，零 JS。Chrome 115+ / Firefox 132+ / Safari 18+，需 `@supports` fallback。
3. **WebGL 當「氛圍」不是主菜**：Iventions 類得獎站用 Three.js 做光影氣氛而非炫技；評審會在中階 Android 實測，掉到 18fps 不會得獎。
4. **游標/觸控互動**：pointer 驅動，需 gate 在 `(pointer: fine)`，觸控裝置改用陀螺儀或捲動驅動。
5. **Scrollytelling**：pin + scrub，敘事式揭露。
6. **克制與可及性**：`prefers-reduced-motion` 是基本盤；INP < 200ms；淡出中的趨勢＝自動播放入場動畫、scroll-hijacking、裝飾性 preloader、重型 Hero 影片。

## 現況 vs 趨勢

| 項目 | 現況 | 評估 |
|------|------|------|
| 25 種隨機主視覺 | 每次載入隨機、含切換面板 | 討論度高，但缺單一品牌記憶點；面板偏工程師玩具 |
| 手機 | 一律鎖 CSS-only `combo`（<768px / saveData） | 效能安全，但手機體驗 = 桌機閹割版，無專屬設計 |
| 標題 | 靜態 `hp-rise` 淡入 | 未用 kinetic typography / scroll 驅動 |
| 互動 | 僅桌機 mousemove 視差 | 手機零互動回饋 |
| reduced-motion | 已處理 | OK |

## 建議方向（待決策）

- **A. 單一簽名 Hero + 手機專屬版**：保留 `logo`（8+ 字標組裝）當預設，其餘 24 種降為 lab 彩蛋。
- **B. 標題 kinetic 化**：逐字/逐行 mask reveal，僅 transform+opacity。
- **C. Scroll-driven 過渡**：Hero 捲出時 scale/blur/opacity 用 `view()` timeline，附 fallback。
- **D. 手機互動**：`pointer: coarse` 改用觸控拖曳/捲動驅動 canvas 參數，取代 mousemove。
- **E. 效能守門**：Canvas 粒子手機減半、DPR 上限 2、離開視窗暫停（已有 `startFrameLoop`）。

## 來源

- MotionKit — Web Animation Trends 2026
- School of Motion — 10 Websites with Great Animation in 2026
- Hon Tran — 10 Best Award-Winning Websites of 2026
- CSS Scroll-driven Animations 指南（cssawwwards / design.dev）

---

## 實作紀錄（2026-10-01 00:50）

- 新增 `components/home/hero/hero-neural.tsx`：無依賴 WebGL「神經核心」3D 點雲球（900 節點桌機 / 420 手機，k=3 最近鄰連線）。
  - 橘色資料脈衝：每 4.2s 自動 + 點擊/輕觸處觸發（沿用 `heroTap` 事件）。
  - 拖曳旋轉（滑鼠/觸控，含慣性）、桌機 pointer 傾斜、捲動改變 pitch 並縮小上移。
  - 手機：DPR ≤ 1.5、30fps（frame-loop）、`touch-action: pan-y` 保留垂直捲動。
- 預設主視覺改為 `neural`（桌機+手機）；`logo`/`combo` 等降為彩蛋（`?hero=<key>`）。Data Saver / 無 WebGL 退回 `combo`。
- 修正：`.cmdk-trigger` 樣式只隨 lazy panel 載入，首次開啟前無樣式（標籤折行跑版）→ 樣式改由 trigger 自己 import，並加 `white-space: nowrap`。
- 踩雷：React StrictMode 會對同一 canvas 重跑 effect，cleanup 呼叫 `loseContext()` 會使 context 永久失效 → 不可在 cleanup 用。
- 注意：另有平行對話新增了 `hero-gl.tsx`（ray-march 光球，`?hero=gl`），與本次 neural 並存。
