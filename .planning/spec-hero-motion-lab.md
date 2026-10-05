---
title: '十種近期參考的 8plus Hero 測試台'
type: feature
created: '2026-10-05T15:12:00+08:00'
status: done
baseline_commit: 2a1415d6b665cd254bd3c446b0110570fe8c6dc5
context: []
---
<frozen-after-approval reason="使用者明確要求找十個近期範例並轉成可測試版本">
## Intent
使用者否決前兩輪單方向視覺，要求十個現在熱門的例子並轉為可測版本。建立 /hero-lab，10 個來源明確、互動與構圖有實質差異的 8plus Hero 原型；不是僅列連結，也不是同一動畫改色。熱門以 2026 作者案例／獎項曝光為代理，無流量排名證據，頁面明示非熱度排行榜。
## Boundaries & Constraints
Always: 中文介面（主文案隨既有中英locale）、原創本地實作、既有文案與 booking/lab CTA、每版來源/日期/原機制/8plus轉化/操作提示。桌機手機皆可操作；暫停、重播、reduced靜態、hidden/offscreen停止。一次僅一個動態場景。URL可保存選定方向。
Ask First: 正式首頁替換、部署、付費資產。
Never: 假造熱門排行或真實AI推論、載入第三方原站iframe冒充實作、複製外站品牌資產、改變正式首頁與既有預覽、十版只有色彩差異。
</frozen-after-approval>
## Code Map
- app/(site)/hero-lab/page.tsx：新 noindex 路由，sitemap不新增。
- lib/content/hero-motion-studies.ts：十筆來源與轉化資料。
- components/home/hero/hero-motion-lab.tsx：測試台、切換、controls、來源說明。
- components/home/hero/hero-motion-scenes.tsx：十種不同場景及共用生命週期。
- styles/pages/hero-motion-lab.css：原型布局與行動版。
- docs/design/hero-motion-references-2026-10-05.md：研究依據與測試結果。
## Tasks & Acceptance
- [x] 十個作者來源核實並保留日期與直連，研究和轉化清楚區分。
- [x] 十個實際動態：01 Vivid 像素揭露；02 House of Yellow 字體/框架變形；03 Dash 磁性排列；04 MERSI 分割滑動；05 4WIDE 折射/模糊；06 Podium 游標材質痕跡；07 Digital Stamps 放大檢視；08 Pell Mell 編輯式卡片揭露；09 Oryzo 產品式分解展示；10 Bruno 空間式工作導覽。每版至少一個可操作的控制（pointer/range/click/keyboard）。可為原機制的輕量設計轉譯，不冒充同等3D製作品質。
- [x] 品牌文案及真實CTA、完整來源資訊、上一版/下一版與編號選擇；暫停重播、URL mode、安全退回合法預設。保留候選喜好可選但非必要。
- [x] 響應式、無Canvas/WebGL依賴也可讀；prefers-reduced-motion／hidden／offscreen不持續動畫；舊場景卸載清理。構圖至少四種（中心/分割/全幅/作品編排），可用深藍、墨黑、米白配色探索，避免強迫每版都是右側雕塑。
- [x] build/typecheck/lint、十版切換、手機溢出、reduced與暫停、URL恢復、來源連結核對，更新STATE/CONTENT_MODEL與紀錄。
Acceptance:
- Given頁面，when選1到10，then十版各有不同可辨識的圖像與行為、對应來源和操作提示。
- Given任何版，when操作按鈕或slider與游標，then視覺確實改變；CTA保持可用且主文案不等待動畫。
- Given模式URL，whenreload或輸入不合法mode，then還原合法選定版或預設1。
- Given暫停/reduced/hidden/offscreen，when等待，then場景不持續運動且恢復不跳時。
- Given390px英文/中文，when各版切換，then無橫向溢出、控制可觸控。
## Design Notes
借用互動原理，自行重繪成8plus。優先DOM/SVG/CSS和原生Canvas，無新套件。研究日期2026-10-05，不將文章發布日當網站上線日。以高品質單一舞台+緊湊選擇列呈現，完整十張選擇可見或滑動，不同場景不是小icon。主標可依模式排版但內容相同；測試說明在舞台外，示意介面標記「互動示意」不得捏造客戶數據。
## Verification
pnpm build/typecheck/lint、git diff --check；瀏覽器1280/390十版逐個、模式操作、播放/靜態與URL檢查，保存代表截圖。
## Spec Change Log
2026-10-05 15:12 +08:00：依使用者十版測試明確授權執行，延續目前工作分支；正式頁面不受影響。

## Validation & Review — 2026-10-05 15:38 +08:00
- 三方獨立審查合併三個 patch：SVG 筆觸座標、透鏡實際取樣、作品編號按鈕，皆修正。瀏覽器另發現絕對定位繼承 grid-column 造成空畫布、淺底標題對比與手機作品重疊，已修正。
- 1280px 十版可見；390px 中英十版無水平溢出；每版主要控制均改變畫面。暫停與 reduced 動態 DOM 穩定，mode reload 還原、非法 mode 回第一版。
- build/typecheck 通過，lint 0 errors / 35 既有 warnings，新增檔案無警告。hidden/offscreen 清理以共用 clock 代碼審查確認；非真機效能基準。
- 輕量概念原型不等同原站完整 WebGL／3D 製作，正式首頁尚未更換。

## Suggested Review Order

- 從測試台理解十版切換與操作
  [hero-motion-lab.tsx:25](../components/home/hero/hero-motion-lab.tsx#L25)
- 檢查生命週期及各版互動
  [hero-motion-scenes.tsx:13](../components/home/hero/hero-motion-scenes.tsx#L13)
- 核對參考來源與原創轉譯
  [hero-motion-studies.ts:1](../lib/content/hero-motion-studies.ts#L1)
- 檢查桌機與手機排版隔離
  [hero-motion-lab.css:1](../styles/pages/hero-motion-lab.css#L1)
- 核對路由索引限制
  [page.tsx:1](../app/(site)/hero-lab/page.tsx#L1)
