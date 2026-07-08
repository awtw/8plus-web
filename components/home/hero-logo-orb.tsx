'use client'

import { forwardRef } from 'react'
import Image from 'next/image'

export const HeroLogoOrb = forwardRef<HTMLDivElement>(function HeroLogoOrb(_, ref) {
  return (
    <div ref={ref} className="physics-logo-orb">
      <div className="physics-logo-orbit physics-logo-orbit-a" aria-hidden />
      <div className="physics-logo-orbit physics-logo-orbit-b" aria-hidden />
      <div className="physics-logo-glow" aria-hidden />
      <div className="physics-logo-ring" aria-hidden />
      <Image
        src="/logo-light-512.png"
        alt="8plus"
        width={160}
        height={160}
        className="physics-logo-mark"
        priority
      />
    </div>
  )
})
