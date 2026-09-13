'use client';

import { useRef, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

// A touchscreen laptop still has a mouse, so ask about the pointer rather than
// about touch support: this stays false for a trackpad-equipped iPad too.
const COARSE_POINTER_QUERY = '(hover: none), (pointer: coarse)';

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;

  const mediaQuery = window.matchMedia(COARSE_POINTER_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(COARSE_POINTER_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 15,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Read through an external store rather than an effect, so the value is never
  // written with setState during a render pass.
  const isTouchDevice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * strength;
    const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * strength;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // One element type in both modes: swapping between a div and a motion.div
  // would remount the whole button subtree the moment the pointer check
  // resolves. Only the wrapper's display differs - inline-block would shrink to
  // fit and break the full-width submit button on touch layouts.
  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={isTouchDevice ? className : `inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
