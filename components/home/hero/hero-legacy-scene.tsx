// @ts-nocheck
'use client'
// Lazy chunk: every experimental hero scene (?hero=<key> or the Shift switcher). The shipped defaults
// (aurora on desktop, pocket on phones) are imported statically by hero-v2 and never load this file.
import React from 'react'
import { HERO_BACKDROPS, HeroBackdropStyles } from './hero-backdrops'

export default function LegacyScene({ variant, order }: { variant: string; order: string[] }) {
  return (
    <>
      <HeroBackdropStyles />
      {order.map((v) => { const C = HERO_BACKDROPS[v]; return C ? <C key={v} active={variant === v} /> : null })}
    </>
  )
}
