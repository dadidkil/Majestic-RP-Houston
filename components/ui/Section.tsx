import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  darker?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = '', darker = false }) => {
  return (
    <section id={id} className={`py-20 px-4 sm:px-6 lg:px-8 border-t border-justice-border ${darker ? 'bg-black' : 'bg-justice-black'} ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight uppercase border-b-2 border-justice-gold inline-block pb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};