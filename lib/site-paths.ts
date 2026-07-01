const SHARE_HUB_PATHS = new Set(["/share", "/sb", "/sc"])

export function isShareHubPath(pathname: string): boolean {
  return SHARE_HUB_PATHS.has(pathname)
}
