'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

// Clears the fixed navbar when scrolling to a section.
const NAV_OFFSET = -80;

// Active Lenis instance, so scrollToSection can reach it from any component.
let lenisInstance: Lenis | null = null;

/**
 * Scrolls to an in-page section by hash (e.g. '#projects'). Goes through Lenis
 * when smooth scrolling is running, and falls back to a native scroll when it
 * is not — which is also the reduced-motion path, since Lenis is never created
 * there.
 */
export function scrollToSection(hash: string): void {
  const selector = hash.startsWith('#') ? hash : `#${hash}`;
  if (selector.length < 2) return;

  const el = document.querySelector(selector);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset: NAV_OFFSET });
    return;
  }

  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Reduced motion: no scroll hijacking at all, native scrolling stands.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisInstance = lenis;

    // One clock: Lenis drives ScrollTrigger, GSAP's ticker drives Lenis.
    // Without this ScrollTrigger reads the browser's scroll position while
    // Lenis moves the page from its own loop, so every scrub and pin misfires.
    const unsubscribe = lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    // The page starts clamped by the preloader and reflows as fonts and images
    // land, so re-measure whenever the document height actually changes.
    let lastHeight = document.documentElement.scrollHeight;
    let refreshFrame = 0;
    const resizeObserver = new ResizeObserver(() => {
      const height = document.documentElement.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    resizeObserver.observe(document.body);

    // Handle anchor links with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      if (href.length < 2 || !document.querySelector(href)) return;

      e.preventDefault();
      scrollToSection(href);
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      resizeObserver.disconnect();
      cancelAnimationFrame(refreshFrame);
      unsubscribe();
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
