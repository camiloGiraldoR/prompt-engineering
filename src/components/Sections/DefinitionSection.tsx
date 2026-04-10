import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DefinitionSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.def-element', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: container });

  return (
    <section ref={container} className="section-container glass-panel" style={{ margin: '4rem auto', padding: '4rem', maxWidth: '800px' }}>
      <h2 className="def-element text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>¿Qué es Prompt Engineering?</h2>
      <p className="def-element" style={{ fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
        No es solo "escribir texto". Es la disciplina de comprender y optimizar los límites y capacidades de los Modelos de Lenguaje Grande (LLMs).
      </p>
      <p className="def-element" style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
        Al dominar esta técnica, transformamos resultados genéricos y superficiales en respuestas precisas, profundas y perfectamente alineadas con los objetivos empresariales.
      </p>
    </section>
  );
}
