"use client";

import React, { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useLanguage } from "@/components/language-provider";
import { CalendarCheck, Lightning } from "@phosphor-icons/react";

const bookingCardKeys = ["ready", "topics", "clarify"] as const;

export default function BookingPage() {
  const { t, tn } = useLanguage();
  const [isCalLoaded, setIsCalLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "60min" });
        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        setIsCalLoaded(true);
      } catch (error) {
        console.error("Failed to load booking calendar:", error);
      }
    })();
  }, []);

  return (
    <div className="section-shell py-12 sm:py-16 lg:py-20">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card p-6 sm:p-8">
          <span className="eyebrow">
            <CalendarCheck className="h-3.5 w-3.5" weight="bold" />
            {t("booking.title")}
          </span>
          <h1 className="display-title mt-5 text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.04em]">
            {t("booking.title")}
          </h1>
          <p className="body-lead mt-4">
            {t("booking.subtitle")}
          </p>

          <div className="mt-6 rounded-[22px] border border-border-soft bg-[color:var(--surface)] p-5">
            <h2 className="text-lg font-semibold tracking-[-0.02em]">
              {t("booking.servicesInclude")}
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--fg-2)]">
              {tn("booking.services").map((service: string) => (
                <li key={service} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="metric-chip">{t("nav.projects")}</span>
            <span className="metric-chip">{t("nav.blog")}</span>
          </div>
        </div>

        <div className="surface-card-strong p-4 sm:p-6">
          {!isCalLoaded && (
            <div className="flex min-h-[min(30rem,70vh)] items-center justify-center rounded-[22px] border border-border-soft bg-[color:var(--surface)]">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--border)] border-t-[color:var(--accent)]" />
                <p className="text-sm text-[color:var(--muted)]">{t("booking.loading")}</p>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-[22px] border border-border-soft bg-[color:var(--bg)]">
            <Cal
              namespace="60min"
              calLink="august-wang-113/60min"
              style={{
                width: "100%",
                height: "clamp(520px, 70vh, 720px)",
                overflow: "scroll",
              }}
              config={{
                layout: "month_view",
              }}
            />
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {bookingCardKeys.map((key) => {
          const card = tn(`booking.cards.${key}`) as { title: string; desc: string };
          return (
            <div key={key} className="surface-card p-5">
              <div className="flex items-center gap-2">
                <Lightning className="h-4 w-4 text-[color:var(--accent)]" weight="bold" />
                <h3 className="text-base font-semibold">{card.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{card.desc}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
