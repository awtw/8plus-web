# 8plus.app 官網改版 — 設計師交手 Brief + IA

> **一句話**：把 8plus 個人技術顧問官網，重構成一套「藍橘雙色 CI、克制動效、架構驅動」的品牌形象站。策略、內容、技術都已定案，本文件把所有已鎖定決策交給設計師，讓你能直接開工。

- **文件版本**：v1.0
- **建立日期**：2026-07-08
- **委託人**：August Wang（8plus）
- **交付對象**：視覺 / UI 設計師
- **設計真相來源（SSOT）**：本文件 + `docs/DESIGN_SYSTEM_SPEC.md`（藍橘 v2）

---

## 0. 如何使用這份文件

這份 brief 分三種資訊，請對應不同用途讀：

1. **背景與定位（§1–§3）** — 幫你理解「為誰、為什麼、要傳達什麼」。設計時的判斷依據。
2. **已鎖定決策（§4）** — 這些是護欄，**請勿更動**（色彩、字體、圓角、動效紀律、禁用清單）。它們是委託人反覆迭代後才收斂的結論。
3. **IA 與逐頁 brief（§5–§8）** — 你要設計的實際範圍與每頁目標。

> ⚠️ **最重要的一件事**：這個專案過去最大的問題不是「設計不好」，而是**方向反覆重啟**（Hero 曾迭代 15+ 版全數推翻）。所以本文件刻意把方向「鎖死」。你的任務是**在鎖定的框架內做到最好**，而不是重新發散探索。如果你認為某個鎖定決策有問題，請先提出討論，不要直接改。

---

## 1. 專案背景

**8plus** 是 August Wang 的工程顧問個人品牌。網站現況是一個功能完整、但視覺語言歷經多套風格疊加、缺乏統一 CI 的 Next.js 站。這次改版目標是：

- 建立一套**單一、可辨識、可維護**的視覺識別（design system）
- 收斂 Logo、動效與內容，讓品牌形象一致
- 重新部署上線

**技術現況（設計不需處理，但要知道）**：Next.js 16 App Router + Velite（MDX 內容）+ 自製雙語 i18n（zh-TW / en）+ framer-motion / GSAP。部署於 Vercel。內容資料（14 篇雙語文章、15 個專案案例）已存在，這次不重寫內容，只重塑呈現。

---

## 2. 品牌定位與價值主張

### 2.1 定位陳述

> **8plus 協助團隊把需求拆成可驗證的技術架構，導入 AI 到真實流程，並以優秀的使用者體驗，把產品做成能交付、能維護、能被信任的系統。**

品牌角色是 **Architecture-led Engineering Partner（架構驅動的技術夥伴）**，不是外包工廠、不是泛 AI 自動化代理商、不是純 UI 工作室。

### 2.2 三大價值支柱（貫穿全站的敘事骨架）

| 支柱 | 意涵 | 視覺轉譯方向 |
|------|------|--------------|
| **架構先行** | 把需求拆成可驗證的系統架構 | 網格、對齊、層級清晰、mono 標籤 |
| **AI 導入** | 把 AI 落地到真實工作流，而非 POC | 克制的線條 / 光感，非氣泡粒子 |
| **體驗落地** | 用 UX 把系統做成可交付、可信任 | 充足留白、可讀排版、22px 卡片 |

### 2.3 品牌語氣

專業、直接、有邊界、少形容詞。中文專業直接；英文 confident, precise。

### 2.4 一級關鍵字（希望使用者感受到的）

`架構先行` · `可驗證交付` · `AI 工作流` · `體驗落地` · `技術夥伴`

---

## 3. 目標受眾（TA）

網站要同時服務三種 B2B 技術決策者。設計時以 **TA-1 為主**，兼顧 TA-2 的轉換效率。

