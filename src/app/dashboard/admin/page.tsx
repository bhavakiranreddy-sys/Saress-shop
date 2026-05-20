"use client";
import { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import api from '@/lib/api';
import { Users, ShoppingBag, CheckCircle, TrendingUp, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Sales', value: `₹${stats?.total_sales || 0}`, icon: TrendingUp, color: 'bg-green-500' },
    { name: 'Total Orders', value: stats?.total_orders || 0, icon: ShoppingBag, color: 'bg-blue-500' },
    { name: 'Pending Approvals', value: stats?.pending_approvals || 0, icon: CheckCircle, color: 'bg-amber-500' },
    { name: 'Total Sellers', value: stats?.total_sellers || 0, icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <DashboardNavbar 
          title="Admin Overview" 
          description="Platform-wide statistics and management"
        >
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all font-medium border border-transparent hover:border-red-500/20"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
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
              <div key={card.name} className="glass-card p-6 flex items-center justify-between">
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

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h3 className="text-xl mb-4">Revenue Growth</h3>
            <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              Chart Placeholder (Recharts/Chart.js)
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-xl mb-4">Recent Sellers</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                    <div>
                      <p className="font-medium">Saree Emporium {i}</p>
                      <p className="text-xs text-slate-400">GST: 22AAAAA0000A1Z5</p>
                    </div>
                  </div>
                  <button className="text-sm font-semibold text-primary">View</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
