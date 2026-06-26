# 8plus Web UX 優化分析與建議

- **紀錄時間戳記**：2026-06-26 16:15 CST（分析）/ 2026-06-26 17:05 CST（實作完成）
- **分析者**：Sally（BMAD UX Designer）
- **專案階段**：Phase 2.2 — Cohere Design System 導入（進行中，約 81%）
- **分析範圍**：全站導覽、關鍵頁面、主題系統、i18n、無障礙、轉換動線、內容探索

---

## 一、使用者情境與設計目標

### 核心使用者

| Persona | 目標 | 成功指標 |
|---------|------|----------|
| **潛在客戶** | 快速判斷 August 能否解決其架構/AI/UX 問題 | 3 分鐘內理解定位 → 進入 `/booking` |
| **技術讀者** | 透過 blog / projects 評估專業深度 | 找到相關文章或專案並讀完 |
| **社群訪客** | 從 IG/LINE 進入 `/share`，一鍵聯繫或預約 | 無干擾完成 email 複製 / QR / 預約 |
| **回訪者** | 切換語言或主題，持續閱讀 | 偏好設定被記住、體驗一致 |

### 設計目標（對齊 PROJECT.md）

> 展示專業能力、累積技術內容、讓潛在客戶直接預約諮詢的個人品牌網站。

本次分析以「**轉換動線清晰**」與「**全站體驗一致**」為兩條主軸，在 Phase 2.2 視覺重構收尾階段補齊互動與資訊架構缺口。

---

## 二、現況 UX 盤點

### 2.1 優勢（應保留並強化）

1. **Booking 轉換動線貫穿全站**  
   Header、Mobile Nav、首頁 Hero、About、Path、Services、Share 均導向 `/booking`，primary action 一致。

2. **視覺系統已 token 化**  
   `globals.css` 三套 design mode（cohere / apple / elevenlabs）+ light/dark，共用 `surface-card`、`brand-button-*` 等 utility。

3. **首頁漏斗結構合理**  
   Hero（我是誰）→ 能力支柱 → 內容預覽 → 底部 CTA，符合諮詢站敘事。

4. **行動導覽完整度高於桌面**  
   Mobile Sheet 含 Services、Theme、Language、Booking；桌面 header 反而較精簡。

5. **Share 頁產品化程度高**  
   Email 複製、社群 QR、design-mode 適配、雙語履歷下載，適合對外分享。

6. **動效有節制**  
   Framer Motion stagger + `prefers-reduced-motion` 全域降級（`globals.css` L658–666）。

### 2.2 痛點矩陣

| 嚴重度 | 類別 | 問題描述 | 影響使用者 |
|--------|------|----------|------------|
| 🔴 高 | i18n | 字典 `lib/i18n.ts` 存在但多頁 inline 文案；Services 僅中文；`html lang` 固定 `zh-Hant` | 英文使用者感到半成品 |
| 🔴 高 | 導覽 IA | 桌面無 Services；Path 硬編碼中英；Mobile/Desktop nav 來源不同步 | 找不到頁面、認知負擔 |
| 🔴 高 | 內容探索 | 首頁 blog/projects 各只預覽 1 則，無「查看全部」 | 技術讀者流失 |
| 🟡 中 | Share 體驗 | 仍套全站 header/footer，削弱 link-in-bio 沉浸感 | 社群訪客分心 |
| 🟡 中 | 可發現性 | Design mode 僅 logo 長按 550ms，零 onboarding | 多數使用者不知可切換 |
| 🟡 中 | a11y | 無 skip-to-main、無 active nav、focus 樣式不完整、QR modal 無 dialog 語意 | 鍵盤/螢幕閱讀器使用者 |
| 🟡 中 | 視覺一致 | Path 仍用 `glass-card`、窄於 `section-shell` 的 container | 設計系統收尾不完整 |
| 🟢 低 | Footer | 無站內連結、未 i18n | 次要動線斷裂 |
| 🟢 低 | Theme | Toggle 無法回到 system | 進階使用者困擾 |
| 🟢 低 | Booking 細節 | 底部卡中英混雜、Cal loading 固定英文 | 語言切換後體驗斷裂 |

---

## 三、優化方向（依影響力排序）

### P0 — 本輪必做（高影響 / 低風險）

#### P0-1：統一 i18n 管線

**問題**：雙軌翻譯（`t()` vs inline `isZh ? ... : ...`）導致維護成本與體驗不一致。

**建議**：
- 首頁、About、Path、Services、Footer、Booking 底部卡全面改用 `t()` / `tn()`
- `LanguageProvider` 同步更新 `document.documentElement.lang`（`zh-Hant` ↔ `en`）
- Blog 詳情日期依 locale 格式化，非固定 `zh-TW`

