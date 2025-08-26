# Claude 專案開發規範

## 專案名稱
8plus.app – 個人接案與顧問作品集網站

## 專案目標
- 展現工程師 / 顧問接案能力
- 支援部落格（MDX）
- 支援 Google Calendar 預約（Cal.com / 自製 API）
- 支援受保護文章（Supabase Auth + RLS）
- 長遠導流到副品牌 shuyan.art（身心靈 / UIX）

## 技術棧（限制）
- Next.js 14 (App Router) + TypeScript
- TailwindCSS + shadcn/ui + lucide-react
- MDX + Contentlayer
- Supabase (Auth / DB / Storage) – Phase 2+
- 部署於 Vercel

## 輸出要求
- 回答請用繁體中文（程式碼可英文）
- 程式碼要附註解（繁體中文簡要解釋）
- 如果需要新增檔案，請遵守 `PROJECT_STRUCTURE.md`
- 若要更新文件，請放到 `/docs`，不要動程式碼資料夾

## 禁忌
- 不要亂改 Starter 已存在的檔案結構
- 不要引入未經確認的第三方套件
- 不要替換部署平台（固定 Vercel）