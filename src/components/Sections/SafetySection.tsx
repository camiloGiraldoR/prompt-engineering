import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { FiAlertTriangle } from 'react-icons/fi';
import SectionLogo from '../UI/SectionLogo';

export default function SafetySection() {
  const { t } = useTranslation();
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
    { title: t('safety.a_0_t'), desc: t('safety.a_0_d') },
    { title: t('safety.a_1_t'), desc: t('safety.a_1_d') },
    { title: t('safety.a_2_t'), desc: t('safety.a_2_d') },
    { title: t('safety.a_3_t'), desc: t('safety.a_3_d') }
  ];

  return (
    <section ref={container} className="section-container">
      <div className="section-content">
        <h2 className="text-mask" style={{ fontSize: '5rem', marginBottom: '1rem', lineHeight: 1, textAlign: 'center' }}>{t('safety.title')}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>
          {t('safety.desc_1')}<span style={{ color: 'var(--brand-mint)' }}>Jailbreaking</span>, <span style={{ color: 'var(--brand-mint)' }}>Prompt Leaking</span> y <span style={{ color: 'var(--brand-mint)' }}>Data Poisoning</span>.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', width: '100%' }}>
          {alerts.map((alert, i) => (
            <div key={i} className="alert-card" style={{ background: 'rgba(5, 59, 64, 0.4)', border: '1px solid rgba(113, 216, 197, 0.2)', padding: '1.5rem', borderRadius: '12px' }}>
              <div style={{ color: 'var(--brand-mint)', fontSize: '2rem', marginBottom: '1rem' }}><FiAlertTriangle /></div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#ffffff' }}>{alert.title}</h3>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.5 }}>{alert.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <SectionLogo />
    </section>
  );
}
