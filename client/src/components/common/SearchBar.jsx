import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ placeholder = "Search...", onChange, className }) {
  return (
    <div className={`relative max-w-md w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
