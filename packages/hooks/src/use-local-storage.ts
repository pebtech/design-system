import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  // Always initialize with initialValue to avoid SSR hydration mismatch.
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // After mount, read the real value from localStorage.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch {
      // localStorage unavailable or JSON parse error; keep initialValue.
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue =
          value instanceof Function ? value(prev) : value;

        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(nextValue));
          }
        } catch {
          // Storage full or blocked; state still updates in memory.
        }

        return nextValue;
      });
    },
    [key],
  );

  // Sync across tabs via the storage event.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorage = (e: StorageEvent) => {
      if (e.key !== key) return;

      try {
        setStoredValue(
          e.newValue !== null
            ? (JSON.parse(e.newValue) as T)
            : initialValue,
        );
      } catch {
        setStoredValue(initialValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, initialValue]);

  return [storedValue, setValue];
}
