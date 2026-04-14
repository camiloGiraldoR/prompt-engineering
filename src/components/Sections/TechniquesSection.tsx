import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TechniquesSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.tech-item', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, { scope: container });

  const tech = [
    { name: 'Zero-shot', desc: 'Directo sin ejemplos. Depende del conocimiento interno del LLM.', example: '"Traduce esto al francés."' },
    { name: 'Few-shot', desc: 'Proveer ejemplos previos (single/multi) para guiar el patrón.', example: '"Feliz -> Positivo; Triste -> Negativo; Enojado ->"' },
    { name: 'Chain of Thought (CoT)', desc: 'Forzar al modelo a transparentar su razonamiento paso a paso.', example: '"Piensa paso a paso y luego da la respuesta."' },
  ];

  return (
    <section ref={container} className="section-container tech-panel">
      <div className="section-content">
        <h2 className="text-mask" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1 }}>Metodologías y Técnicas</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}>
          {tech.map((t, i) => (
            <div key={i} className="tech-item glass-panel" style={{ padding: '1.2rem 1.8rem', borderLeft: '4px solid var(--brand-mint)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{t.name}</h3>
              <p style={{ fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--text-main)', lineHeight: 1.4 }}>{t.desc}</p>
              <div style={{ background: 'rgba(0,0,0,0.6)', padding: '0.8rem 1.2rem', borderRadius: '8px', fontFamily: 'monospace', color: 'var(--brand-mint)', fontSize: '0.9rem' }}>
                {t.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
