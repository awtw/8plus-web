---
title: 'Hero 互動神經場與品牌粒子聚合'
type: feature
created: '2026-10-05T13:30:00+08:00'
status: done
baseline_commit: d34e6c909a84bf068b9d6510ab96cf0879cc066c
context: []
---

<frozen-after-approval reason="使用者已確認上輪提案並要求開始修正">
## Intent
透明層板組裝偏硬體示意，缺乏 AI 處理資訊的動態與品牌記憶。將首頁右側改為有空間深度的粒子神經場：散點聚合成現有 8plus 幾何符號，持續呈現低頻訊號與局部游標回應。維持左側主標、說明及 CTA 立即可用。

## Boundaries & Constraints
Always: 使用既有藍橘與品牌符號比例；中文英文控制；鍵盤與觸控可操作；響應式；暫停、離屏與分頁隱藏停止；reduced-motion 靜態完整構圖；Canvas 無法取得 context 時有靜態 SVG 備援。自製視覺，不引入外部素材或依賴。
Ask First: 部署、付費服務、修改品牌 Logo 或首頁文案。
Never: 假 AI 即時數據、載入動畫阻擋內容、scroll hijacking、移除現有作品與預約入口、修改其他首頁區塊。
</frozen-after-approval>

## Code Map
- `components/home/hero/hero-delivery.tsx`：Hero 容器與既有文案、CTA。
- `components/home/hero/delivery-scene.tsx`：替換現有 SVG 層板與互動狀態。
- `styles/pages/home-delivery.css`：調整 Hero 場景樣式，保留 Notes 所有規則。
- `components/logo.tsx`：品牌幾何來源（兩圓與斜槓），只讀。

## Tasks & Acceptance
- [x] `components/home/hero/delivery-scene.tsx`：建立可重播的粒子聚合、品牌主體、細緻網路訊號、游標擾動，靜態備援與完整生命週期清理。
- [x] `styles/pages/home-delivery.css`：大尺度無卡框場景、藍白粒子與橘色焦點、低調控制列；移除不再使用的層板動畫。
- [x] `docs/CONTENT_MODEL.md`、`.planning/STATE.md`：同步現況與驗證紀錄，皆含時間戳。
- [x] 建置、型別、lint、瀏覽器桌機/手機/中英文/控制/reduced-motion 驗證。

Acceptance:
- Given 桌機首頁，when 首次進場，then 標題與 CTA 立即可用，右側粒子約三秒內聚合為品牌符號，後續有克制的資料流。
- Given 游標進入場景，when 移動，then 近處粒子與連線回應，移開後回復，不攔截頁面捲動。
- Given 暫停或隱藏分頁或離屏，when 等待，then 動畫時間停止；恢復後不產生時間跳躍。
- Given reduced-motion 或無 Canvas context，when 顯示首頁，then 靜態品牌構圖存在，CTA 可用。
- Given 390px 與英文，when 顯示或操作控制，then 無水平溢出、文字截斷或 hover 才能操作的核心功能。

## Design Notes
參考 Four 的節點與資料流概念，品牌符號取本專案幾何。使用 Canvas 2D 投影三維點雲即可達成此次效果，避免為單一場景恢復已移除的 Three.js。粒子數與 DPR 需有上限；連線使用少量固定鄰接或抽樣，不做全量平方碰撞。入場到待機、互動與重播必須一致，暫停不清空畫面。SVG 備援先出現，Canvas 第一幀成功後接替。

## Verification
`pnpm build`、`pnpm typecheck`、`pnpm lint`、`git diff --check`；瀏覽器確認新啟動的 production build，避免使用既有 3000 埠舊服務作為驗證。桌機與手機截圖、控制按鈕、減少動態與英文；此純視覺更動不新增與實作鏡像的單元測試。

## Spec Change Log
2026-10-05 13:30 +08:00：依使用者「請開始修正」承接上一輪已提出的動畫方向；工作區原有變更僅本聊天的 STATE 分析紀錄，保留並繼續。

2026-10-05 13:38 +08:00：三方審查完成。patch：跨 450px 重新生成粒子配置；contextlost 顯示 SVG、contextrestored 重設尺寸與 DPR。保持原有底部敘述。驗證：pnpm build（39 pages）、typecheck 通過，lint 0 errors／35 既有 warnings，改動檔 ESLint 通過。1280px／390px 中英文無橫向溢出；暫停與 reduced-motion 的 PNG 畫面比對完全一致；contextlost/restored 以瀏覽器事件模擬，確認 data-ready false/true 與 SVG visibility 切換；瀏覽器無 error。低階實機幀率未量測。

## Suggested Review Order

- 查看品牌場景、靜態備援與操作控制。
  [delivery-scene.tsx:7](../components/home/hero/delivery-scene.tsx#L7)
- 查看粒子構圖、投影與有限連線成本。
  [neural-field.ts:8](../lib/visuals/neural-field.ts#L8)
- 查看深色無框視覺與手機排版。
  [home-delivery.css:1](../styles/pages/home-delivery.css#L1)
- 查看現行 Hero 內容契約。
  [CONTENT_MODEL.md:64](../docs/CONTENT_MODEL.md#L64)
