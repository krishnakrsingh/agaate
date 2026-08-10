type TrackPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
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
