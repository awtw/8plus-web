# 8plus Theme Routing & Token Refactor Log

- 紀錄時間：2026-06-26 15:08 Asia/Taipei
- 目的：把整站的設計切換改成路由可控、隱藏式入口，並讓三套設計語言在全站共用同一組 theme token 與 dark mode 規則。

## 目前已完成

1. 全站加入 `DesignModeProvider`，設計模式會同步到網址上的 `theme` 參數。
2. 原本可見的 design selector 已移除，改成在 logo 上長按才會打開 theme popup。
3. 手機側欄的關閉 `X` 已取消，避免遮住 logo。
4. 全站共用樣式已改成更依賴 token，減少白底寫死色彩。
5. 三套 theme 的 token 已重新拉開，讓 Cohere、Apple、ElevenLabs 的語氣更明顯分離。
6. `share` 頁面已改為跟隨全站 theme provider，不再只靠頁面內部切換。

## 路由規則

- 目前 canonical query 參數：`?theme=classic|paper|studio`
- 內部 mode 對應：
  - `classic` -> `cohere`
  - `paper` -> `apple`
  - `studio` -> `elevenlabs`

## 後續可再補

1. 把更多共享元件改成完全 token-driven，減少頁面內的硬編碼色彩。
2. 再掃一次 `path`、`share`、`booking` 的暗色模式細節，確認白底卡片的文字對比都足夠。
3. 若需要更強的路由語意，可再把 `theme` query 收斂成更明確的 URL 導向方案。
