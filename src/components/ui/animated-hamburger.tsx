'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

export function AnimatedHamburger({ isOpen, onClick }: AnimatedHamburgerProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 rounded-full hover:bg-secondary/50 transition-colors duration-300 flex items-center justify-center"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <div className="w-6 h-5 flex flex-col justify-center items-center">
        {/* Top Line */}
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-0.5 bg-black rounded-full mb-1.5 origin-center"
        />
        
        {/* Middle Line */}
        <motion.span
          animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-0.5 bg-black rounded-full mb-1.5"
        />
        
        {/* Bottom Line */}
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-full h-0.5 bg-black rounded-full origin-center"
        />
      </div>
    </button>
  );
}
