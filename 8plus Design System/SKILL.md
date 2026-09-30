---
name: 8plus-design
description: Use this skill to generate well-branded interfaces and assets for 8plus (8plus.app) — an architecture-led engineering & technical-consulting brand — either for production or throwaway prototypes/mocks. Contains the v2 CI design guidelines, colors, type, fonts, logo assets, and UI kit components for prototyping.
user-invocable: true
---

閱讀本 skill 內的 `readme.md`，並探索其他可用檔案。

若製作視覺產物（簡報、mock、拋棄式原型等），把資產複製出來、產生靜態 HTML 檔給使用者檢視。若在正式程式碼中工作，可複製資產並閱讀此處規則，成為此品牌的設計專家。

若使用者未提供其他指示就叫用此 skill，請詢問他們想打造或設計什麼、問幾個問題，並以專家設計師的身分產出 HTML 產物 _或_ 正式程式碼（視需求而定）。

## 快速定位（v2 CI）
- **品牌：** 8plus——架構驅動的工程與技術顧問（August Wang）。雙語 繁中／EN。
- **語氣：** 專業、直接、架構優先。`8plus` 小寫；中間點 `·` 連接符；Mono 編號 eyebrow（`01 · STORY`）；不用 emoji。舊有的武俠黑話已淘汰。
- **色彩：** 雙主色場——克萊因藍 `#002FA7` ＋ Pantone 橘 `#FE5000`（＋深夜色 `#0A0E1A`）。區塊藍↔橘交替；每個把 accent 翻轉成互補色。白字階梯。無亮色模式。
- **字體：** 襯線宣示（Georgia display，H1–H2）、無襯線執行（Outfit 內文 300–400）、JetBrains Mono 標籤／eyebrow。內文禁 700+。
- **表面：** 色場上的半透明白玻璃，22px 簽名圓角，細線環（非投影），柔光噪點 ＋ 極光。藥丸按鈕（白底 → hover 轉 accent）。沉穩 `cubic-bezier(0.16,1,0.3,1)` 動效。
- **圖示：** Phosphor，細單色線條 SVG。不用 emoji。
- **關鍵規則：** 切勿寫死顏色——從當前 `.bg-blue`／`.bg-orange`／`.bg-dark` 色場讀 `--bg`／`--accent`（或用 `Section` 元件）。

## 檔案
- `readme.md` — 完整 v2 CI 品牌 ＋ 內容 ＋ 視覺指南與檔案索引（先讀）。
- `styles.css` ＋ `tokens/` — CSS 自訂屬性 ＋ 區塊色場變體；引入 `styles.css`。
- `components/` — Button、Card、Badge、Separator、Section（核心）、Logo（品牌）、Sheet、DropdownMenu（覆蓋層）。各有 `.jsx`／`.d.ts`／`.prompt.md`。
- `ui_kits/8plus-app/` — 編輯風滾動首頁（藍橘交替區塊、預約流程）。
- `guidelines/*.card.html` — 基礎規格卡。
- `assets/` — logo SVG／PNG 變體。
