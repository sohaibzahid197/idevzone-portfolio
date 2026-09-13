'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/hooks/use-reduced-motion';
import { siteConfig } from '@/lib/site-config';

const SESSION_KEY = 'preloaded';

// The name is revealed one character at a time, so it is split here to keep the
// visible glyphs and the overlay's accessible name from drifting apart.
const [firstName, ...restOfName] = siteConfig.name.split(' ');
const lastName = restOfName.join(' ');

function readSession(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Storage disabled - the splash simply plays again next reload.
  }
}

/**
 * The splash is a three second animated curtain, so it is skipped once it has
 * been seen in this tab session and for anyone who asked for reduced motion.
 */
function shouldSkipSplash(): boolean {
  return readSession(SESSION_KEY) !== null || prefersReducedMotion();
}

// Nothing outside this component changes the answer while the page is open, so
// there is nothing to subscribe to.
function subscribeToSplashState(): () => void {
  return () => undefined;
}

function shouldSkipSplashOnServer(): boolean {
  return false;
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  // Read through useSyncExternalStore rather than in the effect: the server and
  // the hydration pass keep rendering the prerendered overlay, and the client
  // drops it on its first commit - no cascading setState, no hydration mismatch.
  const skipSplash = useSyncExternalStore(
    subscribeToSplashState,
    shouldSkipSplash,
    shouldSkipSplashOnServer
  );
  const [finished, setFinished] = useState(false);
  const show = !skipSplash && !finished;

  // Held in a ref so the timeline below never depends on the parent's callback
  // identity - an inline arrow there would otherwise rebuild it on every render.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    // Skipped this session: the overlay is already unmounting on this commit,
    // so all that is left is telling the page it can unclip.
    if (shouldSkipSplash()) {
      writeSession(SESSION_KEY, '1');
      onCompleteRef.current();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        writeSession(SESSION_KEY, '1');
        setFinished(true);
        onCompleteRef.current();
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
  }, []);

  if (!show) return null;

  const splitName = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="preloader-char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    // Decorative splash: nothing inside it is focusable and it carries no
    // information, so it stays out of the accessibility tree entirely.
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9998] bg-[#0a0a0a] flex flex-col items-center justify-center"
    >
      <div
        ref={nameRef}
        aria-label={siteConfig.name}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
      >
        <span className="text-white">{splitName(`${firstName} `)}</span>
        <span className="text-blue-400">{splitName(lastName)}</span>
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
