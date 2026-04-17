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

  const apps: { id: WindowType; label: string }[] = [
    { id: 'mycomputer', label: 'My Computer' },
    { id: 'about', label: 'About Me' },
    { id: 'skills', label: 'My Skills' },
    { id: 'projects', label: 'My Projects' },
    { id: 'resume', label: 'My Resume' },
    { id: 'contact', label: 'Contact Me' },
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
    <div className="flex items-center px-1 py-0.5 bg-[#ece9d8] border-b border-white/40 gap-4" ref={menuRef}>
      <div className="flex items-center">
        {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map(item => (
          <div key={item} className="relative">
            <button 
              onClick={() => setActiveMenu(activeMenu === item ? null : item)}
              onMouseEnter={() => activeMenu && setActiveMenu(item)}
              className={cn(
                "px-2 py-0.5 hover:bg-[#316ac5] hover:text-white rounded-sm text-[11px]",
                activeMenu === item && "bg-[#316ac5] text-white"
              )}
            >
              {item}
            </button>

            {/* File Dropdown */}
            {activeMenu === 'File' && item === 'File' && (
              <div 
                className="absolute left-0 top-full mt-0.5 min-w-[160px] bg-white border border-[#808080] py-0.5 z-[10000] shadow-md"
              >
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      onOpenApp(app.id);
                      setActiveMenu(null);
                    }}
                    className="w-full text-left px-2 py-1 text-[11px] text-black hover:bg-[#316ac5] hover:text-white cursor-default"
                  >
                    Open {app.label}
                  </button>
                ))}
                <div className="my-1 border-t border-[#808080]/30 mx-1" />
                <button
                  onClick={() => setActiveMenu(null)}
                  className="w-full text-left px-2 py-1 text-[11px] text-black hover:bg-[#316ac5] hover:text-white cursor-default"
                >
                  Close
                </button>
              </div>
            )}

            {/* Placeholder Dropdowns for others */}
            {activeMenu === item && item !== 'File' && (
              <div 
                className="absolute left-0 top-full mt-0.5 min-w-[120px] bg-white border border-[#808080] py-0.5 z-[10000] shadow-md"
              >
                <div className="px-4 py-2 text-[11px] text-[#808080] italic">No options</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="ml-auto pr-2">
        <WindowsLogo size={16} className="opacity-50" />
      </div>
    </div>
  );
};
