import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ConfigDashboardProps {
  temperature: number;
  onTemperatureChange: (val: number) => void;
}

export default function ConfigDashboardSection({ temperature, onTemperatureChange }: ConfigDashboardProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.dash-element', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%',
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, { scope: container });

  return (
    <section ref={container} className="section-container" style={{ minHeight: '80vh', maxWidth: '1000px' }}>
      <h2 className="dash-element text-mask" style={{ fontSize: '3rem', marginBottom: '2rem', alignSelf: 'flex-start' }}>Configuration Dashboard</h2>
      
      <div className="dash-element glass-panel" style={{ width: '100%', padding: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Parámetros de Inferencia</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <span>Temperature (Creatividad)</span>
              <span style={{ color: 'var(--brand-mint)', fontWeight: 'bold' }}>{temperature}</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="2" 
              step="0.1" 
              value={temperature} 
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                // @ts-ignore
                if (document.startViewTransition) {
                   // @ts-ignore
                   document.startViewTransition(() => onTemperatureChange(val));
                } else {
                   onTemperatureChange(val);
                }
              }} 
              style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--brand-mint)' }} 
            />
          </div>

          <div style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <p><strong style={{ color: 'white' }}>Top P / K:</strong> Limita las opciones probabilísticas de palabras.</p>
            <p><strong style={{ color: 'white' }}>Max Length:</strong> Controla la longitud máxima de salida.</p>
            <p><strong style={{ color: 'white' }}>System Prompt:</strong> Define la personalidad y directrices globales.</p>
          </div>
        </div>

        <div style={{ flex: '1 1 300px', background: 'rgba(5, 59, 64, 0.4)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(113, 216, 197, 0.2)' }}>
          <h3 style={{ color: 'var(--brand-mint)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem' }}>
            ⚡ Latency Info
          </h3>
          <p style={{ color: 'var(--text-main)', lineHeight: 1.6 }}>
            El tiempo de respuesta (latencia) está determinado directamente por el <strong>tamaño del modelo</strong> y la cantidad de <strong>tokens generados</strong>.
          </p>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(113, 216, 197, 0.05)', borderLeft: '4px solid var(--brand-mint)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>Nota Clave: Modificar la "Temperature" no afecta la velocidad de inferencia.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
