"use client";
import Sidebar from '@/components/dashboard/Sidebar';
import { ShoppingBag, Search, Download, ExternalLink } from 'lucide-react';

export default function VendorOrders() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">Platform Orders</h1>
            <p className="text-slate-500">Track and manage wholesale orders across the platform</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-white transition-all shadow-sm">
            <Download size={20} />
            Export CSV
          </button>
        </header>

        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex gap-4">
              {['All Orders', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((status, i) => (
                <button 
                  key={status} 
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                    i === 0 ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Find an order..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                  <th className="px-6 py-4">Order Details</th>
                  <th className="px-6 py-4">Buyer / Vendor</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">#ORD-2024-54{i}</p>
                      <p className="text-xs text-slate-400">May {10-i}, 2024 • 10:45 AM</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {String.fromCharCode(64 + i)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Retailer {i} Pvt Ltd</p>
                          <p className="text-[10px] text-slate-400">GST: 22AAAAA000{i}A1Z5</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">45 Units</p>
                      <p className="text-[10px] text-slate-400">3 different styles</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-black uppercase rounded-md ${
                        i % 3 === 0 ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {i % 3 === 0 ? 'Delivered' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">₹{ (12500 * i).toLocaleString() }</p>
                      <p className="text-[10px] text-slate-400">Razorpay Paid</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <ExternalLink size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing 8 of 124 orders</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-100 rounded-lg text-sm font-semibold text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 border border-slate-100 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
