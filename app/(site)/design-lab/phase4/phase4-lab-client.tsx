'use client'

import Link from 'next/link'
import { useState } from 'react'
import { LuminaShell } from '@/components/home/lumina-shell'
import { PHASE4_PROTOTYPES, Phase4LabPanel } from '@/components/home/three/phase4-lab-panel'

export default function Phase4LabClient() {
  const [syncProgress, setSyncProgress] = useState<number | null>(null)
  const [syncEnabled, setSyncEnabled] = useState(true)

  const shared = syncEnabled ? syncProgress : null

  return (
    <LuminaShell>
      <div className="aw-lab aw-lab-phase4">
        <div className="section-shell aw-lab-header">
          <p className="aw-lab-eyebrow">Phase 4 · Design Lab</p>
          <h1 className="aw-lab-title">主視覺三方向原型</h1>
          <p className="aw-lab-lead">
            #02 頂點成形 · #05 雷射掃描 · #13 握手形變 — R3F wireframe 並排比較。拖曳滑桿或開啟同步播放。
          </p>
          <div className="aw-lab-phase4-actions">
            <Link href="/design-lab" className="aw-lab-back">
              ← Canvas 2D Lab
            </Link>
            <label className="aw-lab-phase4-sync">
              <input
                type="checkbox"
                checked={syncEnabled}
                onChange={(e) => {
                  setSyncEnabled(e.target.checked)
                  if (!e.target.checked) setSyncProgress(null)
                }}
              />
              同步三格 progress
            </label>
          </div>
        </div>

        <div className="section-shell aw-lab-phase4-grid">
          {PHASE4_PROTOTYPES.map((meta) => (
            <Phase4LabPanel
              key={meta.id}
              meta={meta}
              sharedProgress={shared}
              onProgressChange={syncEnabled ? setSyncProgress : undefined}
            />
          ))}
        </div>

        <div className="section-shell aw-lab-phase4-notes">
          <h2 className="aw-lab-section-title">評分提示</h2>
          <ul className="aw-lab-phase4-note-list">
            <li>品牌契合：是否像架構夥伴，而非遊戲 HUD</li>
            <li>驚艷度：3 秒內是否抓住注意力</li>
            <li>敘事感：能否銜接 Void → Mesh → Handshake 六章</li>
            <li>效能：中階手機 WebGL 是否流暢</li>
          </ul>
        </div>
      </div>
    </LuminaShell>
  )
}
