import React, { useEffect, useRef, useState } from 'react';

export const HeroBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number;

    const checkTime = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;

      if (duration > 0) {
        // Fade in over 0.5s at the start (opacity 0 to 1)
        if (currentTime < 0.5) {
          setOpacity(currentTime / 0.5);
        } 
        // Fade out over 0.5s before the end (opacity 1 to 0)
        else if (currentTime > duration - 0.5) {
          setOpacity((duration - currentTime) / 0.5);
        } 
        else {
          setOpacity(1);
        }
      }

      frameId = requestAnimationFrame(checkTime);
    };

    frameId = requestAnimationFrame(checkTime);

    const handleEnded = () => {
      setOpacity(0);
      if (video) {
        video.currentTime = 0;
        video.play().catch(err => console.error("Video play failed:", err));
      }
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(frameId);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
        className="absolute w-full h-full object-cover"
        style={{ 
          opacity, 
          top: '0', 
          left: '0',
          transition: 'opacity 0.1s linear'
        }}
        muted
        playsInline
        autoPlay
      />
    </div>
  );
};
