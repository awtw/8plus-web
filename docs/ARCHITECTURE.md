# 8plus.app — Architecture & Product Blueprint
_Last updated: 2025-08-22_

## Mission
Build a fast, zero/low-cost, extensible personal site that:
- Showcases software engineering & consulting capability (primary)
- Provides booking (Google Calendar–synced via Cal.com/Calendly for MVP)
- Publishes blogs (MDX for public; protected posts via Supabase in Phase 2)
- Leaves a clean bridge to **shuyan.art** (metaphysics/UIX long-form)

## Targets & Constraints
- Time-to-first-release: ≤ 7 days
- Budget: free tiers (Vercel, Supabase free, Cal.com/Calendly free, Cloudflare Analytics free)
- Runtime: Next.js App Router on Vercel (SSG + ISR + minimal API routes)

## Brand Split
- **8plus.app**: engineering portfolio, consulting offers, booking, blog
- **shuyan.art**: metaphysics/tarot & UIX longform. 8plus routes traffic via "Services" and footer links.

## Tech Stack
- **Framework**: Next.js (App Router) + TypeScript
- **UI**: Tailwind CSS, shadcn/ui, lucide-react
- **Content**: MDX + Contentlayer (public posts & projects)
- **Auth/DB/Storage**: Supabase (Phase 2+)
- **Booking**: Cal.com/Calendly embed for MVP; Google Calendar API in-house (Phase 3)
- **Analytics**: Cloudflare Web Analytics (or Vercel Analytics)
- **SEO**: `generateMetadata` + sitemaps + OG images
- **i18n**: `next-intl` (add later; structure prepped)
- **Deployment**: Vercel (recommended). Netlify acceptable but less native for Next API routes.

## High-Level Decisions
- Public content stays in git (MDX). Protected content moves to Supabase (DB or Storage) with RLS.
- Minimal server code: Route Handlers for signed URLs, service-role tasks, and future Google API tokens.
- Booking widget first (Cal.com/Calendly). Replace/augment with self-hosted API only if needed.

## Non-Goals (MVP)
- Complex CMS; paid paywalls; multi-tenant admin.
- Heavy backend frameworks. We will keep server usage minimal.

## Security Posture
- Use environment variables for keys. No secrets in client bundle.
- RLS in Supabase for protected content.
- Optional temporary password-gate via `middleware.ts` for quick-and-dirty secrecy before Auth is ready.
