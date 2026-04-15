import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SectionLogo from '../UI/SectionLogo';

interface ConfigDashboardSectionProps {
  temperature: number;
  onTemperatureChange: (val: number) => void;
}

export default function ConfigDashboardSection({ temperature, onTemperatureChange }: ConfigDashboardSectionProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.conf-element', {
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
        <h2 className="conf-element text-mask" style={{ fontSize: '4rem', marginBottom: '3rem', lineHeight: 1, textAlign: 'center' }}>Configuración y Optimización</h2>
        
        <div className="conf-element glass-panel" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <label style={{ fontSize: '1.4rem', color: 'var(--brand-mint)', fontWeight: 700 }}>Nivel de Creatividad vs. Rigor: {temperature}</label>
              <span style={{ color: 'var(--text-muted)' }}>{temperature > 0.8 ? '💡 Creativo / Original' : '⚖️ Preciso / Técnico'}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="2" 
              step="0.1" 
              value={temperature} 
              onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
              style={{ width: '100%', height: '10px', accentColor: 'var(--brand-mint)', cursor: 'pointer' }}
            />
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              Piénsalo así: Un <strong>Contador</strong> necesita temperatura baja (0.1) para ser exacto; un <strong>Escritor</strong> necesita temperatura alta (0.9) para ser original.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}>
              <h4 style={{ color: 'var(--brand-sky)', marginBottom: '0.5rem' }}>Control de Longitud (Tokens)</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Limita el tamaño de la respuesta. A más tokens, mayor es el costo y el tiempo de espera.</p>
            </div>
            <div style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}>
              <h4 style={{ color: 'var(--brand-sky)', marginBottom: '0.5rem' }}>Eficiencia Económica</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Un prompt conciso reduce el uso de tokens, ahorrando dinero en cada interacción.</p>
            </div>
          </div>
        </div>
      </div>
      <SectionLogo />
    </section>
  );
}
