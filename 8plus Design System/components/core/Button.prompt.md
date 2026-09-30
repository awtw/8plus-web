一句話：8plus 的藥丸按鈕（v2 CI）——`primary` 為白色填底、hover 時翻轉成 accent 色；會自動吃當前區塊色場的顏色。

```jsx
<Button>預約諮詢</Button>
<Button variant="secondary" size="lg">了解服務</Button>
<Button variant="ghost" size="icon">→</Button>
<Button variant="link">閱讀完整故事</Button>
```

變體：`primary`（白底 → hover 轉 accent）、`secondary`（透明底 ＋ 白色細線框）、`ghost`、`link`（accent 底線）。尺寸：`sm` 36／`default` 44／`lg` 52／`icon`。規則：一個畫面最多 **兩個** 主要 CTA。不要寫死顏色——按鈕會從當前 `.bg-blue`／`.bg-orange` 色場讀取 `--fg`／`--bg`／`--accent`。
