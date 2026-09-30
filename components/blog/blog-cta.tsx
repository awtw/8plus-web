'use client'

import Link from 'next/link'
import { PageSection } from '@/components/page/page-section'
import { useLanguage } from '@/components/language-provider'
import { blogContent } from '@/lib/content/blog'
import '@/styles/pages/blog.css'

/** Closing orange band linking to /booking. */
export function BlogCta() {
  const { locale } = useLanguage()
  const c = blogContent[locale]
  return (
    <PageSection field="orange">
      <h2 className="blog-cta-title">{c.ctaTitle}</h2>
      <p className="blog-cta-lead">{c.ctaLead}</p>
      <div className="blog-cta-actions">
        <Link href="/booking" className="brand-button-primary blog-btn">{c.ctaPrimary}</Link>
        <Link href="/services" className="brand-button-secondary blog-btn">{c.ctaSecondary}</Link>
      </div>
    </PageSection>
  )
}
