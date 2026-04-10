import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import NeuralStream from './components/Canvas/NeuralStream';
import HeroSection from './components/Sections/HeroSection';
import DefinitionSection from './components/Sections/DefinitionSection';
import AnatomySection from './components/Sections/AnatomySection';
import TechniquesSection from './components/Sections/TechniquesSection';
import ConfigDashboardSection from './components/Sections/ConfigDashboardSection';
import SafetySection from './components/Sections/SafetySection';
import BestPracticesSection from './components/Sections/BestPracticesSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="canvas-container">
        <NeuralStream />
      </div>
      <div className="content-layer">
        <HeroSection />
        <DefinitionSection />
        <AnatomySection />
        <TechniquesSection />
        <ConfigDashboardSection />
        <SafetySection />
        <BestPracticesSection />
      </div>
    </div>
  );
}

export default App;
