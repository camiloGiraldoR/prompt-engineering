import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import SectionLogo from '../UI/SectionLogo';

interface ConfigDashboardSectionProps {
  temperature: number;
  onTemperatureChange: (val: number) => void;
}

export default function ConfigDashboardSection({ temperature, onTemperatureChange }: ConfigDashboardSectionProps) {
  const { t } = useTranslation();
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
        <h2 className="conf-element text-mask" style={{ fontSize: '4rem', marginBottom: '3rem', lineHeight: 1, textAlign: 'center' }}>{t('config.title')}</h2>
        
        <div className="conf-element glass-panel" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <label style={{ fontSize: '1.4rem', color: 'var(--brand-mint)', fontWeight: 700 }}>{t('config.label')}{temperature}</label>
              <span style={{ color: 'var(--text-muted)' }}>{temperature > 0.8 ? t('config.desc_creative') : t('config.desc_strict')}</span>
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
              {t('config.hint_1')}<strong>{t('config.hint_bold_1')}</strong>{t('config.hint_2')}<strong>{t('config.hint_bold_2')}</strong>{t('config.hint_3')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}>
              <h4 style={{ color: 'var(--brand-sky)', marginBottom: '0.5rem' }}>{t('config.box_1_title')}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('config.box_1_desc')}</p>
            </div>
            <div style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}>
              <h4 style={{ color: 'var(--brand-sky)', marginBottom: '0.5rem' }}>{t('config.box_2_title')}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('config.box_2_desc')}</p>
            </div>
          </div>
        </div>
      </div>
      <SectionLogo />
    </section>
  );
}
