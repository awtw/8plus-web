# Content Model (MDX + Contentlayer)

## Posts Frontmatter
```md
---
title: "以前端視角實作 Trace Context"
date: "2025-08-18"
tags: ["observability","frontend","trace-context"]
summary: "前端產生 traceparent 並串接後端觀測。"
thumbnail: "/og/trace-context.png"
published: true
protected: false           # true = store only summary in MDX, actual body in Supabase
slug: "trace-context-frontend"
---
```

## Projects Frontmatter
```md
---
title: "CRM Onboarding 模組"
slug: "crm-onboarding"
role: "Frontend & UX"
stack: ["Next.js","TypeScript","Tailwind","shadcn","Zustand"]
period: "2025.05 - 2025.08"
highlights:
  - "用戶完成率 +34%"
  - "API 變更下的彈性對接方案"
links:
  demo: "https://..."
  repo: "https://github.com/..."
summary: "說明挑戰、決策、產出與指標。"
thumbnail: "/og/crm-onboarding.png"
published: true
---
```

## Conventions
- File names: `YYYY-MM-DD-slug.mdx` for posts; `slug.mdx` for projects.
- Images live in `public/og/` and referenced with absolute `/og/...` paths.
- `protected: true` implies body is fetched from Supabase at runtime.
