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
import { ProjectDetail } from './components/apps/ProjectDetail';
import { MediaPlayer } from './components/apps/MediaPlayer';
import { DoodleDev } from './components/apps/DoodleDev';
import { Paint } from './components/apps/Paint';
import { CommandPrompt } from './components/apps/CommandPrompt';
import { ImageViewer } from './components/apps/ImageViewer';
import { Browser } from './components/Browser';
import { LoginScreen } from './components/LoginScreen';
import { CreateItemModal } from './components/CreateItemModal';
import { projects } from './projectsData';
import { BootScreen } from './components/BootScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HeroBackground } from './components/HeroBackground';
import './styles/theme.css';
import { Fireworks } from './components/ui/fireworks';
import { cn } from '@/lib/utils';
import { User, Briefcase, Code, Mail, Settings, Power, Globe, RefreshCw, Compass, FileText, Terminal } from 'lucide-react';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isWelcoming, setIsWelcoming] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isShutDown, setIsShutDown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (isBooting) {
      const timer = setTimeout(() => {
        setIsBooting(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isBooting]);

  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'about', type: 'about', title: 'About Me', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'projects', type: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'skills', type: 'skills', title: 'My Skills', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'resume', type: 'resume', title: 'My Resume', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'contact', type: 'contact', title: 'Contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'settings', type: 'settings', title: 'Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'mycomputer', type: 'mycomputer', title: 'My Computer', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'media', type: 'media', title: 'Media Player', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'doodledev', type: 'doodledev', title: 'DoodleDev', isOpen: false, isMinimized: false, isMaximized: true, zIndex: 1 },
    { id: 'paint', type: 'paint', title: 'Paint', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'pinball', type: 'pinball', title: 'Pinball', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'solitaire', type: 'solitaire', title: 'Solitaire', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'angrybirds', type: 'angrybirds', title: 'Angry Birds (Coming Soon)', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'redball', type: 'redball', title: 'Red Ball (Coming Soon)', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'cmd', type: 'cmd', title: 'Command Prompt', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'browser', type: 'browser', title: 'Internet Explorer', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  ]);

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const [refreshKey, setRefreshKey] = useState(0);

  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    x: number;
    y: number;
    targetAppId: string | null;
    type: 'desktop' | 'taskbar' | 'empty-desktop';
  }>({
    show: false,
    x: 0,
    y: 0,
    targetAppId: null,
    type: 'desktop',
  });

  const handleContextMenu = (e: React.MouseEvent, id: string | null, type: 'desktop' | 'taskbar' | 'empty-desktop' = 'desktop') => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      targetAppId: id,
      type,
    });
  };

  const handleWindowAction = (id: string, action: 'open' | 'close' | 'minimize' | 'maximize' | 'focus', type?: WindowType, title?: string, params?: any) => {
    setWindows(prev => {
      const exists = prev.find(win => win.id === id);
      
      if (!exists && action === 'open') {
        const newZIndex = maxZIndex + 1;
        setMaxZIndex(newZIndex);
        setActiveWindowId(id);

        // Auto-discovery for projects
        if (!type && id.startsWith('project-')) {
          const pId = id.replace('project-', '');
          const project = projects.find(p => p.id === pId);
          if (project) {
            type = 'project-detail';
            title = `Project: ${project.title}`;
            params = { projectId: pId };
          }
        }

        if (type) {
          const newWin: WindowState = {
            id,
            type,
            title: title || id,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: newZIndex,
            params
          };
          return [...prev, newWin];
        }
      }

      return prev.map(win => {
      if (win.id === id) {
        const newZIndex = action === 'focus' || action === 'open' ? maxZIndex + 1 : win.zIndex;
        if (action === 'focus' || action === 'open') setMaxZIndex(newZIndex);
        
        if (action === 'open') {
          setActiveWindowId(id);
          return { 
            ...win, 
            isOpen: true, 
            isMinimized: false, 
            zIndex: newZIndex,
            title: title || win.title,
            params: params || win.params
          };
        }
        if (action === 'close') {
          if (activeWindowId === id) setActiveWindowId(null);
          // For dynamic windows (project-detail), we might want to remove them from state
          // but keeping them in state with isOpen: false is also fine for XP feel (history)
          // However, the request says "multiple projects can be open", and usually closes should remove them if they are temp.
          // Let's just set isOpen to false for now.
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
    });
  });
  };

  const renderAppContent = (window: WindowState) => {
    const onOpenApp = (targetId: string, type?: WindowType, title?: string, params?: any) => 
      handleWindowAction(targetId, 'open', type, title, params);

    switch (window.type) {
      case 'about': return <About isMaximized={window.isMaximized} onOpenApp={onOpenApp} />;
      case 'projects': return (
        <Projects 
          isMaximized={window.isMaximized} 
          onOpenApp={onOpenApp} 
          onOpenProject={(pId, pTitle) => handleWindowAction(`project-${pId}`, 'open', 'project-detail', `Project: ${pTitle}`, { projectId: pId })}
          onContextMenu={(e, pId) => handleContextMenu(e, `project-${pId}`, 'desktop')}
        />
      );
      case 'skills': return <Skills isMaximized={window.isMaximized} onOpenApp={onOpenApp} />;
      case 'resume': return <Resume isMaximized={window.isMaximized} onOpenApp={onOpenApp} />;
      case 'contact': return <Contact isMaximized={window.isMaximized} onOpenApp={onOpenApp} />;
      case 'settings': return <SettingsApp />;
      case 'mycomputer': return <MyComputer isMaximized={window.isMaximized} onOpenApp={onOpenApp} />;
      case 'project-detail': return <ProjectDetail projectId={window.params?.projectId} isMaximized={window.isMaximized} onClose={() => handleWindowAction(window.id, 'close')} />;
      case 'media': return <MediaPlayer isMaximized={window.isMaximized} initialUrl={window.params?.url} initialType={window.params?.type} onOpenApp={onOpenApp} />;
      case 'viewer': return <ImageViewer images={window.params?.images} initialIndex={window.params?.initialIndex} isMaximized={window.isMaximized} />;
      case 'browser': return <Browser isMaximized={window.isMaximized} initialUrl={window.params?.url} onOpenApp={onOpenApp} />;
      case 'doodledev': return <DoodleDev isMaximized={window.isMaximized} onOpenApp={onOpenApp} />;
      case 'paint': return <Paint isMaximized={window.isMaximized} />;
      case 'pinball': return (
        <div className="w-full h-full bg-black overflow-hidden relative">
          <iframe 
            src="https://www.247pinball.com/" 
            className="w-full h-full border-0" 
            title="247 Pinball"
            allow="autoplay; fullscreen"
            referrerPolicy="no-referrer"
          />
        </div>
      );
      case 'solitaire': return (
        <div className="w-full h-full bg-[#1b5e20] overflow-hidden relative">
          <iframe 
            src="https://www.google.com/logos/fnbx/solitaire/standalone.4.html?hl=en&origin=www.google.com" 
            className="w-full h-full border-0" 
            title="Google Solitaire"
            allow="autoplay; fullscreen"
            referrerPolicy="no-referrer"
          />
        </div>
      );
      case 'angrybirds': return (
        <div className="w-full h-full bg-[#ECE9D8] flex flex-col items-center justify-center p-8 text-center select-none">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#003399 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <motion.img 
            src="https://icons.iconarchive.com/icons/femfoyou/angry-birds/128/angry-bird-icon.png" 
            alt="Angry Birds" 
            className="w-24 h-24 mb-6 drop-shadow-xl"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            referrerPolicy="no-referrer"
          />
          <h2 className="text-3xl font-bold text-[#003399] mb-4 tracking-tight" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>
            Angry Birds XP
          </h2>
          
          <div className="flex flex-col items-center gap-3">
            <div className="w-64 h-5 bg-white border border-[#919B9C] p-[2px] shadow-inner rounded-sm overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#215CF3] via-[#7196F9] to-[#215CF3] w-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="text-[#CC6600] font-bold text-lg italic animate-pulse">Coming Soon!</p>
          </div>

          <div className="mt-8 p-4 bg-white/50 border border-white/80 rounded-lg shadow-sm max-w-sm backdrop-blur-sm">
            <p className="text-sm text-[#444] leading-relaxed">
              Our feathered friends are currently stuck in the <span className="font-bold">Windows XP activation screen</span>. 
              The update is being rolled out via dial-up connection. Please stand by.
            </p>
          </div>
          
          <div className="absolute bottom-4 text-[10px] text-[#919B9C] font-mono">
            BUILD 2024.04.17-DEV_VERSION
          </div>
        </div>
      );
      case 'redball': return (
        <div className="w-full h-full bg-[#ECE9D8] flex flex-col items-center justify-center p-8 text-center select-none">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C40000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <motion.img 
            src="https://icons.iconarchive.com/icons/hopstarter/scrap/128/Aqua-Ball-Red-icon.png" 
            alt="Red Ball" 
            className="w-24 h-24 mb-6 drop-shadow-xl"
            initial={{ y: -200, bounce: 0.5 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", bounce: 0.6, duration: 1 }}
            referrerPolicy="no-referrer"
          />
          <h2 className="text-3xl font-bold text-[#C40000] mb-4 tracking-tight" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>
            Red Ball Adventure
          </h2>
          
          <div className="flex flex-col items-center gap-3">
            <div className="w-64 h-5 bg-white border border-[#919B9C] p-[2px] shadow-inner rounded-sm overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#C40000] via-[#FF4D4D] to-[#C40000] w-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="text-[#CC6600] font-bold text-lg italic animate-pulse">Under Maintenance</p>
          </div>

          <div className="mt-8 p-4 bg-white/50 border border-white/80 rounded-lg shadow-sm max-w-sm backdrop-blur-sm">
            <p className="text-sm text-[#444] leading-relaxed font-medium">
              The ball has rolled out of bounds! 🔴
              <br /><br />
              We are currently optimizing the physics engine for <span className="text-[#C40000] font-bold">DirectX 9.0c</span>. Please check back later.
            </p>
          </div>
          
          <div className="absolute bottom-4 text-[10px] text-[#919B9C] font-mono">
            ENGINE_STATUS: CALIBRATING_GRAVITY
          </div>
        </div>
      );
      case 'cmd': return <CommandPrompt isMaximized={window.isMaximized} />;
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
          className="absolute bottom-16 right-16 z-10 w-[120px] h-[120px] rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-white flex flex-col items-center justify-center gap-2 shadow-2xl border border-white/10"
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
            key={refreshKey}
            className="absolute inset-0 p-5 grid grid-cols-[repeat(1,80px)] grid-rows-[repeat(auto-fill,90px)] grid-flow-col gap-[10px] z-1"
            onClick={() => setSelectedIconId(null)}
            onContextMenu={(e) => handleContextMenu(e, null, 'empty-desktop')}
          >
            <div className="absolute top-4 right-6 pointer-events-none">
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">Kowser Ahmed</p>
            </div>
            <DesktopIcon 
              name="My Computer" 
              icon={<img src="https://icons.iconarchive.com/icons/icons-land/vista-hardware-devices/128/Computer-icon.png" alt="My Computer" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('mycomputer')}
              onDoubleClick={() => handleWindowAction('mycomputer', 'open')} 
              onContextMenu={(e) => handleContextMenu(e, 'mycomputer')}
              className={cn(
                "-mt-[20px] -ml-[10px]",
                selectedIconId === 'mycomputer' ? 'bg-[#003399]/60 border border-white/20' : ''
              )}
            />
            <DesktopIcon 
              name="Internet Explorer" 
              icon={<img src="https://icons.iconarchive.com/icons/tatice/cristal-intense/128/Internet-Explorer-icon.png" alt="Internet Explorer" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('browser')}
              onDoubleClick={() => handleWindowAction('browser', 'open')} 
              onContextMenu={(e) => handleContextMenu(e, 'browser')}
              className={cn(
                "-mt-[40px] -ml-[10px]",
                selectedIconId === 'browser' ? 'bg-[#003399]/60 border border-white/20' : ''
              )}
            />
            <DesktopIcon 
              name="About Me" 
              icon={<img src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-help-about-icon.png" alt="About Me" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('about')}
              onDoubleClick={() => handleWindowAction('about', 'open')} 
              onContextMenu={(e) => handleContextMenu(e, 'about')}
              className={cn(
                "-mt-[55px] -ml-[10px] pl-[3px]",
                selectedIconId === 'about' ? 'bg-[#003399]/60 border border-white/20' : ''
              )}
            />
            <DesktopIcon 
              name="My Projects" 
              icon={<img src="https://icons.iconarchive.com/icons/aha-soft/travel/128/globe-icon.png" alt="My Projects" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('projects')}
              onDoubleClick={() => handleWindowAction('projects', 'open')} 
              onContextMenu={(e) => handleContextMenu(e, 'projects')}
              className={cn(
                "-mt-[70px] -ml-[10px] pl-[1px] pt-0",
                selectedIconId === 'projects' ? 'bg-[#003399]/60 border border-white/20' : ''
              )}
            />
            <DesktopIcon 
              name="My Skills" 
              icon={<img src="https://icons.iconarchive.com/icons/treetog/junior/128/tool-box-icon.png" alt="My Skills" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('skills')}
              onDoubleClick={() => handleWindowAction('skills', 'open')} 
              onContextMenu={(e) => handleContextMenu(e, 'skills')}
              className={cn(
                "-mt-[92px] -ml-[10px] pl-[1px]",
                selectedIconId === 'skills' ? 'bg-[#003399]/60 border border-white/20' : ''
              )}
            />
            <DesktopIcon 
              name="My Resume" 
              icon={<img src="https://icons.iconarchive.com/icons/aha-soft/standard-portfolio/128/Resume-icon.png" alt="My Resume" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('resume')}
              onDoubleClick={() => handleWindowAction('resume', 'open')} 
              onContextMenu={(e) => handleContextMenu(e, 'resume')}
              className={cn(
                "-mt-[114px] -ml-[10px] pl-0",
                selectedIconId === 'resume' ? 'bg-[#003399]/60 border border-white/20' : ''
              )}
            />
            <DesktopIcon 
              name="Contact Me" 
              icon={<img src="https://icons.iconarchive.com/icons/icons-land/vista-hardware-devices/128/Smartphone-icon.png" alt="Contact Me" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('contact')}
              onDoubleClick={() => handleWindowAction('contact', 'open')} 
              onContextMenu={(e) => handleContextMenu(e, 'contact')}
              className={cn(
                "-mt-[135px] -ml-[10px] pl-0",
                selectedIconId === 'contact' ? 'bg-[#003399]/60 border border-white/20' : ''
              )}
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
              {renderAppContent(win)}
            </WindowFrame>
        ))}
      </AnimatePresence>

      {/* Create Item Modal */}
      {showCreateModal && <CreateItemModal onClose={() => setShowCreateModal(false)} />}

      {/* Start Menu */}
      <StartMenu 
        isOpen={isStartOpen} 
        onClose={() => setIsStartOpen(false)}
        onAppClick={(id, params) => handleWindowAction(id, 'open', id as WindowType, id, params)}
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
        items={contextMenu.type === 'empty-desktop' ? [
          { 
            label: 'Arrange Icons By', 
            hasSubmenu: true, 
            submenuItems: [
              { label: 'Name', onClick: () => {} },
              { label: 'Size', onClick: () => {} },
              { label: 'Type', onClick: () => {} },
              { label: 'Modified', onClick: () => {} },
              { label: 'SEPARATOR' },
              { label: 'Auto Arrange', onClick: () => {} },
              { label: 'Align to Grid', onClick: () => {} },
              { label: 'SEPARATOR' },
              { label: 'Show Desktop Icons', bold: true, onClick: () => {} },
            ]
          },
          { label: 'Refresh', onClick: () => setRefreshKey(prev => prev + 1) },
          { label: 'SEPARATOR' },
          { label: 'Paste', disabled: true, onClick: () => {} },
          { label: 'Paste Shortcut', disabled: true, onClick: () => {} },
          { label: 'SEPARATOR' },
          { 
            label: 'New', 
            hasSubmenu: true, 
            submenuItems: [
              { label: 'Folder', disabled: true, onClick: () => {} },
              { label: 'Shortcut', disabled: true, onClick: () => {} },
              { label: 'SEPARATOR' },
              { label: 'Bitmap Image', disabled: true, onClick: () => {} },
              { label: 'Text Document', disabled: true, onClick: () => {} },
              { label: 'Wave Sound', disabled: true, onClick: () => {} },
              { label: 'Briefcase', disabled: true, onClick: () => {} },
              { label: 'SEPARATOR' },
              { label: 'Create New Resource...', disabled: true, icon: <Layers size={14} />, onClick: () => {} },
              { label: 'Upload from Computer...', disabled: true, onClick: () => {} },
            ]
          },
          { label: 'SEPARATOR' },
          { label: 'Properties', onClick: () => {} },
        ] : contextMenu.type === 'desktop' ? [
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

