'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'
import { LuminaShell } from '@/components/home/lumina-shell'
import { PHASE4_PROTOTYPES, Phase4LabPanel } from '@/components/home/three/phase4-lab-panel'
import { LabFullscreenChrome } from './lab-fullscreen-chrome'

export function HeroTrioLab() {
  const reducedMotion = useReducedMotion()
  const [syncProgress, setSyncProgress] = useState(0)
  const [syncEnabled, setSyncEnabled] = useState(true)
  const [autoPlay, setAutoPlay] = useState(true)
  const [chromeOpen, setChromeOpen] = useState(true)

  const shared = syncEnabled ? syncProgress : null

  useEffect(() => {
    if (!syncEnabled || !autoPlay || reducedMotion) return

    let frame = 0
    let raf = 0
    const tick = () => {
      frame += 0.0055
      setSyncProgress((Math.sin(frame) + 1) / 2)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [syncEnabled, autoPlay, reducedMotion])

  return (
    <LuminaShell>
      <LabFullscreenChrome>
        <div className="aw-lab-hero-trio">
          <header className={`aw-lab-hero-trio-chrome ${chromeOpen ? '' : 'is-collapsed'}`}>
            <div className="aw-lab-hero-trio-chrome-inner">
              <div className="aw-lab-hero-trio-chrome-copy">
                <p className="aw-lab-eyebrow">Phase 4 · 綜合建議三方向</p>
                <h1 className="aw-lab-hero-trio-title">主視覺原型並排</h1>
              </div>
              <div className="aw-lab-hero-trio-chrome-actions">
                <label className="aw-lab-phase4-sync">
                  <input
                    type="checkbox"
                    checked={syncEnabled}
                    onChange={(e) => {
                      setSyncEnabled(e.target.checked)
                      if (!e.target.checked) setSyncProgress(0)
                    }}
                  />
                  同步 progress
                </label>
                <Link href="/design-lab/canvas" className="aw-lab-hero-trio-link">
                  Canvas 2D Lab
                </Link>
                <Link href="/" className="aw-lab-hero-trio-link">
                  首頁
                </Link>
                <button
                  type="button"
                  className="aw-lab-hero-trio-toggle"
                  onClick={() => setChromeOpen((v) => !v)}
                  aria-expanded={chromeOpen}
                >
                  {chromeOpen ? '滿版' : '控制列'}
                </button>
              </div>
            </div>
          </header>

          <div className="aw-lab-hero-trio-stage">
            {PHASE4_PROTOTYPES.map((meta) => (
              <Phase4LabPanel
                key={meta.id}
                meta={meta}
                sharedProgress={shared}
                onProgressChange={
                  syncEnabled
                    ? (value) => {
                        setAutoPlay(false)
                        setSyncProgress(value)
                      }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </LabFullscreenChrome>
    </LuminaShell>
  )
}
