import { projects } from ".velite";
import type { Locale } from "./i18n";

export type Project = (typeof projects)[number];

function projectKey(project: Project) {
  return project.baseSlug ?? project.slug;
}

export function getLocalizedProjects(locale: Locale): Project[] {
  const published = projects.filter((project) => project.published);

  if (locale === "zh-TW") {
    return published.filter((project) => project.locale === "zh-TW");
  }

  const enByKey = new Map<string, Project>();
  const zhByKey = new Map<string, Project>();

  for (const project of published) {
    const key = projectKey(project);
    if (project.locale === "en") enByKey.set(key, project);
    if (project.locale === "zh-TW") zhByKey.set(key, project);
  }

  const keys = new Set([...enByKey.keys(), ...zhByKey.keys()]);

  return Array.from(keys)
    .map((key) => enByKey.get(key) ?? zhByKey.get(key))
    .filter((project): project is Project => Boolean(project));
}

export function findLocalizedProject(slug: string, locale: Locale): Project | undefined {
  const published = projects.filter((project) => project.published);

  if (locale === "en") {
    return (
      published.find(
        (project) =>
          project.locale === "en" && (project.slug === slug || project.baseSlug === slug),
      ) ??
      published.find((project) => project.locale === "zh-TW" && project.slug === slug)
    );
  }

  return published.find((project) => project.locale === "zh-TW" && project.slug === slug);
}

export function isProjectLocaleFallback(project: Project, locale: Locale) {
  return locale === "en" && project.locale !== "en";
}

export function isCaseStudy(project: Project): boolean {
  return project.type === "case-study";
}

export function getFeaturedCaseStudies(locale: Locale): Project[] {
  return getLocalizedProjects(locale).filter(
    (project) => project.featured && isCaseStudy(project),
  );
}

export function getFeaturedCaseStudy(locale: Locale): Project | undefined {
  return getFeaturedCaseStudies(locale)[0];
}
