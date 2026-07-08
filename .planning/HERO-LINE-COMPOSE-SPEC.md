# Hero 線條組構 — Line Compose 設計規格

*建立：2026-07-06 11:39 CST*  
*作者：Sally · UX Designer*  
*狀態：R4 概念 + Lab 預覽*  
*預覽：`/design-lab/line-compose`*

---

## 1. 設計命題

> **用「線」的動態，湊成一個完整主視覺。**

不是單張靜態圖 + 裝飾特效，而是：

1. **線條先行** — 場域、掃描、匯流、組裝
2. **形體後至** — 線框手 / 握手 / 人臉在線條完成後顯影
3. **一鏡到底** — 使用者感知「同一個畫面被線條建構出來」

---

## 2. 現有線條資產地圖

| 資產 | 線條語意 | 動畫策略 |
|------|----------|----------|
| `blueline.png` | 藍色波場等高線 | 平移視差 + 波向流動 |
| `lines.png` / `lines_2.png` | 地形等高線 | 雙層反向 drift |
| `square_line.png` / `squrare_2.png` | 透視方格 | 四象限滑入組裝 / 靜態視差 |
| `whitelinehand_*.png` | 白線框手 | 左右入場 snap / screen 疊加 |
| `blue_line_hand.svg` | 藍線手（內嵌 PNG） | 整圖位移 / 3D 視差，**非**逐條 stroke |
| `facewithline.png` | 側臉線網 | 慢速 orbit + 掃描顯影 |
| `humanface.png` / `humanface_svg.svg` | 線框 bust | SVG 真向量可 gradient 流動 |
| `grow_1/2.png` | 點陣絲線漩渦 | 呼吸 + 放射線 procedural 疊加 |

**技術邊界（LOCKED）**：多數 `.svg` 為 PNG 包裝 → 線條動畫靠 **procedural SVG overlay** + **原圖 clip/mask/opacity**，不假裝逐條描邊原圖。

---

## 3. 線條動畫語彙（Pattern）

| Pattern | 視覺 | 適用 |
|---------|------|------|
| `converge` | 邊緣線匯向中心 | 握手、snap |
| `contour-flow` | 水平流線掃過 | blueline、lines |
| `grid-assemble` | 透視格四向入場 | square_line |
| `wave-draw` | 波束描繪後顯形 | 藍手 |
| `wire-weave` | 中央豎向 shimmer 織合 | whiteline 雙手 |
| `scan-build` | 掃描線落下建構 | handshake |
| `thread-growth` | 中心放射絲線生長 | grow 漩渦 |
| `split-seam` | 中縫裂開再合攏 | 半調拆解 |
| `electric-bust` | 電流漸層線框人像 | humanface_svg |
| `line-story` | 多階段線場 → 終局 | 全譜敘事 |

---

## 4. L01–L10 方向

| ID | 名稱 | 線條敘事 | 終局形體 |
|----|------|----------|----------|
| **L01** | 線條匯聚 | 12 股線自四邊匯入中心 | whiteline snap |
| **L02** | 等高線流 | lines 雙層流場 + 流線 SVG | 線框握手 |
| **L03** | 方塊組裝 | 透視格四象限滑入 | handshake 顯影 |
| **L04** | 藍波描繪 | blueline 波束橫掃 | blue_line_hand |
| **L05** | 線框織合 | 中央 shimmer 豎縫 | whiteline 匯合 |
| **L06** | 掃描成形 | 橫向掃描線 LiDAR | handshake |
| **L07** | 電流線人像 | humanface_svg 電流圈 | 線框 bust 常駐 |
| **L08** | 透視裂合 | square 左右裂縫 | 半調 + 線框 |
| **L09** | 絲線生長 | 放射線自中心長出 | grow + 線框手 |
| **L10** | 藍圖全譜 | square → lines → 線框 → 握手 | 四幕一鏡 |

---

## 5. 滿版 Hero 建議節奏（選定後）

```
0.0s   黑底 + 第一層線場入場
0.8s   procedural 線條開始匯流 / 掃描
2.0s   終局形體 opacity 0→1
2.8s   會合 / snap / 定格
3.2s+  hold（首頁）或微視差（滑鼠／陀螺儀 ±小幅度）
```

`prefers-reduced-motion`：直接終局態 + 靜態線場。

---

## 6. 與 R3（D01–D15）關係

| R3 | R4 Line Compose 升級 |
|----|---------------------|
| D03 線框 Snap | **L01** 加匯聚線前置 |
| D08 等高線握 | **L02** 強化流線 SVG |
| D09 方塊開門 | **L03** 格線組裝動畫 |
| D07 藍波浮手 | **L04** 波束描繪 |
| D05 主 CI 掃描 | **L06** 掃描 + 線條建構 |
| D02 半調裂合 | **L08** 裂縫 + 線框 |

R4 = **同一 CI 語意，但「線條建構」敘事更明確**。

---

## 7. 待決策

| ID | 問題 |
|----|------|
| LC-1 | 主色：冷藍 only vs 藍 + 白線 vs 允許紅黑點綴？ |
| LC-2 | 終局形體：握手 / 線框手 / 藍手 優先？ |
| LC-3 | 互動：滿版後加滑鼠視差？ |
| LC-4 | 選 Lxx 後是否取代 W1 Hero？ |

---

*Sally：先看 `/design-lab/line-compose` 十卡「線條如何湊成一幅畫」，回覆 L01–L10。*
