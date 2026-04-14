import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import { WindowsLogo } from './WindowsLogo';

export const BootScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[3000] bg-black flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Center Content */}
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <WindowsLogo size={128} className="mb-4" />
          <div className="text-center">
            <h1 className="text-white text-6xl font-bold tracking-tight leading-none">
              Kowser Ahmed<span className="text-orange-500 text-3xl align-top ml-1">xp</span>
            </h1>
            <p className="text-white italic text-xl mt-2">Visual Designer</p>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-4 border-2 border-zinc-500 rounded-md p-0.5 relative overflow-hidden">
          <motion.div 
            className="flex gap-1 h-full"
            animate={{ x: [-50, 250] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <div className="w-3 h-full bg-blue-600 rounded-sm shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
            <div className="w-3 h-full bg-blue-500 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <div className="w-3 h-full bg-blue-400 rounded-sm shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
          </motion.div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-12 left-12 text-white/80 text-xs font-medium">
        <p>For the best experience</p>
        <p>Enter Full Screen (F11)</p>
      </div>

      <div className="absolute bottom-12 right-12 flex flex-col items-end">
        <h2 className="text-white text-3xl font-bold italic tracking-tighter">
          Portfolio<span className="text-xs align-top ml-0.5">®</span>
        </h2>
        <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Loading Page</p>
      </div>
    </div>
  );
};
