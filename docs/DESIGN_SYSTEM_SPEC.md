# 8plus Design System Spec — v2 CI 雙色單一版本

*更新：2026-07-06 12:43 CST*
*狀態：ACTIVE — 取代 Phase 4.0 dark-only DRAFT*
*依據：`docs-2026-07-06-design-spec.md`（基礎設定）、`lib/share-hub/themes.ts`（/sb /sc 色源）*

---

## 0. 原則

1. **單一版本** — 不做 light/dark 兩版；無 ThemeToggle、無 design-mode 三態（apple/elevenlabs/cohere 覆寫已自 `globals.css` 移除）
2. **CI 雙主底色** — 取自 `/sc`、`/sb` 兩頁背景：
   - `--color-blue: #002FA7`（International Klein Blue，技術架構）
   - `--color-orange: #FE5000`（Pantone Orange 021 C，商業交付）
3. **區塊交替律動** — section 以 `.bg-blue` / `.bg-orange` 交替，滾動產生張力；藍底配橘 accent、橘底配藍 accent
4. **磨砂玻璃** — 卡片 `rgba(255,255,255,.08)` + `blur(12px)` + 白線框
5. **22px 圓角**、藥丸按鈕、單色線條 SVG（1.8px stroke、`currentColor`）、禁 Emoji / 多彩插圖

---

## 1. Color Tokens（`styles/globals.css` `:root`）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-blue` | `#002FA7` | CI 主色 A（預設全站底） |
| `--color-orange` | `#FE5000` | CI 主色 B |
| `--color-dark` | `#0A0E1A` | 深邃墨夜（全屏媒體章節） |
| `--bg` | `var(--color-blue)` | 目前區塊底色（可被變體覆寫） |
| `--fg` | `#FFFFFF` | 主文字 |
| `--fg-2` | `rgba(255,255,255,.88)` | 次要文字 |
| `--muted` | `rgba(255,255,255,.76)` | 輔助文字 |
| `--meta` | `rgba(255,255,255,.6)` | 角標 |
| `--accent` | `var(--color-orange)` | CTA / 強調（隨變體對調） |
| `--accent-hover` | `#FF6A28` | |
| `--surface` | `rgba(255,255,255,.08)` | 玻璃卡片底 |
| `--surface-warm` / `--hover-bg-strong` | `rgba(255,255,255,.12–.15)` | hover 玻璃 |
| `--border` | `rgba(255,255,255,.22)` | 卡片線框 |
| `--border-soft` | `rgba(255,255,255,.12)` | 弱分隔線 |
| `--hover-border` | `rgba(255,255,255,.5)` | hover 線框 |

### 區塊變體（覆寫式，不換 class 命名系統）

```css
.bg-blue   { --bg: var(--color-blue);   --accent: var(--color-orange); }
.bg-orange { --bg: var(--color-orange); --accent: var(--color-blue); }
.bg-dark   { --bg: var(--color-dark);   --accent: var(--color-orange); }
```

用法：section 加 `.bg-blue` / `.bg-orange` 即完成交替；區塊內元件一律吃 token，不硬編色。

---

## 2. Typography

| 角色 | 字體 | 規則 |
|------|------|------|
| Display（H1/H2） | Georgia → Outfit | `clamp(36px, 5vw, 56px)`；`letter-spacing: -0.03em`；`line-height: 1.05` |
| Eyebrow / Label | JetBrains Mono | 全大寫；`letter-spacing: 0.12em`；13px；`color: var(--accent)` |
| Body | Outfit（300/400） | 16px；`line-height: 1.6`；`max-width: 65ch`；`color: var(--muted)` |

載入：`next/font/google`（`app/layout.tsx`）→ `--font-outfit`、`--font-jbmono`；token `--font-display` / `--font-body` / `--font-mono` 已接。

---

## 3. UI 元件

### 玻璃卡片

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md); /* 22px */
  backdrop-filter: blur(12px);
  transition: var(--transition-base);
}
.card:hover { border-color: var(--hover-border); background: var(--hover-bg-strong); transform: translateY(-4px); }
```

### 藥丸按鈕（全站僅兩態；同畫面最多 2 個主 CTA）

- `btn-primary`：白底黑字 → hover 轉 `var(--accent)` 底白字、上移 2px
- `btn-secondary`：透明底白線框 → hover 白框 + `rgba(255,255,255,.1)` 底

### 圖標

單色線條 SVG，`stroke-width: 1.8`、`stroke: currentColor`、`fill: none`。

---

## 4. Motion

| Token | 值 |
|-------|-----|
| `--transition-base` | `all 0.35s cubic-bezier(0.16, 1, 0.3, 1)` |
| `--motion-fast` / `--motion-base` | 150ms / 200ms |
| Navbar | scroll > 50px 加 `.scrolled` 磨砂（首頁 header 已有等效邏輯） |

---

## 5. 遷移備註（2026-07-06）

- 移除：`html[data-design-mode="apple"]`、`elevenlabs`、`html.dark[...]`、`.dark` token 覆寫（globals.css 原 L109–426）
- `--page-bg` 改為 `var(--bg)` 實色場（不再漸層）
- `body::before` 噪點紋理收斂為單一版本
- `DesignModeProvider` / `LogoThemeLauncher` 機制暫留（token 已無多版本，切換為 no-op）；後續清理列待辦
- `/sb` `/sc` Share Hub 主題（`lib/share-hub/themes.ts`）維持獨立 — 是本系統色源
- 首頁 Editorial Hero（紙面白）為獨立 DRAFT，是否併入藍橘律動待決策
- shadcn HSL token（`--background`、`--primary`…）已同步 IKB 藍/橘

---

## 6. A11y

- 對比：白字 on `#002FA7` ≈ 10.9:1；白字 on `#FE5000` ≈ 3.2:1 — **橘底大字白字 OK；橘底小字內文避免純 76% 白，必要時提高至 `--fg`**
- 焦點環：`--focus-ring`（accent）
- `prefers-reduced-motion`：沿用各元件靜態降級
