import { Suspense } from 'react'
import { SquareBridgeLab } from '@/components/design-lab/square-bridge-lab'

export default function SquareBridgeLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading square bridge…</div>}>
      <SquareBridgeLab />
    </Suspense>
  )
}
