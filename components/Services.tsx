import React, { useState, useRef, useEffect } from 'react';
import { SERVICES } from '../constants';
import * as Icons from 'lucide-react';

const ServiceImagePreview: React.FC<{ src?: string; alt: string; isVisible: boolean }> = ({ src, alt, isVisible }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        // Calculate a subtle parallax offset based on scroll position
        // The factor 0.05 ensures the movement is slow relative to the scroll speed
        // Moving in negative direction simulates the background being 'behind' the content plane
        const offset = window.scrollY * 0.05;
        // We apply scale(1.2) to ensure the image covers the container even when shifted
        imgRef.current.style.transform = `translate3d(0, -${offset}px, 0) scale(1.2)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] z-0 pointer-events-none transition-all duration-500 ease-out hidden md:block mix-blend-exclusion overflow-hidden border border-white/10
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
        {/* Skeleton / Placeholder Background */}
        <div className={`absolute inset-0 bg-neutral-900 z-10 transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>
            
            {/* Tech Loader Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                 <div className="relative w-16 h-16 flex items-center justify-center">
                     {/* Outer Bracket */}
                     <div className="absolute inset-0 border-t-2 border-l-2 border-white/20"></div>
                     <div className="absolute inset-0 border-b-2 border-r-2 border-white/20"></div>
                     
                     {/* Rotating Ring */}
                     <div className="absolute inset-2 border-t-2 border-acid animate-spin rounded-full"></div>
                     
                     {/* Center Pulse */}
                     <div className="w-2 h-2 bg-acid animate-ping rounded-full"></div>
                 </div>
                 
                 <div className="flex flex-col items-center gap-1">
                     <span className="text-[10px] font-mono text-acid tracking-widest uppercase animate-pulse">Initializing Asset</span>
                     <span className="text-[8px] font-mono text-neutral-600">BUFFERING VIDEO MEMORY...</span>
                 </div>
            </div>
        </div>

        <img 
            ref={imgRef}
            src={src} 
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 transition-opacity duration-700 ease-out will-change-transform ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
    </div>
  );
};

export const Services: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 bg-black relative border-t border-white/10">
      <div className="px-6 md:px-12">
          
          <div className="mb-16 flex items-end justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-acid mb-4 border border-acid px-2 py-1 inline-block">
                01. Capabilities Index
            </h2>
            <div className="hidden md:block text-right font-mono text-xs text-neutral-500">
                SCROLL TO INSPECT <br/> CLICK TO EXPAND
            </div>
          </div>

          <div className="flex flex-col">
              {SERVICES.map((service, index) => {
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 const IconComponent = (Icons as any)[service.icon] || Icons.Box;
                 const isHovered = hoveredService === service.id;
                 
                 return (
                    <div 
                        key={service.id}
                        onMouseEnter={() => setHoveredService(service.id)}
                        onMouseLeave={() => setHoveredService(null)}
                        className="group relative border-t border-white/20 py-12 transition-all duration-500 cursor-crosshair overflow-hidden hover:border-white/40"
                    >
                        {/* Background Glow Effect */}
                        <div 
                            className={`absolute inset-0 bg-gradient-to-r from-acid/10 via-white/5 to-transparent transition-opacity duration-500 ease-out pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        />
                        <div 
                            className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                            style={{ boxShadow: 'inset 0 0 100px rgba(0, 71, 255, 0.05)' }}
                        />

                        {/* Flex Layout */}
                        <div className="relative z-10 flex flex-col md:flex-row items-baseline justify-between gap-8">
                            
                            {/* ID + Title */}
                            <div className="flex items-baseline gap-8 md:w-1/3">
                                <span className={`font-mono text-sm transition-all duration-500 ${isHovered ? 'text-acid scale-110 font-bold -translate-y-1' : 'text-neutral-600'}`}>
                                    0{index + 1}
                                </span>
                                <h3 className={`text-3xl md:text-5xl font-display font-medium uppercase tracking-tighter transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-left ${isHovered ? 'translate-x-6 scale-110 text-white' : 'text-neutral-400'}`}>
                                    {service.title}
                                </h3>
                            </div>

                            {/* Description (Visible on desktop, changes on hover) */}
                            <div className="md:w-1/3">
                                <p className={`font-mono text-sm leading-relaxed transition-colors duration-300 ${isHovered ? 'text-white' : 'text-neutral-600'}`}>
                                    {service.description}
                                </p>
                            </div>

                            {/* Status Icon */}
                            <div className="md:w-[10%] flex justify-end">
                                {service.isComingSoon ? (
                                    <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 uppercase font-mono border border-white/5">
                                        Dev
                                    </span>
                                ) : (
                                    <IconComponent className={`transition-all duration-300 transform ${isHovered ? 'text-acid scale-125 rotate-12' : 'text-neutral-700'}`} />
                                )}
                            </div>
                        </div>

                        {/* Hover Image Reveal (Floating) */}
                        <ServiceImagePreview 
                            src={service.image} 
                            alt={service.title} 
                            isVisible={isHovered} 
                        />
                    </div>
                 );
              })}
              {/* Closing Line */}
              <div className="border-t border-white/20"></div>
          </div>
      </div>
    </section>
  );
};