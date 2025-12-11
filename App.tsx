import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { AiConsultant } from './components/AiConsultant';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-purple-500/30">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <AiConsultant />
      </main>
      <Footer />
    </div>
  );
};

export default App;