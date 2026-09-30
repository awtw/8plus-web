---
scope: "8plus_web 首頁與共用網站殼層的 v2 CI 設計收斂"
purpose: "讓現行程式碼直接採用 8plus Design System，供企業決策者、技術主管與潛在顧問客戶瀏覽"
altitude: "feature"
created: "2026-07-13 13:15 CST"
---

- 2026-07-13 13:15 CST | event | Fast path 啟動；主要交付為正式網站程式碼、驗證與 STATE 紀錄，Architecture Spine 僅作一致性契約。
- 2026-07-13 13:15 CST | constraint | 保留 Next.js、Velite、雙語內容模型、既有路由與可用互動，不進行 greenfield 重寫。
- 2026-07-13 13:15 CST | constraint | `8plus Design System/` 是使用者提供且未追蹤的唯讀設計來源；不得覆寫來源資料夾。
- 2026-07-13 13:15 CST | decision | 全站採 Saturated Editorial Fields：藍、橘、深夜三種 token 色場交替，所有下游元件只讀語意 token，避免頁面寫死不同品牌色。
- 2026-07-13 13:15 CST | decision | Hero 採單一 deterministic Logo Assembly signature，移除隨機主視覺與訪客可見的設計選型器，避免每次載入呈現不同品牌識別。
- 2026-07-13 13:15 CST | decision | typography 固定為 Georgia display、Outfit body、JetBrains Mono eyebrow；主卡片固定 22px 圓角，深度以細線環為主。
- 2026-07-13 13:15 CST | decision | 版面責任分成 tokens → shell/components → homepage sections；內容仍由 `lib/content/home-sections.ts` 單一擁有。
- 2026-07-13 13:15 CST | decision | 每頁最多一個 signature motion，所有其他互動使用短暫 transition，且必須支援 `prefers-reduced-motion`。
- 2026-07-13 13:15 CST | version | 依現有 package.json reality-check：Next.js 16.2.9、React 19.2.7、TypeScript 5.4.5、Tailwind CSS 3.4.7、GSAP 3.15.0。
- 2026-07-13 13:15 CST | assumption | 本輪優先修改首頁與 header/footer 共用殼層；既有內容頁透過全域 token 與共用元件同步受益，逐頁內容重排延後至後續波次。

