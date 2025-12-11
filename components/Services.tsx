import React, { useState } from 'react';
import { SERVICES } from '../constants';
import * as Icons from 'lucide-react';

const ServiceImagePreview: React.FC<{ src?: string; alt: string; isVisible: boolean }> = ({ src, alt, isVisible }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] z-0 pointer-events-none transition-all duration-300 hidden md:block mix-blend-exclusion
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
        {/* Skeleton / Placeholder Background */}
        <div className="absolute inset-0 bg-neutral-900 border border-white/10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border border-white/20 border-t-acid animate-spin rounded-full"></div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest animate-pulse">Loading Asset</span>
            </div>
        </div>

        <img 
            src={src} 
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
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
                        className="group relative border-t border-white/20 py-12 transition-all duration-300 hover:bg-white/5 cursor-crosshair"
                    >
                        {/* Flex Layout */}
                        <div className="relative z-10 flex flex-col md:flex-row items-baseline justify-between gap-8">
                            
                            {/* ID + Title */}
                            <div className="flex items-baseline gap-8 md:w-1/3">
                                <span className={`font-mono text-sm transition-colors ${isHovered ? 'text-acid' : 'text-neutral-600'}`}>
                                    0{index + 1}
                                </span>
                                <h3 className={`text-3xl md:text-5xl font-display font-medium uppercase tracking-tighter transition-all duration-300 ${isHovered ? 'translate-x-4 text-white' : 'text-neutral-400'}`}>
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
                                    <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 uppercase font-mono">
                                        Dev
                                    </span>
                                ) : (
                                    <IconComponent className={`transition-colors duration-300 ${isHovered ? 'text-acid' : 'text-neutral-700'}`} />
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