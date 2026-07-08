const SHARE_HUB_PATHS = new Set(["/share", "/sb", "/sc"])

export function isShareHubPath(pathname: string): boolean {
  return SHARE_HUB_PATHS.has(pathname)
}

/** Design Lab routes — immersive fullscreen, no site chrome. */
export function isDesignLabFullscreenPath(pathname: string): boolean {
  return pathname === "/design-lab" || pathname.startsWith("/design-lab/")
}
