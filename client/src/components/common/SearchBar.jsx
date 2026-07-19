import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ placeholder = "Search...", onChange, className }) {
  return (
    <div className={`relative max-w-md w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-input rounded-lg leading-5 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm transition-all"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
