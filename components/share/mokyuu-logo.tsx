/** MOKYUU mark — same geometry as mokyuu.com/favicon.svg (bone "M" + vermilion seal on Klein Blue). */
export function MokyuuLogo({ className, title = "MOKYUU 墨語" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <rect width="100" height="100" rx="22" fill="#002FA7" />
      <g transform="translate(3.57 2.54) scale(0.9286)">
        <path fill="#F4F2EE" d="M8 86L8 16L50 63L92 16L92 86L75 86L75 59.04L50 87.01L25 59.04L25 86Z" />
        <path fill="#FF401F" d="M35.1 30.1a14.9 14.9 0 1 0 29.8 0a14.9 14.9 0 1 0 -29.8 0Z" />
      </g>
    </svg>
  )
}
