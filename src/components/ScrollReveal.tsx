'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Variant = 'fade-up' | 'slide-left' | 'slide-right' | 'scale' | 'blur-in';

const variantConfig: Record<Variant, gsap.TweenVars> = {
  'fade-up': { y: 60, opacity: 0 },
  'slide-left': { x: -80, opacity: 0 },
  'slide-right': { x: 80, opacity: 0 },
  'scale': { scale: 0.9, opacity: 0 },
  'blur-in': { opacity: 0, filter: 'blur(10px)' },
};

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  stagger?: number;
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.8,
  className = '',
  stagger = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from = variantConfig[variant];
    const targets = stagger > 0 ? el.children : el;

    gsap.set(targets, from);

    const anim = gsap.to(targets, {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration,
      delay,
      stagger: stagger > 0 ? stagger : undefined,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [variant, delay, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
