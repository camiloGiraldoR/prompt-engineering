import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FiMessageCircle } from 'react-icons/fi';
import SectionLogo from '../UI/SectionLogo';

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
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: container });

  return (
    <section ref={container} className="section-container" style={{ textAlign: 'center' }}>
      <div className="section-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

        {/* Perficient Logo */}
        <div className="ty-element" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '0.6rem 1.4rem',
          borderRadius: '4px',
          boxShadow: '6px 6px 0px var(--brand-mint)',
          display: 'inline-flex',
          alignItems: 'center',
          border: '1px solid var(--brand-mint)'
        }}>
          <img src={`${import.meta.env.BASE_URL}perficient-logo.svg`} alt="Perficient" style={{ width: 140 }} />
        </div>

        {/* Gracias */}
        <div className="ty-element">
          <h1 className="text-gradient" style={{
            fontSize: '6rem',
            lineHeight: 1,
            letterSpacing: '-4px',
            fontWeight: 900,
            filter: 'drop-shadow(0 0 30px rgba(113, 216, 197, 0.5))'
          }}>
            Gracias
          </h1>
        </div>

        {/* Q&A Call to Action */}
        <div className="ty-element" style={{
          background: 'rgba(113, 216, 197, 0.08)',
          border: '1px solid rgba(113, 216, 197, 0.35)',
          borderRadius: '16px',
          padding: '1.5rem 2.5rem',
          maxWidth: '650px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          textAlign: 'left',
          boxShadow: '0 0 30px rgba(113, 216, 197, 0.1)'
        }}>
          <div style={{ color: 'var(--brand-mint)', fontSize: '2.5rem', flexShrink: 0 }}>
            <FiMessageCircle />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              ¿Tienes alguna pregunta?
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Es el momento perfecto para aclarar dudas, explorar casos de uso o profundizar en cualquier tema de la presentación.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="ty-element" style={{
          width: '80px',
          height: '2px',
          background: 'linear-gradient(to right, transparent, var(--brand-mint), transparent)'
        }} />

        {/* Motivational phrase */}
        <blockquote className="ty-element" style={{
          borderLeft: '3px solid var(--brand-mint)',
          paddingLeft: '1.5rem',
          textAlign: 'left',
          maxWidth: '560px',
          margin: 0
        }}>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-main)',
            lineHeight: 1.6,
            fontStyle: 'italic',
            fontWeight: 300
          }}>
            "La inteligencia artificial no reemplaza al ser humano,{' '}
            <strong style={{ color: 'var(--brand-mint)', fontStyle: 'normal' }}>amplifica su potencial.</strong>"
          </p>
        </blockquote>

        {/* Presenter credit */}
        <div className="ty-element" style={{
          padding: '0.8rem 2rem',
          background: 'rgba(113, 216, 197, 0.05)',
          border: '1px solid rgba(113, 216, 197, 0.15)',
          borderRadius: '8px',
        }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--brand-mint)', fontFamily: 'monospace', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Camilo A. Giraldo Ramirez &mdash; Senior Technical Consultant
          </p>
        </div>

      </div>
      <SectionLogo />
    </section>
  );
}
