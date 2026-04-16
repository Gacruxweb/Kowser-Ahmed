import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const HeroBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#003399]">
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
        className={cn(
          "absolute w-full h-full object-cover transition-opacity duration-500",
          isReady ? "opacity-100" : "opacity-0"
        )}
        onCanPlay={() => setIsReady(true)}
        muted
        playsInline
        autoPlay
        loop
      />
    </div>
  );
};
