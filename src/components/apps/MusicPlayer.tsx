import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Menu,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Zap,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SAMPLE_SONGS } from '@/src/constants/songs';

export const MusicPlayer: React.FC<{
  initialUrl?: string;
  initialIndex?: number;
  onClose?: () => void;
  onMinimize?: () => void;
  dragControls?: any;
}> = ({ initialUrl, initialIndex, onClose, onMinimize, dragControls }) => {
  const playlist = useMemo(() => SAMPLE_SONGS, []);
  
  const [currentSongIndex, setCurrentSongIndex] = useState(() => {
    if (initialIndex !== undefined) return initialIndex;
    if (initialUrl) {
      const idx = playlist.findIndex(s => s.url === initialUrl);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (initialUrl) {
      const idx = playlist.findIndex(s => s.url === initialUrl);
      if (idx !== -1) {
        setCurrentSongIndex(idx);
        setIsPlaying(true);
      }
    } else if (initialIndex !== undefined) {
      setCurrentSongIndex(initialIndex);
      setIsPlaying(true);
    }
  }, [initialUrl, initialIndex, playlist]);

  const [showEqualizer, setShowEqualizer] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = playlist[currentSongIndex];
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const youtubeId = useMemo(() => {
    const match = currentSong.url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }, [currentSong]);

  const playingUrl = useMemo(() => {
    if (!youtubeId) return '';
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=${isPlaying ? 1 : 0}&rel=0&enablejsapi=1&origin=${window.location.origin}`;
  }, [youtubeId, isPlaying]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data.event === 'onStateChange' && data.info === 0) {
          handleNext();
        }
      } catch (e) {}
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [currentSongIndex]);

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: command,
        args: []
      }), '*');
      setIsPlaying(!isPlaying);
    }
  };

  const stopPlay = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'stopVideo',
        args: []
      }), '*');
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-row bg-black h-fit w-fit select-none font-mono items-start translate-y-[-2px]">
      {/* Hidden Player */}
      <div className="hidden">
        {playingUrl && (
          <iframe 
            ref={iframeRef}
            src={playingUrl} 
            allow="autoplay"
          />
        )}
      </div>

      {/* Left Column: Player & Equalizer */}
      <div className="flex flex-col gap-0 border-r border-zinc-800/50">
        {/* Main Winamp Player Section */}
        <div className="w-[275px] bg-[#2b2b2b] border-2 border-zinc-600 p-1 flex flex-col gap-1 shadow-2xl relative z-10">
          {/* Title Bar */}
          <div 
            className="h-4 bg-[#01017e] flex items-center justify-between px-1 cursor-grab active:brightness-110"
            onPointerDown={(e) => dragControls?.start(e)}
          >
            <div className="flex items-center gap-1 pointer-events-none">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-sm" />
              <span className="text-[10px] text-zinc-300 font-bold tracking-widest uppercase">Winamp</span>
            </div>
            <div className="flex items-center gap-1">
               <button 
                 onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
                 className="w-2.5 h-2.5 flex items-center justify-center border border-zinc-500 hover:bg-white/20 active:bg-white/40 transition-colors"
                 title="Minimize"
               >
                  <div className="w-1.5 h-[1px] bg-zinc-400" />
               </button>
               <button 
                 onClick={(e) => { e.stopPropagation(); onClose?.(); }}
                 className="w-2.5 h-2.5 flex items-center justify-center border border-zinc-500 hover:bg-red-600 active:bg-red-800 group transition-colors"
                 title="Close"
               >
                  <X size={8} className="text-zinc-400 group-hover:text-white" />
               </button>
            </div>
          </div>

          {/* Display Area */}
          <div className="h-16 flex gap-1">
            {/* Left: Time and Spectrum */}
            <div className="flex-1 bg-black border border-zinc-700 flex flex-col p-1 relative overflow-hidden">
               <div className="flex items-start gap-1">
                  <span className="text-3xl text-[#00ff22] font-black leading-none drop-shadow-[0_0_5px_rgba(0,255,34,0.3)]">
                    {isPlaying ? '01:23' : '00:00'}
                  </span>
                  <div className="flex flex-col gap-0.5 mt-1">
                     <div className="w-1 h-1 bg-[#00ff22]/30" />
                     <div className="w-1 h-1 bg-[#00ff22]" />
                  </div>
               </div>
               {/* Simple Spectrum Anim */}
               <div className="flex-1 flex items-end gap-[1px] opacity-60">
                  {[...Array(15)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-green-500 via-yellow-400 to-red-500" 
                      style={{ 
                        height: isPlaying ? `${Math.random() * 80 + 10}%` : '2px',
                        transition: 'height 0.1s ease-out'
                      }} 
                    />
                  ))}
               </div>
            </div>
            {/* Right: Info */}
            <div className="w-32 bg-black border border-zinc-700 flex flex-col p-1 text-[9px] uppercase">
               <div className="text-[#00ff22] h-4 overflow-hidden relative">
                  <div className={cn("whitespace-nowrap absolute", isPlaying && "animate-marquee")}>
                    {currentSong.name} - Winamp Classical Style
                  </div>
               </div>
               <div className="flex-1 mt-1 grid grid-cols-2 gap-1 text-zinc-400">
                  <div className="flex flex-col">
                    <span className="text-[#00ff22]/70">128 kbps</span>
                    <span className="text-[#00ff22]/70">44 khz</span>
                  </div>
                  <div className="flex items-end justify-end gap-1">
                     <span className="text-zinc-600">mono</span>
                     <span className="text-[#00ff22]">stereo</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="px-1">
             <div className="h-2 bg-zinc-800 border border-zinc-700 relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-[#01017e] border border-white/20" 
                  style={{ width: isPlaying ? '35%' : '0%', transition: 'width 0.5s' }}
                />
                <div className="absolute top-0 bottom-0 w-3 bg-zinc-400 border border-white/40 shadow-sm" style={{ left: isPlaying ? '35%' : '0%' }} />
             </div>
          </div>

          {/* Playback Controls */}
          <div className="flex flex-col gap-1 px-1">
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-0.5 bg-[#2b2b2b]">
                <ControlButton onClick={handlePrev}><SkipBack size={10} fill="currentColor" /></ControlButton>
                <ControlButton onClick={togglePlay} active={isPlaying}><Play size={10} fill="currentColor" /></ControlButton>
                <ControlButton onClick={togglePlay} active={!isPlaying}><Pause size={10} fill="currentColor" /></ControlButton>
                <ControlButton onClick={stopPlay}><Square size={10} fill="currentColor" /></ControlButton>
                <ControlButton onClick={handleNext}><SkipForward size={10} fill="currentColor" /></ControlButton>
              </div>
              <div className="flex items-center gap-1">
                <ToggleBtn active={showEqualizer} onClick={() => setShowEqualizer(!showEqualizer)}>EQ</ToggleBtn>
                <ToggleBtn active={showPlaylist} onClick={() => setShowPlaylist(!showPlaylist)}>PL</ToggleBtn>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="flex-1 flex items-center gap-2">
                  <Volume2 size={10} className="text-zinc-400" />
                  <div className="flex-1 h-3 bg-zinc-900 border border-zinc-700 relative">
                     <div className="absolute top-0 bottom-0 left-0 bg-blue-600 rounded-sm" style={{ width: '80%' }} />
                     <div className="absolute top-0 bottom-0 left-[-4px] translate-x-[200px] w-2 h-full bg-zinc-400 border border-white/20" />
                  </div>
               </div>
               <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-white/10 rounded"><Shuffle size={10} className="text-zinc-400" /></button>
                  <button className="p-1 hover:bg-white/10 rounded"><Repeat size={10} className="text-zinc-400" /></button>
               </div>
            </div>
          </div>
        </div>

        {/* Winamp Equalizer Section */}
        {showEqualizer && (
          <div className="w-[275px] bg-[#2b2b2b] border-2 border-zinc-600 p-1 flex flex-col gap-1 mt-[-2px] animate-in slide-in-from-top duration-300 relative z-0">
             <div className="h-4 bg-[#01017e] flex items-center px-1">
                <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider">Winamp Equalizer</span>
             </div>
             <div className="h-28 bg-[#1a1a1a] border border-zinc-700 p-2 flex gap-1.5 items-end justify-center">
                {/* Preamp */}
                <div className="flex flex-col items-center gap-1 mr-2">
                   <div className="w-1.5 h-16 bg-zinc-800 border border-zinc-700 relative">
                      <div className="absolute top-1/2 left-0 right-0 h-2 bg-zinc-400 border border-white/20 -mt-1" />
                   </div>
                   <span className="text-[8px] text-zinc-500 uppercase">Pre</span>
                </div>
                {/* Slider bars */}
                {[60, 170, 310, 600, '1K', '3K', '6K', '12K', '14K', '16K'].map((freq, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                     <div className="w-1.5 h-16 bg-zinc-800 border border-zinc-700 relative">
                        <div 
                          className="absolute left-0 right-0 h-2 bg-zinc-400 border border-white/20" 
                          style={{ top: `${Math.random() * 80 + 10}%` }}
                        />
                     </div>
                     <span className="text-[8px] text-zinc-500">{freq}</span>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* Right Column: Winamp Playlist Section */}
      {showPlaylist && (
        <div className={cn(
          "w-[275px] bg-[#2b2b2b] border-2 border-zinc-600 p-1 flex flex-col ml-[-2px] animate-in slide-in-from-left duration-300 self-stretch",
        )}>
           <div className="h-4 bg-[#01017e] flex items-center px-1">
              <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider">Winamp Playlist</span>
           </div>
           <div className="flex-1 bg-black border border-zinc-700 m-1 overflow-y-auto custom-scrollbar p-1 min-h-[100px]">
              {playlist.map((song, i) => (
                <div 
                  key={i}
                  onClick={() => { setCurrentSongIndex(i); setIsPlaying(true); }}
                  className={cn(
                    "group flex items-center justify-between px-2 py-0.5 cursor-pointer text-[10px]",
                    currentSongIndex === i ? "bg-[#01017e] text-white" : "text-[#00ff22] hover:bg-zinc-800"
                  )}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="opacity-50 w-4 text-left">{i + 1}.</span>
                    <span className="truncate">{song.name}</span>
                  </div>
                  <span className="opacity-50">3:45</span>
                </div>
              ))}
           </div>
           <div className="h-8 flex items-center px-2 gap-2 text-zinc-400 text-[9px] font-bold">
              <button className="hover:text-white uppercase">+ File</button>
              <button className="hover:text-white uppercase">- File</button>
              <button className="hover:text-white uppercase">Sel All</button>
              <div className="flex-1 text-right text-[#00ff22]">
                 03:45 / 18:25
              </div>
           </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}} />
    </div>
  );
};

const ControlButton: React.FC<{ children: React.ReactNode; onClick?: () => void; active?: boolean }> = ({ children, onClick, active }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-7 h-[14px] flex items-center justify-center border-t border-l border-zinc-400 bg-zinc-200 text-zinc-800 hover:brightness-110 active:brightness-90 transition-all",
      active && "brightness-90 bg-zinc-300 border-t-zinc-600 border-l-zinc-600"
    )}
  >
    {children}
  </button>
);

const ToggleBtn: React.FC<{ children: React.ReactNode; active?: boolean; onClick?: () => void }> = ({ children, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "px-1 h-[14px] flex items-center justify-center border border-zinc-500 text-[8px] font-bold uppercase transition-all",
      active ? "bg-[#00ff22] text-black border-[#00ff22]" : "text-zinc-500 hover:text-zinc-300"
    )}
  >
    {children}
  </button>
);
