import React from 'react';
import { Bell, Search } from 'lucide-react';

interface DeliveryNavbarProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function DeliveryNavbar({ title, description, children }: DeliveryNavbarProps) {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between md:items-center shadow-[0_8px_30px_rgba(37,99,235,0.2)] border border-blue-800 relative overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(37,99,235,0.3)]">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-blue-400/30 transition-all duration-500"></div>
      
      <div className="relative z-10 mb-4 md:mb-0">
        <h1 className="text-3xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">{title}</h1>
        <p className="text-blue-200 mt-1 text-sm font-medium">{description}</p>
      </div>
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="hidden lg:flex items-center bg-blue-950/50 border border-blue-800/50 rounded-full px-4 py-2 transition-all focus-within:border-blue-500 focus-within:bg-blue-900/50">
          <Search size={18} className="text-blue-300 mr-2" />
          <input 
            type="text" 
            placeholder="Search routes..." 
            className="bg-transparent border-none outline-none text-sm text-white placeholder-blue-300/70 w-48 focus:w-64 transition-all duration-300"
          />
        </div>
        
        <button className="p-2.5 bg-blue-950/50 border border-blue-800/50 rounded-full text-blue-300 hover:text-white hover:bg-blue-900/50 hover:border-blue-600 transition-all relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="w-px h-8 bg-blue-800/50 mx-2"></div>
        
        {children}
      </div>
    </header>
  );
}
