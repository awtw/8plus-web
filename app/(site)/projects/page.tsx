'use client'

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedProjects, isProjectLocaleFallback } from "@/lib/projects";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";

export default function ProjectsPage() {
  const { t, locale } = useLanguage();
  const publishedProjects = getLocalizedProjects(locale);

  return (
    <div className="section-shell py-12 sm:py-16 lg:py-20">
      <header className="max-w-4xl">
        <span className="eyebrow">
          <Sparkle className="h-3.5 w-3.5" weight="fill" />
          Lab
        </span>
        <h1 className="display-title mt-5 text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.04em]">
          {t('projects.title')}
        </h1>
        <p className="body-lead mt-4">
          {t('projects.description')}
        </p>
      </header>

      {publishedProjects.length === 0 ? (
        <div className="surface-card mt-10 p-6">
          <p className="text-[color:var(--fg-2)]">{t('projects.noProjects')}</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {publishedProjects.map(project => (
            <Link
              key={`${project.slug}-${project.locale}`}
              href={project.url}
              className="gradient-border-card p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                      {project.title}
                    </h2>
                    {isProjectLocaleFallback(project, locale) && (
                      <span className="metric-chip">中文</span>
                    )}
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-[color:var(--fg-2)]">
                    {project.role && <p>{project.role}</p>}
                    {project.period && <p className="text-[color:var(--muted)]">{project.period}</p>}
                  </div>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 text-[color:var(--muted)]" weight="bold" />
              </div>

              <p className="mt-4 text-sm leading-7 text-[color:var(--fg-2)]">
                {project.summary}
              </p>

              {project.stack && project.stack.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span
                      key={tech}
                      className="metric-chip"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <div className="mt-5 rounded-2xl border border-border-soft bg-[color:var(--surface)] p-4">
                  <h3 className="text-sm font-semibold tracking-[-0.02em]">{t('projects.highlights')}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-[color:var(--fg-2)]">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5 text-sm font-medium text-[color:var(--fg)]">
                {t('projects.viewDetails')}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
