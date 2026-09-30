'use client'

import { useEffect, useState } from 'react'
import { shouldAnimate } from '@/lib/motion/frame-loop'

/** Types text out character by character; click/tap skips. Instant under reduced motion. */
export function Typewriter({ text, onDone, speed = 24 }: { text: string; onDone?: () => void; speed?: number }) {
  const [n, setN] = useState(0)
  const chars = Array.from(text)
  const done = n >= chars.length

  useEffect(() => {
    if (!shouldAnimate()) {
      setN(chars.length)
      return
    }
    setN(0)
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setN(i)
      if (i >= chars.length) window.clearInterval(id)
    }, speed)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    if (done) onDone?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

  // Full text is laid out invisibly so the bubble never changes size while typing (no layout shift).
  return (
    <span onClick={() => setN(chars.length)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.slice(0, n).join('')}
        {!done && <span className="quiz-caret" />}
        <span style={{ visibility: 'hidden' }}>{chars.slice(n).join('')}</span>
      </span>
    </span>
  )
}
