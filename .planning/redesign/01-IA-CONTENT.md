# 8plus 重新設計 — Phase B：IA 與內容骨架

*建立：2026-07-09 CST*
*鎖定：2026-07-09 CST — 首頁順序、信任帶素材、導覽與服務模式已確認*
*狀態：LOCKED*
*依據：`00-STRATEGY-BRIEF.md`（策略 SSOT）、`CONTENT_INVENTORY.md`、`StoryAboutMe.md`*
*頁面決策：保留現有九頁，日後再擴充（2026-07-09）*

---

## 0. 原則

- **內容先於視覺**：本文件定義「每頁要說什麼、給誰看、要引導到哪」，不談顏色與版面。
- **單一主轉換**：全站導向「預約諮詢」；每頁至少一個回到主/次 CTA 的出口。
- **中英雙語到底**：每個區塊都要中英並存，元件預留語言長度差。
- H1 為**草稿方向**，Phase C/實作時再定稿；此處求「訊息正確」而非「文案完美」。

---

## 1. 導覽結構（IA）

### 主導覽（Primary Nav，桌機列 + 行動選單）

`關於 About` · `服務 Services` · `作品 Lab` · `部落格 Blog` · `歷程 Path` ＋ 常駐主 CTA 按鈕 `預約諮詢 Book a call`

- 語言切換（zh-TW / en）與（如保留）主題無關的設定放在 nav 尾。
- 主 CTA 在 nav 常駐、滾動時維持可見。

### 隱藏頁（不進主導覽，靠直接連結／QR 分享）

`/sb` 商務 link hub、`/sc` 社群 link hub。robots 已 disallow，不進 sitemap 主索引。

### 頁尾（Footer）

三欄：品牌一句話 + 主 CTA｜導覽鏡像｜聯絡（Email、LINE 商務、LinkedIn、履歷）。含雙語版權與 sitemap 連結。

---

## 2. 路由表

| 路由 | 頁面 | 主導覽 | 主要 TA | 頁面任務 |
|------|------|:---:|------|------|
| `/` | 首頁 形象殿堂 | ✅ | 全體 | 3 秒說清價值 → 預約 |
| `/about` | 關於我 | ✅ | TA-1/TA-3 | 建立人物信任與能力範圍 |
| `/services` | 服務與合作模式 | ✅ | TA-1/TA-2 | 說清能解的問題 + 合作模式 → 預約 |
| `/lab` | 作品案例 | ✅ | TA-1/TA-2 | 用案例證明可交付 |
| `/lab/[slug]` | 案例詳情 | — | TA-1 | 深度證據（挑戰→架構→結果） |
| `/blog` | 部落格 | ✅ | TA-1/TA-3 | 技術深度與方法論，累積信任 |
| `/blog/[slug]` | 文章詳情 | — | TA-1/TA-3 | 單篇深度內容 |
| `/path` | 歷程／里程碑 | ✅ | TA-1 | 敘事化證明「架構先行」信念 |
| `/booking` | 預約＋聯絡 | ✅（CTA） | 全體 | 完成主轉換 + 承接聯絡 |
| `/sb` | 商務 link hub | 隱藏 | 商務接觸點 | 名片式聚合：Email/LinkedIn/履歷/Cal/LINE |
| `/sc` | 社群 link hub | 隱藏 | 個人社群 | IG / LINE 個人 / WeChat QR |

*相容：舊 `/contact`→`/booking`、`/process`&`/pricing`→`/services`、`/projects`→`/lab`、`/share`→`/sb` 以 301 導轉，保 SEO。*

---

## 3. 全站轉換動線

1. **入口**：首頁 Hero 或任一內容頁。
2. **建立信任**：Hero 價值 → 支柱 → 案例/文章證據 → 關於/歷程的人物與信念。
3. **主轉換**：任何頁面的段落結尾與 nav 常駐 CTA → `/booking`。
4. **低承諾接口**：對還在評估者，提供「先聊聊你的專案」與 LINE/email（`/sb`）。
5. **回流**：文章與案例互相導引（相關內容），footer 全域出口。

CTA 語氣（依 SSOT §4）：主按鈕明確「預約 30 分鐘諮詢 / Book a 30-min call」；輔句低承諾「先聊聊你的專案，不用先準備任何東西 / Just tell me about your project — no prep needed」。

---

## 4. 逐頁內容骨架

### 4.1 `/` 首頁（形象殿堂）

- **任務**：首屏 3 秒讓 TA 讀懂「能解什麼等級的問題」，並看見預約入口。
- **H1 草稿**：
  - zh：把需求，變成能交付、能維護、能被信任的系統。
  - en：Turning requirements into systems you can ship, maintain, and trust.
- **副標**：一句點出「架構先行 × AI 落地 × 體驗交付」的技術夥伴身分。
- **區塊大綱**：
  1. Hero — H1 + 副標 + 主 CTA + 低承諾輔句（signature 動畫落在此，Phase D 定）。
  2. 三支柱 — 架構先行 / AI 導入 / 體驗落地，各一句 + 一個線條圖示。
  3. 代表案例 — 2–3 個 `/lab` 精選卡片。
  4. 最新文章 — 2–3 篇 `/blog`。
  5. 服務入口 — 能解的問題摘要 → `/services`。
  6. 信任帶 — **先用精簡經歷/技術棧關鍵字**（目前無客戶語錄/logo；日後有素材再升級為語錄/logo 牆）。
  7. 收尾 CTA — 大版位預約 + 輔句。
