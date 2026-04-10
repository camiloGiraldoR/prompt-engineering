import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiVolumeX, FiVolume2, FiTerminal } from 'react-icons/fi';
import bgMusic from '../../assets/LP-InTheEnd-cover.mp3';

export default function WelcomeSection() {
  const container = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }

    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log('Autoplay blocked:', e));
      }
      window.removeEventListener('click', handleFirstInteraction, true);
      window.removeEventListener('scroll', handleFirstInteraction, true);
    };

    window.addEventListener('click', handleFirstInteraction, true);
    window.addEventListener('scroll', handleFirstInteraction, true);
    return () => {
      window.removeEventListener('click', handleFirstInteraction, true);
      window.removeEventListener('scroll', handleFirstInteraction, true);
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Aligned to 0 by default to avoid stuck offsets
    tl.from('.cyber-element', {
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out'
    });

    // Blinking cursor
    gsap.to('.cyber-cursor', {
      opacity: 0,
      repeat: -1,
      duration: 0.5,
      ease: 'steps(1)'
    });

    // ScrollTrigger to pause/play music
    if (audioRef.current) {
      gsap.to({}, {
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          onLeave: () => {
            if (audioRef.current && !audioRef.current.paused) {
              audioRef.current.pause();
              setIsPlaying(false);
            }
          },
          onEnterBack: () => {
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.log('Scroll resume blocked:', e));
            }
          }
        }
      });
    }
  }, { scope: container });

  const handleStart = () => {
    const target = document.querySelector('#hero-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={container} className="section-container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'flex-start', // Left Aligned
      padding: '0 10%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <audio ref={audioRef} src={bgMusic} loop />

      {/* Music Toggle */}
      <div 
        onClick={toggleMusic}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '1rem',
          borderRadius: '50%',
          cursor: 'pointer',
          color: 'var(--brand-mint)',
          border: '1px solid rgba(113, 216, 197, 0.3)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}
      >
        {isPlaying ? <FiVolume2 size={24} /> : <FiVolumeX size={24} />}
      </div>

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
        
        {/* Logo Podium - Left Aligned */}
        <div className="cyber-element" style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          padding: '1rem 2rem', 
          borderRadius: '4px', // Cyberpunk sharp edges
          marginBottom: '3rem', 
          boxShadow: '10px 10px 0px var(--brand-mint)',
          display: 'inline-flex',
          alignItems: 'center',
          border: '1px solid var(--brand-mint)'
        }}>
          <img src={`${import.meta.env.BASE_URL}perficient-logo.svg`} alt="Perficient" style={{ width: 180 }} />
        </div>

        <h1 className="cyber-element text-mask" style={{ 
          fontSize: '5.5rem', 
          textAlign: 'left', 
          marginBottom: '1rem',
          lineHeight: 1,
          fontWeight: 900,
          letterSpacing: '-3px',
          textTransform: 'uppercase'
        }}>
          Chill & Learn:<br />
          <span className="text-gradient" style={{ filter: 'drop-shadow(0 0 10px rgba(113, 216, 197, 0.5))' }}>Prompt Engineering</span>
        </h1>

        <div className="cyber-element" style={{ 
          marginBottom: '3rem',
          borderLeft: '4px solid var(--brand-mint)',
          paddingLeft: '1.5rem',
          marginTop: '2rem'
        }}>
          <p style={{ fontSize: '2.2rem', color: 'var(--text-main)', fontWeight: 800, marginBottom: '0.2rem', letterSpacing: '-1px' }}>
            Camilo A. Giraldo Ramirez
          </p>
          <p style={{ fontSize: '1.4rem', color: 'var(--brand-sky)', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 600 }}>
            Senior Technical Consultant
          </p>
        </div>

        <p className="cyber-element" style={{ 
          fontSize: '1.4rem', 
          color: 'var(--brand-mint)', 
          marginBottom: '4rem',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          {'>'} STATUS: SYSTEM_IDLE...<br/>
          {'>'} INITIALIZING_INTERACTION_SEQUENCE...
        </p>

        {/* Cyber Interactive Trigger - Polished Size & Alignment */}
        <div 
          onClick={handleStart}
          className="cyber-element"
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 40px rgba(113, 216, 197, 0.6)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(113, 216, 197, 0.2)'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.2rem',
            padding: '0.8rem 2rem',
            background: 'var(--brand-mint)',
            color: '#075056',
            fontSize: '1.3rem',
            fontWeight: 900,
            cursor: 'pointer',
            border: 'none',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            clipPath: 'polygon(0% 0%, 100% 0%, 92% 100%, 0% 100%)', // Aligned on left
            transition: 'all 0.3s ease',
            boxShadow: '0 0 20px rgba(113, 216, 197, 0.2)',
            zIndex: 100,
            opacity: 1,
            visibility: 'visible',
            position: 'relative'
          }}
        >
          <FiTerminal />
          <span>Comencemos</span>
          <span className="cyber-cursor">_</span>
        </div>
      </div>

      {/* Side Decoration Line */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '5%',
        width: '2px',
        height: '60%',
        background: 'linear-gradient(to bottom, transparent, var(--brand-mint), transparent)',
        opacity: 0.3
      }} />
    </section>
  );
}
