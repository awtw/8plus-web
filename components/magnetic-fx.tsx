'use client'

import { useEffect } from 'react'

const SELECTOR = '.brand-button-primary, .hv-cta.primary'
const RADIUS = 90 // px around a button where it starts to lean toward the cursor
const PULL = 0.22

/** Primary CTAs lean toward the cursor on fine-pointer devices. One delegated listener; off for reduced motion. */
export function MagneticFx() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    let raf = 0
    let last: { x: number; y: number } | null = null
    const touched = new Set<HTMLElement>()

    const apply = () => {
      raf = 0
      if (!last) return
      const { x, y } = last
      const next = new Set<HTMLElement>()
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.bottom < -RADIUS || r.top > window.innerHeight + RADIUS) return
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = x - cx
        const dy = y - cy
        const inside = Math.abs(dx) < r.width / 2 + RADIUS && Math.abs(dy) < r.height / 2 + RADIUS
        if (inside) {
          el.style.setProperty('--mx', `${(dx * PULL).toFixed(1)}px`)
          el.style.setProperty('--my', `${(dy * PULL).toFixed(1)}px`)
          next.add(el)
        }
      })
      touched.forEach((el) => {
        if (!next.has(el)) {
          el.style.removeProperty('--mx')
          el.style.removeProperty('--my')
        }
      })
      touched.clear()
      next.forEach((el) => touched.add(el))
    }

    const onMove = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY }
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
      touched.forEach((el) => {
        el.style.removeProperty('--mx')
        el.style.removeProperty('--my')
      })
    }
  }, [])

  return null
}
