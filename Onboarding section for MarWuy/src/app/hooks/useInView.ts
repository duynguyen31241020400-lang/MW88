import { useEffect, useState, type RefObject } from "react";

/**
 * Tracks whether the referenced element has scrolled into the viewport at
 * least once. Stays `true` after the first intersection (used to trigger
 * one-shot scroll-reveal animations).
 */
export function useInView(ref: RefObject<Element | null>, threshold = 0.3) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  });

  return seen;
}
