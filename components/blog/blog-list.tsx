'use client'

import Link from 'next/link'
import { posts } from '.velite'
import { PageSection } from '@/components/page/page-section'
import { PageHeader } from '@/components/page/page-header'
import { useLanguage } from '@/components/language-provider'
import { blogContent } from '@/lib/content/blog'
import { BlogCta } from './blog-cta'
import '@/styles/pages/blog.css'

export function BlogList() {
  const { t, locale } = useLanguage()
  const c = blogContent[locale]
  const published = posts
    .filter((post) => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <>
      <PageSection field="blue">
        <PageHeader eyebrow={c.eyebrow} title={t('blog.title')} lead={t('blog.description')} />
        <p className="blog-count">{c.count(published.length)}</p>

        {published.length === 0 ? (
          <div className="surface-card blog-empty">
            <p>{t('blog.noPosts')}</p>
          </div>
        ) : (
          <div className="blog-grid">
            {published.map((post) => (
              <Link key={post.slug} href={post.url} className="gradient-border-card blog-card">
                <time className="blog-meta" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(locale === 'zh-TW' ? 'zh-TW' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-summary">{post.summary}</p>
                {post.tags && post.tags.length > 0 && (
                  <ul className="blog-tags">
                    {post.tags.map((tag) => (
                      <li key={tag} className="blog-tag">{tag}</li>
                    ))}
                  </ul>
                )}
                <span className="blog-card-more">{c.read} <span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
        )}
      </PageSection>
      <BlogCta />
    </>
  )
}
