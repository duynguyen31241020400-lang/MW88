import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSrc from "@/imports/Ngang_1.png";
import aboutImg from "@/imports/image.png";

const R = "#D02228";
const YELLOW = "#F5C518";

/* ─── cursor context ─── */
type CursorState = "default" | "card" | "button" | "carousel";
const CursorCtx = createContext<(s: CursorState) => void>(() => {});

/* ─── card data ─── */
const CARDS = [
  {
    id: "01", name: "Fresher & Newbies",
    benefit: "MarWuy tạo cơ hội cho các newbies tiếp cận với Marketing thực chiến.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
        <circle cx="32" cy="22" r="11" stroke={R} strokeWidth="2"/>
        <path d="M10 54c0-12.15 9.85-22 22-22s22 9.85 22 22" stroke={R} strokeWidth="2" strokeLinecap="round"/>
        <path d="M41 17l5 5-5 5" stroke={R} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="46" cy="22" r="2" fill={R}/>
      </svg>
    ),
  },
  {
    id: "02", name: "Case Crackers",
    benefit: "MarWuy đồng hành cùng các Case Crackers xây team, kết nối mentor và mài sắc chiến lược thi đấu.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
        <rect x="8" y="16" width="48" height="34" rx="3" stroke={R} strokeWidth="2"/>
        <path d="M22 16v-5h20v5" stroke={R} strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 34h28M18 42h20M18 26h12" stroke={R} strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="50" cy="46" r="8" fill="#fff" stroke={R} strokeWidth="1.8"/>
        <path d="M47 46l2.5 2.5 4-4" stroke={R} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "03", name: "Nữ giới trong ngành",
    benefit: "MarWuy trao cơ hội cho nữ giới khẳng định tiếng nói ở MarTech và các vị trí lãnh đạo.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
        <circle cx="32" cy="24" r="13" stroke={R} strokeWidth="2"/>
        <path d="M32 37v14M24 45h16" stroke={R} strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 17c1.5-3 4.5-5 8-5s6.5 2 8 5" stroke={R} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M44 12l4-4M44 12h4M44 12v4" stroke={R} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "04", name: "Sinh viên trái ngành",
    benefit: "MarWuy mở cánh cửa cho sinh viên trái ngành bước vào Marketing bằng chính góc nhìn khác biệt của mình.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
        <path d="M32 8L56 20v4H8v-4L32 8z" stroke={R} strokeWidth="2" strokeLinejoin="round"/>
        <rect x="14" y="28" width="8" height="18" rx="1" stroke={R} strokeWidth="1.8"/>
        <rect x="28" y="28" width="8" height="18" rx="1" stroke={R} strokeWidth="1.8"/>
        <rect x="42" y="28" width="8" height="18" rx="1" stroke={R} strokeWidth="1.8"/>
        <path d="M8 46h48" stroke={R} strokeWidth="2" strokeLinecap="round"/>
        <path d="M28 38c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke={R} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "05", name: "Các bạn ở tỉnh xa",
    benefit: "MarWuy kết nối các bạn ở tỉnh xa với tài nguyên và network chất lượng, không phân biệt khoảng cách địa lý.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
        <circle cx="32" cy="32" r="22" stroke={R} strokeWidth="2"/>
        <path d="M10 32h44M32 10c-7 6-10 13-10 22s3 16 10 22M32 10c7 6 10 13 10 22s-3 16-10 22" stroke={R} strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="3.5" fill={R}/>
        <path d="M32 28.5V18" stroke={R} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/* ─── hooks ─── */
function useInView(ref: { current: Element | null }, threshold = 0.3) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });
  return seen;
}

