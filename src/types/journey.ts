export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface JourneySection {
  id: string;
  label: string;
  timeRange: string;
  headline: string;
  subHeadline: string;
  image?: string;
  quote?: string;
  quoteAttribution?: string;
  tasks: Task[];
  variant: 'dark' | 'light' | 'golden';
  icon: string;
}

export interface SectionState {
  tasks: { id: string; completed: boolean }[];
}

export interface JourneyState {
  sections: Record<string, SectionState>;
  lastVisited: string;
  isComplete: boolean;
}

export interface DuaEntry {
  id: string;
  name: string;
  text: string;
  createdAt: string;
}

export interface TasbeehState {
  selectedDhikr: string;
  counts: Record<string, number>;
  target: number;
}
