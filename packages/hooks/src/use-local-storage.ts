import { useCallback, useSyncExternalStore } from "react";

function subscribe(key: string, callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = (e: StorageEvent) => {
    if (e.key === key) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const serializedInitial = JSON.stringify(initialValue);

  const getSnapshot = () => {
    if (typeof window === "undefined") return serializedInitial;
    return window.localStorage.getItem(key) ?? serializedInitial;
  };

  const getServerSnapshot = () => serializedInitial;

  const rawStored = useSyncExternalStore(
    useCallback((cb) => subscribe(key, cb), [key]),
    getSnapshot,
    getServerSnapshot,
  );

  let storedValue: T;
  try {
    storedValue = JSON.parse(rawStored) as T;
  } catch {
    storedValue = initialValue;
  }

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      const nextValue =
        value instanceof Function ? value(storedValue) : value;
      try {
        if (typeof window !== "undefined") {
          const serialized = JSON.stringify(nextValue);
          window.localStorage.setItem(key, serialized);
          window.dispatchEvent(
            new StorageEvent("storage", { key, newValue: serialized }),
          );
        }
      } catch {
        // Storage full or blocked; in-memory state still reflects nextValue
        // on the next snapshot read where possible.
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}
