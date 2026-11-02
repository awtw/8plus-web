'use client'

import { useState } from 'react'
import { PageSection } from '@/components/page/page-section'
import { useLanguage } from '@/components/language-provider'
import { blogContent, feedPath } from '@/lib/content/blog'
import { EVENTS, track } from '@/lib/analytics'
import { SITE } from '@/lib/seo'
import '@/styles/pages/blog.css'

// Embed-form endpoint of the newsletter provider (Buttondown, Kit, …). Unset → RSS only.
const FORM_ACTION = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION
const EMAIL_FIELD = process.env.NEXT_PUBLIC_NEWSLETTER_EMAIL_FIELD || 'email'

/** Email (via external provider) + RSS subscribe band. */
export function BlogSubscribe({ location }: { location: 'blog_list' | 'blog_post' }) {
  const { locale } = useLanguage()
  const c = blogContent[locale].subscribe
  const feed = feedPath(locale)
  const feedUrl = `${SITE.url}${feed}`
  const [copied, setCopied] = useState(false)

  const copyFeed = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(feed, '_blank', 'noopener')
    }
    track(EVENTS.RSS_CLICK, { method: 'copy', cta_location: location })
  }

  return (
    <PageSection field="dark" innerClassName="blog-subscribe" id="subscribe">
      <div className="blog-subscribe-main">
        <p className="scroll-eyebrow">{c.eyebrow}</p>
        <h2 className="blog-subscribe-title">{FORM_ACTION ? c.title : c.rssTitle}</h2>
        <p className="blog-subscribe-lead">{c.lead}</p>
        {FORM_ACTION && (
          <form
            className="blog-subscribe-form"
            action={FORM_ACTION}
            method="post"
            target="_blank"
            onSubmit={() => track(EVENTS.NEWSLETTER_SUBSCRIBE, { cta_location: location })}
          >
            <label className="sr-only" htmlFor={`newsletter-${location}`}>{c.emailLabel}</label>
            <input
              id={`newsletter-${location}`}
              className="blog-subscribe-input"
              type="email"
              name={EMAIL_FIELD}
              required
              autoComplete="email"
              placeholder={c.emailPlaceholder}
            />
            <button type="submit" className="brand-button-primary blog-btn">{c.submit}</button>
          </form>
        )}
        {FORM_ACTION && <p className="blog-subscribe-note">{c.privacy}</p>}
      </div>
      <div className="blog-subscribe-rss">
        {FORM_ACTION && <h3 className="blog-subscribe-rss-title">{c.rssTitle}</h3>}
        <p className="blog-subscribe-note">{c.rssLead}</p>
        <code className="blog-subscribe-url">{feedUrl}</code>
        <div className="blog-cta-actions">
          <a
            href={feed}
            className="brand-button-secondary blog-btn"
            target="_blank"
            rel="noopener"
            onClick={() => track(EVENTS.RSS_CLICK, { method: 'open', cta_location: location })}
          >
            {c.rssOpen}
          </a>
          <button type="button" className="brand-button-secondary blog-btn" onClick={copyFeed} aria-live="polite">
            {copied ? c.rssCopied : c.rssCopy}
          </button>
        </div>
      </div>
    </PageSection>
  )
}
