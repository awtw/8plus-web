# 8plus.app 部署盤點（Deployment Inventory）

> 建立：2026-10-20｜分支：`chore/cloudflare-migration`｜對應：[8PLUS_CLOUDFLARE_MIGRATION.md](./8PLUS_CLOUDFLARE_MIGRATION.md) WEB-01 / WEB-03

## 1. 執行環境

| 項目 | 現況 |
|---|---|
| Next.js | 16.4.1（App Router；2026-10-27 由 16.2.9 升級，修補 10/14 安全公告） |
| React | 19.3.1（vinext init 從 19.2.7 升級） |
| Node（本機） | v23.11.0 |
| 套件管理 | pnpm 10.18.0（workspace：`.` + `packages/*`） |
| 內容 | Velite → `.velite/`（build 前產生） |
| Next.js build | `pnpm build` = `validate:content && velite && next build` |
| Cloudflare build | `pnpm build:vinext` = `validate:content && velite && vite build`（vinext 1.2.1） |
| Cloudflare deploy | `pnpm deploy:vinext` = `vinext-cloudflare deploy`（Worker 名稱 `8plus-web`） |

## 2. Next.js 功能使用

| 功能 | 使用位置 | vinext 狀態 |
|---|---|---|
| SSG / `generateStaticParams` | `blog/[slug]`、`show/[slug]` | ✓ 執行時渲染 |
| 動態 searchParams | `hero-lab` | ✓ |
| Route Handlers | `feed.xml`、`llms.txt` | ✓ |
| Metadata routes | `robots.ts`、`sitemap.ts` | ✓ |
| Proxy（middleware） | `proxy.ts`：`/secret` 密碼閘門 | ✓ 行為與 Next 一致 |
| redirects | 6 條 308（`/contact`→`/booking` 等） | ✓ |
| rewrites | `/tool/qrcode` → `/tool/qrcode.html` | ✓ 改為 `beforeFiles`（見 §6） |
| `next/image` | 6 個檔案，皆為本地圖片 | ✓ 未啟用 Cloudflare Images，輸出原圖 |
| `next/font/google` | `app/layout.tsx` | ✓ build 時自架 |
| `ViewTransition`（React canary） | `components/page-transition.tsx` | ~ passthrough，轉場不會動畫 |
| Server Actions | 無 | — |
| ISR / revalidate | 無 | — |
| API Routes（`app/api`） | 無 | — |

## 3. Vercel 特有功能

未使用 Vercel Cron、Blob、Edge Config、KV、`@vercel/analytics`。Analytics 為 GA4（`NEXT_PUBLIC_GA_ID`，client side）。

## 4. 環境變數（只記鍵名）

| Key | 用途 | 類型 | 執行期使用 |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical / sitemap / OG base | build-time | ✓（**Vercel 正式站未設定**，見 §7） |
| `NEXT_PUBLIC_GA_ID` | GA4 | build-time | ✓（有程式內預設值） |
| `NEXT_PUBLIC_LINE_*` | LINE 加好友連結 / QR | build-time | ✓（有預設值） |
| `SECRET_PASS` | `proxy.ts` `/secret` 閘門 | Worker Secret | ✓ |
| `NEXT_PUBLIC_SUPABASE_URL` / `_ANON_KEY` | Supabase（Phase 2） | build-time | ✗ 目前未呼叫 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | Secret | ✗ |
| `LINE_CHANNEL_*`、`LINE_NOTIFY_USER_ID` | LINE Messaging API | Secret | ✗ 程式未使用 |
| `CONTACT_WEBHOOK_URL` | 聯絡表單 fallback | Secret | ✗ 程式未使用 |
| `GOOGLE_CLIENT_*`、`GOOGLE_REDIRECT_URI` | 預約自架（未來） | Secret | ✗ |

Cloudflare 第一階段只需要 `NEXT_PUBLIC_SITE_URL`（build 預設 `https://www.8plus.app`）；`SECRET_PASS` 視需要以 `wrangler secret put SECRET_PASS` 設定。

## 5. 網域 / DNS 基線（2026-10-20 `dig` 結果）

| 記錄 | 值 |
|---|---|
| NS | `arely.ns.cloudflare.com`、`lynn.ns.cloudflare.com`（**DNS 已在 Cloudflare**） |
| `8plus.app` A/AAAA | Cloudflare proxied（104.21.39.6、172.67.141.205）→ 源站 Vercel |
| `www.8plus.app` | Cloudflare proxied → Vercel（回 200，為實際 canonical host） |
| apex 行為 | `8plus.app` → **308** → `https://www.8plus.app/`（由 Vercel 發出） |
| MX | `mx0001.neo.space`（20）、`mx0002.neo.space`（10） |
| TXT | SPF `v=spf1 include:spf0001.neo.space ~all`、google-site-verification、neo-verification |
| DMARC | `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s` |
| CAA | 無 |
| HSTS | `max-age=63072000` |

> 切換前須在 Cloudflare Dashboard 匯出完整 DNS zone（含 proxied 狀態與 Vercel 目標值），存入密碼管理工具或本 repo 以外位置。

## 6. 為 Workers 所做的程式調整

