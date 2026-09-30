import type { ReactNode } from 'react'

/** Numbered editorial index column + content (Version A chronicle). */
export function AboutIndex({ num, label, children }: { num: string; label: string; children: ReactNode }) {
  return (
    <div className="about-index">
      <div>
        <div className="about-num">{num}</div>
        <div className="about-num-label">{label}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}
