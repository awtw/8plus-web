'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const PHOTOS = ['/me/me_1.jpg', '/me/me_2.jpg'] as const

const DISPLAY_MS = 3400
const FLIP_HALF_MS = 260

const FLIP_EASE_IN = [0.42, 0, 1, 1] as const
const FLIP_EASE_OUT = [0, 0, 0.2, 1] as const

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

async function flipPhoto(controls: ReturnType<typeof useAnimation>) {
  const half = FLIP_HALF_MS / 1000

  await controls.start({
    rotateY: 90,
    transition: { duration: half, ease: FLIP_EASE_IN },
  })
  await controls.start({
    rotateY: 180,
    transition: { duration: half, ease: FLIP_EASE_OUT },
  })
  controls.set({ rotateY: 0 })
}

export function ShareSocialAvatar() {
  const [index, setIndex] = useState(0)
  const flippingRef = useRef(false)
  const photoControls = useAnimation()

  const runFlip = useCallback(async () => {
    if (flippingRef.current) return
    flippingRef.current = true

    const swapTimer = window.setTimeout(() => {
      setIndex((i) => (i + 1) % PHOTOS.length)
    }, FLIP_HALF_MS)

    try {
      await flipPhoto(photoControls)
    } finally {
      window.clearTimeout(swapTimer)
      photoControls.set({ rotateY: 0 })
      flippingRef.current = false
    }
  }, [photoControls])

  useEffect(() => {
    let cancelled = false

    async function loop() {
      while (!cancelled) {
        await sleep(DISPLAY_MS)
        if (cancelled) break
        await runFlip()
      }
    }

    void loop()
    return () => {
      cancelled = true
    }
  }, [runFlip])

  return (
    <div className="relative mx-auto mb-3 h-[clamp(5.25rem,18vh,7.75rem)] w-[clamp(5.25rem,18vh,7.75rem)] sm:mb-4">
      <div className="relative h-full w-full" style={{ perspective: '960px' }}>
        <motion.div
          animate={photoControls}
          className="absolute inset-0 overflow-hidden rounded-full ring-2 ring-white/35 shadow-[0_14px_36px_rgba(0,0,0,0.28)]"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <Image
            src={PHOTOS[index]}
            alt=""
            fill
            className="object-cover"
            sizes="128px"
            priority
          />
        </motion.div>
      </div>
    </div>
  )
}
