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
import { LoginScreen } from './components/LoginScreen';
import { projects } from './projectsData';
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
    { id: 'about', type: 'about', title: 'About Me', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'projects', type: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'skills', type: 'skills', title: 'My Skills', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'resume', type: 'resume', title: 'My Resume', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'contact', type: 'contact', title: 'Contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'settings', type: 'settings', title: 'Settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'mycomputer', type: 'mycomputer', title: 'My Computer', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'media', type: 'media', title: 'Media Player', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'doodledev', type: 'doodledev', title: 'DoodleDev', isOpen: false, isMinimized: false, isMaximized: true, zIndex: 1 },
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
      case 'media': return <MediaPlayer isMaximized={window.isMaximized} initialUrl={window.params?.url} initialType={window.params?.type} />;
      case 'doodledev': return <DoodleDev isMaximized={window.isMaximized} onOpenApp={onOpenApp} />;
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
              className={selectedIconId === 'mycomputer' ? 'bg-[#003399]/60 hover:bg-[#003399]/70 border border-white/20' : ''}
            />
            <DesktopIcon 
              name="About Me" 
              icon={<img src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-help-about-icon.png" alt="About Me" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('about')}
              onDoubleClick={() => handleWindowAction('about', 'open')} 
              onContextMenu={(e) => handleContextMenu(e, 'about')}
              className={selectedIconId === 'about' ? 'bg-[#003399]/60 hover:bg-[#003399]/70 border border-white/20' : ''}
            />
            <DesktopIcon 
              name="My Projects" 
              icon={<img src="https://icons.iconarchive.com/icons/aha-soft/travel/128/globe-icon.png" alt="My Projects" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('projects')}
              onDoubleClick={() => handleWindowAction('projects', 'open')} 
              onContextMenu={(e) => handleContextMenu(e, 'projects')}
              className={selectedIconId === 'projects' ? 'bg-[#003399]/60 hover:bg-[#003399]/70 border border-white/20' : ''}
            />
            <DesktopIcon 
              name="My Skills" 
              icon={<img src="https://icons.iconarchive.com/icons/treetog/junior/128/tool-box-icon.png" alt="My Skills" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('skills')}
              onDoubleClick={() => handleWindowAction('skills', 'open')} 
              onContextMenu={(e) => handleContextMenu(e, 'skills')}
              className={selectedIconId === 'skills' ? 'bg-[#003399]/60 hover:bg-[#003399]/70 border border-white/20' : ''}
            />
            <DesktopIcon 
              name="My Resume" 
              icon={<img src="https://icons.iconarchive.com/icons/aha-soft/standard-portfolio/128/Resume-icon.png" alt="My Resume" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('resume')}
              onDoubleClick={() => handleWindowAction('resume', 'open')} 
              onContextMenu={(e) => handleContextMenu(e, 'resume')}
              className={selectedIconId === 'resume' ? 'bg-[#003399]/60 hover:bg-[#003399]/70 border border-white/20' : ''}
            />
            <DesktopIcon 
              name="Contact Me" 
              icon={<img src="https://icons.iconarchive.com/icons/icons-land/vista-hardware-devices/128/Smartphone-icon.png" alt="Contact Me" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />} 
              onClick={() => setSelectedIconId('contact')}
              onDoubleClick={() => handleWindowAction('contact', 'open')} 
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
              {renderAppContent(win)}
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
              { label: 'Folder', onClick: () => {} },
              { label: 'Shortcut', onClick: () => {} },
              { label: 'SEPARATOR' },
              { label: 'Bitmap Image', onClick: () => {} },
              { label: 'Text Document', onClick: () => {} },
              { label: 'Wave Sound', onClick: () => {} },
              { label: 'Briefcase', onClick: () => {} },
              { label: 'SEPARATOR' },
              { label: 'Upload from Computer...', onClick: () => {} },
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

