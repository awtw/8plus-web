import { notFound } from "next/navigation";
import { posts } from ".velite";

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
    <article className="py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <time>
            {new Date(post.date).toLocaleDateString('zh-TW', {
              year: 'numeric',
              month: 'long', 
              day: 'numeric'
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {post.protected && (
          <div className="p-4 my-6 border rounded-lg bg-yellow-50 border-yellow-200">
            <strong className="text-yellow-800">Protected Content:</strong>
            <span className="text-yellow-700 ml-2">
              This article contains protected content. Full content available in Phase 2.
            </span>
          </div>
        )}
      </header>
      
      <div 
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
