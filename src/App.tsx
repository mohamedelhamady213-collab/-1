import { useState, useEffect, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { TimelineSection } from '@/sections/TimelineSection';
import { GoldenHourSection } from '@/sections/GoldenHourSection';
import { MaghribSection } from '@/sections/MaghribSection';
import { TasbeehWidget } from '@/components/TasbeehWidget';
import { DuaJournal } from '@/components/DuaJournal';
import { ReminderCards } from '@/components/ReminderCards';
import { Footer } from '@/components/Footer';
import { useJourneyState } from '@/hooks/useJourneyState';
import { useAmbientAudio } from '@/hooks/useAmbientAudio';
import { useSectionInView } from '@/hooks/useScrollAnimation';
import { journeySections } from '@/data/journeyData';

function App() {
  const { state, toggleTask, resetJourney, getProgress, isTaskCompleted } = useJourneyState();
  const { isPlaying: audioPlaying, toggle: toggleAudio } = useAmbientAudio();

  const [tasbeehOpen, setTasbeehOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Track current section for nav
  const sectionViews = {
    night: useSectionInView('night', 0.3),
    preDawn: useSectionInView('preDawn', 0.3),
    fajr: useSectionInView('fajr', 0.3),
    afterSunrise: useSectionInView('afterSunrise', 0.3),
    dhuhr: useSectionInView('dhuhr', 0.3),
    asr: useSectionInView('asr', 0.3),
    goldenHour: useSectionInView('goldenHour', 0.3),
    maghrib: useSectionInView('maghrib', 0.3),
  };

  const currentSection = useMemo(() => {
    const order = ['night', 'preDawn', 'fajr', 'afterSunrise', 'dhuhr', 'asr', 'goldenHour', 'maghrib'];
    for (let i = order.length - 1; i >= 0; i--) {
      const id = order[i];
      if (sectionViews[id as keyof typeof sectionViews]?.isInView) {
        return journeySections.find((s) => s.id === id)?.label ?? 'رحلة يوم عرفه';
      }
    }
    return 'رحلة يوم عرفه';
  }, [sectionViews]);

  const progress = getProgress();

  // Count completed tasks
  const completedCount = useMemo(() => {
    let count = 0;
    for (const section of Object.values(state.sections)) {
      for (const task of section.tasks) {
        if (task.completed) count++;
      }
    }
    return count;
  }, [state]);

  // Add loaded class for hero animations
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Close panels on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTasbeehOpen(false);
        setJournalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Get sections excluding maghrib (handled separately)
  const timelineSections = journeySections.filter(
    (s) => s.id !== 'maghrib' && s.id !== 'goldenHour'
  );
  const goldenHourSection = journeySections.find((s) => s.id === 'goldenHour')!;

  return (
    <div className={loaded ? 'loaded' : ''} style={{ direction: 'rtl' }}>
      <Navigation
        progress={progress}
        currentSection={currentSection}
        isPlaying={audioPlaying}
        onToggleAudio={toggleAudio}
        onToggleTasbeeh={() => {
          setTasbeehOpen(!tasbeehOpen);
          setJournalOpen(false);
        }}
        onToggleJournal={() => {
          setJournalOpen(!journalOpen);
          setTasbeehOpen(false);
        }}
      />

      <main>
        <HeroSection />

        {timelineSections.map((section) => (
          <TimelineSection
            key={section.id}
            section={section}
            isTaskCompleted={isTaskCompleted}
            onToggleTask={toggleTask}
          />
        ))}

        <GoldenHourSection
          section={goldenHourSection}
          isTaskCompleted={isTaskCompleted}
          onToggleTask={toggleTask}
          isInView={sectionViews.goldenHour.isInView}
        />

        <MaghribSection
          completedCount={completedCount}
          onReset={() => {
            resetJourney();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </main>

      <Footer />

      <TasbeehWidget
        isOpen={tasbeehOpen}
        onToggle={() => setTasbeehOpen(!tasbeehOpen)}
      />

      <DuaJournal
        isOpen={journalOpen}
        onClose={() => setJournalOpen(false)}
      />

      <ReminderCards />
    </div>
  );
}

export default App;
