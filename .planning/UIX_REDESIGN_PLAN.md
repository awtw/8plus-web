# 8plus Web Cohere Design System 重構計劃

- **紀錄時間戳記**：2026-06-26 13:43 CST
- **專案狀態**：執行中
- **目標**：把 8plus Web 從舊版漸層個人品牌站，重構成 Cohere 風格的企業級 command deck

---

## 一、 設計依據

本次重構以 `design_system/cohere` 為單一設計來源，核心規則如下：

1. **白底畫布 + 冷灰邊框**
   - 主背景採純白，區塊分隔使用冷灰邊框與極低陰影。
   - 版面重心靠留白與層次，不靠霓虹 glow 或厚重 glassmorphism。
2. **22px signature radius**
   - 所有主要卡片、容器、圖片與 CTA 統一使用 22px 圓角語彙。
   - 小型控制元件可維持 8px，但主視覺容器不能回到散亂的預設圓角。
3. **字體分工**
   - Display 標題承擔品牌聲音，Body/UI 承擔功能閱讀。
   - 舊版 `Inter` / `bg-slate-*` 風格會逐步退場。
4. **單一互動強調色**
   - `--accent` 僅用在 hover、focus、主要 CTA 與少數提示。
   - 不再使用多色漸層作為常態裝飾。

---

## 二、 重構原則

- 先改**底層 token 與共用殼層**，再改頁面內容。
- 先確保**首頁首屏與導航**一致，再逐頁收斂 about / path / blog / projects / booking。
- 保留現有內容資料源與功能流程，不在這一輪偷換資訊架構。
- 以「可逐步替換」為原則，避免一次性大爆改造成驗證困難。

---

## 三、 執行切分

### Phase 2.2-A: token 與全站基底

**範圍**
- `styles/globals.css`
- `tailwind.config.js`
- `tailwind.config.ts`（若仍被引用，需同步）
- `app/layout.tsx`

**目標**
- 把 shadcn 的背景/文字/邊框 token 對齊 design system。
- 讓 body、container、selection、scrollbar、focus ring 具有 Cohere 語氣。
- 先消滅舊版 aurora/glass 外觀在全站的主導感。

**驗收**
- 首頁與子頁都能在不改頁面內容的前提下，看到更一致的白底企業風格。
- 深色模式仍可用，且不會破壞可讀性。

### Phase 2.2-B: 共用殼層

**範圍**
- `components/site-header.tsx`
- `components/site-footer.tsx`
- `components/mobile-nav.tsx`
- `components/language-switcher.tsx`
- `components/theme-toggle.tsx`

**目標**
- 將導覽列、語言切換、主按鈕、頁尾改成低噪音、高對比、穩定節奏。
- 讓 header/footer 成為新的品牌框架，而不是裝飾層。

**驗收**
- 桌機與手機導覽一致。
- Booking CTA 與語言切換可維持清晰、可點、可辨識。

### Phase 2.2-C: 首頁重構

**範圍**
- `app/(site)/page.tsx`

**目標**
- 把首頁從彩色 bento / glass 主視覺改成 Cohere 風格的 command deck。
- 首屏聚焦「我是誰、能解什麼問題、有哪些證據、下一步怎麼聯繫」。
- 以少數高品質卡片呈現最新文章、代表專案、服務入口與預約 CTA。

**驗收**
- 首頁在 1440px 與 mobile 下都能清楚傳達品牌定位。
- 最新內容與預約動線一眼可見。

### Phase 2.2-D: 其餘頁面收斂

**範圍**
- `app/(site)/about/page.tsx`
- `app/(site)/path/page.tsx`
- `app/(site)/blog/**`
- `app/(site)/projects/**`
- `app/(site)/services/page.tsx`
- `app/(site)/booking/page.tsx`
- `app/(site)/share/page.tsx`

**目標**
- 把所有頁面從舊視覺語彙收斂到同一套 token。
- 優先保留資訊密度，再調整顏色、卡片、按鈕與分段節奏。

**驗收**
- 沒有單頁保留完全不同的視覺語言。
- 內容頁可讀性優先於視覺炫技。

---

## 四、 這次先做什麼

1. 先完成 token / body / container 基底。
2. 再改 header、footer、mobile nav 與互動元件。
3. 重新寫首頁首屏與主卡片。
4. 驗證 `pnpm typecheck`、`pnpm build`，必要時補跑本機頁面檢視。

---

## 五、 風險與注意事項

- 舊頁面大量依賴 `glass-card` 與 `gradient-border-card`，所以全站改版最好先重定義這些共用 class，再逐頁拆除。
- 現有功能頁很多，不能只改首頁就宣告完成。
- `@8plus/ui` 與 `next.config.mjs` 已有未提交變動，這次只會沿著目前方向繼續，不會回捲它們。

---

## 六、 目前進度

- [x] 讀取 `design_system/cohere` 並確認設計語言
- [x] 完成重構切分與順序規劃
- [x] token / globals 對齊
- [x] header / footer / nav 重新整理
- [x] 首頁重構
- [x] 其餘高曝光頁面收斂
- [ ] `path` 頁面第二輪收斂
- [x] `/share` social media 頁面三種設計模式實作
- [x] 驗證與修正

---
*記錄人：Codex*
