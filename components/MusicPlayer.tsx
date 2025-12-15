import React, { useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // In a real scenario, this would play an audio file.
  // Since we can't reliably host audio files here, this is a visual placeholder 
  // that adds to the "App" feel.
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
        <button 
            onClick={togglePlay}
            className={`p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
                isPlaying ? 'bg-rose-500 text-white animate-pulse-slow' : 'bg-white text-rose-800 hover:bg-rose-50'
            }`}
            title="Play 'Our Song'"
        >
            {isPlaying ? (
                <>
                    <Volume2 size={24} />
                    <span className="ml-2 text-sm font-bold hidden md:inline">Playing Our Song</span>
                </>
            ) : (
                <Music size={24} />
            )}
        </button>
        {isPlaying && (
            <div className="absolute bottom-full right-0 mb-4 bg-white/90 backdrop-blur text-xs p-3 rounded-lg shadow-lg w-48 text-center text-rose-900 border border-rose-100">
                Imagine your favorite romantic song is playing right now... 🎵
            </div>
        )}
    </div>
  );
};

export default MusicPlayer;