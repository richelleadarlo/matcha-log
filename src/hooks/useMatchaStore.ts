import { useState } from "react";
import { MatchaEntry } from "@/types/matcha";

/** Hook to manage matcha entries with localStorage persistence */
export function useMatchaStore() {
  const STORAGE_KEY = "matcha-log-entries";

  // Load initial data from localStorage
  const loadEntries = (): MatchaEntry[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const [entries, setEntries] = useState<MatchaEntry[]>(loadEntries);

  // Save to localStorage whenever entries change
  const persist = (updated: MatchaEntry[]) => {
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  /** Add a new matcha entry */
  const addEntry = (name: string, rating: number, notes: string) => {
    const newEntry: MatchaEntry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      rating,
      notes: notes.trim(),
      favorite: false,
      createdAt: new Date().toISOString(),
    };
    persist([newEntry, ...entries]);
  };

  /** Delete an entry by id */
  const deleteEntry = (id: string) => {
    persist(entries.filter((e) => e.id !== id));
  };

  /** Toggle favorite status */
  const toggleFavorite = (id: string) => {
    persist(
      entries.map((e) => (e.id === id ? { ...e, favorite: !e.favorite } : e))
    );
  };

  return { entries, addEntry, deleteEntry, toggleFavorite };
}
