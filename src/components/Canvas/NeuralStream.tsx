import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getProject } from '@theatre/core';
import { SheetProvider, editable } from '@theatre/r3f';
import { PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Glitch, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';

const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera');

// Dynamically handle studio for Vite
if (import.meta.env.DEV) {
  import('@theatre/studio').then((module) => {
    const studio: any = module.default || module;
    if (studio && typeof studio.initialize === 'function') {
      studio.initialize();
      // Also hide UI initially to avoid clutter if desired
      // studio.ui.hide();
      import('@theatre/r3f/dist/extension').then((r3fExt) => {
        if (typeof studio.extend === 'function') studio.extend(r3fExt.default || r3fExt);
      });
    }
  }).catch(console.error);
}

const theatreProject = getProject('NeuralStream Cinematic');
const mainSheet = theatreProject.sheet('Main Sequence');

interface ParticlesProps {
  temperature: number;
  rtcfActive: boolean;
}

function Particles({ temperature, rtcfActive }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 10000;

  // Store target positions
  const targetPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, [count]);

  // Unified Brain Target Positions
  const brainPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Create a dual-layer sphere (core + shell)
        const isCore = Math.random() > 0.4;
        const radius = isCore ? Math.random() * 5 : 7 + Math.random() * 4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const currentPositions = useMemo(() => new Float32Array(count * 3), [count]);

  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
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
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    // Big Bang Entry: Explosion during first 3 seconds
    const progress = Math.min(time / 2.5, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const tx = (rtcfActive ? brainPositions[i3] : targetPositions[i3]) * easeProgress;
      const ty = (rtcfActive ? brainPositions[i3 + 1] : targetPositions[i3 + 1]) * easeProgress;
      const tz = (rtcfActive ? brainPositions[i3 + 2] : targetPositions[i3 + 2]) * easeProgress;

      positions[i3] = THREE.MathUtils.lerp(positions[i3], tx, 0.05);
      positions[i3 + 1] = THREE.MathUtils.lerp(positions[i3 + 1], ty, 0.05);
      positions[i3 + 2] = THREE.MathUtils.lerp(positions[i3 + 2], tz, 0.05);
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Movement
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = time * 0.005;
  });

  return (
    <editable.points theatreKey="Particles" ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={currentPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        map={circleTexture}
        color="#00f3ff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </editable.points>
  );
}

export default function NeuralStream({ temperature = 0.7, safetyActive = false, rtcfActive = false }) {
  return (
    <Canvas>
      <SheetProvider sheet={mainSheet}>
        <EditableCamera theatreKey="CinematicCamera" makeDefault position={[0, 0, 15]} fov={60} />
        <ambientLight intensity={safetyActive ? 0.2 : 0.5} color={safetyActive ? "#ffaa00" : "#ffffff"} />
        <pointLight position={[10, 10, 10]} intensity={safetyActive ? 2 : 1} color={safetyActive ? "#ff4400" : "#ffffff"} />
        
        <Particles temperature={temperature} rtcfActive={rtcfActive} />

        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          {safetyActive && (
            <Glitch
              delay={new THREE.Vector2(0.2, 0.4)}
              duration={new THREE.Vector2(0.1, 0.2)}
              strength={new THREE.Vector2(0.1, 0.3)}
              mode={GlitchMode.SPORADIC}
              active
              ratio={0.85}
            />
          )}
        </EffectComposer>
      </SheetProvider>
    </Canvas>
  );
}
