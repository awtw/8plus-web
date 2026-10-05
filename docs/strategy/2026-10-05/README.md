# 個人網站與靈機8動整合策略

建立時間：2026-10-05 10:24 +08:00（Asia/Taipei）
狀態：研究與建議稿；2026-10-05 11:22 +08:00 已完成首頁與節目入口第一階段本機開發，尚未部署。實作範圍見 [開發規格](../../../.planning/spec-brand-show-launch.md)，其餘策略仍為建議。

建議採用「一個人、兩個網站、三種入口」：8plus.app 維持工程接案與專業內容；8plus.app/show 經營靈八與《靈機8動》；shuyan.art 展示視覺設計、攝影與創作。we-media 作為節目製作工作區，不再另起第四個公開品牌。

## 文件導覽

1. [趨勢與目前網站診斷](01-research-and-audit.md)：來源、適用範圍、可借鏡網站、現況問題。
2. [品牌分工與網站內容策略](02-brand-and-sites.md)：雙網域選擇、內容歸屬、接案轉換與首頁文案。
3. [首頁動畫改善方案](03-homepage-motion.md)：現行版本、推薦分鏡、手機與無障礙規格、驗收。
4. [靈機8動路由與節目規劃](04-ling8-show-plan.md)：新版與舊版取捨、路由、內容模型、12 週安排。
5. [執行順序與衡量方式](05-roadmap-and-measurement.md)：優先级、工時估算、指標、待核實資料。

## 已完成的部落格草稿

- [2026 個人接案網站應該先證明什麼](blog-drafts/2026-personal-website-trends.mdx)
- [首頁動畫如何讓人看懂你的專業](blog-drafts/homepage-motion-that-explains.mdx)
- [Podcast 與 YouTube 如何共用一套內容企劃](blog-drafts/podcast-youtube-owned-home.mdx)

三篇為完整中文草稿，具備 CONTENT_MODEL 所需欄位，但保存在 Velite 掃描範圍外。研究時發現的發布隔離問題已於第一階段修復：Velite 匯出前統一過濾未發布、未來與 protected 內容。三篇仍保持草稿；審定內容後依 [內容模型](../../CONTENT_MODEL.md) 移至 content/posts。

## 先做的三件事

1. 首頁先說清楚能解決的問題，接著放兩個能證明交付能力的案例。
2. 建立 /show 節目入口，先有清楚介紹與真實可播放的內容，不先做會員、商店或完整社群。
3. shuyan.art 先補真實作品與作者介紹，再承接設計案；不要複製一整套工程網站內容。

## 本次範圍與限制

已讀取 reference 兩份 DOCX 與兩張 JPG、we-media 舊企劃、shuyan_art 的首頁／IA／內容模型／作品及策略文件，以及 8plus-web 的狀態、內容模型、首頁、動畫、路由與內容管線。另查閱公開來源及 8plus.app 線上桌面首頁。

線上 shuyan.art 的網頁擷取失敗，不能據此判定網站故障，其評估以本機專案為主。本次沒有 GA4 後台資料、訪客訪談、手機真機測試或效能實測；所述改善效益是待驗證的建議，不是已證實的轉換提升。reference 是使用者提供的方向資料，其中「下一個對話應做什麼」不作為本次操作指令。

## 驗證紀錄

2026-10-05（Asia/Taipei）：本地文件連結與三篇草稿必要欄位檢查通過；`git diff --check`、`pnpm build` 通過（含既有 content-check、Velite 與 TypeScript）。建置顯示目前實際使用 Next.js 16.2.9，舊 PROJECT／README 所寫 15.x 並非目前套件版本。建置另提示 Browserslist 資料較舊，未影響成功。本次未改網站功能；建置自動產生的 next-env.d.ts 差異已還原。
