import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface TurnOffModalProps {
  onClose: () => void;
  onRestart: () => void;
  onShutDown: () => void;
  userName: string;
}

export const TurnOffModal: React.FC<TurnOffModalProps> = ({ onClose, onRestart, onShutDown, userName }) => {
  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-[420px] bg-[#003399] border-2 border-white/20 rounded-lg shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="h-12 flex items-center justify-between px-4 bg-[#003399]">
          <h2 className="text-white text-xl font-bold drop-shadow-md">Turn off Windows XP</h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="12 -12 48 48" className="drop-shadow-md">
            <path fill="#03a9f4" d="M34.807,12.511l-3.488,12.077c-3.03-2.052-6.327-3.744-13.318-0.83l3.408-11.945l0.041-0.019C28.414,8.908,31.787,10.447,34.807,12.511z"></path>
            <path fill="#ffc107" d="M36.633,13.68l-3.447,11.943c3.028,2.069,6.383,3.718,13.365,0.805l3.324-11.643C42.76,17.24,39.66,15.731,36.633,13.68z"></path>
            <path fill="#ff5722" d="M35.387,10.337l3.441-11.964C35.8-3.688,32.442-5.344,25.454-2.424L22.011,9.59c2.775-1.153,4.969-1.682,6.806-1.666C31.604,7.942,33.563,9.102,35.387,10.337z"></path>
            <path fill="#7cb342" d="M40.643-0.369l-3.44,12.033c3.018,2.063,6.669,3.752,13.359,0.738L54,0.415C47.021,3.317,43.665,1.688,40.643-0.369z"></path>
          </svg>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gradient-to-b from-[#5a7edc] to-[#4a66cf] p-8 flex justify-center gap-16">
          {/* Restart Button */}
          <button 
            onClick={onRestart}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 bg-[#3c9c3c] border-[2.6px] border-white rounded-[16px] flex items-center justify-center shadow-lg group-hover:brightness-110 transition-all relative">
              <div className="relative w-10 h-10 flex items-center justify-center animate-spin-slow">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1.5 h-3 bg-white rounded-full"
                    style={{ 
                      transform: `rotate(${i * 45}deg) translateY(-12px)`,
                      opacity: 1 - (i * 0.1)
                    }}
                  />
                ))}
              </div>
            </div>
            <span className="text-white font-bold text-sm drop-shadow-md">Restart</span>
          </button>

          {/* Shut Down Button */}
          <button 
            onClick={onShutDown}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 bg-[#cc3333] border-2 border-white rounded-[16px] flex items-center justify-center shadow-lg group-hover:brightness-110 transition-all">
              <div className="w-10 h-10 bg-[#ff4d4d] rounded-full flex items-center justify-center relative">
                <div className="w-7 h-7 border-4 border-white rounded-full flex items-center justify-center">
                  <div className="absolute w-1.5 h-4 bg-white rounded-full -top-1 mt-[5px]" />
                </div>
              </div>
            </div>
            <span className="text-white font-bold text-sm drop-shadow-md">Shut Down</span>
          </button>
        </div>

        {/* Footer */}
        <div className="h-14 bg-[#003399] flex items-center justify-end px-4">
          <button 
            onClick={onClose}
            className="px-6 py-1 bg-white border border-zinc-400 rounded shadow-sm text-sm font-medium hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};
