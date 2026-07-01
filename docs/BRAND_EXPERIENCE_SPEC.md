# 8plus Brand Experience Spec

*建立：2026-07-01 CST*  
*狀態：LOCKED — Phase 4.0 Round 2*  
*依據：`4.0-ROUND1-LOCKED.md`、`4.0-ROUND2-LOCKED.md`*  
*Supersedes：`docs/MOTION_DESIGN_SPEC.md` 首頁敘事章節（其餘 dark-only / GSAP 原則仍適用）*

---

## 0. 執行摘要

8plus.app 首頁 = **AI 線框科技形象殿堂**。  
Signature = Logo 幾何（8 + plus）→ 線框手 assemble → **雙手握手**（協作隱喻）。  
技術 = GSAP ScrollTrigger（敘事節奏）+ Three.js/R3F（線框 mesh 手）。

---

## 1. Logo（鎖定）

### 1.1 語意

| 元素 | 寓意 |
|------|------|
| 小圓 + 大圓 | 「8」 |
| 斜線（/`） | 「plus」 |
| 整體 | 8plus 品牌符號 |

### 1.2 資產

- 主檔：`components/logo.tsx` 內嵌 SVG 或 `public/logo-*.svg`
- 動效拆分：3 個獨立圖層（`circle-sm`、`circle-lg`、`slash`）供 GSAP morph / assemble
- 色彩：dark 背景上 `--logo-mark`（白或 accent）；禁止漸層紫青

---

## 2. 首頁六章敘事

總高度：約 `600vh`–`800vh`（實作時依 pin 長度微調）。  
每章 = pin + scrub 或 section reveal；**每段 scroll 須有視覺變化**。

### Ch0 — Void

| 項目 | 規格 |
|------|------|
| **情緒** | 空寂、期待 |
| **視覺** | 純黑；Logo 三層從 opacity 0 → 1，斜線最後 snap 入位 |
| **Scroll** | scrub：scale 0.8→1，微 rotate slash |
| **文案** | 無或極小 mono 角標 `8PLUS.APP` |
| **時長** | ~100vh pin |

### Ch1 — Mesh

| 項目 | 規格 |
|------|------|
| **情緒** | 數位生成、AI 構築 |
| **視覺** | **線框右手** mesh 自頂部 assemble（參考使用者 wireframe hand） |
| **技術** | R3F `Wireframe` / custom shader；頂點隨 scroll 從 scattered → 成形 |
| **Scroll** | scrub 0–1 驅動 vertex lerp 或 opacity per-edge |
| **Logo** | 可縮小至左上 corner，不搶戲 |
| **時長** | ~120vh pin |

### Ch2 — Reach

| 項目 | 規格 |
|------|------|
| **情緒** | 伸出手、邀請 |
| **視覺** | 單手向前伸；camera 微 dolly in |
| **Scroll** | scrub 手勢 + 景深 parallax |
| **文案** | 大標拆字（例：`ARCHITECTURE / LED / PARTNER`）typography motion |
| **時長** | ~100vh pin |

### Ch3 — Handshake（Signature）

| 項目 | 規格 |
|------|------|
| **情緒** | 信任、協作、接案陪跑 |
| **視覺** | **第二隻線框手**入場；雙手交握；mesh 交疊處可加 accent 高亮線 |
| **隱喻** | 8plus 與客戶一起完成專案 |
| **Scroll** | pin 最長；scrub 驅動握手進度 0→100%；完成時短暫 hold + 微光脈衝 |
| **文案** | 一句宣言（中/英 i18n） |
| **時長** | ~150vh pin — **全站最重** |

### Ch4 — Manifesto

| 項目 | 規格 |
|------|------|
| **情緒** | 清晰、專業 |
| **視覺** | 手 fade out；三柱 reveal stagger（架構先行 / AI 導入 / 體驗落地） |
| **Scroll** | stagger reveal，無 pin |
| **時長** | ~80vh |

### Ch5 — Portal

| 項目 | 規格 |
|------|------|
| **情緒** | 探索、轉換 |
| **視覺** | 六個入口（非舊式 dense 卡片）：Lab · About · Services · Path · Blog · Booking |
| **互動** | hover 線框邊框 glow；minimal typography |
| **CTA 主** | Booking |
| **時長** | ~60vh + footer |

### 進度導覽（可選）

- 右側垂直 dot `00`–`05`
- `aria-label` 章節名；keyboard 可聚焦

---

## 3. Three.js 線框手規格

### 3.1 技術棧

```
@react-three/fiber
@react-three/drei
three
gsap + ScrollTrigger（驅動 progress uniform）
```

### 3.2 模型

- 來源：低 poly hand GLB 或 procedural；**必須**可 wireframe 渲染
- 風格：白線 `#FFFFFF` 或 `var(--logo-mark)`，線寬 1–1.5px，黑底透明
- 雙手：鏡像或第二模型；握手姿勢需預先 rig 或 blend shape

