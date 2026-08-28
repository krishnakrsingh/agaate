type TrackPayload = Record<string, string | number | boolean | undefined>;

export const ANALYTICS_COOKIE_KEY = "agaate_cookie_analytics";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Normalize GA4 / GTM measurement IDs for gtag.js. */
export function normalizeGoogleAnalyticsId(raw: string): string {
  const id = raw.trim();
  if (!id) return "";
  if (/^G-[A-Z0-9]{6,}$/i.test(id)) return id.toUpperCase();
  if (/^GT-[A-Z0-9]+$/i.test(id)) return id.toUpperCase();
  if (/^UA-\d+-\d+$/i.test(id)) return id;
  if (/^AW-\d+$/i.test(id)) return id.toUpperCase();
  return "";
}

export function isValidGoogleAnalyticsId(raw: string): boolean {
  return Boolean(normalizeGoogleAnalyticsId(raw));
}

/** Lightweight analytics helper — no PII. */
export function track(event: string, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;
  const entry = { event, ...payload, ts: Date.now() };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(entry);
    if (typeof window.gtag === "function") {
      window.gtag("event", event, payload);
    }
  } catch {
    // ignore
  }
  if (import.meta.env.DEV) {
    console.debug("[track]", event, payload);
  }
}

export function initGoogleAnalytics(measurementId: string) {
  if (typeof window === "undefined" || !measurementId) return false;

  try {
    const stored = localStorage.getItem(ANALYTICS_COOKIE_KEY);
    if (stored === "false") return false;
  } catch {
    // ignore
  }

  if (document.querySelector(`script[data-ga-id="${measurementId}"]`)) {
    return true;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.setAttribute("data-ga-id", measurementId);
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", measurementId, { anonymize_ip: true, send_page_view: true });
  return true;
}

export function sendGaPageView(measurementId: string, pagePath: string) {
  if (typeof window === "undefined" || !measurementId) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("config", measurementId, { page_path: pagePath });
}
