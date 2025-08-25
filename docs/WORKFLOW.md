# Dev Workflow & Conventions

## Tooling
- Package manager: `pnpm`
- Code style: ESLint + Prettier
- Commit: Conventional Commits (e.g., `feat:`, `fix:`, `docs:`)
- PR checks: typecheck, build, contentlayer, lint

## Environments
- Local `.env` based on `.env.example`
- Vercel Project → Environment Variables (preview/prod separated)

## Testing (lightweight)
- Unit: vitest (for utils)
- E2E (optional): Playwright for critical flows (booking page loads; auth sign-in)

## Release Cadence
- Ship small; prefer daily PRs over big drops.
