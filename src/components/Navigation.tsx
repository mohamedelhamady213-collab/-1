import { Moon, Sparkles, Volume2, VolumeX, BookOpen, Menu, X } from 'lucide-react';
import { useNavScroll } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

interface NavigationProps {
  progress: number;
  currentSection: string;
  isPlaying: boolean;
  onToggleAudio: () => void;
  onToggleTasbeeh: () => void;
  onToggleJournal: () => void;
}

export function Navigation({
  progress,
  currentSection,
  isPlaying,
  onToggleAudio,
  onToggleTasbeeh,
  onToggleJournal,
}: NavigationProps) {
  const scrolled = useNavScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between transition-all duration-300"
      style={{
        padding: '0 var(--content-padding)',
        background: scrolled ? 'var(--midnight-85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Moon size={16} style={{ color: 'var(--gold)' }} />
        <span
          className="font-display text-display-md"
          style={{ color: 'var(--sand)' }}
        >
          يوم عرفة
        </span>
      </div>

      {/* Center Progress - Desktop */}
      <div className="hidden md:flex flex-col items-center" style={{ width: '160px' }}>
        <div className="relative w-full" style={{ height: '4px', borderRadius: '2px', background: 'rgba(242, 235, 221, 0.15)' }}>
          <div
            className="absolute top-0 right-0 h-full rounded-sm transition-all"
            style={{
              width: `${progress}%`,
              background: 'var(--gold)',
              borderRadius: '2px',
              transitionDuration: '600ms',
              transitionTimingFunction: 'var(--ease-gentle)',
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
            style={{
              right: `${progress}%`,
              transform: 'translate(50%, -50%)',
              background: 'var(--gold-bright)',
              boxShadow: '0 0 8px rgba(200, 164, 92, 0.5)',
              transition: 'right 600ms var(--ease-gentle)',
            }}
          />
        </div>
        <span className="text-label mt-1.5" style={{ color: 'var(--sand-60)' }}>
          {currentSection}
        </span>
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={onToggleTasbeeh}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
        >
          <Sparkles size={20} style={{ color: 'var(--gold)' }} />
        </button>
        <button
          onClick={onToggleAudio}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
        >
          {isPlaying ? (
            <Volume2 size={20} style={{ color: 'var(--gold)' }} />
          ) : (
            <VolumeX size={20} style={{ color: 'var(--white-60)' }} />
          )}
        </button>
        <button
          onClick={onToggleJournal}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
        >
          <BookOpen size={20} style={{ color: 'var(--white-60)' }} />
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? (
          <X size={20} style={{ color: 'var(--sand)' }} />
        ) : (
          <Menu size={20} style={{ color: 'var(--sand)' }} />
        )}
      </button>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-16 left-4 right-4 rounded-xl p-3 flex flex-col gap-2"
          style={{
            background: 'var(--midnight-85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <button
            onClick={() => { onToggleTasbeeh(); setMobileOpen(false); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/10"
          >
            <Sparkles size={18} style={{ color: 'var(--gold)' }} />
            <span className="text-body-md" style={{ color: 'var(--sand)' }}>المسبحة</span>
          </button>
          <button
            onClick={() => { onToggleAudio(); setMobileOpen(false); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/10"
          >
            {isPlaying ? (
              <Volume2 size={18} style={{ color: 'var(--gold)' }} />
            ) : (
              <VolumeX size={18} style={{ color: 'var(--white-60)' }} />
            )}
            <span className="text-body-md" style={{ color: 'var(--sand)' }}>
              {isPlaying ? 'إيقاف الأصوات' : 'تشغيل الأصوات'}
            </span>
          </button>
          <button
            onClick={() => { onToggleJournal(); setMobileOpen(false); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/10"
          >
            <BookOpen size={18} style={{ color: 'var(--white-60)' }} />
            <span className="text-body-md" style={{ color: 'var(--sand)' }}>دفتر الأدعية</span>
          </button>

          {/* Mobile progress */}
          <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(242,235,221,0.1)' }}>
            <div className="relative w-full" style={{ height: '3px', borderRadius: '2px', background: 'rgba(242, 235, 221, 0.15)' }}>
              <div
                className="absolute top-0 right-0 h-full rounded-sm"
                style={{ width: `${progress}%`, background: 'var(--gold)', borderRadius: '2px' }}
              />
            </div>
            <span className="text-label mt-1.5 block text-center" style={{ color: 'var(--sand-60)' }}>
              {progress}% مكتمل
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
