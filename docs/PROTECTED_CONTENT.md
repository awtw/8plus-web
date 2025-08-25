# Protected Content Strategies

## A) Quick Gate (Middleware + Shared Password)
- Purpose: hide drafts/lightly sensitive posts fast.
- Mechanics: `middleware.ts` checks cookie or basic password input and redirects.
- Caveat: content still exists in static files. Use only for non-sensitive content.

## B) Client-Side Decrypt (Static but encrypted)
- Encrypt markdown with AES at build-time (script in `scripts/encrypt-content.mjs`).
- Decrypt in browser after entering password. Content at rest is ciphertext.
- Caveat: no server trust, but password distribution is on you. No role control.

## C) Proper AuthZ (Recommended)
- Supabase Auth (email magic link or OAuth) + **RLS policies**.
- Store protected body in **DB** (`posts_protected`) or **Storage** with **signed URLs**.
- Fetch via client SDK or server route. Leverage row-level conditions (e.g., role, membership).

### Suggested Table (DB option)
```
posts_protected(
  id uuid pk,
  slug text unique not null,
  title text not null,
  summary text,
  body_md text,
  visibility text check (visibility in ('private','members','role:vip')) default 'members',
  created_at timestamptz default now()
)
```

### Basic RLS Policy Example (members only)
```sql
create policy "members can read"
on posts_protected for select
to authenticated
using (visibility in ('members','role:vip'));
```
