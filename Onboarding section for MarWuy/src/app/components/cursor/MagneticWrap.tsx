import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { useSetCursor } from "../../context/CursorContext";

const MAX_OFFSET_PX = 8;
const PULL_STRENGTH = 0.22;

/** Wraps its children so they drift slightly toward the cursor on hover. */
export function MagneticWrap({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const setCursor = useSetCursor();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * PULL_STRENGTH;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * PULL_STRENGTH;
    setOffset({
      x: Math.max(-MAX_OFFSET_PX, Math.min(MAX_OFFSET_PX, dx)),
      y: Math.max(-MAX_OFFSET_PX, Math.min(MAX_OFFSET_PX, dy)),
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setCursor("button")}
      onMouseLeave={() => {
        setOffset({ x: 0, y: 0 });
        setCursor("default");
      }}
      style={{
        display: "inline-block",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.45s cubic-bezier(.33,1,.68,1)",
      }}
    >
      {children}
    </div>
  );
}
