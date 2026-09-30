"use client";

import { Clock, VideoCamera, Globe } from "@phosphor-icons/react";
import { useLanguage } from "@/components/language-provider";
import { PageSection } from "@/components/page/page-section";
import { PageHeader } from "@/components/page/page-header";
import { BookingEmbed } from "@/components/booking/booking-embed";
import { BookingChannels } from "@/components/booking/booking-channels";
import { getBookingContent } from "@/lib/content/booking";
import "@/styles/pages/booking.css";

const specIcons = [Clock, VideoCamera, Globe];

export default function BookingPage() {
  const { locale } = useLanguage();
  const c = getBookingContent(locale);

  return (
    <PageSection field="orange" className="booking-page">
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead}>
        <span className="metric-chip booking-status">{c.status}</span>
      </PageHeader>

      <div className="booking-grid">
        <div className="booking-embed-card">
          <BookingEmbed loadingLabel={c.loading} />
        </div>

        <aside className="booking-side">
          <div className="surface-card booking-covers">
            <p className="scroll-eyebrow">{c.coversLabel}</p>
            <ul className="booking-covers-list">
              {c.covers.map((item) => (
                <li key={item}>
                  <span className="booking-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ul className="booking-specs">
              {c.specs.map((s, i) => {
                const Icon = specIcons[i];
                return (
                  <li key={s}>
                    <Icon className="h-4 w-4" weight="regular" aria-hidden="true" />
                    {s}
                  </li>
                );
              })}
            </ul>
          </div>

          <BookingChannels
            label={c.altLabel}
            lead={c.altLead}
            lineAction={c.lineAction}
          />
        </aside>
      </div>
    </PageSection>
  );
}
