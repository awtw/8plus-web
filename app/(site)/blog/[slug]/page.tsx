
import { notFound } from "next/navigation";
import { allPosts } from "../../../../.contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find(p => p.slug === params.slug);
  if (!post) return notFound();

  const MDX = useMDXComponent(post.body.code);

  return (
    <article className="prose prose-slate max-w-none py-12">
      <h1>{post.title}</h1>
      <p className="text-sm text-slate-500">{new Date(post.date).toLocaleDateString()}</p>
      {post.protected && (
        <div className="p-4 my-4 border rounded-lg bg-yellow-50">
          <strong>Protected:</strong> This article is a summary. Please log in to view full content (Phase 2).
        </div>
      )}
      <MDX />
    </article>
  );
}
