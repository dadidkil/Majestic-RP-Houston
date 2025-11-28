import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[20s] hover:scale-110 ease-linear"
        style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-block mb-6 px-6 py-2 rounded-full border border-justice-gold/30 bg-black/50 backdrop-blur-md animate-fade-in-up hover:border-justice-gold/60 transition-colors cursor-default">
          <span className="text-justice-gold text-xs font-bold tracking-[0.3em] uppercase">Majestic RolePlay | State of Houston</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tighter drop-shadow-2xl font-serif animate-fade-in-up [animation-delay:200ms] opacity-0 leading-tight">
          ОФИС ГЕНЕРАЛЬНОГО <br/>
          <span className="relative inline-block mt-2">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-justice-gold via-yellow-200 to-justice-gold animate-shimmer bg-[length:200%_100%]">ПРОКУРОРА</span>
            <div className="absolute -inset-4 bg-justice-gold/20 blur-2xl rounded-full opacity-40 animate-pulse-slow"></div>
          </span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-12 leading-relaxed animate-fade-in-up [animation-delay:400ms] opacity-0 font-light">
          Мы стоим на страже закона и справедливости, обеспечивая верховенство права и защиту конституционных прав каждого гражданина штата.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up [animation-delay:600ms] opacity-0">
          <a href="#complaint" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full sm:w-auto min-w-[220px] shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:-translate-y-1 transition-all duration-300 py-4 text-base">
              Подать жалобу
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          
          <a href="https://forum.majestic-rp.ru/forums/zhaloby-v-prokuraturu.1145/" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto min-w-[220px] backdrop-blur-sm hover:bg-justice-gold/10 hover:-translate-y-1 transition-all duration-300 py-4 text-base">
              Перейти на Форум
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
      
      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
    </div>
  );
};