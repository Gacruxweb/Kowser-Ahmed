import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { WindowState, WindowType } from '@/src/types';
import { WindowsLogo } from './WindowsLogo';
import { 
  User, 
  Briefcase, 
  Code, 
  Mail, 
  Settings,
  LayoutGrid,
  Info,
  ShieldCheck,
  Volume2
} from 'lucide-react';

interface TaskbarProps {
  windows: WindowState[];
  onStartClick: () => void;
  onAppClick: (id: WindowType) => void;
  activeWindowId: WindowType | null;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  onStartClick,
  onAppClick,
  activeWindowId,
}) => {
  const appIcons: Record<WindowType, React.ReactNode> = {
    about: <User size={16} className="text-white" />,
    projects: <Briefcase size={16} className="text-white" />,
    skills: <Code size={16} className="text-white" />,
    contact: <Mail size={16} className="text-white" />,
    settings: <Settings size={16} className="text-white" />,
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[30px] xp-taskbar flex items-center justify-between px-0 z-[1000]">
      <div className="flex items-center h-full">
        {/* Start Button */}
        <button
          onClick={onStartClick}
          className="xp-start-button h-full px-3 flex items-center gap-1.5 group active:brightness-90 transition-all"
        >
          <WindowsLogo size={20} className="drop-shadow-sm" />
          <span className="text-white font-bold italic text-lg drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] lowercase">start</span>
        </button>

        <div className="flex items-center h-full px-2 gap-1">
          {/* App Icons */}
          {windows.filter(win => win.isOpen).map((win) => (
            <button
              key={win.id}
              onClick={() => onAppClick(win.id)}
              className={cn(
                "h-[24px] min-w-[120px] max-w-[160px] px-2 rounded-sm flex items-center gap-2 transition-all xp-app-btn",
                activeWindowId === win.id && "xp-app-btn-active"
              )}
            >
              <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                {appIcons[win.id]}
              </div>
              <span className="text-[11px] text-white truncate font-medium drop-shadow-sm">
                {win.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div className="h-full xp-tray flex items-center px-2 gap-2">
        <div className="flex items-center gap-1.5 px-1">
          <Info size={14} className="text-white opacity-90" />
          <ShieldCheck size={14} className="text-green-400" />
          <Volume2 size={14} className="text-white opacity-90" />
        </div>
        <div className="h-full flex items-center px-2 border-l border-black/10">
          <span className="text-white text-[11px] font-medium drop-shadow-sm">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};
