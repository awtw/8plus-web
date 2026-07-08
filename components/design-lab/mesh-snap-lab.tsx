'use client'

import Link from 'next/link'
import { HeroHumanfaceElectric } from '@/components/home/hero-humanface-electric'
import { LuminaShell } from '@/components/home/lumina-shell'
import { LabFullscreenChrome } from '@/components/design-lab/lab-fullscreen-chrome'

export function MeshSnapLab() {
  return (
    <LuminaShell>
      <LabFullscreenChrome>
        <div className="aw-lab-handshake">
          <header className="aw-lab-handshake-chrome section-shell">
            <p className="aw-lab-eyebrow">CI · Humanface Electric</p>
            <h1 className="aw-lab-title">humanface_svg 電流漸層</h1>
            <p className="aw-lab-lead">
              已移除雙手 / blueline / 流線。僅 humanface_svg.svg 電流色漸層流動。
            </p>
            <div className="aw-lab-phase4-actions">
              <Link href="/design-lab/variants" className="aw-lab-back">
                ← 20 款牆
              </Link>
              <Link href="/" className="aw-lab-back aw-lab-back-accent">
                首頁
              </Link>
            </div>
          </header>

          <div className="aw-lab-handshake-stage">
            <HeroHumanfaceElectric className="hero-humanface-electric-root--stage" />
          </div>
        </div>
      </LabFullscreenChrome>
    </LuminaShell>
  )
}
