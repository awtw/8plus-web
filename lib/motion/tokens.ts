/**
 * Motion tokens — single source of truth for JS-driven motion.
 * Keep in sync with the CSS custom properties in styles/globals.css
 * (--motion-fast/base/slow, --ease-standard/out/in-out).
 */
export const MOTION = {
  duration: {
    fast: 0.15,
    base: 0.2,
    slow: 0.55,
  },
  ease: {
    standard: [0.2, 0, 0, 1],
    out: [0.16, 1, 0.3, 1],
    inOut: [0.65, 0, 0.35, 1],
  },
  /** Seconds between staggered children. */
  stagger: 0.06,
  /** Default reveal travel in px. */
  distance: 24,
} as const
