import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.hero-element', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: container });

  return (
    <section id="hero-section" ref={container} className="section-container">
      <div className="section-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="hero-element" style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          padding: '1rem 2rem', 
          borderRadius: '50px', 
          marginBottom: '2.5rem', 
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(113, 216, 197, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--brand-mint)'
        }}>
          <img src={`${import.meta.env.BASE_URL}perficient-logo.svg`} alt="Perficient" style={{ width: 180 }} />
        </div>
        
        <h1 className="hero-element text-mask" style={{ 
          fontSize: '4.5rem', 
          textAlign: 'center', 
          marginBottom: '1.5rem', 
          lineHeight: 1.1, 
          textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          maxWidth: '900px',
          letterSpacing: '-2px'
        }}>
          Prompt Engineering:<br />
          <span className="text-gradient">El Arte de Conversar con la IA</span>
        </h1>
        
        <p className="hero-element" style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-main)', 
          textAlign: 'center', 
          maxWidth: '650px', 
          background: 'rgba(0,0,0,0.4)', 
          padding: '1rem 1.5rem', 
          borderRadius: '12px', 
          backdropFilter: 'blur(5px)',
          lineHeight: 1.6,
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          Maximizando la productividad profesional mediante la interacción estructurada y estratégica con Modelos de Lenguaje Grande.
        </p>
      </div>
    </section>
  );
}
