import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, { scope: container });

  const practices = [
    'Sé claro y directo con las instrucciones.',
    'Proporciona contexto relevante y suficiente.',
    'Utiliza delimitadores para separar secciones.',
    'Especifica el formato de salida deseado.',
    'Itera y refina tus prompts constantemente.'
  ];

  return (
    <section ref={container} className="section-container" style={{ background: 'rgba(5, 59, 64, 0.7)' }}>
      <div className="section-content">
        <h2 className="text-mask" style={{ fontSize: '5.5rem', marginBottom: '3rem', lineHeight: 1, textAlign: 'center' }}>Best Practices</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {practices.map((p, i) => (
            <div key={i} className="bp-item" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.03)',
              borderLeft: '4px solid var(--brand-mint)',
              fontSize: '1.4rem'
            }}>
              <span style={{ color: 'var(--brand-mint)', fontWeight: 900, fontSize: '1.8rem' }}>0{i + 1}</span>
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
