import React, { useEffect, useState, useRef } from 'react';
import { generateReasonsToLove, generateSingleReason } from '../services/geminiService';
import { Star, Plus, Heart } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const ReasonsList: React.FC = () => {
  const [reasons, setReasons] = useState<string[]>([]);
  const [loadingNew, setLoadingNew] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    const fetchReasons = async () => {
      const data = await generateReasonsToLove();
      if (mounted) {
        setReasons(data);
      }
    };
    fetchReasons();
    return () => { mounted = false; };
  }, []);

  const handleAddReason = async () => {
    setLoadingNew(true);
    const newReason = await generateSingleReason(reasons);
    setReasons(prev => [...prev, newReason]);
    setLoadingNew(false);
    
    // Smooth scroll to the new item
    setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (reasons.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-rose-900 text-white overflow-hidden relative min-h-[800px]">
        {/* Background decorations - Animated Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-800 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-700 rounded-full blur-3xl opacity-40 translate-x-1/3 translate-y-1/3 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-4xl mx-auto relative z-10">
            <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-rose-100">
                    Why I Fall in Love With You Every Day
                </h2>
            </ScrollReveal>

            <div className="space-y-6">
                {reasons.map((reason, idx) => (
                    <ScrollReveal key={`${idx}-${reason.substring(0,5)}`} delay={idx * 100} animation="slide-in">
                        <div 
                            className="flex items-center p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 transform transition-all duration-300 hover:scale-[1.02] hover:bg-white/20 hover:shadow-xl group"
                        >
                            <div className="flex-shrink-0 mr-6">
                                <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center text-rose-900 shadow-lg group-hover:rotate-12 transition-transform duration-300">
                                    <Star size={24} fill="currentColor" />
                                </div>
                            </div>
                            <p className="text-lg md:text-2xl font-serif tracking-wide text-rose-50">
                                {reason}
                            </p>
                        </div>
                    </ScrollReveal>
                ))}
                
                {/* Anchor for scrolling */}
                <div ref={bottomRef} />
            </div>

            <div className="mt-12 text-center">
                <button 
                    onClick={handleAddReason}
                    disabled={loadingNew}
                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-rose-900 bg-rose-100 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-rose-900/50 hover:-translate-y-1 disabled:opacity-50"
                >
                    {loadingNew ? (
                        <div className="animate-spin mr-2">
                             <Plus size={24} />
                        </div>
                    ) : (
                        <Heart className="mr-2 text-rose-600" fill="currentColor" size={24} />
                    )}
                    {loadingNew ? "Thinking of another reason..." : "Tell me one more..."}
                </button>
            </div>
        </div>
    </section>
  );
};

export default ReasonsList;