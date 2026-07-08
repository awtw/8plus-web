'use client'

import { useId, useMemo } from 'react'
import { getMeshSnapMotion } from '@/lib/hero/mesh-snap-motion'

type HeroBluelineFlowProps = {
  progress: number
  className?: string
}

const STREAMLINES = [
  'M -40 120 C 180 80, 320 200, 480 160 S 760 100, 920 180',
  'M -60 280 C 160 240, 300 360, 500 300 S 820 220, 1000 320',
  'M -30 440 C 200 400, 340 520, 520 460 S 800 380, 980 440',
  'M -50 580 C 170 540, 310 660, 490 600 S 780 520, 960 580',
  'M 1240 100 C 1020 140, 880 60, 720 120 S 440 200, 280 140',
  'M 1260 300 C 1040 340, 900 260, 740 320 S 460 400, 300 340',
  'M 1230 500 C 1010 460, 870 580, 690 520 S 410 440, 250 500',
  'M 1250 680 C 1030 640, 890 760, 710 700 S 430 620, 270 680',
] as const

export function HeroBluelineFlow({ progress, className }: HeroBluelineFlowProps) {
  const uid = useId().replace(/:/g, '')
  const m = useMemo(() => getMeshSnapMotion(progress), [progress])

  const flowBoost = 0.65 + m.indexReach * 0.55
  const handOpacity = 0.82 + m.touch * 0.18

  return (
    <div className={className ?? 'hero-blueline-flow-root'}>
      <div className="hero-blueline-flow-bg" aria-hidden="true">
        <img src="/ci/blueline.png" alt="" className="hero-blueline-flow-bg-base" draggable={false} />
        <img src="/ci/blueline.png" alt="" className="hero-blueline-flow-bg-drift" draggable={false} />
        <img src="/ci/blueline.png" alt="" className="hero-blueline-flow-bg-pulse" draggable={false} />
      </div>

      <svg
        className="hero-blueline-flow-svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-stream`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#7dd3fc" stopOpacity="1" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity={0.5 * m.glow} />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <filter id={`${uid}-glow`}>
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="hero-blueline-streamlines" filter={`url(#${uid}-glow)`}>
          {STREAMLINES.map((d, i) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke={`url(#${uid}-stream)`}
              strokeWidth={1.1 + (i % 3) * 0.25}
              strokeLinecap="round"
              strokeDasharray="120 280"
              className="hero-blueline-stream-path"
              style={{
                animationDuration: `${4.8 + (i % 4) * 0.7}s`,
                animationDelay: `${i * 0.35}s`,
                opacity: 0.35 + flowBoost * 0.45,
              }}
            />
          ))}
        </g>

        <ellipse cx="600" cy="400" rx={180 + m.glow * 90} ry={120 + m.glow * 50} fill={`url(#${uid}-core)`} />

        <g
          transform={`translate(${m.blueX * 0.6} ${m.blueY * 0.5})`}
          opacity={handOpacity}
        >
          <image
            href="/ci/blue_line_hand.svg"
            x="40"
            y="180"
            width="520"
            height="520"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        <g transform={`translate(${m.redX} 0)`} opacity={handOpacity}>
          <image
            href="/ci/right_color_hand.svg"
            x="520"
            y="160"
            width="520"
            height="520"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        <circle
          cx="600"
          cy="400"
          r={6 + m.touch * 16}
          fill="#e0f2fe"
          opacity={m.touch * 0.7}
        />
      </svg>

      <div className="hero-blueline-flow-vignette" aria-hidden="true" />
    </div>
  )
}

export function HeroBluelineFlowStatic({ className }: { className?: string }) {
  return <HeroBluelineFlow progress={0.72} className={className} />
}
