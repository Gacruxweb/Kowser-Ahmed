import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Square, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WindowState } from '@/src/types';
import { WindowsLogo } from './WindowsLogo';

interface WindowFrameProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  if (!window.isOpen || window.isMinimized) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        width: window.isMaximized ? '100vw' : '80vw',
        height: window.isMaximized ? 'calc(100vh - 48px)' : '70vh',
        top: window.isMaximized ? 0 : '10%',
        left: window.isMaximized ? 0 : '10%',
      }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={cn(
        "fixed xp-window flex flex-col",
        window.isMaximized ? "z-[100]" : ""
      )}
      style={{ zIndex: window.zIndex }}
      onMouseDown={onFocus}
      drag={!window.isMaximized}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      {/* Title Bar */}
      <div 
        className="h-8 flex items-center justify-between px-2 cursor-default select-none xp-title-bar"
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 flex items-center justify-center">
            <WindowsLogo size={12} />
          </div>
          <span className="text-xs font-bold text-white drop-shadow-sm">{window.title}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-5 h-5 flex items-center justify-center bg-[#245edb] border border-white/40 rounded-sm hover:brightness-110 active:brightness-90 shadow-sm"
          >
            <Minus size={12} className="text-white stroke-[3]" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-5 h-5 flex items-center justify-center bg-[#245edb] border border-white/40 rounded-sm hover:brightness-110 active:brightness-90 shadow-sm"
          >
            {window.isMaximized ? <Copy size={10} className="text-white stroke-[3]" /> : <Square size={10} className="text-white stroke-[3]" />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-5 h-5 flex items-center justify-center bg-[#cc0000] border border-white/40 rounded-sm hover:bg-[#ff0000] active:bg-[#990000] shadow-sm ml-1"
          >
            <X size={14} className="text-white stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white m-1 border border-[#aca899]">
        {children}
      </div>
    </motion.div>
  );
};
