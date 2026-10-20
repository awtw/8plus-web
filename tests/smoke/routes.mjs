// Smoke test: core pages, redirects, rewrites and route handlers.
// Usage: BASE_URL=https://8plus-web.<account>.workers.dev node tests/smoke/routes.mjs
const BASE_URL = (process.env.BASE_URL || "http://localhost:3001").replace(/\/$/, "");

const pages = [
  "/",
  "/about",
  "/services",
  "/lab",
  "/lab/1914",
  "/blog",
  "/blog/hello-8plus",
  "/show",
  "/show/ask",
  "/booking",
  "/career",
  "/check",
  "/path",
  "/training",
  "/sb",
  "/sc",
  "/admin/login",
];

const redirects = [
  ["/contact", "/booking"],
  ["/projects", "/lab"],
  ["/projects/1914", "/lab/1914"],
  ["/share", "/sb"],
  ["/process", "/services#process"],
  ["/pricing", "/services#pricing"],
];

const handlers = [
  ["/tool/qrcode", "text/html"],
  ["/feed.xml", "xml"],
  ["/llms.txt", "text/plain"],
];

const failures = [];
const check = (ok, msg) => {
  console.log(`${ok ? "✓" : "✗"} ${msg}`);
  if (!ok) failures.push(msg);
};

for (const path of pages) {
  const res = await fetch(BASE_URL + path, { redirect: "manual" });
  const body = res.status === 200 ? await res.text() : "";
  check(res.status === 200 && body.includes("</html>"), `${path} → ${res.status}`);
}

for (const [from, to] of redirects) {
  const res = await fetch(BASE_URL + from, { redirect: "manual" });
  const location = res.headers.get("location") || "";
  const target = location.replace(/^https?:\/\/[^/]+/, "");
  check(res.status >= 300 && res.status < 400 && target === to, `${from} → ${res.status} ${target}`);
}

for (const [path, type] of handlers) {
  const res = await fetch(BASE_URL + path);
  const contentType = res.headers.get("content-type") || "";
  check(res.status === 200 && contentType.includes(type), `${path} → ${res.status} ${contentType}`);
}

// proxy.ts gate: redirects when SECRET_PASS is set, otherwise falls through to 404
const secret = await fetch(BASE_URL + "/secret", { redirect: "manual" });
const secretTarget = (secret.headers.get("location") || "").replace(/^https?:\/\/[^/]+/, "");
check(secret.status === 404 || secretTarget === "/?need_pass=1", `/secret → ${secret.status} ${secretTarget}`);

const missing = await fetch(BASE_URL + "/this-page-does-not-exist", { redirect: "manual" });
check(missing.status === 404, `/this-page-does-not-exist → ${missing.status}`);

console.log(`\n${failures.length ? `${failures.length} failed` : "all passed"} (${BASE_URL})`);
process.exit(failures.length ? 1 : 0);
