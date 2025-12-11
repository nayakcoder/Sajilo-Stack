import React, { useEffect, useRef } from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let rafId: number;

    const updateParallax = () => {
      if (!containerRef.current || !textRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only animate if the footer is in the viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calculate the offset based on how much of the footer is visible
        // We move the text slightly slower than the scroll to create depth
        const visibleAmount = windowHeight - rect.top;
        const offset = visibleAmount * 0.15; // Speed factor
        
        textRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    const onScroll = () => {
      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', onScroll);
    // Initial call
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <footer ref={containerRef} id="footer" className="bg-acid text-white pt-20 pb-6 relative overflow-hidden">
      
      <div className="px-6 md:px-12 relative z-10">
        
        {/* Top Row: Big Brand */}
        <div className="mb-20">
            <h1 
                ref={textRef}
                className="text-[15vw] leading-none font-bold tracking-tighter text-white mix-blend-overlay opacity-90 will-change-transform"
            >
                CLEVRON
            </h1>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 border-t border-white/30 pt-16">
            
            {/* Description */}
            <div className="col-span-1 md:col-span-6 lg:col-span-5">
                <p className="font-mono text-sm max-w-md uppercase opacity-80 leading-relaxed">
                    We don't just write code. We architect future-proof digital infrastructure for the modern web.
                </p>
            </div>

            {/* Nodes */}
            <div className="col-span-1 md:col-span-3 lg:col-span-3 md:pl-12">
                 <h4 className="font-bold mb-6 uppercase text-sm tracking-wider border-b border-white/20 pb-2 inline-block">Nodes</h4>
                 <ul className="space-y-4 font-mono text-xs opacity-80">
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        KATHMANDU [HQ]
                    </li>
                    <li className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                         NEW YORK [US]
                    </li>
                    <li className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                         LONDON [UK]
                    </li>
                 </ul>
            </div>

            {/* Network */}
            <div className="col-span-1 md:col-span-3 lg:col-span-4 md:pl-12">
                 <h4 className="font-bold mb-6 uppercase text-sm tracking-wider border-b border-white/20 pb-2 inline-block">Network</h4>
                 <ul className="space-y-4 font-mono text-xs opacity-80">
                    <li>
                        <a href="#" className="block hover:translate-x-2 transition-transform duration-300 flex items-center gap-2 group">
                            <span>TWITTER / X</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block hover:translate-x-2 transition-transform duration-300 flex items-center gap-2 group">
                             <span>LINKEDIN</span>
                             <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block hover:translate-x-2 transition-transform duration-300 flex items-center gap-2 group">
                             <span>GITHUB</span>
                             <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                        </a>
                    </li>
                 </ul>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-24 font-mono text-[10px] uppercase opacity-60 gap-4">
             <span>© 2025 CLEVRON TECH.</span>
             <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                ALL SYSTEMS OPERATIONAL
             </span>
        </div>

      </div>
    </footer>
  );
};