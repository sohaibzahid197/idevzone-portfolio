'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
}

export default function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.word-inner');
    gsap.set(words, { y: '100%' });

    const anim = gsap.to(words, {
      y: '0%',
      duration: 0.6,
      stagger: 0.05,
      ease: 'power3.out',
      delay,
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
  }, [delay]);

  const words = children.split(' ').map((word, i) => (
    <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
      <span className="word-inner inline-block">{word}</span>
    </span>
  ));

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>
      {words}
    </Tag>
  );
}
