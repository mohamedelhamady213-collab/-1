import { StarField } from '@/components/StarField';

export function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center justify-center text-center"
      style={{ height: '100dvh', minHeight: '500px' }}
    >
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0A0F1E 0%, #0D1324 50%, #121A2E 85%, #1A1A0E 100%)',
          zIndex: 0,
        }}
      />

      {/* Stars */}
      <StarField />

      {/* Crescent Moon */}
      <div
        className="absolute"
        style={{
          top: '12%',
          left: '15%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'transparent',
          boxShadow: '-12px 8px 0 4px #E8DCC8',
          filter: 'drop-shadow(0 0 20px rgba(232, 220, 200, 0.4))',
          animation: 'float 6s ease-in-out infinite',
          zIndex: 2,
        }}
      />

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '30%',
          background: 'radial-gradient(ellipse 80% 30% at 50% 100%, rgba(200, 164, 92, 0.08) 0%, transparent 70%)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6" style={{ maxWidth: '800px' }}>
        <p
          className="text-label mb-6"
          style={{
            color: 'var(--gold)',
            animation: 'fade-in-up 600ms 200ms var(--ease-gentle) both',
          }}
        >
          يوم لا يُنسى
        </p>

        <h1
          className="text-display-xl mb-4"
          style={{
            color: 'var(--white)',
            animation: 'fade-in-up 800ms 400ms var(--ease-gentle) both',
          }}
        >
          رحلة يوم عرفة
        </h1>

        <p
          className="text-body-lg mx-auto"
          style={{
            color: 'var(--white-60)',
            maxWidth: '560px',
            animation: 'fade-in-up 600ms 700ms var(--ease-gentle) both',
          }}
        >
          من ليلة عرفة حتى لحظة الغروب — رحلة روحانية لاغتنام أفضل يوم في السنة
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 hidden sm:flex"
        style={{ animation: 'fade-in-up 600ms 1000ms var(--ease-gentle) both' }}
      >
        <div className="relative" style={{ width: '1px', height: '40px', background: 'var(--white-40)' }}>
          <div
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              background: 'var(--white-60)',
              animation: 'scroll-indicator 1.5s ease-in-out infinite',
            }}
          />
        </div>
        <span className="text-body-sm" style={{ color: 'var(--white-40)' }}>
          ابدأ الرحلة
        </span>
      </div>

      {/* Crescent mobile size */}
      <style>{`
        @media (max-width: 768px) {
          section > div:nth-child(3) {
            width: 80px !important;
            height: 80px !important;
            top: 8% !important;
            left: 10% !important;
          }
        }
      `}</style>
    </section>
  );
}
