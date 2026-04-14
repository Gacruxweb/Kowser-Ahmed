import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Power, User, Moon, RotateCcw, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WindowType } from '@/src/types';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAppClick: (id: WindowType) => void;
  onPowerAction: (action: 'sleep' | 'restart' | 'shutdown') => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onAppClick,
  onPowerAction,
}) => {
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);

  const pinnedApps = [
    { id: 'about', name: 'About Me', icon: '👤', color: 'bg-blue-500' },
    { id: 'projects', name: 'Projects', icon: '💼', color: 'bg-orange-500' },
    { id: 'skills', name: 'Skills', icon: '💻', color: 'bg-emerald-500' },
    { id: 'contact', name: 'Contact', icon: '📧', color: 'bg-purple-500' },
    { id: 'settings', name: 'Settings', icon: '⚙️', color: 'bg-zinc-500' },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[900]" onClick={() => { onClose(); setIsPowerMenuOpen(false); }} />
          
          <motion.div
            initial={{ y: 400, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 400, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-8 left-0 w-[380px] h-[480px] bg-[#ece9d8] border-2 border-[#003399] rounded-t-lg z-[1000] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="h-16 xp-title-bar flex items-center px-4 gap-3 border-b border-white/20">
              <div className="w-10 h-10 rounded-md border-2 border-white/40 overflow-hidden shadow-md">
                <img 
                  src="https://storage.googleapis.com/static.miraidemo.com/applet-assets/88a4ad42-ea13-4bdf-8ad4-51d031cd1f98/08643888-0062-4638-89c0-67210e39540c.png" 
                  alt="Kowser Ahmed" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-bold text-lg drop-shadow-md">Kowser Ahmed</span>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex bg-white m-0.5 border border-white/20">
              {/* Left Column (Apps) */}
              <div className="flex-1 p-2 flex flex-col gap-1">
                {pinnedApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => { onAppClick(app.id); onClose(); }}
                    className="flex items-center gap-3 p-2 hover:bg-[#316ac5] hover:text-white transition-colors group rounded-sm"
                  >
                    <div className="w-8 h-8 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {app.icon}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-bold">{app.name}</span>
                    </div>
                  </button>
                ))}
                <div className="mt-auto border-t border-zinc-200 pt-2">
                  <button className="w-full flex items-center justify-between p-2 hover:bg-[#316ac5] hover:text-white rounded-sm text-xs font-bold">
                    All Programs
                    <span className="text-orange-500 group-hover:text-white">▶</span>
                  </button>
                </div>
              </div>

              {/* Right Column (Folders/Settings) */}
              <div className="w-[160px] bg-[#d3e5fa] border-l border-[#7da2ce] p-2 flex flex-col gap-2">
                <button className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white rounded-sm text-[11px] font-bold text-[#003399]">
                  My Documents
                </button>
                <button className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white rounded-sm text-[11px] font-bold text-[#003399]">
                  My Pictures
                </button>
                <button className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white rounded-sm text-[11px] font-bold text-[#003399]">
                  My Music
                </button>
                <div className="h-px bg-[#7da2ce] my-1" />
                <button className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white rounded-sm text-[11px] font-bold text-[#003399]">
                  Control Panel
                </button>
                <button className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white rounded-sm text-[11px] font-bold text-[#003399]">
                  Connect To
                </button>
                <button className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white rounded-sm text-[11px] font-bold text-[#003399]">
                  Printers and Faxes
                </button>
                <div className="h-px bg-[#7da2ce] my-1" />
                <button className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white rounded-sm text-[11px] font-bold text-[#003399]">
                  Help and Support
                </button>
                <button className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white rounded-sm text-[11px] font-bold text-[#003399]">
                  Search
                </button>
                <button className="flex items-center gap-2 p-1 hover:bg-[#316ac5] hover:text-white rounded-sm text-[11px] font-bold text-[#003399]">
                  Run...
                </button>
              </div>
            </div>

            {/* Footer (Power) */}
            <div className="h-12 xp-taskbar flex items-center justify-end px-4 gap-4 border-t border-white/20">
              <div className="relative">
                <button 
                  onClick={() => setIsPowerMenuOpen(!isPowerMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 transition-colors text-white"
                >
                  <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center shadow-sm">
                    <LogOut size={14} />
                  </div>
                  <span className="text-xs font-bold drop-shadow-sm">Log Off</span>
                </button>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setIsPowerMenuOpen(!isPowerMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 transition-colors text-white"
                >
                  <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center shadow-sm">
                    <Power size={14} />
                  </div>
                  <span className="text-xs font-bold drop-shadow-sm">Turn Off Computer</span>
                </button>

                {/* Power Menu Dropdown */}
                <AnimatePresence>
                  {isPowerMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full right-0 mb-2 w-40 bg-[#ece9d8] border-2 border-[#003399] rounded shadow-2xl overflow-hidden z-[1100]"
                    >
                      <button 
                        onClick={() => { onPowerAction('sleep'); setIsPowerMenuOpen(false); onClose(); }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#316ac5] hover:text-white transition-colors text-xs font-bold text-[#003399]"
                      >
                        <Moon size={14} />
                        Stand By
                      </button>
                      <button 
                        onClick={() => { onPowerAction('shutdown'); setIsPowerMenuOpen(false); onClose(); }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#316ac5] hover:text-white transition-colors text-xs font-bold text-[#003399]"
                      >
                        <Power size={14} />
                        Turn Off
                      </button>
                      <button 
                        onClick={() => { onPowerAction('restart'); setIsPowerMenuOpen(false); onClose(); }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#316ac5] hover:text-white transition-colors text-xs font-bold text-[#003399]"
                      >
                        <RotateCcw size={14} />
                        Restart
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

