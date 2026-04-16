import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  Search, 
  Folder, 
  LayoutGrid, 
  ChevronDown,
  Laptop
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from '../AppSidebar';
import { WindowsLogo } from '../WindowsLogo';

export const About: React.FC<{ isMaximized?: boolean }> = ({ isMaximized = false }) => {

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
          <span>About Me</span>
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
          
          <div className="relative p-10 max-w-3xl mx-auto flex flex-col gap-12">
            <h1 className="text-5xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] tracking-tight">
              About Me
            </h1>

            <div className="flex flex-col gap-16">
              {/* Block 1 */}
              <div className="flex gap-8 items-start">
                <div className="w-24 h-24 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white/20 shadow-xl">
                  <img src="https://picsum.photos/seed/avatar1/200/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 text-white/90 text-lg leading-relaxed font-medium drop-shadow-sm">
                  I'm Kowser Ahmed, a designer based in Asia. Originally from a creative background, I've spent years honing my skills in digital product design and interactive experiences. I believe in the power of design to not only solve problems but to evoke emotions and create lasting impressions.
                </div>
              </div>

              {/* Block 2 */}
              <div className="flex gap-8 items-start">
                <div className="w-24 h-24 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white/20 shadow-xl">
                  <img src="https://picsum.photos/seed/avatar2/200/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 text-white/90 text-lg leading-relaxed font-medium drop-shadow-sm">
                  My journey in design has been driven by a curiosity for how things work and a passion for aesthetics. Whether it's crafting a complex UI system or a simple brand identity, I approach every project with the same level of dedication and attention to detail. I'm constantly learning and evolving with the digital landscape.
                </div>
              </div>

              {/* Block 3 */}
              <div className="flex gap-8 items-start">
                <div className="w-24 h-24 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white/20 shadow-xl">
                  <img src="https://picsum.photos/seed/avatar3/200/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 text-white/90 text-lg leading-relaxed font-medium drop-shadow-sm">
                  I've always been interested in how things are built as much as how they look. This led me to explore the intersection of design and technology, where I can bring my creative visions to life through code. I enjoy the challenge of creating seamless, user-friendly experiences that push the boundaries of what's possible on the web.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
