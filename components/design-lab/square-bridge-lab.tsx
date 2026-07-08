'use client'

import Link from 'next/link'
import { HeroSquareBridge } from '@/components/home/hero-square-bridge'
import { LuminaShell } from '@/components/home/lumina-shell'
import { LabFullscreenChrome } from '@/components/design-lab/lab-fullscreen-chrome'

export function SquareBridgeLab() {
  return (
    <LuminaShell>
      <LabFullscreenChrome>
        <div className="aw-lab-handshake aw-lab-square-bridge">
          <header className="aw-lab-handshake-chrome section-shell">
            <p className="aw-lab-eyebrow">Hero · Square Bridge</p>
            <h1 className="aw-lab-title">方塊透視場 × 紅黑雙手橋接</h1>
            <p className="aw-lab-lead">
              square_line 無限旋轉放大 · 紅手自上破版滑入 · 黑手自下匯合 · 100dvh 滿版。
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

          <div className="aw-lab-handshake-stage aw-lab-square-bridge-stage">
            <HeroSquareBridge className="hero-square-bridge-root--stage" />
          </div>
        </div>
      </LabFullscreenChrome>
    </LuminaShell>
  )
}
