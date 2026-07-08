import { Suspense } from 'react'
import { MeshSnapLab } from '@/components/design-lab/mesh-snap-lab'

export default function MeshSnapLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading mesh snap…</div>}>
      <MeshSnapLab />
    </Suspense>
  )
}
