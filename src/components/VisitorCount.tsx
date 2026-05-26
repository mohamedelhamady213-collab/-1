import { useVisitorCount } from '@/hooks/useVisitorCount';

export function VisitorCount() {
  const { count, loading, error } = useVisitorCount();

  return (
    <div
      style={{
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        alignItems: 'center',
        color: 'rgba(242, 235, 221, 0.8)',
        fontSize: '0.95rem',
      }}
    >
      <span style={{ color: 'var(--gold)' }}>زوار الموقع</span>
      <span style={{ fontWeight: 700 }}>
        {loading ? '...' : error ? '—' : count ?? '—'}
      </span>
      {error && <span style={{ color: 'rgba(255, 128, 128, 0.9)' }}>غير متاح الآن</span>}
    </div>
  );
}
