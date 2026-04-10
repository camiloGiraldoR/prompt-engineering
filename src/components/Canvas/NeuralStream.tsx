import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getProject } from '@theatre/core';
import { SheetProvider, editable as e } from '@theatre/r3f';
import { EffectComposer, Glitch, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';

// Dynamically handle studio for Vite
if (import.meta.env.DEV) {
  import('@theatre/studio').then((module) => {
    const studio: any = module.default || module;
    if (typeof studio.initialize === 'function') {
      studio.initialize();
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

  // 4 target nodes for RTCF
  const rtcfNodes = useMemo(() => {
    const nodes = [
      new THREE.Vector3(-7, 5, 0),
      new THREE.Vector3(7, 5, 0),
      new THREE.Vector3(-7, -5, 0),
      new THREE.Vector3(7, -5, 0)
    ];
    return nodes;
  }, []);

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
    
    // Vibration frequency based on temperature
    const vibAmount = temperature * 0.05;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Big Bang + RTCF Morph
      let tx = targetPositions[i3];
      let ty = targetPositions[i3 + 1];
      let tz = targetPositions[i3 + 2];

      if (rtcfActive) {
        const node = rtcfNodes[i % 4];
        tx = node.x + (Math.random() - 0.5) * 8;
        ty = node.y + (Math.random() - 0.5) * 8;
        tz = node.z + (Math.random() - 0.5) * 8;
      }

      const vibX = (Math.random() - 0.5) * vibAmount;
      const vibY = (Math.random() - 0.5) * vibAmount;
      const vibZ = (Math.random() - 0.5) * vibAmount;

      positions[i3] = THREE.MathUtils.lerp(positions[i3], tx * easeProgress + vibX, 0.1);
      positions[i3 + 1] = THREE.MathUtils.lerp(positions[i3 + 1], ty * easeProgress + vibY, 0.1);
      positions[i3 + 2] = THREE.MathUtils.lerp(positions[i3 + 2], tz * easeProgress + vibZ, 0.1);
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Movement
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = time * 0.005;

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    pointsRef.current.position.y = Math.sin(scrollY * 0.0005) * 2;
  });

  return (
    <e.points theatreKey="Particles" ref={pointsRef}>
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
    </e.points>
  );
}

export default function NeuralStream({ temperature = 0.7, safetyActive = false, rtcfActive = false }) {
  return (
    <Canvas>
      <SheetProvider sheet={mainSheet}>
        <e.perspectiveCamera theatreKey="CinematicCamera" makeDefault position={[0, 0, 15]} fov={60} />
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