### 3.3 效能

| 規則 | 實作 |
|------|------|
| Lazy | `dynamic(() => import(...), { ssr: false })` |
| 僅首頁 | 不載入全站 layout |
| DPR cap | `dpr={[1, 1.5]}` mobile |
| Fallback | `prefers-reduced-motion` → 靜態 SVG 握手剪影 + 完整文案 |

### 3.4 與 GSAP 整合

```ts
// pattern: scroll progress 0-1 → uniform uProgress
ScrollTrigger.create({
  trigger: chapterRef,
  start: 'top top',
  end: '+=150%',
  pin: true,
  scrub: 1,
  onUpdate: (self) => handMaterial.uniforms.uProgress.value = self.progress,
})
```

---

## 4. 全站體驗層級

| 頁面 | Motion 重量 |
|------|-------------|
| `/` | ████████ 最重 |
| `/lab` | ████ 策展 hover + reveal |
| `/about` | ████ 肖像 parallax |
| `/path` | █████ scrub timeline |
| `/services` | ████ 三柱 reveal |
| `/blog` | ██ 編輯排版優先 |
| `/booking` | █ 信任鋪墊 + embed |
| `/sb` `/sc` | █ Link-in-Bio 輕互動 |

---

## 5. Share 頁（`/sb` · `/sc`）

### `/sb` Business

- 頭像、一句定位、Email copy、LinkedIn、履歷 PDF、Cal.com 連結、LINE 商務
- 視覺：dark + 線框 accent，單欄行動優先

### `/sc` Social

- IG / Threads、LINE 個人、WeChat QR、輕鬆 bio
- 語氣比 `/sb` 休閒

參考結構：[Linktree](https://linktr.ee/) — 單連結列表，非主站 scroll story。

---

## 6. 設計 Token（沿用 + 擴充）

| Token | 用途 |
|-------|------|
| `--page-bg` | `#000` 或近黑 |
| `--logo-mark` | Logo / 線框手主色 |
| `--accent` | 握手高亮、CTA |
| `--mesh-line` | 線框線色 |
| `--fg` / `--fg-2` | 標題 / 內文 |

圓角：內頁卡片可保留 `22px`；首頁以全屏無卡片為主。

---

## 7. 無障礙

- `prefers-reduced-motion: reduce`：跳過 Three.js canvas，顯示靜態 hero + 完整 Ch4–Ch5 內容
- 所有章節文案在 DOM 中可讀（非 canvas 內唯一文字）
- Skip to main；章節 nav `aria-current`

---

## 8. 實作 Wave 建議

| Wave | 範圍 |
|------|------|
| W0 | IA：`lib/navigation.ts`、redirects、`/sb` `/sc` 路由殼 |
| W1 | 首頁 Ch0–Ch1：Logo assemble + 單手 mesh prototype |
| W2 | Ch2–Ch3：Reach + Handshake |
| W3 | Ch4–Ch5 + 移除舊首頁區塊 |
| W4 | `/lab` rename + 內頁 motion 輕量層 |
| W5 | `/sb` `/sc` 重構 |

---

*LOCKED 2026-07-01 CST*
