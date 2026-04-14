import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiVolumeX, FiVolume2, FiTerminal } from 'react-icons/fi';
import bgMusic from '../../assets/cover.mp3';

export default function WelcomeSection() {
  const container = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2); // Initial volume 20%
  const [showSlider, setShowSlider] = useState(false);

  // Typewriter state
  const [statusMessage, setStatusMessage] = useState('');
  const fullMessage = 'En unos minutos daremos inicio...';

  // Global Audio Initialization
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  // 1. Static Entry Animations (Runs ONCE)
  useGSAP(() => {
    const tl = gsap.timeline();

    // Animate elements into view
    tl.from('.cyber-element', {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out'
    });

    // Looping Typewriter Animation Logic
    const typingTl = gsap.timeline({
      delay: 1.5,
      repeat: -1,
      yoyo: true,
      repeatDelay: 3
    });

    const typingObj = { charCount: 0 };
    typingTl.to(typingObj, {
      charCount: fullMessage.length,
      duration: 3,
      ease: 'none', // Linear typing for realism
      onUpdate: () => {
        setStatusMessage(fullMessage.slice(0, Math.ceil(typingObj.charCount)));
      }
    });

    // Blinking cursors
    gsap.to('.cyber-cursor-line, .cyber-cursor', {
      opacity: 0,
      repeat: -1,
      duration: 0.5,
      ease: 'steps(1)'
    });
  }, { scope: container });

  // 2. Reactive Audio Crossfade (Depends on volume/state)
  useGSAP(() => {
    if (audioRef.current) {
      const audioProxy = { vol: volume };

      gsap.to(audioProxy, {
        vol: 0,
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          id: 'audio-fade',
          onUpdate: () => {
            if (audioRef.current && isPlaying) {
              audioRef.current.volume = audioProxy.vol;
            }
          },
          onLeave: () => {
            if (audioRef.current && isPlaying) {
              audioRef.current.pause();
            }
          },
          onEnterBack: () => {
            if (audioRef.current && audioRef.current.paused && isPlaying) {
              audioRef.current.play().catch(e => console.log('Resume blocked:', e));
            }
          }
        }
      });
    }
  }, { scope: container, dependencies: [volume, isPlaying] });

  const handleStart = () => {
    const target = document.querySelector('#audience');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={container} className="section-container">
      <audio ref={audioRef} src={bgMusic} loop />

      {/* Audio Controls Cluster - Vertical Stack */}
      <div
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.8rem',
          zIndex: 100
        }}
      >
        <div
          onClick={toggleMusic}
          style={{
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
            boxShadow: isPlaying ? '0 0 15px rgba(113, 216, 197, 0.3)' : 'none'
          }}
        >
          {isPlaying && volume > 0 ? <FiVolume2 size={24} /> : <FiVolumeX size={24} />}
        </div>

        <div style={{
          height: showSlider ? '120px' : '0px',
          opacity: showSlider ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(7, 80, 86, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: showSlider ? '1rem 0.5rem' : '0px',
          border: showSlider ? '1px solid var(--brand-mint)' : '1px solid transparent'
        }}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              writingMode: 'vertical-lr',
              WebkitAppearance: 'slider-vertical',
              width: '8px',
              height: '100px',
              accentColor: 'var(--brand-mint)',
              cursor: 'pointer',
              margin: '0 auto'
            } as any}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="section-content">

        {/* Logo Podium */}
        <div className="cyber-element" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '0.8rem 1.6rem',
          borderRadius: '4px',
          marginBottom: '3rem',
          boxShadow: '8px 8px 0px var(--brand-mint)',
          display: 'inline-flex',
          alignItems: 'center',
          border: '1px solid var(--brand-mint)'
        }}>
          <img src={`${import.meta.env.BASE_URL}perficient-logo.svg`} alt="Perficient" style={{ width: 160 }} />
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

        {/* Terminal Text Block - Refined Alignment */}
        <div className="cyber-element" style={{
          marginBottom: '4rem',
          minHeight: '5.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ color: 'var(--brand-mint)', fontWeight: 900, fontSize: '1.4rem', fontFamily: 'monospace', width: '20px' }}>{'>'}</span>
            <p style={{ fontSize: '1.4rem', color: 'var(--brand-mint)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
              STATUS: SKYNET_SYSTEM_IDLE...
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ color: 'var(--brand-mint)', fontWeight: 900, fontSize: '1.4rem', fontFamily: 'monospace', width: '20px' }}>{'>'}</span>
            <p style={{ fontSize: '1.4rem', color: 'var(--brand-mint)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
              {statusMessage}
              <span className="cyber-cursor-line" style={{ marginLeft: '4px', background: 'var(--brand-mint)', display: 'inline-block', width: '10px', height: '1.4rem', verticalAlign: 'middle' }}></span>
            </p>
          </div>
        </div>

        {/* Action Button - Polished Alignment */}
        <div className="cyber-element" style={{ display: 'flex', alignItems: 'center' }}>
          <div
            onClick={handleStart}
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
              clipPath: 'polygon(0% 0%, 100% 0%, 92% 100%, 0% 100%)',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(113, 216, 197, 0.2)',
              zIndex: 100,
              position: 'relative'
            }}
          >
            <FiTerminal style={{ fontSize: '1.6rem' }} />
            <span>Comencemos</span>
            <span className="cyber-cursor">_</span>
          </div>
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
