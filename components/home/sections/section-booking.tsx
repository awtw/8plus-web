'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Cal, { getCalApi } from '@calcom/embed-react'
import { ArrowRight } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'

const CAL_NAMESPACE = '30min'
const CAL_LINK = 'august-wang-113/30min'

type SectionBookingProps = {
  locale: HomeLocale
}

export function SectionBooking({ locale }: SectionBookingProps) {
  const content = getHomeSectionContent(locale)
  const [isCalLoaded, setIsCalLoaded] = useState(false)

  useEffect(() => {
    ;(async function () {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE })
        cal('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
        })
        setIsCalLoaded(true)
      } catch (error) {
        console.error('Failed to load booking calendar:', error)
      }
    })()
  }, [])

  return (
    <section
      id="home-section-booking"
      className="home-section home-section-booking home-section-last"
      aria-labelledby="home-booking-title"
    >
      <div className="home-section-inner section-shell">
        <header className="home-section-head">
          <p className="scroll-eyebrow">{content.booking.eyebrow}</p>
          <h2 id="home-booking-title" className="home-section-title">
            {content.booking.title}
          </h2>
          <p className="scroll-lead">{content.booking.lead}</p>
        </header>

        <div className="home-booking-cal-wrap">
          {!isCalLoaded && (
            <div className="home-booking-loading" role="status">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--border)] border-t-[color:var(--accent)]" />
                <p className="text-sm text-[color:var(--muted)]">{content.booking.loading}</p>
              </div>
            </div>
          )}

          <div className="home-booking-cal">
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              style={{
                width: '100%',
                height: 'clamp(520px, 70vh, 720px)',
                overflow: 'scroll',
              }}
              config={{
                layout: 'month_view',
              }}
            />
          </div>
        </div>

        <Link href="/booking" className="brand-button-primary home-booking-cta">
          {content.booking.cta}
          <ArrowRight className="h-4 w-4" weight="bold" />
        </Link>
      </div>
    </section>
  )
}
