'use client';

import { useEffect, useMemo, useState, memo } from 'react';
import { initParticlesEngine, Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

function ParticleNetwork() {
  const [engineReady, setEngineReady] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setEngineReady(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: {
        value: 120,
        density: { enable: true, width: 1920, height: 1080 },
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
    detectRetina: true,
  }), []);

  if (isMobile || !engineReady) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 z-[1]"
      options={options}
    />
  );
}

export default memo(ParticleNetwork);
