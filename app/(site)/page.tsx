
'use client'

import Link from "next/link";
import { posts } from ".velite";
import { projects } from ".velite";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const { t, tn, locale } = useLanguage();
  const recentPosts = posts
    .filter(post => post.published && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  const featuredProjects = projects
    .filter(project => project.published && project.locale === locale)
    .slice(0, 2);

  return (
    <div className="container py-8 md:py-16">
      {/* Hero Section */}
      <section className="mb-16 md:mb-20">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-tight">
            {t('home.title')}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mb-8 md:mb-10 leading-relaxed">
            {t('home.subtitle').split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < t('home.subtitle').split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/booking">
                {t('home.bookConsultation')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                {t('home.viewProjects')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="mb-16 md:mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">{t('home.coreServices')}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{tn('home.services.frontend').title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {tn('home.services.frontend').description}
              </CardDescription>
              <Button asChild variant="ghost" className="p-0 h-auto">
                <Link href="/services">
                  {t('home.learnMore')} →
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{tn('home.services.architecture').title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {tn('home.services.architecture').description}
              </CardDescription>
              <Button asChild variant="ghost" className="p-0 h-auto">
                <Link href="/services">
                  {t('home.learnMore')} →
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{tn('home.services.consulting').title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {tn('home.services.consulting').description}
              </CardDescription>
              <Button asChild variant="ghost" className="p-0 h-auto">
                <Link href="/booking">
                  {t('home.bookNow')} →
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Content */}
      <div className="grid gap-8 lg:gap-12 md:grid-cols-2">
        {/* Recent Projects */}
        {featuredProjects.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold">{t('home.featuredProjects')}</h2>
              <Button asChild variant="ghost" className="p-0 h-auto">
                <Link href="/projects">
                  {t('home.viewAll')} →
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {featuredProjects.map(project => (
                <Card key={project.slug} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      <Link href={project.url}>{project.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-3">{project.summary}</CardDescription>
                    {project.stack && (
                      <div className="flex flex-wrap gap-1">
                        {project.stack.slice(0, 3).map(tech => (
                          <span key={tech} className="px-2 py-1 text-xs bg-muted rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Recent Blog Posts */}
        {recentPosts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold">{t('home.recentPosts')}</h2>
              <Button asChild variant="ghost" className="p-0 h-auto">
                <Link href="/blog">
                  {t('home.viewAll')} →
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {recentPosts.map(post => (
                <Card key={post.slug} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      <Link href={post.url}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-3">{post.summary}</CardDescription>
                    <div className="flex items-center justify-between text-sm">
                      <time className="text-muted-foreground">
                        {new Date(post.date).toLocaleDateString('zh-TW')}
                      </time>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1">
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs bg-muted rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
