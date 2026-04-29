"use client";

import { useEffect, useState } from "react";

/** Below Tailwind `sm` (640px). */
const MQ = "(max-width: 639px)";

export function useIsPhone() {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MQ);
    const sync = () => setIsPhone(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return isPhone;
}
