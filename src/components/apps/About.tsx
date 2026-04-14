import React from 'react';
import { User, MapPin, Mail, Globe, Github, Linkedin, Twitter } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-48 h-48 rounded-2xl overflow-hidden bg-zinc-800 flex-shrink-0 win-shadow">
          <img 
            src="https://picsum.photos/seed/designer/400/400" 
            alt="Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">Kowser Ahmed</h1>
          <p className="text-xl text-muted-foreground mb-6 italic">"Crafting digital experiences with a human touch."</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={18} className="text-blue-500" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail size={18} className="text-blue-500" />
              <span>hello@kowserahmed.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Globe size={18} className="text-blue-500" />
              <span>www.designer.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User size={18} className="text-blue-500" />
              <span>Available for Freelance</span>
            </div>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Hello! I'm Kowser Ahmed, a passionate UI/UX Designer with over 5 years of experience in creating intuitive and visually stunning digital products. I believe that good design is not just about how it looks, but how it works and feels.
            </p>
            <p>
              My approach combines user-centric research with modern aesthetic trends to deliver solutions that solve real problems. I've worked with startups and established brands to redefine their digital presence.
            </p>
          </div>
          
          <div className="flex gap-4 mt-8">
            <button className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:scale-110 transition-transform">
              <Github size={20} />
            </button>
            <button className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:scale-110 transition-transform">
              <Linkedin size={20} />
            </button>
            <button className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:scale-110 transition-transform">
              <Twitter size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
