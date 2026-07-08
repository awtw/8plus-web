'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { scBotanicalPlacements } from '@/lib/share-hub/botanical-placements'

function BotanicalLeafMarks() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M40 120 C80 90, 120 130, 90 170 C60 150, 45 145, 40 120Z"
        fill="rgba(134,239,172,0.14)"
      />
      <path
        d="M350 220 C320 190, 370 160, 390 200 C385 230, 365 235, 350 220Z"
        fill="rgba(251,146,60,0.12)"
      />
      <path
        d="M60 620 C100 590, 130 640, 95 680 C70 660, 55 645, 60 620Z"
        fill="rgba(56,189,248,0.1)"
      />
      <path
        d="M320 640 C290 610, 340 580, 365 615 C360 650, 335 655, 320 640Z"
        fill="rgba(167,243,208,0.11)"
      />
      <circle cx="200" cy="140" r="3" fill="rgba(255,255,255,0.22)" />
      <circle cx="320" cy="380" r="2" fill="rgba(255,255,255,0.18)" />
      <circle cx="90" cy="420" r="2.5" fill="rgba(255,255,255,0.16)" />
    </svg>
  )
}

export function ShareBotanicalStage() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <BotanicalLeafMarks />

      {scBotanicalPlacements.map((plant) => (
        <motion.div
          key={plant.id}
          className="absolute"
          style={{
            top: plant.top,
            right: plant.right,
            bottom: plant.bottom,
            left: plant.left,
            width: plant.width,
            height: plant.height,
            rotate: `${plant.rotate}deg`,
            opacity: plant.opacity,
            mixBlendMode: plant.blendMode,
            filter: plant.saturate ? `saturate(${plant.saturate})` : undefined,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -plant.floatY, 0],
                  rotate: [
                    plant.rotate,
                    plant.rotate + plant.floatRotate,
                    plant.rotate,
                  ],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: plant.duration,
                  delay: plant.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        >
          <Image
            src={plant.src}
            alt=""
            fill
            className="object-contain object-bottom"
            sizes={`${plant.width}px`}
            priority={plant.id === 'bird-blue'}
          />
        </motion.div>
      ))}

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 32%, transparent 0%, rgba(0, 47, 167, 0.55) 68%, rgba(0, 47, 167, 0.92) 100%)',
        }}
      />
    </div>
  )
}
