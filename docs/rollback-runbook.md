# 8plus.app 回滾手冊（Rollback Runbook）

> 建立：2026-10-20｜對應：[8PLUS_CLOUDFLARE_MIGRATION.md](./8PLUS_CLOUDFLARE_MIGRATION.md) Phase 4 / WEB-06

## 現況前提

- DNS 已由 Cloudflare 託管（NS：`arely` / `lynn.ns.cloudflare.com`），`8plus.app` 與 `www.8plus.app` 目前 proxied 到 **Vercel**。
- 2026-10-20 起 `www.8plus.app/*` 由 Worker `8plus-web` 回應（Worker Route，Version `89dd5fb9-b747-495a-b9ee-710d978148b8`）；`*.workers.dev` 預覽仍啟用。
- 在正式切換完成並驗收前，Vercel 專案與其網域設定保持不動，仍是 `www` CNAME 的源站。

## DNS 備份（2026-10-20 切換前，`cf dns records list -z 8plus.app`）

| Type | Name | Content | Proxy | TTL | Record ID |
|---|---|---|---|---|---|
| A | `8plus.app` | `216.198.79.1`（Vercel） | proxied | auto | `f6aeb8c43aaaa201697a3c6fb4de92c1` |
| CNAME | `www.8plus.app` | `cname.vercel-dns.com` | proxied | auto | `74f68326151f85e703f5b6061eb028ad` |
| CNAME | `_domainconnect.8plus.app` | `_domainconnect.domains.squarespace.com` | proxied | auto | `464a01c76b4022280bdd66d2e00ee4a4` |
| MX | `8plus.app` | `mx0002.neo.space`（prio 10） | DNS only | auto | `cde8fb9e5c5f04e85f7e9955e2c83b79` |
| MX | `8plus.app` | `mx0001.neo.space`（prio 20） | DNS only | auto | `bc298a6b63619ffe4524d274f2587bf2` |
| TXT | `8plus.app` | `neo-verification=QXrBPmcqQv` | DNS only | auto | `4abd8f8158016a819a1679ffca020fd8` |
| TXT | `8plus.app` | `v=spf1 include:spf0001.neo.space ~all` | DNS only | auto | `13c668004d49ef74b48e543f91b0a022` |
| TXT | `8plus.app` | `google-site-verification=zXsiw4sssDpKoUwjfW87zfVEDkbfRCItjHHEuBJ_57M` | DNS only | auto | `9698664d27c59bdf374f787b6b58da3b` |
| TXT | `_dmarc.8plus.app` | `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s` | DNS only | auto | `a81ecbdeca2d7066a823b15cd32a72b6` |
| TXT | `_domainkey.8plus.app` | `v=DKIM1; p=` | DNS only | auto | `9616725cb6358c16037c940864595577` |

切換前基線：`www.8plus.app` → 200（`x-vercel-id`）；`8plus.app` → 308 `https://www.8plus.app/`。

## 目前的切換方式（Phase 3a，2026-10-20）

- `cloudflare.config.ts` 宣告 Worker Route `www.8plus.app/*` → `8plus-web`，**DNS 未變更**。
- `www` CNAME 仍指向 Vercel，但符合 Route 的請求由 Worker 回應。
- apex `8plus.app` 仍由 Vercel 回 308 → www。

## 切換前必做

1. Cloudflare Dashboard → `8plus.app` → DNS → Export，保存 zone 檔（含 apex / `www` 原值與 proxied 狀態）。
2. 記錄 Vercel 最新正式部署 ID 與 commit SHA。
3. `pnpm test:smoke`、`pnpm test:seo` 對 Preview URL 全過。
4. 確認回滾負責人與時段。

## 觸發條件

核心頁面失效、5xx 激增、搜尋引擎重要路由 404、`www`/apex 跳轉異常、明顯效能退化。

## 回滾步驟

### 最快回滾：移除 www Route（約 1 分鐘，DNS 不需改）

Cloudflare Dashboard → `8plus.app` → Workers Routes → 刪除 `www.8plus.app/*`。請求立即回到 Vercel 源站。之後把 `cloudflare.config.ts` 的 `triggers` 移除並重新部署，避免下次部署又加回 Route。

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
