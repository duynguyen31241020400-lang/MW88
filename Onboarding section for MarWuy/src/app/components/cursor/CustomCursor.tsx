import type { RefObject } from "react";
import type { CursorState } from "../../context/CursorContext";

const CURSOR_CONFIG: Record<
  CursorState,
  { size: number; bg: string; border: string; label: string; fontSize: number }
> = {
  default: { size: 11, bg: "var(--brand-red)", border: "none", label: "", fontSize: 0 },
  card: { size: 58, bg: "var(--brand-red)", border: "none", label: "↻", fontSize: 20 },
  button: { size: 46, bg: "transparent", border: "2px solid var(--brand-red)", label: "", fontSize: 0 },
  carousel: { size: 52, bg: "transparent", border: "2px solid var(--brand-red)", label: "↔", fontSize: 14 },
};

export function CustomCursor({
  state,
  elRef,
}: {
  state: CursorState;
  elRef: RefObject<HTMLDivElement | null>;
}) {
  const cfg = CURSOR_CONFIG[state];

  return (
    <div
      ref={elRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: cfg.size,
        height: cfg.size,
        marginLeft: -cfg.size / 2,
        marginTop: -cfg.size / 2,
        borderRadius: "50%",
        background: cfg.bg,
        border: cfg.border,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: cfg.fontSize,
        fontWeight: 700,
        transition:
          "width .22s ease-out, height .22s ease-out, margin .22s ease-out, background .22s ease-out, border .22s ease-out",
        willChange: "transform",
      }}
    >
      {cfg.label}
    </div>
  );
}
