import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WindowFrame } from './components/WindowFrame';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { DesktopIcon } from './components/DesktopIcon';
import { ContextMenu } from './components/ContextMenu';
import { WindowState, WindowType } from './types';
import { Square, Minus, X, Layers, Move } from 'lucide-react';
import { About } from './components/apps/About';
import { Projects } from './components/apps/Projects';
import { Skills } from './components/apps/Skills';
import { Resume } from './components/apps/Resume';
import { Contact } from './components/apps/Contact';
import { Settings as SettingsApp } from './components/apps/Settings';
import { MyComputer } from './components/apps/MyComputer';
import { LoginScreen } from './components/LoginScreen';
import { BootScreen } from './components/BootScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HeroBackground } from './components/HeroBackground';
import './styles/theme.css';
import { Fireworks } from './components/ui/fireworks';
import { User, Briefcase, Code, Mail, Settings, Power, Globe, RefreshCw, Compass, FileText } from 'lucide-react';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isWelcoming, setIsWelcoming] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isShutDown, setIsShutDown] = useState(false);

  useEffect(() => {
    if (isBooting) {
      const timer = setTimeout(() => {
        setIsBooting(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isBooting]);

  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'about', title: 'About Me', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'skills', title: 'My Skills', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'resume', title: 'My Resume', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'contact', title: 'Contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'settings', title: 'Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'mycomputer', title: 'My Computer', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  ]);

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState<WindowType | null>(null);
  const [selectedIconId, setSelectedIconId] = useState<WindowType | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    x: number;
    y: number;
    targetAppId: WindowType | null;
    type: 'desktop' | 'taskbar';
  }>({
    show: false,
    x: 0,
    y: 0,
    targetAppId: null,
    type: 'desktop',
  });

  const handleContextMenu = (e: React.MouseEvent, id: WindowType, type: 'desktop' | 'taskbar' = 'desktop') => {
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      targetAppId: id,
      type,
    });
  };

  const handleWindowAction = (id: WindowType, action: 'open' | 'close' | 'minimize' | 'maximize' | 'focus') => {
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        const newZIndex = action === 'focus' || action === 'open' ? maxZIndex + 1 : win.zIndex;
        if (action === 'focus' || action === 'open') setMaxZIndex(newZIndex);
        
        if (action === 'open') {
          setActiveWindowId(id);
          return { ...win, isOpen: true, isMinimized: false, zIndex: newZIndex };
        }
        if (action === 'close') {
          if (activeWindowId === id) setActiveWindowId(null);
          return { ...win, isOpen: false, isMinimized: false, isMaximized: false };
        }
        if (action === 'minimize') {
          setActiveWindowId(null);
          return { ...win, isMinimized: true };
        }
        if (action === 'maximize') {
          return { ...win, isMaximized: !win.isMaximized, zIndex: newZIndex };
        }
        if (action === 'focus') {
          setActiveWindowId(id);
          return { ...win, isMinimized: false, zIndex: newZIndex };
        }
      }
      return win;
    }));
  };

  const renderAppContent = (id: WindowType, isMaximized: boolean) => {
    switch (id) {
      case 'about': return <About isMaximized={isMaximized} />;
      case 'projects': return <Projects isMaximized={isMaximized} />;
      case 'skills': return <Skills isMaximized={isMaximized} />;
      case 'resume': return <Resume isMaximized={isMaximized} />;
      case 'contact': return <Contact isMaximized={isMaximized} />;
      case 'settings': return <SettingsApp />;
      case 'mycomputer': return <MyComputer isMaximized={isMaximized} />;
      default: return null;
    }
  };

  const handlePowerAction = async (action: 'sleep' | 'restart' | 'shutdown' | 'logout') => {
    if (action === 'sleep') {
      setIsSleeping(true);
    } else if (action === 'restart') {
      setIsBooting(true);
      setIsLoggedIn(false);
      setIsWelcoming(false);
      setWindows(prev => prev.map(w => ({ ...w, isOpen: w.id === 'about', isMinimized: false, isMaximized: false })));
    } else if (action === 'shutdown') {
      setIsShutDown(true);
    } else if (action === 'logout') {
      setIsLoggedIn(false);
      setIsStartOpen(false);
    }
  };

  if (isShutDown) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[5000]">
        <Fireworks className="absolute inset-0 z-0 pointer-events-none" />
        <button 
          onClick={() => { setIsShutDown(false); setIsBooting(true); }}
          className="relative z-10 w-[108px] h-[108px] rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white flex flex-col items-center justify-center gap-2 shadow-2xl border border-white/10"
        >
          <Power size={48} />
          <span className="text-sm font-medium">Power On</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {isSleeping && (
        <div 
          className="fixed inset-0 bg-black/90 z-[4000] cursor-pointer"
          onClick={() => setIsSleeping(false)}
        />
      )}
      <AnimatePresence>
        {isBooting ? (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[3000]"
          >
            <BootScreen />
          </motion.div>
        ) : isWelcoming ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[2500]"
          >
            <WelcomeScreen onComplete={() => { setIsLoggedIn(true); setIsWelcoming(false); }} />
          </motion.div>
        ) : !isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[2000]"
          >
            <LoginScreen 
              onLogin={() => setIsWelcoming(true)} 
              onPowerAction={(action) => handlePowerAction(action)}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {isLoggedIn && !isBooting && !isWelcoming && (
        <div className="relative w-screen h-screen overflow-hidden font-sans bg-[#003399]">
          {/* Cinematic Hero Background */}
          <HeroBackground />
          
          {/* Grid Overlay (Mesh Style) - Reduced opacity to not clash with video */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[5]" style={{ backgroundImage: 'linear-gradient(rgba(0, 50, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 50, 255, 0.3) 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
          
          {/* Desktop Icons */}
          <div 
            className="absolute inset-0 p-5 grid grid-cols-[repeat(1,80px)] grid-rows-[repeat(auto-fill,90px)] grid-flow-col gap-[10px] z-1"
            onClick={() => setSelectedIconId(null)}
          >
            <div className="absolute top-4 right-6 pointer-events-none">
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">Kowser Ahmed</p>
            </div>
            <DesktopIcon 
              name="My Computer" 
              icon={<img src="https://icons.iconarchive.com/icons/icons-land/vista-hardware-devices/128/Computer-icon.png" alt="My Computer" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={(e) => { e?.stopPropagation(); setSelectedIconId('mycomputer'); }}
              onDoubleClick={(e) => { e?.stopPropagation(); handleWindowAction('mycomputer', 'open'); }} 
              onContextMenu={(e) => handleContextMenu(e, 'mycomputer')}
              className={selectedIconId === 'mycomputer' ? 'bg-[#003399]/60 hover:bg-[#003399]/70 border border-white/20' : ''}
            />
            <DesktopIcon 
              name="About Me" 
              icon={<img src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-help-about-icon.png" alt="About Me" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={(e) => { e?.stopPropagation(); setSelectedIconId('about'); }}
              onDoubleClick={(e) => { e?.stopPropagation(); handleWindowAction('about', 'open'); }} 
              onContextMenu={(e) => handleContextMenu(e, 'about')}
              className={selectedIconId === 'about' ? 'bg-[#003399]/60 hover:bg-[#003399]/70 border border-white/20' : ''}
            />
            <DesktopIcon 
              name="My Skills" 
              icon={<Code className="text-blue-400" size={32} />} 
              onClick={(e) => { e?.stopPropagation(); setSelectedIconId('skills'); }}
              onDoubleClick={(e) => { e?.stopPropagation(); handleWindowAction('skills', 'open'); }} 
              onContextMenu={(e) => handleContextMenu(e, 'skills')}
              className={selectedIconId === 'skills' ? 'bg-[#003399]/60 hover:bg-[#003399]/70 border border-white/20' : ''}
            />
            <DesktopIcon 
              name="My Resume" 
              icon={<img src="https://icons.iconarchive.com/icons/aha-soft/standard-portfolio/128/Resume-icon.png" alt="My Resume" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={(e) => { e?.stopPropagation(); setSelectedIconId('resume'); }}
              onDoubleClick={(e) => { e?.stopPropagation(); handleWindowAction('resume', 'open'); }} 
              onContextMenu={(e) => handleContextMenu(e, 'resume')}
              className={selectedIconId === 'resume' ? 'bg-[#003399]/60 hover:bg-[#003399]/70 border border-white/20' : ''}
            />
            <DesktopIcon 
              name="My Projects" 
              icon={<img src="https://icons.iconarchive.com/icons/aha-soft/travel/128/globe-icon.png" alt="My Projects" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={(e) => { e?.stopPropagation(); setSelectedIconId('projects'); }}
              onDoubleClick={(e) => { e?.stopPropagation(); handleWindowAction('projects', 'open'); }} 
              onContextMenu={(e) => handleContextMenu(e, 'projects')}
              className={selectedIconId === 'projects' ? 'bg-[#003399]/60 hover:bg-[#003399]/70 border border-white/20' : ''}
            />
            <DesktopIcon 
              name="Contact Me" 
              icon={<img src="https://icons.iconarchive.com/icons/icons-land/vista-hardware-devices/128/Smartphone-icon.png" alt="Contact Me" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={(e) => { e?.stopPropagation(); setSelectedIconId('contact'); }}
              onDoubleClick={(e) => { e?.stopPropagation(); handleWindowAction('contact', 'open'); }} 
              onContextMenu={(e) => handleContextMenu(e, 'contact')}
              className={selectedIconId === 'contact' ? 'bg-[#003399]/60 hover:bg-[#003399]/70 border border-white/20' : ''}
            />
          </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((win) => (
          <WindowFrame
            key={win.id}
            window={win}
            onClose={() => handleWindowAction(win.id, 'close')}
            onMinimize={() => handleWindowAction(win.id, 'minimize')}
            onMaximize={() => handleWindowAction(win.id, 'maximize')}
            onFocus={() => handleWindowAction(win.id, 'focus')}
          >
            {renderAppContent(win.id, win.isMaximized)}
          </WindowFrame>
        ))}
      </AnimatePresence>

      {/* Start Menu */}
      <StartMenu 
        isOpen={isStartOpen} 
        onClose={() => setIsStartOpen(false)}
        onAppClick={(id) => handleWindowAction(id, 'open')}
        onPowerAction={handlePowerAction}
      />

      {/* Taskbar */}
      <Taskbar 
        windows={windows}
        activeWindowId={activeWindowId}
        onStartClick={() => setIsStartOpen(!isStartOpen)}
        onContextMenu={(e, id) => handleContextMenu(e, id, 'taskbar')}
        onAppClick={(id) => {
          const win = windows.find(w => w.id === id);
          if (win?.isOpen && !win.isMinimized && activeWindowId === id) {
            handleWindowAction(id, 'minimize');
          } else {
            handleWindowAction(id, 'open');
          }
        }}
      />

      {/* Desktop Context Menu */}
      <ContextMenu 
        isOpen={contextMenu.show}
        x={contextMenu.x}
        y={contextMenu.y - (contextMenu.type === 'taskbar' ? 160 : 0)} // Offset for taskbar menu to appear above
        onClose={() => setContextMenu({ ...contextMenu, show: false })}
        items={contextMenu.type === 'desktop' ? [
          { label: 'Open', bold: true, onClick: () => contextMenu.targetAppId && handleWindowAction(contextMenu.targetAppId, 'open') },
          { label: 'Send To', hasSubmenu: true, onClick: () => {} },
          { label: 'SEPARATOR', onClick: () => {} },
          { label: 'Cut', disabled: true, onClick: () => {} },
          { label: 'Copy', disabled: true, onClick: () => {} },
          { label: 'SEPARATOR', onClick: () => {} },
          { label: 'Delete', onClick: () => {} },
          { label: 'Rename', onClick: () => {} },
          { label: 'SEPARATOR', onClick: () => {} },
          { label: 'Properties', onClick: () => {} },
        ] : [
          { 
            label: 'Restore', 
            disabled: (() => {
              const win = windows.find(w => w.id === contextMenu.targetAppId);
              return !win?.isMinimized && !win?.isMaximized;
            })(),
            icon: <Layers size={14} />, 
            onClick: () => contextMenu.targetAppId && handleWindowAction(contextMenu.targetAppId, 'focus') 
          },
          { 
            label: 'Move to origin', 
            icon: <Move size={14} />, 
            onClick: () => {
              if (contextMenu.targetAppId) {
                setWindows(prev => prev.map(w => w.id === contextMenu.targetAppId ? { ...w, isMaximized: false, isMinimized: false } : w));
              }
            } 
          },
          { label: 'Size', disabled: true, onClick: () => {} },
          { label: 'SEPARATOR', onClick: () => {} },
          { 
            label: 'Minimize', 
            icon: <Minus size={14} />, 
            disabled: windows.find(w => w.id === contextMenu.targetAppId)?.isMinimized,
            onClick: () => contextMenu.targetAppId && handleWindowAction(contextMenu.targetAppId, 'minimize') 
          },
          { 
            label: 'Maximize', 
            icon: <Square size={14} />, 
            disabled: windows.find(w => w.id === contextMenu.targetAppId)?.isMaximized,
            onClick: () => contextMenu.targetAppId && handleWindowAction(contextMenu.targetAppId, 'maximize') 
          },
          { label: 'SEPARATOR', onClick: () => {} },
          { label: 'Close', icon: <X size={14} />, onClick: () => contextMenu.targetAppId && handleWindowAction(contextMenu.targetAppId, 'close') },
        ]}
      />
    </div>
    )}
    </>
  );
}

