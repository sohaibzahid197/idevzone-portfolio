'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setVisible(v > 0.1);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* Background circle */}
          <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="rgba(17,17,17,0.8)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                pathLength,
                strokeDasharray: '1 1',
              }}
            />
          </svg>
          <ArrowUp className="w-4 h-4 text-white relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
