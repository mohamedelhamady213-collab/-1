import { useState, useEffect, useCallback } from 'react';
import type { JourneyState } from '@/types/journey';
import { journeySections } from '@/data/journeyData';

const STORAGE_KEY = 'arafahJourney';

function getInitialState(): JourneyState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as JourneyState;
      // Validate structure
      if (parsed.sections && typeof parsed.isComplete === 'boolean') {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  // Create default state
  const sections: JourneyState['sections'] = {};
  for (const section of journeySections) {
    if (section.id === 'maghrib') continue;
    sections[section.id] = {
      tasks: section.tasks.map((t) => ({ id: t.id, completed: false })),
    };
  }

  return {
    sections,
    lastVisited: new Date().toISOString(),
    isComplete: false,
  };
}

export function useJourneyState() {
  const [state, setState] = useState<JourneyState>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const toggleTask = useCallback((sectionId: string, taskId: string) => {
    setState((prev) => {
      const section = prev.sections[sectionId];
      if (!section) return prev;

      const updatedTasks = section.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );

      const updatedSections = {
        ...prev.sections,
        [sectionId]: { ...section, tasks: updatedTasks },
      };

      // Check if all tasks complete
      let allComplete = true;
      for (const sid of Object.keys(updatedSections)) {
        for (const t of updatedSections[sid].tasks) {
          if (!t.completed) {
            allComplete = false;
            break;
          }
        }
        if (!allComplete) break;
      }

      return {
        ...prev,
        sections: updatedSections,
        lastVisited: new Date().toISOString(),
        isComplete: allComplete,
      };
    });
  }, []);

  const resetJourney = useCallback(() => {
    const sections: JourneyState['sections'] = {};
    for (const section of journeySections) {
      if (section.id === 'maghrib') continue;
      sections[section.id] = {
        tasks: section.tasks.map((t) => ({ id: t.id, completed: false })),
      };
    }
    setState({
      sections,
      lastVisited: new Date().toISOString(),
      isComplete: false,
    });
  }, []);

  const getProgress = useCallback(() => {
    let total = 0;
    let completed = 0;
    for (const section of Object.values(state.sections)) {
      for (const task of section.tasks) {
        total++;
        if (task.completed) completed++;
      }
    }
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }, [state]);

  const isTaskCompleted = useCallback(
    (sectionId: string, taskId: string) => {
      return state.sections[sectionId]?.tasks.find((t) => t.id === taskId)?.completed ?? false;
    },
    [state]
  );

  return { state, toggleTask, resetJourney, getProgress, isTaskCompleted };
}
