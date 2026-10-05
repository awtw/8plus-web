# Hero 動態參考與測試轉化

研究日期：2026-10-05 15:14 +08:00。

## 選取依據

使用者要求十個目前熱門範例。沒有可驗證的跨站流量或人氣前十榜單，因此採2026年作者案例、設計媒體精選與作者列出的獎項曝光作為候選依據，非熱度排行榜。案例發表日期不等同原站上線日期。Oryzo 的月份獎項取自作者案例，未另行核對獎項頁；Bruno 以2026大會報導的新版作品集為依據。

所有測試為8plus原創輕量轉譯：不使用原站商標、影片、圖片或iframe，也不宣稱是原站完整WebGL/3D效果的複製。對需要實際媒體的方向使用repo既有作品截圖；示意系統不代表即時AI推論或真實客戶成效。

## 十個方向

### 01 像素解碼 — Vivid

- [原站](https://viivid.webflow.io/) · [來源與製作說明](https://tympanus.net/codrops/2026/09/15/vivid-turning-a-visual-experiment-into-an-interactive-webflow-experience/)
- 日期：2026-09-15；依據：2026 Codrops 作者案例。
- 原機制：有記憶的像素位移與斜向揭露。
- 8plus轉化：藍橘方塊揭露 8plus；游標推開後回位。
- 操作：移動游標／拖動解碼滑桿。
- 本機測試：`/hero-lab?mode=pixels`。

### 02 品牌開場 — House of Yellow

- [原站](https://houseofyellow.nl/) · [來源與製作說明](https://tympanus.net/codrops/2026/09/16/house-of-yellow/)
- 日期：2026-09-16；依據：2026 Codrops 作者案例。
- 原機制：Logo 遮罩、影片穿插與 SVG 變形。
- 8plus轉化：8plus 鏤空字內的藍橘幾何接力；可切換字形構圖。
- 操作：點擊切換構圖。
- 本機測試：`/hero-lab?mode=type`。

### 03 磁性液面 — Dash Creative

- [原站](https://www.dashcreative.co/) · [來源與製作說明](https://tympanus.net/codrops/2026/07/21/magnetic-commerce-building-the-dash-creative-website/)
- 日期：2026-07-21；依據：2026 Codrops 作者案例。
- 原機制：依游標方向扭曲的 WebGL 影片材質。
- 8plus轉化：連續藍橘材質表面，游標牽引並回彈的輕量轉譯。
- 操作：移動游標／調整牽引幅度。
- 本機測試：`/hero-lab?mode=magnetic`。

### 04 雙屏實證 — MERSI

- [原站](https://www.mersi-architecture.com/) · [來源與製作說明](https://tympanus.net/codrops/2026/07/27/between-print-and-digital-the-making-of-mersis-website/)
- 日期：2026-07-27；依據：2026 Codrops 作者案例。
- 原機制：雙屏反向揭露、中央標籤與封面轉場。
- 8plus轉化：資料需求與介面成果反向揭幕，8plus 案例作為内容。
- 操作：拖動分割滑桿／切換階段。
- 本機測試：`/hero-lab?mode=split`。

### 05 對焦工作室 — 4WIDE

- [原站](https://4wide.jp/) · [來源與製作說明](https://tympanus.net/codrops/2026/04/23/building-4wide-turning-distortion-blur-and-motion-into-a-coherent-experience/)
- 日期：2026-04-23；依據：2026 Codrops 作者案例。
- 原機制：default/focus 模式、魚眼、降速與 RGB shift。
- 8plus轉化：介面拼貼穿過對焦視窗，切換聚焦揭露工程資訊。
- 操作：點擊聚焦切換。
- 本機測試：`/hero-lab?mode=focus`。

### 06 材質筆觸 — Podium

- [原站](https://podium.global/) · [來源與製作說明](https://tympanus.net/codrops/2026/06/23/podium-building-a-website-where-running-becomes-storytelling/)
- 日期：2026-06-23；依據：2026 Codrops 作者案例。
- 原機制：游標歷史作為材質扭曲，顆粒與局部對比。
- 8plus轉化：藍橘印刷紋理會記住並淡出游標軌跡，主標固定可讀。
- 操作：在畫布上移動／觸碰留下痕跡。
- 本機測試：`/hero-lab?mode=grain`。

### 07 細節透鏡 — Digital Stamp Collection

- [原站](https://marijanapav.com/stamps) · [來源與製作說明](https://tympanus.net/codrops/2026/06/09/building-an-interactive-digital-stamp-collection-with-shaders-postcards-and-playful-inspection/)
- 日期：2026-06-09；依據：2026 Codrops 作者案例。
- 原機制：可拖放郵票、玻璃放大鏡、縮放控制。
- 8plus轉化：放大檢視真實作品截圖；保留清晰的工程細節入口。
- 操作：移動透鏡／調整倍率。
- 本機測試：`/hero-lab?mode=loupe`。

### 08 作品編排 — Pell Mell

- [原站](https://pellmell.fr/) · [來源與製作說明](https://tympanus.net/codrops/2026/03/27/pell-mell-crafting-a-visual-exploration-platform-with-editorial-rhythm/)
- 日期：2026-03-27；依據：2026 Codrops 作者案例。
- 原機制：編輯式作品排列、逐段揭露、克制的懸停。
- 8plus轉化：三張既有作品用錯落編排進場，可切換重點作品。
- 操作：點選作品編號／調整展開。
- 本機測試：`/hero-lab?mode=editorial`。

### 09 系統分解 — Oryzo AI

- [原站](https://oryzo.ai/) · [來源與製作說明](https://lusion.co/projects/oryzo_ai/)
- 日期：2026（作品年度）；依據：作者案例列出 Awwwards / FWA SOTM。
- 原機制：將普通杯墊做成完整產品發表與3D敘事。
- 8plus轉化：把8plus工程服務呈現為可分解的資料/模型/應用系統，為概念示意。
- 操作：拖動拆解滑桿。
- 本機測試：`/hero-lab?mode=product`。

### 10 工作地圖 — Bruno Simon

- [原站](https://bruno-simon.com/) · [來源與製作說明](https://tympanus.net/codrops/2026/07/16/meet-the-speakers-of-the-first-three-js-conference/)
- 日期：2026-07-16（報導）；依據：2026 Three.js 大會介紹新版作品集。
- 原機制：可駕車探索的互動3D作品世界。
- 8plus轉化：以可點選的等角工作站，探索需求/原型/整合/交付；不是完整遊戲複製。
- 操作：點選工作站／前往下一站。
- 本機測試：`/hero-lab?mode=world`。

## 測試方式

每版先看一次入場，再操作該版控制；比較第一眼辨識、AI聯想、文字可讀性、互動意願與手機效果。選擇依個人喜好，沒有預填分數。正式首頁保持現況，測試頁 noindex 並排除 sitemap。

## 驗證紀錄 — 2026-10-05 15:38 +08:00

十版均已實作，1280px 桌機與 390px 中英文無水平溢出；十個主要操作會改變畫面。已檢查模式網址還原／非法值備援、暫停及 reduced-motion 靜態。三方審查修正 SVG 筆觸座標、透鏡倍率與取樣、作品編號選取；目視補正全幅定位、標題對比和手機排列。build/typecheck 通過；lint 0 errors／35 既有 warnings。hidden/offscreen 資源停止經共用 clock 審查，尚未進行實機效能測量。正式首頁與 `/hero-preview` 未更動，未部署。
