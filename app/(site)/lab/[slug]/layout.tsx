import type { ReactNode } from "react";
import { findLocalizedProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

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

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
