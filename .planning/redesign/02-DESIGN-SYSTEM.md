# 8plus 重新設計 — Phase C：設計系統 SSOT

*建立：2026-07-09 CST*
*狀態：LOCKED — 設計系統唯一真相*
*依據：`00-STRATEGY-BRIEF.md`、`01-IA-CONTENT.md`*
*產物：`design_system/8plus/tokens.css`（canonical CSS）、`design_system/8plus/style-guide.html`（可點樣式指南）*

---

## 0. 方向定案（LOCKED 2026-07-09）

August 從三個全新方向中選定：**藍色滿版底（#1F4FFF）為主場景 + 橘色（#FF7A18）作強調，白字。**

- 情緒：大膽、品牌記憶點強、企業級克制中帶技術自信。
- 對治舊病灶：**單一版本、選一鎖死**；不做多主題切換、不開選型牆。
- 這是全新、經比較後選出的方向；取代所有先前 spec（Cohere / Cinema / 舊藍橘 v2）。

---

## 1. 色彩系統

| Token | 值 | 角色 |
|-------|-----|------|
| `--blue` | `#1F4FFF` | 主場景底 / 品牌主色 |
| `--blue-deep` | `#163BCC` | 藍加深（hover / 分層） |
| `--orange` | `#FF7A18` | 強調 / 主要 CTA |
| `--orange-hover` | `#FF8F3D` | CTA hover |
| `--dark` | `#0B0E14` | 沉浸章節 / Hero 深色島 |
| `--paper` | `#FBFAF6` | 長文閱讀底（blog / 案例內文） |
| `--ink` | `#14181F` | paper 上主文字、橘按鈕文字 |

**文字（藍/深底，白字系）**：`--fg #FFF`、`--fg-2 .88`、`--muted .72`、`--meta .60`。
**表面**：`--surface rgba(255,255,255,.08)` 磨砂、`--border .22` 白線框、`--hover-border .50`。

### 場景變體（覆寫式，section 加 class 即切換）

```
.bg-blue    藍底 · 橘強調 · 白字   ← 預設主場景
.bg-orange  橘底 · 白強調 · 白字   ← 轉換強調區塊，製造滾動張力
.bg-dark    深色 · 橘強調         ← 沉浸 / Hero 島 / 全屏媒體
.bg-paper   白底 · 墨字 · 藍強調   ← 長文閱讀，保可讀性
```

**律動規則**：行銷頁以 `.bg-blue` 為主、關鍵轉換段插 `.bg-orange` 製造張力；閱讀頁（blog/案例內文）用 `.bg-paper`。同一頁不超過必要的場景切換數，避免花亂。

---

## 2. 字體 Typography

沿用已載入的 `next/font`：**Outfit**（display + body）、**JetBrains Mono**（eyebrow / 標籤）。不新增字體依賴。

| 角色 | 字體 | 規則 |
|------|------|------|
| Display H1 | Outfit 800 | `clamp(40px,5.5vw,72px)`；字距 `-.03em`；行高 1.03 |
| Display H2 | Outfit 700 | `clamp(30px,4vw,48px)`；`-.02em` |
| Display H3 | Outfit 600 | `clamp(22px,2.4vw,28px)` |
| Eyebrow/標籤 | JetBrains Mono | 全大寫；`.14em`；13px；accent 色 |
| 內文 Body | Outfit 300/400 | 17px；行高 1.6；`max-width 65ch`；`--muted` |

---

## 3. 間距 / 圓角 / 陰影

- **間距**（4px 基準）：4·8·12·16·24·32·48·64·96·128；section 垂直 `clamp(64px,9vw,128px)`；容器 1200px；內文行寬 65ch。
- **圓角**：主容器/卡片/圖框 **16px**（LOCKED — 工程精確感，介於柔軟 20–22px 與冷硬 12px 之間）；按鈕/badge 藥丸 999px；小元件 8px。
- **陰影**：藍/深底**用線框不用陰影**；`.bg-paper` 才用 `--shadow-paper`。

---

## 4. 元件

- **按鈕**（全站僅兩態，同畫面最多 2 個主 CTA）：
  - `.btn-primary` = 橘底 + 深墨字（`--ink`）；hover 轉亮橘、上移 2px。（橘底白字對比不足，故用深墨字。）在 `.bg-orange` 場景改為白底藍字。
  - `.btn-secondary` = 透明 + 目前前景色線框；hover 線框變亮 + 淡表面底。
- **卡片** `.card` = 磨砂玻璃（藍/深底）或帶陰影（paper）；hover 上移 4px、線框變亮。
- **Badge / 標籤** = 藥丸線框 + mono 字。
- **圖示** = 單色線條 SVG，`stroke-width 1.8`、`currentColor`、`fill:none`。禁 emoji / 多彩插圖。
- **焦點環** = `2px` accent。

---

## 5. 動效（紀律）

- Token：`--ease cubic-bezier(.16,1,.3,1)`；150 / 250 / 400ms。
- **只有首頁 Hero 一個重動效**（signature scroll，Phase D 定）；內頁一律輕量 reveal。
- 禁 autoplay 循環 hero；禁再開多款動效選型牆。
- `prefers-reduced-motion`：全域靜態降級（已在 tokens.css）。

---

## 6. A11y（對比）

- 白字 on 藍 `#1F4FFF` ≈ 6.3:1 ✅（AA 正文可）。
- 深墨字 on 橘 `#FF7A18` ✅（大字/按鈕佳）；**橘底避免白色小字**。
- 墨字 on paper `#FBFAF6` ✅ 高對比，供長文。
- 所有互動元件有 `:focus-visible` 焦點環；觸控目標 ≥ 44px。

---

## 7. 落地到程式（Phase E 銜接）

1. `styles/globals.css` 的 `:root` 換成 `design_system/8plus/tokens.css` 的變數；`@import` 或直接併入。
2. shadcn 的 HSL token（`--background`/`--primary`…）對齊：`--background`→藍、`--primary`→橘。
3. 逐頁把舊 aurora/lumina/glass class 換成 `.scene/.card/.btn`，並用場景 class 排律動。
4. 每頁 `pnpm build` 驗證。

---

## 8. 已確認決策（2026-07-09）

- **設計系統鎖定**：藍色滿版 + 橘強調 + 四場景，作為唯一真相。
- **圓角**：16px（見 §3）。
- **深色島**：允許在首頁 Hero 與少數沉浸章節用 `.bg-dark` 開場作為節奏變化，其餘以藍底為主場景。

---

*本文件已鎖定。進入 Phase D（Logo / 主視覺 / 首頁 signature 動畫）。*
