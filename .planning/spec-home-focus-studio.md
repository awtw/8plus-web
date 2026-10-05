---
title: '首頁採用對焦工作室'
type: feature
created: '2026-10-05T15:43:00+08:00'
status: done
baseline_commit: 5cba278438d06dbff1767c7aeb2e9a2caa806f3e
context: []
---
<frozen-after-approval reason="使用者已從十版中決定採用對焦工作室">
## Intent
正式首頁採用 /hero-lab 的 05 對焦工作室：墨黑背景、真實作品拼貼、模糊與清晰切換、淡綠取景框及 What if?/Clarity. 視覺。保留已選定方向，移除首頁的粒子 Hero 掛載。
## Boundaries & Constraints
Always: 既有中英主文案與 booking/lab CTA、home-section-hero 錨點、手機可操作、鍵盤對焦按鈕、暫停、reduced 靜態清晰、離屏隱藏停止；CSS 隔離；所有作品圖為現有本地檔案。
Ask First: 部署、推送遠端。
Never: 在正式首頁顯示研究切換台、來源說明、假AI推論；引入十版完整實作；改變其他首頁段落；刪除比較頁。
</frozen-after-approval>
## Code Map
- components/home/home-scroll-root.tsx: 首頁 Hero 掛載。
- components/home/hero/hero-focus-studio.tsx: 獨立正式版本，沿用已選方向。
- styles/pages/home-focus-studio.css: scoped 版面、拼貼、對焦轉場和手機。
- components/home/hero/hero-motion-scenes.tsx: 05 視覺參考，不導入整包。
- .planning/STATE.md / docs/CONTENT_MODEL.md: 最終更新由主代理處理。
## Tasks & Acceptance
- [x] 新增獨立 Hero 及樣式，替換 HomeScrollRoot import/render。
- [x] 保留拼貼構圖，焦點切換時清晰並放慢/停止浮動，使用 CSS animation 而非每幀 React state；按鈕可鍵盤觸控，暫停凍結動畫，reduced 無持續運動。
- [x] 更新紀錄、build/typecheck/target lint 與瀏覽器驗證。
- Given 首頁 when 讀取 then 新 Hero 可見、主文案/CTA 立即可讀，單一 h1 與原錨點正常。
- Given 中文或英文 when 390px then 無橫向溢出且拼貼、對焦按鈕可見可操作。
- Given 暫停或 reduced when 等待 then 圖像不持續漂移；reduced 預設清晰，手動模式切換不過渡。
- Given 捲出或隱藏 when 回到 Hero then 動畫恢復、不跳時；監聽器卸載清理。
## Design Notes
沿用05的墨黑、淡綠取景框，正式首頁不出現 prototype/study 字樣。裝飾圖不可遮住文字及 CTA。靜態首屏就能辨認作品，不用等載入動畫才能看到文案。保留實際選定的 default 模糊（5px以內），用明確聚焦按鈕切换。
## Verification
pnpm build、pnpm typecheck、改動檔 eslint；桌機與手機中英檢查對焦前後、暫停與 reduced、主CTA錨點。
## Spec Change Log
2026-10-05T15:43:00+08:00：使用者決定採用05，依既有明確授權直接實作。

## Verification Result — 2026-10-05 15:49 +0800
Build、typecheck、target ESLint 通過。三方獨立審查無具體缺陷。桌機1280與手機390中英無溢出；對焦停止漂移、暫停前後computed transforms穩定、reduced初始blur(0)且animation:none；圖片全數載入、首頁單一h1、作品CTA錨點正確。隱藏分頁行為以監聽器與CSS審查確認，未進行真機效能量測。

## Suggested Review Order

- 首頁採用已選方向
  [home-scroll-root.tsx:6](../components/home/home-scroll-root.tsx#L6)
- 對焦控制與生命週期
  [hero-focus-studio.tsx:24](../components/home/hero/hero-focus-studio.tsx#L24)
- 隔離視覺與手機構圖
  [home-focus-studio.css:1](../styles/pages/home-focus-studio.css#L1)