/* ─── flip card ─── */
function Card({ data }: { data: typeof CARDS[0] }) {
  const [flipped, setFlipped] = useState(false);
  const setCursor = useContext(CursorCtx);
  return (
    <div style={{ perspective: "900px" }}
      onMouseEnter={() => { setFlipped(true);  setCursor("card"); }}
      onMouseLeave={() => { setFlipped(false); setCursor("default"); }}>
      <div style={{
        position: "relative", width: "100%", paddingBottom: "155%",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.52s ease-in-out",
      }}>
        {/* FRONT */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          border: `1.5px solid ${R}`, borderRadius: 10,
          background: "#fff", overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            paddingTop: 28, paddingBottom: 12, paddingLeft: 16, paddingRight: 16 }}>
            {data.icon}
          </div>
          <div style={{
            background: `linear-gradient(to top, ${R} 0%, rgba(208,34,40,0.72) 55%, transparent 100%)`,
            paddingTop: 36, paddingBottom: 16, paddingLeft: 12, paddingRight: 12, textAlign: "center",
          }}>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
              fontSize: "clamp(0.82rem, 1.3vw, 1rem)", letterSpacing: ".06em",
              color: "#fff", lineHeight: 1.25, whiteSpace: "normal", wordBreak: "break-word",
            }}>{data.id} — {data.name.toUpperCase()}</p>
          </div>
        </div>
        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          border: `1.5px solid ${R}`, borderRadius: 10,
          background: "#fff", overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{
            background: R, paddingTop: 13, paddingBottom: 13,
            paddingLeft: 12, paddingRight: 12, textAlign: "center", flexShrink: 0,
          }}>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
              fontSize: "clamp(0.82rem, 1.3vw, 1rem)", letterSpacing: ".06em",
              color: "#fff", lineHeight: 1.25, whiteSpace: "normal", wordBreak: "break-word",
            }}>{data.id} — {data.name.toUpperCase()}</p>
          </div>
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            paddingTop: 20, paddingBottom: 20, paddingLeft: 16, paddingRight: 16,
            textAlign: "center", gap: 12,
          }}>
            <div style={{ width: 28, height: 2, background: R, flexShrink: 0 }} />
            <p style={{ fontSize: "clamp(0.68rem, 1vw, 0.8rem)", lineHeight: 1.7, color: "#333" }}>
              {data.benefit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── custom cursor dot ─── */
function CustomCursor({ state, elRef }: { state: CursorState; elRef: React.RefObject<HTMLDivElement> }) {
  const cfg = {
    default:  { size: 11,  bg: R,             border: "none",             label: "",  fontSize: 0 },
    card:     { size: 58,  bg: R,             border: "none",             label: "↻", fontSize: 20 },
    button:   { size: 46,  bg: "transparent", border: `2px solid ${R}`,  label: "",  fontSize: 0 },
    carousel: { size: 52,  bg: "transparent", border: `2px solid ${R}`,  label: "↔", fontSize: 14 },
  }[state];

  return (
    <div
      ref={elRef}
      style={{
        position: "fixed", top: 0, left: 0,
        width: cfg.size, height: cfg.size,
        marginLeft: -cfg.size / 2, marginTop: -cfg.size / 2,
        borderRadius: "50%",
        background: cfg.bg,
        border: cfg.border,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: cfg.fontSize,
        fontWeight: 700,
        transition: "width .22s ease-out, height .22s ease-out, margin .22s ease-out, background .22s ease-out, border .22s ease-out",
        willChange: "transform",
      }}
    >
      {cfg.label}
    </div>
  );
}

/* ─── magnetic button wrapper ─── */
function MagneticWrap({ children, setCursor }: {
  children: React.ReactNode;
  setCursor: (s: CursorState) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) * 0.22;
    const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.22;
    setOffset({ x: Math.max(-8, Math.min(8, dx)), y: Math.max(-8, Math.min(8, dy)) });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setCursor("button")}
      onMouseLeave={() => { setOffset({ x: 0, y: 0 }); setCursor("default"); }}
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

/* ─── hero CTA button ─── */
function HeroBtn({ label, primary }: { label: string; primary: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600,
        fontSize: ".88rem", letterSpacing: ".06em", cursor: "pointer",
        paddingTop: 13, paddingBottom: 13, paddingLeft: 28, paddingRight: 28,
        borderRadius: 6, transition: "background .22s, color .22s, box-shadow .22s, border-color .22s",
        display: "inline-block", border: "none",
        ...(primary
          ? { background: hover ? "#a81820" : R, color: "#fff",
              boxShadow: hover ? "0 4px 14px rgba(208,34,40,0.35)" : "none" }
          : { background: hover ? `rgba(208,34,40,0.06)` : "#fff",
              color: R, border: `1.5px solid ${R}` }),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >{label}</button>
  );
}

/* ─── letter-by-letter reveal ─── */
function LetterReveal({ text, baseDelay = 0, charDuration = 0.07, stagger = 0.04, style }: {
  text: string;
  baseDelay?: number;
  charDuration?: number;
  stagger?: number;
  style?: React.CSSProperties;
}) {
  return (
    <span style={{ display: "inline", ...style }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: ch === " " ? "pre" : undefined,
            opacity: 0,
            animation: `letterIn ${charDuration}s ease-out forwards`,
            animationDelay: `${baseDelay + i * stagger}s`,
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

/* ─── phase type ─── */
type Phase = "intro" | "tagline" | "docking" | "docked" | "undocking";

/* ═══════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════ */
export default function App() {
  const [phase, setPhase]             = useState<Phase>("intro");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [partnerHover, setPartnerHover] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isPointerFine, setIsPointerFine] = useState(false);
  const cursorDotRef   = useRef<HTMLDivElement>(null);
  const cursorTarget   = useRef({ x: -100, y: -100 });
  const cursorCurrent  = useRef({ x: -100, y: -100 });

  /* refs */
  const heroLogoRef      = useRef<HTMLDivElement>(null);
  const navLogoRef       = useRef<HTMLDivElement>(null);
  const dockTransformRef = useRef({ tx: 0, ty: 0, s: 1 }); // last dock values for reverse

  const divRef   = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const div2Ref  = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  /* scroll-based inView hooks */
  const divSeen   = useInView(divRef,   0.6);
  const cardsSeen = useInView(cardsRef, 0.15);
  const div2Seen  = useInView(div2Ref,  0.6);
  const aboutSeen = useInView(aboutRef, 0.15);

  const PAD = "clamp(20px,5vw,72px)";
  const CAROUSEL_TOTAL = 3;

  /* ── pointer detection ── */
  useEffect(() => {
    setIsPointerFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  /* ── cursor RAF tracking (direct DOM, no re-render per frame) ── */
  useEffect(() => {
    if (!isPointerFine) return;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const onMove = (e: MouseEvent) => { cursorTarget.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    let raf: number;
    const tick = () => {
      cursorCurrent.current.x = lerp(cursorCurrent.current.x, cursorTarget.current.x, 0.16);
      cursorCurrent.current.y = lerp(cursorCurrent.current.y, cursorTarget.current.y, 0.16);
      const el = cursorDotRef.current;
      if (el) el.style.transform = `translate(${cursorCurrent.current.x}px, ${cursorCurrent.current.y}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [isPointerFine]);

  /* ── intro timing: tagline appears after logo + breathing ── */
  useEffect(() => {
    const t = setTimeout(() => {
      setPhase(p => p === "intro" ? "tagline" : p);
    }, 1900);
    return () => clearTimeout(t);
  }, []);

  /* ── carousel autoplay ── */
  useEffect(() => {
    const t = setInterval(() => setCarouselIdx(i => (i + 1) % CAROUSEL_TOTAL), 4500);
    return () => clearInterval(t);
  }, []);

  /* ── dock: hero logo flies to nav position ── */
  const dock = useCallback(() => {
    const heroEl   = heroLogoRef.current;
    const targetEl = navLogoRef.current;

    if (!heroEl || !targetEl) { setPhase("docked"); return; }

    const hr = heroEl.getBoundingClientRect();
    const tr = targetEl.getBoundingClientRect();
    const s  = tr.height / hr.height;
    const tx = (tr.left + tr.width  / 2) - (hr.left + hr.width  / 2);
    const ty = (tr.top  + tr.height / 2) - (hr.top  + hr.height / 2);

    dockTransformRef.current = { tx, ty, s };

    heroEl.style.transition = "transform 0.62s ease-in-out, opacity 0.55s ease";
    requestAnimationFrame(() => {
      heroEl.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
      heroEl.style.opacity   = "0";
    });

    setPhase("docking");
    setTimeout(() => setPhase("docked"), 720);
  }, []);

  /* ── undock: logo flies back from nav to hero center ── */
  const undock = useCallback(() => {
    const heroEl = heroLogoRef.current;

    // show overlay, hide nav immediately
    setPhase("undocking");

    if (!heroEl) { setTimeout(() => setPhase("tagline"), 700); return; }

    // logo is at nav position (inline styles from dock) — animate back to center
    setTimeout(() => {
      heroEl.style.transition = "transform 0.65s ease-in-out, opacity 0.42s ease 0.08s";
      requestAnimationFrame(() => {
        heroEl.style.transform = "translate(0px, 0px) scale(1)";
        heroEl.style.opacity   = "1";
      });
    }, 16);

    setTimeout(() => setPhase("tagline"), 730);
  }, []);

  /* ── scroll listener (bidirectional) ── */
  useEffect(() => {
    const onScroll = () => {
      if ((phase === "intro" || phase === "tagline") && window.scrollY > 60) {
        dock();
      } else if (phase === "docked" && window.scrollY < 60) {
        undock();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase, dock, undock]);

  /* ── CSS ── */
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
    *{ box-sizing: border-box }

    /* ── keyframes ── */
    @keyframes logoIn    { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }
    @keyframes echoRing  { 0%{opacity:.55;transform:scale(1)} 100%{opacity:0;transform:scale(1.9)} }
    @keyframes taglineIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    @keyframes btnPop    { from{opacity:0;transform:scale(.75)} to{opacity:1;transform:scale(1)} }
    @keyframes letterIn  { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:translateY(0)} }
    @keyframes lineGrow  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
    @keyframes slideUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes cardPop   { from{opacity:0;transform:scale(.75)} to{opacity:1;transform:scale(1)} }
    @keyframes slideLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
    @keyframes slideRight{ from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
    @keyframes fadeUp    { from{opacity:0;transform:translateY(30px)}  to{opacity:1;transform:translateY(0)} }

    /* hero animations */
    .logo-entrance  { animation: logoIn  .75s ease-out both }
    .echo-ring-1    { animation: echoRing 1.1s ease-out forwards .8s }
    .echo-ring-2    { animation: echoRing 1.1s ease-out forwards 1.15s }
    .tagline-in     { animation: taglineIn .6s cubic-bezier(.16,1,.3,1) both }
    .btn-pop-1      { animation: btnPop .55s ease-out both .25s }
    .btn-pop-2      { animation: btnPop .55s ease-out both .55s }
    .scroll-hint-in { animation: taglineIn .6s ease both .55s }
    @keyframes floatArrow {
      0%,100% { transform:translateY(0);   opacity:1   }
      50%     { transform:translateY(9px); opacity:.6  }
    }
    .float-arrow { animation: floatArrow 1.35s ease-in-out infinite }

    /* dividers */
    .div-active .d-line { animation: lineGrow .72s ease-out both }
    .d-line { transform:scaleX(0); transform-origin:left }

    /* cards */
    .cards-active .card-item { animation: cardPop 1.25s cubic-bezier(0.22,1.4,0.55,1) both }
    .cards-active .card-item:nth-child(1){ animation-delay:.25s }
    .cards-active .card-item:nth-child(2){ animation-delay:.38s }
    .cards-active .card-item:nth-child(3){ animation-delay:.51s }
    .cards-active .card-item:nth-child(4){ animation-delay:.64s }
    .cards-active .card-item:nth-child(5){ animation-delay:.77s }
    .card-item { opacity:0 }

    /* about us */
    .about-active .col-left  { animation: slideLeft  .65s cubic-bezier(.16,1,.3,1) both .1s }
    .about-active .col-right { animation: slideRight .65s cubic-bezier(.16,1,.3,1) both .22s }
    .about-active .mv-box    { animation: fadeUp     .6s  cubic-bezier(.16,1,.3,1) both .5s }
    .col-left  { opacity:0 }
    .col-right { opacity:0 }
    .mv-box    { opacity:0 }

    .nav-link {
      font-family:'Be Vietnam Pro',sans-serif; font-weight:500; font-size:.82rem;
      letter-spacing:.08em; color:#333; text-decoration:none;
      border-bottom:1.5px solid transparent;
      transition:color .2s, border-color .2s;
    }
    .nav-link:hover { color:${R}; border-color:${R} }

    @media (pointer: fine) {
      *, *::before, *::after { cursor: none !important; }
    }
    @media (max-width:720px) {
      .about-2col { grid-template-columns:1fr !important }
      .mv-2col    { grid-template-columns:1fr !important }
      .mv-2col > div:first-child { border-right:none !important; border-bottom:1.5px solid ${R} }
    }

    ::-webkit-scrollbar { width:0 }
  `;

  return (
    <CursorCtx.Provider value={setCursorState}>
      <style>{CSS}</style>

      {/* custom cursor — desktop only */}
      {isPointerFine && (
        <CustomCursor state={cursorState} elRef={cursorDotRef} />
      )}

      <div style={{ fontFamily:"'Be Vietnam Pro',sans-serif", background:"#fff", minHeight:"100vh" }}>

        {/* ══════════════════════════════════════
            FIXED NAV — hidden until docked
        ══════════════════════════════════════ */}
        <nav style={{
          position: "fixed", top:0, left:0, right:0, zIndex:100,
          background: "#fff",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
          borderBottom: `1.5px solid ${R}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 14, paddingBottom: 14,
          paddingLeft: PAD, paddingRight: PAD,
          opacity: phase === "docked" ? 1 : 0,
          pointerEvents: phase === "docked" ? "auto" : "none",
          transition: "opacity 0.18s ease",
        }}>
          {/* nav logo — used as FLIP target */}
          <div ref={navLogoRef} style={{ display:"inline-flex", alignItems:"center" }}>
            <ImageWithFallback
              src={logoSrc}
              alt="MarWuy logo"
              style={{ height:38, width:"auto", objectFit:"contain", display:"block" }}
            />
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:"clamp(16px,2.5vw,36px)" }}>
            <a href="#" className="nav-link">About Us</a>
            <a href="#" className="nav-link">Our Product</a>
            <a href="#"
              onMouseEnter={() => setPartnerHover(true)}
              onMouseLeave={() => setPartnerHover(false)}
              style={{
                fontFamily:"'Be Vietnam Pro',sans-serif", fontWeight:600, fontSize:".82rem",
                letterSpacing:".08em", textDecoration:"none", color:"#fff",
                background: partnerHover ? YELLOW : R,
                paddingTop:8, paddingBottom:8, paddingLeft:18, paddingRight:18,
                borderRadius:999, transition:"background .22s",
                display:"inline-block", whiteSpace:"nowrap",
              }}>
              Partner with us
            </a>
          </div>
        </nav>

        {/* ══════════════════════════════════════
            HERO OVERLAY — fixed fullscreen, fades out on dock
        ══════════════════════════════════════ */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 150,
          background: "#fff",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          paddingTop: "1vh",
          opacity: (phase === "docking" || phase === "docked") ? 0 : 1,
          pointerEvents: (phase === "docking" || phase === "docked") ? "none" : "auto",
          transition: phase === "docking"   ? "opacity 0.65s ease"
                    : phase === "undocking" ? "opacity 0.38s ease"
                    : "none",
        }}>
          {/* echo rings — sit behind logo, centred on it */}
          {[1, 2].map(n => (
            <div key={n} className={`echo-ring-${n}`} style={{
              position: "absolute",
              width: "clamp(200px,32vw,400px)",
              height: "clamp(200px,32vw,400px)",
              marginTop: "12vh",
              borderRadius: "50%",
              border: `2px solid ${R}`,
              opacity: 0,
              pointerEvents: "none",
              zIndex: 0,
            }} />
          ))}

          {/* hero logo — FLIP source */}
          <div
            ref={heroLogoRef}
            className="logo-entrance"
            style={{ position: "relative", zIndex: 1, transformOrigin: "center" }}
          >
            <ImageWithFallback
              src={logoSrc}
              alt="MarWuy"
              style={{
                height: "clamp(200px,32vw,400px)",
                width: "auto", objectFit: "contain", display: "block",
              }}
            />
          </div>

          {/* tagline + buttons (shown after breathing) */}
          {(phase === "tagline" || phase === "docking" || phase === "undocking") && (
            <div style={{ marginTop: 6, textAlign: "center", position: "relative", zIndex: 1 }}>
              <div className="tagline-in" style={{ marginBottom: 0 }}>
                <p style={{
                  fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900,
                  fontSize:"clamp(2rem,4.5vw,4rem)", letterSpacing:".04em",
                  textTransform:"uppercase", color:R, lineHeight:1,
                  marginBottom:14, overflow:"hidden",
                }}>
                  <LetterReveal
                    text="Safe House for Marketers"
                    baseDelay={0.1}
                    charDuration={0.07}
                    stagger={0.038}
                  />
                </p>
                <div style={{ width:36, height:2, background:R, margin:"0 auto 12px" }} />
                <p style={{
                  fontFamily:"'Inter',sans-serif", fontWeight:700,
                  fontSize:"clamp(.78rem,1.2vw,.95rem)", letterSpacing:".3em",
                  textTransform:"uppercase", color:"#1a1a1a", whiteSpace:"nowrap",
                }}>
                  Educational Infrastructure for Young Marketers
                </p>
              </div>

              <div style={{ marginTop:28, display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
                <div className="btn-pop-1" style={{ opacity:0 }}>
                  <MagneticWrap setCursor={setCursorState}>
                    <HeroBtn label="Partner with us" primary={false} />
                  </MagneticWrap>
                </div>
                <div className="btn-pop-2" style={{ opacity:0 }}>
                  <MagneticWrap setCursor={setCursorState}>
                    <HeroBtn label="Join MarWuy" primary />
                  </MagneticWrap>
                </div>
              </div>

              <div className="scroll-hint-in" style={{
                marginTop: 40,
                display:"flex", justifyContent:"center",
                opacity: phase === "docking" ? 0 : 1,
                transition: "opacity 0.4s ease",
              }}>
                <div className="float-arrow" style={{
                  width: 40, height: 40,
                  borderRadius: "50%",
                  border: `1.5px solid ${R}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M3.5 9l4.5 4.5L12.5 9" stroke={R} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════
            SCROLLABLE PAGE CONTENT
        ══════════════════════════════════════ */}

        {/* 100vh spacer so user can scroll to trigger dock */}
        <div style={{ height: "100vh" }} />

        {/* ── Chapter divider 1 ── */}
        <div ref={divRef} className={divSeen ? "div-active" : ""}
          style={{ paddingTop:52, paddingBottom:52, paddingLeft:PAD, paddingRight:PAD }}>
          <div className="d-line" style={{ height:2, background:R, width:"100%" }} />
        </div>

        {/* ── 5 Cards ── */}
        <section ref={cardsRef as React.RefObject<HTMLElement>}
          className={cardsSeen ? "cards-active" : ""}
          style={{ paddingTop:0, paddingBottom:96, paddingLeft:PAD, paddingRight:PAD }}>

          <div style={{ marginBottom:44 }}>
            <p style={{ fontSize:".67rem", fontWeight:600, letterSpacing:".28em", textTransform:"uppercase", color:"#bbb", marginBottom:10 }}>
              Onboarding
            </p>
            <h2 style={{
              fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900,
              fontSize:"clamp(2rem,4.5vw,3.6rem)", color:"#0d0d0d", lineHeight:1.06, letterSpacing:"-.01em",
            }}>
              5 nhóm đối tượng mà MW đồng hành
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,minmax(0,1fr))", gap:"clamp(8px,1.2vw,18px)" }}>
            {CARDS.map(c => (
              <div key={c.id} className="card-item">
                <Card data={c} />
              </div>
            ))}
          </div>

          <p style={{ marginTop:16, fontSize:".68rem", letterSpacing:".1em", color:"#ccc", textAlign:"center" }}>
            Hover vào card để xem thêm
          </p>
        </section>

        {/* ── Chapter divider 2 ── */}
        <div ref={div2Ref} className={div2Seen ? "div-active" : ""}
          style={{ paddingTop:52, paddingBottom:52, paddingLeft:PAD, paddingRight:PAD }}>
          <div className="d-line" style={{ height:2, background:R, width:"100%" }} />
        </div>

        {/* ── About Us ── */}
        <section ref={aboutRef as React.RefObject<HTMLElement>}
          className={aboutSeen ? "about-active" : ""}
          style={{ paddingTop:0, paddingBottom:100, paddingLeft:PAD, paddingRight:PAD }}>

          {/* ABOUT US. tag — full-width centred */}
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <span style={{
              display:"inline-block", background:R, color:"#fff",
              fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:".82rem",
              letterSpacing:".18em", textTransform:"uppercase",
              paddingTop:6, paddingBottom:6, paddingLeft:14, paddingRight:14, borderRadius:4,
            }}>ABOUT US.</span>
          </div>

          {/* 2-col layout */}
          <div className="about-2col" style={{
            display:"grid", gridTemplateColumns:"1fr 1fr",
            gap:"clamp(28px,4vw,64px)", alignItems:"start",
          }}>

            {/* LEFT: carousel */}
            <div className="col-left">
              <div
                onMouseEnter={() => setCursorState("carousel")}
                onMouseLeave={() => setCursorState("default")}
                style={{ position:"relative", borderRadius:12, overflow:"hidden", aspectRatio:"4/3", background:"#f0f0f0" }}>
                {[aboutImg, aboutImg, aboutImg].map((src, i) => (
                  <div key={i} style={{
                    position:"absolute", inset:0,
                    opacity: i === carouselIdx ? 1 : 0,
                    transition:"opacity 0.6s ease",
                  }}>
                    <ImageWithFallback src={src} alt={`MarWuy hoạt động ${i+1}`}
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:16 }}>
                {[0,1,2].map(i => (
                  <button key={i} onClick={() => setCarouselIdx(i)} style={{
                    width: i === carouselIdx ? 22 : 8, height:8, borderRadius:999,
                    background: i === carouselIdx ? R : "#ddd",
                    border:"none", cursor:"pointer", padding:0, transition:"all .3s ease",
                  }} />
                ))}
              </div>
            </div>

            {/* RIGHT: text */}
            <div className="col-right">
              {/* MISSION / VISION */}
              <div className="mv-box mv-2col" style={{
                border:`1.5px solid ${R}`, borderRadius:10, overflow:"hidden",
                display:"grid", gridTemplateColumns:"1fr 1fr",
              }}>
                <div style={{ paddingTop:22, paddingBottom:22, paddingLeft:20, paddingRight:20, borderRight:`1.5px solid ${R}` }}>
                  <span style={{
                    display:"inline-block", background:R, color:"#fff",
                    fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:".72rem",
                    letterSpacing:".16em", textTransform:"uppercase",
                    paddingTop:4, paddingBottom:4, paddingLeft:10, paddingRight:10,
                    borderRadius:3, marginBottom:12,
                  }}>MISSION.</span>
                  <p style={{ fontSize:"clamp(.78rem,.95vw,.88rem)", lineHeight:1.75, color:"#333" }}>
                    MarWuy kiến tạo một không gian an toàn, nơi người trẻ có cơ hội học tập, kết nối và cùng phát triển. Đồng thời, MarWuy hướng tới trở thành không gian đồng hành, nơi mỗi cá nhân có thể ghi dấu chặng đường họ trong quá trình phát triển bản thân trong lĩnh vực Marketing.
                  </p>
                </div>
                <div style={{ paddingTop:22, paddingBottom:22, paddingLeft:20, paddingRight:20 }}>
                  <span style={{
                    display:"inline-block", background:"#111", color:"#fff",
                    fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:".72rem",
                    letterSpacing:".16em", textTransform:"uppercase",
                    paddingTop:4, paddingBottom:4, paddingLeft:10, paddingRight:10,
                    borderRadius:3, marginBottom:12,
                  }}>VISION.</span>
                  <p style={{ fontSize:"clamp(.78rem,.95vw,.88rem)", lineHeight:1.75, color:"#333" }}>
                    MarWuy trở thành tổ chức xã hội dẫn đầu trong việc xây dựng hạ tầng giáo dục Marketing cho người trẻ Việt Nam — nơi mỗi cá nhân được trao đủ công cụ, cộng đồng và môi trường để bứt phá.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </CursorCtx.Provider>
  );
}
