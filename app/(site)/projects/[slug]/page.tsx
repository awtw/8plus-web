'use client'

import { notFound, useParams } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { findLocalizedProject, isProjectLocaleFallback } from "@/lib/projects";
import { DetailCta } from "@/components/detail-cta";
import { ArrowSquareOut, Sparkle } from "@phosphor-icons/react";

export default function ProjectDetail() {
  const { t, locale } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;

  const project = findLocalizedProject(slug, locale);

  if (!project) {
    notFound();
  }

  const isFallback = isProjectLocaleFallback(project, locale);

  return (
    <article className="section-shell py-12 sm:py-16 lg:py-20">
      <header className="surface-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">
            <Sparkle className="h-3.5 w-3.5" weight="fill" />
            Lab
          </span>
          {isFallback && (
            <span className="metric-chip">{locale === "en" ? "Chinese only" : "中文"}</span>
          )}
        </div>

        <h1 className="display-title mt-5 text-[clamp(2.5rem,6vw,4rem)] tracking-[-0.04em]">
          {project.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[color:var(--fg-2)]">
          {project.role && (
            <div>
              <span className="font-medium text-[color:var(--fg)]">{t('projects.role')}：</span>
              <span>{project.role}</span>
            </div>
          )}
          {project.period && (
            <div>
              <span className="font-medium text-[color:var(--fg)]">{t('projects.period')}：</span>
              <span>{project.period}</span>
            </div>
          )}
        </div>

        <p className="body-lead mt-5 max-w-3xl">
          {project.summary}
        </p>

        {project.stack && project.stack.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold tracking-[0.12em] uppercase text-[color:var(--muted)]">
              {t('projects.techStack')}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span
                  key={tech}
                  className="metric-chip"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="surface-card p-6 sm:p-7">
          <h2 className="text-xl font-semibold tracking-[-0.03em]">
            {t('projects.highlights')}
          </h2>
          {project.highlights && project.highlights.length > 0 ? (
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--fg-2)]">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-[color:var(--fg-2)]">No highlights listed.</p>
          )}
        </div>

        {project.links && Object.keys(project.links).length > 0 && (
          <div className="surface-card-strong p-6 sm:p-7">
            <h2 className="text-xl font-semibold tracking-[-0.03em]">
              {t('projects.links')}
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {Object.entries(project.links).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button-secondary inline-flex items-center gap-2"
                >
                  {key === 'github' ? 'GitHub' :
                   key === 'demo' ? 'Live Demo' :
                   key === 'website' ? 'Website' :
                   key.charAt(0).toUpperCase() + key.slice(1)}
                  <ArrowSquareOut className="h-4 w-4" weight="bold" />
                </a>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="prose prose-slate max-w-none mt-8">
        <div dangerouslySetInnerHTML={{ __html: project.html }} />
      </div>

      <DetailCta />
    </article>
  );
}
