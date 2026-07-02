import type { ReactNode } from "react";

export type Persona = {
  id: string;
  name: string;
  benefit: string;
  icon: ReactNode;
};

const STROKE = "var(--brand-red)";

export const PERSONAS: Persona[] = [
  {
    id: "01",
    name: "Fresher & Newbies",
    benefit: "MarWuy tạo cơ hội cho các newbies tiếp cận với Marketing thực chiến.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
        <circle cx="32" cy="22" r="11" stroke={STROKE} strokeWidth="2" />
        <path d="M10 54c0-12.15 9.85-22 22-22s22 9.85 22 22" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
        <path d="M41 17l5 5-5 5" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="46" cy="22" r="2" fill={STROKE} />
      </svg>
    ),
  },
  {
    id: "02",
    name: "Case Crackers",
    benefit: "MarWuy đồng hành cùng các Case Crackers xây team, kết nối mentor và mài sắc chiến lược thi đấu.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
        <rect x="8" y="16" width="48" height="34" rx="3" stroke={STROKE} strokeWidth="2" />
        <path d="M22 16v-5h20v5" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
        <path d="M18 34h28M18 42h20M18 26h12" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="50" cy="46" r="8" fill="#fff" stroke={STROKE} strokeWidth="1.8" />
        <path d="M47 46l2.5 2.5 4-4" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "03",
    name: "Nữ giới trong ngành",
    benefit: "MarWuy trao cơ hội cho nữ giới khẳng định tiếng nói ở MarTech và các vị trí lãnh đạo.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
        <circle cx="32" cy="24" r="13" stroke={STROKE} strokeWidth="2" />
        <path d="M32 37v14M24 45h16" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
        <path d="M24 17c1.5-3 4.5-5 8-5s6.5 2 8 5" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M44 12l4-4M44 12h4M44 12v4" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "04",
    name: "Sinh viên trái ngành",
    benefit: "MarWuy mở cánh cửa cho sinh viên trái ngành bước vào Marketing bằng chính góc nhìn khác biệt của mình.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
        <path d="M32 8L56 20v4H8v-4L32 8z" stroke={STROKE} strokeWidth="2" strokeLinejoin="round" />
        <rect x="14" y="28" width="8" height="18" rx="1" stroke={STROKE} strokeWidth="1.8" />
        <rect x="28" y="28" width="8" height="18" rx="1" stroke={STROKE} strokeWidth="1.8" />
        <rect x="42" y="28" width="8" height="18" rx="1" stroke={STROKE} strokeWidth="1.8" />
        <path d="M8 46h48" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
        <path d="M28 38c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "05",
    name: "Các bạn ở tỉnh xa",
    benefit: "MarWuy kết nối các bạn ở tỉnh xa với tài nguyên và network chất lượng, không phân biệt khoảng cách địa lý.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
        <circle cx="32" cy="32" r="22" stroke={STROKE} strokeWidth="2" />
        <path
          d="M10 32h44M32 10c-7 6-10 13-10 22s3 16 10 22M32 10c7 6 10 13 10 22s-3 16-10 22"
          stroke={STROKE}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="32" cy="32" r="3.5" fill={STROKE} />
        <path d="M32 28.5V18" stroke={STROKE} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];
