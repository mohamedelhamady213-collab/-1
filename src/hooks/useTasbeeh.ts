import { useState, useEffect, useCallback } from 'react';
import type { TasbeehState } from '@/types/journey';
import { dhikrOptions } from '@/data/journeyData';

const STORAGE_KEY = 'tasbeeh';

function getInitialState(): TasbeehState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as TasbeehState;
  } catch { /* ignore */ }
  return {
    selectedDhikr: dhikrOptions[0].id,
    counts: {},
    target: 33,
  };
}

export function useTasbeeh() {
  const [state, setState] = useState<TasbeehState>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { /* ignore */ }
  }, [state]);

  const selectDhikr = useCallback((id: string) => {
    const option = dhikrOptions.find((d) => d.id === id);
    setState((prev) => ({
      ...prev,
      selectedDhikr: id,
      target: option?.defaultTarget ?? prev.target,
    }));
  }, []);

  const increment = useCallback(() => {
    setState((prev) => ({
      ...prev,
      counts: {
        ...prev.counts,
        [prev.selectedDhikr]: (prev.counts[prev.selectedDhikr] ?? 0) + 1,
      },
    }));
  }, []);

  const resetCount = useCallback(() => {
    setState((prev) => ({
      ...prev,
      counts: {
        ...prev.counts,
        [prev.selectedDhikr]: 0,
      },
    }));
  }, []);

  const setTarget = useCallback((target: number) => {
    setState((prev) => ({ ...prev, target }));
  }, []);

  const currentCount = state.counts[state.selectedDhikr] ?? 0;
  const totalCount = Object.values(state.counts).reduce((a, b) => a + b, 0);
  const reachedTarget = state.target > 0 && currentCount >= state.target;

  return {
    selectedDhikr: state.selectedDhikr,
    currentCount,
    totalCount,
    target: state.target,
    reachedTarget,
    selectDhikr,
    increment,
    resetCount,
    setTarget,
  };
}
