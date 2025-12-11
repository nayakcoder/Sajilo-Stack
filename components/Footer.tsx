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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/30 pt-12">
            
            <div className="col-span-1 md:col-span-2">
                <p className="font-mono text-sm max-w-md uppercase opacity-80">
                    We don't just write code. We architect future-proof digital infrastructure for the modern web.
                </p>
            </div>

            <div>
                 <h4 className="font-bold mb-4 uppercase text-sm">Nodes</h4>
                 <ul className="space-y-2 font-mono text-xs opacity-80">
                    <li>KATHMANDU [HQ]</li>
                    <li>NEW YORK [US]</li>
                    <li>LONDON [UK]</li>
                 </ul>
            </div>

            <div>
                 <h4 className="font-bold mb-4 uppercase text-sm">Network</h4>
                 <ul className="space-y-2 font-mono text-xs opacity-80">
                    <li><a href="#" className="hover:underline">TWITTER / X</a></li>
                    <li><a href="#" className="hover:underline">LINKEDIN</a></li>
                    <li><a href="#" className="hover:underline">GITHUB</a></li>
                 </ul>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end mt-20 font-mono text-[10px] uppercase opacity-60">
             <span>© 2025 CLEVRON TECH.</span>
             <span>ALL SYSTEMS OPERATIONAL</span>
        </div>

      </div>
    </footer>
  );
};