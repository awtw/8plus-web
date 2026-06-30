'use client'

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { getPathMilestones } from "@/lib/content/path-milestones";
import { motion } from "framer-motion";
import { CalendarCheck, Sparkle } from "@phosphor-icons/react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const } },
};

export default function PathPage() {
  const { locale, t } = useLanguage();
  const data = getPathMilestones(locale);

  return (
    <div className="section-shell py-8 sm:py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const }}
        className="mb-10 sm:mb-14"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full surface-card text-[color:var(--accent)]">
            <Sparkle className="w-3 h-3" weight="fill" />
            {t("path.period")}
          </span>
        </div>
        <h1 className="display-title text-[clamp(2rem,5vw,3rem)] tracking-[-0.04em] mb-3">
          {t("path.title")}
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-[color:var(--fg-2)]">
          {t("path.lead")}
        </p>
      </motion.div>

      <div className="relative min-w-0">
        <div
          className="absolute left-[19px] sm:left-1/2 top-4 bottom-4 w-px bg-[color:var(--border)] sm:-translate-x-px"
          aria-hidden
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-10 sm:space-y-14"
        >
          {data.map((milestone, index) => {
            const isLeft = milestone.side === "left";

            return (
              <motion.div
                key={`${milestone.year}-${index}`}
                variants={itemVariants}
                className="relative flex flex-col sm:flex-row items-start sm:gap-0"
              >
                <div className={`hidden sm:flex sm:w-1/2 ${isLeft ? "sm:justify-end sm:pr-10 order-1" : "sm:pl-10 order-2"}`}>
                  <div className={`flex flex-col ${isLeft ? "items-end text-right" : "items-start text-left"}`}>
                    <span className="text-4xl sm:text-5xl font-black tracking-tighter text-[color:var(--border-soft)] select-none leading-none">
                      {milestone.year}
                    </span>
                    {milestone.period && (
                      <span className="mt-1 text-[11px] font-medium text-[color:var(--muted)]">{milestone.period}</span>
                    )}
                  </div>
                </div>

                <div className="pointer-events-none absolute left-0 top-1 z-10 sm:left-1/2 sm:-translate-x-1/2">
                  <div
                    className={`flex h-[38px] w-[38px] items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--accent)] text-[color:var(--bg)] shadow-md ring-4 ring-[color:var(--bg)] ${milestone.isActive ? "ring-1 ring-[color:var(--hover-border)]" : ""}`}
                  >
                    {milestone.icon}
                  </div>
                </div>

                <div
                  className={`min-w-0 w-full pl-[52px] sm:w-1/2 sm:pl-0 ${isLeft ? "sm:pr-10 order-2" : "sm:pl-10 order-1"}`}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 sm:hidden">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[color:var(--muted)]">
                      {milestone.year}
                    </span>
                    {milestone.period && (
                      <>
                        <span className="text-[color:var(--muted)]">·</span>
                        <span className="text-[10px] text-[color:var(--muted)]">{milestone.period}</span>
                      </>
                    )}
                  </div>

                  <div
                    className={`gradient-border-card surface-card min-w-0 rounded-[var(--radius-md)] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 ${milestone.isActive ? "ring-1 ring-[color:var(--hover-border)]" : ""}`}
                  >
                    {milestone.isActive && (
                      <div className="mb-3 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[color:var(--success)] glow-dot" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--accent)]">
                          {t("path.current")}
                        </span>
                      </div>
                    )}

                    <div className="mb-3 min-w-0">
                      <h3 className="text-sm font-bold leading-snug break-words sm:text-base">{milestone.title}</h3>
                      <p className="mt-0.5 text-xs text-[color:var(--muted)]">{milestone.subtitle}</p>
                    </div>

                    <ul className="mb-4 space-y-1.5">
                      {milestone.descriptions.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[color:var(--fg-2)] sm:text-sm">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--accent)]" />
                          <span className="min-w-0 break-words">{desc}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {milestone.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-border-soft bg-[color:var(--surface)] px-2 py-0.5 text-[10px] font-medium text-[color:var(--muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const }}
        className="mt-12 flex flex-col items-stretch justify-between gap-4 rounded-2xl p-5 surface-card-strong sm:mt-16 sm:flex-row sm:items-center sm:p-6"
      >
        <div className="min-w-0">
          <h3 className="mb-1 text-sm font-bold">{t("path.ctaTitle")}</h3>
          <p className="text-xs text-[color:var(--fg-2)]">{t("path.ctaLead")}</p>
        </div>
        <Link
          href="/booking"
          className="brand-button-primary inline-flex w-full shrink-0 items-center justify-center gap-2 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
        >
          <CalendarCheck className="w-4 h-4" weight="bold" />
          {t("path.ctaButton")}
        </Link>
      </motion.div>
    </div>
  );
}
