# Repository Structure

```
.
├─ app/
│  ├─ (site)/
│  │  ├─ page.tsx                # Home
│  │  ├─ services/page.tsx
│  │  ├─ projects/page.tsx
│  │  ├─ projects/[slug]/page.tsx
│  │  ├─ blog/page.tsx
│  │  ├─ blog/[slug]/page.tsx
│  │  ├─ booking/page.tsx        # Cal.com/Calendly embed
│  │  ├─ about/page.tsx
│  │  └─ contact/page.tsx
│  ├─ admin/
│  │  ├─ login/page.tsx          # Supabase Auth login (Phase 2)
│  │  └─ posts/page.tsx          # Simple admin for protected posts (Phase 2+)
│  └─ api/
│     ├─ protected-posts/[id]/route.ts  # Signed fetch from Supabase (Phase 2+)
│     └─ auth/callback/route.ts         # For OAuth flows if needed
├─ components/
│  ├─ ui/*                        # shadcn exports
│  ├─ site-header.tsx
│  ├─ site-footer.tsx
│  ├─ mdx-components.tsx
│  ├─ post-card.tsx
│  └─ project-card.tsx
├─ content/
│  ├─ posts/*.mdx
│  └─ projects/*.mdx
├─ lib/
│  ├─ contentlayer.ts
│  ├─ supabase.ts
│  ├─ seo.ts
│  ├─ analytics.ts
│  ├─ auth.ts                     # helpers for client/server auth
│  ├─ booking.ts                  # future: self-hosted booking helpers
│  └─ utils.ts
├─ public/
│  ├─ og/*.png
│  └─ favicon.ico
├─ styles/
│  ├─ globals.css
│  └─ prose.css
├─ messages/                      # i18n messages (add later)
│  ├─ zh.json
│  └─ en.json
├─ scripts/                       # tooling, content encryption, etc.
│  ├─ encrypt-content.mjs         # optional: AES encrypt for client-side unlock
│  └─ generate-og.mjs             # optional: OG automation
├─ .env.example
├─ contentlayer.config.ts
├─ next.config.mjs
├─ package.json
├─ pnpm-lock.yaml
└─ README.md
```
