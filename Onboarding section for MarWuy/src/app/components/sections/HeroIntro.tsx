import type { RefObject } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSrc from "@/imports/Ngang_1.png";
import { HeroButton } from "../common/HeroButton";
import { LetterReveal } from "../common/LetterReveal";
import { MagneticWrap } from "../cursor/MagneticWrap";
import type { HeroPhase } from "../../hooks/useHeroDock";

export function HeroIntro({
  phase,
  heroLogoRef,
}: {
  phase: HeroPhase;
  heroLogoRef: RefObject<HTMLDivElement | null>;
}) {
  const showTagline = phase === "tagline" || phase === "docking" || phase === "undocking";
  const isHidden = phase === "docking" || phase === "docked";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 150,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "1vh",
        opacity: isHidden ? 0 : 1,
        pointerEvents: isHidden ? "none" : "auto",
        transition:
          phase === "docking" ? "opacity 0.65s ease" : phase === "undocking" ? "opacity 0.38s ease" : "none",
      }}
    >
      {/* echo rings — sit behind logo, centred on it */}
      {[1, 2].map((n) => (
        <div
          key={n}
          className={`echo-ring-${n}`}
          style={{
            position: "absolute",
            width: "clamp(200px,32vw,400px)",
            height: "clamp(200px,32vw,400px)",
            marginTop: "12vh",
            borderRadius: "50%",
            border: "2px solid var(--brand-red)",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* hero logo — FLIP source, target lives in SiteNav */}
      <div ref={heroLogoRef} className="logo-entrance" style={{ position: "relative", zIndex: 1, transformOrigin: "center" }}>
        <ImageWithFallback
          src={logoSrc}
          alt="MarWuy"
          style={{ height: "clamp(200px,32vw,400px)", width: "auto", objectFit: "contain", display: "block" }}
        />
      </div>

      {showTagline && (
        <div style={{ marginTop: 6, textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="tagline-in" style={{ marginBottom: 0 }}>
            <p
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem,4.5vw,4rem)",
                letterSpacing: ".04em",
                textTransform: "uppercase",
                color: "var(--brand-red)",
                lineHeight: 1,
                marginBottom: 14,
                overflow: "hidden",
              }}
            >
              <LetterReveal text="Safe House for Marketers" baseDelay={0.1} charDuration={0.07} stagger={0.038} />
            </p>
            <div style={{ width: 36, height: 2, background: "var(--brand-red)", margin: "0 auto 12px" }} />
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontWeight: 700,
                fontSize: "clamp(.78rem,1.2vw,.95rem)",
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "#1a1a1a",
                whiteSpace: "nowrap",
              }}
            >
              Educational Infrastructure for Young Marketers
            </p>
          </div>

          <div style={{ marginTop: 28, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <div className="btn-pop-1" style={{ opacity: 0 }}>
              <MagneticWrap>
                <HeroButton label="Partner with us" primary={false} />
              </MagneticWrap>
            </div>
            <div className="btn-pop-2" style={{ opacity: 0 }}>
              <MagneticWrap>
                <HeroButton label="Join MarWuy" primary />
              </MagneticWrap>
            </div>
          </div>

          <div
            className="scroll-hint-in"
            style={{
              marginTop: 40,
              display: "flex",
              justifyContent: "center",
              opacity: phase === "docking" ? 0 : 1,
              transition: "opacity 0.4s ease",
            }}
          >
            <div
              className="float-arrow"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1.5px solid var(--brand-red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3v10M3.5 9l4.5 4.5L12.5 9"
                  stroke="var(--brand-red)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
