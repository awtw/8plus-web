import type { ReactNode } from "react";
import { findLocalizedProject } from "@/lib/projects";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// The detail page is a client component; metadata lives here so each project
// gets its own title/canonical instead of inheriting /lab's.
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = findLocalizedProject(slug, "zh-TW");
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: project.url,
    images: project.thumbnail ? [project.thumbnail] : undefined,
    locale: project.locale,
  });
}

export default async function Layout({ children, params }: Props & { children: ReactNode }) {
  const { slug } = await params;
  const project = findLocalizedProject(slug, "zh-TW");
  return (
    <>
      {project && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbLd([["8plus", "/"], ["Lab", "/lab"], [project.title, project.url]])),
          }}
        />
      )}
      {children}
    </>
  );
}
