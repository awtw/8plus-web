# Booking Integration

## Phase 1 — Cal.com/Calendly (Recommended for MVP)
- Connect Google Calendar → Create event type → Copy embed code.
- Put widget in `/app/(site)/booking/page.tsx`.
- Benefits: timezone handling, conflict checks, reminders.

## Phase 2 — Self-Hosted (Optional)
- OAuth with Google Calendar API; store refresh token securely (server).
- Endpoints:
  - `GET /api/availability?start=...&end=...`
  - `POST /api/book` → create event (with attendees & reminders)
  - `POST /api/cancel`
- Requires: token rotation, error handling, rate limits, retries.
