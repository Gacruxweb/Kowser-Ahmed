import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  Search, 
  Folder, 
  LayoutGrid, 
  ChevronDown,
  RefreshCw,
  ExternalLink,
  Globe
} from 'lucide-react';
import { AppSidebar } from '../AppSidebar';
import { AppMenuBar } from '../AppMenuBar';
import { WindowType } from '@/src/types';

export const DoodleDev: React.FC<{ isMaximized?: boolean; onOpenApp: (id: WindowType) => void }> = ({ 
  isMaximized = false,
  onOpenApp
}) => {
  return (
    <div className="flex flex-col h-full bg-[#ece9d8] select-none font-sans text-[11px]">
      {/* Menu Bar */}
      <AppMenuBar currentAppId="doodledev" onOpenApp={onOpenApp} />

      {/* Toolbar (IE Style) */}
      <div className="flex items-center px-1 py-1 bg-[#ece9d8] border-b border-[#aca899] gap-1">
        <div className="flex items-center gap-0.5 pr-2 border-r border-[#aca899]">
          <button className="flex items-center gap-1 px-1 py-1 hover:bg-white/40 rounded-sm group opacity-50 cursor-not-allowed">
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white shadow-sm">
              <ChevronLeft size={16} />
            </div>
            <span className="text-[11px]">Back</span>
          </button>
          <button className="flex items-center gap-1 px-1 py-1 hover:bg-white/40 rounded-sm opacity-50 cursor-not-allowed">
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white shadow-sm">
              <ChevronRight size={16} />
            </div>
          </button>
        </div>
        
        <button className="flex items-center gap-1 px-2 py-1 opacity-50 cursor-not-allowed" disabled>
          <RefreshCw size={18} className="text-gray-400" />
          <span className="text-gray-500">Refresh</span>
        </button>

        <div className="h-6 w-px bg-[#aca899] mx-1" />

        <button className="flex items-center gap-2 px-2 py-1 opacity-50 cursor-not-allowed" disabled>
          <ExternalLink size={18} className="text-gray-400" />
          <span className="text-gray-500">Open External</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-[#aca899] gap-2">
        <span className="text-[#666666]">Address</span>
        <div className="flex-1 flex items-center bg-white border border-[#7da2ce] px-2 h-5 gap-2">
          <Globe size={12} className="text-blue-500" />
          <span className="text-gray-700">https://doodledev.app/</span>
        </div>
        <button className="flex items-center gap-1 px-2 py-0.5 hover:bg-white/40 rounded-sm">
          <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
            <ChevronRight size={12} className="text-white" />
          </div>
          <span className="font-bold">Go</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden bg-white">
        <iframe 
          src="https://doodledev.app/" 
          className="w-full h-full border-none"
          title="DoodleDev"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
