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
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from '../AppSidebar';
import { AppMenuBar } from '../AppMenuBar';
import { WindowType } from '@/src/types';
import { projects } from '@/src/projectsData';

interface FileItem {
  name: string;
  type: 'folder' | 'file' | 'drive';
  fileType?: 'video' | 'audio' | 'image' | 'project';
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
          { name: 'Program Files', type: 'folder', children: [] },
          { name: 'WINDOWS', type: 'folder', children: [] },
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
            children: [
              { name: 'Jason Leonard - 1.youtube', type: 'file', fileType: 'video', url: 'https://youtu.be/sMwKrxZKUSc?si=0kD9R8WnArOKgVM5' },
              { name: 'Jason Leonard - 2.youtube', type: 'file', fileType: 'video', url: 'https://youtu.be/kw4tT7SCmaY?si=_E_6gZTafXl46FGe' },
              { name: 'Jason Leonard - 3.youtube', type: 'file', fileType: 'video', url: 'https://youtu.be/TZE9gVF1QbA?si=uyeAVHGa645HooRX' },
              { name: 'Jason Leonard - 4.youtube', type: 'file', fileType: 'video', url: 'https://youtu.be/RgKAFK5djSk?si=KQzK9xXZGNCqeJdG' },
              { name: 'Jason Leonard - 5.youtube', type: 'file', fileType: 'video', url: 'https://youtu.be/AJtDXIazrMo?si=xyCWAIYrjkGCeT6U' },
              { name: 'Jason Leonard - 6.youtube', type: 'file', fileType: 'video', url: 'https://youtu.be/kJQP7kiw5Fk?si=95eiN2CN74Kcovi5' },
              { name: 'Jason Leonard - 7.youtube', type: 'file', fileType: 'video', url: 'https://youtu.be/2Vv-BfVoq4g?si=wxq8y1SrQiCHq5aN' },
              { name: 'Jason Leonard - 8.youtube', type: 'file', fileType: 'video', url: 'https://youtu.be/hbqoaJ8sKsQ?si=sJfsGGBnx_n3nXRw' },
              { name: 'Jason Leonard - 9.youtube', type: 'file', fileType: 'video', url: 'https://youtu.be/WTJSt4wP2ME?si=NTtx2IWXLeVvou47' },
              { name: 'Jason Leonard.youtube', type: 'file', fileType: 'video', url: 'https://youtu.be/pRpeEdMmmQ0?si=RpkL4DXGXeWu2rAX' },
            ] 
          },
          { 
            name: 'Audio', 
            type: 'folder', 
            children: [
              { name: 'Audio 1.mp3', type: 'file', fileType: 'audio', url: 'https://drive.google.com/file/d/1VrizMZOfD-ITyaNmAwMdAY24Hi-6p_8v/view?usp=sharing' },
              { name: 'Audio 2.mp3', type: 'file', fileType: 'audio', url: 'https://drive.google.com/file/d/1K55iLPg9iUg4nQL9Lov6eAzdMslWQ5vS/view?usp=sharing' },
              { name: 'Audio 3.mp3', type: 'file', fileType: 'audio', url: 'https://drive.google.com/file/d/1_QauqRxCWky1iqkslcPvQ1vGzQQUbzpr/view?usp=sharing' },
            ] 
          },
          { name: 'Ringtones', type: 'folder', children: [] },
          { name: 'Images', type: 'folder', children: [] },
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
      if (item.fileType === 'video') {
         onOpenApp('media', 'media', `Media Player - ${item.name}`, { url: item.url, type: 'video' });
      } else if (item.fileType === 'audio') {
         onOpenApp('media', 'media', `Media Player - ${item.name}`, { url: item.url, type: 'audio' });
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
