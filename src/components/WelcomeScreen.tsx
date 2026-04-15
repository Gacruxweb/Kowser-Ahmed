import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // Show for 2 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[2500] flex flex-col bg-[#003399] overflow-hidden select-none">
      {/* Top Band */}
      <div className="h-[15%] w-full bg-[#002266] border-b border-[#0044cc]" />

      {/* Middle Section */}
      <div className="flex-1 w-full flex items-center justify-center relative">
        {/* Background Grid Pattern (Matching Login Screen) */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }} 
        />
        
        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <h1 className="text-white text-7xl font-bold italic tracking-tight drop-shadow-[2px_2px_4px_rgba(0,0,0,0.4)]">
            welcome
          </h1>
        </motion.div>

        {/* Thin Orange Line at bottom of middle section */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
      </div>

      {/* Bottom Band */}
      <div className="h-[15%] w-full bg-[#002266] border-t border-[#0044cc]" />
    </div>
  );
};
