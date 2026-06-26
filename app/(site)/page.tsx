'use client'

import Link from "next/link";
import { posts } from ".velite";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedProjects } from "@/lib/projects";
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
  cloud: <Cloud className="h-4 w-4" weight="bold" />,
  code: <Code className="h-4 w-4" weight="bold" />,
  sparkle: <Sparkle className="h-4 w-4" weight="fill" />,
} as const;

const techEvidence = [
  ".NET",
  "NestJS",
  "Next.js 15",
  "Vue 3",
  "Kubernetes",
  "RabbitMQ",
  "PostgreSQL",
  "Tailwind CSS",
  "Supabase",
  "CI/CD",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as const },
  },
};

export default function HomePage() {
  const { locale, t, tn } = useLanguage();
  const isZh = locale === "zh-TW";
  const dateLocale = isZh ? "zh-TW" : "en-US";

  const recentPosts = posts
    .filter((post) => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  const featuredProjects = getLocalizedProjects(locale).slice(0, 2);
  const pillars = tn("home.pillars") as Array<{
    title: string;
    description: string;
    icon: keyof typeof pillarIcons;
  }>;

  const heroStats = [
    { label: t("home.statYears"), value: "8+" },
    { label: t("home.statDomains"), value: "4" },
    { label: t("home.statBooking"), value: "Cal.com" },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem]">
        <div className="absolute left-[8%] top-[-8%] h-72 w-72 rounded-full bg-[color:var(--accent-soft)] blur-[120px] animate-aurora" />
        <div className="absolute right-[10%] top-[8%] h-80 w-80 rounded-full bg-[color:var(--accent-glow)] blur-[140px] animate-aurora" style={{ animationDelay: "-3s" }} />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[color:var(--hover-bg)] blur-[120px] animate-aurora" style={{ animationDelay: "-6s" }} />
      </div>

      <section className="section-shell pb-12 pt-12 sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] as const }}
          >
            <span className="eyebrow">
              <Sparkle className="h-3.5 w-3.5" weight="fill" />
              8plus / Engineering & Consulting
            </span>

            <h1 className="display-title mt-5 max-w-4xl text-[clamp(3rem,8vw,6.25rem)] tracking-[-0.045em]">
              {t("home.heroTitle1")}
              <br />
              {t("home.heroTitle2")}
            </h1>

            <p className="body-lead mt-5 max-w-2xl">
              {t("home.heroLead")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/booking"
                className="brand-button-primary inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
              >
                <CalendarCheck className="h-4 w-4" weight="bold" />
                {t("home.bookCall")}
              </Link>
              <Link
                href="/projects"
                className="brand-button-secondary inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
              >
                {t("home.viewProjects")}
                <ArrowRight className="h-4 w-4" weight="bold" />
              </Link>
              <a
                href="https://github.com/awtw"
                target="_blank"
                rel="noreferrer"
                className="ghost-action inline-flex items-center gap-2 px-5 py-3 text-sm font-medium"
              >
                GitHub
                <ArrowSquareOut className="h-4 w-4" weight="bold" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {heroStats.map((stat) => (
                <div key={stat.label} className="metric-chip">
                  <span className="font-semibold text-[color:var(--fg)]">{stat.value}</span>
                  <span className="mx-2 text-[color:var(--muted)]">·</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="surface-card p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--fg)] text-sm font-semibold text-[color:var(--bg)]">
                  AW
                </div>
                <div>
                  <p className="text-sm font-medium text-[color:var(--fg-2)]">
                    August Wang
                  </p>
                  <p className="text-xs text-[color:var(--muted)]">
                    {t("home.role")}
                  </p>
                </div>
              </div>
              <span className="capsule">
                <span className="h-2 w-2 rounded-full bg-[color:var(--success)]" />
                {t("home.available")}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {[t("home.checklist1"), t("home.checklist2"), t("home.checklist3")].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-border-soft bg-[color:var(--surface)] px-4 py-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[color:var(--accent)]" />
                  <p className="text-sm text-[color:var(--fg-2)]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: isZh ? "技術" : "stack", value: "10+" },
                { label: isZh ? "內容" : "content", value: "2x" },
                { label: isZh ? "諮詢" : "calls", value: "1:1" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border-soft bg-background p-3">
                  <div className="text-xl font-semibold tracking-[-0.03em] text-[color:var(--fg)]">{item.value}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="section-shell pb-10">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {techEvidence.slice(0, 8).map((item) => (
            <div key={item} className="surface-panel px-4 py-3 text-sm text-[color:var(--fg-2)]">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell pb-12 sm:pb-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid gap-4 lg:grid-cols-3"
        >
          {pillars.map((pillar) => (
            <motion.article key={pillar.title} variants={cardVariants} className="gradient-border-card p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--fg)] text-[color:var(--bg)]">
                  {pillarIcons[pillar.icon]}
                </div>
                <h2 className="text-xl font-semibold tracking-[-0.03em]">
                  {pillar.title}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-[color:var(--fg-2)]">
                {pillar.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section-shell pb-12 sm:pb-14">
        <div className="grid gap-8 lg:grid-cols-2">
          {recentPosts.length > 0 && (
            <div>
              <div className="mb-4 flex items-end justify-between gap-4">
                <h2 className="text-lg font-semibold tracking-[-0.02em]">{t("home.recentPosts")}</h2>
                <Link href="/blog" className="ghost-action inline-flex items-center gap-2 px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
                  {t("home.viewAll")}
                  <ArrowRight className="h-3.5 w-3.5" weight="bold" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <motion.article key={post.slug} variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="gradient-border-card p-6 sm:p-7">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      <BookOpen className="h-3.5 w-3.5" weight="bold" />
                      Archive / {t("home.recentPosts")}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)] line-clamp-2">
                      {post.summary}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <time className="text-xs text-[color:var(--muted)]">
                        {new Date(post.date).toLocaleDateString(dateLocale, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <Link href={post.url} className="ghost-action inline-flex items-center gap-2 px-4 py-2 text-sm">
                        {t("home.read")}
                        <ArrowSquareOut className="h-4 w-4" weight="bold" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}

          {featuredProjects.length > 0 && (
            <div>
              <div className="mb-4 flex items-end justify-between gap-4">
                <h2 className="text-lg font-semibold tracking-[-0.02em]">{t("home.featuredProjects")}</h2>
                <Link href="/projects" className="ghost-action inline-flex items-center gap-2 px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
                  {t("home.viewAll")}
                  <ArrowRight className="h-3.5 w-3.5" weight="bold" />
                </Link>
              </div>
              <div className="space-y-4">
                {featuredProjects.map((project) => (
                  <motion.article key={project.slug} variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="gradient-border-card p-6 sm:p-7">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      <Lightning className="h-3.5 w-3.5" weight="fill" />
                      Lab / {t("home.featuredProjects")}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)] line-clamp-2">
                      {project.summary}
                    </p>
                    {project.stack?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((tech: string) => (
                          <span key={tech} className="metric-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <span className="text-xs text-[color:var(--muted)]">
                        {t("home.portfolioNote")}
                      </span>
                      <Link href={project.url} className="ghost-action inline-flex items-center gap-2 px-4 py-2 text-sm">
                        {t("home.open")}
                        <ArrowSquareOut className="h-4 w-4" weight="bold" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-20">
        <div className="surface-card-strong flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">
              {t("home.closingTitle")}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--fg-2)]">
              {t("home.closingLead")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/booking" className="brand-button-primary inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
              <CalendarCheck className="h-4 w-4" weight="bold" />
              {t("home.bookNow")}
            </Link>
            <Link href="/about" className="brand-button-secondary inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]">
              {t("home.aboutMe")}
              <ArrowRight className="h-4 w-4" weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
