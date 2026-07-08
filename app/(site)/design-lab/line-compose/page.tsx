import { Suspense } from 'react'
import { HeroLineComposeGallery } from '@/components/design-lab/hero-line-compose-gallery'

export default function LineComposePage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading line compose…</div>}>
      <HeroLineComposeGallery />
    </Suspense>
  )
}
