import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiAlertTriangle } from 'react-icons/fi';

export default function SafetySection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.alert-card', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
      scale: 0.8,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'back.out(1.7)',
    });
  }, { scope: container });

  const alerts = [
    { title: 'Toxicity', desc: 'Generación de lenguaje ofensivo o en contra de políticas.' },
    { title: 'Hallucinations', desc: 'Afirmaciones falsas presentadas como hechos absolutos.' },
    { title: 'Prompt Injection', desc: 'Técnica maliciosa para evadir restricciones del sistema.' },
    { title: 'Exposure', desc: 'Riesgo de revelar datos corporativos sensibles o PII.' }
  ];

  return (
    <section ref={container} className="section-container" style={{ minHeight: '70vh', maxWidth: '1000px' }}>
      <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem', alignSelf: 'flex-start' }}>Safety & Governance</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem', alignSelf: 'flex-start' }}>
        Riesgos críticos adicionales que deben mitigarse: <span style={{ color: 'white' }}>Jailbreaking</span>, <span style={{ color: 'white' }}>Prompt Leaking</span> y <span style={{ color: 'white' }}>Data Poisoning</span>.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', width: '100%' }}>
        {alerts.map((alert, i) => (
          <div key={i} className="alert-card" style={{ background: 'rgba(255, 50, 50, 0.1)', border: '1px solid rgba(255, 50, 50, 0.3)', padding: '1.5rem', borderRadius: '12px' }}>
            <div style={{ color: '#ff4444', fontSize: '2rem', marginBottom: '1rem' }}><FiAlertTriangle /></div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#ffb3b3' }}>{alert.title}</h3>
            <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.5 }}>{alert.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
