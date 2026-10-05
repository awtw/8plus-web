---
title: '8plus 訊號成形 Hero'
type: feature
created: '2026-10-05T14:55:00+08:00'
status: done
baseline_commit: dcc33410df6cb522b53764d8d5614aad46edea50
context: []
---
<frozen-after-approval reason="使用者已接受訊號成形提案並要求修正">
## Intent
將 /hero-preview 的 A/B 雕塑比較改成單一完整首屏「訊號成形」。既有 ASCII 像孤立機櫃，文字與視覺割裂。以超大 8plus 字樣、全幅藍白路徑、橘色訊號，呈現分散到有序的生成過程，接近 Four 的整體排版張力。
## Boundaries & Constraints
Always: 中文解說英文程式碼；同一首頁雙語文案與真實 booking/lab CTA；文案立即可讀；4–5 秒形成後緩慢流動，游標僅局部牽引線條；文字與按鈕不跟隨游標。維持 noindex、不列 sitemap。手機、鍵盤與 reduced-motion 可用。
Ask First: 部署或正式首頁替換。
Never: 孤立右側 3D 雕塑、ASCII 字元雨、粒子拼 Logo、假數據、等待動畫才顯示文案、修改其他頁面。
</frozen-after-approval>
## Code Map
- components/home/hero/hero-direction-preview.tsx：重寫預覽整屏排版及控制。
- styles/pages/hero-direction-preview.css：改為全幅構圖與大字、手機排版。
- lib/visuals/hero-signal-renderer.ts：新 Canvas2D 曲線訊號場與生命週期。
- app/(site)/hero-preview/page.tsx：更新 metadata。
- lib/visuals/hero-direction-renderer.ts：舊引擎取消引用，保留歷史檔。
## Tasks & Acceptance
- [x] 預覽頁改單一設計：左上小型章節標記、右上主標/說明/CTA，下半部巨大 8plus 字樣。全幅動態背景貫穿，刪除 A/B tabs、座標標籤與概念比較說明。
- [x] 新 renderer：少量清晰曲線（約 14–22 條），路徑由散開逐步成有秩序斜向束流；橘色訊號穿越後維持慢流動。不要密集小點或網狀科技背景。線條跨整個屏幕，斜向呼應 logo。偏霧藍、冰白與一條橘色，避免大面積發光霧。
- [x] 播放/重播、可見焦點、離屏/隱藏停止、resize DPR 上限、reduced 靜態完成態、Canvas 不可用或 contextlost 時 SVG 線條備援。清理 observer/listener/RAF。
- [x] 更新狀態與內容模型，包含時間戳。
- [x] build/typecheck/lint 與桌面手機/雙語/控制/減少動態驗證。
Acceptance:
- Given 首次開啟，when 第一幀顯示，then 主標與 CTA 可讀，8plus 字樣是畫面視覺主體，沒有獨立雕塑。
- Given 正常動態，when 過 5 秒，then 路徑從分散收束為秩序，之後低頻流動；游標只影響近處曲線。
- Given 暫停/hidden/offscreen，when 時間經過，then 動畫不推進且恢復不跳時。
- Given 390px 或英文，when 瀏覽，then 品牌字與按鈕完整、無橫向溢出。
- Given reduced-motion/Canvas 失效，when 瀏覽，then 完整靜態構圖與真實 CTA 可用。
## Design Notes
品牌字使用實際文字，不製作新的假 logo。大字約佔首屏寬度 90%，字重 600–700、緊字距；品牌字可為清晰白色實體，背景曲線可穿越字縫但不可犧牲主標可讀性。首屏約 800–900px 桌面，手機減少間距讓品牌出現在第一屏。Canvas 可採樣三次貝茲曲線或連續樣條，每條 60–90 點，單橘色脈衝帶淡尾。無新依賴。正式首頁保持既有版本，交付此預覽。
## Verification
pnpm build、pnpm typecheck、pnpm lint、git diff --check；瀏覽器 1280/390px 中英、重播暫停、reduced 與備援。真實手機 GPU 不在此次模擬驗證範圍。
## Spec Change Log
2026-10-05：使用者接受重新研究後的大字品牌與全幅訊號方案，直接執行已授權修正，無需再次批准。

## 驗證與審查結果
2026-10-05 15:04 +08:00：pnpm build/typecheck 通過，全站 lint 0 errors／35 既有 warnings，targeted eslint 無警告。首次 build 碰到既有 Google 字型 Turbopack 解析錯誤，重跑通過。1280px／390px 中英、鍵盤重播與控制通過；暫停及 reduced-motion 完整截圖像素一致；contextlost/contextrestored 合成事件確認 SVG 備援與 ready 恢復，未模擬真實裝置驅動故障。hidden/offscreen 經生命週期程式審查，未測真實手機效能。
三方審查重複指出進度 Math.round 提前進入末區間導致無完成回報，分類 patch，改 Math.floor 並在瀏覽器確認「持續流動」。視覺修正大字行高與手機字級，避免 p 下緣碰到底線。未新增依賴，未修改正式首頁。story_key 未設定，略過 sprint sync。

## Suggested Review Order

- 先看全幅品牌構圖與固定文案。
  [hero-direction-preview.tsx:18](../components/home/hero/hero-direction-preview.tsx#L18)
- 曲線生成、橘色訊號與動態生命週期。
  [hero-signal-renderer.ts:10](../lib/visuals/hero-signal-renderer.ts#L10)
- 大字尺度與手機完整顯示。
  [hero-direction-preview.css:1](../styles/pages/hero-direction-preview.css#L1)
- 更新預覽名稱並保留搜尋排除。
  [page.tsx:4](../app/(site)/hero-preview/page.tsx#L4)
