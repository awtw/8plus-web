一句話：8plus 的玻璃卡片（v2 CI）——半透明白色表面、22px 簽名圓角，疊在藍／橘區塊色場上。

```jsx
<Card>
  <CardHeader>
    <CardTitle>程式架構諮詢</CardTitle>
    <CardDescription>系統邊界、技術選型、可擴展與可維護的架構設計。</CardDescription>
  </CardHeader>
</Card>

<Card variant="highlight">…hover 上浮 ＋ 漸層細線框…</Card>
```

變體：`default`、`strong`（更濃的玻璃）、`highlight`（加上 `gradient-border-card`——hover 時上浮 2px、浮現漸層細線框）。組成部件：`CardHeader / CardTitle / CardDescription / CardContent / CardFooter`，內距 24px。卡片必須放在 `.bg-blue`／`.bg-orange`／`.bg-dark` 色場上，玻璃才有顏色可透。圓角一律 22px——絕不用 `rounded-2xl`（16px）。
