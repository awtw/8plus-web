# Hero 首頁主視覺 — CI 三幕合成規格

*建立：2026-07-06 12:17 CST*
*作者：Sally · UX Designer*
*依據：`HERO-R5-VISUAL-TEST-BRIEF.md`（使用者選型 R5-01 + R5-05 + R5-06）、`HERO-DESIGN-LAB-LOG.md`、`docs/CI_IDENTITY_SPEC.md`*
*狀態：DRAFT — 已接 `section-hero.tsx`；不滿意可 revert 單一 commit*

---

## 1. 設計判斷

使用者於 2026-07-06 12:10 選定三支 R5 Lab（R5-01 Blueprint Grid、R5-05 Portal Split、R5-06 Halftone Trust）。三者共用同一語彙：**方格 = 工程精密、開門 = 揭示、握手 = 信任終局**。

本規格不三選一，而是把三者接成**一條 scroll 敘事弧**上首頁 Hero：

```
Act 1（0–30%）   Blueprint 門面 — 方格門扇閉合如壁紙，靜態進場（R5-01 鐵律）
Act 2（30–78%）  Portal 揭示 — scroll 拉開門扇，中縫光，handshake 顯影（R5-05）
Act 3（78–100%） Halftone 信任定格 — 曝光收斂 + vignette，三柱文案 stagger（R5-06）
```

符合 R5 七鐵律：靜態進場、scroll 驅動、無 autoplay、終局 = 握手、可逆、reduced-motion 靜態降級、訊息優先（H1 常駐）。

---

## 2. 資產（`public/ci/`）

| 層 | 檔案 | 角色 |
|----|------|------|
| 門扇左 | `square_line.png` | Act 1 藍圖方格 |
| 門扇右 | `squrare_2.png` | Act 1 藍圖方格 |
| 主體 | `handshake.png` | Act 2–3 半調×線框握手（CI 主圖） |

---

## 3. Motion 契約（scroll progress 0–1）

| 參數 | 區段 | 值 |
|------|------|-----|
| 門扇位移 | 0.30 → 0.72 | 0% → ±112%（easeInOut） |
| 門扇閉合微斂 | 0.06 → 0.26 | ±4% → 0（easeOut，捲動即回正） |
| 中縫光 | 隨開門 | 0 → 0.65，尾段 +0.2 |
| handshake opacity | 0.36 → 0.78 | 0 → 1（easeOut） |
| handshake scale | 0.40 → 0.85 | 0.95 → 1.0 |
| 曝光 brightness | 0.78 → 1 | 1 → 1.06（R5-06） |
| vignette | 全程 | 0.45 → 0.80 |
| 三柱 stagger | 0.70 + i×0.06 → 0.86 + i×0.06 | opacity 0→1、y 28→0 |
| scroll cue | 0.88 → 1 | opacity 0→1 |

Pin：`useScrollPinProgress`，`end: '+=170%'`，scrub 0.65。

---

## 4. 版面

- 滿版 `100svh` 黑底（沿用 `home-section-hero-pin`）
- 文案層：tag 左上、`8plus` H1 + 三柱固定底部（沿用現有 overlay 結構）
- H1 / pillars 為真實 DOM 文字 — SEO 與 AI 爬蟲可讀

---

## 5. 降級

| 條件 | 行為 |
|------|------|
| `prefers-reduced-motion` | 不 pin；progress 鎖 1 = Act 3 靜態定格（handshake + 全文案） |
| JS 失敗 | 黑底 + 文案層仍可讀 |

---

## 6. 檔案

```
lib/hero/home-ci-motion.ts            # 三幕 motion 合成
components/home/hero-home-ci.tsx      # 視覺層（door / poster / seam / vignette）
components/home/sections/section-hero.tsx  # 重寫：移除 R3F Co-Hero，接 CI stage
styles/globals.css                    # home-hero-ci-* 樣式
```

R3F `hero-co-hero-scene.tsx` 不再掛載（保留檔案）；三支 R5 Lab 原樣保留供對照。

---

## 7. 驗收

- [ ] `pnpm build` 通過
- [ ] 未捲動：方格門面如壁紙、H1 可讀
- [ ] 捲動：開門 → 握手顯影 → 三柱浮現，回捲可逆
- [ ] `prefers-reduced-motion`：靜態定格
- [ ] 375px 無橫向溢出
