# 8plus Web — 前衛化升級評估與執行計畫

> 建立：2026-09-30 CST ｜ 分支：`feature/claude/2026-07-v3` ｜ 狀態：DRAFT，待使用者選定方向
> 依據：repo 現況盤點 + 2026 市場趨勢搜尋（來源見文末）+ `.planning/PROJECT.md` / v2 CI

---

## 1. 現況診斷（2026-09-30）

| 面向 | 現況 | 評語 |
|---|---|---|
| 技術底 | Next.js 16 / React 19 / GSAP / framer-motion / Velite MDX / 自製 i18n | 底子夠，不需換框架 |
| 視覺 | v2 CI：藍↔橘交替色場、可切換 21 種 hero canvas/SVG、noise field | 已具辨識度，**首頁完成**；內頁 about/services/path/lab/booking 已套 v2 |
| 路由 | `/` `/about` `/lab` `/path` `/services` `/booking` `/blog` `/sb` `/sc` | `/projects` 併入 lab；`/contact` 併 booking |
| 內容 | 15 專案（雙語）、8 篇 blog（雙語，多為 2025 舊稿 + 5 篇 2026-06） | **內容量是最大短板**，不是視覺 |
| 互動 | Hero 切換、scroll reveal、tilt | 缺「讓訪客動手玩／自助評估」的互動 |
| 轉換 | Cal.com 內嵌預約、LINE | 缺中間階梯（低承諾入口） |
| 已知債 | `section-hero.tsx` 孤兒、Blog 已離開首頁、next-intl 未遷、動效 reduced-motion 需全面驗 | 見 `I18N-SSR-EVALUATION-2026-09-30.md` |

**核心判斷**：視覺已夠「大膽」。要「前瞻 + 市場主流」，缺口在 ① 互動深度 ② 內容證據力 ③ AI 時代可被發現性 ④ 手機專屬體驗 ⑤ 效能／無障礙護欄。

---

## 2. 市場趨勢 → 適用度評估

| 趨勢（2026） | 適用於 8plus？ | 決策 |
|---|---|---|
| Scroll 敘事、cinematic reveal | ✅ 已有基礎 | 深化，加 pin/scrub 章節，手機降級 |
| 微互動當「可用性層」（確認、hover、狀態） | ✅ 高 CP 值 | 全站統一 motion token |
| 空間感 UI（卡片有重量、可堆疊、magnetic） | ✅ | 卡片/CTA 加 magnetic + tilt（桌機）、press 回饋（手機） |
| 3D / WebGL 產品展示 | ⚠️ 選擇性 | 只放 Hero 一處（R3F 或現有 canvas），lazy load；不全站鋪 |
| 表現主義排版 / 新粗獸 | ✅ | 可變字型 + 超大標題 + 文字遮罩，維持 CI 色 |
| Gamified / 互動式作品集 | ✅ 差異化重點 | 「架構診斷器」「技術棧探索器」（見 §4） |
| AI 個人化、AI 助理嵌入 | ✅ 契合 AI 導入定位 | Ask-8plus 助理（RAG 限站內內容）＋預約前置問答 |
| Outcome 導向文案 + 具體數字 + 可信證據 | ✅ 必做 | Case study 改「問題→做法→成果數字」 |
| GEO（生成式引擎優化） | ✅ 必做、低成本 | `llms.txt`、結構化資料、FAQ schema、答案式段落 |
| View Transitions API（頁面轉場） | ✅ | Next 16 可用；路由間共享元素轉場 |
| 暗黑模式 / 主題 | ⚠️ 已決定全站 dark 曾關 ThemeToggle | 保持 CI 色場，不另加 |
| AR/VR、語音 UI | ❌ | 不做，投報低 |

---

## 3. 設計方向：「Editorial-Tech 2.0」

一句話：**雜誌級排版 × 工程儀表板質感 × 有節制的動態**（承接 v2 CI，不推倒重來）。

設計原則
1. **一頁一個「哇」**：每頁只允許一個招牌互動（Hero 切換、Lab 篩選、Path 時間軸 scrub…），其餘克制。
2. **證據優先**：每個主張旁邊必須有數字、截圖、或專案連結。
3. **手機不是縮小版**：手機有獨立互動語彙（手勢、底部導覽、拇指區 CTA）。
4. **動效有 token**：duration / easing / stagger 統一定義；`prefers-reduced-motion` 全面尊重。
5. **克制型 AI 感**（沿用 2026-06-30 domain research 結論）：不做 AI 俗套漸層 + 星星圖示。

