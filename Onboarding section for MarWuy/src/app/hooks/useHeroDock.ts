import { useCallback, useEffect, useRef, useState } from "react";

export type HeroPhase = "intro" | "tagline" | "docking" | "docked" | "undocking";

const INTRO_TAGLINE_DELAY_MS = 1900;
const DOCK_DURATION_MS = 720;
const UNDOCK_DURATION_MS = 730;
const SCROLL_TRIGGER_PX = 60;

/**
 * Orchestrates the hero logo "docking" sequence: the full-screen hero logo
 * FLIP-animates into the fixed nav bar's logo slot on scroll, and reverses
 * when the user scrolls back to the top.
 */
export function useHeroDock() {
  const [phase, setPhase] = useState<HeroPhase>("intro");
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const navLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase((p) => (p === "intro" ? "tagline" : p));
    }, INTRO_TAGLINE_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const dock = useCallback(() => {
    const heroEl = heroLogoRef.current;
    const targetEl = navLogoRef.current;

    if (!heroEl || !targetEl) {
      setPhase("docked");
      return;
    }

    const hr = heroEl.getBoundingClientRect();
    const tr = targetEl.getBoundingClientRect();
    const s = tr.height / hr.height;
    const tx = tr.left + tr.width / 2 - (hr.left + hr.width / 2);
    const ty = tr.top + tr.height / 2 - (hr.top + hr.height / 2);

    heroEl.style.transition = "transform 0.62s ease-in-out, opacity 0.55s ease";
    requestAnimationFrame(() => {
      heroEl.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
      heroEl.style.opacity = "0";
    });

    setPhase("docking");
    setTimeout(() => setPhase("docked"), DOCK_DURATION_MS);
  }, []);

  const undock = useCallback(() => {
    const heroEl = heroLogoRef.current;
    setPhase("undocking");

    if (!heroEl) {
      setTimeout(() => setPhase("tagline"), UNDOCK_DURATION_MS - 30);
      return;
    }

    // logo is at nav position (inline styles from dock) — animate back to center
    setTimeout(() => {
      heroEl.style.transition = "transform 0.65s ease-in-out, opacity 0.42s ease 0.08s";
      requestAnimationFrame(() => {
        heroEl.style.transform = "translate(0px, 0px) scale(1)";
        heroEl.style.opacity = "1";
      });
    }, 16);

    setTimeout(() => setPhase("tagline"), UNDOCK_DURATION_MS);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if ((phase === "intro" || phase === "tagline") && window.scrollY > SCROLL_TRIGGER_PX) {
        dock();
      } else if (phase === "docked" && window.scrollY < SCROLL_TRIGGER_PX) {
        undock();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase, dock, undock]);

  return { phase, heroLogoRef, navLogoRef };
}
