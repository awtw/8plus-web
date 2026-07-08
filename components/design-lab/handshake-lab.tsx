'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense, useEffect, useId, useState } from 'react'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'
import { LuminaShell } from '@/components/home/lumina-shell'
import { LabFullscreenChrome } from '@/components/design-lab/lab-fullscreen-chrome'

const HeroHandshakeScene = dynamic(
  () => import('@/components/home/three/hero-handshake-scene'),
  { ssr: false },
)

const MILESTONES = [
  { at: 0, label: '線框手入場' },
  { at: 0.22, label: '靠近半調手' },
  { at: 0.58, label: '手指收握' },
  { at: 1, label: '握手完成' },
] as const

export function HandshakeLab() {
  const sliderId = useId()
  const reducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay || reducedMotion) return

    let frame = 0
    let raf = 0
    const tick = () => {
      frame += 0.0038
      const wave = (Math.sin(frame) + 1) / 2
      setProgress(wave)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [autoPlay, reducedMotion])

  const milestone = [...MILESTONES].reverse().find((m) => progress >= m.at)

  return (
    <LuminaShell>
      <LabFullscreenChrome>
        <div className="aw-lab-handshake">
          <header className="aw-lab-handshake-chrome section-shell">
            <p className="aw-lab-eyebrow">Handshake CI · V-REF</p>
            <h1 className="aw-lab-title">半調手 × 線框手 握手</h1>
            <p className="aw-lab-lead">
              左：半調網點（靜態）· 右：線框手動畫收握。接近你提供的參考圖語彙。
            </p>
            <div className="aw-lab-phase4-actions">
              <Link href="/" className="aw-lab-back">
                ← 首頁
              </Link>
              <Link href="/design-lab" className="aw-lab-back aw-lab-back-accent">
                20 款方向牆
              </Link>
            </div>
          </header>

          <div className="aw-lab-handshake-stage">
            <div className="aw-lab-handshake-hud" aria-hidden="true">
              <span className="aw-lab-handshake-hud-tag">security*</span>
              <span className="aw-lab-handshake-hud-center">trust001</span>
              <span className="aw-lab-handshake-hud-mark">8plus</span>
            </div>

            {reducedMotion ? (
              <div className="aw-lab-phase4-fallback">
                <p className="aw-lab-phase4-fallback-tag">REDUCED MOTION</p>
                <p className="aw-lab-phase4-fallback-text">握手主視覺 · 靜態預覽</p>
              </div>
            ) : (
              <Suspense fallback={<div className="aw-lab-phase4-fallback">載入 WebGL…</div>}>
                <HeroHandshakeScene progress={progress} />
              </Suspense>
            )}
          </div>

          <footer className="aw-lab-handshake-controls section-shell">
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
              {milestone?.label ?? '—'} · 入場 → 靠近 → 收握 → 完成
            </p>
            <label className="aw-lab-phase4-sync">
              <input
                type="checkbox"
                checked={autoPlay}
                onChange={(e) => setAutoPlay(e.target.checked)}
              />
              自動循環
            </label>
          </footer>
        </div>
      </LabFullscreenChrome>
    </LuminaShell>
  )
}
