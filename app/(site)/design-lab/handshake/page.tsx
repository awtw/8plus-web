import { Suspense } from 'react'
import { HandshakeLab } from '@/components/design-lab/handshake-lab'

export default function HandshakeDesignLabPage() {
  return (
    <Suspense fallback={<div className="aw-lab-loading">Loading handshake lab…</div>}>
      <HandshakeLab />
    </Suspense>
  )
}
