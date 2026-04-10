import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiCheckSquare } from 'react-icons/fi';

export default function BestPracticesSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.bp-item', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
      x: -50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, { scope: container });

  const practices = [
    'Sé claro y sumamente específico.',
    'Provee el contexto necesario siempre.',
    'Evita las preguntas demasiado abiertas.',
    'Especifica el formato y longitud esperados de la respuesta.'
  ];

  return (
    <section ref={container} className="section-container" style={{ minHeight: '80vh', maxWidth: '800px', display: 'flex', alignItems: 'center' }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%' }}>
        <h2 className="text-mask" style={{ fontSize: '4rem', marginBottom: '2rem', lineHeight: 1 }}>Mejores Prácticas</h2>
        <ul style={{ listStyle: 'none' }}>
          {practices.map((practice, i) => (
            <li key={i} className="bp-item" style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <FiCheckSquare style={{ color: 'var(--neon-blue)', fontSize: '2rem', flexShrink: 0 }} />
              <span style={{ lineHeight: 1.4 }}>{practice}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
