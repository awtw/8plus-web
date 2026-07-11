---
stepsCompleted: []
inputDocuments: []
workflowType: 'research'
lastStep: 1
research_type: 'domain'
research_topic: '螢幕-相機氣隙大檔傳輸（QR/高密度條碼）與少幀策略'
research_goals: '找出如何在保持離線單頁工具前提下，大幅減少大檔案所需掃描的 QR 數量，並規劃可落地的技術路線'
user_name: 'August'
date: '2026-07-11'
web_research_enabled: true
source_verification: true
---

# Research Report: domain

**Date:** 2026-07-11
**Author:** August
**Research Type:** domain

---

## Research Overview

主題：離線／氣隙環境下，以螢幕顯示 + 相機掃描傳輸大檔案時，如何減少「必須成功掃描的幀數」。

初步來源候選（待 Step 2+ 驗證展開）：
- QR 容量上限（ISO/IEC 18004 / 公開容量表）
- Fountain codes（RaptorQ RFC 6330）用於無回饋通道
- 開源實作：RaptorQR、qrstream、libcimbar、QRT

---

<!-- Content will be appended sequentially through research workflow steps -->


## Implementation note (2026-07-11)

已於 `public/tool/qrcode.html` / `QR-Beam.html` 依序落地 Phase 0–2：DEFLATE、chunk≤2200、幀數預算、LT 噴泉、相機續掃+ETA、2×2 同屏。
