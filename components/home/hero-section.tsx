'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/language-provider'
import { HeroLogoCinema } from '@/components/home/hero-logo-cinema'
import { ArrowRight, CalendarCheck } from '@phosphor-icons/react'

type HeroSectionProps = {
  stats: Array<{ label: string; value: string }>
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function HeroSection({ stats }: HeroSectionProps) {
  const { t } = useLanguage()

  return (
    <section className="cinema-hero">
      <div className="section-shell cinema-hero-grid">
          <motion.div className="cinema-hero-copy" initial="hidden" animate="show">
            <motion.div custom={0} variants={fade} className="cinema-hero-meta">
              <span className="text-eyebrow cinema-hero-eyebrow-tone">{t('home.heroBadge')}</span>
              <span className="cinema-hero-index">01</span>
            </motion.div>

            <motion.h1 custom={0.06} variants={fade} className="cinema-hero-title">
              <span className="text-h1 cinema-hero-brand">8plus</span>
              <span className="text-h2 cinema-hero-line">{t('home.heroTitle1')}</span>
              <span className="text-h5 cinema-hero-line cinema-hero-line-muted">{t('home.heroTitle2')}</span>
            </motion.h1>

            <motion.p custom={0.12} variants={fade} className="body-lead cinema-hero-lead">
              {t('home.heroLead')}
            </motion.p>

            <motion.div custom={0.18} variants={fade} className="cinema-hero-actions">
              <Link href="/booking" className="cinema-hero-btn-primary">
                <CalendarCheck className="h-4 w-4" weight="bold" />
                {t('home.bookCall')}
              </Link>
              <Link href="/projects" className="cinema-hero-btn-ghost">
                {t('home.viewProjects')}
                <ArrowRight className="h-4 w-4" weight="bold" />
              </Link>
            </motion.div>

            <motion.div custom={0.24} variants={fade} className="cinema-hero-metrics">
              {stats.map((stat, index) => (
                <div key={stat.label} className="cinema-hero-metric">
                  <span className="cinema-hero-metric-value">{stat.value}</span>
                  <span className="cinema-hero-metric-label">{stat.label}</span>
                  {index < stats.length - 1 && <span className="cinema-hero-metric-divider" aria-hidden />}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="cinema-hero-visual"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroLogoCinema />
          </motion.div>
      </div>
    </section>
  )
}
