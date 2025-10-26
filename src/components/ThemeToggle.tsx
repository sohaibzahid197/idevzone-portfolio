'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 w-9 h-9" />
    );
  }

  const toggleTheme = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2 rounded-lg bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden group"
      aria-label="Toggle dark mode"
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Icon Container */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {currentTheme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white/20 dark:bg-white/10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}
