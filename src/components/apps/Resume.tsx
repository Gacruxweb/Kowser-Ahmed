import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  Search, 
  Folder, 
  LayoutGrid, 
  ChevronDown,
  Download,
  ExternalLink,
  Briefcase,
  Target,
  Lightbulb,
  Code2,
  FileText,
  Laptop
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from '../AppSidebar';
import { WindowsLogo } from '../WindowsLogo';

export const Resume: React.FC<{ isMaximized?: boolean }> = ({ isMaximized = false }) => {

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
          <FileText size={12} className="text-red-500" />
          <span>My Resume</span>
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
          
          <div className="relative p-10 max-w-4xl mx-auto flex flex-col gap-8">
            <div className="flex justify-between items-end">
              <h1 className="text-5xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] tracking-tight">
                My Resume
              </h1>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white font-bold transition-all shadow-xl">
                <Download size={18} />
                <span>Download PDF</span>
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-8 space-y-12">
              {/* Experience */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-blue-300 flex items-center gap-3">
                  <Briefcase size={24} />
                  Work Experience
                </h2>
                <div className="space-y-8">
                  <div className="relative pl-6 border-l-2 border-blue-400/30">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-white">Senior Visual Designer</h3>
                        <span className="text-sm font-bold text-blue-200 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">2021 - Present</span>
                      </div>
                      <p className="text-blue-300 font-semibold">Creative Agency X</p>
                      <p className="text-white/80 text-sm leading-relaxed pt-2">
                        Leading the design team in creating high-impact visual identities and digital products for clients. Specialized in design systems and interactive prototypes.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-6 border-l-2 border-blue-400/30">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-white">UI/UX Designer</h3>
                        <span className="text-sm font-bold text-blue-200 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">2018 - 2021</span>
                      </div>
                      <p className="text-blue-300 font-semibold">Tech Startup Y</p>
                      <p className="text-white/80 text-sm leading-relaxed pt-2">
                        Designed and launched multiple mobile and web applications from scratch. Conducted user research and usability testing to iterate on product features.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-emerald-300 flex items-center gap-3">
                  <Target size={24} />
                  Education
                </h2>
                <div className="space-y-8">
                  <div className="relative pl-6 border-l-2 border-emerald-400/30">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-white">Bachelor of Fine Arts in Graphic Design</h3>
                        <span className="text-sm font-bold text-emerald-200 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">2014 - 2018</span>
                      </div>
                      <p className="text-emerald-300 font-semibold">University of Arts & Design</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Certifications */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-orange-300 flex items-center gap-3">
                  <Lightbulb size={24} />
                  Certifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-300">
                      <Target size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Google UX Design Professional</h4>
                      <p className="text-white/50 text-xs">Coursera</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300">
                      <Code2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Advanced React Patterns</h4>
                      <p className="text-white/50 text-xs">Frontend Masters</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
