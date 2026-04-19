import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  Search, 
  Folder, 
  LayoutGrid, 
  HardDrive, 
  Disc,
  FolderPlus,
  Edit3,
  Trash2,
  Monitor,
  Laptop,
  ChevronUp,
  ChevronDown,
  Video,
  Music,
  Image as ImageIcon,
  FileVideo,
  FileAudio,
  FileText,
  PlayCircle,
  Palette,
  Code2,
  Terminal,
  Facebook,
  Instagram,
  Github,
  Linkedin,
  MessageSquare,
  FileDigit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from '../AppSidebar';
import { AppMenuBar } from '../AppMenuBar';
import { WindowType } from '@/src/types';
import { projects } from '@/src/projectsData';
import { SAMPLE_IMAGES } from '@/src/constants/images';
import { SAMPLE_VIDEOS } from '@/src/constants/videos';
import { SAMPLE_SONGS } from '@/src/constants/songs';

interface FileItem {
  name: string;
  type: 'folder' | 'file' | 'drive';
  fileType?: 'video' | 'audio' | 'image' | 'project' | 'app';
  appId?: string;
  url?: string;
  children?: FileItem[];
  id?: string;
}

export const MyComputer: React.FC<{ 
  isMaximized?: boolean; 
  onOpenApp: (id: WindowType, type?: WindowType, title?: string, params?: any) => void 
}> = ({ 
  isMaximized = false,
  onOpenApp
}) => {
  const [expandedSections, setExpandedSections] = useState({
    tasks: true,
    places: true,
    details: true
  });

  const [currentPath, setCurrentPath] = useState<string[]>(['My Computer']);
  const [history, setHistory] = useState<string[][]>([['My Computer']]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const fileSystem: FileItem = useMemo(() => ({
    name: 'My Computer',
    type: 'folder',
    children: [
      {
        name: 'Local Disk (C:)',
        type: 'drive',
        children: [
          { name: 'Documents and Settings', type: 'folder', children: [] },
          { 
            name: 'Program Files', 
            type: 'folder', 
            children: [
              {
                name: 'Accessories',
                type: 'folder',
                children: [
                  { name: 'Media Player', type: 'file', fileType: 'app', appId: 'media' },
                  { name: 'Music Player', type: 'file', fileType: 'app', appId: 'music' },
                  { name: 'Paint', type: 'file', fileType: 'app', appId: 'paint' },
                  { name: 'DoodleDev', type: 'file', fileType: 'app', appId: 'doodledev' },
                  { name: 'Command Prompt', type: 'file', fileType: 'app', appId: 'cmd' },
                  { name: 'Image Viewer', type: 'file', fileType: 'app', appId: 'viewer' },
                ]
              },
              {
                name: 'Games',
                type: 'folder',
                children: [
                  { name: 'Pinball', type: 'file', fileType: 'app', appId: 'pinball' },
                  { name: 'Solitaire', type: 'file', fileType: 'app', appId: 'solitaire' },
                  { name: 'Angry Birds', type: 'file', fileType: 'app', appId: 'angrybirds' },
                  { name: 'Red Ball', type: 'file', fileType: 'app', appId: 'redball' },
                ]
              },
              {
                name: 'Social Media',
                type: 'folder',
                children: [
                  { name: 'Facebook', type: 'file', fileType: 'app', appId: 'facebook' },
                  { name: 'Instagram', type: 'file', fileType: 'app', appId: 'instagram' },
                  { name: 'GitHub', type: 'file', fileType: 'app', appId: 'github' },
                  { name: 'LinkedIn', type: 'file', fileType: 'app', appId: 'linkedin' },
                  { name: 'WhatsApp', type: 'file', fileType: 'app', appId: 'whatsapp' },
                ]
              },
              {
                name: 'Pages',
                type: 'folder',
                children: [
                  { name: 'About Me', type: 'file', fileType: 'app', appId: 'about' },
                  { name: 'Projects', type: 'file', fileType: 'app', appId: 'projects' },
                  { name: 'Contact', type: 'file', fileType: 'app', appId: 'contact' },
                  { name: 'Resume', type: 'file', fileType: 'app', appId: 'resume' },
                ]
              },
              { name: 'Internet Explorer', type: 'file', fileType: 'app', appId: 'browser' },
            ]
          },
          { 
            name: 'WINDOWS', 
            type: 'folder', 
            children: [
              { name: 'addins', type: 'folder', children: [] },
              { name: 'appcompat', type: 'folder', children: [] },
              { name: 'apppatch', type: 'folder', children: [] },
              { name: 'AppReadiness', type: 'folder', children: [] },
              { name: 'assembly', type: 'folder', children: [] },
              { name: 'AUInstallAgent', type: 'folder', children: [] },
              { name: 'Boot', type: 'folder', children: [] },
              { name: 'Branding', type: 'folder', children: [] },
              { name: 'CbsTemp', type: 'folder', children: [] },
              { name: 'Containers', type: 'folder', children: [] },
              { name: 'CSC', type: 'folder', children: [] },
              { name: 'Cursors', type: 'folder', children: [] },
              { name: 'debug', type: 'folder', children: [] },
              { name: 'diagnostics', type: 'folder', children: [] },
              { name: 'DigitalLocker', type: 'folder', children: [] },
              { name: 'ELAMBKUP', type: 'folder', children: [] },
              { name: 'en-US', type: 'folder', children: [] },
              { name: 'Fonts', type: 'folder', children: [] },
              { name: 'Globalization', type: 'folder', children: [] },
              { name: 'Help', type: 'folder', children: [] },
              { name: 'IdentityCRL', type: 'folder', children: [] },
              { name: 'ImmersiveControlPanel', type: 'folder', children: [] },
              { name: 'INF', type: 'folder', children: [] },
              { name: 'InputMethod', type: 'folder', children: [] },
              { name: 'L2Schemas', type: 'folder', children: [] },
              { name: 'LanguageOverlayCache', type: 'folder', children: [] },
              { 
                name: 'Logs', 
                type: 'folder', 
                children: [
                  { name: 'CBS', type: 'folder', children: [] },
                  { name: 'DISM', type: 'folder', children: [] },
                  { name: 'MoSetup', type: 'folder', children: [] },
                ] 
              },
              { name: 'Media', type: 'folder', children: [] },
              { name: 'Migration', type: 'folder', children: [] },
              { name: 'Minidump', type: 'folder', children: [] },
              { name: 'ModemLogs', type: 'folder', children: [] },
              { name: 'OCR', type: 'folder', children: [] },
              { name: 'Offline Web Pages', type: 'folder', children: [] },
              { name: 'Panther', type: 'folder', children: [] },
              { name: 'Performance', type: 'folder', children: [] },
              { name: 'PLA', type: 'folder', children: [] },
              { name: 'PolicyDefinitions', type: 'folder', children: [] },
              { name: 'Prefetch', type: 'folder', children: [] },
              { name: 'PrintDialog', type: 'folder', children: [] },
              { name: 'Provisioning', type: 'folder', children: [] },
              { name: 'Registration', type: 'folder', children: [] },
              { name: 'Resources', type: 'folder', children: [] },
              { name: 'SchCache', type: 'folder', children: [] },
              { name: 'Security', type: 'folder', children: [] },
              { 
                name: 'ServiceProfiles', 
                type: 'folder', 
                children: [
                  { name: 'LocalService', type: 'folder', children: [] },
                  { name: 'NetworkService', type: 'folder', children: [] },
                  { name: 'LocalSystem', type: 'folder', children: [] },
                ] 
              },
              { name: 'Setup', type: 'folder', children: [] },
              { name: 'ShellComponents', type: 'folder', children: [] },
              { 
                name: 'SoftwareDistribution', 
                type: 'folder', 
                children: [
                  { name: 'DataStore', type: 'folder', children: [] },
                  { name: 'Download', type: 'folder', children: [] },
                  { name: 'SLS', type: 'folder', children: [] },
                ] 
              },
              { name: 'Speech', type: 'folder', children: [] },
              { name: 'System', type: 'folder', children: [] },
              { 
                name: 'System32', 
                type: 'folder', 
                children: [
                  { name: 'config', type: 'folder', children: [] },
                  { name: 'drivers', type: 'folder', children: [] },
                  { name: 'DriverStore', type: 'folder', children: [] },
                  { name: 'en-US', type: 'folder', children: [] },
                  { name: 'LogFiles', type: 'folder', children: [] },
                  { name: 'Tasks', type: 'folder', children: [] },
                  { name: 'wbem', type: 'folder', children: [] },
                  { name: 'WindowsPowerShell', type: 'folder', children: [] },
                  { name: 'spool', type: 'folder', children: [] },
                ] 
              },
              { 
                name: 'SysWOW64', 
                type: 'folder', 
                children: [
                  { name: 'config', type: 'folder', children: [] },
                  { name: 'drivers', type: 'folder', children: [] },
                  { name: 'en-US', type: 'folder', children: [] },
                  { name: 'wbem', type: 'folder', children: [] },
                ] 
              },
              { name: 'Temp', type: 'folder', children: [] },
              { name: 'TextInput', type: 'folder', children: [] },
              { name: 'tracing', type: 'folder', children: [] },
              { name: 'twain_32', type: 'folder', children: [] },
              { name: 'Vss', type: 'folder', children: [] },
              { name: 'Web', type: 'folder', children: [] },
              { 
                name: 'WinSxS', 
                type: 'folder', 
                children: [
                  { name: 'Backup', type: 'folder', children: [] },
                  { name: 'Catalogs', type: 'folder', children: [] },
                  { name: 'Manifests', type: 'folder', children: [] },
                  { name: 'Temp', type: 'folder', children: [] },
                ] 
              },
              { 
                name: 'servicing', 
                type: 'folder', 
                children: [
                  { name: 'Packages', type: 'folder', children: [] },
                  { name: 'Sessions', type: 'folder', children: [] },
                  { name: 'Version', type: 'folder', children: [] },
                ] 
              },
            ] 
          },
        ]
      },
      {
        name: 'Local Disk (D:)',
        type: 'drive',
        children: [
          { 
            name: 'Projects', 
            type: 'folder', 
            children: projects.map(p => ({
              name: p.title,
              type: 'file',
              fileType: 'project',
              id: p.id
            }))
          },
          { 
            name: 'Video', 
            type: 'folder', 
            children: SAMPLE_VIDEOS.map(v => ({ name: v.name, type: 'file', fileType: 'video', url: v.url }))
          },
          { 
            name: 'Audio', 
            type: 'folder', 
            children: SAMPLE_SONGS.map((s, i) => ({ name: s.name, type: 'file', fileType: 'audio', url: s.url, id: i.toString() }))
          },
          { name: 'Ringtones', type: 'folder', children: [] },
          { 
            name: 'Images', 
            type: 'folder', 
            children: SAMPLE_IMAGES.map(img => ({ ...img, type: 'file', fileType: 'image' })) as any
          },
        ]
      },
      { name: 'CD Drive (E:)', type: 'drive', children: [] }
    ]
  }), []);

  const getCurrentFolder = () => {
    let current = fileSystem;
    for (let i = 1; i < currentPath.length; i++) {
        const found = current.children?.find(child => child.name === currentPath[i]);
        if (found) current = found;
    }
    return current;
  };

  const navigateTo = (newPath: string[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(newPath);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  const goUp = () => {
    if (currentPath.length > 1) {
      navigateTo(currentPath.slice(0, -1));
    }
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder' || item.type === 'drive') {
      navigateTo([...currentPath, item.name]);
    } else if (item.type === 'file') {
      if (item.fileType === 'app' && item.appId) {
        if (['facebook', 'github', 'linkedin', 'whatsapp'].includes(item.appId)) {
          const links: Record<string, string> = {
            facebook: "https://www.facebook.com/kowser.monob.kongkal/",
            github: "https://github.com/Gacruxweb",
            linkedin: "https://www.linkedin.com/in/ahmed-kowser",
            whatsapp: "https://wa.me/+8801703220977"
          };
          window.open(links[item.appId], '_blank');
        } else if (item.appId === 'viewer') {
          onOpenApp('viewer' as any, 'viewer', `Image Viewer - Windows Picture and Fax Viewer`, { images: SAMPLE_IMAGES, initialIndex: 0 });
        } else {
          onOpenApp(item.appId as any, item.appId as any);
        }
      } else if (item.fileType === 'video') {
         onOpenApp('media', 'media', `Media Player - ${item.name}`, { url: item.url, type: 'video' });
      } else if (item.fileType === 'audio') {
         onOpenApp('music', 'music', `Music Player - ${item.name}`, { url: item.url, index: item.id ? parseInt(item.id) : 0 });
      } else if (item.fileType === 'image') {
         const currentFolder = getCurrentFolder();
         const imagesInFolder = currentFolder.children?.filter(child => child.fileType === 'image') || [];
         const index = imagesInFolder.findIndex(img => img.name === item.name);
         onOpenApp('viewer' as any, 'viewer', `${item.name} - Windows Picture and Fax Viewer`, { 
            images: imagesInFolder.map(img => ({ name: img.name, url: img.url })), 
            initialIndex: index >= 0 ? index : 0 
         });
      } else if (item.fileType === 'project' && item.id) {
         onOpenApp(`project-${item.id}` as any, 'project-detail', `Project: ${item.name}`, { projectId: item.id });
      }
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const currentFolder = getCurrentFolder();

  const getIcon = (item: FileItem) => {
    if (item.type === 'drive') {
        return (
          <div className="relative">
            <HardDrive size={32} className="text-zinc-400" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-zinc-300 rounded-full" />
          </div>
        );
    }
    if (item.name.includes('CD Drive')) return <Disc size={32} className="text-zinc-300" />;
    if (item.type === 'folder') return <Folder size={32} className="text-[#fcc44e] fill-[#fcc44e]" />;
    
    if (item.fileType === 'app' && item.appId) {
      switch (item.appId) {
        case 'browser': return <img src="https://icons.iconarchive.com/icons/tatice/cristal-intense/128/Internet-Explorer-icon.png" alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />;
        case 'about': return <img src="https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-help-about-icon.png" alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />;
        case 'projects': return <img src="https://icons.iconarchive.com/icons/aha-soft/travel/128/globe-icon.png" alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />;
        case 'contact': return <img src="https://icons.iconarchive.com/icons/icons-land/vista-hardware-devices/128/Smartphone-icon.png" alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />;
        case 'resume': return <img src="https://icons.iconarchive.com/icons/aha-soft/standard-portfolio/128/Resume-icon.png" alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />;
        case 'media': return <PlayCircle size={32} className="text-blue-600" />;
        case 'music': return <Music size={32} className="text-zinc-600" />;
        case 'paint': return <Palette size={32} className="text-red-500" />;
        case 'doodledev': return <Code2 size={32} className="text-green-600" />;
        case 'cmd': return <Terminal size={32} className="text-zinc-800" />;
        case 'viewer': return <ImageIcon size={32} className="text-emerald-600" />;
        case 'pinball': return <img src="https://icons.iconarchive.com/icons/gartoon-team/gartoon-apps/128/pinball-icon.png" alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />;
        case 'solitaire': return <img src="https://icons.iconarchive.com/icons/icons8/windows-8/128/Gaming-Cards-icon.png" alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />;
        case 'facebook': return <Facebook size={32} className="text-blue-600" />;
        case 'instagram': return <Instagram size={32} className="text-pink-600" />;
        case 'github': return <Github size={32} className="text-zinc-900" />;
        case 'linkedin': return <Linkedin size={32} className="text-blue-700" />;
        case 'whatsapp': return <MessageSquare size={32} className="text-green-500" />;
        case 'angrybirds': return <img src="https://icons.iconarchive.com/icons/femfoyou/angry-birds/128/angry-bird-icon.png" alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />;
        case 'redball': return <img src="https://icons.iconarchive.com/icons/hopstarter/scrap/128/Aqua-Ball-Red-icon.png" alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />;
        default: return <FileDigit size={32} className="text-gray-400" />;
      }
    }

    switch (item.fileType) {
        case 'video': return <FileVideo size={32} className={item.url?.includes('youtu') ? "text-red-600" : "text-blue-500"} />;
        case 'audio': return <FileAudio size={32} className="text-green-500" />;
        case 'image': return <ImageIcon size={32} className="text-purple-500" />;
        case 'project': return <Folder size={32} className="text-blue-400 fill-blue-400" />;
        default: return <FileText size={32} className="text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white select-none font-sans text-[11px]">
      {/* Menu Bar */}
      <AppMenuBar currentAppId="mycomputer" onOpenApp={onOpenApp} />

      {/* Toolbar */}
      <div className="flex items-center px-1 py-1 bg-[#ece9d8] border-b border-[#aca899] gap-1">
        <div className="flex items-center gap-0.5 pr-2 border-r border-[#aca899]">
          <button 
            onClick={goBack}
            disabled={historyIndex === 0}
            className={cn(
                "flex items-center gap-1 px-1 py-1 hover:bg-white/40 rounded-sm group",
                historyIndex === 0 && "opacity-50 cursor-not-allowed hover:bg-transparent"
            )}
          >
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white shadow-sm">
              <ChevronLeft size={16} />
            </div>
            <span className="text-[11px]">Back</span>
            <ChevronDown size={10} className="opacity-60" />
          </button>
          <button 
            onClick={goForward}
            disabled={historyIndex === history.length - 1}
            className={cn(
                "flex items-center gap-1 px-1 py-1 hover:bg-white/40 rounded-sm",
                historyIndex === history.length - 1 && "opacity-50 cursor-not-allowed hover:bg-transparent"
            )}
          >
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white shadow-sm">
              <ChevronRight size={16} />
            </div>
            <ChevronDown size={10} className="opacity-60" />
          </button>
        </div>
        
        <button 
          onClick={goUp}
          disabled={currentPath.length === 1}
          className={cn(
            "flex items-center gap-1 px-2 py-1 hover:bg-white/40 rounded-sm",
            currentPath.length === 1 && "opacity-50 cursor-not-allowed hover:bg-transparent"
          )}
        >
          <div className="w-6 h-6 bg-yellow-400 rounded-sm flex items-center justify-center text-white shadow-sm">
            <ArrowUp size={16} />
          </div>
        </button>

        <div className="h-6 w-px bg-[#aca899] mx-1" />

        <button className="flex items-center gap-2 px-2 py-1 hover:bg-white/40 rounded-sm">
          <Search size={18} className="text-blue-600" />
          <span>Search</span>
        </button>

        <button className="flex items-center gap-2 px-2 py-1 hover:bg-white/40 rounded-sm">
          <Folder size={18} className="text-yellow-500" />
          <span>Folders</span>
        </button>

        <div className="h-6 w-px bg-[#aca899] mx-1" />

        <button className="flex items-center gap-1 px-2 py-1 hover:bg-white/40 rounded-sm">
          <LayoutGrid size={18} className="text-blue-500" />
          <ChevronDown size={10} className="opacity-60" />
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-[#aca899] gap-2">
        <span className="text-[#666666]">Address</span>
        <div className="flex-1 flex items-center bg-white border border-[#7da2ce] px-1 h-5 gap-1 truncate">
          <Laptop size={12} className="text-blue-500 flex-shrink-0" />
          <span className="truncate">{currentPath.join('\\')}</span>
          <ChevronDown size={10} className="ml-auto opacity-40 flex-shrink-0" />
        </div>
        <button className="flex items-center gap-1 px-2 py-0.5 hover:bg-white/40 rounded-sm">
          <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
            <ChevronRight size={12} className="text-white" />
          </div>
          <span className="font-bold">Go</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-[220px] bg-gradient-to-b from-[#7da2ce] to-[#d3e5fa] p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar flex-shrink-0">
          {/* File and Folder Tasks */}
          <div className="rounded-t-[4px] overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleSection('tasks')}
              className="w-full flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#f0f7ff] to-[#d3e5fa] text-[#003399] font-bold"
            >
              <span>File and Folder Tasks</span>
              {expandedSections.tasks ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {expandedSections.tasks && (
              <div className="bg-[#f0f7ff] p-2 flex flex-col gap-2 border-x border-b border-white">
                <button className="flex items-center gap-2 text-[#003399] hover:underline text-left">
                  <FolderPlus size={14} className="text-yellow-500" />
                  <span>Make a new folder</span>
                </button>
                <button className="flex items-center gap-2 text-[#003399] hover:underline text-left opacity-50">
                  <Edit3 size={14} className="text-blue-500" />
                  <span>Rename this selection</span>
                </button>
                <button className="flex items-center gap-2 text-[#003399] hover:underline text-left opacity-50">
                  <Trash2 size={14} className="text-red-500" />
                  <span>Delete this selection</span>
                </button>
              </div>
            )}
          </div>

          {/* Other Places */}
          <div className="rounded-t-[4px] overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleSection('places')}
              className="w-full flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#f0f7ff] to-[#d3e5fa] text-[#003399] font-bold"
            >
              <span>Other Places</span>
              {expandedSections.places ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {expandedSections.places && (
              <div className="bg-[#f0f7ff] p-2 flex flex-col gap-2 border-x border-b border-white">
                <button onClick={() => navigateTo(['My Computer'])} className="flex items-center gap-2 text-[#003399] hover:underline text-left">
                  <Monitor size={14} className="text-blue-500" />
                  <span>Desktop</span>
                </button>
                <button className="flex items-center gap-2 text-[#003399] hover:underline text-left">
                  <Folder size={14} className="text-yellow-500" />
                  <span>My Documents</span>
                </button>
                <button onClick={() => navigateTo(['My Computer'])} className={cn(
                    "flex items-center gap-2 text-[#003399] hover:underline text-left",
                    currentPath.length === 1 && "font-bold"
                )}>
                  <Laptop size={14} className="text-blue-500" />
                  <span>My Computer</span>
                </button>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="rounded-t-[4px] overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleSection('details')}
              className="w-full flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#f0f7ff] to-[#d3e5fa] text-[#003399] font-bold"
            >
              <span>Details</span>
              {expandedSections.details ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {expandedSections.details && (
              <div className="bg-[#f0f7ff] p-2 flex flex-col gap-1 border-x border-b border-white text-[#003399]">
                <p className="font-bold truncate">{currentFolder.name}</p>
                <p>{currentFolder.type === 'drive' ? 'Local Disk' : currentFolder.type === 'file' ? 'File' : 'System Folder'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-white custom-scrollbar">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
            {currentFolder.children?.map((item) => (
              <div 
                key={item.name} 
                onDoubleClick={() => handleItemDoubleClick(item)}
                className="flex flex-col items-center gap-1 p-2 hover:bg-[#316ac5]/10 cursor-pointer group rounded-sm"
              >
                <div className="group-hover:scale-105 transition-transform duration-200">
                    {getIcon(item)}
                </div>
                <span className="text-[11px] text-center break-all line-clamp-2 px-1 text-gray-800">
                  {item.name}
                </span>
              </div>
            ))}
            
            {(!currentFolder.children || currentFolder.children.length === 0) && (
                <div className="col-span-full py-10 text-center text-gray-400 italic">
                    This folder is empty.
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
