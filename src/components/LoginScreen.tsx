import React from 'react';
import { motion } from 'motion/react';
import { Power } from 'lucide-react';
import { WindowsLogo } from './WindowsLogo';
import { UserAvatar } from './UserAvatar';
import { TurnOffModal } from './TurnOffModal';
import { AnimatePresence } from 'motion/react';

interface LoginScreenProps {
  onLogin: () => void;
  onPowerAction: (action: 'restart' | 'shutdown') => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onPowerAction }) => {
  const [showTurnOff, setShowTurnOff] = React.useState(false);
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
            backgroundSize: '10px 10px' 
          }} 
        />
        
        {/* Center Content */}
        <div className="flex items-center gap-16 z-10">
          {/* Left Side: Logo & Branding */}
          <div className="flex flex-col items-center border-r border-white/20 pr-16 py-8">
            <div className="flex items-center justify-center mb-1">
              <WindowsLogo 
                size={180} 
                className="ml-[160px]" 
                style={{ width: '180px', height: '172px' }} 
              />
            </div>
            <div className="text-center">
              <div className="relative inline-block">
                <h1 
                  className="text-white font-bold tracking-tighter leading-none"
                  style={{ fontSize: '45px' }}
                >
                  Kowser Ahmed
                </h1>
                <span 
                  className="absolute -top-1 -right-14 text-[#ff4d4d] font-bold lowercase tracking-tighter text-left"
                  style={{ fontSize: '38px', marginRight: '8px', marginBottom: '0px', paddingLeft: '0px', marginTop: '-17px' }}
                >
                  xp
                </span>
              </div>
              <p 
                className="text-white italic mt-2 font-medium text-left"
                style={{ fontSize: '27px' }}
              >
                Visual Designer
              </p>
            </div>
            <p className="text-[#eaeaea] text-xl mt-12">To begin, click on Kowser Ahmed to log in</p>
          </div>

          {/* Right Side: User Profile */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onLogin}
            className="flex items-center gap-4 p-2 pr-8 rounded-lg hover:bg-gradient-to-r hover:from-[#1d4ed8] hover:to-[#1e3a8a] transition-all group"
          >
            <div className="w-20 h-20 rounded-md overflow-hidden shadow-lg transition-colors flex items-center justify-center">
              <UserAvatar className="w-full h-full object-cover text-white border-none" />
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
        <button 
          onClick={() => setShowTurnOff(true)}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center">
            <Power size={18} className="text-white" />
          </div>
          <span className="text-sm font-medium">Restart Kowser Ahmed XP</span>
        </button>

        <div className="text-right text-white/60 text-xs max-w-xs">
          <p>After you log on, the system's yours to explore.</p>
          <p>Every detail has been designed with a purpose.</p>
        </div>
      </div>

      <AnimatePresence>
        {showTurnOff && (
          <TurnOffModal 
            userName="Kowser Ahmed"
            onClose={() => setShowTurnOff(false)}
            onRestart={() => {
              setShowTurnOff(false);
              onPowerAction('restart');
            }}
            onShutDown={() => {
              setShowTurnOff(false);
              onPowerAction('shutdown');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
