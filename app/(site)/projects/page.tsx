
'use client'

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedProjects, isProjectLocaleFallback } from "@/lib/projects";

export default function ProjectsPage() {
  const { t, locale } = useLanguage();
  const publishedProjects = getLocalizedProjects(locale);

  return (
    <section className="py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{t('projects.title')}</h1>
        <p className="text-slate-600 text-lg">
          {t('projects.description')}
        </p>
      </header>

      {publishedProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">{t('projects.noProjects')}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {publishedProjects.map(project => (
            <Link 
              key={`${project.slug}-${project.locale}`} 
              href={project.url}
              className="group block border rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold group-hover:text-gray-700 transition-colors">
                    {project.title}
                  </h2>
                  {isProjectLocaleFallback(project, locale) && (
                    <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      中文
                    </span>
                  )}
                </div>
                {project.role && (
                  <p className="text-sm text-gray-700 font-medium">{project.role}</p>
                )}
                {project.period && (
                  <p className="text-sm text-slate-500">{project.period}</p>
                )}
              </div>

              <p className="text-slate-600 mb-4 leading-relaxed">
                {project.summary}
              </p>

              {project.stack && project.stack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map(tech => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-slate-700 mb-2">{t('projects.highlights')}：</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-700 mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-gray-900 text-sm font-medium group-hover:text-gray-700 transition-colors">
                {t('projects.viewDetails')} →
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
