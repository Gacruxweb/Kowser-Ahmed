import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  RotateCw, 
  Trash2, 
  Printer, 
  Save, 
  Edit, 
  HelpCircle,
  Play,
  Maximize2,
  Image as ImageIcon,
  Expand
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageViewerProps {
  images?: { name: string; url: string }[];
  initialIndex?: number;
  isMaximized?: boolean;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ 
  images = [], 
  initialIndex = 0,
  isMaximized = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const currentImage = images[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
    setRotation(0);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
    setRotation(0);
  };
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotateLeft = () => setRotation((prev) => prev - 90);
  const handleRotateRight = () => setRotation((prev) => prev + 90);
  const handleBestFit = () => setZoom(1);
  const handleActualSize = () => setZoom(1.5);

  if (images.length === 0) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center text-gray-500 font-sans">
        No images to display.
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans select-none">
      {/* Main Viewport */}
      <div className="flex-1 relative overflow-hidden bg-white flex items-center justify-center p-4">
        <div 
          className="w-full h-full transition-all duration-300 ease-out flex items-center justify-center"
          style={{ 
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
        >
          <img 
            src={currentImage.url} 
            alt={currentImage.name}
            className="max-w-full max-h-full object-contain shadow-xl"
            referrerPolicy="no-referrer"
            style={{
                // Ensure the animation of scaling/rotation looks smooth
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
            }}
          />
        </div>
      </div>

      {/* Toolbar - XP Style */}
      <div className="h-[45px] bg-[#f0f0f0] border-t border-[#aca899] flex items-center justify-center p-1">
        <div className="flex items-center gap-0.5 px-4 py-0.5 bg-white/50 rounded-md border border-gray-300/50 shadow-sm">
          {/* Navigation */}
          <button onClick={handlePrev} className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800 transition-colors" title="Previous Image">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNext} className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800 transition-colors" title="Next Image">
            <ChevronRight size={20} />
          </button>
          
          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Sizing */}
          <button onClick={handleBestFit} className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800" title="Best Fit">
            <Expand size={20} />
          </button>
          <button onClick={handleActualSize} className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800" title="Actual Size">
            <ImageIcon size={20} />
          </button>
          <button className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800" title="Slide Show">
            <Play size={20} />
          </button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Zoom */}
          <button onClick={handleZoomIn} className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800" title="Zoom In">
            <ZoomIn size={20} />
          </button>
          <button onClick={handleZoomOut} className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800" title="Zoom Out">
            <ZoomOut size={20} />
          </button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Rotation */}
          <button onClick={handleRotateLeft} className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800" title="Rotate Counterclockwise">
            <RotateCcw size={20} />
          </button>
          <button onClick={handleRotateRight} className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800" title="Rotate Clockwise">
            <RotateCw size={20} />
          </button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Actions */}
          <button className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-red-600" title="Delete">
            <Trash2 size={20} />
          </button>
          <button className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800" title="Print">
            <Printer size={20} />
          </button>
          <button className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800" title="Save">
            <Save size={20} />
          </button>
          <button className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800" title="Edit">
            <Edit size={20} />
          </button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          <button className="p-1 hover:bg-blue-600 hover:text-white rounded-sm text-blue-800" title="Help">
            <HelpCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
