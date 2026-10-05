---
title: 首頁作品集補滿四格
type: bugfix
created: '2026-10-05T12:54:00+08:00'
status: done
route: one-shot
---

# 首頁作品集補滿四格

## Intent
**Problem:** 首頁固定顯示三筆作品，桌機雙欄第二列留空。
**Approach:** 上限改為四筆，沿用 featured 排序、中英資料與手機橫向捲動。第四筆為 1914 品牌官網。

2026-10-05 12:54 +08:00：pnpm build 通過；瀏覽器確認 4 個 li、兩組相同 y 座標的兩欄；雙語資料與縮圖存在。獨立審查無明確回歸。

## Suggested Review Order
- 精選上限配合桌機雙欄形成完整兩列。
  [section-lab.tsx:23](../components/home/sections/section-lab.tsx#L23)
