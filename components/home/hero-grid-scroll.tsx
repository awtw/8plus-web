'use client'

import { getGridScrollMotion } from '@/lib/hero/grid-scroll-motion'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

type HeroGridScrollProps = {
  className?: string
  /** 0–1 scroll progress */
  progress?: number
  showHud?: boolean
}

export function HeroGridScroll({
  className,
  progress: progressProp = 0,
  showHud = true,
}: HeroGridScrollProps) {
  const reducedMotion = useReducedMotion()
  const progress = reducedMotion ? 0 : progressProp
  const m = getGridScrollMotion(progress)

  return (
    <div className={className ?? 'hero-grid-scroll-root'} aria-hidden={!showHud}>
      <div className="hero-grid-scroll-base" />

      <div
        className="hero-grid-scroll-field"
        style={{
          transform: `translate3d(0, ${m.gridY}%, 0) scale(${m.gridScale}) rotateX(${m.depthTilt}deg)`,
          filter: `brightness(${m.gridBrightness})`,
        }}
      >
        <img src="/ci/square_line.png" alt="" draggable={false} />
      </div>

      <div
        className="hero-grid-scroll-lines"
        style={{
          opacity: m.linesOpacity,
          transform: `translate3d(0, ${m.gridY * 0.6}%, 0) scale(${1 + m.gridScale * 0.02})`,
        }}
      >
        <img src="/ci/lines.png" alt="" draggable={false} />
      </div>

      <div className="hero-grid-scroll-seam" style={{ opacity: m.seamOpacity }} />

      <div
        className="hero-grid-scroll-vignette"
        style={{ opacity: m.vignetteStrength }}
      />

      {showHud ? (
        <div className="hero-grid-scroll-hud">
          <span className="hero-grid-scroll-hud-tag">GRID · SCROLL</span>
          <span className="hero-grid-scroll-hud-progress">
            {Math.round(progress * 100)}%
          </span>
        </div>
      ) : null}
    </div>
  )
}
