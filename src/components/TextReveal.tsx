'use client';

import { Fragment, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/hooks/use-reduced-motion';

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

    // Reduced motion: skip the hide-then-reveal entirely so the words simply
    // stay where they already are, visible.
    if (prefersReducedMotion()) return;

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

  // Real space text nodes between the word spans: a CSS margin alone leaves the
  // DOM without whitespace, so crawlers and screen readers read the heading as
  // one run-on word. The space sits outside the clipping span so it is never
  // cut off, and it keeps the heading soft-wrapping as before.
  const parts = children.split(' ');

  const words = parts.map((word, i) => (
    <Fragment key={i}>
      <span className="inline-block overflow-hidden">
        <span className="word-inner inline-block">{word}</span>
      </span>
      {i < parts.length - 1 ? ' ' : null}
    </Fragment>
  ));

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>
      {words}
    </Tag>
  );
}
