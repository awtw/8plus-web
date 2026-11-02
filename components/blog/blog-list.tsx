'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { posts } from '.velite'
import { PageSection } from '@/components/page/page-section'
import { PageHeader } from '@/components/page/page-header'
import { useLanguage } from '@/components/language-provider'
import { BLOG_CATEGORIES, blogContent, type BlogCategory, type BlogContent } from '@/lib/content/blog'
import { BlogCta } from './blog-cta'
import { BlogSubscribe } from './blog-subscribe'
import '@/styles/pages/blog.css'

type Post = (typeof posts)[number]
type Filter = 'all' | BlogCategory

const isCategory = (value: string | null): value is BlogCategory =>
  BLOG_CATEGORIES.includes(value as BlogCategory)

function PostCard({ post, c, locale, featured = false }: { post: Post; c: BlogContent; locale: string; featured?: boolean }) {
  return (
    <Link href={post.url} className={`gradient-border-card blog-card${featured ? ' blog-card-featured' : ''}`}>
      <div className="blog-card-head">
        <span className="blog-category">{c.categories[post.category].label}</span>
        {post.kind === 'note' && <span className="blog-note-badge">{c.noteBadge}</span>}
        {featured && <span className="blog-latest-badge">{c.latest}</span>}
      </div>
      <time className="blog-meta" dateTime={post.date}>
        {new Date(post.date).toLocaleDateString(locale === 'zh-TW' ? 'zh-TW' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        })}
      </time>
      <h3 className="blog-card-title">{post.title}</h3>
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
  )
}

export function BlogList() {
  const { t, locale } = useLanguage()
  const c = blogContent[locale]
  const [filter, setFilter] = useState<Filter>('all')

  // ?category=ai keeps a topic shareable; read after mount to stay static-renderable
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('category')
    if (isCategory(value)) setFilter(value) // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  const selectFilter = (next: Filter) => {
    setFilter(next)
    const url = new URL(window.location.href)
    if (next === 'all') url.searchParams.delete('category')
    else url.searchParams.set('category', next)
    window.history.replaceState(null, '', url)
  }

  const localePosts = posts
    .filter((post) => post.locale === locale)
    .sort((a, b) => b.date.localeCompare(a.date))
  const counts = Object.fromEntries(
    BLOG_CATEGORIES.map((key) => [key, localePosts.filter((post) => post.category === key).length]),
  ) as Record<BlogCategory, number>
  const activeCategories = BLOG_CATEGORIES.filter((key) => counts[key] > 0)
  const visible = filter === 'all' ? localePosts : localePosts.filter((post) => post.category === filter)

  // Newest post spans its month's row on the unfiltered view
  const featured = filter === 'all' ? visible[0] : undefined
  const months: { key: string; posts: Post[] }[] = []
  for (const post of visible) {
    const key = post.date.slice(0, 7)
    const group = months.at(-1)
    if (group?.key === key) group.posts.push(post)
    else months.push({ key, posts: [post] })
  }

  return (
    <>
      <PageSection field="blue">
        <PageHeader eyebrow={c.eyebrow} title={t('blog.title')} lead={t('blog.description')}>
          <div className="blog-stats">
            <span>{c.count(localePosts.length)}</span>
            <span>{c.topics(activeCategories.length)}</span>
            {localePosts[0] && <time dateTime={localePosts[0].date}>{c.lastUpdated(localePosts[0].date)}</time>}
            <a href="#subscribe" className="blog-stats-subscribe">
              {c.subscribe.jump} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </PageHeader>

        <div className="blog-filters" role="group" aria-label={locale === 'en' ? 'Topics' : '主題'}>
          {(['all', ...activeCategories] as const).map((key) => (
            <button
              key={key}
              type="button"
              className={`blog-filter${filter === key ? ' is-active' : ''}`}
              aria-pressed={filter === key}
              onClick={() => selectFilter(key)}
            >
              {key === 'all' ? c.filterAll : c.categories[key].label}
              <span className="blog-filter-count">{key === 'all' ? localePosts.length : counts[key]}</span>
            </button>
          ))}
        </div>
        {filter !== 'all' && <p className="blog-category-description">{c.categories[filter].description}</p>}

        {visible.length === 0 ? (
          <div className="surface-card blog-empty">
            <p>{t('blog.noPosts')}</p>
          </div>
        ) : (
          <>
            {months.map((month) => (
              <section key={month.key} className="blog-month" aria-labelledby={`month-${month.key}`}>
                <h2 id={`month-${month.key}`} className="blog-month-title">
                  {c.monthLabel(month.key)}
                  <span className="blog-month-count">{c.monthCount(month.posts.length)}</span>
                </h2>
                <div className="blog-grid">
                  {month.posts.map((post) => (
                    <PostCard key={post.slug} post={post} c={c} locale={locale} featured={post === featured} />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </PageSection>
      <BlogSubscribe location="blog_list" />
      <BlogCta />
    </>
  )
}
