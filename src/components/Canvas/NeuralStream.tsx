import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getProject } from '@theatre/core';
import { SheetProvider, editable } from '@theatre/r3f';
import { PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Glitch, Bloom, Vignette } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';

const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera');

// Dynamically handle studio for Vite
if (import.meta.env.DEV) {
  import('@theatre/studio').then((module) => {
    const studio: any = module.default || module;
    if (studio && typeof studio.initialize === 'function') {
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
  rtcfActive: boolean;
  audienceActive: boolean;
  definitionActive: boolean;
}

function Particles({ rtcfActive, audienceActive, definitionActive }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);
  const count = 10000;

  // Default scattered field
  const targetPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, [count]);

  // Brain - dual-layer sphere
  const brainPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
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

  // Earth - Fibonacci sphere with terrain elevation
  const earthPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = 2 * Math.PI * goldenRatio * i;

      // Terrain elevation: ~15% land (raised), 85% ocean (base)
      const noise =
        Math.sin(azimuth * 3.7 + inclination * 2.1) *
        Math.cos(azimuth * 1.3 - inclination * 4.5) *
        Math.sin(inclination * 6.2 + azimuth * 0.7);
      const isLand = noise > 0.25;
      const radius = isLand ? 9.5 + Math.random() * 0.8 : 9 + Math.random() * 0.3;

      pos[i * 3] = radius * Math.sin(inclination) * Math.cos(azimuth);
      pos[i * 3 + 1] = radius * Math.sin(inclination) * Math.sin(azimuth);
      pos[i * 3 + 2] = radius * Math.cos(inclination);
    }
    return pos;
  }, [count]);

  // Human Head - outer shell + inner neural web
  const humanPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      // 70% outer shell (skull surface), 30% inner neural core
      const isOuter = Math.random() > 0.3;
      const r = isOuter
        ? 6.5 + Math.random() * 0.5          // skull shell
        : 1 + Math.random() * 5;             // inner brain

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 0.5; // slight upward shift
      pos[i * 3 + 2] = r * Math.cos(phi);
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

  // Color targets
  const colorDefault = new THREE.Color('#c7ddef');
  const colorEarth   = new THREE.Color('#4facfe');
  const colorBrain   = new THREE.Color('#71d8c5');
  const colorHuman   = new THREE.Color('#e0f7ff'); // cool white-cyan hologram
  const currentColor = useRef(new THREE.Color('#c7ddef'));

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const progress = Math.min(time / 2.5, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Priority: human > earth > brain > scattered
    const targetArr = definitionActive
      ? humanPositions
      : audienceActive ? earthPositions
      : rtcfActive ? brainPositions
      : targetPositions;

    const lerpSpeed = definitionActive ? 0.025 : 0.04;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const tx = targetArr[i3]     * easeProgress;
      const ty = targetArr[i3 + 1] * easeProgress;
      const tz = targetArr[i3 + 2] * easeProgress;

      positions[i3]     = THREE.MathUtils.lerp(positions[i3],     tx, lerpSpeed);
      positions[i3 + 1] = THREE.MathUtils.lerp(positions[i3 + 1], ty, lerpSpeed);
      positions[i3 + 2] = THREE.MathUtils.lerp(positions[i3 + 2], tz, lerpSpeed);
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotation
    const rotSpeedY = audienceActive ? 0.04 : definitionActive ? 0.003 : 0.015;
    const rotSpeedX = definitionActive ? 0 : 0.005;
    pointsRef.current.rotation.y = time * rotSpeedY;
    pointsRef.current.rotation.x = time * rotSpeedX;

    // Smooth color
    const targetColor = definitionActive ? colorHuman
      : audienceActive ? colorEarth
      : rtcfActive ? colorBrain
      : colorDefault;
    currentColor.current.lerp(targetColor, 0.03);
    if (materialRef.current) materialRef.current.color.copy(currentColor.current);
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
        ref={materialRef}
        size={0.13}
        map={circleTexture}
        color="#c7ddef"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </editable.points>
  );
}

interface NeuralStreamProps {
  temperature: number;
  safetyActive?: boolean;
  rtcfActive?: boolean;
  audienceActive?: boolean;
  definitionActive?: boolean;
}

export default function NeuralStream({
  temperature,
  safetyActive = false,
  rtcfActive = false,
  audienceActive = false,
  definitionActive = false,
}: NeuralStreamProps) {
  return (
    <Canvas>
      <SheetProvider sheet={mainSheet}>
        <EditableCamera theatreKey="CinematicCamera" makeDefault position={[0, 0, 15]} fov={60} />
        <ambientLight intensity={safetyActive ? 0.2 : 0.4} color={safetyActive ? '#71d8c5' : '#c7ddef'} />
        <pointLight position={[10, 10, 10]} intensity={safetyActive ? 1.5 : 0.8} color={safetyActive ? '#71d8c5' : '#ffffff'} />

        {/* Extra blue light for earth effect */}
        {audienceActive && (
          <pointLight position={[-8, 5, 8]} intensity={1.2} color="#4facfe" />
        )}
        {definitionActive && (
          <pointLight position={[0, 2, 10]} intensity={1.5} color="#e0f7ff" />
        )}

        <Particles rtcfActive={rtcfActive} audienceActive={audienceActive} definitionActive={definitionActive} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={1}
            mipmapBlur
            intensity={audienceActive ? 0.8 : definitionActive ? 1.2 : 0.4 + temperature * 0.4}
          />
          <Glitch
            delay={new THREE.Vector2(1.5, 3.5)}
            duration={new THREE.Vector2(0.6, 1.0)}
            strength={new THREE.Vector2(0.04 * temperature, 0.1 * temperature)}
            mode={GlitchMode.SPORADIC}
            active={temperature > 1.3}
            ratio={0.85}
          />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </SheetProvider>
    </Canvas>
  );
}
