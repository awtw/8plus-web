---
title: 'Hero A/B 藝術方向動態原型'
type: feature
created: '2026-10-05T14:38:00+08:00'
status: done
baseline_commit: 37713aa854051d93d1bfc849eea2e240086ae38b
context: []
---

<frozen-after-approval reason="使用者確認上一輪 A/B 6–8 秒動態草稿提案並要求開始">
## Intent
使用者仍不滿意粒子 Logo，欲比較真正不同的藝術方向。建立獨立 `/hero-preview`，A 有機數位材質、B 字元生成結構，共用主標、說明、CTA、配色與尺寸，讓使用者看過動態再決定正式首頁方向。

## Boundaries & Constraints
Always: 現有中英文主文案、藍橘品牌；桌機及手機可切換 A/B；約 8 秒敘事可重播與暫停；reduced-motion 靜態；離屏與隱藏停止；渲染失敗有自製 SVG 備援。正式首頁保持現況。獨立預覽標示概念稿、不列入 sitemap 並 noindex。
Ask First: 正式首頁替換、部署、付費資產或服務。
Never: 繼續使用粒子 Logo 當新方案、假運算數據、阻擋文案的載入流程、修改 Notes 或內容模型發布規則、複製參考素材。
</frozen-after-approval>

## Code Map
- `app/(site)/hero-preview/page.tsx`：新預覽路由及 noindex metadata。
- `components/home/hero/hero-direction-preview.tsx`：共用文案、A/B tabs、播放控制與方案說明。
- `lib/visuals/hero-direction-renderer.ts`：兩方向原創 WebGL 材質、字元生成與互動渲染。
- `styles/pages/hero-direction-preview.css`：獨立預覽排版與響應式。
- `lib/content/home-sections.ts`：既有首頁文案來源，只讀。

## Tasks & Acceptance
- [x] 渲染引擎：A 為高對比有厚度的連續有機結構，橘色內部亮帶、表面法線光照、明確前後遮擋，會對游標回應；B 為可辨識立體結構，字元材質與掃描揭露表面交替，不做數字雨或微小散點。
- [x] 比較頁：相同文案、尺寸與背景，切換時重播；呈現 A/B 名稱、當前敘事阶段、暫停與重播、各方向適用重點。預設 B。
- [x] 備援與生命週期：暫停、reduced、hidden、offscreen、resize、context loss / restore 與 unmount cleanup；同時間僅一個 renderer。
- [x] 更新 STATE 與 CONTENT_MODEL 的预覽路由紀錄，含時間戳，不宣稱已定案。
- [x] build/typecheck/lint、桌機手機兩模式、中英文、鍵盤與控制驗證及截图。

Acceptance:
- Given 預覽頁，when 進入與切換 A/B，then 相同文案與 CTA 立即可讀，兩模式有明顯材質差異。
- Given 一個 8 秒片段，when 自動播放，then 能辨識生成、成形、回應節奏；結束後維持低頻運作，可重播。
- Given 暫停／離屏／隱藏，when 經過時間，then 動畫進度不變，恢復不跳時。
- Given reduced-motion 或無 WebGL，when 顯示，then 有完整構圖与可用文案、A/B 選擇。
- Given 390px 與英文，when 切換與操作，then 沒有水平溢出或被切掉的控制。
- Given 首頁，when 開啟，then 既有 Hero 不受原型影響。

## Design Notes
本轮先檢驗藝術方向，不先限制為 Canvas 2D。可使用原生 WebGL shader 實現具體光照與遮擋的有機結構，B 使用字元 atlas 與低解析度場景取樣。禁止外部網路資產與未確認套件。以較大的實體輪廓、可見材質變化和有效互動矯正上一版太淡與缺少敘事的问题。若用 raymarch，限制步數與解析度，手機降載。

## Verification
`pnpm build`、`pnpm typecheck`、`pnpm lint`、`git diff --check`；1280px/390px A/B、英文、reduced-motion、播放控制与 renderer fallback。新 production 預覽避免使用先前舊埠服務。

## Spec Change Log
2026-10-05 14:38 +08:00：承接明確 A/B 原型提案，工作區仅上一輪研究 STATE 更新，繼續保留。

## 驗收結果與審查
2026-10-05 14:48 +08:00：build、typecheck 通過；全站 lint 0 errors／35 既有 warnings，新檔 targeted lint 零警告。1280px／390px 中英文無水平溢出，A/B 切換、鍵盤重播、暫停完整截圖像素一致；reduced-motion 切換顯示靜態且控制停用。實際 WEBGL_lose_context 測試顯示 SVG 備援，restore 後 ready 恢復。主控台沒有 error。離屏／背景分頁停止經生命週期程式審查確認，未做真實手機 GPU 效能測量。

三方審查：Acceptance 未發現功能偏差；Edge 的 buffer/texture 配置失敗為 patch，已加入 null 檢查。Blind 的 context 配額疑慮為預防性 patch，卸載時主動 loseContext；另修正 context 遺失期间偏好變更不能誤報 ready。無 intent gap 或延期項目。未配置 story_key，略過 sprint sync。

## Suggested Review Order

- 相同文案、方向切換與播放控制。
  [hero-direction-preview.tsx:57](../components/home/hero/hero-direction-preview.tsx#L57)
- 原創材質、生成節奏及 GPU 生命週期。
  [hero-direction-renderer.ts:21](../lib/visuals/hero-direction-renderer.ts#L21)
- 響應式構圖與可見焦點。
  [hero-direction-preview.css:1](../styles/pages/hero-direction-preview.css#L1)
- 預覽入口與搜尋引擎排除。
  [page.tsx:1](../app/(site)/hero-preview/page.tsx#L1)
