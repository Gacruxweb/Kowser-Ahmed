import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface ContextMenuItem {
  label: string;
  onClick: () => void;
  bold?: boolean;
  disabled?: boolean;
  hasSubmenu?: boolean;
  icon?: React.ReactNode;
}

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  items: ContextMenuItem[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  isOpen,
  onClose,
  items,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          style={{ 
            left: x, 
            top: y,
            boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
          className="fixed z-[9999] min-w-[150px] bg-white border border-[#808080] py-0.5"
        >
          {items.map((item, index) => {
            if (item.label === 'SEPARATOR') {
              return <div key={index} className="my-1 border-t border-[#808080]/30 mx-1" />;
            }

            return (
              <button
                key={index}
                disabled={item.disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick();
                  onClose();
                }}
                className={cn(
                  "w-full text-left px-2 py-1 text-[11px] flex items-center group h-6",
                  item.disabled ? "text-[#808080] cursor-default" : "text-black hover:bg-[#316ac5] hover:text-white cursor-default"
                )}
              >
                <div className="w-5 flex items-center justify-center mr-1">
                  {item.icon}
                </div>
                <span className={cn("flex-1", item.bold && "font-bold")}>{item.label}</span>
                {item.hasSubmenu && <ChevronRight size={12} className={cn("ml-2", item.disabled ? "text-[#808080]" : "text-black group-hover:text-white")} />}
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
