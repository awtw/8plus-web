'use client'

import Link from 'next/link'
import { HeroGridAssemble } from '@/components/home/hero-grid-assemble'
import { LuminaShell } from '@/components/home/lumina-shell'
import { LabFullscreenChrome } from '@/components/design-lab/lab-fullscreen-chrome'

export function GridAssembleLab() {
  return (
    <LuminaShell>
      <LabFullscreenChrome>
        <div className="aw-lab-handshake aw-lab-grid-assemble">
          <header className="aw-lab-handshake-chrome section-shell">
            <p className="aw-lab-eyebrow">Hero · L03 Grid Assemble</p>
            <h1 className="aw-lab-title">方塊組裝</h1>
            <p className="aw-lab-lead">
              透視格入場合攏 → 裂開開門 · handshake 顯影 · 滑鼠／陀螺儀視差。
            </p>
            <div className="aw-lab-phase4-actions">
              <Link href="/design-lab/line-compose" className="aw-lab-back">
                ← L01–L10
              </Link>
              <Link href="/design-lab/scan-build" className="aw-lab-back">
                L06 掃描
              </Link>
              <Link href="/" className="aw-lab-back aw-lab-back-accent">
                首頁
              </Link>
            </div>
          </header>

          <div className="aw-lab-handshake-stage aw-lab-grid-assemble-stage">
            <HeroGridAssemble className="hero-grid-assemble-root--stage" />
          </div>
        </div>
      </LabFullscreenChrome>
    </LuminaShell>
  )
}
