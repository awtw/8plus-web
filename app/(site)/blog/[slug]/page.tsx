import { notFound } from "next/navigation";
import { posts } from ".velite";
import { PageSection } from "@/components/page/page-section";
import { BlogBackLink } from "@/components/blog/blog-back-link";
import { BlogProtectedNote } from "@/components/blog/blog-protected-note";
import { BlogCta } from "@/components/blog/blog-cta";
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

  return (
    <>
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
