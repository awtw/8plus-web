/**
 * Shared requestAnimationFrame driver for decorative canvas scenes.
 *
 * - pauses while the tab is hidden or the host element is off-screen
 * - caps to 30fps on small viewports (<768px) to save battery
 * - draws a single static frame when the user prefers reduced motion or
 *   has Data Saver enabled
 */

type FrameLoopOptions = {
  /** Element whose visibility gates the loop (usually the canvas parent). */
  host?: Element | null
  /** Called once per frame. */
  frame: () => void
}

type NetworkInformationLike = { saveData?: boolean }

export function shouldAnimate(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  if (conn?.saveData) return false
  return true
}

export function startFrameLoop({ host, frame }: FrameLoopOptions): () => void {
  if (!shouldAnimate()) {
    frame()
    return () => {}
  }

  const minInterval = window.innerWidth < 768 ? 1000 / 30 : 0
  let raf = 0
  let last = 0
  let inView = true
  let tabVisible = document.visibilityState !== 'hidden'
  let disposed = false

  const tick = (now: number) => {
    if (disposed) return
    raf = 0
    if (!minInterval || now - last >= minInterval) {
      last = now
      frame()
    }
    schedule()
  }

  const schedule = () => {
    if (disposed || raf || !inView || !tabVisible) return
    raf = requestAnimationFrame(tick)
  }

  const onVisibility = () => {
    tabVisible = document.visibilityState !== 'hidden'
    if (tabVisible) schedule()
    else if (raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }
  document.addEventListener('visibilitychange', onVisibility)

  let observer: IntersectionObserver | null = null
  if (host && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) schedule()
      else if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    observer.observe(host)
  }

  schedule()

  return () => {
    disposed = true
    if (raf) cancelAnimationFrame(raf)
    document.removeEventListener('visibilitychange', onVisibility)
    observer?.disconnect()
  }
}