**驗收標準**：
- [x] 切換語言後全頁文案一致切換，無殘留中文/英文區塊（Services、Booking、Footer、首頁主要 CTA 已收斂）
- [x] `document.documentElement.lang` 與當前 locale 同步
- [x] Services 頁完整雙語

**涉及檔案**：`lib/i18n.ts`、`components/language-provider.tsx`、`app/layout.tsx`、`app/(site)/page.tsx`、`app/(site)/about/page.tsx`、`app/(site)/path/page.tsx`、`app/(site)/services/page.tsx`、`app/(site)/booking/page.tsx`、`components/site-footer.tsx`

---

#### P0-2：統一導覽資訊架構

**問題**：桌面與行動導覽項目不一致；Path 標籤硬編碼。

**建議**：
- 抽出共用 `navigation` 設定（含 `key`、`href`、`labelKey`）
- 桌面 header 決策：**加入 Services** 或明確文件化「Services 僅 mobile 可達」的產品決策
- Path 改用 `t('nav.path')`
- Footer 加精簡站內連結（About、Booking、Blog、Projects）

**驗收標準**：
- [x] Desktop / Mobile 導覽項目一致
- [x] 所有 nav 標籤來自 `lib/i18n.ts`（含 Path）
- [x] Footer 含站內連結

**涉及檔案**：`components/site-header.tsx`、`components/mobile-nav.tsx`、`components/site-footer.tsx`、`lib/i18n.ts`

---

#### P0-3：強化內容探索動線

**問題**：首頁內容預覽是死胡同，技術讀者需靠 nav 才能到列表頁。

**建議**：
- Blog / Projects 預覽區加「查看全部」secondary CTA → `/blog`、`/projects`
- Blog / Project 詳情頁底部加「相關推薦」或「預約諮詢」secondary CTA
- 考慮首頁預覽數量從 1 增至 2–3（視版面）

**驗收標準**：
- [x] 首頁內容區有明確 list 入口
- [x] 詳情頁有至少一個轉換或探索 CTA

**涉及檔案**：`app/(site)/page.tsx`、`app/(site)/blog/[slug]/page.tsx`、`app/(site)/projects/[slug]/page.tsx`

---

### P1 — 下一輪（中高影響）

#### P1-1：Share 頁獨立 layout

**問題**：全站 header 擠壓 link-in-bio 沉浸感。

**建議**：
- 為 `/share` 建立不含 `SiteHeader` / `SiteFooter` 的 route group layout
- 頁內保留「返回主站」輕量連結即可

**驗收標準**：
- [ ] `/share` 首屏無全站導覽列
- [ ] 仍可從頁內回到主站

**涉及檔案**：`app/(site)/share/layout.tsx`（新建）、`app/layout.tsx`

---

#### P1-2：Design mode 可發現性

**問題**：長按 logo 是唯一入口，零可發現性。

**建議**：
- 加 keyboard 路徑（例如 logo 旁 subtle chevron 或 Settings 圖示）
- Theme 選單顯示目前模式名稱（Classic / Paper / Studio）
- 首次訪問輕量 tooltip（`localStorage` dismiss）

**驗收標準**：
- [ ] 鍵盤使用者可切換 design mode
- [ ] 目前模式有可見標示

**涉及檔案**：`components/logo-theme-launcher.tsx`、`components/design-mode-provider.tsx`

---

#### P1-3：無障礙補強

**建議清單**：
- Skip-to-main 連結（`app/layout.tsx`）
- Nav `aria-current="page"`（依 `usePathname`）
- `brand-button-*` 加 `focus-visible:ring`
- Share QR overlay 改 Radix Dialog（`role="dialog"`、`aria-modal`、focus trap）
- Language switcher 補 `aria-label`、keyboard 導覽

**驗收標準**：
- [ ] Tab 鍵可跳過導覽直達 main
- [ ] 當前頁面在 nav 有可感知標示
- [ ] 所有互動元件有可見 focus 樣式

---

### P2 — 收尾打磨（中低影響）

#### P2-1：Path 頁視覺對齊

- 改用 `section-shell` container
- `glass-card` → `surface-card` / token-driven class
- 語氣收斂：「++ 組隊」等遊戲化文案與企業 command deck 定位對齊

**涉及檔案**：`app/(site)/path/page.tsx`

---

#### P2-2：Booking 頁細節

- Cal embed 高度改 `min-h` + `clamp()`，避免小螢幕過高
- Loading / 底部卡全面 i18n
- 隱藏「Cal.com ready」等內部狀態 chip

**涉及檔案**：`app/(site)/booking/page.tsx`

---

#### P2-3：Theme toggle 三態

- light → dark → system 循環
- 目前模式在 UI 有標示

**涉及檔案**：`components/theme-toggle.tsx`、`components/theme-provider.tsx`

---

## 四、使用者流程圖

### 4.1 潛在客戶轉換漏斗（現況 vs 建議）

