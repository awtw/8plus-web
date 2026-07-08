'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import type { HomeLocale } from '@/lib/content/home-sections'
import { getHomeSectionContent } from '@/lib/content/home-sections'
import { getHomeStoryChapters } from '@/lib/content/home-story-chapters'
import { Logo } from '@/components/logo'

type SectionAboutProps = {
  locale: HomeLocale
}

export function SectionAbout({ locale }: SectionAboutProps) {
  const content = getHomeSectionContent(locale)
  const chapters = getHomeStoryChapters(locale)

  return (
    <section
      id="home-section-about"
      className="home-section home-section-about"
      aria-labelledby="home-about-title"
    >
      <div className="home-section-inner section-shell">
        <header className="home-section-head">
          <p className="scroll-eyebrow">{content.about.eyebrow}</p>
          <h2 id="home-about-title" className="home-section-title">
            {content.about.title}
          </h2>
          <p className="scroll-lead">{content.about.lead}</p>
        </header>

        <ol className="home-story-chapters">
          {chapters.map((chapter, index) => (
            <li key={chapter.id} className="home-story-chapter">
              <span className="home-story-chapter-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="home-story-chapter-title">{chapter.title}</h3>
                <p className="home-story-chapter-lead">{chapter.lead}</p>
                <p className="home-story-chapter-body">{chapter.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <Link href="/about" className="home-section-link">
          {content.about.moreCta}
          <ArrowRight className="h-3.5 w-3.5" weight="bold" />
        </Link>
      </div>
    </section>
  )
}
