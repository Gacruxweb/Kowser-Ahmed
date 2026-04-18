import React from 'react';

interface PaintProps {
  isMaximized?: boolean;
}

export const Paint: React.FC<PaintProps> = ({ isMaximized }) => {
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      <iframe
        src="https://paint.js.org/"
        className="w-full h-full border-none"
        title="Paint"
        allow="clipboard-read; clipboard-write; shift-key"
      />
    </div>
  );
};