- **CTA**：主=預約；軟=看案例/讀文章。
- **來源**：SSOT §1、§4；`home-sections.ts`、`trust.ts`。

### 4.2 `/about` 關於我

- **任務**：把 August 從「接案工程師」立成「架構驅動的技術夥伴」，建立人物信任與能力邊界。
- **H1 草稿**：zh「我幫團隊做對的技術決策。」／ en「I help teams make the right technical decisions.」
- **區塊大綱**：定位摘要 → 能力範圍（架構/AI/全端/UX/雲端與交付實踐）→ 技術棧 → 工作方式與價值信念 → 個人溫度（興趣，簡短）→ CTA。
- **來源**：`about.ts`、`StoryAboutMe.md`（精煉，不整篇搬）。

### 4.3 `/services` 服務與合作模式

- **任務**：說清能解的問題與交付方式；**不標價格**，導向預約談（SSOT §5）。
- **H1 草稿**：zh「從架構決策到可交付的系統。」／ en「From architecture decisions to shippable systems.」
- **區塊大綱**：
  1. 服務主張。
  2. 能解的問題（對應三類 TA 痛點）。
  3. 服務項目（Consulting、Next.js/架構陪跑、AI 工作流落地、產品/UX）。
  4. 流程（Discovery → 架構 → 交付 → 陪跑）— 併入原 `/process`。
  5. **合作模式**（諮詢 / Retainer / Workshop / 專案制）+「預約了解報價」— 取代價目表。
  6. CTA。
- **來源**：`process-pricing.ts`、`services` 現有內容（改寫定價段）。

### 4.4 `/lab` 作品案例 + `/lab/[slug]`

- **任務**：用真實案例證明「可交付、可維護」。
- **列表頁**：H1「作品與案例 / Work & Case Studies」；卡片 = 專案名 + 一句成果 + 標籤（架構/AI/前端…）；可依主題篩選。
- **詳情頁骨架**：情境與挑戰 → 我的角色 → 架構/技術決策 → 成果與影響 → 相關案例/文章 → CTA。
- **來源**：`content/projects/*`（Velite，資料不動，只重排呈現）。

### 4.5 `/blog` 部落格 + `/blog/[slug]`

- **任務**：技術深度與方法論，長期累積信任與 SEO。
- **列表頁**：H1「技術筆記 / Notes」；依主題/標籤瀏覽；精選置頂。
- **詳情頁**：清晰排版（65ch）、目錄、程式碼區塊、相關文章、結尾 CTA。
- **來源**：`content/posts/*`（14 篇雙語，不重寫）。

### 4.6 `/path` 歷程／里程碑

- **任務**：把 August 的跨域自學史敘事化，作為「架構先行」信念的人格化證據。
- **H1 草稿**：zh「一條自學驅動的工程之路。」／ en「A self-taught path into engineering.」
- **區塊大綱**：時間軸里程碑（2018–2025）＋每站一句學到什麼 → 收束到現在的信念 → CTA。
- **來源**：`path-milestones`、`StoryAboutMe.md`。

### 4.7 `/booking` 預約＋聯絡

- **任務**：完成主轉換；同時承接不預約者的聯絡需求。
- **區塊大綱**：主 CTA 說明（30 分鐘、免費、談什麼）→ Cal.com 內嵌 → 低承諾輔句 → 其他聯絡（Email、LINE 商務、`/sb`）→ 簡短 FAQ（可選）。
- **來源**：Cal.com 內嵌、contact Server Action、`share.ts`。

### 4.8 `/sb` 商務 link hub（隱藏）

- **任務**：名片式聚合商務接觸點。Email、LinkedIn、履歷下載、Cal.com、LINE 商務。維持可獨立分享、QR 友善。

### 4.9 `/sc` 社群 link hub（隱藏）

- **任務**：個人社群聚合。IG、LINE 個人、WeChat QR。

---

## 5. 雙語與內容製作備註

- 所有 H1/副標/CTA/區塊標題都要 zh + en 對應；元件不寫死單語寬度。
- 既有 14 篇文章、15 個專案的 MDX **不重寫**，僅重排呈現與導覽。
- `/about`、`/path` 從 `StoryAboutMe.md` **精煉重寫**（不整段搬運），語氣依 SSOT §1.4。

---

## 6. 已確認決策（2026-07-09）

1. **首頁區塊順序**：Hero→三支柱→案例→文章→服務→信任帶→收尾 CTA，確認採用。
2. **首頁信任帶**：先用經歷/技術棧關鍵字（無客戶語錄/logo）。
3. **主導覽命名與順序**（關於／服務／作品／部落格／歷程）：採用為預設，日後可微調。
4. **`/services` 合作模式四類**（諮詢/Retainer/Workshop/專案制）：採用為預設，Phase E 寫內容時可再校正。

---

*本文件已鎖定。進入 Phase C（設計系統：Claude 提全新視覺方向供選一鎖定）。*
