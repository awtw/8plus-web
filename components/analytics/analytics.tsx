"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";
import {
  EVENTS,
  GA_ENABLED,
  GA_ID,
  classifyPage,
  flushSession,
  getDeviceType,
  getEntrySource,
  getSession,
  getVisitCount,
  track,
  updateSession,
} from "@/lib/analytics";

const SCROLL_STEPS = [25, 50, 75, 100];
const ENGAGED_STEPS = [30, 60, 120];

/** Loads GA4 and wires the automatic trackers. Renders nothing when GA is disabled. */
export function Analytics() {
  if (!GA_ENABLED) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
      <ClickTracker />
      <PageTracker />
      <HealthTracker />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Click delegation — no per-component wiring needed                  */
/* ------------------------------------------------------------------ */

function labelOf(el: HTMLElement): string {
  return (
    el.dataset.trackLabel ||
    el.getAttribute("aria-label") ||
    (el.textContent || "").replace(/\s+/g, " ").trim()
  ).slice(0, 60);
}

function locationOf(el: HTMLElement): string {
  const explicit = el.closest<HTMLElement>("[data-track-location]");
  if (explicit?.dataset.trackLocation) return explicit.dataset.trackLocation;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  const section = el.closest<HTMLElement>("section[id]");
  if (section) return section.id.replace("home-section-", "");
  return "content";
}

/** Collect data-track-* attributes as event params (data-track-kind="x" → kind: "x"). */
function dataParams(el: HTMLElement): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(el.dataset)) {
    if (!k.startsWith("track") || k === "track" || k === "trackLabel" || k === "trackLocation" || v == null) continue;
    const key = k.slice(5).replace(/^./, (c) => c.toLowerCase());
    out[key] = v;
  }
  return out;
}

function handleClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  const el = target?.closest<HTMLElement>("a[href], [data-track]");
  if (!el) return;

  const location = locationOf(el);
  const label = labelOf(el);

  // Explicit override: <button data-track="qr_open" data-track-kind="ig">
  if (el.dataset.track) {
    track(el.dataset.track, { location, label, ...dataParams(el) });
    return;
  }

  const anchor = el as HTMLAnchorElement;
  const href = anchor.getAttribute("href") || "";
  if (!href || href.startsWith("#")) return;

  if (href.startsWith("mailto:")) return track(EVENTS.EMAIL_CLICK, { location, label });
  if (href.startsWith("tel:")) return track(EVENTS.TEL_CLICK, { location, label });

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return;
  }

  const external = url.hostname !== window.location.hostname;
  if (external) {
    const params = { location, label, link_url: url.href, link_domain: url.hostname };
    if (url.hostname === "github.com") return track(EVENTS.GITHUB_CLICK, params);
    if (url.hostname === "line.me" || url.hostname === "lin.ee") return track(EVENTS.LINE_CLICK, params);
    return track(EVENTS.OUTBOUND_CLICK, params);
  }

  const params = { location, label, link_path: url.pathname };
  if (url.pathname.startsWith("/booking")) {
    updateSession({ lastCtaLocation: location, lastCtaPath: window.location.pathname });
    flushSession();
    return track(EVENTS.BOOKING_CTA_CLICK, params);
  }
  if (location === "header" || location === "footer") return track(EVENTS.NAV_CLICK, params);
  track(EVENTS.INTERNAL_CLICK, params);
}

function handleCopy() {
  const length = window.getSelection()?.toString().length ?? 0;
  if (length > 0) track(EVENTS.COPY_TEXT, { length });
}

function ClickTracker() {
  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    document.addEventListener("copy", handleCopy);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);
  return null;
}

/* ------------------------------------------------------------------ */
/* Per-page trackers: scroll depth, section views, engaged time       */
/* ------------------------------------------------------------------ */

