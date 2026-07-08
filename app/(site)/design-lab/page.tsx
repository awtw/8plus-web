import { Suspense } from 'react'
import { HeroDirectionGallery } from '@/components/design-lab/hero-direction-gallery'

export default function DesignLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading design lab…</div>}>
      <HeroDirectionGallery />
    </Suspense>
  )
}
