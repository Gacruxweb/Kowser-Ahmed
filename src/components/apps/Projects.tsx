import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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

export const Projects: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Featured Projects</h1>
        <p className="text-muted-foreground">A selection of my recent work in UI/UX and product design.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden group border-white/10 bg-zinc-900/40 backdrop-blur-sm hover:border-blue-500/50 transition-all">
            <div className="aspect-video overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 pt-0">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Github size={18} />
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <ExternalLink size={18} />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
