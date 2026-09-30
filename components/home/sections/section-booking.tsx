'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'

// Cal.com is heavy (JS + fonts + third-party cookies): load it only when the
// section is about to enter the viewport.
const HomeCalInline = dynamic(() => import('@/components/booking/home-cal-inline'), { ssr: false })

type SectionBookingProps = {
  locale: HomeLocale
}

export function SectionBooking({ locale }: SectionBookingProps) {
  const content = getHomeSectionContent(locale)
  const [isCalLoaded, setIsCalLoaded] = useState(false)

  const wrapRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const onReady = useCallback(() => setIsCalLoaded(true), [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="home-section-booking"
      className="home-section home-section-booking home-section-last bg-dark noise-field"
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

        <div className="home-booking-cal-wrap" ref={wrapRef}>
          {!isCalLoaded && (
            <div className="home-booking-loading" role="status">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--border)] border-t-[color:var(--accent)]" />
                <p className="text-sm text-[color:var(--muted)]">{content.booking.loading}</p>
              </div>
            </div>
          )}

          <div className="home-booking-cal">
            {shouldLoad && <HomeCalInline onReady={onReady} />}
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
