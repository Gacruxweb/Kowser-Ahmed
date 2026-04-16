import React from 'react';
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
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WindowsLogo } from '../WindowsLogo';

export const MyComputer: React.FC<{ isMaximized?: boolean }> = ({ isMaximized = false }) => {
  const [expandedSections, setExpandedSections] = React.useState({
    tasks: true,
    places: true,
    details: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex flex-col h-full bg-white select-none font-sans text-[11px]">
      {/* Menu Bar */}
      <div className="flex items-center px-1 py-0.5 bg-[#ece9d8] border-b border-white/40 gap-4">
        {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map(item => (
          <button key={item} className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white rounded-sm">
            {item}
          </button>
        ))}
        <div className="ml-auto pr-2">
          <WindowsLogo size={16} className="opacity-50" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center px-1 py-1 bg-[#ece9d8] border-b border-[#aca899] gap-1">
        <div className="flex items-center gap-0.5 pr-2 border-r border-[#aca899]">
          <button className="flex items-center gap-1 px-1 py-1 hover:bg-white/40 rounded-sm group">
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white shadow-sm">
              <ChevronLeft size={16} />
            </div>
            <span className="text-[11px]">Back</span>
            <ChevronDown size={10} className="opacity-60" />
          </button>
          <button className="flex items-center gap-1 px-1 py-1 hover:bg-white/40 rounded-sm opacity-50">
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white shadow-sm">
              <ChevronRight size={16} />
            </div>
            <ChevronDown size={10} className="opacity-60" />
          </button>
        </div>
        
        <button className="flex items-center gap-1 px-2 py-1 hover:bg-white/40 rounded-sm">
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
        <div className="flex-1 flex items-center bg-white border border-[#7da2ce] px-1 h-5 gap-1">
          <Laptop size={12} className="text-blue-500" />
          <span>My Computer</span>
          <ChevronDown size={10} className="ml-auto opacity-40" />
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
        <div className="w-[220px] bg-gradient-to-b from-[#7da2ce] to-[#d3e5fa] p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
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
                <button className="flex items-center gap-2 text-[#003399] hover:underline text-left">
                  <Monitor size={14} className="text-blue-500" />
                  <span>Desktop</span>
                </button>
                <button className="flex items-center gap-2 text-[#003399] hover:underline text-left">
                  <Folder size={14} className="text-yellow-500" />
                  <span>My Documents</span>
                </button>
                <button className="flex items-center gap-2 text-[#003399] hover:underline text-left font-bold">
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
                <p className="font-bold">My Computer</p>
                <p>System Folder</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-8">
            {/* Hard Disk Drives */}
            <div className="flex items-center gap-3 p-2 hover:bg-[#316ac5]/10 cursor-pointer group">
              <div className="relative">
                <HardDrive size={42} className="text-zinc-400" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-1.5 bg-zinc-300 rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px]">Local Disk (C:)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-[#316ac5]/10 cursor-pointer group">
              <div className="relative">
                <HardDrive size={42} className="text-zinc-400" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-1.5 bg-zinc-300 rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px]">Local Disk (D:)</span>
              </div>
            </div>

            {/* Devices with Removable Storage */}
            <div className="flex items-center gap-3 p-2 hover:bg-[#316ac5]/10 cursor-pointer group">
              <div className="relative">
                <Disc size={42} className="text-zinc-300" />
                <div className="absolute bottom-0 right-0 bg-black text-white text-[8px] px-0.5 font-bold rounded-sm">CD-RW</div>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px]">CD Drive (E:)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
