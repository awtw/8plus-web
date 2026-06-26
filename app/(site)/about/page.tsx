'use client'

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { getAboutContent, type AboutInterestIcon } from "@/lib/content/about";
import { motion } from "framer-motion";
import {
  BookOpen,
  Cat,
  Cloud,
  FilmStrip,
  GraduationCap,
  Lightning,
  Sparkle,
} from "@phosphor-icons/react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as const } },
};

const interestIcons: Record<AboutInterestIcon, React.ReactNode> = {
  book: <BookOpen className="h-4 w-4" weight="bold" />,
  cloud: <Cloud className="h-4 w-4" weight="bold" />,
  film: <FilmStrip className="h-4 w-4" weight="bold" />,
  cat: <Cat className="h-4 w-4" weight="bold" />,
};

export default function AboutPage() {
  const { locale } = useLanguage();
  const content = getAboutContent(locale);

  return (
    <div className="section-shell py-12 sm:py-16 lg:py-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] as const }}
        className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="surface-card p-6 sm:p-8">
          <span className="eyebrow">
            <Sparkle className="h-3.5 w-3.5" weight="fill" />
            {content.eyebrow}
          </span>
          <h1 className="display-title mt-5 text-[clamp(2.5rem,7vw,4.75rem)] tracking-[-0.04em]">
            {content.headline}
          </h1>
          <p className="body-lead mt-5 max-w-2xl">{content.profile}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {content.chips.map((chip) => (
              <span key={chip} className="metric-chip">{chip}</span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {content.highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-border-soft bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--fg-2)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card-strong p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">{content.collaborationTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{content.collaborationLead}</p>

          <div className="mt-6 grid gap-3">
            {content.collaboration.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border-soft bg-background p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                  <h3 className="text-base font-semibold">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-7 text-[color:var(--fg-2)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">{content.interestsTitle}</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {content.interests.map((item) => (
            <motion.article key={item.title} variants={itemVariants} className="surface-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border-soft bg-[color:var(--surface)] text-[color:var(--accent)]">
                  {interestIcons[item.icon]}
                </div>
                <h3 className="text-base font-semibold">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{item.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="surface-card p-6 sm:p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">{content.experienceTitle}</h2>
          <div className="mt-5 grid gap-3">
            {content.experience.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border-soft bg-background p-4">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[color:var(--fg-2)]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="surface-card p-6 sm:p-7">
            <h2 className="text-xl font-semibold tracking-[-0.03em]">{content.educationTitle}</h2>
            <div className="mt-5 grid gap-3">
              {content.education.map((edu) => (
                <div key={edu.school} className="rounded-2xl border border-border-soft bg-[color:var(--surface)] p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <GraduationCap className="h-4 w-4 text-[color:var(--accent)]" weight="bold" />
                    {edu.school}
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--fg-2)]">{edu.degree}</p>
                  <p className="mt-1 text-xs text-[color:var(--muted)]">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card-strong p-6 sm:p-7">
            <h2 className="text-xl font-semibold tracking-[-0.03em]">{content.nextTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{content.nextLead}</p>
            <Link href="/booking" className="brand-button-primary mt-5 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
              <Lightning className="h-4 w-4" weight="bold" />
              {content.bookCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
