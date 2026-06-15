# Roadmap: 8plus Web

## Overview

從基礎架構開始，逐步建置完整的個人品牌官網 — 包含內容展示、客戶互動、以及管理後台。採用 GSD 工作流管理開發迭代。

## Phases

- [x] **Phase 1: 基礎架構** — Next.js 15 + Velite + Tailwind + shadcn/ui 核心建置
- [ ] **Phase 2: Auth & 受保護內容** — Supabase Auth, middleware, protected posts
- [ ] **Phase 3: i18n 遷移與內容擴充** — next-intl 遷移, 更多文章/專案

## Phase Details

### Phase 1: 基礎架構 (✅ 已完成)
**Goal**: 建置完整的 Next.js 15 前端架構，包含內容管線、部落格、專案展示、預約與 i18n
**Depends on**: Nothing (initial phase)
**Success Criteria**:
  1. 使用者可瀏覽首頁、關於、服務、聯絡頁面
  2. 使用者可閱讀部落格文章與專案案例
  3. 使用者可切換中英文語言
  4. 使用者可直接預約諮詢時段
  5. 網站支援暗色模式
**Plans**: 已實作 (非透過 GSD 管理)

### Phase 2: Auth & 受保護內容
**Goal**: 實作 Supabase 認證系統與受保護內容控制
**Depends on**: Phase 1
**Requirements**: REQ-AUTH-01, REQ-PROTECT-01
**Success Criteria**:
  1. 管理員可透過 admin/login 登入
  2. 標記 protected 的文章需要登入才能閱讀
  3. middleware 正確保護 `/secret` 路由
**Plans**: TBD

Plans:
- [ ] 02-01: Supabase Auth 登入/登入流程
- [ ] 02-02: 受保護內容 middleware 與 post 控制
- [ ] 02-03: 管理後台基礎頁面

### Phase 3: i18n 遷移與內容擴充
**Goal**: 從自製 Context-based i18n 遷移至 next-intl，並擴充網站內容
**Depends on**: Phase 2
**Requirements**: REQ-I18N-01, REQ-CONTENT-01
**Success Criteria**:
  1. 路由從 `/blog` 改為 `/[locale]/blog` 格式
  2. next-intl 正確處理翻譯與路由
  3. 至少新增 5 篇技術文章與 3 個專案案例
**Plans**: TBD

Plans:
- [ ] 03-01: next-intl 安裝與路由重構
- [ ] 03-02: 翻譯檔案遷移
- [ ] 03-03: 內容擴充

## Requirements Index

| ID | Requirement | Phase | Status |
|----|-------------|-------|--------|
| REQ-AUTH-01 | Supabase SSR 認證 | 2 | Pending |
| REQ-PROTECT-01 | 受保護內容 middleware | 2 | Pending |
| REQ-I18N-01 | next-intl 遷移 | 3 | Pending |
| REQ-CONTENT-01 | 內容擴充 (文章+專案) | 3 | Pending |

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. 基礎架構 | N/A (pre-GSD) | Complete | 2025-01 |
| 2. Auth & 受保護內容 | 0/TBD | Not started | - |
| 3. i18n 遷移與內容擴充 | 0/TBD | Not started | - |
