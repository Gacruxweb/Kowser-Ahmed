import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Home, 
  Search, 
  X,
  Compass,
  Lock,
  ChevronRight,
  Plus,
  Globe,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppMenuBar } from './AppMenuBar';
import { WindowType } from '@/src/types';

interface Tab {
  id: string;
  url: string;
  title: string;
}

interface BrowserProps {
  isMaximized: boolean;
  initialUrl?: string;
  onOpenApp: (id: WindowType) => void;
}

export const Browser: React.FC<BrowserProps> = ({ isMaximized, initialUrl = 'https://www.google.com/webhp?igu=1', onOpenApp }) => {
  const [tabs, setTabs] = useState<Tab[]>([{ 
    id: 'default', 
    url: initialUrl, 
    title: initialUrl.includes('google') ? 'Google' : 'New Page' 
  }]);
  const [activeTabId, setActiveTabId] = useState('default');
  const [urlInput, setUrlInput] = useState(initialUrl);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync URL input when active tab changes
  useEffect(() => {
    setUrlInput(activeTab.url);
  }, [activeTabId, activeTab.url]);

  const updateTab = (id: string, updates: Partial<Tab>) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const addNewTab = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newTab: Tab = {
      id: newId,
      url: 'https://www.google.com/webhp?igu=1',
      title: 'Google'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const goBack = () => {
    // Note: Cross-origin iframes prevent JS from controlling internal history.
    // This is a browser security limitation.
    try {
      (document.getElementById(`iframe-${activeTabId}`) as HTMLIFrameElement)?.contentWindow?.history.back();
    } catch (e) {
      console.warn('Navigation blocked by cross-origin policy. Manual back navigation is restricted in iframes.');
    }
  };

  const goForward = () => {
    try {
      (document.getElementById(`iframe-${activeTabId}`) as HTMLIFrameElement)?.contentWindow?.history.forward();
    } catch (e) {
      console.warn('Navigation blocked by cross-origin policy.');
    }
  };

  const stopLoading = () => {
    try {
      (document.getElementById(`iframe-${activeTabId}`) as HTMLIFrameElement)?.contentWindow?.stop();
    } catch (e) {
      // Silently fail if cross-origin
    }
  };

  const handleRefresh = () => {
    const iframe = document.getElementById(`iframe-${activeTabId}`) as HTMLIFrameElement;
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = 'about:blank';
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 1);
    }
  };

  const handleNavigate = (e?: React.FormEvent) => {
    e?.preventDefault();
    let targetUrl = urlInput.trim();
    
    if (!targetUrl) return;

    const isUrl = /^https?:\/\//.test(targetUrl) || (targetUrl.includes('.') && !targetUrl.includes(' '));
    
    if (isUrl) {
      if (!/^https?:\/\//.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
      }
    } else {
      targetUrl = `https://www.google.com/search?q=${encodeURIComponent(targetUrl)}&igu=1`;
    }

    updateTab(activeTabId, { url: targetUrl });
  };

  const openExternal = () => {
    let targetUrl = urlInput.trim();
    if (!targetUrl) return;
    const isUrl = /^https?:\/\//.test(targetUrl) || (targetUrl.includes('.') && !targetUrl.includes(' '));
    if (isUrl && !/^https?:\/\//.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    } else if (!isUrl) {
      targetUrl = `https://www.google.com/search?q=${encodeURIComponent(targetUrl)}&igu=1`;
    }
    window.open(targetUrl, '_blank');
  };

  const goHome = () => {
    updateTab(activeTabId, { url: 'https://www.google.com/webhp?igu=1', title: 'Google' });
  };

  return (
    <div className="w-full h-full bg-[#f0f0f0] flex flex-col font-sans select-none overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 bg-[#f0f0f0] border-b border-gray-300">
        <div className="flex gap-0.5 items-center border-r border-gray-400 pr-1 shrink-0">
          <button 
            className="flex flex-col items-center gap-0.5 px-2 py-0.5 hover:bg-black/5 rounded-sm active:shadow-inner" 
            onClick={goBack}
            title="Go Back"
          >
            <div className="p-1 rounded-full bg-[#3b9f48] text-white shadow-sm">
              <ArrowLeft size={16} strokeWidth={3} />
            </div>
            <span className="text-[10px] items-center flex gap-0.5">Back <ArrowLeft size={8} className="rotate-[270deg]" /></span>
          </button>
          <button 
            className="flex flex-col items-center gap-0.5 px-2 py-0.5 hover:bg-black/5 rounded-sm active:shadow-inner"
            onClick={goForward}
            title="Go Forward"
          >
            <div className="p-1 rounded-full bg-[#3b9f48] text-white shadow-sm">
              <ArrowRight size={16} strokeWidth={3} />
            </div>
            <span className="text-[10px] items-center flex gap-0.5">Forward <ArrowLeft size={8} className="rotate-90" /></span>
          </button>
        </div>

        <button 
          onClick={stopLoading} 
          className="flex flex-col items-center gap-0.5 px-2 py-0.5 hover:bg-black/5 rounded-sm shrink-0"
        >
          <X size={20} className="text-red-500" />
          <span className="text-[10px]">Stop</span>
        </button>

        <button 
          onClick={handleRefresh} 
          className="flex flex-col items-center gap-0.5 px-2 py-0.5 hover:bg-black/5 rounded-sm shrink-0 border-r border-gray-400"
        >
          <RotateCcw size={20} className="text-green-600" />
          <span className="text-[10px]">Refresh</span>
        </button>

        <button 
          onClick={goHome}
          className="flex flex-col items-center gap-0.5 px-2 py-0.5 hover:bg-black/5 rounded-sm shrink-0"
        >
          <Home size={20} className="text-[#003399]" />
          <span className="text-[10px]">Home</span>
        </button>

        <div className="h-8 w-px bg-gray-400 mx-1" />

        <button className="flex flex-col items-center gap-0.5 px-2 py-0.5 hover:bg-black/5 rounded-sm shrink-0">
          <Search size={20} className="text-gray-600" />
          <span className="text-[10px]">Search</span>
        </button>
        
        <button className="flex flex-col items-center gap-0.5 px-2 py-0.5 hover:bg-black/5 rounded-sm shrink-0">
          <Compass size={20} className="text-[#003399]" />
          <span className="text-[10px]">Favorites</span>
        </button>

        {/* New Tab Button - Placed right side of Favorites as requested */}
        <button 
          onClick={addNewTab}
          className="flex flex-col items-center gap-0.5 px-2 py-0.5 hover:bg-black/5 rounded-sm shrink-0"
          title="New Tab"
        >
          <Plus size={20} className="text-gray-700" />
          <span className="text-[10px]">New Tab</span>
        </button>

        <div className="flex-1" />
        
        {/* IE Logo area */}
        <div className="w-12 h-12 flex items-center justify-center mr-2">
          <img 
            src="https://icons.iconarchive.com/icons/tatice/cristal-intense/128/Internet-Explorer-icon.png" 
            alt="IE" 
            className="w-8 h-8 spinning-subtle"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Address Bar Area */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 px-2 py-1 bg-[#f0f0f0] border-b border-gray-300">
          <span className="text-[11px] text-gray-700">Address</span>
          <form onSubmit={handleNavigate} className="flex-1 flex gap-2">
            <div className="flex-1 relative flex items-center bg-white border border-gray-400 shadow-inner px-1 h-6">
              <div className="w-4 h-4 mr-1">
                <Globe size={14} className="text-blue-500" />
              </div>
              <input 
                type="text" 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 border-none outline-none text-[12px] h-full"
              />
              <Search size={14} className="text-gray-400 mr-1" />
            </div>
            <button 
              type="submit"
              className="flex items-center gap-1 px-3 bg-[#e1e1e1] border border-gray-500 rounded-sm hover:bg-gray-200 active:bg-gray-300 shadow-sm text-[11px]"
              title="Navigate in app"
            >
              Go
            </button>
            <button 
              type="button"
              onClick={openExternal}
              className="flex items-center gap-1 px-2 bg-[#ffcc00] border border-gray-600 rounded-sm hover:bg-[#ffd633] active:bg-[#e6b800] shadow-sm text-[11px] font-bold"
              title="Open in new window (for Figma, etc.)"
            >
              <ExternalLink size={12} />
            </button>
          </form>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 w-full bg-white relative">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-200",
              activeTabId === tab.id ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          >
            <iframe 
              id={`iframe-${tab.id}`}
              src={tab.url} 
              className="w-full h-full border-0" 
              title={`Internet Explorer Content ${tab.id}`}
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#f0f0f0] border-t border-gray-300 flex items-center px-1 text-[11px] gap-2 shrink-0">
        <div className="flex items-center gap-1 min-w-[200px] border-r border-gray-400 pr-2 overflow-hidden">
          < Globe size={12} className="text-blue-500" />
          <span className="truncate">Done</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 border-l border-gray-400 pl-2">
          <Lock size={12} className="text-gray-500" />
          <span className="pr-4 border-r border-gray-400">Internet</span>
          <div className="w-24 flex items-center justify-center">
            <div className="w-full h-3 bg-gray-200 rounded-sm border border-gray-400 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-blue-500 w-[100%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
