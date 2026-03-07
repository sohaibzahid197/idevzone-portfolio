'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
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

    // Magnetic effect for buttons and links
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"]');
      if (interactive) {
        setIsHovering(true);
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
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            opacity: isHovering ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border border-white -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      >
        <motion.div
          animate={{
            width: isHovering ? 6 : 4,
            height: isHovering ? 6 : 4,
          }}
          transition={{ duration: 0.15 }}
          className="bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </>
  );
}
