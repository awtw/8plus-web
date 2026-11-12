'use client'

import { useEffect, useState } from "react"

/**
 * True on devices with a fine pointer and hover (desktop/laptop), where a QR code is useful:
 * the visitor scans it with their phone. On phones/tablets a QR on their own screen cannot be
 * scanned, so LINE / Instagram rows should open the app link directly instead.
 * Starts false so the server render (and no-JS / pre-hydration taps) use the plain link.
 */
export function usePrefersQr(): boolean {
  const [prefersQr, setPrefersQr] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setPrefersQr(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return prefersQr
}
