# Hero 首頁主視覺 — Editorial Print（白底編輯誌）

*建立：2026-07-06 12:27 CST*
*作者：Sally · UX Designer*
*前提：使用者要求 **排除 design-lab 內所有方向**（R5 三支、20 款牆、D01–D15、mesh-snap、blue-hand、square-bridge、line-compose、wire-weave、scan-build、handshake Lab…全部不沿用）*
*依據：`docs/CI_IDENTITY_SPEC.md`、`CI_CHECKPOINT.md`（L1/L5/L6 保留決策）、`research/domain-ai-tech-hero-visual-research-2026-07-06.md` 七鐵律*
*狀態：DRAFT — 已接 `section-hero.tsx`；待使用者驗收*

---

## 1. 為什麼是這條路

所有 design-lab 方向共同點：**黑底 + 動畫主導**。排除它們後，反向切入：

1. **白底印刷編輯誌** — `handshake.png` 原生就是白底半調印刷質感（自帶 `trust001` HUD 標記），放在紙面上是「本來的樣子」，不需要任何 lab 式加工。
2. **呼應保留決策** — CI_CHECKPOINT L5：Cohere 白底 token 仍是 DS 基礎。首頁 Hero 回到品牌本來的紙面語言。
3. **訊息優先** — 大字標語作 H1（真 DOM，SEO/AI 爬蟲可讀），圖為「插圖（FIG.01）」而非動畫主角。
4. 仍守七鐵律：靜態進場如雜誌封面、scroll 才推進、無 autoplay 循環、終局清晰、reduced-motion 靜態。

---

## 2. 版面（雜誌封面結構）

```
┌────────────────────────────────────┐
│ 8PLUS.APP · TRUST001        NO.01  │  ← masthead（mono）
│                                    │
│ 架構先行，AI 落地                    │  ← H1 大字標語（display）
│ 把需求交付成可信系統                  │
│                                    │
│   ┌──────────────────────────┐     │
│   │  handshake.png（FIG.01）  │     │  ← 圖框（hairline border）
│   └──────────────────────────┘     │
└────────────────────────────────────┘
```

Scroll（pin `+=150%`）三段：

| 段 | progress | 行為 |
|----|----------|------|
| 封面 | 0 | 完整雜誌封面；不捲動即成立（壁紙原則） |
| 圖框擴張 | 0.05 → 0.55 | 圖框 `clip-path: inset(40% 8% 12% 8%)` → `inset(0)` 滿版；圖 scale 1.08 → 1；標語縮小上移（scale 1 → 0.62） |
| 定格 | 0.55 → 1 | 底部白色 scrim 浮現；三柱 pillars stagger（0.55+i×0.07）；scroll cue（0.85→1） |

回捲完全可逆（純 progress 函數）。

---

## 3. 資產與文案

| 元素 | 來源 |
|------|------|
| 主圖 | `public/ci/handshake.png`（唯一圖，白底半調） |
| 標語 | `home-sections.ts` 新增 `hero.headline: string[]`（中英雙語） |
| 三柱 | 既有 `hero.pillars`（架構先行 / AI 導入 / 體驗落地） |
| 圖說 | `FIG.01 — TRUST HANDSHAKE`（mono，呼應圖內 `trust001`） |

色彩：紙 `#f6f5f1`、墨 `#101010`、hairline `rgba(16,16,16,.14–.32)`。無 accent 色、無 glow。

---

## 4. 降級

| 條件 | 行為 |
|------|------|
| `prefers-reduced-motion` | 不 pin；封面靜態 + pillars 直接可見；cue 隱藏 |
| JS 失敗 | 紙面 + 文字可讀 |

---

## 5. 檔案

```
lib/hero/home-editorial-motion.ts        # progress → clip / scale / reveal
components/motion/use-scroll-pin-progress.ts  # 共用 hook（脫離 design-lab 依賴）
components/home/sections/section-hero.tsx     # 重寫為 editorial 版
lib/content/home-sections.ts             # hero.headline 新增
styles/globals.css                       # home-hero-ed-* 樣式
```

已刪除（上輪否決）：`hero-home-ci.tsx`、`home-ci-motion.ts`。
design-lab 全部路由與元件不動、不引用。

---

## 6. 驗收

- [ ] `pnpm build` 通過
- [ ] 未捲動：完整雜誌封面，10 秒可說出「像雜誌/印刷品」
- [ ] 捲動：圖框擴張滿版 → 三柱浮現；回捲可逆
- [ ] `prefers-reduced-motion`：靜態封面
- [ ] 375px 無橫向溢出、標語不破行溢出
