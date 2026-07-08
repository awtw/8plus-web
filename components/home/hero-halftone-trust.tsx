'use client'

import { getHalftoneTrustMotion } from '@/lib/hero/halftone-trust-motion'

const HANDSHAKE = '/ci/handshake.png'

type HeroHalftoneTrustProps = {
  className?: string
  progress?: number
  showHud?: boolean
}

export function HeroHalftoneTrust({
  className,
  progress = 0,
  showHud = true,
}: HeroHalftoneTrustProps) {
  const m = getHalftoneTrustMotion(progress)

  return (
    <div className={className ?? 'hero-halftone-trust-root'} aria-hidden={!showHud}>
      <div className="hero-halftone-trust-base" />

      <div
        className="hero-halftone-trust-grain"
        style={{ opacity: m.grainOpacity }}
      />

      <div
        className="hero-halftone-trust-rules"
        style={{ opacity: m.ruleOpacity }}
        aria-hidden="true"
      />

      <div className="hero-halftone-trust-stage">
        <img
          src={HANDSHAKE}
          alt=""
          className="hero-halftone-trust-handshake"
          style={{
            filter: `brightness(${m.exposure}) contrast(1.02)`,
            transform: `translate3d(0, ${m.parallaxY}%, 0)`,
          }}
          draggable={false}
        />
      </div>

      <div
        className="hero-halftone-trust-vignette"
        style={{ opacity: m.vignette }}
      />

      {showHud ? (
        <div className="hero-halftone-trust-hud">
          <span className="hero-halftone-trust-hud-tag">R5-06 · HALFTONE TRUST</span>
          <span className="hero-halftone-trust-hud-progress">{Math.round(progress * 100)}%</span>
        </div>
      ) : null}
    </div>
  )
}
