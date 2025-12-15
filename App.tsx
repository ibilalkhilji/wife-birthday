import React, { useState, useEffect } from 'react';
import GiftBox from './components/GiftBox';
import AIHeart from './components/AIHeart';
import ReasonsList from './components/ReasonsList';
import MusicPlayer from './components/MusicPlayer';
import ScrollReveal from './components/ScrollReveal';
import { SurpriseState } from './types';
import { Heart } from 'lucide-react';

// Simple confetti using CSS
interface ConfettiParticleProps {
  delay: number;
  left: number;
  color: string;
}

const ConfettiParticle: React.FC<ConfettiParticleProps> = ({ delay, left, color }) => (
  <div 
    className="fixed top-[-20px] w-3 h-3 rounded-sm z-50 animate-fall"
    style={{
        left: `${left}%`,
        backgroundColor: color,
        animationDuration: `${Math.random() * 2 + 3}s`,
        animationDelay: `${delay}s`,
        opacity: 0.8
    }}
  />
);

// Floating Heart on Click
interface ClickHeartProps {
  x: number;
  y: number;
  onComplete: () => void;
}

const ClickHeart: React.FC<ClickHeartProps> = ({ x, y, onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 1000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div 
            className="fixed pointer-events-none z-[100] text-rose-500 animate-float-up-fade"
            style={{ left: x, top: y }}
        >
            <Heart fill="currentColor" size={24} />
        </div>
    );
};

const App: React.FC = () => {
  const [state, setState] = useState<SurpriseState>(SurpriseState.LOCKED);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clickHearts, setClickHearts] = useState<{id: number, x: number, y: number}[]>([]);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpen = () => {
    setState(SurpriseState.OPENING);
    setTimeout(() => {
        setState(SurpriseState.REVEALED);
        setShowConfetti(true);
    }, 800);
  };

  // Global click handler for hearts
  const handleGlobalClick = (e: React.MouseEvent) => {
      if (state !== SurpriseState.REVEALED) return;
      
      const newHeart = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY
      };
      setClickHearts(prev => [...prev, newHeart]);
  };

  // Stop confetti after 5 seconds
  useEffect(() => {
    if (showConfetti) {
        const timer = setTimeout(() => setShowConfetti(false), 8000);
        return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const colors = ['#f43f5e', '#fbbf24', '#fecdd3', '#ffffff', '#e11d48'];

  if (state === SurpriseState.LOCKED || state === SurpriseState.OPENING) {
    return <GiftBox onClick={handleOpen} isOpening={state === SurpriseState.OPENING} />;
  }

  return (
    <div 
        className="min-h-screen bg-rose-50 text-slate-800 overflow-x-hidden selection:bg-rose-200 cursor-heart"
        onClick={handleGlobalClick}
    >
        {/* Click Hearts */}
        {clickHearts.map(h => (
            <ClickHeart 
                key={h.id} 
                x={h.x} 
                y={h.y} 
                onComplete={() => setClickHearts(prev => prev.filter(p => p.id !== h.id))} 
            />
        ))}

        {showConfetti && (
             <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                    <ConfettiParticle 
                        key={i} 
                        delay={Math.random() * 2} 
                        left={Math.random() * 100}
                        color={colors[Math.floor(Math.random() * colors.length)]} 
                    />
                ))}
             </div>
        )}

      {/* Header / Hero */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Parallax Background Pattern */}
        <div 
            className="absolute inset-0 z-0 opacity-10"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="heart-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M20 35 L5 20 A8 8 0 0 1 20 10 A8 8 0 0 1 35 20 Z" fill="#e11d48" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#heart-pattern)" />
            </svg>
        </div>

        <div className="relative z-10 animate-fade-in-up">
            <div className="inline-block p-4 rounded-full bg-white/50 backdrop-blur-sm mb-6 border border-rose-200 shadow-sm animate-float">
                <Heart className="text-rose-600 fill-rose-600" size={48} />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-rose-900 font-bold mb-6 tracking-tight drop-shadow-sm">
                Happy Birthday, <br/> 
                <span className="text-rose-500">My Love</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl text-rose-700 max-w-2xl mx-auto leading-relaxed">
                Today isn't just a date on the calendar.<br/>
                It's the day the world became a brighter place because you were born.
            </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce text-rose-400 opacity-50">
            <p className="text-sm uppercase tracking-widest mb-2">Scroll for Love</p>
            <svg className="mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
        </div>
      </header>

      <main className="relative z-10 bg-gradient-to-b from-transparent to-rose-50">
        <div className="pt-20"></div>
        <AIHeart />
        <ReasonsList />
        
        {/* Final Message */}
        <ScrollReveal className="py-32 px-4 text-center bg-white relative">
            <div className="max-w-2xl mx-auto">
                <h2 className="font-serif text-4xl md:text-6xl text-rose-900 mb-8 leading-tight">
                    Here's to another year of <br/> <span className="italic text-rose-500">Us</span>.
                </h2>
                <p className="font-sans text-xl text-slate-600 italic">
                    I love you more than yesterday, but less than tomorrow.
                </p>
                <div className="mt-12">
                    <span className="font-serif text-2xl text-rose-500 font-bold"> - Your Husband</span>
                </div>
            </div>
        </ScrollReveal>
      </main>

      <MusicPlayer />
      
      {/* Footer */}
      <footer className="bg-rose-100 py-6 text-center text-rose-400 text-sm font-sans">
        <p>Made with ❤️ using React & Gemini</p>
      </footer>

      {/* Styles for custom animations */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall {
            animation-name: fall;
            animation-timing-function: linear;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 1.2s ease-out forwards;
        }
        @keyframes floatUpFade {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
        .animate-float-up-fade {
            animation: floatUpFade 1s ease-out forwards;
        }
        .cursor-heart {
            cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='24' height='24' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>❤️</text></svg>") 16 0, auto; 
        }
      `}</style>
    </div>
  );
};

export default App;