import { useRef } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiZap, FiEdit3, FiActivity } from 'react-icons/fi';
import SectionLogo from '../UI/SectionLogo';

interface TechItem {
  name: string;
  shortDesc: string;
  icon: React.ReactElement;
  color: string;
}

export default function TechniquesSection() {
  const { t } = useTranslation();
  const container = useRef<HTMLDivElement>(null);

  const techniques: TechItem[] = [
    {
      name: t('techniques.t_0_name'),
      shortDesc: t('techniques.t_0_desc'),
      icon: <FiZap />,
      color: '#71d8c5',
    },
    {
      name: t('techniques.t_1_name'),
      shortDesc: t('techniques.t_1_desc'),
      icon: <FiEdit3 />,
      color: '#c7ddef',
    },
    {
      name: t('techniques.t_2_name'),
      shortDesc: t('techniques.t_2_desc'),
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
          {t('techniques.title_1')}<br />
          <span className="text-gradient">{t('techniques.title_2')}</span>
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
