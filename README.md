```markdown
# MarWuy Onboarding Section

Interactive landing/onboarding page for MarWuy — a community connecting young marketing professionals.

## Features

- **Hero animation**: Full-screen logo with animated tagline & CTA buttons
- **Scroll-triggered dock**: Hero logo smoothly animates into fixed nav bar via FLIP technique
- **Persona cards**: 5 flip-cards showcasing different audience groups (Fresher & Newbies, Case Crackers, Women in tech, etc.)
- **About Us**: Image carousel + Mission/Vision statement
- **Custom cursor**: Red dot cursor with context-aware sizing (desktop only)
- **Responsive**: Mobile nav with hamburger menu, adaptive card grid (5 → 3 → 2 columns)

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Build & Deploy

```bash
npm run build
```

Outputs to `dist/`. Deployed on Vercel at https://marwuy-onboarding.vercel.app

## Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main app wrapper
│   ├── components/
│   │   ├── cursor/             # CustomCursor, MagneticWrap
│   │   ├── layout/             # SiteNav (fixed nav + mobile menu)
│   │   ├── sections/           # HeroIntro, PersonaCards, AboutUs
│   │   ├── common/             # ChapterDivider, HeroButton, LetterReveal
│   │   └── figma/              # ImageWithFallback (Figma-generated)
│   ├── context/                # CursorContext (cursor state)
│   ├── hooks/                  # useHeroDock, useCursorTracking, useInView
│   └── data/                   # personas.tsx (5 audience groups)
├── styles/
│   ├── index.css               # Main imports
│   ├── animations.css          # All @keyframes + animation classes
│   ├── theme.css               # CSS variables (colors, tokens)
│   ├── tailwind.css            # Tailwind setup
│   └── fonts.css               # Font notes
└── main.tsx                    # React entry point
```

## Tech Stack

- **React 18** + TypeScript
- **Vite 6** — fast build tool
- **Tailwind CSS 4** — utilities (optional, mostly inline styles for animations)
- **shadcn/ui components** — pre-generated but not actively used (future expansion)
- **Vercel** — deployment

## Key Concepts

- **FLIP animation**: Logo uses `getBoundingClientRect()` + direct DOM transform to animate between hero center and nav bar on scroll
- **Context + custom cursor**: Cursor state (default/card/button/carousel) managed via React Context, drawn via `requestAnimationFrame` for smooth tracking
- **Intersection Observer**: Sections fade/animate in when scrolled into viewport (`useInView` hook)
- **Brand colors**: Centralized as CSS variables (`--brand-red`, `--brand-yellow`) in `theme.css`

## Next Steps

- Replace placeholder carousel image with real content
- Add "Our Product" section (currently nav link is a placeholder)
- Implement CTA form actions (Partner with us / Join MarWuy buttons)
- Add footer
- i18n support (currently Vietnamese text hardcoded)

## Notes

- This is a Figma Make export, so `src/imports/` contains design assets and the original PDF sketch
- Cursor is hidden on desktop (`pointer: fine`) — custom red dot replaces it
- Mobile-first responsive design
```
