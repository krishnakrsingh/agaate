import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { initGoogleAnalytics, sendGaPageView } from "@/lib/analytics";

export function GoogleAnalytics({ measurementId }: { measurementId: string | null }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!measurementId) return;
    initGoogleAnalytics(measurementId);
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId) return;
    sendGaPageView(measurementId, pathname);
  }, [measurementId, pathname]);

  return null;
}
