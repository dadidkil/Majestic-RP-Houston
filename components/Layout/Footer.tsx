import React from 'react';
import { Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-justice-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <Scale className="h-10 w-10 text-justice-gold mb-4" />
        <p className="text-gray-400 text-sm text-center max-w-md">
          &copy; {new Date().getFullYear()} Прокуратура Штата Houston. Все права защищены.
        </p>
        <p className="text-zinc-600 text-xs text-center mt-2 max-w-lg">
          Данный сайт является OOC (Out of Character) ресурсом для игрового сервера Majestic RP. Не имеет отношения к реальным государственным структурам США.
        </p>
      </div>
    </footer>
  );
};