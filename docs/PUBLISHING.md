# Publishing & Release Flow

## Branching
- `main`: production
- `dev`: integration branch
- `feat/*`: feature branches

## CI/CD (Vercel)
- Connect repo to Vercel. Every PR → Preview URL, `main` → Production.
- Use ISR or SSG for public pages; API routes for protected content.

## Blog Release (MDX)
1. Create MDX under `content/posts/` (follow FRONTMATTER rules).
2. Run `pnpm dev` to validate Contentlayer build passes.
3. Commit + PR to `dev` → preview; merge to `main` to publish.

## Protected Article Release (Supabase)
1. Create shell MDX with `protected: true` and an abstract/summary.
2. Insert full body into Supabase (DB field `body_md` or Storage markdown).
3. Verify RLS policy; ensure only authenticated users (or specific roles) can read.
4. Test via staging preview link.

## Visual/Quality Gate (Checklist)
- [ ] Lighthouse Mobile ≥ 90 (Perf/SEO/Best Practices)
- [ ] Link check (no 404)
- [ ] OG/Twitter cards render
- [ ] i18n keys exist (if en enabled)
- [ ] Analytics events for key CTAs
- [ ] Booking widget loads & timezone correct

## Emergency Hotfix
- Commit to `main` with `chore(hotfix): ...` or patch PR with "auto-merge".
