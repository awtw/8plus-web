'use client'

import { useEffect, useRef } from 'react'

/** Thin scroll-progress bar for long reads. Uses transform only (no layout work). */
export function ReadingProgress({ targetSelector = '.blog-prose' }: { targetSelector?: string }) {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(targetSelector)
    if (!target) return
    let raf = 0
    const update = () => {
      raf = 0
      const rect = target.getBoundingClientRect()
      const total = rect.height - window.innerHeight * 0.5
      const done = Math.min(Math.max(-rect.top + window.innerHeight * 0.2, 0), Math.max(total, 1))
      if (bar.current) bar.current.style.transform = `scaleX(${total > 0 ? done / total : 1})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [targetSelector])

  return (
    <div className="reading-progress" aria-hidden="true">
      <div ref={bar} className="reading-progress-bar" />
    </div>
  )
}
