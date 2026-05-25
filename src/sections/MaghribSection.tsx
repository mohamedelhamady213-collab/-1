import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Star, RotateCcw, Copy, Share2, CheckCircle2 } from 'lucide-react';
import { FloatingParticles } from '@/components/FloatingParticles';

interface MaghribSectionProps {
  completedCount: number;
  onReset: () => void;
}

export function MaghribSection({ completedCount, onReset }: MaghribSectionProps) {
  const sectionRef = useScrollAnimation(0.2);
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'رحلة يوم عرفه — يوم لا يُنسى',
          text: 'أكملت رحلة يوم عرفه — تقبل الله منا ومنكم',
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleReset = () => {
    if (showConfirm) {
      onReset();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <section
      id="maghrib"
      ref={sectionRef}
      className="section-animate scale-in relative w-full overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        minHeight: '100dvh',
        padding: 'var(--space-4xl) var(--content-padding)',
      }}
    >
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #2A1A10 0%, #3A2020 30%, #4A3040 60%, #2D1B15 100%)',
          zIndex: 0,
        }}
      />

      {/* Sunset glow */}
      <div
        className="absolute"
        style={{
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120%',
          height: '60%',
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(240, 200, 80, 0.2) 0%, rgba(212, 165, 165, 0.15) 40%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Particles */}
      <FloatingParticles />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center" style={{ maxWidth: '640px' }}>
        {/* Completion icon */}
        <div
          className="relative mb-10"
          style={{ animation: 'completion-pulse 4s ease-in-out infinite' }}
        >
          <div
            className="relative"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'transparent',
              boxShadow: '-8px 4px 0 2px var(--gold-bright)',
            }}
          >
            <Star
              size={20}
              className="absolute"
              style={{
                color: 'var(--gold)',
                top: '30%',
                left: '20%',
              }}
            />
          </div>
        </div>

        {/* Headline */}
        <h2
          className="text-display-xl mb-4"
          style={{ color: 'var(--white)' }}
        >
          تقبل الله منك
        </h2>

        {/* Sub-headline */}
        <p
          className="text-display-md mb-6"
          style={{ color: 'var(--gold-bright)' }}
        >
          نسأل الله أن يجعلك من عتقائه من النار
        </p>

        {/* Completion message */}
        <p
          className="text-body-lg mb-10"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          أكملت رحلة يوم عرفه — يوم لا يُنسى
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 w-full">
          <div
            className="flex flex-col items-center p-6 rounded-2xl min-w-[120px]"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(242, 235, 221, 0.1)',
            }}
          >
            <span className="text-counter-display" style={{ color: 'var(--gold)' }}>
              {completedCount}
            </span>
            <span className="text-body-sm mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              مهمة مكتملة
            </span>
          </div>

          <div
            className="flex flex-col items-center p-6 rounded-2xl min-w-[120px]"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(242, 235, 221, 0.1)',
            }}
          >
            <span className="text-counter-display" style={{ color: 'var(--gold)' }}>
              ~12
            </span>
            <span className="text-body-sm mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              ساعة من العبادة
            </span>
          </div>

          <div
            className="flex flex-col items-center p-6 rounded-2xl min-w-[120px]"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(242, 235, 221, 0.1)',
            }}
          >
            <span className="text-counter-display" style={{ color: 'var(--gold)' }}>
              1
            </span>
            <span className="text-body-sm mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              يوم لا يُنسى
            </span>
          </div>
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-7 py-3 rounded-full transition-all duration-300 mb-6"
          style={{
            background: showConfirm ? 'rgba(200, 164, 92, 0.2)' : 'transparent',
            border: '1px solid rgba(200, 164, 92, 0.4)',
            color: 'var(--gold)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(200, 164, 92, 0.1)';
            e.currentTarget.style.borderColor = 'var(--gold-bright)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = showConfirm ? 'rgba(200, 164, 92, 0.2)' : 'transparent';
            e.currentTarget.style.borderColor = 'rgba(200, 164, 92, 0.4)';
          }}
        >
          <RotateCcw size={16} />
          <span className="text-body-md">
            {showConfirm ? 'اضغط مرة أخرى للتأكيد' : 'ابدأ رحلة جديدة'}
          </span>
        </button>

        {/* Share section */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-body-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            شارك الأجر
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'var(--white)',
              }}
            >
              {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              <span className="text-body-sm">
                {copied ? 'تم النسخ!' : 'نسخ الرابط'}
              </span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'var(--white)',
              }}
            >
              <Share2 size={14} />
              <span className="text-body-sm">مشاركة</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
