import { notFound } from "next/navigation";
import { posts } from ".velite";
import { DetailCta } from "@/components/detail-cta";

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

  return (
    <article className="section-shell py-12 sm:py-16 lg:py-20">
      <header className="surface-card p-6 sm:p-8">
        <span className="eyebrow">Archive</span>
        <h1 className="display-title mt-5 text-[clamp(2.5rem,6vw,4rem)] tracking-[-0.04em]">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[color:var(--fg-2)]">
          <time>
            {new Date(post.date).toLocaleDateString(post.locale === 'en' ? 'en-US' : 'zh-TW', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
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
        </div>

        {post.protected && (
          <div className="mt-6 rounded-[22px] border border-[color:var(--warn)]/30 bg-[rgba(234,179,8,0.08)] p-4">
            <strong className="text-[color:var(--fg)]">Protected Content:</strong>
            <span className="ml-2 text-[color:var(--fg-2)]">
              This article contains protected content. Full content available in Phase 2.
            </span>
          </div>
        )}
      </header>

      <div
        className="prose prose-slate max-w-none mt-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <DetailCta />
    </article>
  );
}
