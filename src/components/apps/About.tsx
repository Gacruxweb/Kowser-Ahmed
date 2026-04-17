import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  Search, 
  Folder, 
  LayoutGrid, 
  ChevronDown,
  Laptop,
  Facebook,
  Github,
  Linkedin,
  MessageCircle,
  Mail
} from 'lucide-react';
import { AppSidebar } from '../AppSidebar';
import { AppMenuBar } from '../AppMenuBar';
import { WindowType } from '@/src/types';

export const About: React.FC<{ isMaximized?: boolean; onOpenApp: (id: WindowType) => void }> = ({ 
  isMaximized = false,
  onOpenApp
}) => {

  return (
    <div className="flex flex-col h-full bg-white select-none font-sans text-[11px]">
      {/* Menu Bar */}
      <AppMenuBar currentAppId="about" onOpenApp={onOpenApp} />

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
        <div className="flex-1 bg-white relative overflow-y-auto custom-scrollbar">
          <div className="relative p-10 max-w-3xl mx-auto flex flex-col gap-12">
            <h1 className="font-bold text-[#003399] tracking-tight" style={{ fontSize: '24px', lineHeight: '22px', textDecorationLine: 'none', fontStyle: 'normal' }}>
              About Me
            </h1>

            <div className="flex flex-col gap-8 text-black text-[15px] leading-relaxed px-4">
              <p className="font-medium">
                I’m Kowser Ahmed, a UI/UX designer dedicated to building digital experiences that feel as good as they look. For the past 4+ years, I’ve been turning complex problems into user-friendly interfaces, focusing on SaaS platforms, eCommerce systems, and enterprise dashboards.
              </p>

              <div>
                <h3 className="text-lg font-bold text-[#003399] mb-2">Expertise & Achievements:</h3>
                <div className="space-y-4">
                  <p>
                    My background is rooted in post graduation in Accounting from National University, Bangladesh, combined with hands on industry experience as a Senior User Experience Designer at Siegecode (Remote). Over the years, I’ve collaborated with organizations like Siegecode Inc., A2Z Web, and various international clients, delivering impactful design solutions across multiple domains.
                  </p>
                  <p className="font-bold">
                    I specialize in designing complex, scalable systems, including multi-vendor eCommerce platforms, super shop management systems, warehouse management systems, human resource management (HRM) systems, accounts and asset management systems, and restaurant management systems. In addition to product design, I’ve also contributed to personal and company brand building, ensuring consistent and user focused digital presence.
                  </p>
                  <p>
                    My work focuses on simplifying complexity translating business requirements into intuitive user experiences that improve usability, efficiency, and overall product performance. Whether I’m wireframing in Figma or conducting in depth user research, my goal remains the same: making digital products more meaningful and easier to use
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#003399] mb-2">Passion & Values:</h3>
                <p>
                  I believe that great design isn’t just about aesthetics; it’s about empathy. I’m passionate about user centered design, accessibility, and clean minimal interfaces, ensuring that every product I touch is inclusive and accessible to everyone.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#003399] mb-2">Process & Approach:</h3>
                <p>
                  I don’t just jump into high fidelity mockups. My process starts with asking “why,” understanding business goals, and sketching low fidelity ideas before moving into design. I’m a big believer in iterative testing I’d rather break a prototype early than launch a product that doesn’t solve the user's pain points.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#003399] mb-2">Personal Touch:</h3>
                <p>
                  When I’m not pushing pixels, you can usually find me exploring new design trends, experimenting with AI driven design tools, or working on creative side projects. My love for AI and design innovation actually influences my design work it teaches me efficiency, adaptability, and forward thinking problem solving.
                </p>
              </div>

              <p className="mt-4 italic text-black font-medium">
                I’m currently open to freelance projects and full time remote opportunities. If you have a project in mind or just want to chat about design, I’d love to hear from you!
              </p>

              {/* Social Media Links in a line */}
              <div className="pt-8 border-t border-zinc-200 flex items-center gap-6">
                <button 
                  onClick={() => window.open("https://www.facebook.com/kowser.monob.kongkal/", "_blank")}
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors group text-[#003399]"
                >
                  <Facebook size={18} className="text-[#1877f2]" />
                  <span className="font-bold text-sm">Facebook</span>
                </button>
                <button 
                  onClick={() => window.open("https://github.com/Gacruxweb", "_blank")}
                  className="flex items-center gap-2 hover:text-black transition-colors group text-[#003399]"
                >
                  <Github size={18} className="text-zinc-900" />
                  <span className="font-bold text-sm">GitHub</span>
                </button>
                <button 
                  onClick={() => window.open("https://www.linkedin.com/in/ahmed-kowser", "_blank")}
                  className="flex items-center gap-2 hover:text-blue-700 transition-colors group text-[#003399]"
                >
                  <Linkedin size={18} className="text-[#0a66c2]" />
                  <span className="font-bold text-sm">LinkedIn</span>
                </button>
                <button 
                  onClick={() => window.open("https://wa.me/+8801703220977", "_blank")}
                  className="flex items-center gap-2 hover:text-green-600 transition-colors group text-[#003399]"
                >
                  <MessageCircle size={18} className="text-green-500" />
                  <span className="font-bold text-sm">WhatsApp</span>
                </button>
                <button 
                  onClick={() => window.location.href = "mailto:ahmedimteyajkowser@gmail.com"}
                  className="flex items-center gap-2 hover:text-red-600 transition-colors group text-[#003399]"
                >
                  <Mail size={18} className="text-red-500" />
                  <span className="font-bold text-sm">Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
