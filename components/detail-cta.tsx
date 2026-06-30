'use client'

import Link from 'next/link'
import { CalendarCheck } from '@phosphor-icons/react'
import { useLanguage } from '@/components/language-provider'

export function DetailCta() {
  const { t } = useLanguage()

  return (
    <section className="mt-10 flex flex-col gap-4 p-6 surface-card-strong sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="min-w-0 max-w-xl">
        <h2 className="text-xl font-semibold tracking-[-0.03em]">
          {t('detail.bookConsultation')}
        </h2>
        <p className="mt-2 text-sm leading-7 text-[color:var(--fg-2)]">
          {t('detail.bookConsultationLead')}
        </p>
      </div>
      <Link href="/booking" className="brand-button-primary inline-flex w-full shrink-0 items-center justify-center gap-2 sm:w-auto">
        <CalendarCheck className="h-4 w-4" weight="bold" />
        {t('detail.bookConsultation')}
      </Link>
    </section>
  )
}
