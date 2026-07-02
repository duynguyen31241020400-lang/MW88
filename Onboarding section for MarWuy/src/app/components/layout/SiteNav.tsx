import { useState, type RefObject } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSrc from "@/imports/Ngang_1.png";
import type { HeroPhase } from "../../hooks/useHeroDock";

const NAV_LINKS = [
  { label: "About Us", href: "#" },
  { label: "Our Product", href: "#" },
];

export function SiteNav({
  phase,
  navLogoRef,
  padding,
}: {
  phase: HeroPhase;
  navLogoRef: RefObject<HTMLDivElement | null>;
  padding: string;
}) {
  const [partnerHover, setPartnerHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const visible = phase === "docked";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "#fff",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
        borderBottom: "1.5px solid var(--brand-red)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: padding,
        paddingRight: padding,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.18s ease",
      }}
    >
      {/* nav logo — used as FLIP target by useHeroDock */}
      <div ref={navLogoRef} style={{ display: "inline-flex", alignItems: "center" }}>
        <ImageWithFallback
          src={logoSrc}
          alt="MarWuy logo"
          style={{ height: 38, width: "auto", objectFit: "contain", display: "block" }}
        />
      </div>

      <div className="nav-links-desktop">
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
        <a
          href="#"
          onMouseEnter={() => setPartnerHover(true)}
          onMouseLeave={() => setPartnerHover(false)}
          style={{
            fontFamily: "'Be Vietnam Pro',sans-serif",
            fontWeight: 600,
            fontSize: ".82rem",
            letterSpacing: ".08em",
            textDecoration: "none",
            color: "#fff",
            background: partnerHover ? "var(--brand-yellow)" : "var(--brand-red)",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 18,
            paddingRight: 18,
            borderRadius: 999,
            transition: "background .22s",
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          Partner with us
        </a>
      </div>

      <button
        type="button"
        className="nav-hamburger"
        aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
          <path d="M0 1h22M0 8h22M0 15h22" stroke="var(--brand-red)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            borderBottom: "1.5px solid var(--brand-red)",
            display: "flex",
            flexDirection: "column",
            padding: "12px 20px 20px",
            boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              style={{ padding: "10px 0" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Be Vietnam Pro',sans-serif",
              fontWeight: 600,
              fontSize: ".82rem",
              letterSpacing: ".08em",
              textDecoration: "none",
              color: "#fff",
              background: "var(--brand-red)",
              textAlign: "center",
              padding: "10px 18px",
              borderRadius: 999,
              marginTop: 8,
            }}
          >
            Partner with us
          </a>
        </div>
      )}
    </nav>
  );
}
