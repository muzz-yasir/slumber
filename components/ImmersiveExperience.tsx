
import React, { useEffect, useRef, useState } from 'react';
import { Story } from '../types';

interface ImmersiveExperienceProps {
  story: Story;
  isTransitioning: boolean;
  onFinish: () => void;
}

const ImmersiveExperience: React.FC<ImmersiveExperienceProps> = ({ 
  story, 
  isTransitioning,
  onFinish 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  const attemptPlay = () => {
    const video = videoRef.current;
    if (video) {
      video.play()
        .then(() => {
          setHasStarted(true);
          setPlaybackError(false);
        })
        .catch(err => {
          console.error("Playback failed or blocked:", err);
          setPlaybackError(true);
        });
    }
  };

  useEffect(() => {
    // Attempt playback immediately when component mounts
    attemptPlay();
    
    // Also try again when the transition finishes
    if (!isTransitioning) {
      attemptPlay();
    }
  }, [isTransitioning, story.id]);

  const handleVideoEnded = () => {
    setTimeout(() => {
      onFinish();
    }, 4000);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black transition-opacity duration-[3000ms] ease-in-out ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={playbackError ? attemptPlay : undefined}
    >
      {/* Soft color wash background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b ${story.color} opacity-10 mix-blend-screen transition-opacity duration-1000`} 
      />
      
      {/* The cinematic visual */}
      <video
        ref={videoRef}
        key={story.id}
        src={story.placeholderVideo}
        className="w-full h-full object-cover brightness-[0.85] transition-transform duration-[20s] ease-linear"
        playsInline
        preload="auto"
        autoPlay
        muted={false}
        onEnded={handleVideoEnded}
        onPlay={() => {
          setHasStarted(true);
          setPlaybackError(false);
        }}
        onError={() => setPlaybackError(true)}
        style={{
          transform: hasStarted && !isTransitioning ? 'scale(1.05)' : 'scale(1.0)'
        }}
      />

      {/* Deep vignette for bedtime calm */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_130%)] opacity-80" />
      
      {/* Soft title card and optional "Tap to Begin" prompt */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className={`text-center transition-opacity duration-[3000ms] ${hasStarted && !isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-4xl md:text-5xl font-serif italic text-white/50 tracking-tighter drop-shadow-2xl">
            {story.title}
          </h1>
          <div className="mt-6 h-px w-12 bg-white/20 mx-auto" />
          <p className="text-[10px] uppercase tracking-[0.8em] text-white/30 mt-6 font-light">
            {story.chapter}
          </p>
          
          {playbackError && (
            <div className="mt-12 pointer-events-auto cursor-pointer group">
              <button 
                onClick={(e) => { e.stopPropagation(); attemptPlay(); }}
                className="px-6 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/80 group-hover:border-white/40 transition-all bg-black/20 backdrop-blur-sm"
              >
                Tap to Begin Story
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Subtle organic texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
    </div>
  );
};

export default ImmersiveExperience;
