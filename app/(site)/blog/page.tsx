
import Link from "next/link";
import { allPosts } from "../../../.contentlayer/generated";

export default function BlogPage() {
  const posts = allPosts
    .filter(p => p.published !== false)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return (
    <section className="py-12">
      <h1 className="text-2xl font-semibold">Blog</h1>
      <ul className="mt-6 space-y-4">
        {posts.map(p => (
          <li key={p.slug} className="border rounded-xl p-4">
            <Link href={`/blog/${p.slug}`} className="font-semibold">{p.title}</Link>
            <p className="text-sm text-slate-600">{p.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
