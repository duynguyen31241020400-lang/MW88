import { useRef } from "react";
import { useInView } from "../../hooks/useInView";

/** Thin red rule that grows in from the left when scrolled into view. */
export function ChapterDivider({ padding }: { padding: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, 0.6);

  return (
    <div
      ref={ref}
      className={seen ? "div-active" : ""}
      style={{ paddingTop: 52, paddingBottom: 52, paddingLeft: padding, paddingRight: padding }}
    >
      <div className="d-line" style={{ height: 2, background: "var(--brand-red)", width: "100%" }} />
    </div>
  );
}
