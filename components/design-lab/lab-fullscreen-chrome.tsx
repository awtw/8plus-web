'use client'

import { useEffect, type ReactNode } from 'react'

/** Hides site header/footer and lets lab use full viewport. */
export function LabFullscreenChrome({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.body.dataset.labFullscreen = 'true'
    return () => {
      delete document.body.dataset.labFullscreen
    }
  }, [])

  return <div className="aw-lab-fullscreen-root">{children}</div>
}
