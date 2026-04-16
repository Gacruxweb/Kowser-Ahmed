import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WindowFrame } from './components/WindowFrame';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { DesktopIcon } from './components/DesktopIcon';
import { WindowState, WindowType } from './types';
import { About } from './components/apps/About';
import { Projects } from './components/apps/Projects';
import { Skills } from './components/apps/Skills';
import { Contact } from './components/apps/Contact';
import { Settings as SettingsApp } from './components/apps/Settings';
import { LoginScreen } from './components/LoginScreen';
import { BootScreen } from './components/BootScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HeroBackground } from './components/HeroBackground';
import './styles/theme.css';
import { User, Briefcase, Code, Mail, Settings, Power } from 'lucide-react';

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
    { id: 'skills', title: 'Skills', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'contact', title: 'Contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'settings', title: 'Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  ]);

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState<WindowType | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);

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

  const renderAppContent = (id: WindowType) => {
    switch (id) {
      case 'about': return <About />;
      case 'projects': return <Projects />;
      case 'skills': return <Skills />;
      case 'contact': return <Contact />;
      case 'settings': return <SettingsApp />;
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
        <button 
          onClick={() => { setIsShutDown(false); setIsBooting(true); }}
          className="w-[108px] h-[108px] rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white flex flex-col items-center justify-center gap-2"
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
        <div className="relative w-screen h-screen overflow-hidden font-sans bg-background">
          {/* Cinematic Hero Background */}
          <HeroBackground />
          
          {/* Grid Overlay (Mesh Style) - Reduced opacity to not clash with video */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[5]" style={{ backgroundImage: 'linear-gradient(rgba(0, 50, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 50, 255, 0.3) 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
          
          {/* Desktop Icons */}
          <div className="absolute inset-0 p-5 grid grid-cols-[repeat(1,80px)] grid-rows-[repeat(auto-fill,90px)] grid-flow-col gap-[10px] z-1">
            <div className="absolute top-4 right-6 pointer-events-none">
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">Kowser Ahmed</p>
            </div>
            <DesktopIcon 
              name="About Me" 
              icon={<img src="https://upload.wikimedia.org/wikipedia/en/1/1a/My_Computer_XP.png" className="w-full h-full object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => handleWindowAction('about', 'open')} 
            />
            <DesktopIcon 
              name="My Resume" 
              icon={<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png" className="w-full h-full object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => handleWindowAction('skills', 'open')} 
            />
            <DesktopIcon 
              name="My Projects" 
              icon={<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Internet_Explorer_6_logo.svg/1200px-Internet_Explorer_6_logo.svg.png" className="w-full h-full object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => handleWindowAction('projects', 'open')} 
            />
            <DesktopIcon 
              name="Contact Me" 
              icon={<img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/My_Network_Places_XP.png/120px-My_Network_Places_XP.png" className="w-full h-full object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => handleWindowAction('contact', 'open')} 
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
            {renderAppContent(win.id)}
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
        onAppClick={(id) => {
          const win = windows.find(w => w.id === id);
          if (win?.isOpen && !win.isMinimized && activeWindowId === id) {
            handleWindowAction(id, 'minimize');
          } else {
            handleWindowAction(id, 'open');
          }
        }}
      />
    </div>
    )}
    </>
  );
}

