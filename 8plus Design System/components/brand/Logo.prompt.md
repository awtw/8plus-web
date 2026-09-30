一句話：8plus 抽象標誌（小圓 · 粗斜切 · 大圓）——品牌識別藝術，絕不重繪。在 CI 色場上為白色。

```jsx
<Logo size={32} />                 // 白色標誌，透明底
<Logo size={28} wordmark />        // 標誌 ＋「8plus」字標
<Logo variant="brand" size={48} /> // 白色標誌 ＋ 克萊因藍圓角底磚（App icon）
```

變體：`default`／`mono`／`light`（白色標誌）、`brand`（克萊因藍底磚上的白標誌）、`favicon`（當前色場上的標誌）。字標為小寫「8plus」，Outfit semibold，緊字距。語意：兩個系統的接合 ＋ 架構張力。實際 SVG／PNG 變體存於 `assets/`。
