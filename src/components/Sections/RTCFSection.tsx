import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FiUser, FiCheckSquare, FiInfo, FiLayout, FiArrowRight } from 'react-icons/fi';
import SectionLogo from '../UI/SectionLogo';

gsap.registerPlugin(ScrollTrigger);

export default function RTCFSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.rtcf-left-item', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
      x: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });

    gsap.from('.rtcf-right-panel', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
      x: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, { scope: container });

  const framework = [
    { icon: <FiUser />, letter: 'R', title: 'Rol', desc: 'Define la identidad de la IA (ej. Experto en Marketing).' },
    { icon: <FiCheckSquare />, letter: 'T', title: 'Tarea', desc: 'La acción principal (ej. Escribe un correo).' },
    { icon: <FiInfo />, letter: 'C', title: 'Contexto', desc: 'Antecedentes y restricciones (ej. Audiencia B2B).' },
    { icon: <FiLayout />, letter: 'F', title: 'Formato', desc: 'Cómo quieres la respuesta (ej. En viñetas).' },
  ];

  return (
    <section ref={container} className="section-container">
      <div className="section-content" style={{ maxWidth: '1100px' }}>
        <h2 className="rtcf-left-item text-mask" style={{ fontSize: '3.5rem', marginBottom: '2.5rem', textAlign: 'center', lineHeight: 1 }}>Marco RTCF</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '2.5rem', 
          width: '100%',
          alignItems: 'center'
        }}>
          {/* Left Panel: Acronyms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {framework.map((item, i) => (
              <div key={i} className="rtcf-left-item glass-panel" style={{ 
                padding: '1.2rem 1.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem',
                borderLeft: '4px solid var(--brand-mint)'
              }}>
                <div style={{ color: 'var(--brand-mint)', fontSize: '1.8rem', display: 'flex', alignItems: 'center' }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    <span style={{ color: 'var(--brand-mint)', fontSize: '1.4rem', marginRight: '0.5rem' }}>{item.letter}</span>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel: Example */}
          <div className="rtcf-right-panel glass-panel" style={{ 
            padding: '2.5rem', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'rgba(5, 59, 64, 0.85)', 
            border: '1px solid rgba(113, 216, 197, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(0,0,0,0.5)'
          }}>
             <div style={{ 
               position: 'absolute', 
               top: 0, 
               right: 0, 
               padding: '0.5rem 1rem', 
               background: 'var(--brand-mint)', 
               color: '#000', 
               fontSize: '0.7rem', 
               fontWeight: 800,
               textTransform: 'uppercase'
             }}>
               Ejemplo Vivo
             </div>
             
             <h4 style={{ color: 'var(--brand-mint)', marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <FiArrowRight /> Aplicando la Fórmula:
             </h4>
             
             <div style={{ fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.8, background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', borderLeft: '2px solid var(--brand-sky)' }}>
                "Actúa como <span style={{ color: 'var(--brand-mint)', fontWeight: 700 }}>[Rol: Nutricionista]</span>. 
                Crea <span style={{ color: 'var(--brand-mint)', fontWeight: 700 }}>[Tarea: un plan de comidas]</span> 
                para <span style={{ color: 'var(--brand-mint)', fontWeight: 700 }}>[Contexto: un maratonista]</span>. 
                Presenta los datos <span style={{ color: 'var(--brand-mint)', fontWeight: 700 }}>[Formato: en una tabla]</span>."
             </div>

             <div style={{ marginTop: '1.5rem', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
               💡 <strong>Pro Tip:</strong> El contexto es la diferencia entre una respuesta genérica y una solución profesional.
             </div>
          </div>
        </div>
      </div>
      <SectionLogo />
    </section>
  );
}
