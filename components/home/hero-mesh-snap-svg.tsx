'use client'

import { useId, useMemo } from 'react'
import {
  BLUE_HAND_IMG,
  BLUE_HAND_PIVOT,
  getBlueHandWarp,
} from '@/lib/hero/blue-hand-warp'
import { getMeshSnapMotion } from '@/lib/hero/mesh-snap-motion'

type HeroMeshSnapSvgProps = {
  progress: number
  className?: string
}

const TOUCH_LOCAL = { x: 598 - 0, y: 392 - 0 }
const FINGER_ORDER = ['thumb', 'pinky', 'ring', 'middle', 'index'] as const
const PALM_CLIP = 'M 70 660 L 110 420 L 240 300 L 380 280 L 450 420 L 360 660 Z'

export function HeroMeshSnapSvg({ progress, className }: HeroMeshSnapSvgProps) {
  const uid = useId().replace(/:/g, '')
  const m = useMemo(() => getMeshSnapMotion(progress), [progress])
  const warp = useMemo(() => getBlueHandWarp(progress), [progress])

  const globalBlue = `translate(${m.blueX} ${m.blueY}) rotate(${m.blueRot} ${BLUE_HAND_PIVOT.x} ${BLUE_HAND_PIVOT.y})`
  const palmSquash = 1 - warp.curl * 0.04
  const palmStretch = 1 + warp.curl * 0.03
  const px = BLUE_HAND_PIVOT.x
  const py = BLUE_HAND_PIVOT.y
  const palmTransform = `translate(${px} ${py}) scale(${palmSquash} ${palmStretch}) translate(${-px} ${-py})`

  const touchLocal = {
    x: TOUCH_LOCAL.x - m.blueX,
    y: TOUCH_LOCAL.y - m.blueY,
  }

  return (
    <div className={className ?? 'hero-mesh-snap-root'}>
      <svg
        className="hero-mesh-snap-svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${uid}-touch`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity={0.85 * m.glow} />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>

          <clipPath id={`${uid}-palm`}>
            <path d={PALM_CLIP} />
          </clipPath>

          {warp.fingers.map((f) => (
            <clipPath key={f.id} id={`${uid}-clip-${f.id}`}>
              <path d={f.clip} />
            </clipPath>
          ))}

          <filter id={`${uid}-displace`} x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.042"
              numOctaves={2}
              seed={4}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={warp.warp}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <rect width="1200" height="800" fill="#000" />

        <g transform={`translate(${m.redX} 0)`}>
          <image
            href="/ci/right_color_hand.svg"
            x="500"
            y="110"
            width="580"
            height="580"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        <g transform={globalBlue}>
          <g filter={warp.warp > 0.5 ? `url(#${uid}-displace)` : undefined}>
            <g clipPath={`url(#${uid}-palm)`} transform={palmTransform}>
              <image
                href="/ci/blue_line_hand.svg"
                x={BLUE_HAND_IMG.x}
                y={BLUE_HAND_IMG.y}
                width={BLUE_HAND_IMG.w}
                height={BLUE_HAND_IMG.h}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>

            {FINGER_ORDER.map((id) => {
              const f = warp.fingers.find((finger) => finger.id === id)
              if (!f) return null
              const { x: kx, y: ky } = f.pivot
              const fingerTransform = `translate(${f.tx} ${f.ty}) rotate(${f.rotate} ${kx} ${ky}) skewX(${f.skewX})`

              return (
                <g key={f.id} clipPath={`url(#${uid}-clip-${f.id})`} transform={fingerTransform}>
                  <image
                    href="/ci/blue_line_hand.svg"
                    x={BLUE_HAND_IMG.x}
                    y={BLUE_HAND_IMG.y}
                    width={BLUE_HAND_IMG.w}
                    height={BLUE_HAND_IMG.h}
                    preserveAspectRatio="xMidYMid meet"
                  />
                </g>
              )
            })}
          </g>

          <line
            x1={warp.indexTip.x}
            y1={warp.indexTip.y}
            x2={touchLocal.x}
            y2={touchLocal.y}
            stroke="#7dd3fc"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="140"
            strokeDashoffset={140 * (1 - m.touch)}
            opacity={m.touch * 0.95}
          />

          <circle
            cx={warp.indexTip.x}
            cy={warp.indexTip.y}
            r={4 + m.touch * 5}
            fill="#e0f2fe"
            opacity={0.35 + m.touch * 0.65}
          />
          <circle
            cx={touchLocal.x}
            cy={touchLocal.y}
            r={14 + m.glow * 22}
            fill={`url(#${uid}-touch)`}
          />
          <circle
            cx={touchLocal.x}
            cy={touchLocal.y}
            r={3.5}
            fill="#fff"
            opacity={m.touch * 0.9}
          />
        </g>
      </svg>
    </div>
  )
}

export function HeroMeshSnapStatic({ className }: { className?: string }) {
  return <HeroMeshSnapSvg progress={1} className={className} />
}
