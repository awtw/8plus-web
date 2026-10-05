import { EpisodeDetail } from "@/components/show/episode-detail";
import { notFound } from "next/navigation";
import { findPublicEpisode, getPublicEpisodes } from "@/lib/episodes";
import { posts } from ".velite";
import "@/styles/pages/show.css";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getPublicEpisodes().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const episode = findPublicEpisode((await params).slug);
  return episode
    ? {
        title: episode.title,
        description: episode.summary,
        openGraph: { images: [episode.cover] },
      }
    : {};
}
export default async function Page({ params }: Props) {
  const episode = findPublicEpisode((await params).slug);
  if (!episode) notFound();
  const related = posts
    .filter((post) => episode.relatedPostSlugs.includes(post.slug))
    .map(({ slug, url, title }) => ({ slug, url, title }));
  return <EpisodeDetail episode={episode} related={related} />;
}
