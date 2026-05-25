import { useState, useEffect, useCallback } from 'react';
import type { DuaEntry } from '@/types/journey';

const STORAGE_KEY = 'duaJournal';

function getInitialDuas(): DuaEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as DuaEntry[];
  } catch { /* ignore */ }
  return [];
}

export function useDuaJournal() {
  const [duas, setDuas] = useState<DuaEntry[]>(getInitialDuas);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(duas));
    } catch { /* ignore */ }
  }, [duas]);

  const addDua = useCallback((name: string, text: string) => {
    const entry: DuaEntry = {
      id: Date.now().toString(),
      name: name.trim() || 'لنفسي',
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setDuas((prev) => [entry, ...prev]);
  }, []);

  const updateDua = useCallback((id: string, name: string, text: string) => {
    setDuas((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, name: name.trim() || d.name, text: text.trim() } : d
      )
    );
  }, []);

  const deleteDua = useCallback((id: string) => {
    setDuas((prev) => prev.filter((d) => d.id !== id));
  }, []);

  return { duas, addDua, updateDua, deleteDua };
}
