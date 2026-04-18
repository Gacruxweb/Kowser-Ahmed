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
  Key,
  MessageSquare,
  Mail,
  Gamepad2,
  Facebook
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WindowType } from '@/src/types';
import { UserAvatar } from './UserAvatar';
import { SAMPLE_IMAGES } from '@/src/constants/images';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAppClick: (id: string, params?: any) => void;
  onPowerAction: (action: 'sleep' | 'restart' | 'shutdown' | 'logout') => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onAppClick,
  onPowerAction,
}) => {
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const [showGamesMenu, setShowGamesMenu] = useState(false);

  const gamesList = [
    { id: 'pinball', name: 'Pinball', icon: <img src="https://icons.iconarchive.com/icons/gartoon-team/gartoon-apps/128/pinball-icon.png" alt="Pinball" className="w-4 h-4" referrerPolicy="no-referrer" />, onClick: () => onAppClick('pinball') },
    { id: 'solitaire', name: 'Solitaire', icon: <img src="https://icons.iconarchive.com/icons/icons8/windows-8/128/Gaming-Cards-icon.png" alt="Solitaire" className="w-4 h-4" referrerPolicy="no-referrer" />, onClick: () => onAppClick('solitaire') },
    { id: 'angrybirds', name: 'Angry Birds (Coming Soon)', icon: <img src="https://icons.iconarchive.com/icons/femfoyou/angry-birds/128/angry-bird-icon.png" alt="Angry Birds" className="w-4 h-4" referrerPolicy="no-referrer" />, onClick: () => onAppClick('angrybirds') },
    { id: 'redball', name: 'Red Ball (Coming Soon)', icon: <img src="https://icons.iconarchive.com/icons/hopstarter/scrap/128/Aqua-Ball-Red-icon.png" alt="Red Ball" className="w-4 h-4" referrerPolicy="no-referrer" />, onClick: () => onAppClick('redball') },
  ];

  const leftApps: { id: string; name: string; subtitle?: string; icon: React.ReactNode; color: string; hasArrow?: boolean }[] = [
    { 
      id: 'browser', 
      name: 'Internet Explorer', 
      subtitle: 'Browse the web', 
      icon: <img src="https://icons.iconarchive.com/icons/tatice/cristal-intense/128/Internet-Explorer-icon.png" alt="Internet Explorer" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />, 
      color: 'text-blue-600' 
    },
    { id: 'projects', name: 'My Projects', subtitle: 'View my work', icon: <img src="https://icons.iconarchive.com/icons/aha-soft/travel/128/globe-icon.png" alt="My Projects" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />, color: 'text-blue-600' },
    { id: 'contact', name: 'Contact Me', subtitle: 'Send me a message', icon: <img src="https://icons.iconarchive.com/icons/icons-land/vista-hardware-devices/128/Smartphone-icon.png" alt="Contact Me" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />, color: 'text-blue-600' },
    { id: 'about', name: 'About Me', icon: <img src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-help-about-icon.png" alt="About Me" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />, color: 'text-blue-600' },
    { id: 'music', name: 'Music Player', icon: <Music className="text-zinc-600" size={24} />, color: 'text-blue-600' },
    { id: 'media', name: 'Media Player', icon: <PlayCircle className="text-blue-600" size={24} />, color: 'text-blue-600' },
    { id: 'paint', name: 'Paint', icon: <Palette className="text-red-500" size={24} />, color: 'text-blue-600' },
    { id: 'doodledev', name: 'DoodleDev', icon: <Code2 className="text-green-600" size={24} />, color: 'text-blue-600' },
    { id: 'games', name: 'Games', icon: <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Play-Games-icon.png" alt="Games" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />, color: 'text-blue-600', hasArrow: true },
  ];

  const rightApps: { id: string; name: string; icon: React.ReactNode; type?: string; hasArrow?: boolean; onClick?: () => void }[] = [
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: <Facebook className="text-blue-600" size={18} />,
      onClick: () => window.open("https://www.facebook.com/kowser.monob.kongkal/", "_blank")
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: <Instagram className="text-pink-600" size={18} />,
      onClick: () => {} 
    },
    { 
      id: 'github', 
      name: 'Github', 
      icon: <Github className="text-zinc-900" size={18} />,
      onClick: () => window.open("https://github.com/Gacruxweb", "_blank")
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: <Linkedin className="text-blue-700" size={18} />,
      onClick: () => window.open("https://www.linkedin.com/in/ahmed-kowser", "_blank")
    },
    { 
      id: 'whatsapp', 
      name: 'WhatsApp', 
      icon: <MessageSquare className="text-green-500" size={18} />,
      onClick: () => window.open("https://wa.me/+8801703220977", "_blank")
    },
    { 
      id: 'email', 
      name: 'Email', 
      icon: <Mail className="text-blue-500" size={18} />,
      onClick: () => window.location.href = "mailto:ahmedimteyajkowser@gmail.com"
    },
    { id: 'sep1', type: 'separator', name: '', icon: null },
    { 
      id: 'recent', 
      name: 'Recently Used', 
      icon: <Clock className="text-zinc-500" size={18} />, 
      hasArrow: true 
    },
    { 
      id: 'cmd', 
      name: 'Command Prompt', 
      onClick: () => onAppClick('cmd'),
      icon: <Terminal className="text-zinc-800" size={18} /> 
    },
    { 
      id: 'viewer', 
      name: 'Image Viewer', 
      onClick: () => onAppClick('viewer', { images: SAMPLE_IMAGES, initialIndex: 0 }),
      icon: <ImageIcon className="text-emerald-600" size={18} /> 
    },
    { 
      id: 'resume', 
      name: 'My Resume', 
      onClick: () => onAppClick('resume'),
      icon: <img src="https://icons.iconarchive.com/icons/aha-soft/standard-portfolio/128/Resume-icon.png" alt="My Resume" className="w-[18px] h-[18px] object-contain" referrerPolicy="no-referrer" /> 
    },
  ];

  const allPrograms = [
    {
      category: 'Web Browser',
      icon: <Globe size={14} className="text-[#003399]" />,
      items: [
        { 
          id: 'browser', 
          name: 'Internet Explorer', 
          icon: <img src="https://icons.iconarchive.com/icons/tatice/cristal-intense/128/Internet-Explorer-icon.png" alt="" className="w-4 h-4" referrerPolicy="no-referrer" />, 
          onClick: () => onAppClick('browser') 
        },
      ]
    },
    {
      category: 'Social Media',
      icon: <Globe size={14} className="text-blue-600" />,
      items: [
        { id: 'facebook', name: 'Facebook', icon: <Facebook size={14} className="text-blue-600" />, onClick: () => window.open("https://www.facebook.com/kowser.monob.kongkal/", "_blank") },
        { id: 'instagram', name: 'Instagram', icon: <Instagram size={14} className="text-pink-600" />, onClick: () => {} },
        { id: 'github', name: 'GitHub', icon: <Github size={14} className="text-zinc-900" />, onClick: () => window.open("https://github.com/Gacruxweb", "_blank") },
        { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin size={14} className="text-blue-700" />, onClick: () => window.open("https://www.linkedin.com/in/ahmed-kowser", "_blank") },
        { id: 'whatsapp', name: 'WhatsApp', icon: <MessageSquare size={14} className="text-green-500" />, onClick: () => window.open("https://wa.me/+8801703220977", "_blank") },
      ]
    },
    {
      category: 'Pages',
      icon: <FileText size={14} className="text-orange-500" />,
      items: [
        { id: 'about', name: 'About Me', icon: <img src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-help-about-icon.png" alt="" className="w-3.5 h-3.5" />, onClick: () => onAppClick('about') },
        { id: 'projects', name: 'Projects', icon: <img src="https://icons.iconarchive.com/icons/aha-soft/travel/128/globe-icon.png" alt="" className="w-3.5 h-3.5" />, onClick: () => onAppClick('projects') },
        { id: 'contact', name: 'Contact', icon: <img src="https://icons.iconarchive.com/icons/icons-land/vista-hardware-devices/128/Smartphone-icon.png" alt="" className="w-3.5 h-3.5" />, onClick: () => onAppClick('contact') },
        { id: 'resume', name: 'Resume', icon: <img src="https://icons.iconarchive.com/icons/aha-soft/standard-portfolio/128/Resume-icon.png" alt="" className="w-3.5 h-3.5" />, onClick: () => onAppClick('resume') },
      ]
    },
    {
      category: 'Accessories',
      icon: <Terminal size={14} className="text-zinc-700" />,
      items: [
        { id: 'media', name: 'Media Player', icon: <PlayCircle size={14} className="text-blue-600" />, onClick: () => onAppClick('media') },
        { id: 'music', name: 'Music Player', icon: <Music size={14} className="text-zinc-600" />, onClick: () => onAppClick('music') },
        { id: 'paint', name: 'Paint', icon: <Palette size={14} className="text-red-500" />, onClick: () => onAppClick('paint') },
        { id: 'doodledev', name: 'DoodleDev', icon: <Code2 size={14} className="text-green-600" />, onClick: () => onAppClick('doodledev') },
        { id: 'cmd', name: 'Command Prompt', icon: <Terminal size={14} className="text-zinc-800" />, onClick: () => onAppClick('cmd') },
        { id: 'viewer', name: 'Image Viewer', icon: <ImageIcon size={14} className="text-emerald-600" />, onClick: () => onAppClick('viewer', { images: SAMPLE_IMAGES, initialIndex: 0 }) },
      ]
    },
    {
      category: 'Games',
      icon: <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Play-Games-icon.png" alt="" className="w-3.5 h-3.5" referrerPolicy="no-referrer" />,
      items: [
        { id: 'pinball', name: 'Pinball', icon: <img src="https://icons.iconarchive.com/icons/gartoon-team/gartoon-apps/128/pinball-icon.png" alt="" className="w-3.5 h-3.5" />, onClick: () => onAppClick('pinball') },
        { id: 'solitaire', name: 'Solitaire', icon: <img src="https://icons.iconarchive.com/icons/icons8/windows-8/128/Gaming-Cards-icon.png" alt="" className="w-3.5 h-3.5" />, onClick: () => onAppClick('solitaire') },
        { id: 'angrybirds', name: 'Angry Birds (Coming Soon)', icon: <img src="https://icons.iconarchive.com/icons/femfoyou/angry-birds/128/angry-bird-icon.png" alt="" className="w-3.5 h-3.5" />, onClick: () => onAppClick('angrybirds') },
        { id: 'redball', name: 'Red Ball (Coming Soon)', icon: <img src="https://icons.iconarchive.com/icons/hopstarter/scrap/128/Aqua-Ball-Red-icon.png" alt="" className="w-3.5 h-3.5" />, onClick: () => onAppClick('redball') },
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[900]" onClick={() => { onClose(); setIsPowerMenuOpen(false); setShowAllPrograms(false); setShowGamesMenu(false); }} />
          
          <motion.div
            initial={{ y: 400, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 400, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-8 left-0 w-[380px] h-[490px] bg-[#ece9d8] border border-[#003399] rounded-[9px] z-[1000] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="h-[57px] xp-title-bar flex items-center px-4 gap-3 border-b border-white/20">
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
                    <div key={app.id} className="relative">
                      <button
                        onClick={() => { 
                          if (app.id === 'games') {
                            setShowGamesMenu(!showGamesMenu);
                            setShowAllPrograms(false);
                            return;
                          }
                          if (['projects', 'contact', 'about', 'media', 'doodledev', 'paint', 'music', 'browser'].includes(app.id)) {
                            onAppClick(app.id);
                          }
                          onClose(); 
                        }}
                        className="w-full flex items-center gap-3 hover:bg-[#316ac5] hover:text-white transition-colors group rounded-sm text-left py-[2px] px-2"
                      >
                        <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {app.icon}
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="text-[13px] font-bold leading-tight">{app.name}</span>
                          {app.subtitle && (
                            <span className="text-[11px] opacity-60 group-hover:text-white/80 leading-tight">{app.subtitle}</span>
                          )}
                        </div>
                        {app.hasArrow && <ChevronRight size={12} className="opacity-60 group-hover:text-white" />}
                      </button>

                      <AnimatePresence>
                        {app.id === 'games' && showGamesMenu && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute bottom-0 left-full ml-1 w-48 bg-white border border-[#003399] rounded-sm shadow-xl p-1 z-[1100]"
                          >
                            <div className="px-2 py-1 flex items-center gap-2 text-[11px] font-bold text-zinc-500 bg-zinc-100/50 rounded-sm mb-1">
                              <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Play-Games-icon.png" alt="" className="w-3.5 h-3.5" referrerPolicy="no-referrer" />
                              <span className="uppercase tracking-wider">Games</span>
                            </div>
                            {gamesList.map(game => (
                              <button
                                key={game.id}
                                onClick={() => {
                                  game.onClick();
                                  onClose();
                                  setShowGamesMenu(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#316ac5] hover:text-white text-[12px] rounded-sm transition-colors text-left"
                              >
                                <div className="w-4 h-4 flex items-center justify-center overflow-hidden shrink-0">
                                  {game.icon}
                                </div>
                                <span className="flex-1 truncate">{game.name}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto border-t border-zinc-200 pt-1 px-1 relative">
                  <button 
                    onClick={() => {
                      setShowAllPrograms(!showAllPrograms);
                      setShowGamesMenu(false);
                    }}
                    className="w-full flex items-center justify-between p-2 hover:bg-[#316ac5] hover:text-white rounded-sm text-[13px] font-bold group"
                  >
                    <span>All Programs</span>
                    <div className="w-5 h-5 bg-green-600 rounded-sm flex items-center justify-center group-hover:bg-white/20">
                      <ChevronRight size={14} className="text-white fill-white" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {showAllPrograms && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        onMouseLeave={() => setShowAllPrograms(false)}
                        className="absolute bottom-0 left-full ml-1 w-64 bg-white border border-[#003399] rounded-sm shadow-xl p-1 z-[1100] max-h-[450px] overflow-y-auto overflow-x-hidden transition-all duration-200"
                      >
                        {allPrograms.map((cat, idx) => (
                          <div key={idx} className="mb-2 last:mb-0">
                            <div className="px-2 py-1 flex items-center gap-2 text-[11px] font-bold text-zinc-500 bg-zinc-100/50 rounded-sm mb-0.5">
                              {cat.icon}
                              <span className="uppercase tracking-wider">{cat.category}</span>
                            </div>
                            {cat.items.map(item => (
                              <button
                                key={item.id}
                                onClick={() => {
                                  item.onClick();
                                  onClose();
                                  setShowAllPrograms(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#316ac5] hover:text-white text-[12px] rounded-sm transition-colors text-left"
                              >
                                <div className="w-4 h-4 flex items-center justify-center overflow-hidden shrink-0">
                                  {item.icon}
                                </div>
                                <span className="flex-1 truncate">{item.name}</span>
                              </button>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                      onClick={() => {
                        if (app.onClick) {
                          app.onClick();
                          onClose();
                        }
                      }}
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
            <div className="h-[44px] xp-taskbar flex items-center justify-end px-4 gap-6 border-t border-white/20">
              <button 
                onClick={() => onPowerAction('logout')}
                className="flex items-center gap-2 pl-[2px] pr-[5px] h-[36px] rounded hover:bg-white/10 transition-colors text-white group"
              >
                <div className="w-[30px] h-[30px] bg-orange-500 rounded-[8px] flex items-center justify-center shadow-md border border-white/20 group-hover:brightness-110 shrink-0">
                  <Key size={18} className="text-white" />
                </div>
                <span className="text-sm font-bold drop-shadow-sm">Log Off</span>
              </button>
              
              <button 
                onClick={() => onPowerAction('shutdown')}
                className="flex items-center gap-2 pl-[2px] pr-0 w-[118px] h-[36px] rounded hover:bg-white/10 transition-colors text-white group"
              >
                <div className="w-[30px] h-[30px] bg-red-600 rounded-[8px] flex items-center justify-center shadow-md border border-white/20 group-hover:brightness-110 shrink-0">
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

