"use client";

import { useMemo } from "react";
import { useIsPhone } from "./useIsPhone";

/** Softer entrance motion on phones; shared across landing sections. */
export function useScrollReveal() {
  const isPhone = useIsPhone();

  return useMemo(
    () => ({
      yDrift: isPhone ? 10 : 20,
      fadeUp: {
        initial: { opacity: 0, y: isPhone ? 10 : 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: {
          duration: isPhone ? 0.34 : 0.62,
          ease: "easeOut" as const,
        },
      },
      fadeScale: {
        initial: { opacity: 0, scale: isPhone ? 0.98 : 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: {
          duration: isPhone ? 0.42 : 0.82,
          ease: "easeOut" as const,
        },
      },
      staggerMs: isPhone ? 40 : 100,
      opacityOnly: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: isPhone ? 0.32 : 0.55 },
      },
    }),
    [isPhone],
  );
}
