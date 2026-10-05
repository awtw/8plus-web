import { notFound } from "next/navigation";
import { posts as allPosts } from ".velite";
import { publicContent } from "@/lib/publication";
const posts = publicContent(allPosts);
import { PageSection } from "@/components/page/page-section";
import { BlogBackLink } from "@/components/blog/blog-back-link";
import { BlogProtectedNote } from "@/components/blog/blog-protected-note";
import { BlogCta } from "@/components/blog/blog-cta";
import { ReadingProgress } from "@/components/reading-progress";
import { extractToc, readingMinutes } from "@/lib/reading";
import { SITE } from "@/lib/seo";
import "@/styles/pages/blog.css";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return posts.map(post => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const dateLocale = post.locale === 'en' ? 'en-US' : 'zh-TW';
  const minutes = readingMinutes(post.html);
  const toc = extractToc(post.html);
  const isEn = post.locale === 'en';

  const articleLd = {
    "@context": "https://schema.org",
    "@type": post.kind === "note" ? "BlogPosting" : "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    inLanguage: post.locale === "en" ? "en" : "zh-TW",
    keywords: (post.tags ?? []).join(", "),
    mainEntityOfPage: `${SITE.url}${post.url}`,
    author: { "@type": "Person", name: "August Wang", url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <ReadingProgress />
      <PageSection field="blue" innerClassName="blog-article-inner">
        <article className="blog-article">
          <BlogBackLink />
          <p className="scroll-eyebrow">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(dateLocale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {" · "}
            {isEn ? `${minutes} min read` : `約 ${minutes} 分鐘閱讀`}
          </p>
          <h1 className="blog-article-title">{post.title}</h1>
          {post.summary && <p className="page-lead">{post.summary}</p>}
          {post.tags && post.tags.length > 0 && (
            <ul className="blog-tags">
              {post.tags.map(tag => (
                <li key={tag} className="blog-tag">{tag}</li>
              ))}
            </ul>
          )}

          {post.protected && <BlogProtectedNote />}

          {toc.length >= 3 && (
            <details className="blog-toc">
              <summary>{isEn ? 'On this page' : '本文目錄'}</summary>
              <ol>
                {toc.map((item) => (
                  <li key={item.id}><a href={`#${item.id}`}>{item.text}</a></li>
                ))}
              </ol>
            </details>
          )}

          <div
            className="prose prose-slate blog-prose"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </PageSection>
      <BlogCta />
    </>
  );
}