function PageTracker() {
  const pathname = usePathname();

  // Visitor-level user properties: slice any report by new/returning, device, language.
  useEffect(() => {
    window.gtag?.("set", "user_properties", {
      entry_source: getEntrySource(),
      visitor_type: getVisitCount() > 1 ? "returning" : "new",
      device_type: getDeviceType(),
      site_locale: localStorage.getItem("locale") || "zh-TW",
    });
  }, []);

  // Per-navigation: count the page, fire content_view / not_found.
  useEffect(() => {
    const session = getSession();
    updateSession({ pages: session.pages + 1 });
    flushSession();

    const { page_type, content_slug } = classifyPage(pathname);
    if (content_slug && (page_type === "blog_post" || page_type === "lab_detail")) {
      track(EVENTS.CONTENT_VIEW, { content_type: page_type, content_slug });
    }

    // No custom not-found page yet: detect Next's default 404 by its title.
    const timer = window.setTimeout(() => {
      if (document.title.startsWith("404")) track(EVENTS.NOT_FOUND, { page_path: pathname });
    }, 500);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Scroll depth + qualified content read.
  useEffect(() => {
    const fired = new Set<number>();
    let ticking = false;

    const check = () => {
      ticking = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      if (pct > getSession().maxScroll) updateSession({ maxScroll: Math.round(pct) });
      for (const step of SCROLL_STEPS) {
        if (pct >= step - 1 && !fired.has(step)) {
          fired.add(step);
          track(EVENTS.SCROLL_DEPTH, { percent: step, page_path: pathname });
          if (step === 75) readGate.scrolled = true;
          maybeContentRead(pathname);
        }
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };

    readGate.scrolled = false;
    readGate.engaged = false;
    readGate.done = false;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const seen = new Set<string>();
    let observer: IntersectionObserver | undefined;

    // Wait for the page's sections to mount after a client-side navigation.
    const timer = window.setTimeout(() => {
      const nodes = document.querySelectorAll<HTMLElement>('section[id^="home-section-"], [data-track-section]');
      if (nodes.length === 0) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            const name = el.dataset.trackSection || el.id.replace("home-section-", "");
            if (seen.has(name)) continue;
            seen.add(name);
            track(EVENTS.SECTION_VIEW, { section: name, page_path: pathname });
          }
        },
        { threshold: 0.5 },
      );
      nodes.forEach((n) => observer?.observe(n));
    }, 500);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  // Engaged time (visible seconds), also accumulated into the session summary.
  useEffect(() => {
    let seconds = 0;
    const fired = new Set<number>();
    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      seconds += 1;
      updateSession({ engaged: getSession().engaged + 1 });
      if (seconds % 10 === 0) flushSession();
      for (const step of ENGAGED_STEPS) {
        if (seconds >= step && !fired.has(step)) {
          fired.add(step);
          track(EVENTS.ENGAGED_TIME, { seconds: step, page_path: pathname });
          if (step === 30) readGate.engaged = true;
          maybeContentRead(pathname);
        }
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [pathname]);

  return null;
}

/** content_read = scrolled >=75% AND >=30s engaged on a blog post / lab project. */
const readGate = { scrolled: false, engaged: false, done: false };

function maybeContentRead(pathname: string) {
  if (readGate.done || !readGate.scrolled || !readGate.engaged) return;
  const { page_type, content_slug } = classifyPage(pathname);
  if (!content_slug || (page_type !== "blog_post" && page_type !== "lab_detail")) return;
  readGate.done = true;
  track(EVENTS.CONTENT_READ, { content_type: page_type, content_slug });
}

/* ------------------------------------------------------------------ */
/* Health: Web Vitals, JS errors, session summary                     */
/* ------------------------------------------------------------------ */

const MAX_ERRORS_PER_SESSION = 3;

function HealthTracker() {
  useReportWebVitals((metric) => {
    track(EVENTS.WEB_VITAL, {
      metric_name: metric.name,
      // GA4 wants integers; CLS is a small float so scale it.
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      rating: metric.rating,
      metric_id: metric.id,
    });
  });

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      const session = getSession();
      if (session.errors >= MAX_ERRORS_PER_SESSION) return;
      updateSession({ errors: session.errors + 1 });
      track(EVENTS.JS_ERROR, {
        message: (event.message || "unknown").slice(0, 100),
        page_path: window.location.pathname,
      });
    };

    // First time the tab is hidden/closed: one summary of the whole session.
    const onHidden = () => {
      if (document.visibilityState !== "hidden") return;
      const s = getSession();
      flushSession();
      if (s.summarized) return;
      updateSession({ summarized: true });
      flushSession();
      track(EVENTS.SESSION_SUMMARY, {
        pages_viewed: s.pages,
        engaged_seconds: s.engaged,
        max_scroll: s.maxScroll,
        converted: Boolean(s.converted),
        duration_seconds: Math.round((Date.now() - s.start) / 1000),
      });
    };

    window.addEventListener("error", onError);
    document.addEventListener("visibilitychange", onHidden);
    return () => {
      window.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", onHidden);
    };
  }, []);

  return null;
}
