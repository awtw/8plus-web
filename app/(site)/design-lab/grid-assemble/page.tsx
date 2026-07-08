import { Suspense } from 'react'
import { GridAssembleLab } from '@/components/design-lab/grid-assemble-lab'

export default function GridAssembleLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading grid assemble…</div>}>
      <GridAssembleLab />
    </Suspense>
  )
}
