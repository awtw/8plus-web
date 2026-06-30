'use client'

import Link from "next/link";
import { CalendarCheck } from "@phosphor-icons/react";
import { useLanguage } from "@/components/language-provider";
import { getProcessPricingContent } from "@/lib/content/process-pricing";
import { ProcessSteps } from "@/components/process-steps";

export default function ProcessPage() {
  const { locale } = useLanguage();
  const { process } = getProcessPricingContent(locale);

  return (
    <div className="section-shell py-10 sm:py-14 lg:py-16">
      <header className="mb-8 max-w-2xl">
        <p className="eyebrow">{process.eyebrow}</p>
        <h1 className="display-title mt-4 text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.04em]">
          {process.title}
        </h1>
        <p className="body-lead mt-4">{process.lead}</p>
      </header>

      <ProcessSteps steps={process.steps} />

      <div className="mt-10 flex flex-col gap-4 p-6 surface-card-strong sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="min-w-0 text-sm text-[color:var(--fg-2)]">{process.lead}</p>
        <Link href="/booking" className="brand-button-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto">
          <CalendarCheck className="h-4 w-4" weight="bold" />
          {process.cta}
        </Link>
      </div>
    </div>
  );
}
