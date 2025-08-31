
'use client'

import { notFound } from "next/navigation";
import { projects } from ".velite";
import { useLanguage } from "@/components/language-provider";
import { useParams } from "next/navigation";

export default function ProjectDetail() {
  const { t, locale } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;
  
  // 根據當前語言和 slug 找到對應的項目
  const project = projects.find(p => p.slug === slug && p.locale === locale);
  
  if (!project) {
    notFound();
  }

  return (
    <article className="py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
          {project.role && (
            <div>
              <span className="font-medium">{t('projects.role')}：</span>
              <span className="text-gray-700 font-medium">{project.role}</span>
            </div>
          )}
          {project.period && (
            <div>
              <span className="font-medium">{t('projects.period')}：</span>
              {project.period}
            </div>
          )}
        </div>

        <p className="text-lg text-slate-600 mb-6">{project.summary}</p>

        {project.stack && project.stack.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold mb-3">{t('projects.techStack')}</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span 
                  key={tech}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold mb-3">{t('projects.highlights')}</h2>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-slate-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.links && Object.keys(project.links).length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold mb-3">{t('projects.links')}</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(project.links).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {key === 'github' ? 'GitHub' : 
                   key === 'demo' ? 'Live Demo' : 
                   key === 'website' ? 'Website' : 
                   key.charAt(0).toUpperCase() + key.slice(1)}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
      
      <div className="prose prose-slate max-w-none">
        <div dangerouslySetInnerHTML={{ __html: project.html }} />
      </div>
    </article>
  );
}
