/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@8plus/ui"],
  async redirects() {
    return [
      { source: "/contact", destination: "/booking", permanent: true },
      { source: "/projects", destination: "/lab", permanent: true },
      { source: "/projects/:slug", destination: "/lab/:slug", permanent: true },
      { source: "/share", destination: "/sb", permanent: true },
      { source: "/process", destination: "/services#process", permanent: true },
      { source: "/pricing", destination: "/services#pricing", permanent: true },
    ]
  },
  async rewrites() {
    return [{ source: "/tool/qrcode", destination: "/tool/qrcode.html" }]
  },
}

export default nextConfig
