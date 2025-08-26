# Cursor 規則檔案

## 任務
Cursor 是主要的「程式碼執行助手」。  
請遵守以下規則，以避免破壞專案一致性。

## 檔案結構
- 依照 `docs/PROJECT_STRUCTURE.md`
- `app/`, `components/`, `content/`, `lib/`, `styles/`, `public/` → 可修改
- `docs/` 內的 `.md` 文件 → 不要修改，僅參考
- `.env.example` → 只在需要新增環境變數時更新

## MDX 驗證規則
- `content/posts/*.mdx` 必須有：
  - `title`, `date`, `summary`, `slug`, `published`
- `content/projects/*.mdx` 必須有：
  - `title`, `slug`, `summary`, `published`
- 若有 `protected: true` → 提醒作者要將文章內文放 Supabase

## 開發流程
1. 本地執行 `pnpm dev` 必須能跑
2. PR 前必須通過：
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm build`
   - Contentlayer 驗證
3. Commit Message 格式：
   - `feat: ...`
   - `fix: ...`
   - `chore: ...`
   - `docs: ...`

## 驗收標準
- Lighthouse Mobile 分數 ≥ 90
- Booking 頁面能正常嵌入 Cal.com
- Blog / Projects 頁面能正常渲染 MDX
- 若涉及 Supabase → 驗證 Auth / RLS 正常