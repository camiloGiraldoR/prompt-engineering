import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Theatre.js Imports
import { getProject } from '@theatre/core';
import { SheetProvider, editable as e } from '@theatre/r3f';

// Initialize Theatre Studio dynamically for Vite resolution
if (import.meta.env.DEV) {
  import('@theatre/studio').then((module) => {
    const studio: any = module.default || module;
    if (typeof studio.initialize === 'function') {
      studio.initialize();
      
      // Load R3F extension for Theatre
      import('@theatre/r3f/dist/extension').then((r3fExt) => {
        if (typeof studio.extend === 'function') {
            studio.extend(r3fExt.default || r3fExt);
        }
      });
    }
  }).catch(console.error);
}

const theatreProject = getProject('NeuralStream Cinematic');
const mainSheet = theatreProject.sheet('Main Sequence');

function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  
  const count = 8000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread them more uniformly across the screen volume
      pos[i * 3] = (Math.random() - 0.5) * 40; // x spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40; // y spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40; // z spread
    }
    return pos;
  }, [count]);

  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02; // Slower horizontal rotation
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.005; // Slower vertical rotation
      
      // Dynamic shift based on scroll - softer movement
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      pointsRef.current.position.y = scrollY * 0.003;
    }
  });

  return (
    <e.points theatreKey="Particles" ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        map={circleTexture}
        color="#00f3ff"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </e.points>
  );
}

export default function NeuralStream() {
  return (
    <Canvas>
      <SheetProvider sheet={mainSheet}>
        {/* The Theatre.js editable perspective camera replaces the default R3F camera */}
        <e.perspectiveCamera 
          theatreKey="CinematicCamera" 
          makeDefault 
          position={[0, 0, 8]} 
          fov={60} 
        />
        
        <ambientLight intensity={0.5} />
        <Particles />
      </SheetProvider>
    </Canvas>
  );
}
