# GA4 Analytics 說明

建立：2026-10-01 CST（同日擴充共用參數、內容與診斷事件）

- Property：`8plus.app`，Stream ID `15891055778`，Measurement ID `G-KF309NTS2D`（公開 ID，非機密）
- 載入：[components/analytics/analytics.tsx](../components/analytics/analytics.tsx)（掛在 `app/layout.tsx`）
- 事件 API：[lib/analytics.ts](../lib/analytics.ts)（`track()`、`EVENTS`、`bindCalTracking()`）
- **只有這兩個檔案碰 GA。** 要改 GA 行為，只改這裡；元件一律透過 `track()` 或 `data-track` 屬性。

## 開關

| 環境 | 行為 |
|---|---|
| production | 自動載入 |
| dev / preview | 不載入，避免污染資料 |
| 本機測試 | `NEXT_PUBLIC_GA_DEBUG=1 pnpm dev`，再到 GA4 → Admin → DebugView 看 |

`NEXT_PUBLIC_GA_ID` 可覆蓋 ID，未設定時用上面的 Measurement ID。

## 事件字典

### 每個事件都會自動帶的共用參數

用這些參數可以把任何事件的報表再切開：

| 參數 | 值 | 用途 |
|---|---|---|
| `entry_source` | 首次進站來源（見下） | 各管道的轉換率 |
| `page_type` | `home` / `about` / `services` / `path` / `booking` / `blog_list` / `blog_post` / `lab_list` / `lab_detail` / `share_hub` | 依頁面類型分析 |
| `content_slug` | 文章、專案 slug；分享頁為 `sb` / `sc` | 內容排行 |
| `device_type` | `mobile` / `tablet` / `desktop`（寬度 768、1100 分界） | 手機與桌機行為差異 |
| `site_locale` | `zh-TW` / `en` | 語言偏好 |
| `visitor_type`、`visit_count` | `new` / `returning`、第幾次造訪 | 回訪者 vs 新訪客 |
| `session_pages`、`session_seconds` | 本次造訪已看頁數、已停留秒數 | 事件發生時的進度 |

轉換事件（`booking_complete`、`github_click`、`line_click`）另外帶：

| 參數 | 說明 |
|---|---|
| `cta_location` | 最後一次點的預約 CTA 位置（header / footer / 首頁 section id…） |
| `cta_path` | 那個 CTA 所在頁面 |
| `pages_before_conversion` | 轉換前看了幾頁 |
| `seconds_to_convert` | 從進站到轉換的秒數 |

這樣可以回答：「哪個 CTA 位置帶來最多預約？」「來自 `/sb` 的人平均看幾頁才預約？」

### 轉換漏斗

| 事件 | 觸發 | 參數 |
|---|---|---|
| `booking_cta_click` | 點任何連到 `/booking` 的站內連結 | location, label, link_path |
| `booking_view` | Cal 日曆載入完成（`/booking` 或分享頁展開） | source = `booking_page` / `share_hub` |
| `booking_complete` ★ | Cal `bookingSuccessful`，預約成功 | source |
| `github_click` ★ | 點 github.com 連結 | location, label, link_url |
| `line_click` ★ | 點 line.me / lin.ee 連結 | location, label, link_url |
| `qr_open` | 分享頁打開 QR（LINE / IG） | kind = `line-official` / `line-personal` / `ig` |
| `email_click`、`tel_click` | mailto / tel 連結 | location, label |

★ = 要在 GA4 標成 Key event（見下方設定）。

### 導覽與外連

| 事件 | 觸發 | 參數 |
|---|---|---|
| `nav_click` | header / footer 的站內連結 | location, label, link_path |
| `internal_click` | 內容區的站內連結（含 lab 專案、blog 文章） | location（= 所在 section id）, label, link_path |
| `outbound_click` | 其他外部連結 | location, label, link_url, link_domain |
| `lang_switch` | 語言切換 | from, to |

### 內容與診斷

