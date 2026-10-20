# 8plus.app — Next.js → Cloudflare Workers 遷移交接計畫

> 文件版本：v1.0｜2026-10-20｜狀態：稽核完成，Preview 部署中（見 [deployment-inventory.md](./deployment-inventory.md)）
>
> **目標：維持 `8plus.app` 官網既有功能、設計、SEO、URL 和資料，不先重寫 Astro、不強制引入 D1/R2。**

## 0. 已知事實與假設

- 已知：官網 `8plus.app` 目前以 **Next.js** 在 **Vercel** 部署，原始碼由 GitHub 管理。
- 未知（必須先確認）：Next.js 版本、App/Pages Router、使用中的 API Route、Server Actions、Middleware、Image Optimization、ISR、環境變數、第三方服務及 DNS/Email 設定。
- 本文件是**部署方案與稽核清單**，不是已完成相容性驗證；不能直接宣稱可以零程式碼搬遷。
- **原有 Vercel 正式站保持營運，直至 Cloudflare 測試、正式切換與回滾演練通過。**

## 1. 技術決策與禁止事項

| 項目 | 決策 |
|---|---|
| 前端 | **保留 Next.js**；只有相容性阻礙經評估後才修改框架 |
| 新部署平台 | Cloudflare Workers；官方目前推薦優先評估 **vinext** |
| 無法相容時 | 評估 OpenNext、只輸出靜態站，或**暫留 Vercel**，不可為搬遷犧牲功能 |
| 資料庫 / R2 | **不預先新增**，只有檢查發現實際需要時才啟用 |
| CI/CD | GitHub → Cloudflare Workers Builds；採明確的正式分支與測試部署 |
| 正式網域 | `8plus.app`；原有 `www` 行為保持不變 |
| 風險管理 | 先平行部署，再切換 DNS / Custom Domain，保留回滾 |

**禁止**：直接刪除 Vercel、覆蓋 DNS 而未備份、將秘密上傳 Git、讓測試環境觸發正式排程/寄信、無審查更動所有 SEO 路由、同時大幅重構 UI。

## 2. 建議 GitHub Repository 結構

以下為既有 Repo 的**增量**目錄範例；不要為了符合範例搬動既有 Next.js 檔案。

```text
8plus-website/
├── app/ 或 pages/            # 保持目前 Next.js 結構
├── public/
├── src/                      # 如果現有專案採 src，維持現況
├── tests/
│   ├── smoke/                # 首頁、路由、表單、API 檢查
│   └── seo/                  # metadata、sitemap、redirect 檢查
├── docs/
│   ├── 8PLUS_CLOUDFLARE_MIGRATION.md
│   ├── deployment-inventory.md
│   └── rollback-runbook.md
├── cloudflare.config.ts      # 僅在 vinext 初始化後依實際產物建立
├── vite.config.ts            # 若 vinext 初始化產生
├── next.config.*
├── package.json
└── .github/workflows/        # 視需要補充檢查；避免重複部署
```

`deployment-inventory.md` 應補全：

- [ ] Next.js / Node / package manager 版本、build scripts
- [ ] App Router / Pages Router、SSR、SSG、ISR、RSC、Server Actions
- [ ] Middleware、Auth、Cookies、headers、redirects、API/Route Handlers
- [ ] `next/image`、字型、動態圖片、檔案上傳、`public/`
- [ ] Vercel 特有套件或功能：Cron、Blob、Edge Config、Analytics、KV 等
- [ ] 所有 Production/Preview env keys（只記名稱、用途、來源；**不記密鑰值**）
- [ ] 網域 / DNS / 郵件 MX、SPF、DKIM、DMARC、CAA
- [ ] robots、sitemap、canonical、Open Graph、Schema.org、301/308 redirects
- [ ] Webhook、聯絡表單、寄信、Analytics、CAPTCHA、第三方 API
- [ ] 現有正常站頁面清單及重要路由基準輸出

## 3. 部署策略

### 路線 A（優先測試）：既有 Next.js → vinext → Workers

Cloudflare 官方目前推薦 vinext；截至文件日期為仍需驗證相容性的選項。先在**獨立 Git 分支**試驗；執行前請先確認 vinext 支援你的 Next.js 版本，官方特別說明既有 Next.js 16 的初始化支援。

```bash
# 先在原 Repo 完成依賴安裝與既有測試
npm ci
npm run build

git switch -c chore/cloudflare-migration

# 在分支執行相容性檢查（以目前 vinext CLI help / 官方文件為準）
npx vinext --help

# 不破壞原有 Next.js 路線的初始化
npx vinext init --platform=cloudflare
```

初始化可能建立 `vite.config.ts`、`cloudflare.config.ts` 與新的 scripts。**不要先手寫/覆蓋它們**；依生成文件及 lockfile 選擇 npm/pnpm/yarn。確認產生的 `package.json` scripts，使用 vinext Cloudflare deploy 命令：

```bash
# 以專案 scripts 與產生的設定為準
npx @vinext/cloudflare deploy
```

若遇到關鍵相容性缺口（例如 middleware、cache/ISR、圖片處理、第三方 Node 依賴），先建立阻塞清單，不要直接替換或刪除該功能。必要時比較 OpenNext 的支援度，或維持 Vercel。

### 路線 B：若現有網站確定完全靜態

僅在**查明沒有需要執行時 Server Actions、動態 SSR、API** 後，才評估 Next.js Static Export + Workers Static Assets。確認 `next.config` 靜態輸出可成功，並驗證 `/blog/...` 等深層路由和重導向。不可把動態 Next.js 專案硬套靜態部署。

