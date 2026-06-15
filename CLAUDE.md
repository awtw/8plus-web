# 8plus Web Agent 指引

## 核心規則
- 中文解說 + 英文程式碼
- 紀錄皆含時間戳記
- 遵守 `.planning/PROJECT.md` 與 CONTENT_MODEL

## GSD 工作流
- `.planning/` 目錄管理階段、計畫、狀態
- 使用 `/gsd` 命令啟動工作流
- 先讀 `.planning/STATE.md` 了解當前進度
- 執行後更新 STATE.md

## BMAD 技能
- 安裝於 `_bmad/` 與 `.claude/skills/` (44 個 agent skills)
- 使用 bmad-help 探索可用 agents
- 透過 BMAD 流程: Brainstorm → PM → Architect → Dev → Review → Test → Commit

## Caveman 模式
- 預設使用 `lite` 級別壓縮輸出
- `/caveman` 切換模式
- `/caveman-review` 壓縮代碼審查
- `/caveman-commit` 壓縮提交訊息

## 可用技能快速參考
| 技能 | 觸發 | 用途 |
|------|------|------|
| GSD | `/gsd` | 階段化開發工作流 |
| BMAD | `bmad-*` skills | 多 Agent 開發方法論 |
| Caveman | `/caveman` | Token 壓縮節省開銷 |
| CaveCrew | `use cavecrew` | 子代理任務委派 |

## 驗證
- `pnpm build` — 建置驗證
- 遵循 Conventional Commits

---
*建立: 2026-06-15*
