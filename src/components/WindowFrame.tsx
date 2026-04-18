import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { X, Minus, Square, Copy, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WindowState } from '@/src/types';
import { WindowsLogo } from './WindowsLogo';

interface WindowFrameProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onUpdate?: (updates: Partial<WindowState>) => void;
  constraintsRef?: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdate,
  constraintsRef,
  children,
}) => {
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(direction);
    onFocus();
  };

  const windowVariants = {
    // 1st Version: Simple variant-based positioning
    normal: (w: WindowState) => ({
      left: w.position?.x ?? '50%',
      top: w.position?.y ?? '50%',
      width: w.size?.width ?? 840,
      height: w.size?.height ?? 500,
      x: w.position?.x !== undefined ? 0 : '-50%',
      y: w.position?.y !== undefined ? 0 : '-50%',
      opacity: 1,
      scale: 1,
      borderRadius: '9px',
      transition: { 
        type: 'spring', 
        damping: 30, 
        stiffness: 500, 
        mass: 0.5,
        // Immediate placement for primary coordinates after state sync
        left: { duration: 0 },
        top: { duration: 0 }
      }
    }),
    maximized: {
      left: 0,
      top: 0,
      width: '100%',
      height: 'calc(100% - 32px)',
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      borderRadius: '0px',
      transition: { 
        type: 'tween', 
        ease: "easeInOut", 
        duration: 0.2,
        // Force these to happen simultaneously
        left: { duration: 0.2 },
        top: { duration: 0.2 }
      }
    }
  };

  useEffect(() => {
    if (!isResizing) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !frameRef.current || !onUpdate) return;
      
      const rect = frameRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Use current screen coordinates
      const pos = { x: rect.left, y: rect.top };
      const size = { width: rect.width, height: rect.height };

      if (isResizing.includes('e')) {
        const maxWidth = viewportWidth - rect.left;
        size.width = Math.min(maxWidth, Math.max(300, e.clientX - rect.left));
      }
      
      if (isResizing.includes('s')) {
        const maxHeight = viewportHeight - rect.top;
        size.height = Math.min(maxHeight, Math.max(200, e.clientY - rect.top));
      }
      
      if (isResizing.includes('w')) {
        const minX = 0;
        const currentX = Math.max(minX, e.clientX);
        const delta = rect.left - currentX;
        if (rect.width + delta >= 300) {
          pos.x = currentX;
          size.width = rect.width + delta;
        }
      }
      
      if (isResizing.includes('n')) {
        const minY = 0;
        const currentY = Math.max(minY, e.clientY);
        const delta = rect.top - currentY;
        if (rect.height + delta >= 200) {
          pos.y = currentY;
          size.height = rect.height + delta;
        }
      }
      
      onUpdate({ position: pos, size, isMaximized: false });
    };
    const handleMouseUp = () => setIsResizing(null);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, onUpdate, win]);

  const windowWidth = win.size?.width ?? 840;
  const windowHeight = win.size?.height ?? 500;

  useEffect(() => {
    // Convert relative positions to absolute pixels on first sync
    if (win.isOpen && constraintsRef?.current && onUpdate) {
      const isXRelative = typeof win.position?.x !== 'number';
      const isYRelative = typeof win.position?.y !== 'number';
      
      if (isXRelative || isYRelative) {
        const parentRect = constraintsRef.current.getBoundingClientRect();
        const taskbarHeight = 32;

        // Calculate center position
        const defaultX = Math.max(0, (parentRect.width - windowWidth) / 2);
        const defaultY = Math.max(0, (parentRect.height - taskbarHeight - windowHeight) / 2);

        const x = typeof win.position?.x === 'number' ? win.position.x : defaultX;
        const y = typeof win.position?.y === 'number' ? win.position.y : defaultY;
        onUpdate({ position: { x, y } });
      }
    }
  }, [win.id, win.isOpen, constraintsRef, onUpdate, win.position, windowWidth, windowHeight]);

  const dragBoundaries = React.useMemo(() => {
    if (!constraintsRef?.current) return { top: 0, left: 0, right: 0, bottom: 0 };
    
    const parentRect = constraintsRef.current.getBoundingClientRect();
    const taskbarHeight = 32;

    // Calculate center position for fallback
    const defaultX = (parentRect.width - windowWidth) / 2;
    const defaultY = (parentRect.height - taskbarHeight - windowHeight) / 2;

    // Current effective coordinates from state
    const curX = typeof win.position?.x === 'number' ? win.position.x : defaultX;
    const curY = typeof win.position?.y === 'number' ? win.position.y : defaultY;

    // Framer Motion's dragConstraints (when passed as an object) 
    // are relative to the component's original layout position (top/left).
    // So the allowed transform offsets are:
    return {
      top: -curY,
      left: -curX,
      right: parentRect.width - curX - windowWidth,
      bottom: parentRect.height - taskbarHeight - curY - windowHeight,
    };
  }, [win.position, win.size, constraintsRef, windowWidth, windowHeight]);

  useEffect(() => {
    const clampToViewport = () => {
      if (!win.isOpen || win.isMaximized || !onUpdate || isResizing) return;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Get current values or defaults
      const currentWidth = win.size?.width ?? 840;
      const currentHeight = win.size?.height ?? 500;
      
      // Determine numeric position (converting strings/percents to pixels for clamping)
      let currentX: number;
      if (typeof win.position?.x === 'number') {
        currentX = win.position.x;
      } else {
        // Handle 15% default
        currentX = viewportWidth * 0.15;
      }

      let currentY: number;
      if (typeof win.position?.y === 'number') {
        currentY = win.position.y;
      } else {
        // Handle 10% default
        currentY = viewportHeight * 0.1;
      }
      
      let newX = currentX;
      let newY = currentY;
      let newWidth = currentWidth;
      let newHeight = currentHeight;
      let needsUpdate = false;

      // 1. Clamp Size: Ensure window isn't bigger than the usable screen
      const maxWidth = viewportWidth;
      const maxHeight = viewportHeight - 32; // Accounting for taskbar height

      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        needsUpdate = true;
      }
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        needsUpdate = true;
      }

      // 2. Clamp Position: Ensure window doesn't bleed off any edge
      if (newX + newWidth > viewportWidth) {
        newX = Math.max(0, viewportWidth - newWidth);
        needsUpdate = true;
      }
      if (newY + newHeight > viewportHeight - 32) {
        newY = Math.max(0, (viewportHeight - 32) - newHeight);
        needsUpdate = true;
      }

      // Ensure no negative coordinates
      if (newX < 0) {
        newX = 0;
        needsUpdate = true;
      }
      if (newY < 0) {
        newY = 0;
        needsUpdate = true;
      }

      if (needsUpdate) {
        onUpdate({ 
          position: { x: newX, y: newY },
          size: { width: newWidth, height: newHeight }
        });
      }
    };

    window.addEventListener('resize', clampToViewport);
    // Initial check to ensure first-time open is safe
    clampToViewport();

    return () => window.removeEventListener('resize', clampToViewport);
  }, [win.isOpen, win.isMaximized, win.position, win.size, onUpdate, isResizing]);

  if (!win.isOpen || win.isMinimized) return null;

  return (
    <motion.div
      ref={frameRef}
      custom={win}
      variants={windowVariants}
      initial={false}
      animate={win.isMaximized ? "maximized" : "normal"}
      className={cn(
        "absolute xp-window flex flex-col shadow-2xl",
        win.isMaximized ? "xp-window-maximized" : "border border-[#003399]"
      )}
      style={{ 
        zIndex: win.zIndex,
      }}
      onMouseDown={onFocus}
      drag={!win.isMaximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={dragBoundaries}
      onDragEnd={(_, info) => {
        if (!frameRef.current) return;
        const rect = frameRef.current.getBoundingClientRect();
        
        // Auto-maximize if dragged to the very top edge
        if (rect.top <= 2) {
          onMaximize();
          return;
        }

        const parentRect = (constraintsRef?.current as HTMLElement)?.getBoundingClientRect() || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        const viewportWidth = parentRect.width;
        const viewportHeight = parentRect.height;
        const taskbarHeight = 32;

        const currentWidth = rect.width;
        const currentHeight = rect.height;

        // Calculate position relative to viewport/parent
        let finalX = rect.left - parentRect.left;
        let finalY = rect.top - parentRect.top;

        // Ultra-strict boundary clamping
        const minX = 0;
        const minY = 0;
        const maxX = Math.max(0, viewportWidth - currentWidth);
        const maxY = Math.max(0, (viewportHeight - taskbarHeight) - currentHeight);

        finalX = Math.round(Math.max(minX, Math.min(maxX, finalX)));
        finalY = Math.round(Math.max(minY, Math.min(maxY, finalY)));

        // 1st Version drag end: Basic state commitment
        onUpdate?.({ 
          position: { x: finalX, y: finalY }, 
          snapMode: 'none', 
          isMaximized: false 
        });
      }}
    >
      {/* Title Bar */}
      <div 
        className="h-8 flex items-center justify-between px-2 cursor-default select-none xp-title-bar shrink-0 active:brightness-110"
        onPointerDown={(e) => !win.isMaximized && dragControls.start(e)}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2 pointer-events-none">
          <div className="w-4 h-4 flex items-center justify-center">
            <WindowsLogo size={12} />
          </div>
          <span className="text-xs font-bold text-white drop-shadow-sm truncate max-w-[200px] md:max-w-md">
            {win.title}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-[21px] h-[21px] flex items-center justify-center bg-[#245edb] border border-white/40 rounded-sm hover:brightness-125 active:brightness-90 shadow-sm transition-all"
            aria-label="Minimize"
          >
            <Minus size={12} className="text-white stroke-[3]" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-[21px] h-[21px] flex items-center justify-center bg-[#245edb] border border-white/40 rounded-sm hover:brightness-125 active:brightness-90 shadow-sm transition-all"
            aria-label={win.isMaximized ? "Restore" : "Maximize"}
          >
            {win.isMaximized ? (
              <Copy size={10} className="text-white stroke-[3]" />
            ) : (
              <div className="w-2.5 h-2 border-[2px] border-white" />
            )}
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-[21px] h-[21px] flex items-center justify-center bg-[#cc0000] border border-white/40 rounded-sm hover:bg-[#ff0000] active:bg-[#990000] shadow-sm ml-1 transition-colors"
            aria-label="Close"
          >
            <X size={14} className="text-white stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-[#ECE9D8] relative p-[3px]">
        <div className="w-full h-full bg-white border border-[#919B9C] overflow-auto custom-scrollbar">
          {children}
        </div>
      </div>

      {/* Resize Handles */}
      {!win.isMaximized && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="pointer-events-auto absolute top-0 left-0 w-1 h-full cursor-w-resize" onMouseDown={(e) => handleResizeStart(e, 'w')} />
          <div className="pointer-events-auto absolute top-0 right-0 w-1 h-full cursor-e-resize" onMouseDown={(e) => handleResizeStart(e, 'e')} />
          <div className="pointer-events-auto absolute top-0 left-0 w-full h-1 cursor-n-resize" onMouseDown={(e) => handleResizeStart(e, 'n')} />
          <div className="pointer-events-auto absolute bottom-0 left-0 w-full h-1 cursor-s-resize" onMouseDown={(e) => handleResizeStart(e, 's')} />
          
          <div className="pointer-events-auto absolute top-0 left-0 w-3 h-3 cursor-nw-resize" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
          <div className="pointer-events-auto absolute top-0 right-0 w-3 h-3 cursor-ne-resize" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
          <div className="pointer-events-auto absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
          <div className="pointer-events-auto absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={(e) => handleResizeStart(e, 'se')} />
        </div>
      )}
    </motion.div>
  );
};
