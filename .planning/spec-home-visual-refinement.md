---
title: '首頁動態與 Notes 區視覺修正'
type: feature
created: '2026-10-05T11:35:00+08:00'
status: done
baseline_commit: 015e4e4
context: []
---

<frozen-after-approval reason="user requested direct implementation">
## Intent
使用者指出 Notes & Conversations 排版錯誤，Hero 不夠吸引人並要求尋找更合適參考重製。本輪目標是提升首頁呈現品質。
Notes 現有標題與卡片緊貼；所有連結 margin-top 造成節奏混亂；淺綠卡 h3 與 eyebrow 繼承白字，對比不足。重排成具文章分隔列與清楚底部 CTA 的編輯式雙卡。
Hero 現為四張依序淡入的列表，改成立體工程組裝場景，以散落模組、分層系統、訊號路徑呈現從想法到交付；需有可操作展開／組合、明確分鏡、精準材質與空間深度。

## Boundaries & Constraints
Always: 中文／英文、現有主標與預約／作品 CTA、品牌藍與橘、鍵盤可操作、手機內容完整。CSS/SVG 原生繪製，不加入依賴。動畫不用假即時數據。Reduced-motion 靜態、內容首屏可讀，循環動態須可暫停、離開畫面與隱藏分頁停止。
Ask First: 部署或外部付費服務。
Never: 修改其他站或 reference、發布部落格、使用未授權第三方視覺素材、強迫觀看載入動畫。
</frozen-after-approval>

## Code Map
- `components/home/hero/hero-delivery.tsx`：現有 Hero 文案與四張卡片。
- `styles/pages/home-delivery.css`：Hero 與 Notes 共用局部樣式；全域 h3 與 eyebrow token 不適合 lime surface。
- `components/home/sections/section-journal.tsx`：文章與節目卡結構。
- `styles/globals.css`：現有全站標題色／section container，盡量不動。

## Tasks & Acceptance
- [x] 重製 Hero 為具有立體空間、組装動態與互動控制的工程場景，文案與 CTA 不依賴動畫。
- [x] 修正 Notes 間距、卡片內容層級、兩張卡 CTA 對齊與對比；文章保持真實資料。
- [x] 更新 CONTENT_MODEL 與 STATE 的現行動畫描述。
- [x] 完成 build、typecheck、lint 與瀏覽器桌機／手機／中英／減少動態檢查。

Acceptance:
- Given 桌機首頁，when Hero 入場，then 可見明確組裝分鏡、完整 CTA 及可操作動畫控制。
- Given 鍵盤或觸控，when 操作展開／組合，then 視覺狀態與按鈕文字一致，不要求 hover。
- Given reduced-motion，when 頁面載入，then 靜态完整場景且資訊與連結可用。
- Given 390px 或桌機，when 捲至 Notes，then 區塊標題與卡片至少 32px 間距、淺綠面所有文字深色、連結可換行、不溢出。
- Given 中英文，when 切換語系，then 所有互動控制與內容切換，版面不截字。

## Design Notes
參考：Vercel Ship 2025 的空間材質與互動視覺 https://vercel.com/blog/designing-and-building-the-vercel-ship-conference-platform ，以及動態尊重使用者偏好 https://vercel.com/design/guidelines 。借鏡方法，自製幾何視覺；不直接複製其素材或 logo。首頁採「模組→系統」敘事，可用 SVG 等角層板、透明邊缘、路徑光流、橘色核心，避免重複舊版軟球與單純卡片 fade。

## Verification
`pnpm build`、`pnpm typecheck`、`pnpm lint`、`git diff --check`。
瀏覽器檢查 1280px/390px、Notes 實際色彩與間距、動畫控制、reduced-motion、console errors。

## Spec Change Log

2026-10-05 11:45 +08:00：build（39 pages）、typecheck、lint（0 errors／35 既有 warnings）通過；1280px/390px 實測無水平溢出。Notes 間距 42px/34px、淺綠標題 rgb(27,37,16)、眉題 rgb(77,97,37)，桌機 CTA 底部相等。展開／組合、暫停、減少動態（animation-name 全 none）及英文控制驗證通過，瀏覽器無 error。三方程式審查未發現確定回歸，舊動畫文件敘述已同步修正。

## Suggested Review Order

- 查看模組組裝、互動狀態及生命週期。
  [delivery-scene.tsx:6](../components/home/hero/delivery-scene.tsx#L6)
- 查看首頁文字與新場景整合。
  [hero-delivery.tsx:7](../components/home/hero/hero-delivery.tsx#L7)
- 查看文章列與節目卡的新結構。
  [section-journal.tsx:9](../components/home/sections/section-journal.tsx#L9)
- 查看動畫、局部色彩及響應式規則。
  [home-delivery.css:1](../styles/pages/home-delivery.css#L1)
