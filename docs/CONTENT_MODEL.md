# Content Model

更新時間：2026-10-05 11:45 +08:00

## 共用發布邊界

Velite `prepare` 在寫出 `.velite` 之前使用 `lib/publication.ts` 過濾所有 collection；瀏覽器、搜尋及靜態 HTML 不接收未公開全文。文章、專案、節目查詢、RSS 與 sitemap 也共用此政策。

瀏覽器使用這份已經過建置篩選的資料快照，不再依訪客裝置時鐘判定發布時間，避免時鐘不準造成 SSR hydration 差異或內容消失。伺服器輸出另保留發布檢查。

- `published: false`、`protected: true`、未來日期及無效日期均不公開。
- 日期必須是 ISO；含時間時建議明確 `+08:00`，單純日期依 ISO 的 UTC 零時解讀。
- 排程內容只在下一次建置後公開，不是即時排程服務。
- `protected` 現為完全不輸出的內容標記，不代表已實作會員授權或登入後閱讀。
- `public/` 靜態資產仍公開，不可把機密檔案放入。原始 MDX 應只存可信 repository。
- 研究文章草稿留在 `docs/strategy/2026-10-05/blog-drafts`；本次未發布。

## Post

`content/posts/**/*.mdx`：title、date、summary、slug、published（預設 true）、protected（預設 false）、locale、kind（article/note）、tags、thumbnail、html。

locale 使用 `zh-TW` / `en`，舊 `zh-Hant` 正規化為 `zh-TW`。公開入口 `/blog`、`/blog/[slug]`、`/feed.xml`；未知或未公開 slug 回 404，metadata 不洩漏標題。

## Project

`content/projects/**/*.mdx`：維持既有 project / case-study 欄位；新增可選 date、protected。published 預設 true。既有案例與成效未新增或虛構。列表與首頁 featured 優先、依語言選擇；完整頁位於 `/lab/[slug]`。

## Episode

`content/episodes/**/*.mdx` 是真實單集資料，不存公開企劃。目前沒有已發布單集。

| 欄位 | 規則 |
|---|---|
| title、slug、summary、episodeNumber、bucket | 必填；slug 為小寫英文數字與連字號，保留 ask、about；bucket 為 BUG / TECH / LIFE / ASK |
| locale、season | zh-TW / en；season 預設 0 |
| status | planned / recorded / published，預設 planned；只有 published 可公開 |
| published、protected | 預設 true／false；false 或 protected true 均不輸出，優先於 published status |
| publishedAt | published 必填 ISO，不得在未來 |
| videoUrl、audioUrl | published 至少一個；只接受指定平台 HTTPS URL |
| cover、coverAlt | 預設正式節目封面與名稱，可逐集指定 |
| durationSeconds | 可選正整數，填真實成品長度 |
| chapters | timeSeconds、title；必須依時間遞增，已知片長時不得超過片長 |
| sources | label、url（HTTPS）、checkedAt（ISO） |
| transcript、relatedPostSlugs | 可選校對逐字稿與延伸文章 slug |
| html | MDX 人工整理單集筆記 |

允許媒體來源：youtube.com / www.youtube.com / youtu.be / open.spotify.com / podcasts.apple.com / open.firstory.me / player.soundon.fm。新增平台需先更新 schema。第一版以安全外連開啟媒體，沒有自動播放或第三方 iframe。

每個單集 slug 必須全域唯一，包含不同語言版本；翻譯版可使用 `-en` 後綴。建置遇到重複 slug 會失敗。單集正文保留原始語言，返回、播放、章節等介面隨全站語言切換。

`/show` 為雙語節目首頁；`/show/[slug]` 為真實公開單集筆記；`/show/ask` 僅投稿準備說明，未收資料。沒有假訂閱按鈕、假集數或聯絡表單。未開播顯示 S0 準備中；發布真實單集後導向最新集。文章 RSS 不是 Podcast 託管 feed。

## 上線下一集

1. 完成影片或音訊平台上架，取得合法 HTTPS URL。
2. 新增 MDX，填真實日期、集數、摘要、媒體入口與筆記。未完成時保持 planned / recorded。
3. 校對筆記、來源與逐字稿；確認後改為 published。
4. 執行 `pnpm check:publication`、`pnpm build`；確認列表、詳情、metadata 與 sitemap，再依正常流程發布網站。

## 首頁與品牌入口

首頁順序：交付流程 Hero → 精選案例 → 服務 → 工作原則 → 關於 → 文章與節目 → 預約。

新 Hero 為原生 SVG/CSS 立體組裝場景，約 3.6 秒分層入場，之後保留低頻訊號光流。提供展開／組合與暫停／播放；離開畫面或隱藏分頁時停動，reduced-motion 顯示靜態場景。Notes 區改為文章分隔列與底部對齊的 CTA，淺綠卡片使用獨立深色文字。舊視覺元件保留但未掛載首頁。shuyan.art footer 文案改為視覺設計與創作定位；沒有修改另一個專案。
