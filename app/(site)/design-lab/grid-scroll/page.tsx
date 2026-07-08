import { Suspense } from 'react'
import { GridScrollLab } from '@/components/design-lab/grid-scroll-lab'

export default function GridScrollLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading grid scroll…</div>}>
      <GridScrollLab />
    </Suspense>
  )
}
