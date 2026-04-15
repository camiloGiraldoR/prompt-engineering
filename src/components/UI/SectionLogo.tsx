export default function SectionLogo() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '1.5rem',
      right: '2rem',
      zIndex: 20,
      pointerEvents: 'none',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '0.4rem 1rem',
        borderRadius: '4px',
        boxShadow: '4px 4px 0px var(--brand-mint)',
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid var(--brand-mint)',
        opacity: 0.85,
      }}>
        <img
          src={`${import.meta.env.BASE_URL}perficient-logo.svg`}
          alt="Perficient"
          style={{ width: 90 }}
        />
      </div>
    </div>
  );
}
