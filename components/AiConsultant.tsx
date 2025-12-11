import React, { useState, useRef, useEffect } from 'react';
import { MessageRole, ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { Send, Terminal } from 'lucide-react';

const MessageSkeleton: React.FC = () => (
  <div className="flex justify-start w-full animate-in fade-in duration-300">
    <div className="max-w-xl p-6 w-full border border-acid/20 bg-acid/5 relative overflow-hidden group">
       
       {/* Tech decorative corners */}
       <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-acid/50"></div>
       <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-acid/50"></div>
       <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-acid/50"></div>
       <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-acid/50"></div>

       {/* Header Status */}
       <div className="flex items-center gap-3 mb-4 border-b border-acid/10 pb-2">
           <div className="relative">
               <div className="w-2 h-2 bg-acid rounded-full animate-pulse"></div>
               <div className="absolute inset-0 bg-acid rounded-full animate-ping opacity-20"></div>
           </div>
           <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-acid/80 animate-pulse">
               [SYSTEM]: PROCESSING_DATA_STREAM
           </span>
       </div>
       
       {/* Scanning Lines */}
       <div className="space-y-3">
           <div className="h-2 bg-acid/10 w-full rounded-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-acid/20 to-transparent animate-shimmer w-full"></div>
           </div>
           <div className="h-2 bg-acid/10 w-3/4 rounded-sm overflow-hidden relative delay-75">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-acid/20 to-transparent animate-shimmer w-full"></div>
           </div>
           <div className="h-2 bg-acid/10 w-5/6 rounded-sm overflow-hidden relative delay-150">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-acid/20 to-transparent animate-shimmer w-full"></div>
           </div>
       </div>

       {/* Scrolling Hex Data Footer */}
       <div className="mt-4 pt-2 border-t border-acid/5 font-mono text-[8px] text-acid/40 leading-tight h-5 overflow-hidden whitespace-nowrap opacity-60">
           0x4F 0x9A 0x1B 0xCD ... DECRYPTING ... 0x00 0xFF 0xA1 ... HANDSHAKE_ACK
       </div>
    </div>
  </div>
);

export const AiConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: MessageRole.MODEL,
      text: "SYSTEM_READY. Awaiting query...",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
        console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="system" className="min-h-screen bg-neutral-900 flex flex-col md:flex-row border-t border-white/10">
      
      {/* Left: Info Panel */}
      <div className="w-full md:w-1/3 p-12 border-r border-white/10 flex flex-col justify-between bg-black">
         <div>
            <div className="flex items-center gap-2 text-acid mb-8">
                <Terminal size={24} />
                <span className="font-mono font-bold tracking-widest">TERMINAL_ACCESS</span>
            </div>
            <h2 className="text-5xl font-display font-bold text-white mb-6 uppercase leading-none">
                Direct <br/> Uplink
            </h2>
            <p className="font-mono text-sm text-neutral-500 leading-relaxed">
                Connect directly to the CLEVRON CORE. 
                <br/><br/>
                Latency: <span className="text-white">4ms</span> <br/>
                Encryption: <span className="text-white">AES-256</span> <br/>
                Model: <span className="text-white">Gemini 2.5 Flash</span>
            </p>
         </div>
         
         <div className="mt-12 p-4 border border-white/10 bg-white/5 font-mono text-xs text-neutral-400">
            > INITIALIZING NEURAL HANDSHAKE... <br/>
            > VERIFYING CREDENTIALS... <br/>
            > ACCESS GRANTED.
         </div>
      </div>

      {/* Right: Interactive Console */}
      <div className="w-full md:w-2/3 bg-black flex flex-col relative">
          
          {/* CRT Scanline Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 background-size-[100%_2px,3px_100%]"></div>

          {/* Messages Log */}
          <div 
             ref={scrollContainerRef}
             className="flex-1 p-8 overflow-y-auto space-y-4 font-mono text-sm"
          >
             {messages.map((msg) => (
                 <div key={msg.id} className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-xl p-4 ${msg.role === MessageRole.USER ? 'bg-white text-black' : 'text-acid'}`}>
                        <span className="opacity-50 text-[10px] block mb-1 uppercase tracking-wider">
                            [{msg.role}]: {msg.timestamp.toLocaleTimeString()}
                        </span>
                        <p>{msg.text}</p>
                     </div>
                 </div>
             ))}
             {isLoading && <MessageSkeleton />}
          </div>

          {/* Input Line */}
          <div className="p-8 border-t border-white/10 bg-neutral-900/50">
             <div className="flex items-center gap-4">
                <span className="text-acid font-mono text-xl">{'>'}</span>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="ENTER COMMAND..."
                    className="w-full bg-transparent border-none text-white font-mono text-lg focus:ring-0 placeholder:text-neutral-700 uppercase"
                    autoFocus
                />
                <button onClick={handleSend} disabled={isLoading} className="text-white hover:text-acid disabled:opacity-50">
                    <Send size={24} />
                </button>
             </div>
          </div>
      </div>

    </section>
  );
};