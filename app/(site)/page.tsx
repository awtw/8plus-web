'use client'

import Link from "next/link";
import { posts } from ".velite";
import { useLanguage } from "@/components/language-provider";
import {
  getFeaturedCaseStudy,
  getLocalizedProjects,
  isCaseStudy,
} from "@/lib/projects";
import { getTrustContent } from "@/lib/content/trust";
import { getProcessPricingContent } from "@/lib/content/process-pricing";
import { TrustBar } from "@/components/trust-bar";
import { TestimonialCard } from "@/components/testimonial-card";
import { ProcessSteps } from "@/components/process-steps";
import { BentoGrid, BentoCell, BentoCard } from "@/components/home/bento-grid";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowSquareOut,
  BookOpen,
  CalendarCheck,
  Cloud,
  Code,
  Lightning,
  Sparkle,
} from "@phosphor-icons/react";

const pillarIcons = {
  cloud: Cloud,
  code: Code,
  sparkle: Sparkle,
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function HomePage() {
  const { locale, t, tn } = useLanguage();
  const isZh = locale === "zh-TW";
  const dateLocale = isZh ? "zh-TW" : "en-US";

  const pillars = tn("home.pillars") as Array<{
    title: string;
    description: string;
    icon: keyof typeof pillarIcons;
  }>;

  const recentPosts = posts
    .filter(
      (post) =>
        post.published &&
        (post.locale === locale || (locale === "zh-TW" && post.locale === "zh-Hant")),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  const featuredProjects = getLocalizedProjects(locale).slice(0, 2);
  const featuredCaseStudy = getFeaturedCaseStudy(locale);
  const { testimonials } = getTrustContent(locale);
  const { process, pricing } = getProcessPricingContent(locale);

  const heroStats = [
    { label: t("home.statYears"), value: "8+" },
    { label: t("home.statDomains"), value: "4" },
    { label: t("home.statBooking"), value: "Cal.com" },
  ];

  return (
    <div className="section-shell space-y-4 py-10 sm:space-y-5 sm:py-14 lg:py-16">
      <BentoGrid>
        <BentoCell colSpan={3}>
          <motion.div variants={cardVariants} initial="hidden" animate="show">
            <BentoCard strong className="lg:min-h-[320px]">
              <span className="eyebrow">
                <Sparkle className="h-3.5 w-3.5" weight="fill" />
                8plus / Engineering & Consulting
              </span>
              <h1 className="display-title mt-5 max-w-4xl text-[clamp(2rem,7vw,5.5rem)] tracking-[-0.045em]">
                {t("home.heroTitle1")}
                <br />
                {t("home.heroTitle2")}
              </h1>
              <p className="body-lead mt-5 max-w-2xl">{t("home.heroLead")}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/booking" className="brand-button-primary inline-flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4" weight="bold" />
                  {t("home.bookCall")}
                </Link>
                <Link href="/projects" className="brand-button-secondary inline-flex items-center gap-2">
                  {t("home.viewProjects")}
                  <ArrowRight className="h-4 w-4" weight="bold" />
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="metric-chip">
                    <span className="font-semibold text-[color:var(--fg)]">{stat.value}</span>
                    <span className="mx-2 text-[color:var(--muted)]">·</span>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </BentoCard>
          </motion.div>
        </BentoCell>

        <BentoCell colSpan={1}>
          <motion.div variants={cardVariants} initial="hidden" animate="show">
            <BentoCard className="flex h-full min-h-[280px] flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--fg)] text-sm font-semibold text-[color:var(--bg)]">
                    AW
                  </div>
                  <div>
                    <p className="text-sm font-medium">August Wang</p>
                    <p className="text-xs text-[color:var(--muted)]">{t("home.role")}</p>
                  </div>
                </div>
                <span className="capsule mt-4 inline-flex">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--success)]" />
                  {t("home.available")}
                </span>
              </div>
              <Link href="/booking" className="brand-button-primary mt-6 inline-flex w-full items-center justify-center gap-2">
                <CalendarCheck className="h-4 w-4" weight="bold" />
                {t("home.bookNow")}
              </Link>
            </BentoCard>
          </motion.div>
        </BentoCell>

        {pillars.slice(0, 2).map((pillar) => {
          const Icon = pillarIcons[pillar.icon];
          return (
            <BentoCell key={pillar.title} colSpan={1}>
              <BentoCard>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--fg)] text-[color:var(--bg)]">
                    <Icon className="h-4 w-4" weight="bold" />
                  </div>
                  <h2 className="text-lg font-semibold tracking-[-0.03em]">{pillar.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{pillar.description}</p>
              </BentoCard>
            </BentoCell>
          );
        })}

        <BentoCell colSpan={1}>
          <BentoCard className="flex h-full flex-col justify-center">
            <TrustBar compact />
          </BentoCard>
        </BentoCell>

        {featuredCaseStudy && (
          <BentoCell colSpan={2} rowSpan={1}>
            <BentoCard strong>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                <Lightning className="h-3.5 w-3.5" weight="fill" />
                Case Study
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{featuredCaseStudy.title}</h2>
              {featuredCaseStudy.client && (
                <p className="mt-1 text-sm text-[color:var(--muted)]">{featuredCaseStudy.client}</p>
              )}
              <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)] line-clamp-3">
                {featuredCaseStudy.challenge ?? featuredCaseStudy.summary}
              </p>
              {featuredCaseStudy.resultMetrics && featuredCaseStudy.resultMetrics.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredCaseStudy.resultMetrics.map((metric) => (
                    <span key={metric.label} className="metric-chip">
                      {metric.label}: {metric.value}
                    </span>
                  ))}
                </div>
              )}
              <Link href={featuredCaseStudy.url} className="ghost-action mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm">
                {t("home.open")}
                <ArrowSquareOut className="h-4 w-4" weight="bold" />
              </Link>
            </BentoCard>
          </BentoCell>
        )}

        <BentoCell colSpan={1}>
          <BentoCard className="flex h-full flex-col justify-between">
            <div>
              <p className="eyebrow">{pricing.eyebrow}</p>
              <h2 className="mt-2 text-lg font-semibold">{pricing.tiers[0]?.name}</h2>
              <p className="mt-2 text-sm text-[color:var(--fg-2)]">{pricing.tiers[0]?.description}</p>
            </div>
            <Link href="/pricing" className="brand-button-secondary mt-4 inline-flex items-center justify-center gap-2">
              {t("home.viewPricing")}
              <ArrowRight className="h-4 w-4" weight="bold" />
            </Link>
          </BentoCard>
        </BentoCell>

        <BentoCell colSpan={1}>
          <BentoCard>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--fg)] text-[color:var(--bg)]">
                <Sparkle className="h-4 w-4" weight="fill" />
              </div>
              <h2 className="text-lg font-semibold">{pillars[2]?.title}</h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{pillars[2]?.description}</p>
          </BentoCard>
        </BentoCell>
      </BentoGrid>

      <section className="grid gap-3 md:grid-cols-2">
        {testimonials.map((item) => (
          <TestimonialCard key={item.author + item.company} testimonial={item} />
        ))}
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{process.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{process.title}</h2>
          </div>
          <Link href="/process" className="ghost-action inline-flex items-center gap-2 px-3 py-1.5 text-sm">
            {t("home.viewProcess")}
            <ArrowRight className="h-3.5 w-3.5" weight="bold" />
          </Link>
        </div>
        <ProcessSteps steps={process.steps.slice(0, 3)} compact />
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        {recentPosts.length > 0 && (
          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 className="text-lg font-semibold">{t("home.recentPosts")}</h2>
              <Link href="/blog" className="ghost-action inline-flex items-center gap-2 px-3 py-1.5 text-sm">
                {t("home.viewAll")}
                <ArrowRight className="h-3.5 w-3.5" weight="bold" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <article key={post.slug} className="surface-card p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    <BookOpen className="h-3.5 w-3.5" weight="bold" />
                    Archive
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm text-[color:var(--fg-2)] line-clamp-2">{post.summary}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <time className="text-xs text-[color:var(--muted)]">
                      {new Date(post.date).toLocaleDateString(dateLocale, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <Link href={post.url} className="ghost-action inline-flex items-center gap-2 px-3 py-1.5 text-sm">
                      {t("home.read")}
                      <ArrowSquareOut className="h-4 w-4" weight="bold" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {featuredProjects.length > 0 && (
          <div>
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 className="text-lg font-semibold">{t("home.featuredProjects")}</h2>
              <Link href="/projects" className="ghost-action inline-flex items-center gap-2 px-3 py-1.5 text-sm">
                {t("home.viewAll")}
                <ArrowRight className="h-3.5 w-3.5" weight="bold" />
              </Link>
            </div>
            <div className="space-y-3">
              {featuredProjects.map((project) => (
                <article key={project.slug} className="surface-card p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    <Lightning className="h-3.5 w-3.5" weight="fill" />
                    {isCaseStudy(project) ? "Case Study" : "Lab"}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-[color:var(--fg-2)] line-clamp-2">{project.summary}</p>
                  <Link href={project.url} className="ghost-action mt-4 inline-flex items-center gap-2 px-3 py-1.5 text-sm">
                    {t("home.open")}
                    <ArrowSquareOut className="h-4 w-4" weight="bold" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="surface-card-strong flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{t("home.closingTitle")}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{t("home.closingLead")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/booking" className="brand-button-primary inline-flex items-center gap-2">
              <CalendarCheck className="h-4 w-4" weight="bold" />
              {t("home.bookNow")}
            </Link>
            <Link href="/contact" className="brand-button-secondary inline-flex items-center gap-2">
              {t("home.contactCta")}
              <ArrowRight className="h-4 w-4" weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
