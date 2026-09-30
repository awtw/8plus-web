/**
 * GA4 helper — single entry point for every custom event on the site.
 *
 * Full event dictionary + GA4 admin setup: docs/ANALYTICS.md
 * Loader + auto-tracking: components/analytics/analytics.tsx
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-KF309NTS2D";

/** GA loads only in production, or locally when NEXT_PUBLIC_GA_DEBUG=1 (DebugView). */
export const GA_ENABLED =
  Boolean(GA_ID) &&
  (process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_GA_DEBUG === "1");

/** Event names. Keep in sync with docs/ANALYTICS.md. */
export const EVENTS = {
  // Funnel / conversion (mark the starred ones as Key events in GA4)
  BOOKING_CTA_CLICK: "booking_cta_click", // internal link to /booking
  BOOKING_VIEW: "booking_view", // Cal embed shown (page or share hub)
  BOOKING_COMPLETE: "booking_complete", // ★ Cal bookingSuccessful
  GITHUB_CLICK: "github_click", // ★
  LINE_CLICK: "line_click", // ★ (share hubs)
  EMAIL_CLICK: "email_click",
  TEL_CLICK: "tel_click",
  QR_OPEN: "qr_open",
  // Navigation
  NAV_CLICK: "nav_click",
  INTERNAL_CLICK: "internal_click",
  OUTBOUND_CLICK: "outbound_click",
  LANG_SWITCH: "lang_switch",
  // Engagement
  SCROLL_DEPTH: "scroll_depth",
  SECTION_VIEW: "section_view",
  ENGAGED_TIME: "engaged_time",
  CONTENT_VIEW: "content_view", // blog post / lab project opened
  CONTENT_READ: "content_read", // qualified read: >=75% scroll and >=30s engaged
  COPY_TEXT: "copy_text", // selection copied (length only, never the text)
  // Health / diagnostics
  WEB_VITAL: "web_vital",
  NOT_FOUND: "not_found",
  JS_ERROR: "js_error",
  SESSION_SUMMARY: "session_summary",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS] | (string & {});
export type EventParams = Record<string, string | number | boolean | undefined>;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/* ------------------------------------------------------------------ */
/* Entry source (first touch) — lets us split conversion by channel   */
/* ------------------------------------------------------------------ */

const FIRST_TOUCH_KEY = "8p_first_touch";

