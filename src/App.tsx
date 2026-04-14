import { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import NeuralStream from './components/Canvas/NeuralStream';
import WelcomeSection from './components/Sections/WelcomeSection';
import HeroSection from './components/Sections/HeroSection';
import DefinitionSection from './components/Sections/DefinitionSection';
import AnatomySection from './components/Sections/AnatomySection';
import TechniquesSection from './components/Sections/TechniquesSection';
import ConfigDashboardSection from './components/Sections/ConfigDashboardSection';
import SafetySection from './components/Sections/SafetySection';
import BestPracticesSection from './components/Sections/BestPracticesSection';
import AudienceSection from './components/Sections/AudienceSection';
import NavigationControls from './components/UI/NavigationControls';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [temperature, setTemperature] = useState(0.7);
  const [safetyActive, setSafetyActive] = useState(false);
  const [rtcfActive, setRtcfActive] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // RTCF State trigger
    ScrollTrigger.create({
      trigger: '#rtcf-section',
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => setRtcfActive(true),
      onLeave: () => setRtcfActive(false),
      onEnterBack: () => setRtcfActive(true),
      onLeaveBack: () => setRtcfActive(false),
    });

    // Safety State trigger
    ScrollTrigger.create({
      trigger: '#safety-section',
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => setSafetyActive(true),
      onLeave: () => setSafetyActive(false),
      onEnterBack: () => setSafetyActive(true),
      onLeaveBack: () => setSafetyActive(false),
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="background-layer">
        <div className="canvas-container">
          <NeuralStream temperature={temperature} safetyActive={safetyActive} rtcfActive={rtcfActive} />
        </div>
      </div>

      <div className="content-layer">
        <div id="welcome"><WelcomeSection /></div>
        <div id="audience"><AudienceSection /></div>
        <div id="hero"><HeroSection /></div>
        <div id="definition"><DefinitionSection /></div>
        <div id="anatomy"><AnatomySection /></div>
        <div id="rtcf-section">
          <TechniquesSection />
        </div>
        <div id="config">
          <ConfigDashboardSection temperature={temperature} onTemperatureChange={setTemperature} />
        </div>
        <div id="safety-section">
          <SafetySection />
        </div>
        <div id="best-practices"><BestPracticesSection /></div>
      </div>

      <NavigationControls lenis={lenisRef} />
    </div>
  );
}

export default App;
