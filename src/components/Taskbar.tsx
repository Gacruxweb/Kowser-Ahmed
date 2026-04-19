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
  Volume2,
  FileText,
  Terminal,
  Play,
  Music,
  Image as ImageIcon
} from 'lucide-react';

interface TaskbarProps {
  windows: WindowState[];
  onStartClick: () => void;
  onAppClick: (id: string) => void;
  onContextMenu: (e: React.MouseEvent, id: string) => void;
  activeWindowId: string | null;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  onStartClick,
  onAppClick,
  onContextMenu,
  activeWindowId,
}) => {
  const appIcons: Record<WindowType, React.ReactNode> = {
    about: <img src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-help-about-icon.png" alt="About Me" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />,
    projects: <img src="https://icons.iconarchive.com/icons/aha-soft/travel/128/globe-icon.png" alt="My Projects" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />,
    skills: <Code size={16} className="text-white" />,
    resume: <img src="https://icons.iconarchive.com/icons/aha-soft/standard-portfolio/128/Resume-icon.png" alt="My Resume" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />,
    contact: <img src="https://icons.iconarchive.com/icons/icons-land/vista-hardware-devices/128/Smartphone-icon.png" alt="Contact Me" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />,
    settings: <Settings size={16} className="text-white" />,
    mycomputer: <img src="https://icons.iconarchive.com/icons/icons-land/vista-hardware-devices/128/Computer-icon.png" alt="My Computer" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />,
    'project-detail': <FileText size={16} className="text-white" />,
    media: <div className="bg-red-600 rounded-full w-3.5 h-3.5 flex items-center justify-center"><Play size={8} className="text-white ml-0.5" fill="white" /></div>,
    music: <div className="bg-blue-600 rounded-full w-3.5 h-3.5 flex items-center justify-center"><Music size={8} className="text-white" /></div>,
    doodledev: <Code size={16} className="text-white" />,
    paint: <img src="https://icons.iconarchive.com/icons/google/noto-emoji-activities/128/52733-artist-palette-icon.png" alt="Paint" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />,
    pinball: <img src="https://icons.iconarchive.com/icons/gartoon-team/gartoon-apps/128/pinball-icon.png" alt="Pinball" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />,
    solitaire: <img src="https://icons.iconarchive.com/icons/icons8/windows-8/128/Gaming-Cards-icon.png" alt="Solitaire" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />,
    angrybirds: <img src="https://icons.iconarchive.com/icons/femfoyou/angry-birds/128/angry-bird-icon.png" alt="Angry Birds" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />,
    redball: <img src="https://icons.iconarchive.com/icons/hopstarter/scrap/128/Aqua-Ball-Red-icon.png" alt="Red Ball" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />,
    cmd: <Terminal size={16} className="text-white" />,
    viewer: <ImageIcon size={16} className="text-white" />,
    browser: <img src="https://icons.iconarchive.com/icons/tatice/cristal-intense/128/Internet-Explorer-icon.png" alt="Internet Explorer" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />,
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[32px] xp-taskbar flex items-center justify-between px-0 z-[1000]">
      <div className="flex items-center h-full">
        {/* Start Button */}
        <button
          onClick={onStartClick}
          className="xp-start-button h-full px-3 flex items-center gap-1.5 group active:brightness-90 transition-all"
        >
          <WindowsLogo size={20} className="drop-shadow-sm" />
          <span className="text-white font-bold italic text-base drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] lowercase">start</span>
        </button>

        <div className="flex items-center h-full px-2 gap-1">
          {/* App Icons */}
          {windows.filter(win => win.isOpen).map((win) => (
            <button
              key={win.id}
              onClick={() => onAppClick(win.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                onContextMenu(e, win.id);
              }}
              className={cn(
                "h-[25px] min-w-[110px] max-w-[150px] px-2 rounded-sm flex items-center gap-1.5 transition-all xp-app-btn",
                activeWindowId === win.id && "xp-app-btn-active"
              )}
            >
              <div className="w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center">
                {appIcons[win.type as WindowType]}
              </div>
              <span className="text-[10px] text-white truncate font-medium drop-shadow-sm">
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
          <span className="text-white text-[10px] font-medium drop-shadow-sm">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};
