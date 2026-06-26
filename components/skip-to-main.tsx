'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'

export function SkipToMain() {
  const { t } = useLanguage()

  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-[color:var(--fg)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[color:var(--bg)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
    >
      {t('common.skipToMain')}
    </Link>
  )
}
