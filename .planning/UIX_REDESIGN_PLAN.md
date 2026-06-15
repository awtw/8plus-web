# 8plus Web & Resume 2025 結合與 UIX 重構計劃

- **紀錄時間戳記**：2026-06-15 13:00 (GMT+8)
- **專案狀態**：設計與架構規劃階段

---

## 一、 當前主流 UIX 架構與設計趨勢分析 (2025-2026)

針對行動端優先（Mobile-First）及個人品牌與工程顧問定位，2025-2026 年最主流的 UIX 設計語言包含以下核心：

1. **Bento Grid (便當盒網格佈局)**：
   - **特點**：源自 Apple 產品展示與 Windows Phone 的動態磚，將資訊模組化放進圓角、磨砂玻璃質感的網格中。
   - **RWD 優勢**：在桌機端是 3-4 欄的精美儀表板；在行動端會流暢地摺疊成 1-2 欄的垂直瀑布流。非常適合用來展示技術指標、生活照片、簡短狀態等異質資訊。
2. **Glassmorphism (玻璃擬態 / 磨砂玻璃)**：
   - **特點**：利用 `backdrop-filter: blur` 配合高對比度的暗色背景與色彩繽紛的漸層發光（Glow Effects）。
   - **視覺感受**：高階、極簡、未來科技感。
3. **行動端單手操作優化 (Thumb Zone Optimization)**：
   - **特點**：所有的核心點擊點（CTA 按鈕、導航、切換器）均設計在螢幕下半部 60% 區域。
   - **實作方式**：行動版底端導航欄（Bottom Navigation Bar）、底部抽屜（Bottom Sheets）、動態吸底按鈕（Floating Sticky CTA）。
4. **Link-in-Bio / Card Hub (社交名片島)**：
   - **特點**：模仿 Linktree，但使用微動效與定製化卡片，結合個人品牌。專供手機掃描 QR Code 或 IG/X 簡介點擊進入。

---

## 二、 結合後的新網頁架構 (Information Architecture)

我們將 `resume.2025` (偏向個人履歷、生活經歷、XLab 實驗室) 與 `8plus_web` (偏向專業工程顧問、服務、技術部落格、預約) 兩個專案完美結合。

```
8plus_web/ (Next.js 15 App Router)
├── app/
│   ├── (site)/
│   │   ├── page.tsx            # 首頁：Bento 網格行動版優化 Hub
│   │   ├── about/page.tsx      # 關於我：結合學經歷 + 澳洲日本歷程 + 技術雷達圖 + 生活照片
│   │   ├── projects/           # 專案：整合「專業諮詢專案」與「XLab 側邊專案」
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── blog/               # 技術部落格 (保留)
│   │   ├── path/page.tsx       # 個人成長與職涯時間軸 (Milestone/Path/Grow 的結合體)
│   │   ├── booking/page.tsx    # 預約諮詢 (Cal.com 整合)
│   │   └── contact/page.tsx    # 聯絡與 Hi! 頁面
│   ├── share/                  # 專屬社交媒體分享頁 (Link-in-Bio 模式，限定路由，純手機版型)
│   │   └── page.tsx
│   ├── layout.tsx
│   └── middleware.ts
```

---

## 三、 功能模組與亮點設計 (Feature Checklist)

### 1. 核心首頁 (Home Hub) — Bento Grid 現代化設計
- **全屏 3D 粒子背景 / Aurora 漸層背景** (保留 `resume.2025` 粒子感，改用純 CSS 加上 Tailwind 漸層，免去肥大套件，節省 Token 與效能)。
- **便當盒卡片群**：
  - **個人名片卡**：顯示 August Wang 頭像、一句话 Slogan、即時狀態（如 🟢 Available for Consulting）。
  - **核心技術雷達卡**：快速展示 C# .NET、NestJS、Vue 3、Kubernetes。
  - **生活照片輪播卡** (來自 `resume.2025` 的生活照)。
  - **最新部落格卡**、**最新專案卡**。
  - **Cal.com 預約卡**。

### 2. 關於我頁面 (About Page) — 深度整合
- 整合 `resume.2025` 的「澳洲與日本遊學經歷」、「興趣與生活態度（武術、電影、貓咪、旅行）」。
- 整合「技術與專業發展」（後端、前端、DevOps 五年經驗）。
- 展示「學術論文與學歷」（NTOU、NTCU、TAFE 經歷與 Thesis 內容）。
- 底部嵌入「我的生活照片牆 (Photo Grid)」微縮動效。

### 3. 專案與實驗室 (Unified Portfolio)
- 將專案分為兩大類別（可以使用頁面 Tab 切換）：
  - **Enterprise (企業級顧問專案)**：例如千萬級別雙11推播系統、CRM 系統等。
  - **XLab (側邊專案與實驗)**：來自原 `resume.2025` 的 XLab，如 Google Sheets API 動態圖表、R 語言分析等。
- 全面改用 **Velite MDX 統一管理**，確保效能與 SEO，移除 Vue 專案中的靜態 JSON。

### 4. 職涯成長軌跡 (Career Path Timeline) — `/path`
- 將原 Vue 專案中的 `Path.vue` 與 `Grow.vue` 結合，設計成一條**垂直的高顏值互動時間軸**。
- 整合 2019 到 2025 的重要里程碑（包括技術突破、公司任職、海外進修、部落格創立、8plus 顧問品牌啟動）。
- 行動端支援手勢滑動，節點點擊彈出抽屜（Drawer）顯示詳細故事。

### 5. 專屬社交名片分享頁 (Social Hub) — `/share` (或 `/links`)
- **定位**：Linktree 殺手。專為行動端（Mobile-Only）設計，若在桌機端開啟，會以手機框模擬器（Mobile Mockup Wrapper）置中呈現，保持極佳的視覺比例。
- **高階 UI 元素**：
  - **浮動頂部名片**：August Wang 3D 質感頭像與霓虹發光圈。
  - **動態社交連結卡**：
    - **GitHub**：滑過或點擊時，顯示最新的 contribution 綠格子微縮圖。
    - **LinkedIn**：專業商務風格。
    - **Line / WeChat**：點擊彈出二維碼（QR Code Drawer）方便直接掃描加入。
    - **Email**：一鍵複製與直接開啟郵件客戶端。
    - **Cal.com 預約按鈕**：高亮黃色（來自 `resume.2025` 最佳化），直接導向行動預約抽屜。
  - **一鍵分享二維碼**：頁面底部提供此頁面的 QR Code 產生器，方便在手機上面對面掃描。

---

## 四、 開發執行計畫 (GSD Phases)

- **Phase 2.1 (INSERTED)**：UIX 架構設計與重構規劃 (✅ 本次完成)
- **Phase 2.2**：實作 `/share` 行動端社交分享頁、重新設計首頁為 Bento Grid
- **Phase 2.3**：重寫 `/about` 與 `/path` 頁面，整合 `resume.2025` 所有學經歷與生活資訊
- **Phase 2.4**：將原 `resume.2025` 專案 (1914, b18, power-bi, e-cooperative 等) 寫入 `content/projects` 改為 Velite 格式，統一渲染。

---
*記錄人：opencode Agent*
