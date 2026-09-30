'use client'

import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { EVENTS, bindCalTracking, track } from '@/lib/analytics'

const CAL_NAMESPACE = '30min'
const CAL_LINK = 'august-wang-113/30min'

/**
 * Cal.com inline embed for the home page. Loaded lazily by SectionBooking
 * (dynamic import + viewport gate) so Cal's JS, fonts and third-party
 * cookies stay off the critical path.
 */
export default function HomeCalInline({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE })
        if (cancelled) return
        cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
        bindCalTracking(cal, 'home_booking')
        track(EVENTS.BOOKING_VIEW, { source: 'home_booking' })
        onReady()
      } catch (error) {
        console.error('Failed to load booking calendar:', error)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [onReady])

  return (
    <Cal
      namespace={CAL_NAMESPACE}
      calLink={CAL_LINK}
      style={{ width: '100%', height: 'clamp(520px, 70vh, 720px)', overflow: 'scroll' }}
      config={{ layout: 'month_view' }}
    />
  )
}
