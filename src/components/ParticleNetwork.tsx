'use client';

import { useEffect, useMemo, useState, memo } from 'react';
import dynamic from 'next/dynamic';
import type { ISourceOptions } from '@tsparticles/engine';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Both the canvas component and the engine are pulled in behind the device
// check below, so phones, tablets and reduced-motion visitors - none of which
// render anything here - never fetch or execute the tsparticles bundle. The
// `ISourceOptions` import above is type-only and disappears at build time.
const Particles = dynamic(() => import('@tsparticles/react').then((mod) => mod.Particles), {
  ssr: false,
  loading: () => null,
});

const MIN_PARTICLE_COUNT = 45;

/**
 * Particle budget by viewport width. The engine's own `density` option is left
 * off because it scales the count with canvas area, which pushed a 1440p
 * monitor past 200 particles; these tiers keep the field looking the same on a
 * capable desktop while costing far less on smaller ones.
 */
function getParticleCount(width: number): number {
  if (width >= 1920) return 110;
  if (width >= 1440) return 80;
  if (width >= 1024) return 60;
  return MIN_PARTICLE_COUNT;
}

// tsparticles has no pixel-ratio cap of its own - `detectRetina` hands the
// canvas the raw devicePixelRatio and the fill cost scales with its square. 2x
// is worth paying for on a Retina display; 3x (nine times the pixels, for dots
// that are 1-3px across) is not.
const MAX_PIXEL_RATIO = 2;

function ParticleNetwork() {
  const [engineReady, setEngineReady] = useState(false);
  // Assume mobile until the client has measured, so nothing loads on the
  // devices that will never render the canvas.
  const [isMobile, setIsMobile] = useState(true);
  const [particleCount, setParticleCount] = useState(MIN_PARTICLE_COUNT);
  const [detectRetina, setDetectRetina] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const checkDevice = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
      setParticleCount(getParticleCount(window.innerWidth));
      setDetectRetina(window.devicePixelRatio <= MAX_PIXEL_RATIO);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    // The guard has to come before the import, otherwise the engine is
    // downloaded and initialised on devices that discard it a render later.
    // Note the deps: `isMobile` starts true, so this effect only does its work
    // once the check above has cleared the device.
    if (isMobile || reducedMotion) return;

    let cancelled = false;

    (async () => {
      const [{ initParticlesEngine }, { loadSlim }] = await Promise.all([
        import('@tsparticles/react'),
        import('@tsparticles/slim'),
      ]);
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      if (!cancelled) setEngineReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [isMobile, reducedMotion]);

  const options: ISourceOptions = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: {
        value: particleCount,
      },
      color: {
        value: ['#3b82f6', '#60a5fa', '#06b6d4', '#38bdf8'],
      },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: {
          enable: true,
          speed: 0.5,
          startValue: 'random' as const,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 1,
          startValue: 'random' as const,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: '#3b82f6',
        opacity: 0.15,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none' as const,
        random: true,
        straight: false,
        outModes: { default: 'bounce' as const },
      },
    },
    interactivity: {
      detectsOn: 'window' as const,
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
      modes: {
        repulse: {
          distance: 120,
          duration: 0.4,
          speed: 0.5,
        },
      },
    },
    detectRetina,
  }), [particleCount, detectRetina]);

  if (isMobile || reducedMotion || !engineReady) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 z-[1]"
      options={options}
    />
  );
}

export default memo(ParticleNetwork);
