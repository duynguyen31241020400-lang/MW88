import { useState } from "react";

export function HeroButton({ label, primary }: { label: string; primary: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontWeight: 600,
        fontSize: ".88rem",
        letterSpacing: ".06em",
        cursor: "pointer",
        paddingTop: 13,
        paddingBottom: 13,
        paddingLeft: 28,
        paddingRight: 28,
        borderRadius: 6,
        transition: "background .22s, color .22s, box-shadow .22s, border-color .22s",
        display: "inline-block",
        border: "none",
        ...(primary
          ? {
              background: hover ? "#a81820" : "var(--brand-red)",
              color: "#fff",
              boxShadow: hover ? "0 4px 14px rgba(208,34,40,0.35)" : "none",
            }
          : {
              background: hover ? "rgba(208,34,40,0.06)" : "#fff",
              color: "var(--brand-red)",
              border: "1.5px solid var(--brand-red)",
            }),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </button>
  );
}
