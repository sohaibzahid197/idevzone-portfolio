'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Download, Eye } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const fullText = "I build modern, fast, and scalable digital products using React Native, Next.js, and AI.";
  const typingSpeed = 50;
  const deletingSpeed = 30;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayText(fullText.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (currentIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (currentIndex === 0 && isDeleting) {
        setIsDeleting(false);
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, fullText, typingSpeed, deletingSpeed]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Parallax Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20"
        />
      </div>

      {/* Interactive Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => {
          // Use deterministic positioning based on index to avoid hydration mismatch
          const left = (i * 3.33) % 100;
          const top = (i * 7.77) % 100;
          const scale = 1 + (i % 3) * 0.5;
          const duration = 8 + (i % 4);
          const delay = i * 0.2;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
              animate={{
                x: [0, (i % 2 === 0 ? 1 : -1) * 100],
                y: [0, (i % 3 === 0 ? 1 : -1) * 100],
                scale: [1, scale, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
            />
          );
        })}
      </div>

      {/* Parallax Background Elements */}
      <motion.div
        style={{
          x: useTransform(springX, [-50, 50], [-20, 20]),
          y: useTransform(springY, [-50, 50], [-20, 20]),
        }}
        className="absolute inset-0"
      >
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-blue-600 dark:text-blue-400 font-medium"
            >
              Hello, I'm
            </motion.div>

            {/* Name with Enhanced Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-600 dark:from-white dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
              }}
            >
              Sohaib Zahid
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 font-medium"
            >
              Full Stack Web & Mobile App Developer | Founder of iDevZone
            </motion.h2>

            {/* Enhanced Typewriter Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed min-h-[3rem]"
            >
              <span className="font-medium">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-1 text-blue-500 text-2xl"
              >
                |
              </motion.span>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <motion.button
                onClick={() => window.open('https://github.com/sohaibzahid197', '_blank')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  View GitHub
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              <motion.button
                onClick={() => window.open('https://www.linkedin.com/in/isohaibzahid/', '_blank')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-full transition-all duration-300 backdrop-blur-sm bg-white/10 dark:bg-slate-900/10 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Connect on LinkedIn
                </span>
                <motion.div
                  className="absolute inset-0 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"
                  initial={{ scale: 0 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToProjects}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-3 rounded-full hover:bg-white/10 dark:hover:bg-slate-800/10 group"
            >
              <ChevronDown className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
