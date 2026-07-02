import { useEffect, useRef, useState } from "react";

/**
 * Drives the custom cursor dot position via requestAnimationFrame + lerp,
 * writing directly to the DOM (no React re-render per frame). Only active on
 * fine-pointer devices (mouse/trackpad).
 */
export function useCursorTracking() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    setIsPointerFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.16);
      current.current.y = lerp(current.current.y, target.current.y, 0.16);
      const el = cursorDotRef.current;
      if (el) el.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [isPointerFine]);

  return { isPointerFine, cursorDotRef };
}
