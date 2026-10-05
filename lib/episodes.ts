import { episodes } from ".velite";
export const getPublicEpisodes = () =>
  [...episodes].sort(
    (a, b) => Date.parse(b.publishedAt!) - Date.parse(a.publishedAt!),
  );
export const findPublicEpisode = (slug: string) =>
  getPublicEpisodes().find((episode) => episode.slug === slug);
