import { useState, useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export default function AiAssistant() {
  // Using a public Rive community demo as placeholder
  // In production, replace src with the local .riv file and update stateMachines
  const { rive, RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv', // Placeholder URL
    stateMachines: 'bumpy', 
    autoplay: true,
  });

  const levelInput = useStateMachineInput(rive, 'bumpy', 'level');
  
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (levelInput) {
        // Change state based on scroll
        const scrollY = window.scrollY;
        levelInput.value = scrollY > 500 ? 1 : 0; 
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [levelInput]);

  return (
    <div 
      className="glass-panel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: isHovered ? '250px' : '80px',
        height: '80px',
        borderRadius: '40px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        transition: 'width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(0, 243, 255, 0.2)'
      }}
    >
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
        <RiveComponent />
      </div>
      <div style={{ 
        marginLeft: '10px', 
        opacity: isHovered ? 1 : 0, 
        transition: 'opacity 0.2s', 
        whiteSpace: 'nowrap',
        color: 'var(--neon-cyan)',
        fontWeight: 'bold'
      }}>
        Hi, I'm your AI Guide!
      </div>
    </div>
  );
}
