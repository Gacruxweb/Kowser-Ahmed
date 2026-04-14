import React from 'react';
import { motion } from 'motion/react';
import { Power } from 'lucide-react';
import { WindowsLogo } from './WindowsLogo';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="fixed inset-0 z-[2000] flex flex-col bg-[#003399] overflow-hidden select-none">
      {/* Top Band */}
      <div className="h-[15%] w-full bg-[#002266] border-b border-[#0044cc]" />

      {/* Middle Section */}
      <div className="flex-1 w-full flex items-center justify-center relative">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }} 
        />
        
        {/* Center Content */}
        <div className="flex items-center gap-16 z-10">
          {/* Left Side: Logo & Branding */}
          <div className="flex flex-col items-start border-r border-white/20 pr-16 py-8">
            <div className="flex items-center gap-2 mb-2">
              <WindowsLogo size={200} />
            </div>
            <div className="text-left">
              <h1 className="text-white text-5xl font-bold tracking-tight leading-none">
                Kowser Ahmed<span className="text-orange-500 text-2xl align-top ml-1">xp</span>
              </h1>
              <p className="text-white/80 text-lg font-medium">Visual Designer</p>
            </div>
            <p className="text-[#eaeaea] text-xl mt-8">To begin, click on Kowser Ahmed to log in</p>
          </div>

          {/* Right Side: User Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogin}
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/10 transition-colors group"
          >
            <div className="w-20 h-20 rounded-md border-2 border-white/40 overflow-hidden shadow-lg group-hover:border-white transition-colors">
              <img 
                src="https://storage.googleapis.com/static.miraidemo.com/applet-assets/88a4ad42-ea13-4bdf-8ad4-51d031cd1f98/08643888-0062-4638-89c0-67210e39540c.png" 
                alt="Kowser Ahmed" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h2 className="text-white text-2xl font-semibold">Kowser Ahmed</h2>
              <p className="text-white/70 text-base">Visual Designer</p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Bottom Band */}
      <div className="h-[15%] w-full bg-[#002266] border-t border-[#0044cc] flex items-center justify-between px-12">
        <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center">
            <Power size={18} className="text-white" />
          </div>
          <span className="text-sm font-medium">Restart Kowser Ahmed XP</span>
        </button>

        <div className="text-right text-white/60 text-xs max-w-xs">
          <p className="text-white/40 uppercase tracking-widest mb-1">Log In Page</p>
          <p>After you log on, the system's yours to explore.</p>
          <p>Every detail has been designed with a purpose.</p>
        </div>
      </div>
    </div>
  );
};
