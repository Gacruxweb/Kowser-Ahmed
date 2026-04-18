import React from 'react';
import { motion } from 'motion/react';
import { Folder, FileText, Image as ImageIcon, Music, Film, Github, Globe, X } from 'lucide-react';

interface CreateItemModalProps {
  onClose: () => void;
}

export const CreateItemModal: React.FC<CreateItemModalProps> = ({ onClose }) => {
  const items = [
    { label: 'Folder', icon: <Folder className="text-yellow-500" /> },
    { label: 'Text Document', icon: <FileText className="text-gray-500" /> },
    { label: 'Bitmap Image', icon: <ImageIcon className="text-blue-500" /> },
    { label: 'Wave Sound', icon: <Music className="text-green-500" /> },
    { label: 'Video File', icon: <Film className="text-red-500" /> },
    { label: 'Project Idea', icon: <Github className="text-black" /> },
    { label: 'Website', icon: <Globe className="text-blue-400" /> },
    { label: 'Briefcase', icon: <div className="w-8 h-8 bg-[#8b4513] rounded-sm" /> },
  ];

  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-[540px] bg-[#ece9d8] border-2 border-[#003399] rounded-sm shadow-2xl overflow-hidden shadow-[10px_10px_30px_rgba(0,0,0,0.5)]"
      >
        {/* Title Bar */}
        <div className="h-8 bg-gradient-to-r from-[#003399] to-[#3a6ea5] flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-0.5 rounded-sm">
              <PlusSquare size={14} className="text-[#003399]" />
            </div>
            <span className="text-white font-bold text-[13px] tracking-wide drop-shadow-md">Create New Resource</span>
          </div>
          <button 
            onClick={onClose}
            className="w-5 h-5 bg-[#e97061] hover:bg-[#ff4d4d] flex items-center justify-center rounded-sm border border-white/20 transition-colors shadow-inner"
          >
            <X size={14} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 bg-[#f5f5f5]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {items.map((item, idx) => (
              <button 
                key={idx}
                onClick={onClose}
                className="flex flex-col items-center gap-3 group outline-none"
              >
                <div className="w-16 h-16 bg-white border border-[#aca899] rounded-lg shadow-sm group-hover:shadow-md group-hover:border-[#003399] group-hover:bg-blue-50 flex items-center justify-center transition-all group-active:scale-95 group-active:bg-blue-100">
                  {React.cloneElement(item.icon as any, { size: 32, strokeWidth: 1.5 })}
                </div>
                <span className="text-[11px] font-bold text-zinc-700 group-hover:text-[#003399] text-center w-full leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-[#ece9d8] border-t border-white flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-6 py-1 bg-white border border-[#aca899] rounded shadow-sm text-sm font-medium hover:bg-gray-50 active:bg-gray-100 h-7 flex items-center outline-none"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

import { PlusSquare } from 'lucide-react';
