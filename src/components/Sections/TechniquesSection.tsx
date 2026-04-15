import { useRef } from 'react';
import React from 'react';
import { FiZap, FiEdit3, FiActivity } from 'react-icons/fi';
import SectionLogo from '../UI/SectionLogo';

interface TechItem {
  name: string;
  shortDesc: string;
  icon: React.ReactElement;
  color: string;
}

export default function TechniquesSection() {
  const container = useRef<HTMLDivElement>(null);

  const techniques: TechItem[] = [
    {
      name: 'Zero-shot',
      shortDesc: 'Instrucción directa sin ejemplos previos. Confía en el razonamiento base del modelo.',
      icon: <FiZap />,
      color: '#71d8c5',
    },
    {
      name: 'Few-shot',
      shortDesc: 'Proveer ejemplos para replicar patrones complejos. Ideal para estandarizar tono y formato.',
      icon: <FiEdit3 />,
      color: '#c7ddef',
    },
    {
      name: 'Chain of Thought',
      shortDesc: 'Descompone problemas lógicos en pasos secuenciales. Evita errores de cálculo inmediato.',
      icon: <FiActivity />,
      color: '#3498db',
    }
  ];

  return (
    <section ref={container} className="section-container tech-panel" style={{ justifyContent: 'center' }}>
      <div className="section-content">
        <h2 className="ana-element text-mask" style={{ 
          fontSize: '2.8rem', 
          marginBottom: '2.5rem', 
          lineHeight: 1.1,
          textAlign: 'center'
        }}>
          Ingeniería de Prompts:<br />
          <span className="text-gradient">Estrategias de Interacción</span>
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem', 
          width: '100%',
          alignItems: 'stretch'
        }}>
          {techniques.map((t, i) => (
            <div 
              key={i} 
              className="ana-element glass-panel" 
              style={{ 
                padding: '2rem', 
                borderLeft: `3px solid ${t.color}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                minHeight: '220px'
              }}
            >
              <div style={{ fontSize: '2.5rem', color: t.color, display: 'flex', alignItems: 'center' }}>{t.icon}</div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--brand-mint)', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.name}</h3>
              <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: 1.6 }}>{t.shortDesc}</p>
            </div>
          ))}
        </div>
      </div>
      <SectionLogo />
    </section>
  );
}
