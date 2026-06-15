# 8plus Web — 個人品牌官網

## What This Is

8plus 是 August Wang 的工程諮詢品牌官網，提供服務展示、技術部落格、專案作品集與預約諮詢功能。目標受眾為需要工程技術顧問的客戶與團隊。

## Core Value

一個能展示專業能力、累積技術內容、並讓潛在客戶直接預約諮詢的個人品牌網站。

## Requirements

### Validated

- ✅ Next.js 15 App Router 架構 — 初始版本
- ✅ Velite 內容管線 (Post + Project 雙 Collection)
- ✅ 雙語 i18n (zh-TW / en) — Context-based 自製方案
- ✅ shadcn/ui 基礎元件 + Tailwind CSS 品牌色系
- ✅ 部落格模組 (列表 + 詳情, SSG)
- ✅ 專案展示模組 (列表 + 詳情)
- ✅ 首頁 (Hero + 服務預覽 + 最新內容)
- ✅ Cal.com 預約整合
- ✅ 響應式導航 + 行動版選單
- ✅ 暗色模式支援
- ✅ SEO 基礎設定

### Active

- [ ] Supabase Auth 整合 (admin/login)
- [ ] 受保護內容控制 (middleware `/secret` + post frontmatter `protected`)
- [ ] 遷移至 next-intl 搭配 `/[locale]` 路由
- [ ] 補齊更多實際內容 (文章 + 專案)
- [ ] 管理後台內容管理界面
- [ ] 部落格 RSS/Atom feed

### Out of Scope

- 第三方評論系統 — 使用社群渠道取代
- 付費會員功能 — 品牌官網不需要
- 複雜的 CMS 後台 — Velite + git 已足夠

## Context

- Next.js 15 + TypeScript strict mode
- Velite 取代 Contentlayer 作為內容引擎
- 自製 Context-based i18n (過渡方案，規劃遷移至 next-intl)
- Supabase SSR auth (Phase 2 整合)
- 部署於 Vercel
- 品牌色系：灰黑白極簡風，Inter 字體

## Constraints

- **Tech**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Content**: Velite MDX (檔案系統為 CMS)
- **Auth**: Supabase SSR (Phase 2 開始使用)
- **Deploy**: Vercel (build: `velite && next build`)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Velite over Contentlayer | Contentlayer 已停止維護 | ✓ Good |
| 自製 i18n over next-intl | 快速迭代初期階段 | ⚠️ 需遷移 |
| Context-based i18n | localStorage + Context Provider | ⚠️ 過渡方案 |
| Cal.com embed for booking | 免自建預約系統 | ✓ Good |
| shadcn/ui New York style | 簡潔專業的 UI 風格 | ✓ Good |

## Evolution

- Phase 1: 基礎架構 + 內容 + 部落格/專案 (✅ 已完成)
- Phase 2: 認證 + 受保護內容 + i18n 遷移 (🚧 進行中)
- Phase 3+: 管理後台 + 更多內容 + 最佳化

---
*Last updated: 2026-06-15 after project analysis*
