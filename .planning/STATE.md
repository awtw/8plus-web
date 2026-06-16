# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-15)

**Core value:** 展示專業能力、累積技術內容、預約諮詢的個人品牌網站
**Current focus:** Phase 2.1 — UIX Redesign & Repository Merger (✅ 接近完成)

## Current Position

Phase: 2.1 of 3 (UIX Redesign & Merger)
Plan: 4 of 4 in current phase
Status: Phase 2.1 complete — 待用戶確認
Last activity: 2026-06-15 — 完成全部頁面重構與內容遷移

Progress: [██████████] 100%

## What Was Done

- ✅ **2026-06-16 12:37 CST — 百分比幾何風格 Logo / Favicon 替換**: 依使用者提供的黑白 `%` 風格參考圖，將 8plus Logo 改為透明底黑色雙圓斜槓符號；favicon / apple / OG 資產則使用白底黑符號，維持小尺寸辨識度；同步更新 `components/logo.tsx`、`public/logo-new.svg`、`public/logo-light.svg`、`public/logo-mono.svg`、`public/favicon.svg`、`public/favicon.ico` 與 `public/og/8plus.svg`。
- ✅ **2026-06-15 15:58 CST — Logo 極簡現代化重設計**: 將 8plus Logo 從漸層科技圖標收斂為黑色圓角底、白色雙環 `8` 與藍色 `+` accent；同步更新 header、mobile menu、footer 與 `public/og/8plus.svg`，並完成 `pnpm typecheck`、`pnpm build`、桌機/手機/手機選單截圖驗證。
- ✅ **Bento Grid 首頁重構**: Aurora 動態背景、glassmorphism 卡片、個人名片、技術棧、最新文章/專案、life photo
- ✅ **/about 頁面重寫**: 整合 resume.2025 全部豐富內容 — 關於我、興趣生活、後端/前端/DevOps 技術棧、重要專案、學經歷、學術論文、生活照片牆
- ✅ **/path 職涯時間軸**: 垂直時間軸顯示 2018-2025 里程碑、左/右交替佈局、含標籤與詳細描述
- ✅ **/share 社交名片島**: 行動優先 Link-in-Bio 風格、玻璃質感 UI、GitHub/LinkedIn/LINE QR/WeChat QR、中英文雙語履歷下載、Cal.com 預約
- ✅ **專案內容遷移**: 從 resume2025 導入 15 個 Velite MDX 專案 (crm-series, 8plus, b18, power-bi, 1914 等)
- ✅ **導航更新**: 加入 Path 連結、使用 i18n 翻譯

## Accumulated Context

### Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Bento Grid + Glassmorphism | 最適合行動端 RWD 的現代佈局 | ✓ Good |
| /share 保持隱藏路由 | 僅供社交平台入口使用，不顯示在主導航 | ✓ Good |
| 時間軸 Desktop 交替排版 | 提供最佳桌機閱讀體驗同時保持行動端可用 | ✓ Good |

### Pending / Next Steps (待用戶決定)

- [ ] 是否需要替部分專案補充英文版本 (MDX)
- [ ] 是否需要獨立「Social Media 分享頁」桌面版手機框模擬器
- [ ] 進入 Phase 3 (next-intl 遷移 + 更多內容)

## Session Continuity

Last session: 2026-06-15 15:58 CST
Stopped at: Logo 已改為極簡現代版，建置與截圖驗證完成
Resume file: None

## Discussion Log

### 2026-06-16 12:37 CST — Logo / Favicon 百分比幾何風格替換

- 使用者提供單張黑白 `%` 風格 Logo 參考圖，要求做出類似風格的 Logo 替換，並涵蓋 favicon。
- 設計決策：不直接複製參考圖，改以黑白高對比、左上小圓、右下大圓與厚斜槓建立 8plus 專屬符號；網站 header 使用透明底黑符號，favicon / apple / OG 使用白底黑符號。
- 實作範圍：更新 React 內嵌 Logo 元件、主要 SVG logo、light/mono 版本、SVG favicon、ICO favicon、OG 小圖示。
- 驗證：`pnpm typecheck` 通過；`pnpm build` 通過；以 Google Chrome headless fallback 檢查 `http://localhost:3001` 桌機與行動版首屏，確認 header Logo 與 `/favicon.svg` 掛載正常。
- 截圖證據：`.planning/logo-percent-desktop-2026-06-16.png`、`.planning/logo-percent-mobile-2026-06-16.png`。

### 2026-06-15 15:58 CST — Logo Redesign

- 使用者要求重新設計 Logo，後續明確指定「極簡現代感一點」。
- 設計決策：移除原本紫藍綠漸層、斜線與複雜符號，改用黑色圓角底、白色雙環 `8`、單一藍色 `+` accent。
- 實作範圍：`components/logo.tsx`、`components/mobile-nav.tsx`、`components/site-footer.tsx`、`public/og/8plus.svg`。
- 驗證：`pnpm typecheck` 通過；`pnpm build` 通過；以 Google Chrome headless fallback 截圖驗證桌機、手機與手機選單狀態。
- 截圖證據：`.planning/logo-redesign-desktop-2026-06-15.png`、`.planning/logo-redesign-mobile-2026-06-15.png`、`.planning/logo-redesign-mobile-menu-2026-06-15.png`。
