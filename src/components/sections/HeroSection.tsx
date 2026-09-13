'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/MagneticButton';
import { scrollToSection } from '@/components/SmoothScroll';
import { prefersReducedMotion } from '@/hooks/use-reduced-motion';
import { siteConfig } from '@/lib/site-config';

const ParticleNetwork = dynamic(() => import('@/components/ParticleNetwork'), {
  ssr: false,
  loading: () => null,
});

const TYPE_SPEED_MS = 45;
// Lines up with the fade-in delay of the wrapper below, so the first character
// lands as the paragraph appears rather than while it is still transparent.
const TYPE_START_DELAY_MS = 800;

// The name is revealed one character at a time, so it is split here to keep the
// visible glyphs and the h1's accessible name from drifting apart.
const [firstName, ...restOfName] = siteConfig.name.split(' ');
const lastName = restOfName.join(' ');

/**
 * Types `text` out once and then stops - no delete/retype loop, and no timers
 * left running for the life of the page. The complete sentence is rendered on
 * the server and on the first client render, so crawlers and visitors without
 * JavaScript get it in full; while the animation runs, the untyped remainder
 * stays in the flow (hidden) so the line box - and the layout - never shifts.
 */
function Typewriter({ text }: { text: string }) {
  // null means "not animating": render every character.
  const [typedLength, setTypedLength] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // The first tick clears the sentence, every tick after it adds a character.
    let index = -1;

    const tick = () => {
      index += 1;
      setTypedLength(index);
      if (index < text.length) {
        timer = setTimeout(tick, index === 0 ? TYPE_START_DELAY_MS : TYPE_SPEED_MS);
      }
    };

    let timer = setTimeout(tick, 0);

    return () => clearTimeout(timer);
  }, [text]);

  const typedCount = typedLength ?? text.length;
  const isTyping = typedLength !== null && typedLength < text.length;

  return (
    <>
      {/* Screen readers get the stable, complete sentence; the copy below is a
          purely visual effect. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, typedCount)}
        {isTyping && (
          <>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-blue-500 ml-0.5"
            >
              |
            </motion.span>
            <span className="invisible">{text.slice(typedCount)}</span>
          </>
        )}
      </span>
    </>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // GSAP character reveal animation
  useGSAP(() => {
    const chars = nameRef.current?.querySelectorAll('.hero-char');
    if (!chars || chars.length === 0) return;

    // Reduced motion: leave the characters exactly where the markup put them.
    if (prefersReducedMotion()) return;

    gsap.set(chars, { y: 60, opacity: 0, rotateX: -40 });
    gsap.to(chars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.035,
      duration: 0.7,
      ease: 'back.out(1.7)',
      delay: 0.4,
    });
  }, { scope: nameRef });

  const splitChars = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="hero-char inline-block"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-svh flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Layer 1: Aurora Borealis Background */}
      <div className="aurora-container" aria-hidden="true">
        <div className="aurora-layer-1" />
        <div className="aurora-layer-2" />
        <div className="aurora-layer-3" />
      </div>

      {/* Animated Gradient Mesh Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.07] rounded-full blur-[120px] animate-mesh-1" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.05] rounded-full blur-[120px] animate-mesh-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] bg-indigo-500/[0.04] rounded-full blur-[150px] animate-mesh-3" />
        </div>
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Layer 2: Interactive Particle Network */}
      <ParticleNetwork />

      {/* Layer 3: Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available for Projects
          </span>
        </motion.div>

        {/* Name - GSAP Character Reveal */}
        <h1
          ref={nameRef}
          aria-label={siteConfig.name}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          style={{ perspective: '1000px' }}
        >
          <span className="text-white">{splitChars(`${firstName} `)}</span>
          <span className="text-blue-400">{splitChars(lastName)}</span>
        </h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl md:text-2xl text-neutral-400 font-medium mb-8"
        >
          Full Stack Web & Mobile Developer{' '}
          <span className="text-blue-400">+</span>{' '}
          Founder of iDevZone
        </motion.h2>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-2xl mx-auto mb-12 min-h-[3.5rem]"
        >
          <p className="text-lg text-neutral-500 leading-relaxed">
            <Typewriter text={siteConfig.tagline} />
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              <Github className="w-5 h-5" />
              View GitHub
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/[0.12] hover:border-white/[0.25] text-white font-semibold rounded-lg transition-all duration-200 hover:bg-white/[0.04] hover:-translate-y-0.5"
            >
              <Linkedin className="w-5 h-5" />
              Connect on LinkedIn
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection('#projects')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-neutral-600 hover:text-neutral-400 transition-colors"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  );
}
