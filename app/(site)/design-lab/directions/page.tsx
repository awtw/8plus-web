import { Suspense } from 'react'
import { HeroDirectionGallery } from '@/components/design-lab/hero-direction-gallery'

export default function HeroDirectionsPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading directions…</div>}>
      <HeroDirectionGallery />
    </Suspense>
  )
}
