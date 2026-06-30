export const siteNavigation = [
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "path", href: "/path", labelKey: "nav.path" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
] as const

export const footerNavigation = [
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "projects", href: "/projects" },
  { key: "process", href: "/process", labelKey: "nav.process" },
  { key: "pricing", href: "/pricing", labelKey: "nav.pricing" },
  { key: "contact", href: "/contact", labelKey: "nav.contact" },
  { key: "booking", href: "/booking", labelKey: "nav.booking" },
] as const

export type NavItem = (typeof siteNavigation)[number]

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}
