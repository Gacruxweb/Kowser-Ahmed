import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const HeroBackground: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#003399]">
      <img
        src="https://lh3.googleusercontent.com/d/1WGuYL34zahhYqib0Dzyis9JnbQRT909f"
        alt="Desktop Background"
        className={cn(
          "absolute w-full h-full object-cover transition-opacity duration-1000",
          isReady ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsReady(true)}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
};
