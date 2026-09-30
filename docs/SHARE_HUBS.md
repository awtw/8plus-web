# /sb 與 /sc — 社群短網址分享頁

記錄：2026-10-01 00:20 CST（使用者決策）

## 是什麼
- `/sb`（business，橘底）與 `/sc`（social，藍底）是**縮網址超連結的落地頁**，用於社群平台（IG、LINE、名片 QR 等）的 link-in-bio 分享。
- **不在主站導覽 IA 內**：header / footer 隱藏（`lib/site-paths.ts` 的 `isShareHubPath`），`robots.ts` disallow，不進 sitemap。
- 內容來源：`lib/content/share-links.ts`；版面：`components/share/*`；主題：`lib/share-hub/themes.ts`。

## 為什麼這兩頁保留 email / LINE / IG
- 這兩頁是「使用者主動從社群點進來」的情境，需要一頁式列出所有聯絡與社群入口，這是它們存在的目的。
- 主站（`/booking`、`/about`…）的主要期待是**讓訪客用 Cal.com 日曆預約**，其他聯絡方式盡量減少，避免被直接聯絡：
  - `/booking` 只保留日曆 + GitHub 連結，**不放 email、LINE**。
  - 若要在主站新增任何聯絡管道，先與使用者確認。

## 維護規則
1. 不要因為「主站隱藏聯絡方式」就把 `/sb` `/sc` 上的 email / LINE 也拿掉——那是刻意保留。
2. 不要把 `/sb` `/sc` 加進主導覽或 sitemap。
3. `/share` 已 301 → `/sb`（舊社群連結相容）。
