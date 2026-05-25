import { useState } from 'react';
import { X, Save, Edit3, Trash2, Heart } from 'lucide-react';
import { useDuaJournal } from '@/hooks/useDuaJournal';

interface DuaJournalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DuaJournal({ isOpen, onClose }: DuaJournalProps) {
  const { duas, addDua, updateDua, deleteDua } = useDuaJournal();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editText, setEditText] = useState('');

  const handleSave = () => {
    if (!text.trim()) return;
    addDua(name, text);
    setName('');
    setText('');
  };

  const handleUpdate = (id: string) => {
    if (!editText.trim()) return;
    updateDua(id, editName, editText);
    setEditingId(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[55]"
        style={{
          background: 'rgba(0,0,0,0.4)',
          animation: 'fade-in 300ms ease forwards',
        }}
        onClick={onClose}
      />

      {/* Panel - Desktop: slide from right, Mobile: slide from bottom */}
      <div
        className="fixed z-[60] overflow-y-auto"
        style={{
          top: 0,
          right: 0,
          height: '100vh',
          width: '400px',
          maxWidth: '90vw',
          background: 'rgba(10, 15, 30, 0.95)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(242, 235, 221, 0.08)',
          padding: 'var(--space-xl)',
          animation: 'slide-from-right 400ms var(--ease-gentle) both',
        }}
      >
        {/* Mobile: full width slide from bottom */}
        <style>{`
          @media (max-width: 768px) {
            div[style*="z-index: 60"] {
              top: auto !important;
              right: 0 !important;
              left: 0 !important;
              bottom: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              height: 85vh !important;
              border-radius: 20px 20px 0 0 !important;
              border-left: none !important;
              animation: slide-up 400ms var(--ease-gentle) both !important;
            }
          }
          @keyframes slide-from-right {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-title-lg" style={{ color: 'var(--sand)' }}>
            دفتر الأدعية
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
          >
            <X size={20} style={{ color: 'var(--white-60)' }} />
          </button>
        </div>

        {/* Add new dua */}
        <div className="mb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسم الشخص أو 'لنفسي'"
            className="w-full text-body-md rounded-xl outline-none transition-colors focus:border-[var(--gold)]/30"
            style={{
              background: 'rgba(242, 235, 221, 0.05)',
              border: '1px solid rgba(242, 235, 221, 0.1)',
              color: 'var(--white)',
              padding: '12px 16px',
            }}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="اكتب دعاءك هنا..."
            className="w-full mt-2 text-body-md rounded-xl outline-none resize-y transition-colors focus:border-[var(--gold)]/30"
            style={{
              background: 'rgba(242, 235, 221, 0.05)',
              border: '1px solid rgba(242, 235, 221, 0.1)',
              color: 'var(--white)',
              padding: '12px 16px',
              minHeight: '100px',
            }}
          />
          <button
            onClick={handleSave}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-full transition-all duration-200 hover:opacity-90"
            style={{
              background: 'var(--gold)',
              color: 'var(--midnight)',
              fontWeight: 600,
            }}
          >
            <Save size={16} />
            <span className="text-body-md">حفظ</span>
          </button>
        </div>

        {/* Saved duas list */}
        <div>
          <span className="text-label block mb-4" style={{ color: 'var(--white-40)' }}>
            أدعيتك المحفوظة
          </span>

          {duas.length === 0 ? (
            <div className="flex flex-col items-center py-12">
              <Heart size={32} style={{ color: 'rgba(255,255,255,0.15)' }} />
              <p className="text-body-sm mt-4" style={{ color: 'var(--white-40)' }}>
                ابدأ بكتابة أول دعاء
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {duas.map((dua) => (
                <div
                  key={dua.id}
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(242, 235, 221, 0.04)',
                    border: '1px solid rgba(242, 235, 221, 0.06)',
                  }}
                >
                  {editingId === dua.id ? (
                    <div>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full text-body-sm rounded-lg outline-none mb-2"
                        style={{
                          background: 'rgba(242, 235, 221, 0.05)',
                          border: '1px solid rgba(242, 235, 221, 0.1)',
                          color: 'var(--gold)',
                          fontWeight: 600,
                          padding: '6px 10px',
                        }}
                      />
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full text-body-md rounded-lg outline-none resize-y mb-2"
                        style={{
                          background: 'rgba(242, 235, 221, 0.05)',
                          border: '1px solid rgba(242, 235, 221, 0.1)',
                          color: 'var(--white-80)',
                          padding: '6px 10px',
                          minHeight: '60px',
                        }}
                      />
                      <button
                        onClick={() => handleUpdate(dua.id)}
                        className="text-body-sm px-4 py-1.5 rounded-full"
                        style={{ background: 'var(--gold)', color: 'var(--midnight)' }}
                      >
                        حفظ التعديل
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-body-sm mb-1" style={{ color: 'var(--gold)', fontWeight: 600 }}>
                        لـ {dua.name}
                      </p>
                      <p className="text-body-md mb-2" style={{ color: 'var(--white-80)' }}>
                        {dua.text}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-body-sm" style={{ color: 'var(--white-40)' }}>
                          {new Date(dua.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingId(dua.id);
                              setEditName(dua.name);
                              setEditText(dua.text);
                            }}
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                          >
                            <Edit3 size={14} style={{ color: 'var(--white-40)' }} />
                          </button>
                          <button
                            onClick={() => deleteDua(dua.id)}
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                          >
                            <Trash2 size={14} style={{ color: 'var(--white-40)' }} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
