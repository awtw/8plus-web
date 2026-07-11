# Test Automation Summary

**Date:** 2026-07-12 01:10（UTC+8）  
**Project:** QR-Beam / 8plus_web `public/tool/qrcode.html`  
**Focus:** 多段長圖組裝缺幀

## Root causes（已確認）

1. 長圖匯出把 640px QR **縮成 360** → 密模組損壞  
2. 解碼早退、失敗格不重試；高圖誤走 2×2  
3. META 前 DATA/REPAIR 直接丟 → 亂序多段缺幀

## Fixes

- `STRIP_CELL=400` 原生繪製（不縮放）
- `decodeVerticalStrip` + upscale/offset retry
- 高圖不 fallthrough 2×2
- `rx.preMeta` 緩衝至 META

## E2E regression

- [x] `multi-part vertical strips round-trip without missing frames`（密資料 + **逆序**多段）

## Docs

- `qrcode-generater/docs/recv-download-testing.md`

## Results

- Unit: **11 passed**
- E2E: **16 passed**
- Total: **27 passed**

## Sync

- `QR-Beam.html` ↔ `8plus_web/public/tool/qrcode.html`
