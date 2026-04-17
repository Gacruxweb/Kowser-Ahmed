import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  Search, 
  Folder, 
  LayoutGrid, 
  ChevronDown, 
  ExternalLink,
  Laptop
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from '../AppSidebar';
import { AppMenuBar } from '../AppMenuBar';
import { WindowType } from '@/src/types';
import { projects } from '@/src/projectsData';
import { getGoogleDriveDirectUrl } from '@/src/lib/driveUtils';

export const Projects: React.FC<{ 
  isMaximized?: boolean; 
  onOpenApp: (id: string) => void;
  onOpenProject: (id: string, title: string) => void;
  onContextMenu: (e: React.MouseEvent, id: string) => void;
}> = ({ 
  isMaximized = false,
  onOpenApp,
  onOpenProject,
  onContextMenu
}) => {
  return (
    <div className="flex flex-col h-full bg-white select-none font-sans text-[11px]">
      {/* Menu Bar */}
      <AppMenuBar currentAppId="projects" onOpenApp={onOpenApp} />

      {/* Toolbar */}
      <div className="flex items-center px-1 py-1 bg-[#ece9d8] border-b border-[#aca899] gap-1">
        <div className="flex items-center gap-0.5 pr-2 border-r border-[#aca899]">
          <button className="flex items-center gap-1 px-1 py-1 hover:bg-white/40 rounded-sm group opacity-50 cursor-not-allowed">
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white shadow-sm">
              <ChevronLeft size={16} />
            </div>
            <span className="text-[11px]">Back</span>
            <ChevronDown size={10} className="opacity-60" />
          </button>
          <button className="flex items-center gap-1 px-1 py-1 hover:bg-white/40 rounded-sm opacity-50 cursor-not-allowed">
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
          <span>My Projects</span>
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
        <AppSidebar />

        {/* Main Content */}
        <div className="flex-1 bg-white relative overflow-y-auto custom-scrollbar">
          <div className="relative p-8 md:p-12 max-w-[1200px] mx-auto flex flex-col gap-10">
            <h1 className="font-extrabold text-[#2c3e50] tracking-tight border-b-2 border-blue-100 pb-4" style={{ fontSize: '24px', lineHeight: '22px', textDecorationLine: 'none', fontStyle: 'normal' }}>
              Featured Projects
            </h1>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-y-12 gap-x-4">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="flex flex-col items-center group cursor-pointer"
                  onDoubleClick={() => onOpenProject(project.id, project.title)}
                  onContextMenu={(e) => onContextMenu(e, project.id)}
                >
                  {/* Windows Folder Design */}
                  <div className="relative w-40 h-32 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {/* Folder Body (Back) */}
                    <div className="absolute inset-0 bg-[#e7ae2a] rounded-xl shadow-md" style={{ borderRadius: '12px 12px 12px 12px' }} />
                    
                    {/* Folder Tab */}
                    <div className="absolute -top-3 left-0 w-16 h-8 bg-[#e7ae2a]" style={{ borderRadius: '10px 20px 0 0' }} />
                    
                    {/* Folder Paper Content (The project image) */}
                    <div className="absolute top-4 left-3 right-3 bottom-6 bg-white overflow-hidden shadow-inner border border-black/5" style={{ borderRadius: '2px' }}>
                      <img 
                        src={getGoogleDriveDirectUrl(project.image)} 
                        alt="" 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 grayscale-[0.3] group-hover:grayscale-0 transition-all"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Folder Front Flap */}
                    <div className="absolute left-0 right-0 bottom-0 h-16 bg-[#fcc44e] rounded-b-xl border-t border-[#f9c34a] shadow-[0_-4px_8px_rgba(0,0,0,0.1)] flex items-end justify-center pb-2 px-2 overflow-hidden">
                       {/* Subtle highlight */}
                       <div className="absolute top-0 left-0 right-0 h-px bg-white/30" />
                       <div className="text-[9px] text-black/40 font-bold uppercase tracking-tighter truncate w-full text-center">{project.id}</div>
                    </div>
                  </div>

                  {/* Project Info & Live Actions */}
                  <div className="text-center w-full max-w-[160px] space-y-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap justify-center">
                        <h3 className="text-sm font-bold text-gray-800 leading-none">{project.title}</h3>
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-[9px] font-black text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest bg-blue-50 px-1.5 py-0.5 rounded"
                        >
                          Live link
                          <ExternalLink size={9} />
                        </a>
                      </div>
                    </div>

                    <p className="text-gray-500 text-[10px] leading-tight line-clamp-2 px-1">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
