# CI 記憶點 — 8plus.app

*最後更新：2026-06-30 CST — **Phase 2.5 暫停**，視覺鎖定改由 Phase 3.0 討論取代*  
*用途：歷史錨點；新方向見 `.planning/phases/3.0-RESET-AND-DISCUSS.md`*

---

## 1. 單一真相來源（SSOT）

| 文件 | 角色 |
|------|------|
| `docs/CI_IDENTITY_SPEC.md` | 品牌定位、TA、Logo/Type/Color、H1–H6、網格 |
| `docs/HERO_DESIGN_STYLES.md` | 20 種 Hero 風格測試規格 |
| `.planning/phases/2.5-CI-APPLY-PLAN.md` | 分階套用順序與驗收 |

**動效實驗沙盒**：`/design-lab`（不影響首頁，除非明確晉升）

---

## 2. 已鎖定決策（勿重複争论）

> **⚠️ 2026-06-30 CST 起暫停執行** — 下列 L2–L4 視覺鎖定已重新開放討論；L1/L5–L7 品牌與 token 基礎仍參考。

| # | 決策 | 理由 | 狀態 |
|---|------|------|------|
| L1 | 品牌 = **架構驅動技術夥伴**，非 AI 外包 | CI 規格 + 使用者反饋 | ✅ 保留 |
| L2 | 主視覺 = **Logo Cinema**（光帶 + 銳利 logo），**禁氣泡粒子** | 使用者明確反感粒子 | ⏸ 重議 |
| L3 | 全站僅 **一個 signature 動效**（首屏 Canvas） | Awwwards 克制原則 | ⏸ 重議（新目標：每頁進階動效） |
| L4 | Hero **暗色島**；Hero 以下 **Cohere 白底** | CI §4、§7 觸點矩陣 | ⏸ 重議 |
| L5 | 設計主線 = **Cohere token**（22px、accent `#1863dc`） | 78% 合規基礎 | ✅ 保留作 DS 起點 |
| L6 | 不臨摹 Pinterest reference | 多次迭代皆不滿意 | ✅ 保留 |
| L7 | 粒子 / 霓虹 HUD 僅留 **design-lab** | 隔離實驗 | ✅ 保留 |

---

## 3. 已淘汰（勿復活除非使用者明確要求）

- Recognito 垂直分欄波浪
- NASA 霓虹 HUD + 掃描線主視覺
- Physics 氣泡粒子場
- Iridescent 字母 watermark 主導
- 首頁全頁 `LuminaShell` 強制 dark（改為僅包 Hero）

---

## 4. 現行實作快照（2026-06-30）

### Hero
- `components/home/hero-section.tsx` — 雙欄編輯排版 + metrics
- `components/home/hero-logo-cinema.tsx` — 光帶 canvas + logo 折色
- `components/home/lumina-shell.tsx` — 僅 **design-lab** 使用；首頁 Hero 不再強制 html dark

### 首頁 Hero 以下
- `ci-*` class（Cohere 白底卡片）；`aurora-*` 已清除
- `LuminaShell` 已自 Hero 移除；暗色僅 `.cinema-hero` 自帶

### 資產
- Logo SVG：`components/logo.tsx`（雙圓斜切）
- PNG：`public/logo-light-512.png`、`logo-mono-512.png`

### 路由
- `/` — Cinema Hero + Cohere 內容區
- `/design-lab?style=logo-cinema` — 預覽

---

## 5. 分階套用狀態

| Phase | 內容 | 狀態 |
|-------|------|------|
| **2.5-P0** | 記憶點 + 計畫文件 | ✅ 本文件 |
| **2.5-P1** | `text-h1`–`h6`、Logo token、Hero 暗色島隔離、`ci-*` 首頁下區 | ✅ 完成 |
| **2.5-P2** | 首頁全區 `aurora→ci`、pillar 用 H4 | ⏸ 暫停（2026-06-30 重置） |
| **3.0** | 設計感討論 → Motion + DS 契約 → 全站重構 | 🚧 DISCUSS |

**回滾規則**：每 Phase 獨立 commit；不滿意只 revert 該 commit。

---

## 6. 建議 Git 錨點

完成 P1 後建議執行：

```bash
git add .planning/CI_CHECKPOINT.md .planning/phases/2.5-CI-APPLY-PLAN.md docs/CI_IDENTITY_SPEC.md
git commit -m "docs: add CI checkpoint and phased apply plan (2.5-P0)"
# P1 完成後
git commit -m "feat(ci): phase 2.5-P1 typography tokens and hero light/dark split"
```

---

## 7. 驗收快檢（每 Phase 後）

- [ ] `pnpm typecheck && pnpm build`
- [ ] `/` 首屏：暗色 Cinema + 雙欄 RWD
- [ ] 滾動後：白底 Cohere 卡片（非 glass 暗色）
- [ ] 375px 無橫向溢出
- [ ] `prefers-reduced-motion` 可接受

---

*下次 session 先讀本文件 + `2.5-CI-APPLY-PLAN.md`，再動手。*
