import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Reveal } from './Reveal';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-end pb-12 pt-32 overflow-hidden bg-black">
      
      {/* Background Grid - Harsh Lines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
             backgroundSize: '80px 80px'
           }}>
      </div>
      
      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col">
        
        {/* Top Meta Data */}
        <div className="flex justify-between items-start mb-20 border-t border-white/20 pt-4 font-mono text-xs text-neutral-500 uppercase">
             <div className="max-w-[200px]">
                Redefining Digital <br/> Architecture.
             </div>
             <div>
                EST. 2024
             </div>
        </div>

        {/* Massive Headline */}
        <div className="flex flex-col">
            <Reveal width="100%">
                <h1 className="text-[12vw] leading-[0.8] font-display font-bold tracking-tighter text-white uppercase mix-blend-difference">
                    Creative
                </h1>
            </Reveal>
            <Reveal width="100%" delay={0.1}>
                 <div className="flex items-center gap-4 md:gap-12">
                     <div className="h-[2px] w-12 md:w-32 bg-acid"></div>
                     <h1 className="text-[12vw] leading-[0.8] font-display font-bold tracking-tighter text-white uppercase text-outline">
                        Intel
                     </h1>
                 </div>
            </Reveal>
            <Reveal width="100%" delay={0.2}>
                <h1 className="text-[12vw] leading-[0.8] font-display font-bold tracking-tighter text-white uppercase text-right">
                    ligence
                </h1>
            </Reveal>
        </div>
        
        {/* Bottom CTA Area */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-end gap-8">
             <div className="max-w-xl">
                 <p className="text-xl md:text-2xl font-light text-neutral-300 leading-tight">
                    <span className="text-acid font-mono">[001]</span> Clevron Tech blends high-velocity engineering with world-class aesthetic precision.
                 </p>
             </div>

             <div className="flex gap-0">
                 <button className="h-16 px-10 bg-acid text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 ease-in-out hover:animate-glitch">
                    Start Project
                 </button>
                 <div className="h-16 w-16 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer">
                    <ArrowDown className="animate-bounce" />
                 </div>
             </div>
        </div>

      </div>

      {/* Marquee Stripe */}
      <div className="absolute top-[40%] -right-[20%] rotate-90 origin-center opacity-20 whitespace-nowrap overflow-hidden pointer-events-none hidden lg:block">
         <div className="animate-marquee font-mono text-xs text-white">
            CLEVRON_TECH // SYSTEM_ONLINE // REACT_NATIVE // NEXT_JS // TYPESCRIPT // DESIGN_SYSTEMS // 
         </div>
      </div>
    </section>
  );
};