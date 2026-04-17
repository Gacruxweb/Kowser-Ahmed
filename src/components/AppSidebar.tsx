import React from 'react';
import { 
  ChevronUp, 
  ChevronDown,
  Instagram, 
  Github, 
  Linkedin,
  Facebook,
  Mail,
  MessageCircle,
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
  Globe
} from 'lucide-react';

export interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export const AppSidebar: React.FC = () => {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    "Social Links": true,
    "Skills": true,
    "Software": true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const sections: SidebarSection[] = [
    {
      title: "Social Links",
      items: [
        { 
          name: "Facebook", 
          icon: <Facebook size={14} className="text-blue-600" />,
          onClick: () => window.open("https://www.facebook.com/kowser.monob.kongkal/", "_blank")
        },
        { 
          name: "Github", 
          icon: <Github size={14} className="text-zinc-900" />,
          onClick: () => window.open("https://github.com/Gacruxweb", "_blank")
        },
        { 
          name: "LinkedIn", 
          icon: <Linkedin size={14} className="text-blue-700" />,
          onClick: () => window.open("https://www.linkedin.com/in/ahmed-kowser", "_blank")
        },
        { 
          name: "WhatsApp", 
          icon: <MessageCircle size={14} className="text-green-500" />,
          onClick: () => window.open("https://wa.me/+8801703220977", "_blank")
        },
        { 
          name: "Email", 
          icon: <Mail size={14} className="text-red-500" />,
          onClick: () => window.location.href = "mailto:ahmedimteyajkowser@gmail.com"
        },
      ]
    },
    {
      title: "Skills",
      items: [
        { name: "Graphic Design", icon: <Palette size={14} className="text-orange-500" /> },
        { name: "Web Design", icon: <Globe size={14} className="text-blue-500" /> },
        { name: "Social Graphics", icon: <Monitor size={14} className="text-purple-500" /> },
        { name: "Video Production", icon: <Video size={14} className="text-red-500" /> },
        { name: "UX/UI Design", icon: <Layout size={14} className="text-emerald-500" /> },
        { name: "Attention to Detail", icon: <Target size={14} className="text-blue-600" /> },
        { name: "Creative Thinking", icon: <Lightbulb size={14} className="text-yellow-500" /> },
        { name: "Problem Solving", icon: <MessageSquare size={14} className="text-zinc-500" /> },
      ]
    },
    {
      title: "Software",
      items: [
        { name: "Adobe CC", icon: <Palette size={14} className="text-red-600" /> },
        { name: "VS Code", icon: <Code2 size={14} className="text-blue-500" /> },
        { name: "Cursor", icon: <Terminal size={14} className="text-zinc-800" /> },
        { name: "Claude", icon: <Bot size={14} className="text-orange-400" /> },
        { name: "ChatGPT", icon: <Bot size={14} className="text-emerald-600" /> },
        { name: "Git/GitHub Copilot", icon: <Github size={14} className="text-zinc-900" /> },
        { name: "Docker", icon: <Box size={14} className="text-blue-600" /> },
        { name: "WP (Elementor)", icon: <Layout size={14} className="text-blue-400" /> },
        { name: "Blender", icon: <Layers size={14} className="text-orange-500" /> },
        { name: "Figma", icon: <Figma size={14} className="text-pink-500" /> },
        { name: "Tailwind CSS", icon: <Wind size={14} className="text-sky-400" /> },
        { name: "React / Next.js", icon: <Code2 size={14} className="text-blue-400" /> },
      ]
    }
  ];

  return (
    <div className="w-[220px] bg-gradient-to-b from-[#7da2ce] to-[#d3e5fa] p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar h-full min-h-0">
      {sections.map((section) => (
        <div key={section.title} className="rounded-t-[4px] overflow-hidden shadow-sm shrink-0">
          <button 
            onClick={() => toggleSection(section.title)}
            className="w-full flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#f0f7ff] to-[#d3e5fa] text-[#003399] font-bold"
          >
            <span>{section.title}</span>
            {expandedSections[section.title] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {expandedSections[section.title] && (
            <div className="bg-[#f0f7ff] p-2 flex flex-col gap-2 border-x border-b border-white">
              {section.items.map((item, i) => (
                <button 
                  key={i} 
                  className="flex items-center gap-2 text-[#003399] hover:underline text-left"
                  onClick={item.onClick}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