| | TA-1 技術決策者 | TA-2 產品負責人 | TA-3 工程管理者 |
|---|---|---|---|
| **角色** | 10–80 人新創/SMB 的 CTO/VP Eng | 產品 0→1 或改版的 Founder/PM | 帶 3–15 人團隊的 Eng Manager |
| **痛點** | 技術債、選型錯誤、AI POC 進不了生產 | 需求模糊、工程排程不透明、UX 與後端脫節 | Review 品質、AI 工具導入亂象 |
| **決策因子** | 可驗證方法論、案例、溝通清晰 | Discovery 門檻低（30 分鐘）、價格透明 | Retainer/Workshop 模式、可複製流程 |
| **關鍵觸點** | 案例研究、Services、部落格深度文、Booking | Hero 標語、價格區間、Contact/LINE | Services、文章 checklist、流程 |

**共同結論**：使用者要在**首屏 3 秒內**讀懂「這個人能解什麼等級的問題」，並且能**低摩擦地預約 30 分鐘諮詢**。

---

## 4. 已鎖定的設計決策（護欄 — 請勿更動）

### 4.1 Design System 主軸：CI 雙色單一版本

- **不做 light/dark 兩版**，不做多主題切換 — **只做一版**。
- 以兩個 CI 主色作為 section 底色，**滾動時交替律動**產生張力。

### 4.2 色彩 Token

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-blue` | `#002FA7`（International Klein Blue） | CI 主色 A｜技術架構｜**預設全站底** |
| `--color-orange` | `#FE5000`（Pantone Orange 021 C） | CI 主色 B｜商業交付｜轉換區 |
| `--color-dark` | `#0A0E1A` | 深邃墨夜｜全屏媒體 / Hero 章節可用 |
| `--fg` | `#FFFFFF` | 主文字（雙色底皆白字） |
| `--fg-2` | `rgba(255,255,255,.88)` | 次要文字 |
| `--muted` | `rgba(255,255,255,.76)` | 輔助文字 |
| `--meta` | `rgba(255,255,255,.6)` | 角標 / meta |
| `--accent` | 隨底色對調 | 藍底→橘 accent；橘底→藍 accent |
| `--surface` | `rgba(255,255,255,.08)` | 磨砂玻璃卡片底 |
| `--border` | `rgba(255,255,255,.22)` | 卡片白線框 |

**區塊律動規則**：藍底配橘 accent、橘底配藍 accent、暗底配橘 accent。section 交替出現，滾動產生節奏。

### 4.3 字體

| 角色 | 字體 | 規則 |
|------|------|------|
| Display（H1/H2） | Outfit（或襯線 Georgia 作宣言變體） | `clamp(36px, 5vw, 56px)`；字距 `-0.03em`；行高 `1.05` |
| Eyebrow / 標籤 | JetBrains Mono | 全大寫；字距 `0.12em`；13px；accent 色 |
| 內文 | Outfit（300/400） | 16px；行高 `1.6`；`max-width: 65ch` |

### 4.4 UI 原子

- **圓角**：主卡片 / 容器 / 圖框統一 **22px**（`--radius-md`）；按鈕與 badge 用藥丸形（`9999px`）；小元件可 8px。
- **卡片**：磨砂玻璃 — `rgba(255,255,255,.08)` 底 + `blur(12px)` + 白線框；hover 上移 4px、線框變亮。
- **按鈕**：全站僅兩態，同畫面最多 2 個主 CTA。
  - Primary：白底黑字 → hover 轉 accent 底白字、上移 2px
  - Secondary：透明底 + 白線框 → hover 白框 + 淡白底
- **圖標**：單色線條 SVG，`stroke-width: 1.8`、`stroke: currentColor`、`fill: none`。

### 4.5 動效紀律：單一克制 Signature

- **全站只有一個「重動效」時刻 = 首頁 Hero**。一段 scroll-driven 進場即可（scroll pin + scrub）。
- 內頁只做**輕量 reveal**（區塊淡入 0.5–0.65s），不做重動畫。
- **禁止**再開「多款動效選型牆」— 這是過去 churn 的來源。
- `prefers-reduced-motion`：Hero 降級為靜態定格 + 完整文案。

