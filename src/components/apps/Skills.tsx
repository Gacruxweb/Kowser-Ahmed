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
import { AppMenuBar } from '../AppMenuBar';
import { WindowType } from '@/src/types';

export const Skills: React.FC<{ isMaximized?: boolean; onOpenApp: (id: WindowType) => void }> = ({ 
  isMaximized = false,
  onOpenApp
}) => {

  const designTools = [
    { name: 'Figma', icon: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg' },
    { name: 'Adobe XD', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg' },
    { name: 'Photoshop', icon: 'https://www.adobe.com/cc-shared/assets/img/product-icons/svg/photoshop-40.svg' },
    { name: 'Illustrator', icon: 'https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg' },
    { name: 'Webflow', icon: 'https://www.vectorlogo.zone/logos/webflow/webflow-icon.svg' },
    { name: 'Framer', icon: 'https://www.vectorlogo.zone/logos/framer/framer-icon.svg' },
    { name: 'Wix Studio', icon: 'https://www.vectorlogo.zone/logos/wix/wix-icon.svg' },
  ];

  const uiuxSkills = [
    'User Experience (UX) Design',
    'User Interface (UI) Design',
    'Wireframing & Prototyping',
    'Interaction Design',
    'Visual Communication',
    'Usability Testing',
    'Information Architecture',
    'Design Systems & Documentation',
    'Human-Computer Interaction',
    'Mobile & Responsive Design',
    'Accessibility (WCAG)',
    'User Journey Mapping'
  ];

  const otherSkills = [
    'User research & problem discovery',
    'Product thinking (understanding user needs + business goals)',
    'Clear value proposition design',
    'Competitor & market analysis',
    'Information architecture & user flows',
    'UX writing (clear, conversion-focused copy)',
    'Data analysis (funnels, retention, user behavior)',
    'Rapid prototyping & MVP building',
    'AI-assisted design & workflow automation',
    'Brand positioning & messaging',
    'Creative problem solving & idea validation',
    'Growth thinking (acquisition → retention)',
    'Decision-making based on ROI',
    'Communication & storytelling',
    'Fast execution & iteration mindset'
  ];

  return (
    <div className="flex flex-col h-full bg-white select-none font-sans text-[11px]">
      {/* Menu Bar */}
      <AppMenuBar currentAppId="skills" onOpenApp={onOpenApp} />

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
          <span>Control Panel\My Skills</span>
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
          <div className="p-8 max-w-5xl mx-auto flex flex-col gap-10">
            {/* Design Tools Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                <h2 className="text-xl font-bold text-[#316ac5]">Design Tools</h2>
              </div>
              <div className="flex flex-wrap gap-y-6 gap-x-8 pt-2">
                {designTools.map((tool) => (
                  <div key={tool.name} className="flex items-center gap-3 group cursor-default min-w-max">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded shadow-sm border border-gray-100 group-hover:border-blue-400 p-1">
                      <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[14px] text-gray-700 font-medium group-hover:text-blue-600 whitespace-nowrap">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* UIUX Skills Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                <h2 className="text-xl font-bold text-[#316ac5]">UI/UX Design Skills</h2>
              </div>
              <div className="flex flex-wrap gap-y-3 gap-x-8 pt-2">
                {uiuxSkills.map((skill) => (
                  <div key={skill} className="flex items-start gap-2.5 group cursor-default min-w-max max-w-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-2 group-hover:bg-blue-500 flex-shrink-0 transition-colors" />
                    <span className="text-[14px] text-gray-700 group-hover:text-black leading-tight whitespace-nowrap">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Skills Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                <h2 className="text-xl font-bold text-[#316ac5]">Strategic & Multi-disciplinary Skills</h2>
              </div>
              <div className="flex flex-wrap gap-y-3 gap-x-10 pt-2">
                {otherSkills.map((skill) => (
                  <div key={skill} className="flex items-start gap-3 group cursor-default p-2 rounded hover:bg-blue-50/50 transition-colors min-w-max max-w-full">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-[14px] text-gray-700 font-medium leading-normal whitespace-nowrap">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
