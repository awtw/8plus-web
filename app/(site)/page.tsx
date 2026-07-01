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
import { ScrollStoryRoot } from "@/components/home/scroll-story";
import { HeroPreviewCard } from "@/components/home/hero-preview-card";
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

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
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

  return (
    <>
      <ScrollStoryRoot />

      <section className="ci-section">
        <div className="section-shell">
          <div className="ci-panel ci-panel-inline">
            <TrustBar compact />
          </div>
        </div>
      </section>

      <section className="ci-section">
        <div className="section-shell">
          <div className="ci-section-head">
            <div>
              <p className="ci-eyebrow">{t("home.coreServices")}</p>
              <h2 className="text-h2 ci-section-title">{t("home.heroSectionAbout")}</h2>
            </div>
            <Link href="/pricing" className="ci-link">
              {t("home.viewPricing")}
              <ArrowRight className="h-3.5 w-3.5" weight="bold" />
            </Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar, index) => {
              const Icon = pillarIcons[pillar.icon];
              return (
                <motion.article
                  key={pillar.title}
                  className="ci-panel h-full"
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="ci-icon-wrap">
                    <Icon className="h-4 w-4" weight="bold" />
                  </div>
                  <h3 className="text-h4 mt-4">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--fg-2)]">{pillar.description}</p>
                </motion.article>
              );
            })}

            <motion.article
              className="ci-panel ci-panel-highlight h-full flex flex-col justify-between"
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div>
                <p className="ci-eyebrow">{pricing.eyebrow}</p>
                <h3 className="text-h4 mt-2">{pricing.tiers[0]?.name}</h3>
                <p className="mt-2 text-sm leading-7 text-[color:var(--fg-2)]">{pricing.tiers[0]?.description}</p>
              </div>
              <Link href="/pricing" className="brand-button-secondary mt-5 inline-flex w-full justify-center">
                {t("home.viewPricing")}
              </Link>
            </motion.article>
          </div>
        </div>
      </section>

      {featuredCaseStudy && (
        <section className="ci-section">
          <div className="section-shell max-w-3xl">
            <HeroPreviewCard caseStudy={featuredCaseStudy} />
          </div>
        </section>
      )}

      <section className="ci-section">
        <div className="section-shell">
          <div className="ci-section-head">
            <div>
              <p className="ci-eyebrow">{process.eyebrow}</p>
              <h2 className="text-h2 ci-section-title">{process.title}</h2>
            </div>
            <Link href="/process" className="ci-link">
              {t("home.viewProcess")}
              <ArrowRight className="h-3.5 w-3.5" weight="bold" />
            </Link>
          </div>
          <div className="ci-panel mt-5">
            <ProcessSteps steps={process.steps.slice(0, 3)} compact />
          </div>
        </div>
      </section>

      <section className="ci-section">
        <div className="section-shell grid gap-3 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.author + item.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <TestimonialCard testimonial={item} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="ci-section">
        <div className="section-shell grid gap-8 xl:grid-cols-2">
          {recentPosts.length > 0 && (
            <div>
              <div className="ci-section-head">
                <h2 className="text-h2 ci-section-title">{t("home.recentPosts")}</h2>
                <Link href="/blog" className="ci-link">
                  {t("home.viewAll")}
                  <ArrowRight className="h-3.5 w-3.5" weight="bold" />
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {recentPosts.map((post) => (
                  <article key={post.slug} className="ci-panel">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      <BookOpen className="h-3.5 w-3.5" weight="bold" />
                      Archive
                    </div>
                    <h3 className="text-h4 mt-3">{post.title}</h3>
                    <p className="mt-2 text-sm text-[color:var(--fg-2)] line-clamp-2">{post.summary}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <time className="text-xs text-[color:var(--muted)]">
                        {new Date(post.date).toLocaleDateString(dateLocale, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <Link href={post.url} className="ci-link">
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
              <div className="ci-section-head">
                <h2 className="text-h2 ci-section-title">{t("home.featuredProjects")}</h2>
                <Link href="/lab" className="ci-link">
                  {t("home.viewAll")}
                  <ArrowRight className="h-3.5 w-3.5" weight="bold" />
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {featuredProjects.map((project) => (
                  <article key={project.slug} className="ci-panel">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      <Lightning className="h-3.5 w-3.5" weight="fill" />
                      {isCaseStudy(project) ? "Case Study" : "Lab"}
                    </div>
                    <h3 className="text-h4 mt-3">{project.title}</h3>
                    <p className="mt-2 text-sm text-[color:var(--fg-2)] line-clamp-2">{project.summary}</p>
                    <Link href={project.url} className="ci-link mt-4 inline-flex">
                      {t("home.open")}
                      <ArrowSquareOut className="h-4 w-4" weight="bold" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="ci-section ci-section-last">
        <div className="section-shell">
          <div className="ci-panel ci-panel-cta flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 max-w-2xl">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                <Sparkle className="h-3.5 w-3.5" weight="fill" />
                {t("home.heroSectionAbout")}
              </div>
              <h2 className="text-h2 mt-3">{t("home.closingTitle")}</h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">{t("home.closingLead")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/booking" className="brand-button-primary inline-flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" weight="bold" />
                {t("home.bookNow")}
              </Link>
              <Link href="/booking#contact" className="brand-button-secondary inline-flex items-center gap-2">
                {t("home.contactCta")}
                <ArrowRight className="h-4 w-4" weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
