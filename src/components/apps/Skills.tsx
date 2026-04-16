import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  Search, 
  Folder, 
  LayoutGrid, 
  ChevronDown,
  Palette,
  Monitor,
  Video,
  Layout,
  Target,
  Lightbulb,
  MessageSquare,
  Code2,
  Terminal,
  Layers,
  Cpu,
  Bot,
  Box,
  Figma,
  Wind,
  Zap,
  Smartphone,
  PenTool,
  MousePointer2,
  Globe,
  FileText,
  Laptop
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from '../AppSidebar';
import { WindowsLogo } from '../WindowsLogo';

export const Skills: React.FC<{ isMaximized?: boolean }> = ({ isMaximized = false }) => {

  const skillCategories = [
    {
      title: 'Design Tools',
      skills: [
        { name: 'Figma', level: 95, icon: <Figma size={24} /> },
        { name: 'Adobe XD', level: 85, icon: <Layers size={24} /> },
        { name: 'Photoshop', level: 80, icon: <Palette size={24} /> },
        { name: 'Illustrator', level: 75, icon: <PenTool size={24} /> },
      ]
    },
    {
      title: 'UI/UX Skills',
      skills: [
        { name: 'User Research', level: 90, icon: <Search size={24} /> },
        { name: 'Wireframing', level: 95, icon: <MousePointer2 size={24} /> },
        { name: 'Prototyping', level: 90, icon: <Zap size={24} /> },
        { name: 'Mobile Design', level: 95, icon: <Smartphone size={24} /> },
        { name: 'Web Design', level: 90, icon: <Monitor size={24} /> },
        { name: 'UX Writing', level: 70, icon: <MessageSquare size={24} /> },
      ]
    }
  ];

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
          <span>My Skills</span>
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
          
          <div className="relative p-10 max-w-4xl mx-auto flex flex-col gap-12">
            <h1 className="text-5xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] tracking-tight">
              My Skillset
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories.map((category) => (
                <div key={category.title} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-2 h-8 bg-blue-400 rounded-full" />
                    {category.title}
                  </h2>
                  <div className="space-y-8">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 text-white">
                            <div className="p-2 bg-white/10 rounded-lg">
                              {skill.icon}
                            </div>
                            <span className="text-lg font-semibold">{skill.name}</span>
                          </div>
                          <span className="text-sm font-bold text-blue-200">{skill.level}%</span>
                        </div>
                        <div className="h-3 w-full bg-black/30 rounded-full overflow-hidden border border-white/10">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">Current Focus</h3>
              <p className="text-lg text-white/90 leading-relaxed font-medium">
                I'm currently exploring <span className="text-blue-300 font-bold">Motion Design</span> and <span className="text-blue-300 font-bold">Advanced Prototyping</span> using Framer and Rive to create more dynamic and engaging user interfaces. I'm also deepening my knowledge in <span className="text-blue-300 font-bold">Frontend Development</span> to better bridge the gap between design and implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
