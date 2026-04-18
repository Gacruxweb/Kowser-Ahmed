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
  Printer,
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
import { AppMenuBar } from '../AppMenuBar';
import { WindowType } from '@/src/types';

export const Resume: React.FC<{ isMaximized?: boolean; onOpenApp: (id: WindowType) => void }> = ({ 
  isMaximized = false,
  onOpenApp
}) => {

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real environment, this would link to a static PDF file
    // For now, we'll trigger print which allows "Save as PDF"
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-white select-none font-sans text-[11px] print:p-0">
      {/* Menu Bar - Hidden on Print */}
      <div className="print:hidden">
        <AppMenuBar currentAppId="resume" onOpenApp={onOpenApp} />
      </div>

      {/* Toolbar - Hidden on Print */}
      <div className="flex items-center px-1 py-1 bg-[#ece9d8] border-b border-[#aca899] gap-1 print:hidden">
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

        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-2 py-1 hover:bg-white/40 rounded-sm transition-colors text-blue-600"
          title="Download as PDF"
        >
          <Download size={18} />
          <span className="text-gray-800">Download</span>
        </button>

        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-2 py-1 hover:bg-white/40 rounded-sm transition-colors text-zinc-600"
          title="Print Resume"
        >
          <Printer size={18} />
          <span className="text-gray-800">Print</span>
        </button>
      </div>

      {/* Address Bar - Hidden on Print */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-[#aca899] gap-2 print:hidden">
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
        {/* Sidebar - Hidden on Print */}
        <div className="print:hidden h-full">
          <AppSidebar />
        </div>

        <div className="flex-1 bg-white relative overflow-y-auto custom-scrollbar print:bg-white print:overflow-visible">
          <div className="max-w-[850px] mx-auto p-10 md:p-16 bg-white text-gray-800 font-sans leading-relaxed print:p-0">
            <header className="border-b-2 border-[#2c3e50] pb-5 mb-6">
              <h1 className="font-bold text-[#2c3e50] uppercase tracking-tight" style={{ fontSize: '24px', lineHeight: '22px', textDecorationLine: 'none', fontStyle: 'normal' }}>KOWSER AHMED</h1>
              <div className="text-lg md:text-xl text-gray-600 font-semibold mt-1">UX/UI & Product Designer | AI-Powered Design Specialist</div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">📧 ahmedimteyajkowser@gmail.com</span>
                <span className="flex items-center gap-1">📞 +8801703220977</span>
                <span className="flex items-center gap-1">🔗 <a href="https://www.linkedin.com/in/ahmed-kowser" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a></span>
                <span className="flex items-center gap-1">🔗 <a href="https://wa.me/+8801703220977" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WhatsApp</a></span>
              </div>
            </header>

            <section className="mb-8 font-sans">
              <h2 className="text-xl font-bold text-[#2c3e50] border-l-4 border-[#2c3e50] pl-3 uppercase mb-4">Career Summary</h2>
              <p className="text-[14px] text-gray-700">
                UX/UI and Product Designer with 4+ years of experience designing user-centered websites, mobile applications, and digital products. 
                Specialized in AI-assisted design workflows to accelerate ideation, wireframing, prototyping, and high-fidelity UI design. 
                Strong background in usability, accessibility, and scalable design systems, with experience working with remote teams and international clients.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#2c3e50] border-l-4 border-[#2c3e50] pl-3 uppercase mb-4">Professional Experience</h2>
              
              <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between font-bold text-[#34495e] text-[15px]">
                  <span>User Experience Designer | Siegecode inc. (Remote)</span>
                  <span className="text-gray-500 italic font-normal text-sm">Dec 2024 - Present</span>
                </div>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-[13px] text-gray-700">
                  <li>Lead end-to-end UX/UI design for web and mobile products.</li>
                  <li>Apply AI tools to speed up design exploration, ideation, and UI refinement.</li>
                  <li>Create user flows, wireframes, interactive prototypes, and high-fidelity interfaces.</li>
                  <li>Collaborate with developers, product managers, and stakeholders in agile workflows.</li>
                  <li>Ensure usability, accessibility, and consistency across platforms.</li>
                  <li>Improve product experience through user-centered design principles.</li>
                </ul>
              </div>

              <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between font-bold text-[#34495e] text-[15px]">
                  <span>User Experience Designer | A2Z-web (On-site)</span>
                  <span className="text-gray-500 italic font-normal text-sm">Aug 2023 - Nov 2024</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between font-bold text-[#34495e] text-[15px]">
                  <span>User Interface Designer (Freelance)</span>
                  <span className="text-gray-500 italic font-normal text-sm">Feb 2022 - Jul 2023</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between font-bold text-[#34495e] text-[15px]">
                  <span>Graphic Designer | Shopnokutir Event & Wedding Planner (On-site)</span>
                  <span className="text-gray-500 italic font-normal text-sm">Mar 2019 - Feb 2022</span>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#2c3e50] border-l-4 border-[#2c3e50] pl-3 uppercase mb-4">Projects</h2>
              <div className="space-y-3 text-[14px]">
                <p>
                  <strong className="text-gray-800">Live:</strong>{' '}
                  <span className="text-blue-600 font-semibold space-x-1">
                    <a href="https://siegecode.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Siegecode,</a>
                    <a href="https://tcb.global/" target="_blank" rel="noopener noreferrer" className="hover:underline">TCB Global,</a>
                    <a href="https://nusheba.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Nusheba,</a>
                    <a href="https://jamanagroup.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Jamana Group,</a>
                    <a href="https://jamanabd.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Jamana BD,</a>
                    <a href="https://doctoranwar.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Doctor Anwar,</a>
                    <a href="https://kazizafor.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Kazi Zafor,</a>
                    <a href="https://hrm-five-nu.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Human Resource Management(HRM) System,</a>
                    <a href="https://jamanasupershop.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Super shop Management System,</a>
                  </span>
                </p>
                {/* 
                <p className="text-gray-700">
                  <strong className="text-gray-800 font-bold">On-going:</strong> Accounts Management System, Human Resource Management System, Super Shop Management System 
                </p>
                */}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#2c3e50] border-l-4 border-[#2c3e50] pl-3 uppercase mb-4">Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "UX/UI Design", "Product Design", "AI-Assisted Design", 
                  "Mobile App Design", "Wireframing & Prototyping", "Design Systems", 
                  "Usability & Accessibility", "Visual Design & Branding", "Agile & Remote Collaboration"
                ].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#2c3e50] border-l-4 border-[#2c3e50] pl-3 uppercase mb-4">Education</h2>
              <div className="mb-4">
                <div className="flex justify-between font-bold text-[#34495e] text-[15px]">
                  <span>MBA, Anando Mohan College (National University)</span>
                  <span className="text-gray-500 italic font-normal text-sm">Completed 2020</span>
                </div>
                <div className="text-sm text-gray-600">CGPA: 3.28</div>
              </div>
              <div>
                <div className="flex justify-between font-bold text-[#34495e] text-[15px]">
                  <span>Diploma in Web Application & Web Development</span>
                  <span className="text-gray-500 italic font-normal text-sm">Completed 2024</span>
                </div>
                <div className="text-sm text-gray-600">National Institute of Youth Development | CGPA: 3.93</div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#2c3e50] border-l-4 border-[#2c3e50] pl-3 uppercase mb-4">Languages</h2>
              <p className="text-[14px] text-gray-700">English (Fluent), Bangla (Mother language)</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
