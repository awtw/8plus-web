'use client'

export function HeroGlow() {
  return (
    <div className="aurora-glow-stage" aria-hidden>
      <div className="aurora-glow-arc aurora-glow-arc-main" />
      <div className="aurora-glow-arc aurora-glow-arc-side" />
      <div className="aurora-glow-beam" />
      <div className="aurora-glow-grid" />
      <div className="aurora-glow-vignette" />
    </div>
  )
}
