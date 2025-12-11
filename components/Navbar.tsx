import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-[100vw] px-6 h-16 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
          
          {/* Left: Brand + Coords */}
          <div className="flex items-center gap-8">
             <a href="#" className="flex items-center gap-2 group transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105">
               <div className="w-4 h-4 bg-acid transition-all duration-500 group-hover:rotate-45 group-hover:shadow-[0_0_15px_#0047FF]"></div>
               <span className="font-bold text-lg tracking-tighter text-white group-hover:text-acid transition-colors">CLEVRON</span>
             </a>
             <div className="hidden lg:flex gap-4 text-neutral-500 text-[10px]">
                <span>LAT: 40.7128° N</span>
                <span>LNG: 74.0060° W</span>
             </div>
          </div>

          {/* Center: Links (Desktop) */}
          <div className="hidden md:flex items-center gap-12">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative py-2 text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <span className="relative z-10 inline-block transition-transform duration-300 ease-out group-hover:scale-105 origin-center">
                  {item.label}
                </span>
                {/* 
                  Minimalist Wipe Underline: 
                  Origin-right by default (exit direction), 
                  Origin-left on hover (enter direction).
                */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-acid origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100"></span>
              </a>
            ))}
          </div>
            
          {/* Right: Status + Time */}
          <div className="hidden md:flex items-center gap-6">
             <span className="text-neutral-500 tabular-nums">{time.toLocaleTimeString([], {hour12: false})} UTC</span>
             <button className="relative px-6 py-2 bg-white text-black font-bold tracking-wider overflow-hidden group">
               <span className="relative z-10 transition-colors duration-300 group-hover:text-white">INIT_PROJECT</span>
               <div className="absolute inset-0 bg-acid translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>
             </button>
          </div>

          {/* Mobile Toggle */}
          <button 
              className="md:hidden text-white border border-white/20 p-2 hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col pt-32 px-6 animate-[fadeIn_0.3s_ease-out]">
            {NAV_ITEMS.map((item, index) => (
            <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between text-3xl md:text-4xl font-display font-bold text-transparent text-outline hover:text-acid transition-all py-6 border-b border-white/10"
            >
                <span>{item.label}</span>
                <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm font-mono text-acid tracking-widest">
                  [OPEN]
                </span>
            </a>
            ))}
            <div className="mt-auto mb-12 font-mono text-neutral-500 text-xs">
                SYSTEM STATUS: OPERATIONAL
            </div>
        </div>
      )}
    </>
  );
};