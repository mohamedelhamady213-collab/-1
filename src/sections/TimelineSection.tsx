import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Check, Moon, Star, Sunrise, Sun } from 'lucide-react';
import type { JourneySection } from '@/types/journey';

interface TimelineSectionProps {
  section: JourneySection;
  isTaskCompleted: (sectionId: string, taskId: string) => boolean;
  onToggleTask: (sectionId: string, taskId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Moon: <Moon size={16} />,
  Star: <Star size={16} />,
  Sunrise: <Sunrise size={16} />,
  Sun: <Sun size={16} />,
};

export function TimelineSection({ section, isTaskCompleted, onToggleTask }: TimelineSectionProps) {
  const sectionRef = useScrollAnimation(0.15);
  const isDark = section.variant === 'dark';
  const isLight = section.variant === 'light';

  const bgColor = isDark
    ? section.id === 'night'
      ? 'linear-gradient(180deg, #0A0F1E 0%, #0E1520 100%)'
      : section.id === 'preDawn'
        ? 'linear-gradient(180deg, #0D1420 0%, #131B2A 40%, #1A2230 70%, #1E2835 100%)'
        : 'linear-gradient(180deg, #0F1620 0%, #1A1815 100%)'
    : isLight
      ? section.id === 'afterSunrise'
        ? 'linear-gradient(180deg, #F2EBDD 0%, #EDE5D5 50%, #E8E0D0 100%)'
        : section.id === 'dhuhr'
          ? 'linear-gradient(180deg, #EDE5D5 0%, #E5DDD0 40%, #D8D8C8 100%)'
          : 'linear-gradient(180deg, #E8E0D0 0%, #E5D8C0 50%, #E0C8A0 100%)'
      : 'linear-gradient(180deg, #0A0F1E 0%, #0E1520 100%)';

  const textColor = isDark ? 'var(--white)' : 'var(--midnight)';
  const textSecondary = isDark ? 'var(--white-60)' : 'rgba(10, 15, 30, 0.6)';
  const textMuted = isDark ? 'var(--white-40)' : 'rgba(10, 15, 30, 0.5)';
  const borderColor = isDark ? 'rgba(242, 235, 221, 0.06)' : 'rgba(10, 15, 30, 0.06)';
  const cardBg = isDark ? 'rgba(10, 15, 30, 0.5)' : 'rgba(255, 255, 255, 0.6)';
  const checkboxBorder = isDark ? 'rgba(242, 235, 221, 0.25)' : 'rgba(10, 15, 30, 0.2)';
  const checkboxChecked = isDark ? 'var(--gold)' : section.id === 'dhuhr' ? 'var(--olive)' : section.id === 'asr' ? 'var(--amber-warm)' : 'var(--olive)';
  const iconColor = section.id === 'fajr' ? 'var(--amber-warm)' : isDark ? 'var(--gold)' : 'var(--olive)';

  const hasImage = section.image && section.image.length > 0;
  const reversed = section.id === 'preDawn' || section.id === 'afterSunrise' || section.id === 'asr';

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="section-animate w-full"
      style={{
        background: bgColor,
        padding: 'var(--space-4xl) var(--content-padding)',
      }}
    >
      {/* Fajr hero image */}
      {section.id === 'fajr' && (
        <div className="w-full mb-12 overflow-hidden" style={{ height: '50vh', minHeight: '320px' }}>
          <img
            src={section.image}
            alt="شروق الشمس"
            className="w-full h-full object-cover"
            style={{
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            }}
            loading="lazy"
          />
        </div>
      )}

      <div
        className="mx-auto"
        style={{
          maxWidth: 'var(--max-width)',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
        }}
      >
        {/* Desktop: 2 columns */}
        <div
          className="md:grid"
          style={{
            gridTemplateColumns: '2fr 3fr',
            gap: '3rem',
            direction: reversed ? 'ltr' : 'rtl',
          }}
        >
          {/* Info Column */}
          <div className="flex flex-col" style={{ direction: 'rtl' }}>
            {/* Time badge */}
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: iconColor }}>
                {iconMap[section.icon]}
              </span>
              <span className="text-title-md" style={{ color: textColor, fontWeight: 600 }}>
                {section.label}
              </span>
            </div>
            <p className="text-body-sm mb-6" style={{ color: textMuted }}>
              {section.timeRange}
            </p>

            {/* Headline */}
            <h2 className="text-display-lg mb-3" style={{ color: textColor }}>
              {section.headline}
            </h2>

            {/* Sub-headline */}
            <p className="text-body-lg mb-8" style={{ color: textSecondary }}>
              {section.subHeadline}
            </p>

            {/* Atmospheric card */}
            {hasImage && section.id !== 'fajr' && (
              <div
                className="overflow-hidden"
                style={{
                  background: isDark ? 'rgba(10, 15, 30, 0.6)' : 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${borderColor}`,
                  borderRadius: 'var(--card-radius)',
                  padding: 'var(--space-xl)',
                }}
              >
                <img
                  src={section.image}
                  alt={section.label}
                  className="w-full object-cover rounded-xl mb-4"
                  style={{ aspectRatio: '4/3' }}
                  loading="lazy"
                />
                {section.quote && (
                  <p
                    className="text-dua-arabic italic mb-2"
                    style={{ color: isDark ? 'var(--gold-bright)' : 'var(--olive)' }}
                  >
                    {section.quote}
                  </p>
                )}
                {section.quoteAttribution && (
                  <p className="text-body-sm" style={{ color: textMuted }}>
                    {section.quoteAttribution}
                  </p>
                )}
              </div>
            )}

            {/* Fajr special feature card */}
            {section.id === 'fajr' && (
              <div
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{
                  background: 'rgba(200, 164, 92, 0.08)',
                  border: '1px solid rgba(200, 164, 92, 0.15)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(200, 164, 92, 0.15)' }}
                >
                  <Moon size={20} style={{ color: 'var(--gold)' }} />
                </div>
                <div>
                  <p className="text-title-md mb-1" style={{ color: 'var(--gold)' }}>
                    أذكار الصباح
                  </p>
                  <p className="text-body-sm" style={{ color: textSecondary }}>
                    اقرأ أذكار الصباح كاملة — تحصنك بها الله حتى المساء
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tasks Column */}
          <div className="flex flex-col gap-3" style={{ direction: 'rtl' }}>
            {section.tasks.map((task) => {
              const completed = isTaskCompleted(section.id, task.id);
              return (
                <div
                  key={task.id}
                  className="group flex items-start gap-4 p-5 rounded-2xl transition-all duration-200 cursor-pointer"
                  style={{
                    background: completed
                      ? isDark
                        ? 'rgba(200, 164, 92, 0.05)'
                        : 'rgba(200, 164, 92, 0.05)'
                      : cardBg,
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${completed ? 'rgba(200, 164, 92, 0.2)' : borderColor}`,
                  }}
                  onClick={() => onToggleTask(section.id, task.id)}
                >
                  {/* Checkbox */}
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5"
                    style={{
                      border: `2px solid ${completed ? checkboxChecked : checkboxBorder}`,
                      background: completed ? checkboxChecked : 'transparent',
                    }}
                  >
                    {completed && <Check size={14} color="#fff" strokeWidth={3} />}
                  </div>

                  {/* Task content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-title-md transition-all duration-300 relative"
                      style={{
                        color: textColor,
                        textDecoration: completed ? 'line-through' : 'none',
                        textDecorationColor: 'rgba(200, 164, 92, 0.4)',
                        textDecorationThickness: '1px',
                        opacity: completed ? 0.7 : 1,
                      }}
                    >
                      {task.title}
                    </p>
                    <p className="text-body-sm mt-1" style={{ color: textMuted }}>
                      {task.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