新增視覺語彙
- **Kinetic Type**：Hero 主標可變字重隨滑鼠/捲動變化（手機改隨捲動）。
- **Cursor 語境化**（桌機）：游標依區塊變形（「查看」「拖曳」「預約」）。
- **Bento 2.0**：Services / Lab 用大小混排 bento，卡片內含迷你 live demo。
- **Marquee 信任條**：客戶/技術棧無限捲動，hover 暫停。
- **Section 轉場**：色場交界用 clip-path / mask 擴張，而非硬切。

---

## 4. 互動功能清單（依價值/成本排序）

### P0 — 高價值、低成本
| # | 功能 | 說明 | 位置 |
|---|---|---|---|
| I1 | **Motion token + reduced-motion 全面化** | 統一動效參數，尊重系統設定 | 全站 |
| I2 | **View Transitions 頁面轉場** | 列表卡片 → 詳情頁共享元素 | lab / blog |
| I3 | **Command Palette（⌘K / 手機 FAB 搜尋）** | 站內搜尋 + 快速跳轉 + 直接「預約」 | 全站 header |
| I4 | **Lab 篩選器 + 即時排序** | 依領域/技術棧/年份 tag 過濾，URL 同步 | `/lab` |
| I5 | **Sticky CTA（手機底部）** | 拇指區「預約諮詢 / LINE」，捲動方向智慧隱現 | 全站手機 |
| I6 | **閱讀進度 + 目錄 + 預估時間** | Blog / Lab 詳情 | detail |

### P1 — 差異化招牌
| # | 功能 | 說明 |
|---|---|---|
| I7 | **架構健檢 Quiz（3 分鐘）** | 5–7 題（團隊規模、痛點、技術棧、時程）→ 產出建議服務組合 + 一頁摘要 → 導向預約並**預填**資訊。同時是 lead magnet |
| I8 | **服務報價估算器** | 選範疇/期程滑桿 → 顯示區間與交付物；降低詢問門檻 |
| I9 | **Ask 8plus 助理** | 限定站內內容 RAG（文章/專案/服務），回答附來源連結；不能亂答，超出範圍導預約 |
| I10 | **Path 時間軸 scrub** | 職涯沿時間線 pin + scrub，手機改水平 snap 卡片 |
| I11 | **Lab 卡片內 mini demo** | 例：QR-Beam、架構圖可互動縮放 |

### P2 — 錦上添花
- I12 技術棧探索圖（節點圖，點擊看相關專案）
- I13 Hero 隨機視覺「記住上次」+ 可分享連結
- I14 Easter egg（Konami / 點擊 Logo 的 % 變形）
- I15 預約前 Micro-survey 與行事曆時區偵測

---

## 5. 內容需求（市場主流 B2B 顧問站必備）

| 內容 | 現況 | 目標 | 優先 |
|---|---|---|---|
| **Case study（成果導向）** | 3 篇升級版 | 6–8 篇，格式：背景→挑戰→做法→**數字成果**→客戶語錄；附架構圖 | P0 |
| **信任條/客戶 logo/推薦語** | TrustBar 元件已有，資料少 | 至少 5 組真實可公開推薦（可匿名化行業＋職稱） | P0 |
| **服務頁 FAQ + 流程 + 交付物** | FAQ 已有 | 加「常見迷思」「適合/不適合」誠實清單 | P0 |
| **AI 導入專題** | 1–2 篇 | 系列 6+ 篇（RAG 落地、評估、成本、資安、內部 Agent） | P1 |
| **技術文章更新節奏** | 2025 舊稿為主 | 每月 1–2 篇；舊稿加「最後更新」或下架 | P1 |
| **資源/下載（lead magnet）** | 無 | Checklist（程式碼審查、AI 導入 readiness）PDF，換 email 或直接下載 | P1 |
| **影片/動態 demo** | 無 | 每個招牌專案 30–60 秒無聲循環 mp4/webm（手機可播） | P1 |
| **About 人設** | 已豐富 | 加「工作方式」「價值觀」「不做什麼」 | P2 |
| **Newsletter / RSS** | RSS 有 | 加 email 訂閱（Resend/Buttondown） | P2 |
| **英文版一致性** | 雙語 MDX | 新內容同步雙語；hreflang 完整 | P0 |

文案公式（首屏 & 各服務）：**[幫誰] + [解決什麼問題] + [可量化結果]**。避免抽象形容詞。

---

## 6. 手機體驗專章

手機目標：LCP < 2.5s、INP < 200ms、CLS < 0.1；單手可操作；不靠 hover。

