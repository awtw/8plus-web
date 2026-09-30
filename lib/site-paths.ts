/**
 * /sb and /sc are short-link landing pages for social sharing (link-in-bio style),
 * NOT part of the main site IA. They intentionally keep LINE / email / IG channels
 * that the main site hides. Details: docs/SHARE_HUBS.md
 */
const SHARE_HUB_PATHS = new Set(["/sb", "/sc"])

export function isShareHubPath(pathname: string): boolean {
  return SHARE_HUB_PATHS.has(pathname)
}
