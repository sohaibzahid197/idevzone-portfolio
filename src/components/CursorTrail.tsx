'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CursorTrail() {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 500, damping: 100 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-difference pointer-events-none z-50 opacity-80"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Trail Effect */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="fixed top-0 left-0 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full pointer-events-none z-40"
        animate={{
          scale: [0.5, 1, 0.5],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}