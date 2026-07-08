'use client'

import { getHomeCiMotion } from '@/lib/hero/home-ci-motion'

const HANDSHAKE = '/ci/handshake.png'
const SQUARE_L = '/ci/square_line.png'
const SQUARE_R = '/ci/squrare_2.png'

type HeroHomeCiProps = {
  /** 0–1 scroll progress; pass 1 for the static reduced-motion terminal frame */
  progress: number
}

export function HeroHomeCi({ progress }: HeroHomeCiProps) {
  const m = getHomeCiMotion(progress)

  return (
    <div className="home-hero-ci-stage" aria-hidden="true">
      <div className="home-hero-ci-base" />

      <div className="home-hero-ci-poster-stage">
        <img
          src={HANDSHAKE}
          alt=""
          className="home-hero-ci-poster"
          style={{
            opacity: m.posterOpacity,
            transform: `scale(${m.posterScale})`,
            filter: `brightness(${m.exposure}) contrast(1.02)`,
          }}
          draggable={false}
        />
      </div>

      <div className="home-hero-ci-doors">
        <div
          className="home-hero-ci-door home-hero-ci-door-left"
          style={{
            transform: `translate3d(${m.leftX}%, 0, 0)`,
            opacity: m.gridOpacity,
          }}
        >
          <img src={SQUARE_L} alt="" draggable={false} />
        </div>
        <div
          className="home-hero-ci-door home-hero-ci-door-right"
          style={{
            transform: `translate3d(${m.rightX}%, 0, 0)`,
            opacity: m.gridOpacity,
          }}
        >
          <img src={SQUARE_R} alt="" draggable={false} />
        </div>
      </div>

      <div className="home-hero-ci-seam" style={{ opacity: m.seamGlow }} />
      <div className="home-hero-ci-vignette" style={{ opacity: m.vignette }} />
    </div>
  )
}
