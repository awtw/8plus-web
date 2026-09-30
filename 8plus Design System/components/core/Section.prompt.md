一句話：交替色場的區塊包裝器——v2 CI 的核心。藍↔橘堆疊即成一頁；每個區塊會把 accent 翻轉成互補色。

```jsx
<Section field="blue">
  <Badge>03 · SERVICES</Badge>
  <h2 className="text-h2">我能提供什麼</h2>
  …卡片…
</Section>
<Section field="orange">…下一章，accent 現在變成藍色…</Section>
<Section field="dark">…全屏媒體章節…</Section>
```

色場：`blue`（預設，技術）、`orange`（交付）、`dark`（`#0A0E1A`，媒體）。內部所有元素都讀 `--bg`／`--accent`——絕不寫死顏色。`noise` 切換柔光噪點紋理。區段節奏與 1440px 容器已內建。
