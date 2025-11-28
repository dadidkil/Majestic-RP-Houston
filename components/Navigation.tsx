import React, { useState } from 'react';
import { Scale, Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Главная', href: '#' },
    { name: 'Подать Жалобу', href: '#complaint' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Консультация', href: '#consultation' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-justice-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <Scale className="h-8 w-8 text-justice-gold" />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-wide uppercase">Houston</span>
                <span className="text-xs text-justice-gold tracking-[0.2em] uppercase">Prosecutor Office</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-justice-gold hover:scale-105 transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-zinc-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-justice-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-zinc-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};