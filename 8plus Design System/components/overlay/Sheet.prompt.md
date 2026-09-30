一句話：側邊抽屜覆蓋層（Radix sheet 的外觀重現）；8plus 行動版選單就住在右側抽屜裡。

```jsx
<Sheet>
  <SheetTrigger asChild><Button variant="ghost" size="icon">≡</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>8plus</SheetTitle>
      <SheetDescription>選單</SheetDescription>
    </SheetHeader>
    …導覽連結…
  </SheetContent>
</Sheet>
```

方向：`right`（預設）、`left`、`top`、`bottom`。覆蓋層暗化為 60% 深夜色 ＋ 模糊；可透過 ✕、覆蓋層或 `<SheetClose>` 關閉。相對於最近的定位祖先做絕對定位，所以外框要給 `position: relative`。
