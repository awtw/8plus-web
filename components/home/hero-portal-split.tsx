'use client'

import { getPortalSplitMotion } from '@/lib/hero/portal-split-motion'

const HANDSHAKE = '/ci/handshake.png'
const SQUARE_L = '/ci/square_line.png'
const SQUARE_R = '/ci/squrare_2.png'

const CORNER_PATHS = [
  'M 80 200 L 80 80 L 200 80',
  'M 920 200 L 920 80 L 800 80',
  'M 80 800 L 80 920 L 200 920',
  'M 920 800 L 920 920 L 800 920',
]

type HeroPortalSplitProps = {
  className?: string
  progress?: number
  showHud?: boolean
}

export function HeroPortalSplit({
  className,
  progress = 0,
  showHud = true,
}: HeroPortalSplitProps) {
  const m = getPortalSplitMotion(progress)

  return (
    <div className={className ?? 'hero-portal-split-root'} aria-hidden={!showHud}>
      <div className="hero-portal-split-base" />

      <div className="hero-portal-split-poster-stage">
        <img
          src={HANDSHAKE}
          alt=""
          className="hero-portal-split-poster"
          style={{
            opacity: m.posterOpacity,
            transform: `scale(${m.posterScale})`,
          }}
          draggable={false}
        />
      </div>

      <svg
        className="hero-portal-split-frame"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="#94a3b8" fill="none" opacity={m.seamGlow * 0.7}>
          {CORNER_PATHS.map((d, i) => (
            <path
              key={d}
              d={d}
              strokeWidth="0.9"
              strokeDasharray="120 200"
              style={{ strokeDashoffset: 120 - m.seamGlow * 120 + i * 16 }}
            />
          ))}
        </g>
      </svg>

      <div className="hero-portal-split-doors">
        <div
          className="hero-portal-split-door hero-portal-split-door-left"
          style={{
            transform: `translate3d(${m.leftX}%, 0, 0)`,
            opacity: m.gridOpacity,
          }}
        >
          <img src={SQUARE_L} alt="" draggable={false} />
        </div>
        <div
          className="hero-portal-split-door hero-portal-split-door-right"
          style={{
            transform: `translate3d(${m.rightX}%, 0, 0)`,
            opacity: m.gridOpacity,
          }}
        >
          <img src={SQUARE_R} alt="" draggable={false} />
        </div>
      </div>

      <div className="hero-portal-split-seam" style={{ opacity: m.seamGlow }} />
      <div className="hero-portal-split-vignette" />

      {showHud ? (
        <div className="hero-portal-split-hud">
          <span className="hero-portal-split-hud-tag">R5-05 · PORTAL SPLIT</span>
          <span className="hero-portal-split-hud-progress">{Math.round(progress * 100)}%</span>
        </div>
      ) : null}
    </div>
  )
}
