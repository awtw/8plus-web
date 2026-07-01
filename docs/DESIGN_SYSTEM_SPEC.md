# 8plus Design System Spec — Phase 4.0

*建立：2026-07-01 CST*  
*狀態：DRAFT（隨 W6 收斂為 LOCKED）*  
*依據：`docs/BRAND_EXPERIENCE_SPEC.md`、`docs/CI_IDENTITY_SPEC.md`*

---

## 0. 原則

1. **單一品牌系統** — 廢除 classic/paper/studio 三態 design mode
2. **Dark-only** — 全站 dark cinematic；無 ThemeToggle
3. **線框幾何** — Logo 雙圓斜線為原子形狀；mesh 線為延伸
4. **22px 圓角** — 內頁卡片；首頁全屏章節無卡片
5. **一個 accent** — 克制藍或白線框；禁紫青漸層粒子

---

## 1. Color Tokens

| Token | 用途 | 建議值 |
|-------|------|--------|
| `--page-bg` | 頁面底 | `#000000` ~ `#0a0a0a` |
| `--fg` | 主文字 | `#f5f5f5` |
| `--fg-2` | 次要文字 | `#a3a3a3` |
| `--muted` | 輔助 | `#737373` |
| `--logo-mark` | Logo、線框手 | `#ffffff` |
| `--mesh-line` | R3F wireframe | `#ffffff` / opacity 0.85 |
| `--accent` | CTA、握手高亮 | CI accent blue |
| `--accent-glow` | hover、握手脈衝 | accent @ 20% |
| `--border-soft` | 卡片邊框 | `#262626` |
| `--surface` | 卡片底 | `#141414` |

---

## 2. Typography

| 角色 | 字體 | 用途 |
|------|------|------|
| Display | CohereText | 章節大標、Portal |
| Body | Unica77 | 內文、說明 |
| Mono | CohereMono | 角標、章節編號 `00` |

章節標：拆行 + `letter-spacing` scroll motion（首頁）

---

## 3. Spacing & Radius

| Token | 值 |
|-------|-----|
| `--radius-card` | `22px` |
| `--radius-pill` | `9999px` |
| `section-shell` | max-width 沿用現行 |

首頁章節：全寬 `100vw`，無 container 卡片（Portal 除外）

---

## 4. Motion Tokens

| 名稱 | 值 | 用途 |
|------|-----|------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | reveal |
| `--duration-reveal` | `0.45s` | 內頁 stagger |
| `--scrub-smooth` | `1` | ScrollTrigger scrub |
| pin 章節 | 見 BRAND_EXPERIENCE_SPEC | 首頁 |

元件：
- `MotionReveal` — 內頁 section
- `ScrollChapter` — 首頁 pin 殼
- `WireframeHandCanvas` — 僅首頁 Ch1–Ch3

---

## 5. Logo 規格（鎖定）

```
circle-sm  小圓（8 上半）
circle-lg  大圓（8 下半）
slash      斜線（plus）
```

- SVG 三層可獨立 animate
- 禁止漸層、陰影過重
- Favicon：白底黑符或黑底白符（小尺寸辨識）

---

## 6. 元件邊界

| 保留 | 重寫/新建 | 廢除 |
|------|-----------|------|
| `components/ui/*` | `components/home/brand-story/*` | design-mode 切換 UI |
| `components/motion/*` | `components/home/wireframe-hand/*` | 首頁舊 bento 區 |
| `components/logo.tsx` | `components/share/*` → sb/sc | glass/aurora 類 |

---

## 7. 響應式

| 斷點 | 首頁 | 內頁 |
|------|------|------|
| `<768px` | 簡化 mesh DPR、縮短 pin | 單欄 |
| `≥1024px` | 完整 handshake | 雙欄 about/path |

---

## 8. A11y

- `prefers-reduced-motion` → 靜態 hero + 完整 Manifesto/Portal
- 焦點環：accent outline
- 章節 nav：`aria-current="step"`

---

*DRAFT — W6 實作後 LOCKED*