function safeGet(store: Storage | undefined, key: string): string | null {
  try {
    return store?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function safeSet(store: Storage | undefined, key: string, value: string) {
  try {
    store?.setItem(key, value);
  } catch {
    /* private mode / blocked storage — tracking degrades gracefully */
  }
}

/** Derive a readable entry source from the landing URL + referrer. */
function resolveEntrySource(): string {
  const url = new URL(window.location.href);
  const utm = url.searchParams.get("utm_source") || url.searchParams.get("src");
  if (utm) {
    const medium = url.searchParams.get("utm_medium");
    return medium ? `${utm}/${medium}` : utm;
  }
  if (url.pathname === "/sb" || url.pathname.startsWith("/sb/")) return "share_hub/sb";
  if (url.pathname === "/sc" || url.pathname.startsWith("/sc/")) return "share_hub/sc";
  if (document.referrer) {
    try {
      const host = new URL(document.referrer).hostname;
      if (host && host !== window.location.hostname) return `${host}/referral`;
    } catch {
      /* ignore malformed referrer */
    }
  }
  return "direct";
}

/** First-touch source persisted across visits (localStorage). */
export function getEntrySource(): string {
  if (typeof window === "undefined") return "unknown";
  const stored = safeGet(window.localStorage, FIRST_TOUCH_KEY);
  if (stored) return stored;
  const source = resolveEntrySource();
  safeSet(window.localStorage, FIRST_TOUCH_KEY, source);
  return source;
}

/* ------------------------------------------------------------------ */
/* Page classification                                                */
/* ------------------------------------------------------------------ */

export type PageInfo = { page_type: string; content_slug?: string };

/** Map a pathname to a stable page_type (+ slug for detail pages). */
export function classifyPage(pathname: string): PageInfo {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/") return { page_type: "home" };
  const [, first, second] = clean.split("/");
  if (first === "blog") return second ? { page_type: "blog_post", content_slug: second } : { page_type: "blog_list" };
  if (first === "lab") return second ? { page_type: "lab_detail", content_slug: second } : { page_type: "lab_list" };
  if (first === "sb" || first === "sc") return { page_type: "share_hub", content_slug: first };
  return { page_type: first };
}

/* ------------------------------------------------------------------ */
/* Visitor + session context (attached to every event)                */
/* ------------------------------------------------------------------ */

const VISITS_KEY = "8p_visits";
const SESSION_KEY = "8p_session";

type Session = {
  start: number; // epoch ms of landing
  pages: number; // page views this session
  engaged: number; // visible seconds this session
  maxScroll: number; // deepest scroll % seen
  lastCtaLocation?: string; // last booking CTA clicked (conversion attribution)
  lastCtaPath?: string;
  converted?: boolean;
  summarized?: boolean;
  errors: number;
};

let memSession: Session | null = null;

function newSession(): Session {
  return { start: Date.now(), pages: 0, engaged: 0, maxScroll: 0, errors: 0 };
}

export function getSession(): Session {
  if (typeof window === "undefined") return newSession();
  if (memSession) return memSession;
  const raw = safeGet(window.sessionStorage, SESSION_KEY);
  if (raw) {
    try {
      memSession = JSON.parse(raw) as Session;
      return memSession;
    } catch {
      /* fall through to a fresh session */
    }
  }
  memSession = newSession();
  // A fresh session = one more visit for this browser.
  const visits = Number(safeGet(window.localStorage, VISITS_KEY) || 0) + 1;
  safeSet(window.localStorage, VISITS_KEY, String(visits));
  flushSession();
  return memSession;
}

export function updateSession(patch: Partial<Session>) {
  Object.assign(getSession(), patch);
}

export function flushSession() {
  if (typeof window === "undefined" || !memSession) return;
  safeSet(window.sessionStorage, SESSION_KEY, JSON.stringify(memSession));
}

export function getVisitCount(): number {
  if (typeof window === "undefined") return 1;
  getSession(); // ensures the visit for this session is counted
  return Number(safeGet(window.localStorage, VISITS_KEY) || 1);
}

export function getDeviceType(): "mobile" | "tablet" | "desktop" {
  const w = window.innerWidth;
  return w < 768 ? "mobile" : w < 1100 ? "tablet" : "desktop";
}

function getLocale(): string {
  return safeGet(window.localStorage, "locale") || "zh-TW";
}

/** Context merged into every event so any report can be sliced by these. */
function baseContext(): EventParams {
  const session = getSession();
  const visits = getVisitCount();
  return {
    entry_source: getEntrySource(),
    ...classifyPage(window.location.pathname),
    device_type: getDeviceType(),
    site_locale: getLocale(),
    visitor_type: visits > 1 ? "returning" : "new",
    visit_count: visits,
    session_pages: session.pages,
    session_seconds: Math.round((Date.now() - session.start) / 1000),
  };
}

/** Extra params for conversion events: which CTA / how long / how many pages. */
export function conversionContext(): EventParams {
  const session = getSession();
  return {
    cta_location: session.lastCtaLocation,
    cta_path: session.lastCtaPath,
    pages_before_conversion: session.pages,
    seconds_to_convert: Math.round((Date.now() - session.start) / 1000),
  };
}

/* ------------------------------------------------------------------ */
/* track()                                                            */
/* ------------------------------------------------------------------ */

const CONVERSION_EVENTS = new Set<string>([
  EVENTS.BOOKING_COMPLETE,
  EVENTS.GITHUB_CLICK,
  EVENTS.LINE_CLICK,
]);

export function track(name: EventName, params: EventParams = {}) {
  if (typeof window === "undefined" || !GA_ENABLED || !window.gtag) return;
  const isConversion = CONVERSION_EVENTS.has(name);
  window.gtag("event", name, {
    ...baseContext(),
    ...(isConversion ? conversionContext() : {}),
    ...params,
  });
  if (isConversion) {
    updateSession({ converted: true });
    flushSession();
  }
}

/* ------------------------------------------------------------------ */
/* Cal.com booking events (shared by /booking and /sb /sc share hubs) */
/* ------------------------------------------------------------------ */

type CalOn = (
  action: "on",
  args: { action: string; callback: (event: unknown) => void },
) => void;

let calBound = false;
let calSource = "unknown";

/**
 * Bind Cal embed events once per page load. `source` says which surface the
 * embed lives on; the latest caller wins so the event is attributed correctly.
 */
export function bindCalTracking(cal: unknown, source: string) {
  calSource = source;
  if (calBound || typeof cal !== "function") return;
  calBound = true;
  const on = cal as CalOn;
  on("on", {
    action: "bookingSuccessful",
    callback: () => track(EVENTS.BOOKING_COMPLETE, { source: calSource }),
  });
}
