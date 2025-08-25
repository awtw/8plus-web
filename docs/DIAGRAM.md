# System Diagram (Mermaid)

```mermaid
flowchart LR
  subgraph User["User (Browser)"]
    U1[Public Pages: Home/Services/Projects/Blog]
    U2[Booking Page]
    U3[Login / Protected Posts]
  end

  subgraph Vercel["Next.js on Vercel"]
    V1[App Router (SSG/ISR)]
    V2[Route Handlers / API]
    V3[Static Assets / Public]
  end

  subgraph Content["Content Sources"]
    MDX[MDX + Contentlayer]
    SUPA_DB[(Supabase DB)]
    SUPA_STORE[(Supabase Storage)]
  end

  subgraph External["External Services"]
    CAL[Cal.com / Calendly]
    GCal[Google Calendar]
    CF[Cloudflare Web Analytics]
    GH[GitHub Repo / CI]
  end

  U1 --> V1
  U2 --> V1
  U3 --> V1

  V1 --> MDX
  V1 --> V3
  V2 --> SUPA_DB
  V2 --> SUPA_STORE

  U3 --> V2
  V2 <--> CAL
  CAL <--> GCal

  V1 --> CF
  GH --> Vercel
```
