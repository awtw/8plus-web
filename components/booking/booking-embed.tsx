'use client'

import { useEffect, useState } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { EVENTS, bindCalTracking, track } from '@/lib/analytics'

const CAL_NAMESPACE = '30min'
const CAL_LINK = 'august-wang-113/30min'

export function BookingEmbed({ loadingLabel }: { loadingLabel: string }) {
  const [isCalLoaded, setIsCalLoaded] = useState(false)
  // ?notes= is set by the needs check so the booking form arrives pre-filled
  const [notes] = useState(() =>
    typeof window === 'undefined' ? '' : (new URLSearchParams(window.location.search).get('notes') ?? '').slice(0, 300),
  )

  useEffect(() => {
    ;(async function () {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE })
        cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
        bindCalTracking(cal, 'booking_page')
        track(EVENTS.BOOKING_VIEW, { source: 'booking_page' })
        setIsCalLoaded(true)
      } catch (error) {
        console.error('Failed to load booking calendar:', error)
      }
    })()
  }, [])

  return (
    <div className="booking-embed">
      {!isCalLoaded && (
        <div className="booking-loading" role="status">
          <div>
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--border)] border-t-[color:var(--accent)]" />
            <p className="text-sm text-[color:var(--muted)]">{loadingLabel}</p>
          </div>
        </div>
      )}
      <div className="booking-cal">
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={CAL_LINK}
          style={{ width: '100%', height: 'clamp(520px, 70vh, 720px)', overflow: 'scroll' }}
          config={{ layout: 'month_view', ...(notes ? { notes } : {}) }}
        />
      </div>
    </div>
  )
}
