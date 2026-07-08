import { Suspense } from 'react'
import { BlueHandMeridianLab } from '@/components/design-lab/blue-hand-meridian-lab'

export default function BlueHandMeridianLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading blue meridian…</div>}>
      <BlueHandMeridianLab />
    </Suspense>
  )
}
