'use client'

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { getPathMilestones } from "@/lib/content/path-milestones"
import type { ShareHubTheme } from "@/lib/share-hub/themes"

type SharePathTimelineProps = {
  theme: ShareHubTheme
}

export function SharePathTimeline({ theme }: SharePathTimelineProps) {
  const { locale, t } = useLanguage()
  const milestones = getPathMilestones(locale).slice(0, 6)

  return (
    <section className="mt-8" aria-labelledby="share-path-heading">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: theme.pillText }}
          >
            {t("shareHub.pathEyebrow")}
          </p>
          <h2 id="share-path-heading" className="mt-1 text-lg font-semibold tracking-[-0.03em]" style={{ color: theme.fg }}>
            {t("shareHub.pathTitle")}
          </h2>
        </div>
        <Link
          href="/path"
          className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
          style={{ background: theme.pillBg, color: theme.pillText }}
        >
          {t("shareHub.pathFull")}
        </Link>
      </div>

      <div className="relative pl-4">
        <div
          className="absolute bottom-2 left-[7px] top-2 w-px"
          style={{ background: `linear-gradient(180deg, ${theme.accent}, transparent)` }}
          aria-hidden
        />
        <ul className="space-y-3">
          {milestones.map((node) => (
            <li key={`${node.year}-${node.title}`} className="relative pl-5">
              <span
                className="absolute left-0 top-3 h-3.5 w-3.5 rounded-full border-2"
                style={{
                  borderColor: theme.accent,
                  background: node.isActive ? theme.accent : theme.cardBg,
                  boxShadow: node.isActive ? `0 0 12px ${theme.glowA}` : undefined,
                }}
                aria-hidden
              />
              <article
                className="rounded-[1.1rem] border p-3.5 sm:p-4"
                style={{
                  background: theme.cardBg,
                  borderColor: theme.cardBorder,
                }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ background: theme.accentSoft, color: theme.accent }}
                  >
                    {node.year}
                  </span>
                  <span className="text-[11px]" style={{ color: theme.fgMuted }}>
                    {node.period}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold leading-snug" style={{ color: theme.fg }}>
                  {node.title}
                </h3>
                <p className="text-xs" style={{ color: theme.fgMuted }}>
                  {node.subtitle}
                </p>
                <ul className="mt-2 space-y-1">
                  {node.descriptions.slice(0, 2).map((line) => (
                    <li key={line} className="flex gap-2 text-xs leading-relaxed" style={{ color: theme.fgMuted }}>
                      <span style={{ color: theme.accent }} aria-hidden>
                        ·
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                {node.tags && node.tags.length > 0 ? (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {node.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ background: theme.pillBg, color: theme.pillText }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
