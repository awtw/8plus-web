// SEO baseline: robots, sitemap, canonical and Open Graph tags.
// Usage: BASE_URL=https://8plus-web.<account>.workers.dev node tests/seo/metadata.mjs
const BASE_URL = (process.env.BASE_URL || "http://localhost:3001").replace(/\/$/, "");
const SITE_URL = (process.env.SITE_URL || "https://www.8plus.app").replace(/\/$/, "");

const failures = [];
const check = (ok, msg) => {
  console.log(`${ok ? "✓" : "✗"} ${msg}`);
  if (!ok) failures.push(msg);
};

const robots = await fetch(`${BASE_URL}/robots.txt`);
const robotsText = await robots.text();
check(robots.status === 200, `/robots.txt → ${robots.status}`);
check(robotsText.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), "robots.txt points at production sitemap");
check(robotsText.includes("Disallow: /admin/"), "robots.txt disallows /admin/");

const sitemap = await fetch(`${BASE_URL}/sitemap.xml`);
const sitemapText = await sitemap.text();
const locs = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check(sitemap.status === 200, `/sitemap.xml → ${sitemap.status}`);
check(locs.length > 0, `sitemap has ${locs.length} URLs`);
check(locs.every((loc) => loc.startsWith(SITE_URL)), `all sitemap URLs use ${SITE_URL}`);

const meta = (html, pattern) => html.match(pattern)?.[1];

for (const path of ["/", "/about", "/services", "/blog", "/lab"]) {
  const html = await (await fetch(BASE_URL + path)).text();
  const title = meta(html, /<title>([^<]*)<\/title>/);
  const ogImage = meta(html, /<meta property="og:image" content="([^"]+)"/);
  const description = meta(html, /<meta name="description" content="([^"]+)"/);
  check(Boolean(title), `${path} has <title> (${title})`);
  check(Boolean(description), `${path} has meta description`);
  check(!ogImage || ogImage.startsWith(SITE_URL), `${path} og:image uses ${SITE_URL}`);
  check(!html.includes("http://localhost"), `${path} has no localhost URLs`);
}

console.log(`\n${failures.length ? `${failures.length} failed` : "all passed"} (${BASE_URL})`);
process.exit(failures.length ? 1 : 0);
