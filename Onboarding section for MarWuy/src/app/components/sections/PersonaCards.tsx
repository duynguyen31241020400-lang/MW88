import { useRef } from "react";
import { useInView } from "../../hooks/useInView";
import { PERSONAS } from "../../data/personas";
import { PersonaCard } from "./PersonaCard";

export function PersonaCards({ padding }: { padding: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const seen = useInView(sectionRef, 0.15);

  return (
    <section
      ref={sectionRef}
      className={seen ? "cards-active" : ""}
      style={{ paddingTop: 0, paddingBottom: 96, paddingLeft: padding, paddingRight: padding }}
    >
      <div style={{ marginBottom: 44 }}>
        <p
          style={{
            fontSize: ".67rem",
            fontWeight: 600,
            letterSpacing: ".28em",
            textTransform: "uppercase",
            color: "#bbb",
            marginBottom: 10,
          }}
        >
          Onboarding
        </p>
        <h2
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem,4.5vw,3.6rem)",
            color: "#0d0d0d",
            lineHeight: 1.06,
            letterSpacing: "-.01em",
          }}
        >
          5 nhóm đối tượng mà MW đồng hành
        </h2>
      </div>

      <div className="persona-grid">
        {PERSONAS.map((persona) => (
          <div key={persona.id} className="card-item">
            <PersonaCard persona={persona} />
          </div>
        ))}
      </div>

      <p style={{ marginTop: 16, fontSize: ".68rem", letterSpacing: ".1em", color: "#ccc", textAlign: "center" }}>
        Hover vào card để xem thêm
      </p>
    </section>
  );
}
