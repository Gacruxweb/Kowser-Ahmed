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
      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden bg-white relative">
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
