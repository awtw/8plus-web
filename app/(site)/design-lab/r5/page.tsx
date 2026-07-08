import { Suspense } from 'react'
import { R5SelectionLab } from '@/components/design-lab/r5-selection-lab'

export default function R5SelectionLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading R5 selection…</div>}>
      <R5SelectionLab />
    </Suspense>
  )
}
