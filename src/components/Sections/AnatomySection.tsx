import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiCommand, FiAlignLeft, FiDatabase, FiTarget, FiXCircle } from 'react-icons/fi';

export default function AnatomySection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.anatomy-card', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%',
      },
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, { scope: container });

  const cards = [
    { title: 'Instruction', icon: <FiCommand />, desc: 'La acción específica que el modelo debe realizar (Traduce, resume, crea).' },
    { title: 'Context', icon: <FiAlignLeft />, desc: 'Información de fondo para guiar la respuesta correcta y establecer el tono esperado.' },
    { title: 'Input Data', icon: <FiDatabase />, desc: 'Los datos brutos o texto que el modelo va a procesar en esta petición.' },
    { title: 'Output Indicators', icon: <FiTarget />, desc: 'Formato esperado (ej. "JSON", "lista", "tono profesional").' },
    { title: 'Negative Prompting', icon: <FiXCircle />, desc: 'Expresar qué no hacer; reduce interacciones al eliminar aspectos indeseados (Ej. "no uses jerga técnica").' },
  ];

  return (
    <section ref={container} className="section-container" style={{ minHeight: '80vh', maxWidth: '1000px' }}>
      <h2 className="text-mask" style={{ fontSize: '4rem', marginBottom: '3rem', alignSelf: 'flex-start' }}>Anatomía de un Prompt Perfecto</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
        {cards.map((card, i) => (
          <div key={i} className="anatomy-card glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ color: 'var(--neon-cyan)', fontSize: '2rem' }}>{card.icon}</div>
            <h3 style={{ fontSize: '1.4rem' }}>{card.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
