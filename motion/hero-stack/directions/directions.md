# 首頁主視覺動畫 · 第二輪三個方向（2026-10-29 +0800）

第一輪（系統圖、對焦框形變、3D 分解堆疊）使用者不喜歡，已移到 `v1/`。

這一輪參考 2026 年的趨勢：以字體為主角的主視覺、用動態說明概念而不是裝飾、整體更克制，重度 WebGL/3D 正在退燒。
共同條件：1080×1080、18 秒無縫循環、靜音、可以暫停。
畫面上的文字全部取自 Transcript Plus 的真實架構：React 19 + Tauri 2 → Python 3.12 sidecar → SQLite → job queue → faster-whisper / Breeze ASR。

## A · Prompt → App（Agentic 建構）
- language: cursor-demo + bento · 參考：v0、Lovable、Cursor 的 agent 介面
- 畫面：米白底。上方的輸入框打出一句需求，左邊是 agent 的執行清單，七層依序打勾；右邊的 bento 拼貼跟著一格一格長出真實產品，最後組成完整應用，收在 8plus logo。
- Feel：前 2 秒打字、送出，接著每約 2 秒完成一層；Agent 那層的循環是整段的爆點。
- Risk：資訊量最多，縮成小尺寸時細字讀不到，靠節奏撐場。

## B · Kinetic Type（字體主角）
- language: kinetic-type · 參考：Linear、Vercel 首頁的超大字體主視覺
- 畫面：米白底，一次只有一個超大字。每一層出現後被劃掉、縮到上方堆疊，下一個字接著砸進來；目前這層用淡綠色膠囊標出。最後是「AI Apps」，再收成首頁標語。
- Feel：一拍一個字，節奏感最強，靜音也看得懂；製作最乾淨，檔案也最小。
- Risk：沒有作品截圖，比較像在講概念，不是在秀作品。

## C · Liquid Glass（液態玻璃）
- language: liquid-glass + generative-field · 參考：Apple Liquid Glass、visionOS
- 畫面：墨黑底，配品牌淡綠和鼠尾草綠的柔和光暈，加上細顆粒雜訊。七顆玻璃膠囊從四周依序飄入，沿虛線匯流進中央的玻璃卡片；卡片裡浮現「Built to be used.」和三個真實作品。
- Feel：最有質感、最高級。每顆膠囊入場時有一拍，匯流的那一刻是高潮。
- Risk：毛玻璃效果吃效能，所以輸出成影片而不是即時渲染，網頁端沒有負擔。
