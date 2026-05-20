"use client";
import { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import api from '@/lib/api';
import { Package, ShoppingBag, Banknote, Users } from 'lucide-react';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';

export default function SellerDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from /seller/stats
    setStats({
      total_products: 45,
      active_orders: 12,
      total_revenue: '₹2,45,000',
      total_buyers: 89
    });
    setLoading(false);
  }, []);

  const statCards = [
    { name: 'My Products', value: stats?.total_products || 0, icon: Package, color: 'bg-primary' },
    { name: 'Active Orders', value: stats?.active_orders || 0, icon: ShoppingBag, color: 'bg-blue-500' },
    { name: 'Total Revenue', value: stats?.total_revenue || 0, icon: Banknote, color: 'bg-green-500' },
    { name: 'Direct Buyers', value: stats?.total_buyers || 0, icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <DashboardNavbar 
          title="Seller Dashboard" 
          description="Manage your inventory and track wholesale orders"
        >
          <button className="px-5 py-2.5 bg-white text-black hover:bg-slate-200 rounded-full font-medium transition-all flex items-center gap-2 text-sm">
            <Package size={18} />
            Add New Product
          </button>
        </DashboardNavbar>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <div key={card.name} className="glass-card p-6 flex items-center gap-4 hover:shadow-2xl transition-all cursor-default">
              <div className={`p-4 rounded-2xl ${card.color} text-white`}>
                <card.icon size={28} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{card.name}</p>
                <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recent Orders</h3>
              <button className="text-primary font-semibold hover:underline text-sm">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-sm">
                    <th className="pb-4 font-medium">Order ID</th>
                    <th className="pb-4 font-medium">Product</th>
                    <th className="pb-4 font-medium">Quantity</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-medium">#ORD-2024-{100 + i}</td>
                      <td className="py-4">Banarasi Silk Saree...</td>
                      <td className="py-4">50 units</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-md uppercase">Pending</span>
                      </td>
                      <td className="py-4 font-bold">₹1,25,000</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card p-8 bg-primary/5 border-primary/10">
            <h3 className="text-xl font-bold mb-6">Inventory Status</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Chiffon Collection</span>
                  <span className="text-primary font-bold">Low Stock (12)</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[20%] h-full bg-primary"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Cotton Printed</span>
                  <span className="text-green-600 font-bold">Healthy (145)</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-green-500"></div>
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                  Restock All Items
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