## 4. 分階段執行 SOP

### Phase 0：建立基線

- [ ] 記錄 Vercel 正式 build、git commit SHA、部署版本
- [ ] 產出重要 URL 清單（含 404、301、robots、sitemap）
- [ ] 截圖重要頁面，記錄 Core Web Vitals / 回應碼供比較
- [ ] 備份 Vercel 環境變數「鍵名清單」，密鑰存於密碼管理工具
- [ ] 建立 DNS 記錄匯出與回滾負責人/操作方式

### Phase 1：Cloudflare Preview

- [ ] 建立/登入 Cloudflare，確認帳號、網域是否已在其 DNS 管理
- [ ] 在 GitHub migration 分支執行 vinext 初始化與測試
- [ ] 建立新的 Worker，先用 `*.workers.dev` 或受限 staging host
- [ ] 分別設定 Preview/Staging 的環境變數與 Secret
- [ ] 測試環境避免真實寄信、真實付款、正式 Webhook 和排程
- [ ] Smoke tests、SEO tests、安全標頭及 Cookies 全通過

### Phase 2：GitHub CI/CD

- [ ] Cloudflare Dashboard → Workers & Pages → Import a repository，授權**指定 Repo**
- [ ] 設定 main 生產部署與測試環境（避免 PR 被自動發布到正式域名）
- [ ] 設定 Cloudflare API Token 最小權限；若使用 Workers Builds，優先用其原生整合
- [ ] build/deploy 使用**該 Repo 的實際 scripts**（vinext 部署可能不等於 `wrangler deploy`）
- [ ] 啟用 Pull Request 檢查、版本與部署紀錄

### Phase 3：切換正式 Domain

- [ ] 在 Cloudflare 加入 `8plus.app`，盤點 DNS、郵件記錄及其他子網域
- [ ] 設定 Workers Custom Domain；處理既有 apex / `www` DNS 衝突
- [ ] 於低風險時段切換，保留 Vercel 可回切版本
- [ ] 驗證 HTTPS、全站路由、`www`/apex 跳轉、SEO、表單、寄信
- [ ] 監看 4xx/5xx、Workers 用量、Web Vitals、Search Console
- [ ] 穩定後才計畫停用 Vercel；不要在切換當天刪除

### Phase 4：回滾演練

**觸發條件**：核心流程失效、5xx 激增、登入/寄信異常、搜尋引擎重要路由 404、大幅效能衰退。

1. 停止新部署；確認 Cloudflare 最近穩定版本可否回退。
2. 若需回 Vercel，將 apex/`www` 記錄恢復到預先記錄的值（勿碰 MX/TXT）。
3. 如果同時有資料寫入/排程，先確保資料與 Webhook 不會重複處理。
4. 驗證 HTTPS、首頁、關鍵頁、表單與 SEO；記錄事故、修復與復原時間。

## 5. 安全、可靠性與成本護欄

- 對 Worker Secrets 使用 Cloudflare Secrets；不要把 `.env` 或憑證寫入 Git。
- 外部 API Token 最小權限，Preview/Production 分離。
- 站點正式上線後設定用量警報、Rate Limiting、日誌與故障通知。
- Workers Paid 沒有保證 US$5 封頂；預算警報**不是自動停止計費**。
- 靜態官網通常不需要 D1、R2；若有既有儲存系統，不在第一階段替換。
- 跑 Lighthouse / SEO / 基本可用性測試；追蹤與舊站相同的 canonical URL。

## 6. 開發工作清單（建議 Issue）

| ID | 優先度 | Task | 完成條件 |
|---|---|---|---|
| WEB-01 | P0 | 專案與 Vercel 設定盤點 | inventory 無重大空白 |
| WEB-02 | P0 | 官網路由/SEO 基準與 Smoke Test | 核心頁面測試可重跑 |
| WEB-03 | P0 | vinext 相容性實驗 | 阻塞清單及 PoC 結果已記錄 |
| WEB-04 | P0 | Cloudflare Preview 部署 | 測試網址全部核心功能成功 |
| WEB-05 | P0 | 安全/Env/DNS 審核 | Secret 不入庫，DNS 有備份 |
| WEB-06 | P0 | 正式域名切換與回滾 | 可證明服務正常，回滾文件可操作 |
| WEB-07 | P1 | 自動部署、監控、告警 | main → build/deploy 可追蹤 |
| WEB-08 | P1 | 資源/效能/SEO 比較 | 關鍵指標無不可接受退化 |

## 7. 交付完成標準（Definition of Done）

- [ ] `8plus.app` 與既有網站主要路由、功能、視覺基本一致
- [ ] HTTPS、DNS、301/308、canonical、sitemap、robots 正確
- [ ] GitHub → Cloudflare 可部署，測試環境與正式環境隔離
- [ ] 無公開 Secret、無跨環境副作用
- [ ] 有監控、有費用警報、有可執行回滾步驟
- [ ] 舊 Vercel 保留至驗收完成後，再另行決議停用

## 8. 給 AI Coding Agent 的指令

> 先閱讀此文件與實際專案 `package.json`、`next.config.*`、部署配置。先盤點現有依賴與 Next.js 使用功能，提供相容性報告及最小變更計畫，**不得直接覆蓋既有配置、刪除 Vercel 或修改正式 DNS**。每次變更須可回滾並有測試。只有我核准後才執行正式域名切換。

## 9. 官方參考

- Next.js on Cloudflare: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- vinext Cloudflare deployment: https://vinext.dev/docs/deploying/cloudflare
- Workers Git integration: https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/
- Workers CI/CD: https://developers.cloudflare.com/workers/ci-cd/

