import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AudienceSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.aud-element', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: container });

  return (
    <section ref={container} className="section-container">
      <div className="section-content">
        <h2 className="aud-element text-mask" style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1, textAlign: 'center' }}>
          ¿A quién va dirigida esta charla?
        </h2>
        <div className="aud-element" style={{ 
          background: 'rgba(113, 216, 197, 0.1)', 
          padding: '2rem', 
          borderRadius: '4px',
          border: '1px solid rgba(113, 216, 197, 0.2)',
          marginBottom: '2rem'
        }}>
          <p style={{ fontSize: '1.8rem', color: 'var(--brand-mint)', fontWeight: 800, marginBottom: '1rem' }}>
            A todas las áreas de la empresa.
          </p>
          <p style={{ fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
            En la actualidad, el Prompt Engineering y el Machine Learning han dejado de ser herramientas exclusivas de departamentos técnicos. 
            Hoy en día, la IA es horizontal.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div className="aud-element" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3 style={{ color: 'var(--brand-sky)', marginBottom: '0.5rem' }}>Colaboración Continua</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Desde People hasta Finance, optimizamos flujos de trabajo en nuestro día a día.</p>
          </div>
          <div className="aud-element" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3 style={{ color: 'var(--brand-sky)', marginBottom: '0.5rem' }}>Democratización de la IA</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Cualquier persona con una idea puede potenciarla mediante un buen diseño de prompt.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
