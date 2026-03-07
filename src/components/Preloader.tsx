'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Skip if already seen this session
    if (sessionStorage.getItem('preloaded')) {
      setShow(false);
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('preloaded', '1');
        setShow(false);
        onComplete();
      },
    });

    // Counter: 0 → 100
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.val)}`;
        }
      },
    });

    // Name chars reveal (overlapping with counter)
    const chars = nameRef.current?.querySelectorAll('.preloader-char');
    if (chars) {
      tl.from(chars, {
        y: 40,
        opacity: 0,
        stagger: 0.04,
        duration: 0.5,
        ease: 'power3.out',
      }, 0.4);
    }

    // Pause at 100%
    tl.to({}, { duration: 0.3 });

    // Curtain slide up
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  if (!show) return null;

  const splitName = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="preloader-char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] bg-[#0a0a0a] flex flex-col items-center justify-center"
    >
      <div ref={nameRef} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
        <span className="text-white">{splitName('Sohaib ')}</span>
        <span className="text-blue-400">{splitName('Zahid')}</span>
      </div>
      <div className="flex items-baseline gap-1 text-neutral-500">
        <span ref={counterRef} className="text-5xl md:text-6xl font-bold text-white tabular-nums">0</span>
        <span className="text-2xl md:text-3xl font-bold text-blue-400">%</span>
      </div>
      <div className="w-48 h-[2px] bg-white/10 mt-6 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 preloader-bar" />
      </div>
    </div>
  );
}
