# 三域策略：8plus 生態系規劃

> 建立: 2026-06-17
> 狀態: 已定稿

## 概述

三個專案分別對應 `August Wang` 的三個面向：

| Domain | 專案目錄 | 角色 | 調性 |
|--------|---------|------|------|
| **8plus.app** | `8plus_web` | 專業顧問品牌 | 成熟、可信賴、低調專業 |
| **resume.2025.8plus.app** | `resume2025` | 輕量求職名片 | 乾淨、直接、好掃讀 |
| **shuyan.art** | `shuyan_art` | 互動藝術遊樂場 | 玩心、驚喜、實驗性 |

## 內容分配

### 8plus.app（現狀穩定，微調）

- 服務項目（Engineering / Consulting / Coaching）
- 精選專案（客戶作品）
- 技術部落格
- Cal.com 預約
- 極簡個人資訊
- **核心**: "我解決技術問題"

### resume.2025.8plus.app（隱私調整）

- 移除：電話、個人 Email（保留 hello@8plus.app 作為聯絡管道）
- 保留：經歷、技術棧、精選專案
- 改為聯絡表單（無直接 Email 顯示）
- **核心**: "我是值得僱用的人"

### shuyan.art（最大重構）

- 從「賣設計服務」轉型為「互動藝術遊樂場」
- 作品類型：Generative Art / 互動敘事 / Creative Coding / 數位花園
- 每個作品是獨立 React 元件，自由選擇技術（Three.js / p5.js / Canvas / CSS）
- 用 registry 自動發現作品，不需手動配置
- **核心**: "這是我的創作"

## 共享元件策略

### @8plus/ui（獨立 repo）

```
8plus-ui/
├── src/
│   ├── index.ts
│   ├── cn.ts                       # cn() utility
│   ├── primitives/                  # shadcn/ui 原子元件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   └── dropdown-menu.tsx
│   └── tokens/
│       ├── colors.ts               # 設計記號
│       └── tailwind-preset.ts       # 共用 Tailwind preset
├── package.json
└── tsconfig.json
```

### 集成方式

各專案 `package.json`:
```json
"@8plus/ui": "file:../8plus-ui"
```

各專案 `next.config.mjs`:
```js
transpilePackages: ['@8plus/ui']
```

## 實作 Roadmap

| 順序 | 內容 | 預估 |
|------|------|------|
| 1 | resume2025 隱私調整（移除電話/Email） | 1 天 |
| 2 | **@8plus/ui 套件建立**（本次執行） | 3-5 天 |
| 3 | 8plus_web 導入套件 | 2-3 天 |
| 4 | resume2025 導入套件 | 1-2 天 |
| 5 | shuyan.art 重構成互動藝術站 | 2-3 週 |
