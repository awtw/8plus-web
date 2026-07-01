'use client'

import Link from "next/link";
import { CalendarCheck } from "@phosphor-icons/react";
import { useLanguage } from "@/components/language-provider";
import { getProcessPricingContent } from "@/lib/content/process-pricing";
import { FaqSection } from "@/components/faq-section";

export default function PricingPage() {
  const { locale, t } = useLanguage();
  const { pricing, faq } = getProcessPricingContent(locale);

  return (
    <div className="section-shell py-10 sm:py-14 lg:py-16">
      <header className="mb-8 max-w-2xl">
        <p className="eyebrow">{pricing.eyebrow}</p>
        <h1 className="display-title mt-4 text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.04em]">
          {pricing.title}
        </h1>
        <p className="body-lead mt-4">{pricing.lead}</p>
        <p className="mt-3 text-sm text-[color:var(--muted)]">{pricing.note}</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {pricing.tiers.map((tier) => (
          <article key={tier.name} className="surface-card flex flex-col p-6 sm:p-7">
            <h2 className="text-xl font-semibold tracking-[-0.03em]">{tier.name}</h2>
            <p className="mt-2 text-2xl font-semibold text-[color:var(--accent)]">{tier.range}</p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{tier.description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
              {tier.bestFor}
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-[color:var(--fg-2)]">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 p-6 surface-card-strong sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="min-w-0 text-sm text-[color:var(--fg-2)]">{pricing.note}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <Link href="/contact" className="brand-button-secondary inline-flex w-full items-center justify-center gap-2 sm:w-auto">
            {pricing.cta}
          </Link>
          <Link href="/booking" className="brand-button-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto">
            <CalendarCheck className="h-4 w-4" weight="bold" />
            {t("home.bookNow")}
          </Link>
        </div>
      </div>

      <FaqSection items={faq} className="mt-14" />
    </div>
  );
}
