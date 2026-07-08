import { Suspense } from 'react'
import { HalftoneTrustLab } from '@/components/design-lab/halftone-trust-lab'

export default function HalftoneTrustLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading halftone trust…</div>}>
      <HalftoneTrustLab />
    </Suspense>
  )
}
