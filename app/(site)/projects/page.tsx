
import Link from "next/link";
import { allProjects } from "../../../.contentlayer/generated";

export default function ProjectsPage() {
  const projects = allProjects.filter(p => p.published !== false);
  return (
    <section className="py-12">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {projects.map(p => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="block border rounded-xl p-4 hover:shadow-sm">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-slate-600 mt-2">{p.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
