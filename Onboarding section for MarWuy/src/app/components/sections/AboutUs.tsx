import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import aboutImg from "@/imports/image.png";
import { useInView } from "../../hooks/useInView";
import { useSetCursor } from "../../context/CursorContext";

const CAROUSEL_SLIDES = [aboutImg, aboutImg, aboutImg];
const CAROUSEL_INTERVAL_MS = 4500;

export function AboutUs({ padding }: { padding: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const seen = useInView(sectionRef, 0.15);
  const setCursor = useSetCursor();
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx((i) => (i + 1) % CAROUSEL_SLIDES.length), CAROUSEL_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={seen ? "about-active" : ""}
      style={{ paddingTop: 0, paddingBottom: 100, paddingLeft: padding, paddingRight: padding }}
    >
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <span
          style={{
            display: "inline-block",
            background: "var(--brand-red)",
            color: "#fff",
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 900,
            fontSize: ".82rem",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 14,
            paddingRight: 14,
            borderRadius: 4,
          }}
        >
          ABOUT US.
        </span>
      </div>

      <div
        className="about-2col"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px,4vw,64px)", alignItems: "start" }}
      >
        {/* LEFT: carousel */}
        <div className="col-left">
          <div
            onMouseEnter={() => setCursor("carousel")}
            onMouseLeave={() => setCursor("default")}
            style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "4/3", background: "#f0f0f0" }}
          >
            {CAROUSEL_SLIDES.map((src, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === carouselIdx ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              >
                <ImageWithFallback
                  src={src}
                  alt={`MarWuy hoạt động ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
            {CAROUSEL_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Xem ảnh ${i + 1}`}
                onClick={() => setCarouselIdx(i)}
                style={{
                  width: i === carouselIdx ? 22 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: i === carouselIdx ? "var(--brand-red)" : "#ddd",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all .3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: mission / vision */}
        <div className="col-right">
          <div
            className="mv-box mv-2col"
            style={{
              border: "1.5px solid var(--brand-red)",
              borderRadius: 10,
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div
              style={{
                paddingTop: 22,
                paddingBottom: 22,
                paddingLeft: 20,
                paddingRight: 20,
                borderRight: "1.5px solid var(--brand-red)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  background: "var(--brand-red)",
                  color: "#fff",
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: ".72rem",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  paddingTop: 4,
                  paddingBottom: 4,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 3,
                  marginBottom: 12,
                }}
              >
                MISSION.
              </span>
              <p style={{ fontSize: "clamp(.78rem,.95vw,.88rem)", lineHeight: 1.75, color: "#333" }}>
                MarWuy kiến tạo một không gian an toàn, nơi người trẻ có cơ hội học tập, kết nối và cùng phát triển.
                Đồng thời, MarWuy hướng tới trở thành không gian đồng hành, nơi mỗi cá nhân có thể ghi dấu chặng đường
                họ trong quá trình phát triển bản thân trong lĩnh vực Marketing.
              </p>
            </div>
            <div style={{ paddingTop: 22, paddingBottom: 22, paddingLeft: 20, paddingRight: 20 }}>
              <span
                style={{
                  display: "inline-block",
                  background: "#111",
                  color: "#fff",
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: ".72rem",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  paddingTop: 4,
                  paddingBottom: 4,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 3,
                  marginBottom: 12,
                }}
              >
                VISION.
              </span>
              <p style={{ fontSize: "clamp(.78rem,.95vw,.88rem)", lineHeight: 1.75, color: "#333" }}>
                MarWuy trở thành tổ chức xã hội dẫn đầu trong việc xây dựng hạ tầng giáo dục Marketing cho người trẻ
                Việt Nam — nơi mỗi cá nhân được trao đủ công cụ, cộng đồng và môi trường để bứt phá.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
