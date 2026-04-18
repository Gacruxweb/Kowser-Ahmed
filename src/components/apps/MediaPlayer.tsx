import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw,
  Film,
  Music,
  Info,
  ExternalLink,
  Clock,
  Share2,
  List
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getGoogleDriveDirectUrl } from '@/src/lib/driveUtils';

import { WindowType } from '@/src/types';

export const MediaPlayer: React.FC<{ 
  isMaximized?: boolean; 
  initialUrl?: string; 
  initialType?: 'video' | 'embed' | 'audio';
  onOpenApp?: (id: WindowType) => void;
}> = ({ 
  isMaximized = false,
  initialUrl,
  initialType,
  onOpenApp
}) => {
  const [url, setUrl] = useState(initialUrl || '');
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'video' | 'embed' | 'audio'>(initialType || 'video');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const playlist = useMemo(() => [
    { title: 'Jason Leonard - Selection 1', url: 'https://youtu.be/sMwKrxZKUSc?si=0kD9R8WnArOKgVM5', type: 'embed' as const },
    { title: 'Jason Leonard - Selection 2', url: 'https://youtu.be/kw4tT7SCmaY?si=_E_6gZTafXl46FGe', type: 'embed' as const },
    { title: 'Jason Leonard - Selection 3', url: 'https://youtu.be/TZE9gVF1QbA?si=uyeAVHGa645HooRX', type: 'embed' as const },
    { title: 'Jason Leonard - Selection 4', url: 'https://youtu.be/RgKAFK5djSk?si=KQzK9xXZGNCqeJdG', type: 'embed' as const },
    { title: 'Jason Leonard - Selection 5', url: 'https://youtu.be/AJtDXIazrMo?si=xyCWAIYrjkGCeT6U', type: 'embed' as const },
    { title: 'Jason Leonard - Selection 6', url: 'https://youtu.be/kJQP7kiw5Fk?si=95eiN2CN74Kcovi5', type: 'embed' as const },
    { title: 'Jason Leonard - Selection 7', url: 'https://youtu.be/2Vv-BfVoq4g?si=wxq8y1SrQiCHq5aN', type: 'embed' as const },
    { title: 'Jason Leonard - Selection 8', url: 'https://youtu.be/hbqoaJ8sKsQ?si=sJfsGGBnx_n3nXRw', type: 'embed' as const },
    { title: 'Jason Leonard - Selection 9', url: 'https://youtu.be/WTJSt4wP2ME?si=NTtx2IWXLeVvou47', type: 'embed' as const },
    { title: 'YouTube: Jason Leonard', url: 'https://youtu.be/pRpeEdMmmQ0?si=RpkL4DXGXeWu2rAX', type: 'embed' as const },
  ], []);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl);
      setPlayingUrl(null);
      handlePlay(initialUrl, initialType || 'video');
    } else {
      // Default to the user's requested YouTube video
      handlePlay('https://youtu.be/pRpeEdMmmQ0?si=RpkL4DXGXeWu2rAX', 'embed');
    }
  }, [initialUrl, initialType]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlay = (customUrl?: string, customType?: 'video' | 'embed' | 'audio') => {
    const targetUrl = (customUrl || url).trim();
    if (!targetUrl) return;

    let activeType = customType || mediaType;
    setUrl(targetUrl);

    // Auto-transform Google Drive links
    const gDriveIdMatch = targetUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || targetUrl.match(/id=([a-zA-Z0-9_-]+)/);
    const gDriveId = gDriveIdMatch ? gDriveIdMatch[1] : null;

    // Auto-transform YouTube links
    const youtubeIdMatch = targetUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/);
    const youtubeId = youtubeIdMatch ? youtubeIdMatch[1] : null;

    let finalUrl = targetUrl;

    if (youtubeId) {
      finalUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&enablejsapi=1&origin=${window.location.origin}`;
      activeType = 'embed';
    } else if (gDriveId) {
      if (activeType === 'embed') {
        finalUrl = `https://drive.google.com/file/d/${gDriveId}/preview`;
      } else {
        finalUrl = `https://drive.google.com/uc?export=download&id=${gDriveId}`;
      }
    }
    
    setMediaType(activeType);
    setPlayingUrl(finalUrl);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const currentIndex = playlist.findIndex(item => item.url === url);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % playlist.length;
      const next = playlist[nextIndex];
      handlePlay(next.url, next.type);
    }
  };

  const handlePrev = () => {
    const currentIndex = playlist.findIndex(item => item.url === url);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      const prev = playlist[prevIndex];
      handlePlay(prev.url, prev.type);
    }
  };

  const togglePlay = () => {
    if (mediaType === 'embed') {
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
      return;
    }

    const media = videoRef.current || audioRef.current;
    if (media) {
      if (isPlaying) {
        media.pause();
      } else {
        media.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      setCurrentTime(media.currentTime);
      setProgress((media.currentTime / media.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      setDuration(media.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      const seekTime = (parseFloat(e.target.value) / 100) * media.duration;
      media.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const toggleMute = () => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      media.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const media = videoRef.current || audioRef.current;
    if (media) {
      const newVolume = parseFloat(e.target.value);
      media.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] text-white font-sans overflow-hidden">
      {/* Main View Area */}
      <div className="flex-1 flex overflow-hidden">
        <div 
          className="flex-1 relative flex items-center justify-center bg-black group overflow-hidden"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => !isPlaying && setShowControls(true)}
        >
          {!playingUrl ? (
            <div className="flex flex-col items-center gap-6 animate-pulse">
              <div className="w-32 h-32 rounded-full bg-gradient-to-b from-red-600/20 to-zinc-900 border border-red-500/20 flex items-center justify-center relative shadow-2xl overflow-hidden group">
                  <Play size={64} className="text-red-600/50 group-hover:scale-110 transition-transform duration-500" fill="currentColor" />
                  <div className="absolute inset-0 rounded-full border border-white/5 animate-ping duration-[3000ms]" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 tracking-tighter italic">
                   YouTube <span className="text-red-600">Clone</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-red-500 font-bold opacity-60">Wait until you load a stream</span>
              </div>
            </div>
          ) : mediaType === 'embed' ? (
            <iframe 
              ref={iframeRef}
              src={playingUrl} 
              className="w-full h-full border-none z-0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : mediaType === 'video' ? (
            <video 
              ref={videoRef}
              src={playingUrl} 
              className="w-full h-full z-0" 
              autoPlay 
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleNext}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#181818]">
               <div className="relative group">
                 <div className="w-48 h-48 rounded-2xl bg-zinc-900 flex items-center justify-center shadow-[0_0_80px_rgba(220,38,38,0.1)] border border-white/5">
                    <div className={cn("w-32 h-32 rounded-full bg-red-600/10 flex items-center justify-center border border-red-600/20", isPlaying && "animate-pulse")}>
                      <Music size={64} className="text-red-600" />
                    </div>
                 </div>
                 <audio 
                   ref={audioRef}
                   src={playingUrl} 
                   autoPlay 
                   onTimeUpdate={handleTimeUpdate}
                   onLoadedMetadata={handleLoadedMetadata}
                   onPlay={() => setIsPlaying(true)}
                   onPause={() => setIsPlaying(false)}
                   onEnded={handleNext}
                   referrerPolicy="no-referrer"
                 />
               </div>
            </div>
          )}

          {/* YouTube Floating Overlays */}
          {playingUrl && mediaType !== 'embed' && (
             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                <div className="flex items-center gap-12 pointer-events-auto">
                  <button onClick={handlePrev} className="text-white/60 hover:text-white transition-colors bg-black/40 p-3 rounded-full backdrop-blur-sm"><SkipBack size={24} /></button>
                  <button 
                    onClick={togglePlay}
                    className="w-20 h-20 rounded-full bg-white/20 border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all backdrop-blur-md shadow-2xl"
                  >
                    {isPlaying ? <Pause size={40} fill="white" /> : <Play size={40} className="ml-1.5" fill="white" />}
                  </button>
                  <button onClick={handleNext} className="text-white/60 hover:text-white transition-colors bg-black/40 p-3 rounded-full backdrop-blur-sm"><SkipForward size={24} /></button>
                </div>
             </div>
          )}

          {/* YouTube Branding */}
          {playingUrl && (
            <div className="absolute bottom-16 right-8 z-20 flex flex-col items-end gap-5 pointer-events-none">
               <div className="flex items-center gap-5 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2.5 rounded-full bg-[#272727] backdrop-blur-md border border-white/10 hover:bg-[#3f3f3f] cursor-pointer"><Share2 size={18} /></div>
                  <div className="p-2.5 rounded-full bg-[#272727] backdrop-blur-md border border-white/10 hover:bg-[#3f3f3f] cursor-pointer"><Clock size={18} /></div>
               </div>
            </div>
          )}
        </div>

        {/* YouTube Sidebar Playlist */}
        {showPlaylist && (
          <div className="w-80 bg-[#0f0f0f] border-l border-zinc-800 flex flex-col animate-in slide-in-from-right duration-500 shadow-2xl">
             <div className="p-4 border-b border-zinc-800/50 bg-[#0f0f0f] flex items-center justify-between">
                <span className="font-bold text-sm tracking-tight">Up Next</span>
                <button onClick={() => setShowPlaylist(false)} className="w-8 h-8 rounded-full hover:bg-zinc-800 flex items-center justify-center transition-colors">×</button>
             </div>
             <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 custom-scrollbar">
                {playlist.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handlePlay(item.url, item.type)}
                    className={cn(
                      "flex items-start gap-3 p-2 rounded-xl text-left transition-all duration-300 group",
                      url === item.url ? "bg-[#272727] ring-1 ring-white/10" : "hover:bg-[#272727]/50"
                    )}
                  >
                    <div className={cn(
                      "w-32 h-18 bg-zinc-900 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform",
                      url === item.url ? "ring-2 ring-red-600" : "border border-white/5"
                    )}>
                      {item.type === 'embed' ? (
                        <div className="w-full h-full bg-gradient-to-br from-red-600/30 via-zinc-900 to-black flex items-center justify-center">
                          <Play size={16} fill="white" className="drop-shadow-lg" />
                        </div>
                      ) : item.type === 'video' ? (
                          <Film size={20} className="text-zinc-500" />
                      ) : (
                          <Music size={20} className="text-zinc-500" />
                      )}
                      {url === item.url && (
                        <div className="absolute inset-0 bg-red-600/20 flex items-end justify-center pb-1">
                           <span className="text-[8px] font-bold uppercase tracking-widest text-white shadow-sm">Playing</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className={cn(
                        "text-[12px] font-bold line-clamp-2 leading-snug",
                        url === item.url ? "text-white" : "text-zinc-300 group-hover:text-white"
                      )}>{item.title}</span>
                      <span className="text-[10px] text-zinc-500 mt-1 font-medium italic">Music Stream</span>
                    </div>
                  </button>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* YouTube Dark Bottom Bar */}
      <div className="bg-[#0f0f0f] border-t border-zinc-900 flex flex-col px-4 py-1">
        <div className="flex items-center justify-between px-1">
          {/* Controls */}
          <div className="flex items-center gap-5">
             <button onClick={handlePrev} className="text-zinc-400 hover:text-white transition-colors"><SkipBack size={20} fill="currentColor" /></button>
             
             <button 
                onClick={togglePlay}
                className="w-10 h-10 rounded-full hover:bg-zinc-800 flex items-center justify-center transition-colors active:scale-90"
              >
                {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-0.5" />}
              </button>

             <button onClick={handleNext} className="text-zinc-400 hover:text-white transition-colors"><SkipForward size={20} fill="currentColor" /></button>
             
          </div>

          <div className="flex items-center gap-5">
             <button 
               onClick={() => setShowPlaylist(!showPlaylist)}
               className={cn("transition-all duration-300 p-2 rounded-lg", showPlaylist ? "bg-red-600/20 text-red-500" : "text-zinc-400 hover:text-white hover:bg-zinc-800")}
             >
               <List size={20} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
