'use client'

import Link from 'next/link'
import { HeroScanBuild } from '@/components/home/hero-scan-build'
import { LuminaShell } from '@/components/home/lumina-shell'
import { LabFullscreenChrome } from '@/components/design-lab/lab-fullscreen-chrome'

export function ScanBuildLab() {
  return (
    <LuminaShell>
      <LabFullscreenChrome>
        <div className="aw-lab-handshake aw-lab-scan-build">
          <header className="aw-lab-handshake-chrome section-shell">
            <p className="aw-lab-eyebrow">Hero · L06 Scan Build</p>
            <h1 className="aw-lab-title">掃描成形</h1>
            <p className="aw-lab-lead">
              LiDAR 掃描線由上而下 · 線框邊界建構 · handshake 漸顯 · 微視差。
            </p>
            <div className="aw-lab-phase4-actions">
              <Link href="/design-lab/line-compose" className="aw-lab-back">
                ← L01–L10
              </Link>
              <Link href="/design-lab/wire-weave" className="aw-lab-back">
                L05 織合
              </Link>
              <Link href="/" className="aw-lab-back aw-lab-back-accent">
                首頁
              </Link>
            </div>
          </header>

          <div className="aw-lab-handshake-stage aw-lab-scan-build-stage">
            <HeroScanBuild className="hero-scan-build-root--stage" />
          </div>
        </div>
      </LabFullscreenChrome>
    </LuminaShell>
  )
}
