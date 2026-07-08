import { Suspense } from 'react'
import { ScanBuildLab } from '@/components/design-lab/scan-build-lab'

export default function ScanBuildLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading scan build…</div>}>
      <ScanBuildLab />
    </Suspense>
  )
}
