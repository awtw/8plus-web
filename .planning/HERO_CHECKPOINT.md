# Hero 主視覺 Checkpoint

*更新：2026-07-01 CST*

---

## 使用者決策（LOCKED 意圖）

| 項目 | 狀態 |
|------|------|
| Co-Hero A / 三欄手 Lab / 粒子 Canvas | **皆不喜歡** — 不沿用 |
| 整體畫面 | **需重新設計**（非微調） |
| 版面 | **必須滿版**（100% 視窗寬高，無右側白邊、無 container 限寬） |
| 方向共識（保留） | 手 × Logo **同框互動** 作第一主視覺；#05 同掃、#13 握手語彙可重用 |
| 資產參考 | `hand_line.png`、Share logo snap |

---

## 技術債（待下一輪一併修）

- [ ] `/design-lab/*` 全路由滿版（header/footer 隱藏 + width 100%）
- [ ] Canvas `position: absolute; inset: 0` 真全屏層
- [ ] 避免 `100vw` 捲軸溢出白邊 → 用 `100%` + `overflow-x: hidden`
- [ ] 首頁 `scroll-story` 舊章節與新主視覺脫節 — W2 前凍結

---

## 下一輪設計輸入（空白，待 workshop）

1. 首屏構圖 mood board（手+Logo 關係）
2. 線框密度 / 線寬
3. 是否保留 scroll 六章或單屏 hero + 內頁

---

## 參考文件

- `.planning/phases/4.0-HERO-REDESIGN-R3.md` — 方針 A（概念保留，執行重做）
- `docs/BRAND_EXPERIENCE_SPEC.md`
- `docs/CI_IDENTITY_SPEC.md`
