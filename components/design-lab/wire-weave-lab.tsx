'use client'

import Link from 'next/link'
import { HeroWireWeave } from '@/components/home/hero-wire-weave'
import { LuminaShell } from '@/components/home/lumina-shell'
import { LabFullscreenChrome } from '@/components/design-lab/lab-fullscreen-chrome'

export function WireWeaveLab() {
  return (
    <LuminaShell>
      <LabFullscreenChrome>
        <div className="aw-lab-handshake aw-lab-wire-weave">
          <header className="aw-lab-handshake-chrome section-shell">
            <p className="aw-lab-eyebrow">Hero · L05 Wire Weave</p>
            <h1 className="aw-lab-title">線框織合</h1>
            <p className="aw-lab-lead">
              中央豎向 shimmer 織合 · whiteline 雙手匯合 · 滑鼠／陀螺儀微視差。
            </p>
            <div className="aw-lab-phase4-actions">
              <Link href="/design-lab/line-compose" className="aw-lab-back">
                ← L01–L10
              </Link>
              <Link href="/" className="aw-lab-back aw-lab-back-accent">
                首頁
              </Link>
            </div>
          </header>

          <div className="aw-lab-handshake-stage aw-lab-wire-weave-stage">
            <HeroWireWeave className="hero-wire-weave-root--stage" />
          </div>
        </div>
      </LabFullscreenChrome>
    </LuminaShell>
  )
}
