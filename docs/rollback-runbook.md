# 8plus.app 回滾手冊（Rollback Runbook）

> 建立：2026-10-20｜對應：[8PLUS_CLOUDFLARE_MIGRATION.md](./8PLUS_CLOUDFLARE_MIGRATION.md) Phase 4 / WEB-06

## 現況前提

- DNS 已由 Cloudflare 託管（NS：`arely` / `lynn.ns.cloudflare.com`），`8plus.app` 與 `www.8plus.app` 目前 proxied 到 **Vercel**。
- Cloudflare Worker `8plus-web` 目前只掛在 `*.workers.dev`（Preview），**尚未綁定正式網域**。
- 在正式切換完成並驗收前，Vercel 專案與其網域設定保持不動。

## 切換前必做

1. Cloudflare Dashboard → `8plus.app` → DNS → Export，保存 zone 檔（含 apex / `www` 原值與 proxied 狀態）。
2. 記錄 Vercel 最新正式部署 ID 與 commit SHA。
3. `pnpm test:smoke`、`pnpm test:seo` 對 Preview URL 全過。
4. 確認回滾負責人與時段。

## 觸發條件

核心頁面失效、5xx 激增、搜尋引擎重要路由 404、`www`/apex 跳轉異常、明顯效能退化。

## 回滾步驟

### A. Worker 本身出問題（仍在 Cloudflare）

```bash
npx wrangler deployments list --name 8plus-web
npx wrangler rollback --name 8plus-web
```

回退到上一個穩定版本後，對正式網域跑 smoke test。

### B. 需要切回 Vercel

1. Cloudflare Dashboard → Workers & Pages → `8plus-web` → Settings → Domains & Routes：移除 `8plus.app`、`www.8plus.app` Custom Domain。
2. DNS：依匯出的 zone 檔恢復 apex 與 `www` 記錄（指回 Vercel、proxied 狀態同原值）。
3. **不要動** MX、SPF、DMARC、google-site-verification、neo-verification 等 TXT 記錄。
4. 驗證：

```bash
curl -sI https://8plus.app | grep -iE "^HTTP|location|x-vercel"
curl -sI https://www.8plus.app | grep -iE "^HTTP|x-vercel"
BASE_URL=https://www.8plus.app pnpm test:smoke
```

預期 apex 回 308 → `https://www.8plus.app/`，`www` 回 200 並帶 `x-vercel-id`。

## 事後

記錄事故時間、觸發原因、回滾耗時、修復計畫於 `.planning/STATE.md`。