### 4.6 禁用清單（Anti-Slop — 必須避免）

- ❌ 紫青漸層 + 粒子場（AI slop 視覺 cliché，委託人明確反感）
- ❌ 氣泡粒子 logo 主視覺
- ❌ 到處都是的多色漸層按鈕
- ❌ 霓虹 / 掃描線 HUD
- ❌ Emoji、多彩插圖
- ❌ 首頁 autoplay 循環 hero 影片
- ❌ Inter 當主標題字體

---

## 5. 資訊架構（IA）

### 5.1 Sitemap

```
8plus.app
│
├── /                首頁（品牌形象殿堂 · Hero signature 動效）
│
├── 主導覽（6 項）
│   ├── /lab         作品集 / 案例研究（15 個專案）
│   │   └── /lab/[slug]        單一案例
│   ├── /about       關於我（故事、技術棧、學經歷）
│   ├── /services    服務（含 #process 流程、#pricing 價格）
│   ├── /path        職涯時間軸（2018–2025 里程碑）
│   ├── /blog        技術部落格（14 篇雙語文章）
│   │   └── /blog/[slug]       單篇文章
│   └── /booking     預約諮詢（Cal.com 30min + 聯絡表單）
│
├── 隱藏頁（不在導覽，僅社群入口用）
│   ├── /sb          Link-in-Bio · 商務名片（Email/LinkedIn/履歷/Cal.com/LINE 商務）
│   └── /sc          Link-in-Bio · 社群名片（IG/LINE 個人/WeChat QR）
│
└── 系統
    ├── 語言切換 zh-TW / en（全站）
    ├── sitemap.xml / robots.txt / RSS feed.xml
    └── /design-lab  ⚠️ 探索用途，上線前移除 / noindex（設計不需處理）
```

### 5.2 主導覽結構

- **桌面**：Logo（左）｜ Lab · About · Services · Path · Blog（中）｜ 語言切換 + Booking CTA（右）
- **行動**：Logo + 漢堡選單；選單內同樣 6 項 + 語言 + Booking CTA 全寬
- **Header 行為**：透明 → 滾動 > 50px 加磨砂底 + 邊框
- **Logo**：白 mark 於藍底（走 `--logo-mark`）

### 5.3 舊 → 新路由對照（301 轉址已設定，設計只需知道最終結構）

| 舊路由 | 新路由 |
|--------|--------|
| `/projects`、`/projects/[slug]` | `/lab`、`/lab/[slug]` |
| `/contact` | `/booking#contact` |
| `/process` | `/services#process` |
| `/pricing` | `/services#pricing` |
| `/share` | `/sb` |

---

## 6. 首頁結構（Section 順序）

首頁是唯一有 signature 動效的頁面。建議 section 順序與底色律動：

| # | Section | 底色 | 目的 | 動效 |
|---|---------|------|------|------|
| 1 | **Hero** | 藍 / 暗底 | 首屏 3 秒傳達定位 + 品牌符號 | ✅ Signature scroll 進場（唯一重動效） |
| 2 | **About 摘要** | 橘 | 一句話介紹 August + 三支柱 | 輕量 reveal |
| 3 | **Lab 精選** | 藍 | 2–3 個代表案例卡 + 「查看全部」 | 輕量 reveal |
| 4 | **Services** | 橘 | 三支柱服務 + 流程概覽 | 輕量 reveal |
| 5 | **Blog 最新** | 藍 | 2 篇最新文章預覽 + 「查看全部」 | 輕量 reveal |
| 6 | **Booking / Connect** | 橘（轉換區） | 主 CTA：預約 30 分鐘諮詢 | 輕量 reveal |

> 說明：藍/橘交替是本 CI 的核心律動。Hero 可用暗底或藍底作沉浸首屏，向下逐段交替。

---

## 7. 逐頁 Brief

