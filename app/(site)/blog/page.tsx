'use client'

import Link from "next/link";
import { posts } from ".velite";
import { useLanguage } from "@/components/language-provider";
import { BookOpen } from "@phosphor-icons/react";

export default function BlogPage() {
  const { t, locale } = useLanguage();
  const publishedPosts = posts
    .filter(post => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="section-shell py-12 sm:py-16 lg:py-20">
      <header className="max-w-4xl">
        <span className="eyebrow">
          <BookOpen className="h-3.5 w-3.5" weight="bold" />
          Archive
        </span>
        <h1 className="display-title mt-5 text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.04em]">
          {t('blog.title')}
        </h1>
        <p className="body-lead mt-4">
          {t('blog.description')}
        </p>
      </header>

      {publishedPosts.length === 0 ? (
        <div className="surface-card mt-10 p-6">
          <p className="text-[color:var(--fg-2)]">{t('blog.noPosts')}</p>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {publishedPosts.map(post => (
            <article key={post.slug} className="gradient-border-card p-6 sm:p-7">
              <Link href={post.url} className="group block">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] group-hover:text-[color:var(--accent)]">
                  {post.title}
                </h2>
                <time className="mt-2 block text-sm text-[color:var(--muted)]">
                  {new Date(post.date).toLocaleDateString(locale === "zh-TW" ? "zh-TW" : "en-US", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <p className="mt-4 text-sm leading-7 text-[color:var(--fg-2)]">
                  {post.summary}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="metric-chip"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
