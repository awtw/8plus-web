# Cursor Instructions for 8plus.app

## Goals
- Keep the repo aligned with `PROJECT_STRUCTURE.md`.
- Enforce MDX content rules from `CONTENT_MODEL.md`.
- Apply checklists in `CHECKLISTS.md` before merging.

## Tasks
1. Create the directories/files per `PROJECT_STRUCTURE.md` if missing.
2. Validate MDX frontmatter on save (title/date/summary/slug/published).
3. Ensure new pages include `generateMetadata` and canonical URLs.
4. Block merge if Lighthouse score < 90 on mobile in preview.
5. When `protected: true`, warn author to publish body to Supabase and link `slug`.

## Commands (suggested)
- `pnpm lint && pnpm typecheck && pnpm build`
- `pnpm content:validate` (optional script you add to verify frontmatter)
- `pnpm lighthouse:preview` (optional CI script)
