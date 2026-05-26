import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Always initialize with false to avoid SSR hydration mismatch.
  const [matches, setMatches] = useState(false);

  // After mount, read the real value from matchMedia and subscribe.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
