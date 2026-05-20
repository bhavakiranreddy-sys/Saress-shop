"use client";
import Sidebar from '@/components/dashboard/Sidebar';
import { Package, Plus, Search, Filter, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function VendorProducts() {
  const { logout } = useAuth();
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">My Products</h1>
            <p className="text-slate-500">Manage your saree inventory and pricing</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Plus size={20} />
              Add New Product
            </button>
          </div>
        </header>

        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search products by SKU, name or fabric..." 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-3 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-slate-600 hover:bg-slate-50 transition-all">
                <Filter size={20} />
                Filters
              </button>
              <select className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 focus:outline-none">
                <option>Sort by: Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Stock: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="h-48 bg-slate-100 relative">
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-primary shadow-sm">
                  ₹2,499 (Bulk)
                </div>
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <Package size={48} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">Banarasi Silk Wedding Saree</h3>
                  <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded">In Stock</span>
                </div>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">Exquisite hand-woven silk saree with traditional gold zari work. Perfect for bridal collections.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Stock</p>
                    <p className="font-bold text-slate-700">124 units</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Min. Bulk</p>
                    <p className="font-bold text-slate-700">10 units</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all">Edit</button>
                  <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-50 transition-all">Stats</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
