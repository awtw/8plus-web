import { Suspense } from 'react'
import DesignLabClient from './design-lab-client'

export default function DesignLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading section-shell">Loading design lab…</div>}>
      <DesignLabClient />
    </Suspense>
  )
}
