import { useState, useCallback } from 'react';
import { Sparkles, X, Hand, RotateCcw } from 'lucide-react';
import { dhikrOptions } from '@/data/journeyData';
import { useTasbeeh } from '@/hooks/useTasbeeh';

interface TasbeehWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function TasbeehWidget({ isOpen, onToggle }: TasbeehWidgetProps) {
  const {
    selectedDhikr,
    currentCount,
    totalCount,
    target,
    reachedTarget,
    selectDhikr,
    increment,
    resetCount,
    setTarget,
  } = useTasbeeh();

  const [countAnim, setCountAnim] = useState(false);

  const handleIncrement = useCallback(() => {
    increment();
    setCountAnim(true);
    setTimeout(() => setCountAnim(false), 200);
  }, [increment]);

  const currentDhikrLabel = dhikrOptions.find((d) => d.id === selectedDhikr)?.label ?? '';

  return (
    <>
      {/* Collapsed button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed z-40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
          style={{
            bottom: '24px',
            left: '24px',
            width: '56px',
            height: '56px',
            background: 'var(--gold)',
            boxShadow: '0 4px 20px rgba(200, 164, 92, 0.3)',
          }}
        >
          <Sparkles size={24} style={{ color: 'var(--midnight)' }} />
        </button>
      )}

      {/* Expanded panel */}
      {isOpen && (
        <>
          {/* Mobile: slide from bottom */}
          <div
            className="fixed z-40 md:hidden w-full rounded-t-3xl overflow-hidden"
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              height: '85vh',
              background: 'rgba(10, 15, 30, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              animation: 'slide-up 400ms var(--ease-gentle) both',
            }}
          >
            <TasbeehContent
              selectedDhikr={selectedDhikr}
              currentCount={currentCount}
              totalCount={totalCount}
              target={target}
              reachedTarget={reachedTarget}
              currentDhikrLabel={currentDhikrLabel}
              countAnim={countAnim}
              onClose={onToggle}
              onSelectDhikr={selectDhikr}
              onIncrement={handleIncrement}
              onReset={resetCount}
              onSetTarget={setTarget}
            />
          </div>

          {/* Desktop: floating card */}
          <div
            className="hidden md:block fixed z-40 rounded-3xl overflow-hidden"
            style={{
              bottom: '24px',
              left: '24px',
              width: '280px',
              background: 'rgba(10, 15, 30, 0.9)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(242, 235, 221, 0.1)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
              animation: 'scale-in 400ms var(--ease-spring) both',
            }}
          >
            <TasbeehContent
              selectedDhikr={selectedDhikr}
              currentCount={currentCount}
              totalCount={totalCount}
              target={target}
              reachedTarget={reachedTarget}
              currentDhikrLabel={currentDhikrLabel}
              countAnim={countAnim}
              onClose={onToggle}
              onSelectDhikr={selectDhikr}
              onIncrement={handleIncrement}
              onReset={resetCount}
              onSetTarget={setTarget}
            />
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

interface TasbeehContentProps {
  selectedDhikr: string;
  currentCount: number;
  totalCount: number;
  target: number;
  reachedTarget: boolean;
  currentDhikrLabel: string;
  countAnim: boolean;
  onClose: () => void;
  onSelectDhikr: (id: string) => void;
  onIncrement: () => void;
  onReset: () => void;
  onSetTarget: (t: number) => void;
}

function TasbeehContent({
  selectedDhikr,
  currentCount,
  totalCount,
  target,
  reachedTarget,
  currentDhikrLabel,
  countAnim,
  onClose,
  onSelectDhikr,
  onIncrement,
  onReset,
  onSetTarget,
}: TasbeehContentProps) {
  const [targetInput, setTargetInput] = useState(target.toString());

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-title-md" style={{ color: 'var(--sand)' }}>
          المسبحة الإلكترونية
        </span>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
        >
          <X size={20} style={{ color: 'var(--white-60)' }} />
        </button>
      </div>

      {/* Dhikr selector */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
        {dhikrOptions.map((d) => (
          <button
            key={d.id}
            onClick={() => onSelectDhikr(d.id)}
            className="px-3.5 py-1.5 rounded-full whitespace-nowrap text-body-sm transition-all duration-200 flex-shrink-0"
            style={{
              background: selectedDhikr === d.id ? 'var(--gold)' : 'rgba(242, 235, 221, 0.08)',
              color: selectedDhikr === d.id ? 'var(--midnight)' : 'var(--white-60)',
              border: selectedDhikr === d.id ? 'none' : '1px solid rgba(242, 235, 221, 0.1)',
              fontWeight: selectedDhikr === d.id ? 600 : 400,
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Current dhikr label */}
      <p className="text-body-sm text-center mb-4" style={{ color: 'var(--white-60)' }}>
        {currentDhikrLabel}
      </p>

      {/* Counter */}
      <div className="flex flex-col items-center mb-8">
        <span
          className="text-counter-display transition-transform duration-200"
          style={{
            color: reachedTarget ? 'var(--gold-bright)' : 'var(--gold)',
            transform: countAnim ? 'scale(1.15)' : 'scale(1)',
          }}
        >
          {currentCount}
        </span>
        <span className="text-body-sm mt-2" style={{ color: 'var(--white-40)' }}>
          المجموع: {totalCount}
        </span>
      </div>

      {/* Count button */}
      <button
        onClick={onIncrement}
        className="mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-150 active:scale-90"
        style={{
          background: 'linear-gradient(135deg, var(--gold), var(--gold-bright))',
          boxShadow: '0 4px 16px rgba(200, 164, 92, 0.3)',
        }}
      >
        <Hand size={28} style={{ color: 'var(--midnight)' }} />
      </button>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-body-sm transition-colors hover:bg-white/10"
          style={{
            background: 'transparent',
            border: '1px solid rgba(242, 235, 221, 0.15)',
            color: 'var(--white-60)',
          }}
        >
          <RotateCcw size={14} />
          إعادة
        </button>

        <div className="flex items-center gap-2">
          <span className="text-body-sm" style={{ color: 'var(--white-40)' }}>الهدف:</span>
          <input
            type="number"
            value={targetInput}
            onChange={(e) => {
              setTargetInput(e.target.value);
              const n = parseInt(e.target.value);
              if (!isNaN(n) && n > 0) onSetTarget(n);
            }}
            className="w-14 text-center text-body-sm rounded-lg outline-none"
            style={{
              background: 'rgba(242, 235, 221, 0.06)',
              border: '1px solid rgba(242, 235, 221, 0.1)',
              color: 'var(--white)',
              padding: '4px 8px',
            }}
            min={1}
          />
        </div>
      </div>
    </div>
  );
}