```mermaid
flowchart TD
    A[進站] --> B{入口}
    B -->|首頁| C[Hero + 能力支柱]
    B -->|Share| D[Link-in-bio]
    B -->|Blog/Project| E[內容詳情]
    
    C --> F[底部 CTA / Header Booking]
    D --> G[預約 CTA]
    E --> H{現況}
    H -->|無 secondary CTA| I[需自行找 Booking]
    H -->|建議| J[詳情頁預約 CTA]
    
    F --> K[/booking]
    G --> K
    J --> K
    I -.->|流失風險| L[離開]
    
    K --> M[Cal.com 嵌入]
    M --> N[預約完成 ✓]
```

### 4.2 內容探索動線（建議補強）

```mermaid
flowchart LR
    HP[首頁] -->|現況：僅預覽 1 則| BL[Blog 單篇]
    HP -->|現況：僅預覽 1 則| PR[Project 單篇]
    HP -.->|建議：查看全部| BList[/blog 列表]
    HP -.->|建議：查看全部| PList[/projects 列表]
    BList --> BDetail[文章詳情]
    PList --> PDetail[專案詳情]
    BDetail -.->|建議| BK[/booking]
    PDetail -.->|建議| BK
```

---

## 五、執行路線圖建議

| 週次 | 任務包 | 對應 Phase |
|------|--------|------------|
| **W1** | P0-1 i18n 統一 + P0-2 導覽對齊 | 2.2-D 收尾 |
| **W2** | P0-3 內容探索 CTA + P2-1 Path 視覺對齊 | 2.2-D 收尾 |
| **W3** | P1-1 Share layout + P1-3 a11y 基礎 | 2.2 驗收前 |
| **W4** | P1-2 Design mode 可發現性 + P2-2/P2-3 打磨 | Phase 3 前 |

> 與 `UIX_REDESIGN_PLAN.md` 對齊：Phase 2.2-D「其餘頁面收斂」完成後，以本文件 P0 項作為進入 Phase 3（next-intl 遷移）前的 UX 閘門。

---

## 六、設計原則（本輪決策準則）

1. **轉換優先**：任何改動不得削弱 Booking 動線的可見性與可點性。
2. **一致勝過炫技**：寧可全站統一白底企業風，不留單頁 glass/遊戲化語氣。
3. **雙語同等品質**：英文不是「附贈」，每個可見字串都應可翻譯。
4. **漸進可驗證**：P0 → P1 → P2 分批交付，每批 `pnpm build` + 手動走查。
5. **隱藏功能需有替代路徑**：Design mode 長按保留，但必須有 keyboard / 視覺入口。

---

## 七、待產品決策事項

| # | 問題 | 選項 | 建議 |
|---|------|------|------|
| D1 | Services 是否上桌面 nav？ | A) 加入 header B) 維持僅 mobile | **A** — IA 一致 |
| D2 | Share 是否完全隱藏全站殼層？ | A) 獨立 layout B) 精簡 header | **A** — link-in-bio 最佳實踐 |
| D3 | 首頁內容預覽數量？ | A) 維持 1 B) 增至 2–3 | **B** — 提升探索意圖 |
| D4 | Path 語氣收斂程度？ | A) 保留個性 B) 全面企業化 | **B** — 與全站定位對齊 |

---

## 八、關鍵檔案索引

| 檔案 | 用途 |
|------|------|
| `components/site-header.tsx` | 桌面導覽、Booking CTA |
| `components/mobile-nav.tsx` | 行動導覽（較完整） |
| `components/site-footer.tsx` | 頁腳（待補 nav + i18n） |
| `components/design-mode-provider.tsx` | Design mode + URL sync |
| `components/logo-theme-launcher.tsx` | 隱藏式 theme 切換 |
| `components/language-switcher.tsx` | 語言 dropdown |
| `lib/i18n.ts` | 翻譯字典（待充分使用） |
| `app/layout.tsx` | 固定 `lang`、全站 shell |
| `app/(site)/page.tsx` | 首頁 CTA + 內容預覽 |
| `app/(site)/services/page.tsx` | 僅中文、無 i18n |
| `app/(site)/booking/page.tsx` | 中英混雜區塊 |
| `app/(site)/share/page.tsx` | Link-in-bio 體驗 |
| `app/(site)/path/page.tsx` | 視覺/語氣待收斂 |
| `styles/globals.css` | Design token、響應式、a11y motion |

---

## 九、相關文件

- `.planning/UIX_REDESIGN_PLAN.md` — Phase 2.2 視覺重構計劃
- `.planning/STATE.md` — 專案狀態與討論紀錄
- `docs/uix-theme-routing-log-2026-06-26.md` — Theme 路由與 token 重構日誌
- `.planning/PROJECT.md` — 專案需求與決策

---

*記錄人：Sally（BMAD UX Designer）*
*下次複審建議：P0 三項完成後或 Phase 3 啟動前*
