import { Suspense } from 'react'
import DesignLabClient from '../design-lab-client'

export default function CanvasDesignLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading section-shell">Loading canvas lab…</div>}>
      <DesignLabClient />
    </Suspense>
  )
}
