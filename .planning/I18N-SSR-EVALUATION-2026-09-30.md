# next-intl 與 SSR 評估

建立：2026-09-30 CST｜狀態：**僅評估，未實作**（等使用者決定）

## 現況（事實）
- i18n 為手刻：`lib/i18n.ts`（514 行字典）+ `components/language-provider.tsx`（client context）。
- Locale 存在 `localStorage`；**首次渲染一律 zh-TW**，掛載後才切換 → 英文使用者會看到 zh-TW 閃爍，且 SSR 輸出永遠是中文。
- `app/` 共 12 個 page，其中 11 個檔案含 `'use client'`；21 個檔案使用 `useLanguage`。
- 只有 `app/layout.tsx` 與 `blog/[slug]` 有 metadata；client page 無法 `export const metadata`，因此 about / services / lab / path / booking 沒有各自的 title / description / OG。
- `<html lang>` 寫死 `zh-Hant`，掛載後由 JS 改寫；沒有 hreflang，URL 不分語言。
- 內容：Velite MDX 以 `*-en.mdx` + 不同 slug（`hello-8plus-en`）存放英文版，未與中文版建立 locale 關聯。
- `sitemap.ts` 只列中文 route；JSON-LD 只有單語。

## 影響
| 面向 | 問題 |
|------|------|
| SEO | 英文頁無獨立 URL、無 hreflang、無 per-page metadata；搜尋引擎只看到 zh-TW |
| 效能 | client page 無法 streaming server HTML；首屏內容依賴 hydration |
| UX | 語言閃爍；分享連結無法指定語言 |
| 維運 | 文案分散在 `i18n.ts`、`lib/content/*`、各頁 inline `locale === 'en'` 三處 |

## 方案比較
| 方案 | 內容 | 成本 | 風險 |
|------|------|------|------|
| A. 維持現狀 | 不動 | 0 | SEO/metadata 缺口持續 |
| B. 最小修補 | 每頁拆 server page（export metadata）+ client 內容元件；cookie 儲存 locale，layout 讀 cookie 設 `<html lang>` 與初始 locale | 小（約 1–2 天） | 仍無語言 URL，hreflang 不可行 |
| **C. next-intl（建議）** | `/[locale]/...` 路由（`zh-TW` 預設可省略前綴 `localePrefix: as-needed`）；server component 用 `getTranslations`；messages 由 `i18n.ts` 拆成 `messages/{zh-TW,en}.json`；`proxy.ts` 整合 next-intl middleware（已有 `/secret` 邏輯需合併） | 中大（約 4–6 天） | 所有內部連結要改用 locale-aware `Link`；301 redirects 與 sitemap 需重寫；首頁 GSAP/Hero 為 client，僅需傳 locale prop（已是此設計） |

## 建議
1. **先完成內頁 v2（第 4 步）**，避免改路由結構與視覺重構互相干擾。
2. 之後採 **C**，分三階段：
   1. 抽字典：`lib/i18n.ts` → `messages/*.json`；`lib/content/*` 保持 locale 參數化。
   2. 導入 `[locale]` 路由 + `proxy.ts` 合併；page 改 server component + `generateMetadata`；互動區塊維持 client。
   3. SEO：hreflang、`sitemap` 雙語、`<html lang>` 由 route 決定、blog 中英文用 `baseSlug` 關聯（Velite schema 加欄位）。
3. 若近期無多語 SEO 需求，可退而求其次做 **B**，收益最大的是 per-page metadata 與消除語言閃爍。

## 需要使用者決定
- 預設語言網址：`/` = zh-TW（as-needed）還是 `/zh-TW`？
- 英文站是否需要 SEO 曝光（決定 B 或 C）。
- `/sb` `/sc` 分享頁是否也雙語路由化。
