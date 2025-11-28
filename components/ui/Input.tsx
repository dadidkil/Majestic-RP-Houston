import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-justice-gold mb-1 uppercase tracking-wider opacity-80">
      {label}
    </label>
    <input
      className={`w-full bg-justice-input border border-justice-border rounded-md px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-justice-gold focus:border-justice-gold transition-all duration-200 ${className}`}
      {...props}
    />
  </div>
);

export const TextArea: React.FC<TextAreaProps> = ({ label, className, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-justice-gold mb-1 uppercase tracking-wider opacity-80">
      {label}
    </label>
    <textarea
      className={`w-full bg-justice-input border border-justice-border rounded-md px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-justice-gold focus:border-justice-gold transition-all duration-200 resize-none ${className}`}
      {...props}
    />
  </div>
);