import React from 'react';
import { Laptop, X, ExternalLink } from 'lucide-react';
import { projects } from '@/src/projectsData';
import { cn } from '@/lib/utils';
import { getGoogleDriveDirectUrl } from '@/src/lib/driveUtils';

interface ProjectDetailProps {
  projectId: string;
  isMaximized?: boolean;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, isMaximized = false, onClose }) => {
  const project = projects.find(p => p.id === projectId);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] text-[11px] text-[#333]">
      {/* Dialog Content */}
      <div className={cn("p-3 flex flex-col gap-3", isMaximized ? "h-full" : "")}>
        {/* Tabs Area */}
        <div className="flex items-end px-2 translate-y-[1px]">
          <div className="px-3 py-1 bg-[#ffffff] border-t border-x border-[#aca899] rounded-t-sm z-10 text-[11px] font-medium">General</div>
          <div className="px-3 py-1 bg-transparent text-[#aca899] text-[11px] cursor-not-allowed">View</div>
        </div>

        {/* Inner Tab Page */}
        <div className={cn(
          "bg-white border border-[#aca899] p-4 flex flex-col gap-4",
          isMaximized ? "flex-1 overflow-hidden" : ""
        )}>
          <div className={cn(
            "flex flex-col gap-4",
            isMaximized ? "grid grid-cols-2 h-full gap-8" : ""
          )}>
            {/* Banner Section (Left side in Max mode) */}
            <fieldset className={cn("border border-[#d0d0bf] p-3 pt-2 relative", isMaximized ? "h-full flex flex-col" : "")}>
              <legend className="px-1 text-[#000]">Banner</legend>
              <div className={cn(
                "rounded-sm overflow-hidden border border-[#aca899] shadow-inner bg-gray-100",
                isMaximized ? "flex-1" : "aspect-video w-full"
              )}>
                <img 
                  src={getGoogleDriveDirectUrl(project.image)} 
                  alt="Banner" 
                  className={cn(
                    "w-full h-full object-cover",
                    isMaximized ? "object-contain bg-gray-50" : "object-cover"
                  )}
                  referrerPolicy="no-referrer"
                />
              </div>
            </fieldset>

            {/* Details Section (Right side in Max mode) */}
            <div className={cn("flex flex-col gap-4", isMaximized ? "h-full" : "")}>
              {/* Title & Time Section */}
              <div className="grid grid-cols-2 gap-4">
                <fieldset className="border border-[#d0d0bf] p-3 pt-2">
                  <legend className="px-1">Title</legend>
                  <div className="font-bold text-[12px] text-[#003399] uppercase tracking-wide">{project.title}</div>
                </fieldset>
                <fieldset className="border border-[#d0d0bf] p-3 pt-2">
                  <legend className="px-1">Time Period</legend>
                  <div className="italic text-[#666]">{project.timePeriod}</div>
                </fieldset>
              </div>

              {/* Tags Section */}
              <fieldset className="border border-[#d0d0bf] p-3 pt-2">
                <legend className="px-1">Tags</legend>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-[#f0f0f0] border border-[#ccc] px-1.5 py-0.5 rounded-sm text-[10px] text-[#555]">
                      {tag}
                    </span>
                  ))}
                </div>
              </fieldset>

              {/* Description Section */}
              <fieldset className={cn(
                "border border-[#d0d0bf] p-3 pt-2 bg-gray-50/30",
                isMaximized ? "flex-1 flex flex-col" : ""
              )}>
                <legend className="px-1">Description</legend>
                <div className={cn(
                  "overflow-y-auto px-1 leading-normal text-left whitespace-pre-wrap italic text-gray-700 custom-scrollbar",
                  isMaximized ? "flex-1" : "max-h-[150px]"
                )}>
                  {project.longDescription}
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        {/* Dialog Footer Actions */}
        <div className="flex justify-end gap-2 pr-1 pt-1 mb-2">
          <button 
            onClick={onClose}
            className="min-w-[75px] h-[23px] bg-[#f0f0f0] border border-[#aca899] hover:border-[#003399] hover:bg-[#e6e6e6] rounded-sm text-[11px] active:bg-[#d4d4d4] shadow-sm transition-colors"
          >
            OK
          </button>
          <button 
            onClick={() => window.open(project.liveLink, '_blank')}
            className="min-w-[85px] h-[23px] bg-[#f0f0f0] border border-[#aca899] hover:border-[#003399] hover:bg-[#e6e6e6] rounded-sm text-[11px] font-bold text-[#003399] active:bg-[#d4d4d4] shadow-sm transition-colors group"
          >
            <div className="flex items-center justify-center gap-1">
              <ExternalLink size={12} />
              <span>Live link</span>
            </div>
          </button>
          <button 
            disabled
            className="min-w-[75px] h-[23px] bg-[#f0f0f0] border border-[#aca899] text-[#aca899] rounded-sm text-[11px] cursor-not-allowed opacity-60"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
