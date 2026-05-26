import { useCallback, useEffect, useRef, useState } from "react";

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {},
): { setRef: (node: T | null) => void; isIntersecting: boolean } {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [node, setNode] = useState<T | null>(null);

  const { threshold, root, rootMargin } = options;

  // Serialize threshold so we can use it as a stable dependency.
  const thresholdKey =
    threshold == null
      ? ""
      : Array.isArray(threshold)
        ? threshold.join(",")
        : String(threshold);

  // Store threshold in a ref so the observer always gets the latest value
  // without the array identity issue.
  const thresholdRef = useRef(threshold);
  thresholdRef.current = threshold;

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
        }
      },
      { threshold: thresholdRef.current, root, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, thresholdKey, root, rootMargin]);

  // Callback ref: React calls this with the DOM node on mount and null on unmount.
  const setRef = useCallback((el: T | null) => {
    setNode(el);
  }, []);

  return { setRef, isIntersecting };
}
