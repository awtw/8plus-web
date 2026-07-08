import { Suspense } from 'react'
import { HeroTrioLab } from '@/components/design-lab/hero-trio-lab'

export default function Phase4DesignLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading phase4 lab…</div>}>
      <HeroTrioLab />
    </Suspense>
  )
}
