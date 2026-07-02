import { useState } from "react";
import { useSetCursor } from "../../context/CursorContext";
import type { Persona } from "../../data/personas";

export function PersonaCard({ persona }: { persona: Persona }) {
  const [flipped, setFlipped] = useState(false);
  const setCursor = useSetCursor();

  return (
    <div
      style={{ perspective: "900px" }}
      onMouseEnter={() => {
        setFlipped(true);
        setCursor("card");
      }}
      onMouseLeave={() => {
        setFlipped(false);
        setCursor("default");
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "155%",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.52s ease-in-out",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            border: "1.5px solid var(--brand-red)",
            borderRadius: 10,
            background: "#fff",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 28,
              paddingBottom: 12,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            {persona.icon}
          </div>
          <div
            style={{
              background: "linear-gradient(to top, var(--brand-red) 0%, rgba(208,34,40,0.72) 55%, transparent 100%)",
              paddingTop: 36,
              paddingBottom: 16,
              paddingLeft: 12,
              paddingRight: 12,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(0.82rem, 1.3vw, 1rem)",
                letterSpacing: ".06em",
                color: "#fff",
                lineHeight: 1.25,
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              {persona.id} — {persona.name.toUpperCase()}
            </p>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "1.5px solid var(--brand-red)",
            borderRadius: 10,
            background: "#fff",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "var(--brand-red)",
              paddingTop: 13,
              paddingBottom: 13,
              paddingLeft: 12,
              paddingRight: 12,
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(0.82rem, 1.3vw, 1rem)",
                letterSpacing: ".06em",
                color: "#fff",
                lineHeight: 1.25,
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              {persona.id} — {persona.name.toUpperCase()}
            </p>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 16,
              paddingRight: 16,
              textAlign: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 28, height: 2, background: "var(--brand-red)", flexShrink: 0 }} />
            <p style={{ fontSize: "clamp(0.68rem, 1vw, 0.8rem)", lineHeight: 1.7, color: "#333" }}>
              {persona.benefit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
