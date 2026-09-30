'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'
import { getAboutContent } from '@/lib/content/about'
import { PageSection } from '@/components/page/page-section'
import { PageHeader } from '@/components/page/page-header'
import { AboutIndex } from '@/components/about/about-index'
import '@/styles/pages/about.css'

export default function AboutPage() {
  const { locale } = useLanguage()
  const c = getAboutContent(locale)

  return (
    <>
      <PageSection field="orange">
        <div className="about-eyebrow about-rise">AUGUST WANG · AWTW · {c.eyebrow}</div>
        <div className="about-rise" style={{ ['--d' as string]: '0.08s' }}>
          <PageHeader title={c.headline} lead={c.profile} />
        </div>
        <div className="about-chips about-rise" style={{ ['--d' as string]: '0.16s' }}>
          {c.chips.map((chip) => (
            <span key={chip} className="about-chip">{chip}</span>
          ))}
        </div>
      </PageSection>

      <PageSection field="blue">
        <AboutIndex num="01" label={c.labels.collaboration}>
          <h2 className="about-h2">{c.collaborationTitle}</h2>
          <p className="about-p">{c.collaborationLead}</p>
          <div className="about-grid">
            {c.collaboration.map((item) => (
              <div key={item.title} className="gradient-border-card about-card">
                <div className="about-card-h"><span className="about-dot" /><h3>{item.title}</h3></div>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </AboutIndex>
      </PageSection>

      <PageSection field="orange">
        <AboutIndex num="02" label={c.labels.principles}>
          <h2 className="about-h2">{c.interestsTitle}</h2>
          <div className="about-grid">
            {c.interests.map((item) => (
              <div key={item.title} className="about-plain about-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </AboutIndex>
      </PageSection>

      <PageSection field="blue">
        <AboutIndex num="03" label={c.labels.experience}>
          <h2 className="about-h2">{c.experienceTitle}</h2>
          <div className="about-rows" style={{ marginTop: 28 }}>
            {c.experience.map((item) => (
              <div key={item.title} className="about-row">
                <h3>{item.title}</h3>
                <p>{item.note}</p>
              </div>
            ))}
          </div>
          <div className="about-edu" aria-label={c.educationTitle}>
            {c.education.map((edu) => (
              <div key={edu.school}>
                <div className="k">{edu.year} · {c.labels.education}</div>
                <div className="s">{edu.school}</div>
                <div className="d">{edu.degree}</div>
              </div>
            ))}
          </div>
        </AboutIndex>
      </PageSection>

      <PageSection field="dark">
        <div className="about-eyebrow">{c.labels.next}</div>
        <h2 className="about-h2" style={{ marginTop: 18, maxWidth: '24ch' }}>{c.nextTitle}</h2>
        <p className="about-p">{c.nextLead}</p>
        <div className="about-actions">
          <Link href="/booking" className="brand-button-primary">{c.bookCta} →</Link>
          <Link href="/services" className="brand-button-secondary">{c.servicesCta}</Link>
        </div>
      </PageSection>
    </>
  )
}
