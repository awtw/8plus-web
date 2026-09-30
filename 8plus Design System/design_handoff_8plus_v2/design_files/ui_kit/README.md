# UI Kit — 8plus.app（v2 CI）

改版後 8plus 網站的互動重現：一個 **編輯／雜誌風的單頁滾動首頁**，各區塊在兩個 CI 主色場之間交替。組合了設計系統的原語（Section、Button、Badge、Card、Logo、Sheet、DropdownMenu）——不重新實作它們。

## 結構（單一滾動頁）
- **Hero**（藍場）— 雜誌刊頭（`8PLUS.APP · TRUST001`／`NO.01 — 2026`）、襯線標題「架構先行，AI 落地／把需求交付成可信系統」、兩個 CTA，以及三支柱（A 架構先行 · B AI 導入 · C 體驗落地）與往下滾動提示。
- **01 · STORY**（橘場）— 關於導言 ＋ 技術 chip。
- **02 · LAB**（藍場）— 精選作品，highlight 玻璃卡。
- **03 · SERVICES**（橘場）— 四項服務。
- **04 · JOURNAL**（藍場）— 三張文章卡。
- **05 · BOOKING**（深夜場）— 30 分鐘時段選擇，含 確認 → 已預約 流程。
- **Footer** 位於深夜場。

藍↔橘交替色場（各把 accent 翻轉成互補色）是這次改版的簽名。

## 互動
- Header 在 hero 上為透明、**滾動後磨砂**；導覽連結平滑捲動到區段；行動版 Sheet 鏡射導覽。
- 語言下拉即時切換 繁中／EN 文案。
- 預約時段可選；確認後顯示已預約狀態。

## 檔案
- `index.html` — 掛載 app、滾動容器、header 磨砂邏輯、RWD CSS。
- `Chrome.jsx` — `Header`、`Footer`、`NAV`（掛在 `window.Site`）。
- `Screens.jsx` — 含全部六區塊的編輯風 `Home`（掛在 `window.Screens`）。

## 真相來源
重現自附件 `8plus_web` 專案——`styles/globals.css`（token 來源）、`docs/DESIGN_SYSTEM_SPEC.md` ＋ `docs/CI_IDENTITY_SPEC.md`（ACTIVE v2 CI 規範）、`lib/content/home-sections.ts`（文案逐字取用）、`components/home/sections/*`、`components/site-header.tsx`、`components/logo.tsx`。原始碼的 GSAP 滾動 pin 編排與 Cinema／canvas hero 變體刻意簡化為靜態編輯式版面。
