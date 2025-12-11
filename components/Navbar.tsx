import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Crosshair } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-[100vw] px-6 h-16 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
          
          {/* Left: Brand + Coords */}
          <div className="flex items-center gap-8">
             <a href="#" className="flex items-center gap-2 group">
               <div className="w-4 h-4 bg-acid group-hover:animate-pulse"></div>
               <span className="font-bold text-lg tracking-tighter text-white">CLEVRON</span>
             </a>
             <div className="hidden lg:flex gap-4 text-neutral-500">
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
                className="relative text-neutral-400 hover:text-acid transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-6 left-0 w-full h-[1px] bg-acid scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            ))}
          </div>
            
          {/* Right: Status + Time */}
          <div className="hidden md:flex items-center gap-6">
             <span className="text-neutral-500">{time.toLocaleTimeString([], {hour12: false})} UTC</span>
             <button className="px-6 py-2 bg-white text-black hover:bg-acid hover:text-white transition-colors font-bold tracking-wider">
               INIT_PROJECT
             </button>
          </div>

          {/* Mobile Toggle */}
          <button 
              className="md:hidden text-white border border-white/20 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay - Harsh Design */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col pt-32 px-6">
            {NAV_ITEMS.map((item, index) => (
            <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-display font-bold text-transparent text-outline hover:text-acid transition-all py-4 border-b border-white/10"
            >
                {item.label}
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