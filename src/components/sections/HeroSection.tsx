'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';

const ParticleNetwork = dynamic(() => import('@/components/ParticleNetwork'), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const fullText = "I build modern, fast & scalable digital products using React Native, Next.js, and AI.";

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
    if (chars && chars.length > 0) {
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
    }
  }, { scope: nameRef });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayText(fullText.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (currentIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (currentIndex === 0 && isDeleting) {
        setIsDeleting(false);
      }
    }, isDeleting ? 25 : 45);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, fullText]);

  const splitChars = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
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
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          style={{ perspective: '1000px' }}
        >
          <span className="text-white">{splitChars('Sohaib ')}</span>
          <span className="text-blue-400">{splitChars('Zahid')}</span>
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
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-blue-500 ml-0.5"
            >
              |
            </motion.span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://github.com/sohaibzahid197"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            <Github className="w-5 h-5" />
            View GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/isohaibzahid/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/[0.12] hover:border-white/[0.25] text-white font-semibold rounded-lg transition-all duration-200 hover:bg-white/[0.04] hover:-translate-y-0.5"
          >
            <Linkedin className="w-5 h-5" />
            Connect on LinkedIn
          </a>
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
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
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
