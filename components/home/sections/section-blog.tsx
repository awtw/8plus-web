'use client'

import Link from 'next/link'
import { posts } from '.velite'
import { ArrowRight, ArrowSquareOut, BookOpen } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'

type SectionBlogProps = {
  locale: HomeLocale
}

function getRecentPosts(locale: HomeLocale) {
  return posts
    .filter(
      (post) =>
        post.published &&
        (post.locale === locale || (locale === 'zh-TW' && post.locale === 'zh-Hant')),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
}

export function SectionBlog({ locale }: SectionBlogProps) {
  const content = getHomeSectionContent(locale)
  const recentPosts = getRecentPosts(locale)
  const dateLocale = locale === 'zh-TW' ? 'zh-TW' : 'en-US'

  return (
    <section
      id="home-section-blog"
      className="home-section home-section-blog"
      aria-labelledby="home-blog-title"
    >
      <div className="home-section-inner section-shell">
        <header className="home-section-head home-section-head-row">
          <div>
            <p className="scroll-eyebrow">{content.blog.eyebrow}</p>
            <h2 id="home-blog-title" className="home-section-title">
              {content.blog.title}
            </h2>
          </div>
          <Link href="/blog" className="home-section-link">
            {content.blog.moreCta}
            <ArrowRight className="h-3.5 w-3.5" weight="bold" />
          </Link>
        </header>

        <ul className="home-blog-list">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <article className="home-blog-card">
                <div className="home-blog-card-meta">
                  <BookOpen className="h-3.5 w-3.5" weight="bold" />
                  <span>Journal</span>
                </div>
                <h3 className="home-blog-card-title">{post.title}</h3>
                <p className="home-blog-card-summary">{post.summary}</p>
                <div className="home-blog-card-footer">
                  <time className="home-blog-card-date" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(dateLocale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <Link href={post.url} className="home-section-link">
                    {content.blog.readCta}
                    <ArrowSquareOut className="h-4 w-4" weight="bold" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
