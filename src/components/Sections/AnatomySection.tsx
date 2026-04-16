import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { FiMessageSquare, FiTarget, FiTool, FiShield, FiXCircle } from 'react-icons/fi';
import SectionLogo from '../UI/SectionLogo';

gsap.registerPlugin(ScrollTrigger);

export default function AnatomySection() {
  const { t } = useTranslation();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.ana-element', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: container });

  const cards = [
    { icon: <FiTarget />, title: t('anatomy.card_1_title'), desc: t('anatomy.card_1_desc') },
    { icon: <FiMessageSquare />, title: t('anatomy.card_2_title'), desc: t('anatomy.card_2_desc') },
    { icon: <FiTool />, title: t('anatomy.card_3_title'), desc: t('anatomy.card_3_desc') },
    { icon: <FiShield />, title: t('anatomy.card_4_title'), desc: t('anatomy.card_4_desc') },
    { icon: <FiXCircle />, title: t('anatomy.card_5_title'), desc: t('anatomy.card_5_desc') },
  ];

  return (
    <section ref={container} className="section-container">
      <div className="section-content">
        <h2 className="ana-element text-mask" style={{ fontSize: '4.5rem', marginBottom: '3rem', lineHeight: 1, textAlign: 'center' }}>{t('anatomy.title')}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' }}>
          {cards.map((card, i) => (
            <div key={i} className="ana-element glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ color: 'var(--brand-mint)', fontSize: '2rem' }}>{card.icon}</div>
              <h3 style={{ fontSize: '1.4rem' }}>{card.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <SectionLogo />
    </section>
  );
}