1. **導覽**：底部固定 tab（首頁/Lab/服務/預約）+ ⌘K 換成搜尋 FAB；漢堡選單保留次要頁。
2. **手勢**：Lab / Path 使用水平 snap 卡片；下拉不攔截瀏覽器手勢。
3. **動效降級**：pin/scrub 只在 ≥1024px；手機用 IntersectionObserver 單次 reveal；重 canvas Hero 手機限幀（30fps）並在 `saveData` / 低電量時改靜態圖。
4. **觸控目標** ≥ 44px；CTA 放拇指區；表單用正確 `inputmode` / `autocomplete`。
5. **資源**：圖片全 AVIF/WebP + `sizes`；影片用 `preload="none"` + poster；字型子集化 + `font-display: swap`；Hero canvas 動態 import。
6. **PWA 輕量化**（可選）：manifest + 離線名片頁（`/sb` `/sc`），可加到主畫面。
7. **真機驗證清單**：iPhone SE / 15、Pixel、Safari 底部工具列 vh 問題（用 `dvh`）、橫向、動態字級。

---

## 7. 護欄（不做會反噬）

- **效能預算**：首頁 JS ≤ 200KB gz（不含 lazy chunk）；Hero 重內容延後載入；Lighthouse 手機 ≥ 90。
- **無障礙**：WCAG 2.2 AA；reduced-motion；鍵盤可操作所有互動；焦點可見；色場對比檢查（藍/橘場上的文字）。
- **GEO/SEO**：`llms.txt`、Person/Organization/Service/Article/FAQ JSON-LD、答案式段落標題、OG 圖每頁自動生成、sitemap/hreflang。
- **隱私**：Quiz / 助理不存個資；分析用 Plausible/Umami（無 cookie）；助理禁止外洩非公開內容。
- **維護成本**：招牌互動 ≤ 3 個同時維護；其餘用共用元件。

---

## 8. 分階段路線圖

| 階段 | 週期 | 內容 | 驗收 |
|---|---|---|---|
| **A. 基礎與護欄** | 1 週 | Motion token、reduced-motion、效能預算、a11y 色場檢查、清孤兒檔、Analytics | `pnpm build`、Lighthouse 手機 ≥ 90 |
| **B. 手機優先改造** | 1–1.5 週 | 底部 tab/Sticky CTA、水平 snap、Hero 降級、真機驗證 | 手機 CWV 綠燈；真機清單通過 |
| **C. 內容證據力** | 2 週（可與 B 並行） | 3–5 篇 case study、推薦語、Services 強化、AI 系列前 2 篇、影片 demo | 每個服務有對應 case study |
| **D. 互動招牌 I** | 1.5 週 | ⌘K、Lab 篩選、View Transitions、閱讀進度 | 主要流程無回歸 |
| **E. 轉換機器** | 1.5 週 | 架構健檢 Quiz、報價估算器、預約預填、lead magnet | Quiz→預約漏斗可量測 |
| **F. AI 助理 + GEO** | 2 週 | Ask 8plus（RAG）、`llms.txt`、JSON-LD 補齊 | 助理只答站內、附來源 |
| **G. 精緻化** | 持續 | Kinetic type、cursor、mini demo、Path scrub | — |

建議順序：**A → (B ∥ C) → D → E → F → G**。若只能先做一件事：**C + B**（內容與手機），投報最高。

---

## 9. 待使用者決策

1. **目標客群優先序**：企業客戶（重信任/案例）vs 新創/個人（重互動/價格透明）？影響 E 的估算器深度。
2. **是否上 AI 助理（I9）**：需 LLM API 費用與內容治理；建議先做 Quiz，助理放後。
3. **3D / WebGL**：是否接受只放 Hero 一處？
4. **真實案例可公開程度**：可否署名客戶？決定 case study 寫法（署名 / 匿名化）。
5. **next-intl 遷移時機**：建議在 A 完成後、D 之前處理（View Transitions 與路由結構相關）。
6. **內容產能**：每月可投入幾篇文章？決定 C/AI 系列節奏。

---

## 10. 資料來源

- [Portfolio design trends for 2026 — Envato](https://elements.envato.com/learn/portfolio-trends)
- [Top Web Design Trends for 2026 — Figma](https://www.figma.com/resource-library/web-design-trends/)
- [Web Design Trends 2026: The Definitive Guide — Line25](https://line25.com/articles/web-design-trends-2026/)
- [14 Web Design Trends 2026 — UX Pilot](https://uxpilot.ai/blogs/web-design-trends-2026)
- [15 B2B Website Best Practices for 2026 — Directive](https://directiveconsulting.com/blog/15-b2b-website-best-practices-for-2026-built-for-buyers-not-just-browsers/)
- [Improve Your Consulting Website Conversion Rate in 2026 — SCG](https://www.schmidtconsulting.group/blog/consulting-website-conversion/)
- 內部：`.planning/research/domain-8plus-web-copy-motion-modernization-research-2026-06-30.md`、`.planning/UX-OPTIMIZATION-REVIEW.md`、`.planning/I18N-SSR-EVALUATION-2026-09-30.md`
