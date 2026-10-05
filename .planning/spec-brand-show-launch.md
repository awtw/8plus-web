---
title: '工程接案與靈機8動網站入口'
type: 'feature'
created: '2026-10-05T11:03:31+08:00'
status: 'done'
baseline_commit: 'fb187134294cefde3b767900a86bdd7f520d4eb8'
context: ['docs/CONTENT_MODEL.md']
---

<frozen-after-approval>

## Intent

**Problem:** 接案首頁與新版節目尚未形成清楚入口，文章草稿可直連公開。
**Approach:** 依使用者「請開始開發」實作上一輪策略：交付導向首頁、獨立 /show、內容發布邊界。保留現有藍橘品牌，節目採黑米白螢光綠。

## Boundaries & Constraints

**Always:** 中文溝通；沿用 Next/Velite、雙語、Cal.com；保留使用者 reference 與既有未提交研究；節目無媒體時顯示準備中，不假造集數發布或平台連結。
**Ask First:** 需要真實平台帳號、外部投稿收件服務時才取得資料；此次採完整準備中頁面，不做假表單。
**Never:** 不部署、推送、不更動兩個其他專案的既有作品聲明，不虛構客戶成效，不自動發布研究草稿。

## I/O & Edge-Case Matrix

| 情境 | 輸入 | 行為 | 錯誤處理 |
|---|---|---|---|
| 草稿文章 | published false 或未來日期 | 列表、搜尋、feed、sitemap、metadata、直連不公開 | 詳情 404 |
| 節目準備中 | 無已發布 episode | /show 顯示節目定位、S0 題材與規劃 | 不顯示播放／訂閱假按鈕 |
| 已發布節目 | 合法媒體 URL 與發佈日期 | 單集筆記與媒體入口可讀 | 未知 slug 404 |
| 減少動態 | prefers-reduced-motion | 靜態流程，文字與 CTA 可用 | 無 WebGL 依赖 |

</frozen-after-approval>

## Code Map

- `components/home/home-scroll-root.tsx` 首頁順序。
- `components/home/hero/` 新正式流程 Hero，不重寫備案。
- `lib/content/home-sections.ts`、`lib/navigation.ts`、`lib/i18n.ts` 文案與路由。
- `velite.config.ts` 內容 schema。
- `app/(site)/blog/[slug]/page.tsx` 公開邊界。
- `app/sitemap.ts`、`app/feed.xml/route.ts` 索引與 feed。
- `docs/strategy/2026-10-05/` 已讀策略依據。

## Tasks & Acceptance

**Execution:**
- [x] 公開內容共用 helper 與必要回歸測試；串接文章清單、搜尋、直連、metadata、RSS、sitemap，排除未發布與未來日期。
- [x] 新增 Episode schema、公開查詢、/show 與 /show/[slug]、/show/ask 準備說明；無虛構影音，內容有雙語。
- [x] 首頁新 SVG/CSS 流程 Hero，約 4.2 秒一次入場後停止，可重播，reduced-motion 靜態；保留 CTA。
- [x] 首頁案例／服务提前，完整 path 保留內頁，加入文章與節目入口；案例僅使用現有真實資料。
- [x] 更新導航與 footer：節目入口、shuyan 視覺創作定位；保持手機選單與搜尋一致。
- [x] 更新 CONTENT_MODEL 與 STATE，記錄路由、發布方式及尚待媒體資料；build/lint/typecheck 與桌手機檢查。

**Acceptance Criteria:**
- Given 首次訪客，when 看首頁，then 不需操作動畫即可讀主文案、前往案例與預約。
- Given 節目未開播，when 進 /show，then 看到真實準備中狀態、題材與規劃而無失效播放連結。
- Given 舊網址與語言選擇，when 導航，then 既有頁面仍可用且新內容可切英語。
- Given 390px 與 1280px，when 使用新頁面，then 無水平溢出、文字不裁切、操作可鍵盤觸達。

## Spec Change Log

- 2026-10-05（Asia/Taipei）：審查修正 Episode 保護旗標、全域 slug 唯一檢查、sitemap 去重；瀏覽器改讀建置後快照，不依裝置時鐘重新發布判斷。單集操作介面切換語言，正文維持來源語言。保留首頁品牌、準備中狀態與無假影音原則。

## Design Notes

首屏「把 AI 想法，做成團隊真的能用的系統」。右側由需求、資料／權限／驗收到成果的精簡流程，標流程示意而非真實遙測。/show 使用可讀 HTML 標題與 reference 正式封面，禁止使用帳號設定截圖。公開規劃與實際 Episode 資料分開，避免把未錄製企劃當已播集數。

## Verification

- `pnpm build`、`pnpm typecheck`、`pnpm lint`。
- 發布過濾回歸涵蓋草稿、未來、未知與已發布。
- 瀏覽器检查首頁、/show、/show/ask、桌面手機、reduced-motion、語言與連結。

### 驗證結果 2026-10-05 11:18 +08:00

- build、typecheck、發布政策檢查通過；lint 0 errors / 35 warnings（既有警告）。
- 真實 MDX fixture：未發布／未來／protected 文章、未公開專案及 planned 節目不在公開產物；追加 Episode protected／unpublished schema → prepare 檢查與重複 slug 拒絕檢查通過。
- 1280px 桌面、390px 手機觀察完成，無水平溢出；中英導覽、手機選單、節目頁、投稿說明及單集逐字稿展開可用。
- reduced-motion 模擬確認四張流程卡 animation:none、opacity:1；最後一張流程卡文字對比修正為深色。
- 單集以臨時本地 fixture 驗證中文正文＋英文操作字串；測試內容已移除並重新建置，不對外發布。
- 草稿、未來與未知單集 HTTP 404；sitemap 包含節目入口，去除同 URL 的雙語專案重複項。
- 三種獨立審查角色完成，發現的發布旗標、網址唯一性、裝置時間與單集語言問題皆已修正。

## Suggested Review Order

- 先看首頁入口與內容順序。
  [home-scroll-root.tsx:1](../components/home/home-scroll-root.tsx#L1)
- 檢查建置時發布規則與 Episode schema。
  [velite.config.ts:90](../velite.config.ts#L90)
- 檢查節目空狀態及已發布內容的入口。
  [show-page.tsx:1](../components/show/show-page.tsx#L1)
- 檢查一次性流程動畫及手機降級。
  [hero-delivery.tsx:1](../components/home/hero/hero-delivery.tsx#L1)
- 最後看發布政策回歸與內容操作文件。
  [check-publication.mjs:1](../scripts/check-publication.mjs#L1)
  [CONTENT_MODEL.md:1](../docs/CONTENT_MODEL.md#L1)

## Implementation Evidence

- `pnpm check:publication`：已公開、草稿、未來、protected、非法日期、單集狀態、發布時間邊界與未知 slug 通過。
- 曾加入真實 MDX fixture（草稿／未來／protected 文章、未公開雙語 project、planned episode）並執行完整 build；確認 unique sentinel 不在 `.velite`、`.next/static` 或 `.next/server/app`。fixture 已移除，正常內容重新 build。
- typecheck 通過；lint 0 errors / 35 warnings（既有程式）；build 通過。
- 瀏覽器桌面／手機／404 驗收由主代理接續；不標 done。
