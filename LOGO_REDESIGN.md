# Logo 重新設計完成

**時間戳記**: 2026-06-15

## 2026-06-16 12:37 CST — 附圖百分比幾何風格版本

### 本次需求

使用者提供單張黑白 `%` 風格 Logo 參考圖，要求替換成類似風格，且涵蓋 favicon。

### 本次設計方向

新的版本改為更接近參考圖的高對比百分比幾何語彙：

1. **透明底黑色符號**：網站 header 使用透明底，讓黑色符號直接融入現有導覽列。
2. **左上小圓 / 右下大圓**：保留參考圖的大小圓對比與視覺重心。
3. **厚斜槓**：用粗斜切幾何塊連接兩端，形成 `%` 的高辨識 silhouette。
4. **白底 favicon**：favicon / apple / OG 資產使用白底黑符號，確保在分頁列與系統捷徑的小尺寸下仍清楚。

### 本次更新檔案

- `components/logo.tsx`
- `public/logo-new.svg`
- `public/logo-mono.svg`
- `public/logo-light.svg`
- `public/favicon.svg`
- `public/favicon.ico`
- `public/og/8plus.svg`

### 驗證結果

- ✅ `pnpm typecheck` 通過
- ✅ `pnpm build` 通過
- ✅ 2026-06-16 12:37 CST — Google Chrome headless fallback 檢查桌機與行動首屏
- ✅ favicon metadata 確認指向 `/favicon.svg`，並同步產生 `public/favicon.ico`

### 截圖證據

- `.planning/logo-percent-desktop-2026-06-16.png`
- `.planning/logo-percent-mobile-2026-06-16.png`

## 設計理念

目前 Logo 設計遵循「極簡、高對比、符號化」的品牌定位，採用類百分比的抽象幾何設計：

### 核心元素
1. **類百分比符號**：使用左上小圓、右下大圓與厚斜槓建立高辨識 silhouette。
2. **8plus 的抽象化**：不直接寫出 `8+`，而是用 `%` 形式傳達比例、增長、加值與數字感。
3. **小尺寸可讀性**：favicon 使用白底黑符號，確保 16px / 32px 仍能辨識主形。

### 色彩方案
- **主色調**：黑色符號 (#050505) + 透明背景，適用網站 header。
- **白底版本**：白色背景 (#FFFFFF) + 黑色符號 (#050505)，適用 favicon / apple / OG。
- **反色版本**：白色符號 + 透明背景，適用深色或影像背景。

## 創建的檔案

### 1. 主要 Logo 檔案
- `public/logo-new.svg` - 白底黑符號版本 (100x100)
- `public/logo-mono.svg` - 透明底黑符號版本
- `public/logo-light.svg` - 透明底白符號版本

### 2. Favicon
- `public/favicon.svg` - 白底黑符號 favicon
- `public/favicon.ico` - 16 / 32 / 48px 多尺寸 favicon

### 3. React 元件更新
- `components/logo.tsx` - 支援多種變體：
  - `default` - 主要版本
  - `mono` - 單色版本
  - `light` - 反色版本
  - `favicon` - 簡化版

## 使用方式

### 基本使用
```tsx
import { Logo } from "@/components/logo";

// 主要版本
<Logo size={32} />

// 單色版本
<Logo size={32} variant="mono" />

// 反色版本
<Logo size={32} variant="light" />

// Favicon 版本
<Logo size={32} variant="favicon" />
```

### 在 Header 中的使用
```tsx
<Logo size={32} className="h-8 w-8" />
```

## 響應式設計

新的 Logo 設計支援從 16px 到 512px 的各種尺寸：
- **16-32px**：適用於 favicon 和小圖標
- **32-64px**：適用於網站 header 和導航
- **64-128px**：適用於社群媒體頭像
- **128-512px**：適用於印刷品和大型展示

## 技術特點

1. **純 SVG 格式**：確保在任何解析度下都保持清晰
2. **向後兼容**：保留原有的 `size` 和 `className` 屬性
3. **多變體支援**：根據不同使用場景提供最適合的版本
4. **無依賴**：不依賴外部字型或圖標庫

## 測試結果

✅ 2026-06-16 12:37 CST — `pnpm typecheck` 通過  
✅ 2026-06-16 12:37 CST — `pnpm build` 通過  
✅ 2026-06-16 12:37 CST — 桌機 / 行動版首屏截圖檢查通過  
✅ 2026-06-16 12:37 CST — favicon SVG 與 ICO 皆已更新

## 後續建議

1. **視覺測試**：在實際網站中預覽新 Logo 的效果
2. **用戶反饋**：收集目標用戶對新設計的意見
3. **品牌一致性**：確保新 Logo 與其他品牌元素協調
4. **性能優化**：SVG 檔案大小已優化，無需進一步壓縮
