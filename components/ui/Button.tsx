import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-md font-bold text-sm uppercase tracking-wider transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    primary: "bg-justice-gold text-black hover:bg-yellow-500 focus:ring-justice-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700 focus:ring-zinc-500 border border-zinc-700",
    outline: "bg-transparent border-2 border-justice-gold text-justice-gold hover:bg-justice-gold hover:text-black focus:ring-justice-gold"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};