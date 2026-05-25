import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { reminderQuotes } from '@/data/journeyData';
import { useSectionInView } from '@/hooks/useScrollAnimation';

export function ReminderCards() {
  const nightInView = useSectionInView('night', 0.5);
  const preDawnInView = useSectionInView('preDawn', 0.5);
  const fajrInView = useSectionInView('fajr', 0.5);
  const afterSunriseInView = useSectionInView('afterSunrise', 0.5);
  const dhuhrInView = useSectionInView('dhuhr', 0.5);
  const asrInView = useSectionInView('asr', 0.5);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  // Determine which section is active
  const inViewStates = [
    nightInView.isInView,
    preDawnInView.isInView,
    fajrInView.isInView,
    afterSunriseInView.isInView,
    dhuhrInView.isInView,
    asrInView.isInView,
    false, // golden hour has its own reminder
  ];

  const activeSectionIndex = inViewStates.findIndex((v) => v);
  const anySectionActive = activeSectionIndex >= 0;

  useEffect(() => {
    setVisible(anySectionActive);
  }, [anySectionActive]);

  // Rotate quotes
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reminderQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-30 flex items-center gap-3 px-5 py-3 rounded-2xl max-w-[90vw]"
      style={{
        transform: 'translateX(-50%)',
        background: 'rgba(10, 15, 30, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(200, 164, 92, 0.15)',
        transition: 'all 500ms var(--ease-gentle)',
      }}
    >
      <Sparkles size={14} style={{ color: 'var(--gold)' }} className="flex-shrink-0" />
      <span
        className="text-body-sm whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          color: 'var(--sand)',
          transition: 'opacity 600ms',
        }}
      >
        {reminderQuotes[index]}
      </span>
    </div>
  );
}
