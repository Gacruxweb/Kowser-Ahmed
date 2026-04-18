import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { WindowsLogo } from './WindowsLogo';
import { WindowType } from '@/src/types';

interface AppMenuBarProps {
  currentAppId: WindowType;
  onOpenApp: (id: WindowType) => void;
}

export const AppMenuBar: React.FC<AppMenuBarProps> = ({ currentAppId, onOpenApp }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const apps: { id: WindowType; label: string; shortcut?: string }[] = [
    { id: 'mycomputer', label: 'My Computer', shortcut: 'Alt+C' },
    { id: 'about', label: 'About Me', shortcut: 'Alt+A' },
    { id: 'skills', label: 'My Skills', shortcut: 'Alt+S' },
    { id: 'projects', label: 'My Projects', shortcut: 'Alt+P' },
    { id: 'resume', label: 'My Resume', shortcut: 'Alt+R' },
    { id: 'contact', label: 'Contact Me', shortcut: 'Alt+M' },
    { id: 'media', label: 'Media Player', shortcut: 'Alt+V' },
    { id: 'doodledev', label: 'DoodleDev', shortcut: 'Alt+D' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    if (activeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenu]);

  return (
    <div className="flex items-center px-1 py-0.5 bg-[#ece9d8] border-b border-white/40 gap-4 relative z-[9999]" ref={menuRef}>
      <div className="flex items-center">
        {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map(item => (
          <div key={item} className="relative">
            <button 
              onClick={() => setActiveMenu(activeMenu === item ? null : item)}
              onMouseEnter={() => activeMenu && setActiveMenu(item)}
              className={cn(
                "px-2 py-0.5 hover:bg-[#316ac5] hover:text-white rounded-sm text-[11px] outline-none",
                activeMenu === item && "bg-[#316ac5] text-white"
              )}
            >
              <span className="first-letter:underline">{item}</span>
            </button>

            {/* File Dropdown */}
            {activeMenu === 'File' && item === 'File' && (
              <div 
                className="absolute left-0 top-full mt-0.5 min-w-[200px] bg-white border border-[#808080] py-0.5 z-[10000] shadow-[2px_2px_5px_rgba(0,0,0,0.3)] select-none"
              >
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      onOpenApp(app.id);
                      setActiveMenu(null);
                    }}
                    className="w-full text-left px-5 py-0.5 text-[11px] text-black hover:bg-[#316ac5] hover:text-white cursor-default flex justify-between items-center group"
                  >
                    <span>Open {app.label}</span>
                    <span className="text-zinc-400 group-hover:text-white/60 ml-4">{app.shortcut}</span>
                  </button>
                ))}
                <div className="my-1 border-t border-[#808080]/30 mx-1" />
                <button
                  onClick={() => setActiveMenu(null)}
                  className="w-full text-left px-5 py-0.5 text-[11px] text-black hover:bg-[#316ac5] hover:text-white cursor-default"
                >
                  Exit
                </button>
              </div>
            )}

            {/* Placeholder Dropdowns for others */}
            {activeMenu === item && item !== 'File' && (
              <div 
                className="absolute left-0 top-full mt-0.5 min-w-[120px] bg-white border border-[#808080] py-0.5 z-[10000] shadow-[2px_2px_5px_rgba(0,0,0,0.3)] select-none"
              >
                <div className="px-4 py-2 text-[11px] text-[#808080] italic">No options available</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="ml-auto pr-2 flex items-center gap-2">
        <div className="h-4 w-px bg-white/40" />
        <WindowsLogo size={16} className="opacity-50" />
      </div>
    </div>
  );
};
