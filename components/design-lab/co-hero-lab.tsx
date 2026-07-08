'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense, useEffect, useId, useState } from 'react'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'
import { LuminaShell } from '@/components/home/lumina-shell'
import { CO_HERO_MILESTONES } from '@/lib/three/co-hero-phases'
import { LabFullscreenChrome } from './lab-fullscreen-chrome'

const HeroCoHeroScene = dynamic(() => import('@/components/home/three/hero-co-hero-scene'), {
  ssr: false,
})

export function CoHeroLab() {
  const sliderId = useId()
  const reducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [chromeOpen, setChromeOpen] = useState(true)

  useEffect(() => {
    if (!autoPlay || reducedMotion) return

    let frame = 0
    let raf = 0
    const tick = () => {
      frame += 0.0042
      const wave = (Math.sin(frame) + 1) / 2
      setProgress(wave)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [autoPlay, reducedMotion])

  const activeMilestone = [...CO_HERO_MILESTONES].reverse().find((m) => progress >= m.at)

  return (
    <LuminaShell>
      <LabFullscreenChrome>
        <div className="aw-lab-co-hero">
          <header className={`aw-lab-hero-trio-chrome ${chromeOpen ? '' : 'is-collapsed'}`}>
            <div className="aw-lab-hero-trio-chrome-inner">
              <div className="aw-lab-hero-trio-chrome-copy">
                <p className="aw-lab-eyebrow">R3 · 方案 A — Co-Hero Cradle</p>
                <h1 className="aw-lab-hero-trio-title">手托 Logo 同掃</h1>
              </div>
              <div className="aw-lab-hero-trio-chrome-actions">
                <Link href="/design-lab/phase4" className="aw-lab-hero-trio-link">
                  舊三欄 Lab
                </Link>
                <Link href="/design-lab/canvas" className="aw-lab-hero-trio-link">
                  Canvas legacy
                </Link>
                <Link href="/" className="aw-lab-hero-trio-link">
                  首頁
                </Link>
                <button
                  type="button"
                  className="aw-lab-hero-trio-toggle"
                  onClick={() => setChromeOpen(false)}
                  aria-label="滿版預覽"
                >
                  滿版
                </button>
              </div>
            </div>
          </header>

          {!chromeOpen ? (
            <button
              type="button"
              className="aw-lab-hero-trio-fab aw-lab-hero-trio-fab--float"
              onClick={() => setChromeOpen(true)}
              aria-label="顯示控制列"
            >
              控制列
            </button>
          ) : null}

          <div className="aw-lab-co-hero-stage">
            {reducedMotion ? (
              <div className="aw-lab-phase4-fallback">
                <p className="aw-lab-phase4-fallback-tag">REDUCED MOTION</p>
                <p className="aw-lab-phase4-fallback-text">手托 Logo 線框 · 靜態預覽</p>
              </div>
            ) : (
              <Suspense fallback={<div className="aw-lab-phase4-fallback">載入 WebGL…</div>}>
                <HeroCoHeroScene progress={progress} />
              </Suspense>
            )}
          </div>

          <footer className="aw-lab-co-hero-controls">
            <label className="aw-lab-phase4-slider-wrap" htmlFor={sliderId}>
              <span className="aw-lab-phase4-slider-label">Progress</span>
              <input
                id={sliderId}
                type="range"
                min={0}
                max={100}
                value={Math.round(progress * 100)}
                className="aw-lab-phase4-slider"
                onChange={(e) => {
                  setAutoPlay(false)
                  setProgress(Number(e.target.value) / 100)
                }}
              />
              <span className="aw-lab-phase4-slider-value">{Math.round(progress * 100)}%</span>
            </label>
            <p className="aw-lab-co-hero-milestone">
              {activeMilestone?.label ?? '—'} · 頂點雲 → 同掃 → snap → 微握
            </p>
          </footer>
        </div>
      </LabFullscreenChrome>
    </LuminaShell>
  )
}
