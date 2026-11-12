# /sb 與 /sc — 社群短網址分享頁

記錄：2026-10-01 00:20 CST（使用者決策）
更新：2026-11-13 00:55 CST（使用者決策：/sc 改 MOKYUU 品牌、兩頁開放 SEO 索引）

## 是什麼
- `/sb`（business，橘底）與 `/sc`（creative，墨語 MOKYUU）是**縮網址超連結的落地頁**，用於社群平台（IG、LINE、名片 QR 等）的 link-in-bio 分享。
- **不在主站導覽 IA 內**：header / footer 隱藏（`lib/site-paths.ts` 的 `isShareHubPath`）。
- **可被搜尋引擎索引**（2026-11-13 起）：`robots.ts` 不再 disallow，已列入 `sitemap.ts`；各自有 `layout.tsx` 提供 title / description / canonical / OG / JSON-LD。

| 頁面 | 品牌 | 內容 | 版面 | Metadata / JSON-LD |
|---|---|---|---|---|
| `/sb` | 8plus（Pantone Orange 021 C） | `lib/content/share-links.ts` | `components/share/share-link-hub.tsx`（主題 `lib/share-hub/themes.ts`） | `app/(site)/sb/layout.tsx`：ProfilePage + ContactPage、ReserveAction → /booking、Breadcrumb |
| `/sc` | 墨語 MOKYUU（Ink #08080A × IKB #002FA7 × Seal #FF401F） | `lib/content/mokyuu.ts` | `components/share/mokyuu-hub.tsx`、`mokyuu-logo.tsx`、`styles/pages/mokyuu-hub.css` | `app/(site)/sc/layout.tsx`：ProfilePage、Brand（MOKYUU）、ItemList（Game ×2 + 墨滴）、Breadcrumb；OG 圖 `public/og/sc-mokyuu.png`（`node scripts/generate-sc-og.mjs` 產生） |

## /sc 內容（2026-11-13）
- Logo 與視覺沿用 mokyuu.com（M● monogram、Instrument Serif、JetBrains Mono 編號 `(Ø1)`、朱印「墨」、跑馬燈）。
- 主 CTA：mokyuu.com。兩款遊戲：〈辦公室觀察日誌 Office Watch〉`/lab/game/coworker/`、〈職場求生記〉`/lab/game/coworker/v2/`；次要列〈墨滴 Ink Drop〉`/play`。
- 外連 mokyuu.com 一律帶 `utm_source=8plus&utm_medium=referral&utm_campaign=sc_hub&utm_content=<item>`（`mokyuuHref()`），讓 mokyuu.com 的 GA4 能歸因。
- 已移除與貓咪的合照頭像（`share-social-avatar.tsx`）與植物背景（`share-havenbird-stage.tsx`）。照片檔 `public/me/me_1.jpg` 仍被全站 JSON-LD Person.image 使用，未刪。
- 〈職場求生記〉英文名 mokyuu.com 未提供，暫用 “Office Survival”。

## 為什麼這兩頁保留 email / LINE / IG
- 這兩頁是「使用者主動從社群點進來」的情境，需要一頁式列出所有聯絡與社群入口，這是它們存在的目的。
- 主站（`/booking`、`/about`…）的主要期待是**讓訪客用 Cal.com 日曆預約**，其他聯絡方式盡量減少，避免被直接聯絡：
  - `/booking` 只保留日曆 + GitHub 連結，**不放 email、LINE**。
  - 若要在主站新增任何聯絡管道，先與使用者確認。

## 維護規則
1. 不要因為「主站隱藏聯絡方式」就把 `/sb` `/sc` 上的 email / LINE 也拿掉——那是刻意保留。
2. 不要把 `/sb` `/sc` 加進主導覽；sitemap 與 robots 允許索引（2026-11-13 決策）。
3. `/share` 已 301 → `/sb`（舊社群連結相容）。
4. GA4 事件見 `docs/ANALYTICS.md`（`mokyuu_click`、`email_copy`、`qr_open`、`section_view` 的 `sc_*` 區塊）。
