export function Footer() {
  return (
    <footer
      className="w-full text-center"
      style={{
        background: 'var(--olive-deep)',
        padding: 'var(--space-2xl) var(--content-padding)',
      }}
    >
      <p className="text-body-sm" style={{ color: 'rgba(242, 235, 221, 0.4)' }}>
        صُمم بكل حب — يوم عرفة 1447هـ
      </p>
      <p
        className="text-body-sm mt-2"
        style={{ color: 'var(--gold)' }}
      >
        اللهم تقبل منا صالح الأعمال
      </p>
      <div
        className="mx-auto mt-4"
        style={{
          width: '40px',
          height: '1px',
          background: 'rgba(200, 164, 92, 0.3)',
        }}
      />
    </footer>
  );
}
