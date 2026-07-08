# Hero 主視覺方向 R3 — 15 動畫 Demo

*建立：2026-07-06 11:23 CST*  
*作者：Sally · UX Designer*  
*狀態：待使用者選型*  
*預覽：`/design-lab/directions`（`/design-lab` 同址）*

---

## 背景

使用者對 Blue Meridian、V05 滿版 Lab 等方向皆不滿意。R3 重新整理 **15 個可動預覽卡**，涵蓋已探索過的 CI 語意組合，降低一次只看一個 Lab 的試錯成本。

---

## 15 方向一覽

| ID | 中文 | 動效關鍵 | 主資產 |
|----|------|----------|--------|
| **D01** | 方塊橋接 | 方塊場 + 紅黑上下 reach | square_line + red_black |
| **D02** | 半調裂合 | handshake 左右拆 + 線框浮現 | handshake + whiteline |
| **D03** | 線框 Snap | 純線框左右 snap | whiteline ×2 |
| **D04** | 藍紅匯流 | 藍彩雙手匯合 | blue_line + right_color |
| **D05** | 主 CI 掃描 | 縱向 LiDAR 顯影 | handshake |
| **D06** | 紅黑單色橋 | 紅黑上下橋接（無方塊底） | red_black SVG |
| **D07** | 藍波浮手 | blueline 波場 + 藍手浮動 | blueline + blue_line |
| **D08** | 等高線握 | lines 視差 + 線框握手 | lines + whiteline |
| **D09** | 方塊開門 | 方塊 split 露出握手 | square + handshake |
| **D10** | 漩渦線框 | grow 呼吸 + 線框入場 | grow_1 + whiteline |
| **D11** | 隧道凝視 | 人臉分鏡 → 握手浮現 | humanface + handshake |
| **D12** | 液態面孔 | glassface crossfade + 伸手 | glassface + whitehand |
| **D13** | Tron 紅黑 | 格柵隧道 + 紅黑 emerge | do it too + red_black |
| **D14** | 信任光橋 | handshake + 中心光脈衝 | handshake |
| **D15** | 極簡黑底線框 | 零背景線框 snap | whiteline ×2 |

---

## 已有全螢幕 Lab

| Demo | Lab |
|------|-----|
| D01 | `/design-lab/square-bridge` |
| D02 | `/design-lab/blue-hand` |
| D04 | `/design-lab/mesh-snap` |

選定編號後，Sally 建議優先將該方向接 `section-hero` 滿版 + 互動微調。

---

## 使用者如何回覆

回覆格式範例：

- `D03` — 單選鎖定
- `D02 + D08` — 混合（方塊裂合 + 等高線底）
- `D15 但不要 snap 循環` — 附條件

---

## 檔案

- `lib/content/hero-direction-demos.ts`
- `components/design-lab/hero-direction-gallery.tsx`
- `components/design-lab/hero-direction-demo-preview.tsx`
- `app/(site)/design-lab/directions/page.tsx`

---

*Sally：先看卡上動畫節奏，再點「滿版 →」確認 100vh 感受。*
