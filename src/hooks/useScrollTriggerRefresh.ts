import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Recalculates GSAP ScrollTrigger container heights once images inside the DOM
 * finish loading or after specific time intervals (`contentReady` transitions).
 */
export function useScrollTriggerRefresh(contentReady: boolean) {
  useEffect(() => {
    if (!contentReady) return;

    const images = document.querySelectorAll("img");
    const handleImageLoad = () => {
      ScrollTrigger.refresh();
    };

    images.forEach((img) => {
      if (img.complete) {
        ScrollTrigger.refresh();
      } else {
        img.addEventListener("load", handleImageLoad);
        img.addEventListener("error", handleImageLoad);
      }
    });

    ScrollTrigger.refresh();
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1800);

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [contentReady]);
}
