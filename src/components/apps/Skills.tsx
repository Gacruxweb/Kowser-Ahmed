import React from 'react';
import { 
  Figma, 
  Layers, 
  Palette, 
  MousePointer2, 
  Smartphone, 
  Monitor,
  Zap,
  Search,
  MessageSquare,
  PenTool
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Design Tools',
    skills: [
      { name: 'Figma', level: 95, icon: <Figma size={18} /> },
      { name: 'Adobe XD', level: 85, icon: <Layers size={18} /> },
      { name: 'Photoshop', level: 80, icon: <Palette size={18} /> },
      { name: 'Illustrator', level: 75, icon: <PenTool size={18} /> },
    ]
  },
  {
    title: 'UI/UX Skills',
    skills: [
      { name: 'User Research', level: 90, icon: <Search size={18} /> },
      { name: 'Wireframing', level: 95, icon: <MousePointer2 size={18} /> },
      { name: 'Prototyping', level: 90, icon: <Zap size={18} /> },
      { name: 'Mobile Design', level: 95, icon: <Smartphone size={18} /> },
      { name: 'Web Design', level: 90, icon: <Monitor size={18} /> },
      { name: 'UX Writing', level: 70, icon: <MessageSquare size={18} /> },
    ]
  }
];

export const Skills: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Skillset</h1>
        <p className="text-muted-foreground">Tools and methodologies I use to bring ideas to life.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {skillCategories.map((category) => (
          <div key={category.title}>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full" />
              {category.title}
            </h2>
            <div className="space-y-6">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">{skill.icon}</span>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <h3 className="text-lg font-semibold mb-2 text-blue-400">Current Focus</h3>
        <p className="text-sm text-muted-foreground">
          I'm currently exploring **Motion Design** and **Advanced Prototyping** using Framer and Rive to create more dynamic and engaging user interfaces.
        </p>
      </div>
    </div>
  );
};
