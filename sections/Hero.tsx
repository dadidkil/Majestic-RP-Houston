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
            backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-justice-gold/30 bg-black/40 backdrop-blur-sm animate-[fadeInUp_0.8s_ease-out_forwards]">
          <span className="text-justice-gold text-xs font-bold tracking-[0.2em] uppercase">Majestic RolePlay | State of Houston</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter drop-shadow-2xl font-serif animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] opacity-0">
          ОФИС ГЕНЕРАЛЬНОГО <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-justice-gold to-yellow-200">ПРОКУРОРА</span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] opacity-0">
          Мы стоим на страже закона и справедливости, обеспечивая верховенство права и защиту конституционных прав каждого гражданина штата.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fadeInUp_0.8s_ease-out_0.6s_forwards] opacity-0">
          <a href="#complaint">
            <Button variant="primary" className="w-full sm:w-auto min-w-[200px] shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]">
              Подать жалобу
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          
          <a href="https://forum.majestic-rp.ru/forums/zhaloby-v-prokuraturu.1145/" target="_blank" rel="noreferrer">
            <Button variant="outline" className="w-full sm:w-auto min-w-[200px] backdrop-blur-sm hover:bg-justice-gold/10">
              Перейти на Форум
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
      
      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
};