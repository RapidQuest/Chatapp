import { useState, useEffect } from "react";

export default function useMediaQuery(query, initial) {
  const [match, setMatch] = useState(initial === undefined ? null : initial);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") return match;

    const mediaQuery = window.matchMedia(query);
    const handler = () => setMatch(!!mediaQuery.matches);
    handler();

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return match;
}
