/** Public content policy shared by Velite and all readers. Dates publish at build time. */
export type Publication = {
  published?: boolean;
  protected?: boolean;
  date?: string;
  publishedAt?: string;
  status?: string;
};
export function isPublicContent(item: Publication, now = Date.now()): boolean {
  if (item.published === false || item.protected === true) return false;
  if (item.status !== undefined && item.status !== "published") return false;
  const date = item.publishedAt ?? item.date;
  if (item.status === "published" && !date) return false;
  return (
    date === undefined ||
    (Number.isFinite(Date.parse(date)) && Date.parse(date) <= now)
  );
}
export function publicContent<T extends Publication>(
  items: T[],
  now = Date.now(),
): T[] {
  return items.filter((item) => isPublicContent(item, now));
}
