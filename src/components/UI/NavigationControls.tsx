import { useState, useEffect } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Lenis from '@studio-freight/lenis';

interface NavigationControlsProps {
  lenis: React.RefObject<Lenis | null>;
}

const sections = [
  'welcome',
  'audience',
  'hero',
  'definition',
  'anatomy',
  'rtcf-section',
  'config',
  'safety-section',
  'best-practices',
  'thanks'
];

export default function NavigationControls({ lenis }: NavigationControlsProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      let foundIndex = 0;
      sections.forEach((id, index) => {
        const element = document.getElementById(id);
        if (element && scrollPosition >= element.offsetTop) {
          foundIndex = index;
        }
      });
      setCurrentSectionIndex(foundIndex);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    if (index < 0 || index >= sections.length) return;
    const id = sections[index];
    if (lenis.current) {
      lenis.current.scrollTo(`#${id}`, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 1000,
    }}>
      <button
        onClick={() => scrollToSection(currentSectionIndex - 1)}
        disabled={currentSectionIndex === 0}
        title="Sección Anterior"
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: 'rgba(7, 80, 86, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '2px solid var(--brand-mint)',
          color: 'var(--brand-mint)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: currentSectionIndex === 0 ? 'not-allowed' : 'pointer',
          opacity: currentSectionIndex === 0 ? 0.2 : 1,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 20px rgba(113, 216, 197, 0.2)',
          padding: 0,
        }}
        onMouseEnter={(e) => {
          if (currentSectionIndex !== 0) {
            e.currentTarget.style.background = 'var(--brand-mint)';
            e.currentTarget.style.color = '#075056';
            e.currentTarget.style.boxShadow = '0 0 35px var(--brand-mint)';
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentSectionIndex !== 0) {
            e.currentTarget.style.background = 'rgba(7, 80, 86, 0.6)';
            e.currentTarget.style.color = 'var(--brand-mint)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(113, 216, 197, 0.2)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }
        }}
      >
        <FiChevronUp size={28} />
      </button>

      <button
        onClick={() => scrollToSection(currentSectionIndex + 1)}
        disabled={currentSectionIndex === sections.length - 1}
        title="Siguiente Sección"
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: 'rgba(7, 80, 86, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '2px solid var(--brand-mint)',
          color: 'var(--brand-mint)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: currentSectionIndex === sections.length - 1 ? 'not-allowed' : 'pointer',
          opacity: currentSectionIndex === sections.length - 1 ? 0.2 : 1,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 20px rgba(113, 216, 197, 0.2)',
          padding: 0,
        }}
        onMouseEnter={(e) => {
          if (currentSectionIndex !== sections.length - 1) {
            e.currentTarget.style.background = 'var(--brand-mint)';
            e.currentTarget.style.color = '#075056';
            e.currentTarget.style.boxShadow = '0 0 35px var(--brand-mint)';
            e.currentTarget.style.transform = 'translateY(5px) scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentSectionIndex !== sections.length - 1) {
            e.currentTarget.style.background = 'rgba(7, 80, 86, 0.6)';
            e.currentTarget.style.color = 'var(--brand-mint)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(113, 216, 197, 0.2)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }
        }}
      >
        <FiChevronDown size={28} />
      </button>
    </div>
  );
}
