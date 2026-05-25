import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Check, Clock, Heart } from 'lucide-react';
import { goldenHourReminders } from '@/data/journeyData';
import type { JourneySection } from '@/types/journey';

interface GoldenHourSectionProps {
  section: JourneySection;
  isTaskCompleted: (sectionId: string, taskId: string) => boolean;
  onToggleTask: (sectionId: string, taskId: string) => void;
  isInView: boolean;
}

export function GoldenHourSection({ section, isTaskCompleted, onToggleTask, isInView }: GoldenHourSectionProps) {
  const sectionRef = useScrollAnimation(0.1);
  const [reminderIndex, setReminderIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reminder rotation
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setReminderIndex((prev) => (prev + 1) % goldenHourReminders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isInView]);

  // Video load
  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <>
      <section
        id={section.id}
        ref={sectionRef}
        className="section-animate scale-in relative w-full overflow-hidden"
        style={{
          minHeight: '100vh',
          padding: 'var(--space-4xl) var(--content-padding)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Video background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 0.6 : 0, zIndex: 0 }}
          src="./videos/golden-hour.mp4"
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          preload="none"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(232, 120, 58, 0.15) 0%, rgba(240, 200, 80, 0.10) 50%, rgba(200, 164, 92, 0.05) 100%)',
            zIndex: 1,
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(60, 30, 10, 0.4) 100%)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center text-center" style={{ maxWidth: '720px' }}>
          {/* Time badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Clock size={20} style={{ color: 'var(--sunset-gold)' }} />
            <span className="text-title-lg" style={{ color: 'var(--white)', fontWeight: 600 }}>
              {section.label}
            </span>
          </div>
          <p className="text-body-sm mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {section.timeRange}
          </p>

          {/* Headline */}
          <h2
            className="text-display-xl mb-4"
            style={{
              color: 'var(--white)',
              textShadow: '0 2px 30px rgba(0,0,0,0.3)',
            }}
          >
            {section.headline}
          </h2>

          {/* Sub-headline */}
          <p
            className="text-body-lg mb-10"
            style={{
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '520px',
            }}
          >
            {section.subHeadline}
          </p>

          {/* Primary Dua Card */}
          <div
            className="w-full mb-10 p-10 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(240, 200, 80, 0.25)',
              boxShadow: '0 8px 40px rgba(200, 164, 92, 0.15)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          >
            <p
              className="text-dua-arabic mb-4"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                color: 'var(--sunset-gold)',
                lineHeight: 2.0,
              }}
            >
              {section.quote}
            </p>
            <p className="text-body-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {section.quoteAttribution}
            </p>
          </div>

          {/* Task checklist */}
          <div className="w-full flex flex-col gap-3" style={{ maxWidth: '640px' }}>
            {section.tasks.map((task) => {
              const completed = isTaskCompleted(section.id, task.id);
              return (
                <div
                  key={task.id}
                  className="flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-200"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid ${completed ? 'rgba(240, 200, 80, 0.3)' : 'rgba(240, 200, 80, 0.15)'}`,
                  }}
                  onClick={() => onToggleTask(section.id, task.id)}
                >
                  {/* Checkbox */}
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5"
                    style={{
                      border: `2px solid ${completed ? 'var(--sunset-gold)' : 'rgba(255,255,255,0.25)'}`,
                      background: completed ? 'var(--sunset-gold)' : 'transparent',
                    }}
                  >
                    {completed && <Check size={14} color="#fff" strokeWidth={3} />}
                  </div>

                  {/* Task content */}
                  <div className="flex-1 text-right">
                    <p
                      className="text-title-md transition-all duration-300"
                      style={{
                        color: 'var(--white)',
                        textDecoration: completed ? 'line-through' : 'none',
                        textDecorationColor: 'rgba(240, 200, 80, 0.4)',
                        opacity: completed ? 0.7 : 1,
                      }}
                    >
                      {task.title}
                    </p>
                    <p className="text-body-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {task.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating reminder bar */}
      {isInView && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-6 py-3 rounded-full"
          style={{
            background: 'rgba(200, 164, 92, 0.15)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(240, 200, 80, 0.2)',
            transition: 'all 500ms var(--ease-gentle)',
          }}
        >
          <Heart size={16} style={{ color: 'var(--sunset-gold)' }} />
          <span
            className="text-body-sm whitespace-nowrap"
            style={{ color: 'var(--white)', transition: 'opacity 600ms' }}
          >
            {goldenHourReminders[reminderIndex]}
          </span>
        </div>
      )}
    </>
  );
}
