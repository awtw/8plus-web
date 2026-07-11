# Test Automation Summary

**Date:** 2026-07-12 00:40（UTC+8）  
**Project:** QR-Beam / 8plus_web `public/tool/qrcode.html`  
**Focus:** openapi.json 類大檔組裝後下載鈕不亮

## Root cause

「分析完成」= 圖片掃完，≠ 檔案組齊。缺幀時下載保持 disabled 且舊 UI 無說明；解壓非同步時狀態也曾不一致。

## Fixes

- `reportImageDecodeOutcome` / `showImgOutcome`：未組齊／缺 META／可下載／解壓中 明確提示
- `tryFinalizeAssembly` + `rx.finishing`：組齊後必走到下載就緒
- disabled 下載鈕 `title` 說明原因；「繼續上傳缺幀」CTA

## E2E

- [x] incomplete → download disabled + 尚未組齊
- [x] openapi-like JSON → download `openapi.json`
- [x] 既有 download / 中文文字 / multi-frame

## Docs

- `qrcode-generater/docs/recv-download-testing.md`

## Results

- Unit: **11 passed**
- E2E: **15 passed**（含本輪新增）
- Total: **26 passed**

## Sync

- `QR-Beam.html` ↔ `8plus_web/public/tool/qrcode.html`
