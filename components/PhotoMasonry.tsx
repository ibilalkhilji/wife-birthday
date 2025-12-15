import React, { useState } from 'react';
import { MemoryPhoto } from '../types';
import { X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const PHOTOS: MemoryPhoto[] = [
    { id: 1, url: 'https://picsum.photos/400/500?random=1', caption: 'Our Adventures', rotation: -2 },
    { id: 2, url: 'https://picsum.photos/400/400?random=2', caption: 'Quiet Moments', rotation: 3 },
    { id: 3, url: 'https://picsum.photos/400/600?random=3', caption: 'Your Beautiful Smile', rotation: -4 },
    { id: 4, url: 'https://picsum.photos/500/400?random=4', caption: 'Celebrations', rotation: 2 },
    { id: 5, url: 'https://picsum.photos/400/550?random=5', caption: 'Date Nights', rotation: 5 },
    { id: 6, url: 'https://picsum.photos/400/450?random=6', caption: 'Forever & Always', rotation: -3 },
];

const PhotoMasonry: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="text-3xl md:text-5xl font-serif text-center text-rose-900 mb-16 drop-shadow-sm">
          A Few of My Favorite Memories
        </h2>
      </ScrollReveal>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {PHOTOS.map((photo, index) => (
          <ScrollReveal key={photo.id} delay={index * 100} animation="zoom-in">
            <div 
              className="group relative bg-white p-3 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:z-10 hover:scale-105 cursor-pointer"
              style={{ 
                transform: `rotate(${photo.rotation}deg)`,
              }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="overflow-hidden aspect-[3/4] md:aspect-auto">
                  <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
              </div>
              <div className="pt-4 pb-2 text-center font-serif text-rose-800 text-lg italic opacity-80 group-hover:opacity-100">
                  {photo.caption}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedPhoto(null)}
        >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
                <X size={32} />
            </button>
            <div 
                className="max-w-4xl max-h-[90vh] bg-white p-4 rounded-lg shadow-2xl transform transition-all duration-300 animate-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                <img 
                    src={selectedPhoto.url} 
                    alt={selectedPhoto.caption}
                    className="max-h-[80vh] w-auto object-contain rounded" 
                />
                <p className="text-center mt-4 font-serif text-2xl text-rose-900 italic">
                    {selectedPhoto.caption}
                </p>
            </div>
        </div>
      )}
    </section>
  );
};

export default PhotoMasonry;