import React from 'react';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  onClick: () => void;
  isOpening: boolean;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onClick, isOpening }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50 cursor-pointer" onClick={!isOpening ? onClick : undefined}>
      <div className={`relative transition-all duration-1000 transform ${isOpening ? 'scale-150 opacity-0' : 'scale-100 hover:scale-105'}`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-rose-400 blur-3xl opacity-20 animate-pulse-slow rounded-full"></div>
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white p-8 rounded-full shadow-2xl border-4 border-rose-100 animate-float">
                <Gift size={80} className="text-rose-500" strokeWidth={1.5} />
            </div>
            
            <div className="mt-12 text-center space-y-2">
                <h1 className="font-serif text-3xl md:text-5xl text-rose-900 font-bold tracking-wide">
                    For My Beautiful Wife
                </h1>
                <p className="font-sans text-rose-600 text-lg uppercase tracking-widest pt-4 animate-pulse">
                    Tap to Open Your Surprise
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GiftBox;