import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export interface ContextMenuItem {
  label: string;
  onClick?: () => void;
  bold?: boolean;
  disabled?: boolean;
  hasSubmenu?: boolean;
  submenuItems?: ContextMenuItem[];
  icon?: React.ReactNode;
}

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  items: ContextMenuItem[];
  depth?: number;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  isOpen,
  onClose,
  items,
  depth = 0,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (depth === 0 && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen && depth === 0) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, depth]);

  // Adjust position to stay within viewport
  const [adjustedX, setAdjustedX] = useState(x);
  const [adjustedY, setAdjustedY] = useState(y);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newX = x;
      let newY = y;

      if (x + rect.width > viewportWidth) {
        newX = x - rect.width;
      }
      if (y + rect.height > viewportHeight) {
        newY = y - rect.height;
      }

      setAdjustedX(newX);
      setAdjustedY(newY);
    }
  }, [isOpen, x, y]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.05 }}
          style={{ 
            left: adjustedX, 
            top: adjustedY,
            boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
          className={cn(
            "fixed z-[9999] min-w-[160px] bg-white border border-[#808080] py-0.5 select-none"
          )}
        >
          {items.map((item, index) => {
            if (item.label === 'SEPARATOR') {
              return <div key={index} className="my-1 border-t border-[#808080]/30 mx-1" />;
            }

            const isHovered = hoveredIndex === index;

            return (
              <div 
                key={index}
                className="relative"
                onMouseEnter={(e) => {
                  setHoveredIndex(index);
                  setHoveredRect(e.currentTarget.getBoundingClientRect());
                }}
              >
                <button
                  disabled={item.disabled}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.onClick) {
                      item.onClick();
                      onClose();
                    }
                  }}
                  className={cn(
                    "w-full text-left px-2 py-1 text-[11px] flex items-center group h-6",
                    item.disabled ? "text-[#808080] cursor-default" : "text-black hover:bg-[#316ac5] hover:text-white cursor-default",
                    isHovered && !item.disabled && "bg-[#316ac5] text-white"
                  )}
                >
                  <div className="w-5 flex items-center justify-center mr-1">
                    {item.icon}
                  </div>
                  <span className={cn("flex-1", item.bold && "font-bold")}>{item.label}</span>
                  {item.hasSubmenu && <ChevronRight size={12} className={cn("ml-2", item.disabled ? "text-[#808080]" : (isHovered ? "text-white" : "text-black"))} />}
                </button>

                {item.hasSubmenu && item.submenuItems && isHovered && hoveredRect && (
                  <ContextMenu
                    isOpen={true}
                    x={hoveredRect.right - 2}
                    y={hoveredRect.top}
                    onClose={onClose}
                    items={item.submenuItems}
                    depth={depth + 1}
                  />
                )}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
