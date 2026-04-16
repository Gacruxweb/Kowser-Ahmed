import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Power, 
  User, 
  Moon, 
  RotateCcw, 
  LogOut, 
  Globe, 
  RefreshCw, 
  Compass, 
  Music, 
  PlayCircle, 
  Palette, 
  Code2, 
  Instagram, 
  Github, 
  Linkedin, 
  Clock, 
  Terminal, 
  Image as ImageIcon, 
  FileText,
  ChevronRight,
  Key
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WindowType } from '@/src/types';
import { UserAvatar } from './UserAvatar';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAppClick: (id: WindowType) => void;
  onPowerAction: (action: 'sleep' | 'restart' | 'shutdown' | 'logout') => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onAppClick,
  onPowerAction,
}) => {
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);

  const leftApps: { id: string; name: string; subtitle?: string; icon: React.ReactNode; color: string }[] = [
    { id: 'projects', name: 'My Projects', subtitle: 'View my work', icon: <Globe className="text-blue-500" size={24} />, color: 'text-blue-600' },
    { id: 'contact', name: 'Contact Me', subtitle: 'Send me a message', icon: <RefreshCw className="text-blue-400" size={24} />, color: 'text-blue-600' },
    { id: 'about', name: 'About Me', icon: <Compass className="text-orange-500" size={24} />, color: 'text-blue-600' },
    { id: 'music', name: 'Music Player', icon: <Music className="text-zinc-600" size={24} />, color: 'text-blue-600' },
    { id: 'media', name: 'Media Player', icon: <PlayCircle className="text-blue-600" size={24} />, color: 'text-blue-600' },
    { id: 'paint', name: 'Paint', icon: <Palette className="text-red-500" size={24} />, color: 'text-blue-600' },
    { id: 'doodle', name: 'DoodleDev', icon: <Code2 className="text-green-600" size={24} />, color: 'text-blue-600' },
  ];

  const rightApps = [
    { id: 'instagram', name: 'Instagram', icon: <Instagram className="text-pink-600" size={18} /> },
    { id: 'github', name: 'Github', icon: <Github className="text-zinc-900" size={18} /> },
    { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin className="text-blue-700" size={18} /> },
    { type: 'separator' },
    { id: 'recent', name: 'Recently Used', icon: <Clock className="text-zinc-500" size={18} />, hasArrow: true },
    { id: 'cmd', name: 'Command Prompt', icon: <Terminal className="text-zinc-800" size={18} /> },
    { id: 'viewer', name: 'Image Viewer', icon: <ImageIcon className="text-emerald-600" size={18} /> },
    { id: 'resume', name: 'My Resume', icon: <FileText className="text-red-500" size={18} /> },
  ];

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
            className="fixed bottom-8 left-0 w-[380px] h-[480px] bg-[#ece9d8] border border-[#003399] rounded-[9px] z-[1000] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="h-16 xp-title-bar flex items-center px-4 gap-3 border-b border-white/20">
              <div className="w-12 h-12 rounded-sm overflow-hidden shadow-md flex items-center justify-center bg-white/10 p-0.5">
                <UserAvatar className="w-full h-full object-cover text-white border-none" />
              </div>
              <span className="text-white font-bold text-xl drop-shadow-md tracking-tight">Kowser Ahmed</span>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex bg-white m-0.5 border border-white/20 overflow-hidden">
              {/* Left Column (Apps) */}
              <div className="flex-1 p-1 flex flex-col">
                <div className="flex-1 flex flex-col gap-0.5">
                  {leftApps.map((app, index) => (
                    <button
                      key={app.id}
                      onClick={() => { 
                        if (app.id === 'projects' || app.id === 'contact' || app.id === 'about') {
                          onAppClick(app.id as WindowType);
                        }
                        onClose(); 
                      }}
                      className={cn(
                        "flex items-center gap-3 hover:bg-[#316ac5] hover:text-white transition-colors group rounded-sm text-left",
                        index === 0 ? "pl-2 py-1 pr-2" : 
                        index === 1 ? "py-1 pl-[9px] pr-2" : 
                        "py-1 px-2"
                      )}
                    >
                      <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {app.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold leading-tight">{app.name}</span>
                        {app.subtitle && (
                          <span className="text-[11px] opacity-60 group-hover:text-white/80 leading-tight">{app.subtitle}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-auto border-t border-zinc-200 pt-1 px-1">
                  <button className="w-full flex items-center justify-between p-2 hover:bg-[#316ac5] hover:text-white rounded-sm text-[13px] font-bold">
                    <span>All Programs</span>
                    <div className="w-5 h-5 bg-green-600 rounded-sm flex items-center justify-center">
                      <ChevronRight size={14} className="text-white fill-white" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Right Column (Folders/Settings) */}
              <div className="w-[180px] bg-[#d3e5fa] border-l border-[#7da2ce] p-1 flex flex-col gap-0.5">
                {rightApps.map((app, idx) => {
                  if (app.type === 'separator') {
                    return <div key={idx} className="h-px bg-[#7da2ce] my-1 mx-2" />;
                  }
                  return (
                    <button
                      key={app.id}
                      className="flex items-center gap-2 px-2 py-1 hover:bg-[#316ac5] hover:text-white rounded-sm text-[12px] font-bold text-[#003399] text-left group"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        {app.icon}
                      </div>
                      <span className="flex-1 group-hover:text-white">{app.name}</span>
                      {app.hasArrow && <ChevronRight size={12} className="opacity-60 group-hover:text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer (Power) */}
            <div className="h-14 xp-taskbar flex items-center justify-end px-4 gap-6 border-t border-white/20">
              <button 
                onClick={() => onPowerAction('logout')}
                className="flex items-center gap-2 pl-[2px] pr-[5px] h-[36px] rounded hover:bg-white/10 transition-colors text-white group"
              >
                <div className="w-8 h-8 bg-orange-500 rounded-[8px] flex items-center justify-center shadow-md border border-white/20 group-hover:brightness-110 shrink-0">
                  <Key size={18} className="text-white" />
                </div>
                <span className="text-sm font-bold drop-shadow-sm">Log Off</span>
              </button>
              
              <button 
                onClick={() => onPowerAction('shutdown')}
                className="flex items-center gap-2 pl-[2px] pr-0 w-[118px] h-[36px] rounded hover:bg-white/10 transition-colors text-white group"
              >
                <div className="w-8 h-8 bg-red-600 rounded-[8px] flex items-center justify-center shadow-md border border-white/20 group-hover:brightness-110 shrink-0">
                  <Power size={18} className="text-white" />
                </div>
                <span className="text-[14px] w-[77.4219px] h-[17px] font-bold drop-shadow-sm text-left leading-tight">Shut Down</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

