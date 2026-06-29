import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Movie } from '../types';
import { movieAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const WatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      try {
        const { data } = await movieAPI.getById(id);
        setMovie(data.data);
      } catch { navigate('/home'); }
      finally { setLoading(false); }
    };
    fetchMovie();
  }, [id, navigate]);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => { if (playing) setControlsVisible(false); }, 3000);
  }, [playing]);

  useEffect(() => {
    return () => { if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current); };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress(videoRef.current.currentTime);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const v = Number(e.target.value);
    videoRef.current.volume = v;
    setVolume(v);
    setMuted(v === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!fullscreen) containerRef.current.requestFullscreen();
    else document.exitFullscreen();
    setFullscreen(!fullscreen);
  };

  const skip = (secs: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(Math.max(videoRef.current.currentTime + secs, 0), duration);
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}` : `${m}:${String(sec).padStart(2, '0')}`;
  };

  const saveProgress = useCallback(async () => {
    if (user && id && duration > 0) {
      const pct = Math.round((progress / duration) * 100);
      try { await movieAPI.updateProgress(id, pct); } catch { /* silent */ }
    }
  }, [user, id, progress, duration]);

  useEffect(() => {
    const interval = setInterval(saveProgress, 30000);
    return () => { clearInterval(interval); saveProgress(); };
  }, [saveProgress]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#E50914] font-bold text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black flex flex-col relative overflow-hidden"
      onMouseMove={showControls}
      style={{ cursor: controlsVisible ? 'default' : 'none' }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={movie.videoUrl}
        className="w-full h-screen object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => { if (videoRef.current) setDuration(videoRef.current.duration); }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onWaiting={() => setBuffering(true)}
        onCanPlay={() => setBuffering(false)}
        onClick={togglePlay}
        muted={muted}
      />

      {/* Buffering spinner */}
      {buffering && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Controls */}
      <div className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top bar */}
        <div className="flex items-center gap-4 p-4 md:p-8 bg-gradient-to-b from-black/80 to-transparent">
          <button onClick={() => { saveProgress(); navigate(-1); }} className="text-white hover:text-gray-300 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="text-white font-bold text-lg md:text-xl">{movie.title}</h2>
            <p className="text-gray-400 text-sm">{movie.releaseYear} · {movie.rating}</p>
          </div>
        </div>

        {/* Center play/skip */}
        <div className="flex items-center justify-center gap-8">
          <button onClick={() => skip(-10)} className="text-white/80 hover:text-white p-2">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>
          <button onClick={togglePlay} className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-colors">
            {playing
              ? <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              : <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            }
          </button>
          <button onClick={() => skip(10)} className="text-white/80 hover:text-white p-2">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        {/* Bottom controls */}
        <div className="p-4 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white text-sm font-mono w-14 text-right">{formatTime(progress)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={progress}
              onChange={handleSeek}
              className="flex-1 h-1 rounded-full appearance-none bg-gray-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
              style={{ backgroundImage: `linear-gradient(to right, #E50914 ${(progress / (duration || 1)) * 100}%, #4B5563 ${(progress / (duration || 1)) * 100}%)` }}
            />
            <span className="text-white text-sm font-mono w-14">{formatTime(duration)}</span>
          </div>

          {/* Control buttons row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="text-white hover:text-gray-300">
                {playing
                  ? <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  : <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                }
              </button>
              {/* Volume */}
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-white hover:text-gray-300">
                  {muted || volume === 0
                    ? <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                    : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" /></svg>
                  }
                </button>
                <input
                  type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 rounded-full appearance-none bg-gray-600 cursor-pointer"
                />
              </div>
              <span className="text-white text-sm hidden md:block">{movie.title}</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={toggleFullscreen} className="text-white hover:text-gray-300">
                {fullscreen
                  ? <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" /></svg>
                  : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
