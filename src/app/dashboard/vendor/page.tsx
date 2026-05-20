"use client";
import { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import api from '@/lib/api';
import { Package, ShoppingBag, Banknote, Users, TrendingUp, CheckCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';

export default function VendorDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/vendor/stats');
        setStats(data);
      } catch (err) {
        console.error(err);
        // Fallback for demo
        setStats({
          total_sales: 500000,
          total_orders: 124,
          pending_approvals: 5,
          total_vendors: 12,
          total_buyers: 450
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Platform Sales', value: `₹${stats?.total_sales?.toLocaleString() || 0}`, icon: TrendingUp, color: 'bg-green-500' },
    { name: 'Total Orders', value: stats?.total_orders || 0, icon: ShoppingBag, color: 'bg-blue-500' },
    { name: 'Pending Approvals', value: stats?.pending_approvals || 0, icon: CheckCircle, color: 'bg-amber-500' },
    { name: 'Total Buyers', value: stats?.total_buyers || 0, icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <DashboardNavbar 
          title="Admin/Seller Overview" 
          description="Manage your platform operations and selling activities"
        >
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all font-medium border border-transparent hover:border-red-500/20"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
          <button className="px-5 py-2.5 bg-white text-black hover:bg-slate-200 rounded-full font-medium transition-all flex items-center gap-2 text-sm ml-2">
            <Package size={18} />
            Add New Product
          </button>
        </DashboardNavbar>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-white rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card) => (
              <div key={card.name} className="glass-card p-6 flex items-center justify-between hover:shadow-xl transition-all cursor-default">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{card.name}</p>
                  <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${card.color} bg-opacity-10 text-${card.color.split('-')[1]}-600`}>
                  <card.icon size={24} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recent Platform Orders</h3>
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
                      <td className="py-4">Premium Silk Saree...</td>
                      <td className="py-4">25 units</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-md uppercase">Pending</span>
                      </td>
                      <td className="py-4 font-bold">₹75,000</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8 bg-primary/5 border-primary/10">
              <h3 className="text-xl font-bold mb-6">Recent Vendors</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                      <div>
                        <p className="font-medium text-sm">Vendor {i}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">GST Verified</p>
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-primary">Details</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Inventory Alerts</h3>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-sm font-medium text-red-800">5 Products out of stock</p>
                  <p className="text-xs text-red-600">Immediate attention required</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-sm font-medium text-amber-800">12 Low stock items</p>
                  <p className="text-xs text-amber-600">Reorder soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
