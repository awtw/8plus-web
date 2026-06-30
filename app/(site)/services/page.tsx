'use client'

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { getProcessPricingContent } from "@/lib/content/process-pricing";
import { FaqSection } from "@/components/faq-section";

export default function ServicesPage() {
  const { locale, t, tn } = useLanguage();
  const items = tn("services.items") as Array<{ title: string; desc: string }>;
  const { faq } = getProcessPricingContent(locale);

  return (
    <div className="section-shell py-12 sm:py-16 lg:py-20">
      <section className="max-w-5xl">
        <span className="eyebrow">{t("services.eyebrow")}</span>
        <h1 className="display-title mt-5 text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.04em]">
          {t("services.headline")}
        </h1>
        <p className="body-lead mt-4 max-w-3xl">
          {t("services.lead")}
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="surface-card p-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em]">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{item.desc}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/booking" className="brand-button-primary inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
          {t("services.bookCta")}
        </Link>
        <Link href="/about" className="brand-button-secondary inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
          {t("services.aboutCta")}
        </Link>
        <Link href="/pricing" className="ghost-action inline-flex items-center gap-2 px-4 py-2 text-sm">
          {t("nav.pricing")}
        </Link>
      </section>

      <FaqSection items={faq} title={locale === "zh-TW" ? "常見問題" : "FAQ"} className="mt-14 max-w-3xl" />
    </div>
  );
}
