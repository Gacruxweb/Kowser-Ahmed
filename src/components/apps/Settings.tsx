import React from 'react';
import { Settings as SettingsIcon, Monitor, Shield, AppWindow, Palette, User, Search, Wifi, Volume2, Battery } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 p-4 space-y-1">
        <div className="flex items-center gap-3 p-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
            <User size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Kowser Ahmed</span>
            <span className="text-[10px] opacity-60">Local Account</span>
          </div>
        </div>
        
        {[
          { icon: <Monitor size={18} />, label: 'System', active: true },
          { icon: <Wifi size={18} />, label: 'Network & internet' },
          { icon: <Palette size={18} />, label: 'Personalization' },
          { icon: <AppWindow size={18} />, label: 'Apps' },
          { icon: <User size={18} />, label: 'Accounts' },
          { icon: <Search size={18} />, label: 'Privacy & security' },
        ].map((item) => (
          <div 
            key={item.label}
            className={`flex items-center gap-3 p-2 rounded-md text-sm cursor-pointer transition-colors ${item.active ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-white/5'}`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-8">System</h1>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <Monitor className="text-blue-500" />
              <div>
                <h3 className="text-sm font-medium">Display</h3>
                <p className="text-xs opacity-60">Monitors, brightness, night light, display profile</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <Volume2 className="text-blue-500" />
              <div>
                <h3 className="text-sm font-medium">Sound</h3>
                <p className="text-xs opacity-60">Volume levels, output devices, sound schemes</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <Battery className="text-blue-500" />
              <div>
                <h3 className="text-sm font-medium">Power & battery</h3>
                <p className="text-xs opacity-60">Sleep, battery usage, power mode</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
