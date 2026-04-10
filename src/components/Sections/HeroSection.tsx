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
    <section ref={container} className="section-container" style={{ minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={`${import.meta.env.BASE_URL}perficient-logo.svg`} alt="Perficient" className="hero-element" style={{ width: 280, marginBottom: '3rem' }} />
        <h1 className="hero-element text-gradient" style={{ fontSize: '4.5rem', textAlign: 'center', marginBottom: '1rem', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          Prompt Engineering:<br />
          El Arte de Conversar con la IA
        </h1>
        <p className="hero-element" style={{ fontSize: '1.4rem', color: 'var(--text-main)', textAlign: 'center', maxWidth: '700px', background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>
          Maximizando la productividad profesional mediante la interacción estructurada y estratégica con Modelos de Lenguaje Grande.
        </p>
      </div>
    </section>
  );
}
