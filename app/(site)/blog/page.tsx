import Link from "next/link";
import { posts } from ".velite";

export default function BlogPage() {
  const publishedPosts = posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section className="py-12">
      <h1 className="text-2xl font-semibold mb-6">Blog</h1>
      
      {publishedPosts.length === 0 ? (
        <p className="text-slate-600">No published posts yet.</p>
      ) : (
        <div className="space-y-6">
          {publishedPosts.map(post => (
            <article key={post.slug} className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
              <Link href={post.url} className="group">
                <h2 className="text-xl font-semibold group-hover:text-gray-700 transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-slate-500 mt-1 block">
                  {new Date(post.date).toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <p className="text-slate-600 mt-3 leading-relaxed">
                  {post.summary}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mt-4">
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
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
