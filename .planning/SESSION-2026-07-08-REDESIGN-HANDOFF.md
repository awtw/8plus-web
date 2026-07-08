# Session 紀錄 — 改版方向定案 + 設計師交手 Brief

*建立：2026-07-08 12:05 CST*
*類型：策略對話 / 決策定案 / 交付文件產出*
*參與：August Wang × Claude (Cowork)*

---

## 0. 對話起點

使用者提出：想重新設計整個網站（design system / logo / animation / 內容）並重新部署，要求先閱讀 `.planning/` 與 `docs/` 全部文件後，綜合給出「該如何做」的建議。

---

## 1. 診斷結論

閱讀全部核心文件（PROJECT、STATE、ROADMAP、CI_IDENTITY_SPEC、DESIGN_SYSTEM_SPEC、BRAND_EXPERIENCE_SPEC、UIX_REDESIGN_PLAN、LOGO_REDESIGN、HERO_CHECKPOINT、CONTENT_INVENTORY、StoryAboutMe、git log）後判斷：

- **真正的問題不是「設計不好」，而是設計決策 churn（反覆推倒重來）。**
  - STATE.md Discussion Log 顯示 2026-07-06 一天內近 10 次 Hero 重啟；`design-lab/` 累積 15+ 方向幾乎全被否決。
- **三套互相衝突的 design system 同時存在，無單一 SSOT**：
  1. Cohere 白底 / 冷灰 / 單一藍 accent（CI_IDENTITY_SPEC、UIX_REDESIGN_PLAN）
  2. CI 雙色 IKB 藍 `#002FA7` + Pantone 橘 `#FE5000`，單一版本（DESIGN_SYSTEM_SPEC v2，最新 ACTIVE）
  3. Cinema 暗底 + 線框握手 scroll 六章（BRAND_EXPERIENCE_SPEC，標 LOCKED）
  - 首頁 Hero 現為 Editorial 白底雜誌（W1 DRAFT），與 #2 藍橘衝突，文件自標「待決策」。
- **已穩定、不需再動**：品牌定位（Architecture-led Engineering Partner）、TA 三類、內容（14 篇雙語 blog + 15 專案）、技術棧（Next.js 16 + Velite + i18n + framer/gsap/r3f，Vercel 部署）。

---

## 2. 本 Session 鎖定的決策（LOCKED）

| 決策項 | 選定 | 說明 |
|--------|------|------|
| **Design System SSOT** | **CI 雙色藍橘** | `DESIGN_SYSTEM_SPEC v2`（IKB 藍 `#002FA7` + Pantone 橘 `#FE5000`，單一版本、section 交替律動）為唯一真相。Cohere 與 Cinema 兩套改標 SUPERSEDED，連同 `design-lab/*` 一併清除。 |
| **Hero / 全站動效** | **單一克制 signature** | 只有首頁 Hero 一個重動效（scroll pin + scrub 進場）；內頁只做輕量 reveal；禁止再開多款選型牆；`prefers-reduced-motion` 靜態降級。 |

---

## 3. 建議執行藍圖（依序，每階段可 build 驗證）

- **階段 0 — 鎖死 SSOT、砍衝突源**：DESIGN_SYSTEM_SPEC v2 標唯一真相；其餘兩份 spec 標 SUPERSEDED；移除 `DesignModeProvider`/`LogoThemeLauncher`（已 no-op）、刪 `design-lab/*`、`tailwind.config.js`/`.ts` 擇一、globals.css 只留 `.bg-blue`/`.bg-orange`/`.bg-dark`。
- **階段 1 — Logo 定案**：藍橘配色下單一版本（白 mark 走 `--logo-mark`），清多餘變體，只留 header/footer、favicon、OG、mono。
- **階段 2 — Hero 收斂為一個**：Editorial 白底 或 藍底 handshake 二選一並刪另一；單一 signature scroll 動效。
- **階段 3 — 全站頁面收斂到藍橘 token**：about/services/blog/booking/path/lab 逐頁換掉舊色，內頁只留輕量 reveal。
- **階段 4 — 內容潤飾（非重寫）**：對齊「架構先行／AI 落地／體驗交付」語氣。
- **階段 5 — 部署**：`pnpm build` → 合併 `feature/claude/2026-07-v3` 進 `main` → Vercel 自動部署；上線前確認 design-lab 已移除、sitemap/robots 乾淨。

---

## 4. 本 Session 產出

- ✅ **`docs/DESIGN_HANDOFF_BRIEF.md`** — 設計師交手 Brief + IA（完整包）
  - 內容：專案背景、品牌定位與三支柱、TA 三類、已鎖定設計決策（§4 護欄：藍橘色值/字體/22px/單一動效/禁用清單）、IA sitemap 與導覽、首頁 section 律動、9 頁逐頁 brief、內容素材清單、設計師 deliverables、RWD/A11y、Design→Dev 交手流程、待確認開放問題、站內文件對照附錄。
  - 交付格式：Markdown。

---

## 5. 待決策 / 下一步

- [ ] 是否執行「階段 0」把 codebase 清成乾淨的藍橘單一基底（讓設計稿一回來即可進場）
- [ ] Hero 主視覺方向：握手/線框手隱喻 vs 純字體+幾何（建議設計師提 1–2 案，不再開選型牆）
- [ ] 藍橘交替比例：硬交替 vs 藍為主橘作強調
- [ ] Hero 底色：純藍 vs 暗底 `#0A0E1A`
- [ ] `/sb` `/sc` 是否沿用主站藍橘 vs 保留獨立深底 Link-in-Bio 風格

---

*本紀錄為 2026-07-08 改版方向 kickoff 的單一真相來源；後續執行請更新 STATE.md 與相關 spec。*
