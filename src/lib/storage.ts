"use client";

import { useCallback, useEffect, useState } from "react";

const FAVORITES_KEY = "mjs.favorites";
const HISTORY_KEY = "mjs.history";
const EVENT = "mjs:storage";

export interface SupportEntry {
  slug: string;
  name: string;
  amount: number;
  method: string;
  date: string;
}

/** Shown until the visitor has support of their own on this device. */
export const RECENT_HISTORY: SupportEntry[] = [
  {
    slug: "pokemon",
    name: "Pokémon",
    amount: 25,
    method: "Credit / Debit Card",
    date: "2026-09-08",
  },
  {
    slug: "hatsune-miku",
    name: "Hatsune Miku",
    amount: 10,
    method: "PayPal",
    date: "2026-09-04",
  },
  {
    slug: "one-piece",
    name: "ONE PIECE",
    amount: 50,
    method: "Apple Pay",
    date: "2026-08-29",
  },
  {
    slug: "sanrio",
    name: "Sanrio",
    amount: 5,
    method: "Google Pay",
    date: "2026-08-21",
  },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private browsing / quota — the UI still works for this session */
  }
  window.dispatchEvent(new Event(EVENT));
}

function useLocalValue<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setValue(read(key, fallback));
    sync();
    setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, ready] as const;
}

export function useFavorites() {
  const [favorites, ready] = useLocalValue<string[]>(FAVORITES_KEY, []);

  const toggle = useCallback((slug: string) => {
    const current = read<string[]>(FAVORITES_KEY, []);
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    write(FAVORITES_KEY, next);
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites],
  );

  return { favorites, isFavorite, toggle, ready };
}

export function useSupportHistory() {
  const [history, ready] = useLocalValue<SupportEntry[] | null>(
    HISTORY_KEY,
    null,
  );

  const add = useCallback((entry: SupportEntry) => {
    const current =
      read<SupportEntry[] | null>(HISTORY_KEY, null) ?? RECENT_HISTORY;
    write(HISTORY_KEY, [entry, ...current]);
  }, []);

  return { history: history ?? RECENT_HISTORY, add, ready };
}
