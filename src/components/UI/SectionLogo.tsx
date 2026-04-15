export default function SectionLogo() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '1.5rem',
      right: '2rem',
      opacity: 0.2,
      pointerEvents: 'none',
      zIndex: 5,
      transition: 'opacity 0.3s ease',
    }}
    onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
    onMouseLeave={e => (e.currentTarget.style.opacity = '0.2')}
    >
      <img
        src={`${import.meta.env.BASE_URL}perficient-logo.svg`}
        alt="Perficient"
        style={{ width: 100 }}
      />
    </div>
  );
}
