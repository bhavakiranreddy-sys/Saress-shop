import React from 'react';
import { Bell, Search } from 'lucide-react';

interface DashboardNavbarProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function DashboardNavbar({ title, description, children }: DashboardNavbarProps) {
  return (
    <header className="bg-black text-white rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between md:items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-800 relative overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-slate-700/40 transition-all duration-500"></div>
      
      <div className="relative z-10 mb-4 md:mb-0">
        <h1 className="text-3xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{title}</h1>
        <p className="text-slate-400 mt-1 text-sm font-medium">{description}</p>
      </div>
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-full px-4 py-2 transition-all focus-within:border-slate-600 focus-within:bg-slate-800">
          <Search size={18} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-48 focus:w-64 transition-all duration-300"
          />
        </div>
        
        <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <div className="w-px h-8 bg-slate-800 mx-2"></div>
        
        {children}
      </div>
    </header>
  );
}
