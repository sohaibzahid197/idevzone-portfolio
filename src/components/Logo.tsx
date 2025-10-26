'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', showIcon = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-2 font-bold ${sizeClasses[size]} ${className}`}
    >
      {showIcon && (
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`${iconSizeClasses[size]} bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-mono`}
        >
          {'</>'}
        </motion.div>
      )}
      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
        iDevZone
      </span>
    </motion.div>
  );
}
