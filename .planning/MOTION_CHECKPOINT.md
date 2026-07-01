# Motion 記憶點 — 8plus.app

*LOCKED：2026-06-30 CST*  
*SSOT：`docs/MOTION_DESIGN_SPEC.md`*

---

## 1. 已鎖定決策

| # | 決策 |
|---|------|
| M1 | 參考 [WRK ACF-01](https://www.wrk-timepieces.com/products/acf-01) — scroll pin / scrub / 大標拆字 |
| M2 | 首頁 6 章：Logo → Story → Lab → Projects → Services → Connect |
| M3 | 首頁 Ch1 **精簡**；職涯 timeline **僅 `/path`** |
| M4 | **GSAP + ScrollTrigger** + Framer（進場） |
| M5 | Logo 動效錨定雙圓斜切；技術實作時選最佳 |
| M6 | **全站 dark only** — 移除 ThemeToggle |
| M7 | 文案 **i18n 中英同步** |
| M8 | 假 loading **禁止**；其餘動效可發揮但服務敘事 |
| M9 | 內頁 = 輕量 motion 變體；首頁 = signature 重戲 |

---

## 2. Wave 狀態

| Wave | 內容 | 狀態 |
|------|------|------|
| W0 | Dark DS + 關 light 切換 + GSAP + motion 骨架 | ✅ 2026-06-30 CST |
| W1 | Ch0 + Ch1 prototype | ✅ 2026-06-30 CST |
| W2 | Ch2–Ch5 + i18n | ⏳ |
| W3 | `/path` timeline + 內頁 | ⏳ |
| W4 | a11y + perf | ⏳ |

---

## 3. 回滾規則

每 Wave 獨立 commit；不滿意只 revert 該 wave。

---

## 4. 時間線

| 時間 | 事件 |
|------|------|
| 2026-06-30 CST | Round 1–3 對話完成 |
| 2026-06-30 CST | `MOTION_DESIGN_SPEC.md` LOCKED |
| _2026-06-30 CST_ | W1 Ch0+Ch1 完成 |
| _待定_ | W2 Ch2–Ch5 |