### 7.1 `/` 首頁
- **目標**：首屏 3 秒讀懂「架構 + AI + 體驗」定位；引導向下探索與預約。
- **必備元素**：品牌符號（Logo）× 一句標語 H1 × 主 CTA（Booking）× 次 CTA（看案例）。
- **設計重點**：這裡是整站唯一可以「秀」的地方，signature 動效落在此。

### 7.2 `/lab` 作品集
- **目標**：用案例證明能力（TA-1 最重視）。
- **元素**：案例卡網格（22px 卡片）、標籤篩選（技術棧 / 類型）、單案例頁含問題→架構→成果 ROI 敘事。
- **內容**：15 個既有專案（含 1914、smart-community-backend、power-bi、b18、e-cooperative 等）。

### 7.3 `/about` 關於我
- **目標**：建立信任與人味（自學驅動、生醫轉全端與雲端）。
- **元素**：個人故事（六段弧，見 `docs/StoryAboutMe.md`）、技術棧（後端/前端/DevOps）、學經歷、學術論文、生活照片牆。
- **語氣**：專業但有溫度；不要變成流水帳履歷。

### 7.4 `/services` 服務
- **目標**：說清楚「能提供什麼、怎麼合作、大概多少錢」。
- **元素**：三支柱服務、合作流程 01–04（`#process`）、價格區間（`#pricing`）、FAQ、Testimonials。
- **重點**：Discovery 門檻要低（30 分鐘諮詢），價格區間透明以降低 TA-2 摩擦。

### 7.5 `/path` 職涯時間軸
- **目標**：用時間縱深展現成長軌跡。
- **元素**：2018–2025 垂直時間軸；桌面左右交替佈局、行動單欄；每節點含年份、標題、描述、標籤。
- **語氣**：企業化，非遊戲化。

### 7.6 `/blog` 部落格
- **目標**：累積技術深度內容，SEO 與專業佐證。
- **元素**：文章列表（編輯排版優先）、單篇 prose 版型、雙語。
- **內容**：14 篇既有文章（架構、AI 工作流、code review、Next.js patterns 等）。

### 7.7 `/booking` 預約
- **目標**：轉換核心頁。
- **元素**：信任鋪墊（簡短）+ Cal.com 30 分鐘 embed + 聯絡表單（`#contact` 錨點）。
- **重點**：橘色轉換區；CTA 明確；不要用動效干擾嵌入表單。

### 7.8 `/sb` 商務名片（隱藏 Link-in-Bio）
- **目標**：社群/名片掃碼進來的商務入口。
- **元素**：頭像、一句定位、Email 複製、LinkedIn、履歷 PDF、Cal.com、LINE 商務（`@482ykgdg`）。
- **版型**：行動優先單欄，深底 + 線框 accent（參考 Linktree 結構，非主站 scroll story）。

### 7.9 `/sc` 社群名片（隱藏 Link-in-Bio）
- **目標**：個人社群入口，語氣比 `/sb` 休閒。
- **元素**：IG / Threads、LINE 個人、WeChat QR、輕鬆 bio。

---

## 8. 內容清單與現有素材

### 8.1 動態內容（已存在，不需重寫）
- **部落格**：14 篇（中英雙語成對），位於 `content/posts/`
- **專案案例**：15 個，位於 `content/projects/`
- **個人故事**：`docs/StoryAboutMe.md`（六段弧）

### 8.2 現有視覺素材（可參考 / 沿用）
- **Logo 檔**：`public/logo-*.svg` / `.png`（多變體，改版後將收斂為單一版本 — 見 §9）
- **CI 參考圖**：`public/ci/`
- **握手主視覺素材**：`public/`（`hand_line.png`、`handshake.png` 等，Hero 可考慮的協作隱喻素材）
- **QR / 社群**：`igQRCode.jpg`、`lineQRcode.jpg`
- **人像 / 生活照**：`public/me/`、`public/plants/`

### 8.3 品牌符號語意（Logo）
- Logo 由「**兩圓 + 一斜切**」構成 = 象徵 `8` + `plus`，寓意雙系統接合、架構張力、精確幾何。
- **交付要求**：設計師需**定案單一 Logo 版本**（藍橘 CI 下），並提供變體：header/footer 用、favicon、OG social、mono 印刷。不再發散重畫概念。

