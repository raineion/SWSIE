"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ 
  children, 
  className = ""
}: PageTransitionProps) {
  const pathname = usePathname();
  
  // Improved page transition that works better with child animations
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.25,
        ease: "easeInOut",
        when: "beforeChildren" // Ensure this runs before children animations
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.15,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
