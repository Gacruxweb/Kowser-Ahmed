import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  Search, 
  Folder, 
  LayoutGrid, 
  ChevronDown,
  ExternalLink,
  Laptop,
  Github
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from '../AppSidebar';
import { WindowsLogo } from '../WindowsLogo';

const projects = [
  {
    id: '1',
    title: 'EcoTrack Mobile App',
    description: 'A sustainable lifestyle tracking app helping users reduce their carbon footprint through gamified challenges.',
    image: 'https://picsum.photos/seed/eco/800/600',
    tags: ['UI Design', 'Mobile', 'Figma'],
  },
  {
    id: '2',
    title: 'Lumina Dashboard',
    description: 'An enterprise-grade analytics dashboard for real-time monitoring of cloud infrastructure and costs.',
    image: 'https://picsum.photos/seed/dashboard/800/600',
    tags: ['UX Research', 'Dashboard', 'React'],
  },
  {
    id: '3',
    title: 'Zenith E-commerce',
    description: 'A minimalist e-commerce platform for high-end furniture, focusing on high-quality imagery and smooth transitions.',
    image: 'https://picsum.photos/seed/furniture/800/600',
    tags: ['E-commerce', 'Web Design', 'Branding'],
  },
  {
    id: '4',
    title: 'Pulse Fitness Wearable',
    description: 'Design system and interface for a next-gen fitness wearable focusing on heart health and sleep recovery.',
    image: 'https://picsum.photos/seed/fitness/800/600',
    tags: ['Design System', 'Wearable', 'Prototyping'],
  }
];

export const Projects: React.FC<{ isMaximized?: boolean }> = ({ isMaximized = false }) => {
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
        <div className="flex-1 bg-[#316ac5] relative overflow-y-auto custom-scrollbar">
          {/* Mesh Background Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative p-10 max-w-5xl mx-auto flex flex-col gap-12">
            <h1 className="text-5xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] tracking-tight">
              Featured Projects
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl hover:border-blue-400/50 transition-all duration-300">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <button className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                        <Github size={18} />
                      </button>
                      <button className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                        <ExternalLink size={18} />
                      </button>
                    </div>
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
