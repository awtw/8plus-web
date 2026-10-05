import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
const source = await readFile(
  new URL("../lib/publication.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
});
const { isPublicContent, publicContent } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
const now = Date.parse("2026-10-05T00:00:00Z");
assert.equal(
  isPublicContent({ published: true, date: "2026-10-04" }, now),
  true,
);
assert.equal(
  isPublicContent({ published: false, date: "2026-10-04" }, now),
  false,
);
assert.equal(
  isPublicContent({ published: true, date: "2099-01-01" }, now),
  false,
);
assert.equal(isPublicContent({ published: true, protected: true }, now), false);
assert.equal(isPublicContent({ date: "invalid" }, now), false);
assert.equal(isPublicContent({ status: "planned" }, now), false);
assert.equal(isPublicContent({ status: "published" }, now), false);
assert.equal(isPublicContent({ status: "published", publishedAt: "2020-01-01", protected: true }, now), false);
assert.equal(isPublicContent({ status: "published", publishedAt: "2020-01-01", published: false }, now), false);
assert.equal(
  isPublicContent(
    { status: "published", publishedAt: "2026-10-05T00:00:00Z" },
    now,
  ),
  true,
);
assert.equal(
  isPublicContent(
    { status: "published", publishedAt: "2026-10-05T00:00:01Z" },
    now,
  ),
  false,
);
assert.equal(
  publicContent(
    [
      { slug: "live", published: true },
      { slug: "draft", published: false },
    ],
    now,
  ).find((item) => item.slug === "unknown"),
  undefined,
);
assert.deepEqual(
  publicContent(
    [
      { slug: "live", published: true },
      { slug: "draft", published: false },
    ],
    now,
  ).map((item) => item.slug),
  ["live"],
);
console.log(
  "[publication-check] passed: live, draft, future, protected, invalid date, episode status, exact boundary, unknown slug",
);
