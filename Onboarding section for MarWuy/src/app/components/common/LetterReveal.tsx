import type { CSSProperties } from "react";

export function LetterReveal({
  text,
  baseDelay = 0,
  charDuration = 0.07,
  stagger = 0.04,
  style,
}: {
  text: string;
  baseDelay?: number;
  charDuration?: number;
  stagger?: number;
  style?: CSSProperties;
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
