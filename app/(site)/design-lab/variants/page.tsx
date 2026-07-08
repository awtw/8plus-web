import { Suspense } from 'react'
import { Hero20Gallery } from '@/components/design-lab/hero-20-gallery'

export default function VariantsDesignLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading variants…</div>}>
      <Hero20Gallery />
    </Suspense>
  )
}
