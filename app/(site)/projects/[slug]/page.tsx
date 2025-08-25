
import { notFound } from "next/navigation";
import { allProjects } from "../../../../.contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = allProjects.find(p => p.slug === params.slug);
  if (!project) return notFound();
  const MDX = useMDXComponent(project.body.code);
  return (
    <article className="prose prose-slate max-w-none py-12">
      <h1>{project.title}</h1>
      <p className="text-slate-600">{project.summary}</p>
      <MDX />
    </article>
  );
}
