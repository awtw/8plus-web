'use client'

import { useMemo } from 'react'
import { getHandshakeMotion } from '@/lib/hero/handshake-motion'

type HeroHandshakeSvgProps = {
  progress: number
  className?: string
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function HeroHandshakeSvg({ progress, className }: HeroHandshakeSvgProps) {
  const m = useMemo(() => getHandshakeMotion(progress), [progress])
  const snapOpacity = progress > 0.92 ? (progress - 0.92) / 0.08 : 0

  return (
    <div className={className ?? 'hero-handshake-svg-root'}>
      <svg
        className="hero-handshake-svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="halftone-hand-clip">
            <path d="M40 120 C120 40 340 30 520 90 C620 130 640 220 590 340 C540 470 420 560 280 590 C140 620 40 540 30 400 C20 260 10 180 40 120 Z" />
          </clipPath>
          <pattern id="halftone-dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.35" fill="#f8fafc" opacity="0.92" />
          </pattern>
          <radialGradient id="meet-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity={0.45 * m.glow} />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* HUD */}
        <g className="hero-handshake-hud-lines" opacity="0.55">
          <path d="M180 120 L180 520" stroke="#f8fafc" strokeWidth="0.8" opacity="0.35" />
          <path d="M180 120 L420 280" stroke="#f8fafc" strokeWidth="0.8" opacity="0.35" />
          <circle cx="180" cy="120" r="4" fill="none" stroke="#f8fafc" strokeWidth="0.8" />
          <rect x="700" y="95" width="220" height="120" fill="none" stroke="#f8fafc" strokeWidth="0.8" opacity="0.4" />
          <path
            d="M200 680 A280 280 0 0 1 760 680"
            fill="none"
            stroke="#f8fafc"
            strokeWidth="0.8"
            opacity="0.28"
          />
          <path
            d="M260 680 A220 220 0 0 1 700 680"
            fill="none"
            stroke="#f8fafc"
            strokeWidth="0.8"
            opacity="0.22"
          />
          <path
            d="M320 680 A160 160 0 0 1 640 680"
            fill="none"
            stroke="#f8fafc"
            strokeWidth="0.8"
            opacity="0.18"
          />
        </g>

        {/* Meet glow */}
        <ellipse cx="560" cy="360" rx={90 + m.glow * 40} ry={70 + m.glow * 28} fill="url(#meet-glow)" />

        {/* Halftone hand — reference clip + pattern silhouette */}
        <g clipPath="url(#halftone-hand-clip)">
          <image
            href="/ci/handshake-reference.png"
            x="0"
            y="0"
            width="1200"
            height="800"
            preserveAspectRatio="xMidYMid slice"
          />
          <path
            d="M40 120 C120 40 340 30 520 90 C620 130 640 220 590 340 C540 470 420 560 280 590 C140 620 40 540 30 400 C20 260 10 180 40 120 Z"
            fill="url(#halftone-dots)"
            opacity="0.08"
          />
        </g>

        {/* Wireframe hand — animated rig */}
        <g
          transform={`translate(${m.wireX} ${m.wireY}) rotate(${m.wireRotate} 720 360)`}
          style={{ transition: 'transform 0.08s linear' }}
        >
          {/* Palm mesh */}
          <g stroke="#f8fafc" strokeWidth="1.1" fill="none" opacity="0.9">
            <path d="M620 300 L760 280 L820 340 L800 430 L680 460 L600 420 Z" />
            <path d="M620 300 L680 460 M760 280 L800 430 M680 460 L800 430" opacity="0.55" />
            <path d="M650 320 L720 310 L760 350 L720 400 L650 390 Z" opacity="0.45" />
          </g>

          {/* Finger 1 */}
          <g transform={`rotate(${-m.finger1} 640 300)`}>
            <path
              d="M640 300 C630 250 625 210 630 170 C635 140 650 120 660 110"
              stroke="#f8fafc"
              strokeWidth="1.1"
              fill="none"
            />
            <path d="M645 250 L655 250 M648 200 L658 200" stroke="#f8fafc" strokeWidth="0.7" opacity="0.5" />
          </g>

          {/* Finger 2 */}
          <g transform={`rotate(${-m.finger2} 700 290)`}>
            <path
              d="M700 290 C695 230 700 180 710 140 C720 105 735 90 745 85"
              stroke="#f8fafc"
              strokeWidth="1.1"
              fill="none"
            />
            <path d="M702 230 L712 230 M705 175 L715 175" stroke="#f8fafc" strokeWidth="0.7" opacity="0.5" />
          </g>

          {/* Finger 3 */}
          <g transform={`rotate(${-m.finger3} 750 300)`}>
            <path
              d="M750 300 C755 245 760 195 770 155 C780 120 792 108 802 102"
              stroke="#f8fafc"
              strokeWidth="1.1"
              fill="none"
            />
            <path d="M752 240 L762 240 M758 185 L768 185" stroke="#f8fafc" strokeWidth="0.7" opacity="0.5" />
          </g>

          {/* Finger 4 */}
          <g transform={`rotate(${-m.finger4} 790 320)`}>
            <path
              d="M790 320 C800 280 810 240 820 210 C828 185 838 175 845 170"
              stroke="#f8fafc"
              strokeWidth="1.1"
              fill="none"
            />
          </g>

          {/* Thumb */}
          <g transform={`rotate(${m.thumb} 610 360)`}>
            <path
              d="M610 360 C560 350 520 330 490 300 C470 280 455 255 450 230"
              stroke="#f8fafc"
              strokeWidth="1.1"
              fill="none"
            />
            <path d="M540 320 L550 310 M510 285 L520 275" stroke="#f8fafc" strokeWidth="0.7" opacity="0.5" />
          </g>

          {/* Cross mesh */}
          <g stroke="#f8fafc" strokeWidth="0.65" opacity="0.35">
            <path d="M630 330 L780 310 L810 380 L670 430 Z" />
            <path d="M650 350 L760 340 M670 390 L790 360" />
          </g>
        </g>

        {/* Final snap — full reference blend for pixel fidelity */}
        <image
          href="/ci/handshake-reference.png"
          x="0"
          y="0"
          width="1200"
          height="800"
          preserveAspectRatio="xMidYMid slice"
          opacity={snapOpacity}
        />
      </svg>

      <div className="hero-handshake-svg-labels" aria-hidden="true">
        <span className="hero-handshake-label hero-handshake-label-left">security*</span>
        <span className="hero-handshake-label hero-handshake-label-center">trust001</span>
        <span className="hero-handshake-label hero-handshake-label-right">8plus</span>
      </div>
    </div>
  )
}

/** Static frame for reduced motion — full reference. */
export function HeroHandshakeStatic({ className }: { className?: string }) {
  return (
    <div className={className ?? 'hero-handshake-svg-root'}>
      <img
        src="/ci/handshake-reference.png"
        alt=""
        className="hero-handshake-static-img"
      />
      <div className="hero-handshake-svg-labels" aria-hidden="true">
        <span className="hero-handshake-label hero-handshake-label-left">security*</span>
        <span className="hero-handshake-label hero-handshake-label-center">trust001</span>
        <span className="hero-handshake-label hero-handshake-label-right">8plus</span>
      </div>
    </div>
  )
}
