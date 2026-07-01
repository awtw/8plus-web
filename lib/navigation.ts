export const siteNavigation = [
  { key: "lab", href: "/lab", labelKey: "nav.lab" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "path", href: "/path", labelKey: "nav.path" },
  { key: "blog", href: "/blog" },
  { key: "booking", href: "/booking" },
] as const

export const footerNavigation = [
  { href: "/feed.xml", labelKey: "footer.rss" as const, external: true },
] as const

export type NavItem = (typeof siteNavigation)[number]

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}
