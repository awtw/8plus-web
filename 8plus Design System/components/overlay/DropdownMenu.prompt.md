一句話：下拉選單（Radix menu 的外觀重現）——8plus 的語言切換與小型動作選單。

```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="secondary" size="sm">繁中 ▾</Button></DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Language</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>繁體中文</DropdownMenuItem>
    <DropdownMenuItem>English</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

對齊：`start`（預設）、`center`、`end`。點擊外部或選項時關閉。
