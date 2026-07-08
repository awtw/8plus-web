'use client'

import Link from 'next/link'
import { HeroHalftoneSplit } from '@/components/home/hero-halftone-split'
import { LuminaShell } from '@/components/home/lumina-shell'
import { LabFullscreenChrome } from '@/components/design-lab/lab-fullscreen-chrome'

export function BlueHandMeridianLab() {
  return (
    <LuminaShell>
      <LabFullscreenChrome>
        <div className="aw-lab-handshake aw-lab-halftone-split">
          <header className="aw-lab-handshake-chrome section-shell">
            <p className="aw-lab-eyebrow">Hero · V05 Halftone Split</p>
            <h1 className="aw-lab-title">半調 × 線框拆解</h1>
            <p className="aw-lab-lead">
              handshake 左右拆解匯合 · whiteline 線框浮現 · 滑鼠／陀螺儀微視差。
            </p>
            <div className="aw-lab-phase4-actions">
              <Link href="/design-lab/variants" className="aw-lab-back">
                ← 20 款牆
              </Link>
              <Link href="/design-lab/square-bridge" className="aw-lab-back">
                Square Bridge
              </Link>
              <Link href="/" className="aw-lab-back aw-lab-back-accent">
                首頁
              </Link>
            </div>
          </header>

          <div className="aw-lab-handshake-stage aw-lab-halftone-split-stage">
            <HeroHalftoneSplit className="hero-halftone-split-root--stage" />
          </div>
        </div>
      </LabFullscreenChrome>
    </LuminaShell>
  )
}