---

## 9. 需要設計師交付的東西（Deliverables）

請以下列形式交付，方便後續工程切版：

1. **Design System 檔（Figma）**
   - 色彩 / 字體 / 間距 / 圓角 / 陰影 tokens（對齊 §4）
   - 元件庫：按鈕（2 態）、卡片（22px 磨砂玻璃）、導覽列、footer、表單、標籤
2. **Logo 定案**：單一主版 + 變體（header/favicon/OG/mono）+ 安全空間規範，SVG 交付
3. **高保真頁面設計**：至少涵蓋 首頁、/lab（列表+單頁）、/about、/services、/blog（列表+單篇）、/booking、/sb、/sc — **桌面 + 行動兩斷點**
4. **首頁 Hero signature 動效規格**：分鏡 / 進場時序 / scroll 行為 / reduced-motion 降級稿
5. **切版標註**：間距、字級、狀態（hover/focus/active）、RWD 行為

---

## 10. 技術限制與 RWD / A11y 要求

- **RWD 斷點**：手機 375px 起（不可橫向溢出）、平板、桌面 1440px 容器上限；section 左右留白 16 → 24（sm）→ 32（lg）px。
- **A11y**：
  - 對比：白字 on 藍 `#002FA7` ≈ 10.9:1（OK）；白字 on 橘 `#FE5000` ≈ 3.2:1 → **橘底只用於大字白字，小內文避免純 76% 白，必要時提到純白**。
  - CTA 觸控最小高度 44px；焦點環用 accent 色。
  - `prefers-reduced-motion`：關閉 Hero canvas 動畫，顯示靜態稿。
- **雙語**：所有版型需能容納 zh-TW 與 en 兩種文案長度（英文通常較長，預留伸縮）。
- **效能**：Hero 動效只在首屏；內頁靜態。

---

## 11. 交手流程建議（Design → Dev）

1. **Kickoff**：設計師讀完本 brief，就 §4 護欄與 §9 交付項確認共識。
2. **Logo + Design System 先行**：先定案 Logo 與元件 tokens（1 週），委託人審核。
3. **首頁 + Hero 動效**：第二優先（signature 只此一處，值得打磨）。
4. **其餘頁面**：依 §7 逐頁產出，共用元件庫。
5. **切版標註交付** → 工程進場實作 → `pnpm build` 驗證 → 合併 main → Vercel 部署。

---

## 12. 待設計師 / 委託人確認的開放問題

- [ ] Hero 主視覺是否採用「握手 / 線框手」協作隱喻素材，或走純字體 + 幾何？（委託人過去對線框手有多次反覆，建議設計師提 1–2 個明確方向讓委託人選，**不要再開多款選型牆**）
- [ ] 藍橘交替的「比例」：是每個 section 硬交替，還是藍為主、橘僅用於轉換與強調區塊？
- [ ] Hero 底色用純藍還是暗底（`#0A0E1A`）？
- [ ] `/sb`、`/sc` 是否沿用主站藍橘，還是保留獨立的深底 Link-in-Bio 風格？

---

## 附錄：站內原始文件對照（供深入查閱）

| 主題 | 站內文件 |
|------|----------|
| 品牌 / CI / TA 完整研究 | `docs/CI_IDENTITY_SPEC.md` |
| 藍橘 design system 規格（SSOT） | `docs/DESIGN_SYSTEM_SPEC.md` |
| 內容盤點與路由對照 | `.planning/CONTENT_INVENTORY.md` |
| 個人故事原文 | `docs/StoryAboutMe.md` |
| 動效紀律原則 | `docs/MOTION_DESIGN_SPEC.md` |

---

*本文件為設計交手的單一真相來源。若委託人與設計師對護欄（§4）達成新共識，請同步更新本文件與 `docs/DESIGN_SYSTEM_SPEC.md`。*
