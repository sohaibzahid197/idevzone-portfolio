'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { prefersReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * The native pointer has to go, or it sits inside the ring we draw. Scoped to
 * `(pointer: fine)` so touch and stylus devices keep their own affordances, and
 * only mounted while the custom cursor is on screen. Text fields keep their
 * I-beam - losing it makes the contact form feel broken.
 */
const HIDE_NATIVE_CURSOR = `@media (pointer: fine) {
  html, body, body * { cursor: none !important; }
  body input, body textarea, body select, body [contenteditable] { cursor: auto !important; }
}`;

const INTERACTIVE_SELECTOR = 'a, button, [role="button"]';

export default function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Mirrors of the state above. The listeners read these instead of the state
  // so the effect below can run exactly once instead of re-registering itself
  // every time the cursor becomes visible or crosses a link.
  const isVisibleRef = useRef(false);
  const isHoveringRef = useRef(false);
  const cursorTextRef = useRef('');
  const pointerRef = useRef<{ x: number; y: number; target: EventTarget | null }>({
    x: 0,
    y: 0,
    target: null,
  });

  useEffect(() => {
    // Only show on desktop, and never when the visitor has asked for less motion.
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || prefersReducedMotion()) return;

    let rafId = 0;

    // Everything expensive - the ancestor walk, the rect read and the state
    // writes - happens here, at most once per frame, however many mousemove
    // events the browser decides to deliver.
    const update = () => {
      rafId = 0;
      const { x, y, target } = pointerRef.current;

      // A single walk up the tree: a `data-cursor` ancestor wins at any depth,
      // otherwise the nearest link/button gets the magnetic pull.
      let labelled: Element | null = null;
      let interactive: Element | null = null;
      for (let el: Element | null = target instanceof Element ? target : null; el; el = el.parentElement) {
        if (el.hasAttribute('data-cursor')) {
          labelled = el;
          break;
        }
        if (!interactive && el.matches(INTERACTIVE_SELECTOR)) interactive = el;
      }

      const text = labelled?.getAttribute('data-cursor') || '';
      const hovering = labelled !== null || interactive !== null;

      if (text !== cursorTextRef.current) {
        cursorTextRef.current = text;
        setCursorText(text);
      }
      if (hovering !== isHoveringRef.current) {
        isHoveringRef.current = hovering;
        setIsHovering(hovering);
      }

      if (interactive && !labelled) {
        // Read the rect here rather than caching it on enter: Lenis keeps
        // scrolling the element under a stationary pointer, so a cached centre
        // would drift for the whole scroll animation.
        const rect = interactive.getBoundingClientRect();
        const pullX = (rect.left + rect.width / 2 - x) * 0.2;
        const pullY = (rect.top + rect.height / 2 - y) * 0.2;
        cursorX.set(x + pullX);
        cursorY.set(y + pullY);
      } else {
        cursorX.set(x);
        cursorY.set(y);
      }

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, target: e.target };
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const hasText = cursorText.length > 0;
  const ringSize = hasText ? 80 : isHovering ? 48 : 32;

  return (
    <>
      <style>{HIDE_NATIVE_CURSOR}</style>

      {/* Outer ring */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: hasText ? 0.9 : isHovering ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="rounded-full border border-white -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ backgroundColor: hasText ? 'rgba(255,255,255,0.9)' : 'transparent' }}
        >
          {hasText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-black text-xs font-semibold uppercase tracking-wider"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      >
        <motion.div
          animate={{
            width: hasText ? 0 : isHovering ? 6 : 4,
            height: hasText ? 0 : isHovering ? 6 : 4,
            opacity: hasText ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </>
  );
}
