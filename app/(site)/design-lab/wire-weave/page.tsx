import { Suspense } from 'react'
import { WireWeaveLab } from '@/components/design-lab/wire-weave-lab'

export default function WireWeaveLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading wire weave…</div>}>
      <WireWeaveLab />
    </Suspense>
  )
}
