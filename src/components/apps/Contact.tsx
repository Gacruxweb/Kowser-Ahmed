import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  Search, 
  Folder, 
  LayoutGrid, 
  ChevronDown,
  Phone,
  MapPin,
  CheckCircle2,
  Mail,
  Laptop,
  Facebook,
  Github,
  Linkedin,
  Send,
  PlusSquare,
  Scissors,
  Copy,
  Clipboard,
  XCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from '../AppSidebar';
import { AppMenuBar } from '../AppMenuBar';
import { WindowType } from '@/src/types';

export const Contact: React.FC<{ isMaximized?: boolean; onOpenApp: (id: WindowType) => void }> = ({ 
  isMaximized = false,
  onOpenApp
}) => {
  const [formData, setFormData] = useState({
    from: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ from: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] select-none font-sans text-[11px]">
      {/* Menu Bar */}
      <AppMenuBar currentAppId="contact" onOpenApp={onOpenApp} />

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
          <Mail size={12} className="text-blue-500" />
          <span>Outlook Express\New Message</span>
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

        {/* Main Content (Mail Client Style) */}
        <div className="flex-1 bg-white relative flex flex-col overflow-hidden">
          {/* Background Pattern: White Dot Graph Paper Style */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.05]" 
            style={{ 
              backgroundImage: 'radial-gradient(#000000 0.5px, transparent 0.5px), radial-gradient(#000000 0.5px, transparent 0.5px)',
              backgroundSize: '10px 10px',
              backgroundColor: '#ffffff'
            }} 
          />
          
          {/* Mail Toolbar */}
          <div className="relative z-10 flex items-center gap-2 px-2 py-1.5 bg-[#ece9d8] border-b border-[#aca899]">
            <button 
              onClick={handleSubmit}
              disabled={status === 'submitting' || !formData.from.trim() || !formData.subject.trim() || !formData.message.trim()}
              className="flex items-center gap-1.5 px-2 py-1 hover:bg-white/50 rounded-sm border border-transparent hover:border-[#aca899] transition-all disabled:opacity-50 disabled:cursor-default"
            >
              <div className="relative">
                <Mail size={22} className="text-gray-600" />
                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center">
                  <ChevronRight size={10} className="text-white transform -rotate-45" />
                </div>
              </div>
              <span className="text-[11px]">Send Message</span>
            </button>

            <button 
              onClick={() => setFormData({ from: '', subject: '', message: '' })}
              className="flex items-center gap-1.5 px-2 py-1 hover:bg-white/50 rounded-sm border border-transparent hover:border-[#aca899] transition-all"
            >
              <XCircle size={22} className="text-red-500 fill-white" />
              <span className="text-[11px]">Clear</span>
            </button>

            <div className="h-8 w-px bg-[#aca899] mx-1" />

            <button className="p-1 hover:bg-white/50 rounded-sm opacity-30 cursor-not-allowed">
              <Scissors size={20} className="text-blue-600" />
            </button>
            <button className="p-1 hover:bg-white/50 rounded-sm opacity-30 cursor-not-allowed">
              <Copy size={20} className="text-blue-400" />
            </button>
            <button className="p-1 hover:bg-white/50 rounded-sm opacity-30 cursor-not-allowed">
              <Clipboard size={20} className="text-yellow-500" />
            </button>

            <div className="h-8 w-px bg-[#aca899] mx-1" />

            <button 
              onClick={() => window.open("https://www.linkedin.com/in/ahmed-kowser", "_blank")}
              className="flex items-center gap-1.5 px-2 py-1 hover:bg-white/50 rounded-sm border border-transparent hover:border-[#aca899]"
            >
              <div className="bg-[#0077b5] rounded-sm p-0.5">
                <Linkedin size={16} className="text-white fill-white" />
              </div>
              <span className="text-[11px]">LinkedIn</span>
            </button>

            {status === 'submitting' && (
              <div className="ml-auto flex items-center gap-2 px-2 py-1 bg-blue-50 border border-blue-200 rounded animate-pulse">
                <RefreshCw size={12} className="animate-spin text-blue-600" />
                <span className="text-blue-600 font-bold">Sending...</span>
              </div>
            )}
            
            {status === 'success' && (
              <div className="ml-auto flex items-center gap-2 px-2 py-1 bg-green-50 border border-green-200 rounded">
                <CheckCircle2 size={12} className="text-green-600" />
                <span className="text-green-600 font-bold">Message Delivered!</span>
              </div>
            )}

            {status === 'error' && (
              <div className="ml-auto flex items-center gap-2 px-2 py-1 bg-red-50 border border-red-200 rounded">
                <AlertCircle size={12} className="text-red-600" />
                <span className="text-red-600 font-bold">Delivery Failed</span>
              </div>
            )}
          </div>

          {/* Mail Form */}
          <div className="relative z-10 flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            <div className="space-y-1">
              {/* To Field */}
              <div className="flex items-center gap-3 border-b border-[#aca899] py-1.5 group focus-within:bg-blue-50/30 transition-colors">
                <div className="w-14 text-right text-gray-600 font-medium">To:</div>
                <div className="flex-1 bg-[#f0f0f0] border border-[#7da2ce] px-2 py-0.5 rounded-sm text-gray-700">
                  Kowser Ahmed &lt;ahmedimteyajkowser@gmail.com&gt;
                </div>
              </div>

              {/* From Field */}
              <div className="flex items-center gap-3 border-b border-[#aca899] py-1.5 focus-within:bg-blue-50/30 transition-colors">
                <div className="w-14 text-right text-gray-600 font-medium">From:</div>
                <input 
                  type="text"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  placeholder="Your Name or Email"
                  className="flex-1 border border-[#7da2ce] px-2 py-0.5 rounded-sm italic focus:italic-normal focus:bg-white outline-none transition-all"
                />
              </div>

              {/* Subject Field */}
              <div className="flex items-center gap-3 border-b border-[#aca899] py-1.5 focus-within:bg-blue-50/30 transition-colors">
                <div className="w-14 text-right text-gray-600 font-medium">Subject:</div>
                <input 
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Subject of your message"
                  className="flex-1 border border-[#7da2ce] px-2 py-0.5 rounded-sm italic focus:italic-normal focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            {/* Message Body */}
            <div className="flex-1 flex flex-col min-h-[300px] border border-[#aca899] shadow-inner bg-white/80 focus-within:bg-white transition-colors overflow-hidden">
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message here"
                className="flex-1 p-4 italic focus:not-italic focus:italic-normal outline-none bg-transparent resize-none leading-relaxed text-[12px]"
              />
            </div>
          </div>

          {/* Mail Footer / Status Bar */}
          <div className="relative z-10 px-2 py-1 bg-[#ece9d8] border-t border-[#aca899] text-[#666666] flex items-center justify-between text-[10px]">
            <span>Compose a message to Kowser</span>
            {errorMessage && (
              <span className="text-red-600 font-bold px-2 bg-red-100 border border-red-200 rounded-sm">
                Error: {errorMessage}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
