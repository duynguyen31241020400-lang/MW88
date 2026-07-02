import { useState } from "react";
import { CursorContext, type CursorState } from "./context/CursorContext";
import { useCursorTracking } from "./hooks/useCursorTracking";
import { useHeroDock } from "./hooks/useHeroDock";
import { CustomCursor } from "./components/cursor/CustomCursor";
import { SiteNav } from "./components/layout/SiteNav";
import { HeroIntro } from "./components/sections/HeroIntro";
import { PersonaCards } from "./components/sections/PersonaCards";
import { AboutUs } from "./components/sections/AboutUs";
import { ChapterDivider } from "./components/common/ChapterDivider";

const PAGE_PADDING = "clamp(20px,5vw,72px)";

export default function App() {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const { isPointerFine, cursorDotRef } = useCursorTracking();
  const { phase, heroLogoRef, navLogoRef } = useHeroDock();

  return (
    <CursorContext.Provider value={setCursorState}>
      {isPointerFine && <CustomCursor state={cursorState} elRef={cursorDotRef} />}

      <div style={{ fontFamily: "'Be Vietnam Pro',sans-serif", background: "#fff", minHeight: "100vh" }}>
        <SiteNav phase={phase} navLogoRef={navLogoRef} padding={PAGE_PADDING} />
        <HeroIntro phase={phase} heroLogoRef={heroLogoRef} />

        {/* 100vh spacer so the user can scroll to trigger the dock animation */}
        <div style={{ height: "100vh" }} />

        <ChapterDivider padding={PAGE_PADDING} />
        <PersonaCards padding={PAGE_PADDING} />
        <ChapterDivider padding={PAGE_PADDING} />
        <AboutUs padding={PAGE_PADDING} />
      </div>
    </CursorContext.Provider>
  );
}
