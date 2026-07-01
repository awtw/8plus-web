# 8plus Web — 內容盤點與功能邊界

*建立：2026-07-01 CST*  
*更新：2026-07-01 CST — Phase 4.0 IA LOCKED*  
*狀態：LOCKED*

---

## 0. 北極星

> 現代 AI 感 · scroll 驚喜 · 線框手 + 握手協作 · ICON 級品牌形象

**策略**：保留技術資產與內容資料；重構 IA、視覺、動效層。  
**索引**：`.planning/phases/4.0-PHASE-OVERVIEW.md`

---

## 1. 必保留 — 商業與功能核心

| 類別 | 內容 | 來源 | Phase 4.0 處置 |
|------|------|------|----------------|
| **品牌定位** | Architecture-led Engineering Partner | `CI_IDENTITY_SPEC.md` | 保留；首頁 Ch4 Manifesto |
| **目標受眾** | B2B 技術決策者 | CI spec | 保留 |
| **轉換** | Cal.com、聯絡、LINE `@482ykgdg` | 現站 | **併 `/booking`** + `/sb` |
| **服務** | Consulting、Next.js Architecture | `/services` | 保留；process/pricing 併入 |
| **信任** | Testimonials、Process、Pricing | `trust.ts`、`process-pricing.ts` | 併 services/booking |
| **作品集** | 15+ MDX、case studies | `content/projects/` | 路由改 **`/lab`** |
| **Blog** | 中英文章 | `content/posts/` | **主導覽 `/blog`** |
| **個人敘事** | Story、里程碑 | `StoryAboutMe.md`、`path-milestones` | `/about`、`/path` |
| **關於我** | 技術棧、學經歷 | `about.ts` | `/about` 重設計 |
| **社交** | Link-in-Bio、QR、履歷 | `share.ts` | 拆 **`/sb`** + **`/sc`** |
| **雙語** | zh-TW / en | `i18n.ts` | 保留 |
| **SEO** | sitemap、RSS、JSON-LD | 現站 | 更新 lab 路徑 |

---

## 2. 技術資產

### 保留

```
Next.js 15 App Router · Velite · lib/content/* · lib/i18n.ts
Supabase auth（admin）· Cal.com · contact Server Action
gsap · components/motion/*（收斂擴充）
```

### 替換 / 新增

```
components/home/brand-story/     新首頁敘事（取代 scroll-story 語意）
components/home/wireframe-hand/  R3F 線框手
three · @react-three/fiber · @react-three/drei
styles/globals.css               W6 收斂
```

### Checkpoint

| Commit | 說明 |
|--------|------|
| `28fffff` | Phase 3.0 W1 scroll prototype |
| _本規劃 commit_ | Phase 4.0 規劃 LOCKED |

---

## 3. 路由對照（舊 → 新）

| 舊路由 | 新路由 | Nav |
|--------|--------|-----|
| `/` | `/` | ✅ 形象殿堂 |
| `/projects` | `/lab` | ✅ |
| `/projects/[slug]` | `/lab/[slug]` | — |
| `/about` | `/about` | ✅ |
| `/services` | `/services` | ✅ |
| `/path` | `/path` | ✅ |
| `/blog` | `/blog` | ✅ |
| `/booking` | `/booking` | ✅（含聯絡） |
| `/contact` | → `/booking` | 301 |
| `/process` | → `/services#process` | 301 |
| `/pricing` | → `/services#pricing` | 301 |
| `/share` | → `/sb` | 隱藏 |
| — | `/sb` | 隱藏 Business |
| — | `/sc` | 隱藏 Social |
| `/design-lab` | `/design-lab` | noindex |

---

## 4. 內容模組（可重用）

### 4.1 品牌

- 一句話：架構驅動技術夥伴，可交付、可維護、可被信任的系統
- 三柱：架構先行 · AI 導入 · 體驗落地
- Logo：兩圓 + 斜線 = 8plus
- 禁用：紫青粒子、AI-powered 空泛詞

### 4.2 故事與經歷

- `StoryAboutMe.md` — 六段弧
- `path-milestones` — 2018–2025

### 4.3 動態內容

- Blog posts、Projects/Case studies（Velite 不變）

### 4.4 轉換與 Share

| 頁 | 內容 |
|----|------|
| `/booking` | Cal.com + contact 表單 |
| `/sb` | Email、LinkedIn、履歷、Cal.com、LINE 商務 |
| `/sc` | IG、LINE 個人、WeChat QR |

---

## 5. 文件產出狀態

| 文件 | 狀態 |
|------|------|
| `CONTENT_INVENTORY.md` | ✅ LOCKED |
| `4.0-PHASE-OVERVIEW.md` | ✅ |
| `4.0-ROUND1/2-LOCKED.md` | ✅ |
| `4.0-PAGE-BRIEFS.md` | ✅ |
| `4.0-IMPLEMENT-PLAN.md` | ✅ |
| `BRAND_EXPERIENCE_SPEC.md` | ✅ LOCKED |
| `DESIGN_SYSTEM_SPEC.md` | DRAFT |

---

*最後更新：2026-07-01 CST*
