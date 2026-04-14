import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThankYouSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.ty-element', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      ease: 'power3.out',
    });
  }, { scope: container });

  return (
    <section ref={container} className="section-container" style={{ textAlign: 'center' }}>
      <div className="section-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>

        {/* Perficient Logo */}
        <div className="ty-element" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '0.8rem 1.6rem',
          borderRadius: '4px',
          boxShadow: '8px 8px 0px var(--brand-mint)',
          display: 'inline-flex',
          alignItems: 'center',
          border: '1px solid var(--brand-mint)'
        }}>
          <img src={`${import.meta.env.BASE_URL}perficient-logo.svg`} alt="Perficient" style={{ width: 160 }} />
        </div>

        {/* Gracias */}
        <div className="ty-element">
          <h1 className="text-gradient" style={{
            fontSize: '7rem',
            lineHeight: 1,
            letterSpacing: '-4px',
            fontWeight: 900,
            filter: 'drop-shadow(0 0 30px rgba(113, 216, 197, 0.5))'
          }}>
            Gracias
          </h1>
        </div>

        {/* Divider */}
        <div className="ty-element" style={{
          width: '80px',
          height: '3px',
          background: 'linear-gradient(to right, transparent, var(--brand-mint), transparent)'
        }} />

        {/* Motivational phrase */}
        <div className="ty-element" style={{
          borderLeft: '4px solid var(--brand-mint)',
          paddingLeft: '2rem',
          textAlign: 'left',
          maxWidth: '600px'
        }}>
          <p style={{
            fontSize: '1.5rem',
            color: 'var(--text-main)',
            lineHeight: 1.6,
            fontStyle: 'italic',
            fontWeight: 300
          }}>
            "La inteligencia artificial no reemplaza al ser humano,<br />
            <strong style={{ color: 'var(--brand-mint)', fontStyle: 'normal' }}>amplifica su potencial.</strong>"
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '1.5rem', lineHeight: 1.7 }}>
            El aprendizaje continuo en IA es la ventaja competitiva del siglo XXI.<br />
            Sigamos explorando, cuestionando y construyendo juntos.
          </p>
        </div>

        {/* Presenter credit */}
        <div className="ty-element" style={{
          padding: '1rem 2rem',
          background: 'rgba(113, 216, 197, 0.05)',
          border: '1px solid rgba(113, 216, 197, 0.15)',
          borderRadius: '8px',
        }}>
          <p style={{ fontSize: '1rem', color: 'var(--brand-mint)', fontFamily: 'monospace', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Camilo A. Giraldo Ramirez &mdash; Senior Technical Consultant
          </p>
        </div>

      </div>
    </section>
  );
}
