import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function TechniquesSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Dynamic scrub timeline during pin
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'center center',
        end: '+=1500', // Pin duration
        pin: true,
        scrub: 1.5,
      },
    });

    // Make the cards slide in from the right progressively while pinned
    tl.from('.tech-item', {
      x: 600,
      opacity: 0,
      scale: 0.8,
      stagger: 0.5,
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: container });

  const tech = [
    { name: 'Zero-shot', desc: 'Directo sin ejemplos. Depende del conocimiento interno del LLM.', example: '"Traduce esto al francés."' },
    { name: 'Few-shot', desc: 'Proveer ejemplos previos (single/multi) para guiar el patrón.', example: '"Feliz -> Positivo; Triste -> Negativo; Enojado ->"' },
    { name: 'Chain of Thought (CoT)', desc: 'Forzar al modelo a transparentar su razonamiento paso a paso.', example: '"Piensa paso a paso y luego da la respuesta."' },
  ];

  return (
    <section ref={container} className="section-container tech-panel" style={{ background: '#0a0a1a', borderTop: '1px solid rgba(0,243,255,0.2)', borderBottom: '1px solid rgba(0,243,255,0.2)' }}>
      <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Metodologías y Técnicas</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '800px' }}>
        {tech.map((t, i) => (
          <div key={i} className="tech-item glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--neon-magenta)' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{t.name}</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{t.desc}</p>
            <div style={{ background: 'rgba(0,0,0,0.6)', padding: '1.2rem', borderRadius: '8px', fontFamily: 'monospace', color: '#00f3ff' }}>
              {t.example}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
