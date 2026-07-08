import { Suspense } from 'react'
import { PortalSplitLab } from '@/components/design-lab/portal-split-lab'

export default function PortalSplitLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading portal split…</div>}>
      <PortalSplitLab />
    </Suspense>
  )
}
