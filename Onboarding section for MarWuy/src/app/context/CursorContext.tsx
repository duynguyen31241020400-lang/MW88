import { createContext, useContext } from "react";

export type CursorState = "default" | "card" | "button" | "carousel";

export const CursorContext = createContext<(state: CursorState) => void>(() => {});

export function useSetCursor() {
  return useContext(CursorContext);
}
