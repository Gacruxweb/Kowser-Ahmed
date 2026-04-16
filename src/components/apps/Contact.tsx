import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  Search, 
  Folder, 
  LayoutGrid, 
  ChevronDown,
  Send,
  Phone,
  MapPin,
  CheckCircle2,
  Mail,
  Laptop
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from '../AppSidebar';
import { WindowsLogo } from '../WindowsLogo';

export const Contact: React.FC<{ isMaximized?: boolean }> = ({ isMaximized = false }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const sidebarSections = []; // Removed duplicated data

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
          <span>Contact Me</span>
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
              Get In Touch
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="space-y-8">
                <div className="flex items-start gap-4 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-blue-300 flex-shrink-0 shadow-xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Email</h3>
                    <p className="text-white/80">hello@designer.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-green-300 flex-shrink-0 shadow-xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Phone</h3>
                    <p className="text-white/80">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-orange-300 flex-shrink-0 shadow-xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Location</h3>
                    <p className="text-white/80">San Francisco, CA</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                {isSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                    <CheckCircle2 size={64} className="text-green-400" />
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-white">Message Sent!</h2>
                      <p className="text-white/80">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    </div>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full font-bold transition-all border border-white/10"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/70 uppercase tracking-widest ml-1">Name</label>
                        <input 
                          type="text"
                          placeholder="John Doe" 
                          required 
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/70 uppercase tracking-widest ml-1">Email</label>
                        <input 
                          type="email" 
                          placeholder="john@example.com" 
                          required 
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-widest ml-1">Subject</label>
                      <input 
                        type="text"
                        placeholder="Project Inquiry" 
                        required 
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-widest ml-1">Message</label>
                      <textarea 
                        className="w-full min-h-[150px] bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all resize-none"
                        placeholder="Tell me about your project..."
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Send size={18} />
                        <span>Send Message</span>
                      </div>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
