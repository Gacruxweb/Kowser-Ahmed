import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface DesktopIconProps {
  name: string;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  color?: string;
  className?: string;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  name,
  icon,
  onClick,
  onDoubleClick,
  onContextMenu,
  className,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={(e) => {
        if (onContextMenu) {
          e.preventDefault();
          onContextMenu(e);
        }
      }}
      className={cn(
        "w-20 h-[90px] flex flex-col items-center justify-center gap-1 rounded-sm hover:bg-[#003399]/40 transition-colors group",
        className
      )}
    >
      <div className="w-11 h-11 flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-all">
        {icon}
      </div>
      <span className="text-[11px] text-white text-center px-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-normal rounded-sm">
        {name}
      </span>
    </motion.button>
  );
};
