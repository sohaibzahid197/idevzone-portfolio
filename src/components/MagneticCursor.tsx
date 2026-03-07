'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Magnetic effect for buttons and links + cursor text
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for data-cursor elements first
      const dataCursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (dataCursorEl) {
        const text = dataCursorEl.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovering(true);
        return;
      }

      const interactive = target.closest('a, button, [role="button"]');
      if (interactive) {
        setIsHovering(true);
        setCursorText('');
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnetic pull toward center
        const pullX = (centerX - e.clientX) * 0.2;
        const pullY = (centerY - e.clientY) * 0.2;
        cursorX.set(e.clientX + pullX);
        cursorY.set(e.clientY + pullY);
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const hasText = cursorText.length > 0;
  const ringSize = hasText ? 80 : isHovering ? 48 : 32;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={dotRef}
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
              exit={{ opacity: 0, scale: 0.5 }}
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
