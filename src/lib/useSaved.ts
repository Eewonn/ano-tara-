import { useCallback, useEffect, useState } from "react";

const KEY = "anotara.saved.v1";

function read(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function write(set: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify([...set]));
  } catch {
    // ignore
  }
}

export function useSaved() {
  const [saved, setSaved] = useState<Set<string>>(() => read());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setSaved(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      write(next);
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => saved.has(id), [saved]);

  return { saved, toggle, isSaved };
}
