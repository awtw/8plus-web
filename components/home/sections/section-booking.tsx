'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'

type SectionBookingProps = {
  locale: HomeLocale
}

export function SectionBooking({ locale }: SectionBookingProps) {
  const content = getHomeSectionContent(locale)

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

        <div className="home-booking-placeholder" role="status">
          <p>{content.booking.loading}</p>
          <p className="home-booking-placeholder-note">W4 · Cal.com embed</p>
        </div>

        <Link href="/booking" className="brand-button-primary home-booking-cta">
          {content.booking.cta}
          <ArrowRight className="h-4 w-4" weight="bold" />
        </Link>
      </div>
    </section>
  )
}
