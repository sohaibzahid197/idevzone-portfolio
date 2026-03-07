'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <motion.a
      href="#home"
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-2.5 font-bold ${sizeClasses[size]} ${className}`}
    >
      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-mono font-bold tracking-tighter">
        {'</>'}
      </div>
      <span className="text-white tracking-tight">
        iDev<span className="text-blue-400">Zone</span>
      </span>
    </motion.a>
  );
}
