import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import SectionLogo from '../UI/SectionLogo';

gsap.registerPlugin(ScrollTrigger);

export default function DefinitionSection() {
  const { t } = useTranslation();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.def-element', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: container });

  return (
    <section ref={container} className="section-container">
      <div className="section-content">
        <h2 className="def-element text-mask" style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1, textAlign: 'center' }}>{t('definition.title')}</h2>
        <p className="def-element" style={{ fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          {t('definition.desc_1')}
        </p>
        <p className="def-element" style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
          {t('definition.desc_2')}
        </p>
      </div>
      <SectionLogo />
    </section>
  );
}
