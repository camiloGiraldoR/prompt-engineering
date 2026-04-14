import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
        <h2 className="conf-element text-mask" style={{ fontSize: '4.5rem', marginBottom: '3rem', lineHeight: 1 }}>Configuración del Modelo</h2>
        
        <div className="conf-element glass-panel" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <label style={{ fontSize: '1.4rem', color: 'var(--brand-mint)', fontWeight: 700 }}>Temperature: {temperature}</label>
              <span style={{ color: 'var(--text-muted)' }}>{temperature > 0.8 ? 'Creativo / Aleatorio' : 'Preciso / Determinista'}</span>
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}>
              <h4 style={{ color: 'var(--brand-sky)', marginBottom: '0.5rem' }}>Max Tokens</h4>
              <p style={{ color: 'var(--text-muted)' }}>Longitud máxima de la respuesta generada.</p>
            </div>
            <div style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}>
              <h4 style={{ color: 'var(--brand-sky)', marginBottom: '0.5rem' }}>Top P</h4>
              <p style={{ color: 'var(--text-muted)' }}>Muestreo de núcleo (Nucleus sampling).</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