1. `app/(site)/blog/[slug]/page.tsx`：`publicContent()` 從模組頂層改成每次呼叫時計算。Workers 在模組初始化時 `Date.now()` 為 0，導致所有文章被視為未發佈而 404。Next.js 行為不變。
2. `next.config.mjs`：`/tool/qrcode` rewrite 改放 `beforeFiles`。vinext 在 `afterFiles` rewrite 之前就檢查 public 檔案，rewrite 到靜態檔會 404；此路徑在 Next.js 沒有頁面也沒有同名檔案，兩種階段語意相同。
3. `vite.config.ts`：補 `.velite` alias（原本靠 tsconfig `baseUrl` 解析）。
4. `tsconfig.json`：排除 `vite.config.ts`、`cloudflare.config.ts`，避免 Next.js 以 TS 5.4 型別檢查 Vite 8 型別而失敗。
5. `package.json`：加入 `"type": "module"`；`tailwind.config.js`、`postcss.config.js` 改名為 `.cjs`（vinext init 自動處理）。

## 7. 既有問題（非遷移造成，需另行決議）

- **正式站 SEO**：`https://www.8plus.app/robots.txt` 與 `sitemap.xml` 輸出 `http://localhost:3000`。原因：Vercel 未設定 `NEXT_PUBLIC_SITE_URL`。Cloudflare build 已預設 `https://www.8plus.app`；Vercel 端建議同步補上。
- **`/secret` 閘門**：`SECRET_PASS` 未設定時，`cookie === process.env.SECRET_PASS` 兩邊都是 `undefined`，閘門會放行（目前因無 `/secret` 頁面而 404）。
- `/about`、`/services`、`/blog`、`/lab` 等頁面 `<title>` 皆為 `8plus`，未覆寫 title（Next.js 與 vinext 結果相同；blog 文章頁有正確 title）。

## 8. 驗證

2026-10-27 升級 next 16.4.1 / eslint-config-next 16.4.1 / sharp ^0.35.5 後重跑：Next.js（需 build 時帶 `NEXT_PUBLIC_SITE_URL`）與 vinext 的 smoke、SEO 全過。`velite@0.3.0` 仍自帶 `sharp@0.34.5`，僅建置期處理 repo 內圖片，不在公告攻擊面。

| 測試 | 指令 | Next.js | vinext（本機 workerd） |
|---|---|---|---|
| Smoke（29 項） | `BASE_URL=… pnpm test:smoke` | 全過 | 全過 |
| SEO | `BASE_URL=… pnpm test:seo` | 需帶 `NEXT_PUBLIC_SITE_URL` | 全過 |

## 9. Cloudflare Preview

- URL：https://8plus-web.delicate-truth-7cd5.workers.dev
- 首次部署：2026-10-20，Version `f7de34d4-a80a-4a4a-91fb-3bd020d6ab5e`
- 部署指令：`pnpm build:vinext && npx vinext-cloudflare deploy --skip-build`
- 對 Preview URL 執行 smoke、SEO 測試：全過
- 2026-10-20：Worker Route `www.8plus.app/*` 上線（Version `89dd5fb9-b747-495a-b9ee-710d978148b8`），smoke、SEO 測試對 `https://www.8plus.app` 全過
- apex `8plus.app` 仍由 Vercel 308 → www；DNS 未變更，Vercel 保留為回滾源站
- 2026-10-27 13:14 +0800：部署 Next.js 16.4.1 升級與 10 月文章（commit `5887320`），Version `171aa65b-6073-4c20-b99f-a9d5221a5339`；回滾目標 `89dd5fb9-…`。smoke、SEO 對 `https://www.8plus.app` 與 workers.dev 全過，四篇新文章 200、RSS／sitemap 已收錄
- 2026-10-29 14:35 +0800：部署首頁即時品牌片（commit `be87be0`），Version `73b270f4-5759-4b7f-82a6-901a3b77be6c`；回滾目標 `171aa65b-…`。部署前本機 Worker 預覽的 smoke、SEO 全過；部署後 smoke、SEO 對 `https://www.8plus.app` 全過，workers.dev 的 smoke 也全過。`/hero/film/*` 回 200（htmlHandling none，不會被重新導向），正式首頁的 iframe 即時播放，無 console error
- 2026-10-29 15:40 +0800：再部署三版：`eb555619`（結尾預約按鈕可點）、`aac3ebda`（拿掉暫停鍵，聲音改成角落小圖示）、`c6324087`（配樂改用 Web Audio，commit `ba4b4fa`）。原因是 Worker 的靜態檔不支援 Range（`sound.m4a` 回 200，沒有 Content-Range），`<audio>` 無法跳到指定秒數。每次部署後 smoke、SEO 對 `https://www.8plus.app` 全過，workers.dev 的 smoke 也全過；正式站實際點擊開聲音後，AudioContext 為 running。回滾目標 `73b270f4`
- 2026-10-30 +0800：部署聲音預設開啟（commit `13e6eaf`），Version `34b69703-7e9e-468c-8382-5c12e81dfd2c`；回滾目標 `c6324087`。smoke、SEO 對 `https://www.8plus.app` 全過，workers.dev 的 smoke 也全過。正式站實測：新訪客的喇叭預設開啟並閃動等待，點擊頁面後配樂開始播放，無 console error
