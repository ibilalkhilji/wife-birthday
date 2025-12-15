import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, RefreshCw, PenTool } from 'lucide-react';
import { generateRomanticPoem } from '../services/geminiService';
import ScrollReveal from './ScrollReveal';

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        setDisplayedText('');
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index++;
            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, 30); // Speed of typing
        return () => clearInterval(intervalId);
    }, [text]);

    return <span className="whitespace-pre-line">{displayedText}</span>;
};

const AIHeart: React.FC = () => {
  const [poem, setPoem] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const newPoem = await generateRomanticPoem();
    setPoem(newPoem);
    setLoading(false);
    setGenerated(true);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-rose-50 overflow-hidden">
      <ScrollReveal className="max-w-3xl mx-auto text-center">
        <div className="inline-block p-4 rounded-full bg-rose-100 mb-6 animate-bounce">
          <Sparkles className="text-rose-500" size={32} />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-serif text-rose-900 mb-6">
          A Poem Written Just for You
        </h2>
        
        <p className="text-rose-600 mb-10 font-sans max-w-lg mx-auto text-lg">
          I asked the stars to write down how I feel, but they ran out of ink. 
          So I asked a little AI magic to help express my love.
        </p>

        {!generated ? (
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-rose-500 font-sans rounded-full hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
          >
            {loading ? (
                <>
                    <RefreshCw className="animate-spin mr-2" size={20} />
                    Composing...
                </>
            ) : (
                <>
                    <Heart className="mr-2 fill-current animate-pulse" size={20} />
                    Generate My Poem
                </>
            )}
            
            {/* Button Glow */}
            <div className="absolute inset-0 rounded-full ring-4 ring-white/30 group-hover:ring-8 group-hover:ring-white/10 transition-all duration-500" />
          </button>
        ) : (
          <div className="relative mt-8 p-10 bg-white shadow-xl rounded-2xl border border-rose-100 transform transition-all duration-700">
            <div className="absolute -top-4 -left-4 text-6xl text-rose-200 font-serif opacity-50">"</div>
            <div className="absolute -bottom-12 -right-4 text-6xl text-rose-200 font-serif transform rotate-180 opacity-50">"</div>
            
            <div className="text-xl md:text-2xl font-serif text-rose-800 leading-relaxed italic min-h-[100px]">
              <TypewriterText text={poem} />
            </div>

            <div className="mt-8 pt-8 border-t border-rose-100 flex justify-center">
                <button 
                    onClick={handleGenerate}
                    className="flex items-center text-sm text-rose-400 hover:text-rose-600 transition-colors uppercase tracking-widest font-bold"
                >
                    <RefreshCw size={14} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Write another one
                </button>
            </div>
          </div>
        )}
      </ScrollReveal>
    </section>
  );
};

export default AIHeart;