| 事件 | 觸發 | 參數 |
|---|---|---|
| `content_view` | 開啟文章或 lab 專案頁 | content_type, content_slug |
| `content_read` | 同一頁捲動 ≥75% 且停留 ≥30 秒（合格閱讀），每頁一次 | content_type, content_slug |
| `copy_text` | 複製文字（只記長度，不記內容） | length |
| `web_vital` | LCP / INP / CLS / FCP / TTFB | metric_name, value（CLS 乘 1000）, rating, metric_id |
| `not_found` | 落到 404 頁 | page_path |
| `js_error` | 前端例外，每個 session 最多 3 次 | message（前 100 字）, page_path |
| `session_summary` | 分頁第一次被隱藏或關閉，每個 session 一次 | pages_viewed, engaged_seconds, max_scroll, converted, duration_seconds |

### 停留與捲動

| 事件 | 觸發 | 參數 |
|---|---|---|
| `scroll_depth` | 每頁各觸發一次：25 / 50 / 75 / 100% | percent, page_path |
| `section_view` | 首頁各章節進入畫面 50%，每頁每章一次 | section, page_path |
| `engaged_time` | 頁面可見累計 30 / 60 / 120 秒 | seconds, page_path |

換頁（`page_view`）由 GA4 內建 Enhanced Measurement 處理，不重複送。

## 來源追蹤 `entry_source`

首次進站時判定並存 localStorage，之後所有事件都帶同一個值，並同步成 user property。判定順序：

1. `?utm_source=` 或 `?src=`（有 `utm_medium` 時為 `source/medium`）
2. 落地頁是 `/sb`、`/sc` → `share_hub/sb`、`share_hub/sc`
3. 外部 referrer → `網域/referral`
4. 其餘 → `direct`

名片、IG、LINE 上的連結建議加 `?src=`，例如 `https://www.8plus.app/sb?src=namecard`。

## 新增事件的方式

- 按鈕：加屬性，不用寫程式。`<button data-track="qr_open" data-track-kind="ig">`（`data-track-*` 會變成事件參數）。
- 連結：不用加，全站點擊委派會依網址自動分類。要覆蓋位置或標籤用 `data-track-location`、`data-track-label`。
- 章節：`data-track-section="name"` 會被 `section_view` 收錄。
- 程式：`track(EVENTS.XXX, { ... })`，並先在 `lib/analytics.ts` 的 `EVENTS` 和本文件登記。

## GA4 後台一次性設定（手動）

1. **Key events**：Admin → Data display → Events，把 `booking_complete`、`github_click`、`line_click` 標成 Key event。
2. **Custom dimensions**（Admin → Data display → Custom definitions），否則自訂參數不會出現在報表：
   - Event-scoped（建議先註冊這些）：`entry_source`、`page_type`、`content_slug`、`content_type`、`device_type`、`site_locale`、`visitor_type`、`location`、`label`、`source`、`section`、`percent`、`seconds`、`kind`、`cta_location`、`link_domain`、`metric_name`、`rating`
   - Event-scoped（指標 Metric）：`visit_count`、`session_pages`、`session_seconds`、`pages_before_conversion`、`seconds_to_convert`、`engaged_seconds`、`max_scroll`、`duration_seconds`、`value`
   - User-scoped：`entry_source`、`visitor_type`、`device_type`、`site_locale`
   - GA4 標準報表有 50 個自訂維度上限（免費版），上面約 20 個，仍有餘裕
3. **Enhanced measurement** 保持開啟（page_view、outbound click、file download）。
4. 內部流量：Admin → Data streams → Configure tag settings → Define internal traffic，排除自己的 IP。

## 已知限制

- 目前沒有 cookie consent banner，GA 預設直接收集。
- `/booking` 的 Cal iframe 內部細節（選時段、填表）看不到，只有 `booking_view` 和 `booking_complete`。
- 404 用 Next 預設頁的標題（`404` 開頭）判斷；若之後做自訂 not-found 頁，要保留這個標題或改成 `data-track-section`。
- `visitor_type` 只在同一個瀏覽器、未清除資料時準確；清除 localStorage 或換裝置會被當新訪客。
