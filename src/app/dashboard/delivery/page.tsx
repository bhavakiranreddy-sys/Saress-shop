"use client";
import { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import api from '@/lib/api';
import { Truck, MapPin, CheckCircle, Clock, Navigation, Phone, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import DeliveryNavbar from '@/components/dashboard/DeliveryNavbar';

export default function DeliveryDashboard() {
  const { logout } = useAuth();
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [availableDeliveries, setAvailableDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const [myRes, availRes] = await Promise.all([
          api.get('/delivery/my-deliveries'),
          api.get('/delivery/available-deliveries')
        ]);
        setDeliveries(myRes.data);
        setAvailableDeliveries(availRes.data);
      } catch (err) {
        console.error(err);
        // Fallback for demo
        setDeliveries([
          { id: 1, order_id: 'ORD-102', status: 'shipped', destination: 'Main Market, Varanasi', buyer_name: 'Anil Sarees' },
          { id: 2, order_id: 'ORD-105', status: 'pending', destination: 'Sector 4, Noida', buyer_name: 'Fashion Hub' },
        ]);
        setAvailableDeliveries([
          { id: 3, order_id: 'ORD-108', status: 'pending', destination: 'Lanka, Varanasi', buyer_name: 'Silk Traders', total_amount: 15000 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  const handleAcceptDelivery = async (id: number) => {
    try {
      await api.post(`/delivery/accept-delivery/${id}`);
      const accepted = availableDeliveries.find(d => d.id === id);
      if (accepted) {
        setAvailableDeliveries(prev => prev.filter(d => d.id !== id));
        setDeliveries(prev => [...prev, { ...accepted, status: 'Picked up' }]);
      }
    } catch (err) {
      console.error('Failed to accept delivery', err);
      alert('Failed to accept delivery');
    }
  };

  const stats = [
    { name: 'Active Deliveries', value: deliveries.filter(d => d.status !== 'delivered').length, icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Completed Today', value: 4, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Avg. Delivery Time', value: '45m', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <DeliveryNavbar 
          title="Delivery Dashboard" 
          description="Manage your assigned deliveries and routes"
        >
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition-all font-medium border border-transparent hover:border-white/20"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </DeliveryNavbar>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="glass-card p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Available Deliveries Section */}
        <div className="glass-card p-8 mb-8">
          <h3 className="text-xl font-bold mb-6">New Delivery Requests</h3>
          <div className="space-y-4">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1].map(i => <div key={i} className="h-24 bg-slate-100 rounded-2xl"></div>)}
              </div>
            ) : availableDeliveries.length === 0 ? (
              <div className="text-center py-8 text-slate-500">No new delivery requests</div>
            ) : (
              availableDeliveries.map((delivery) => (
                <div key={delivery.id} className="p-6 border border-slate-100 rounded-2xl hover:border-primary/20 transition-all group bg-white shadow-sm hover:shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
                        <Navigation size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-900">{delivery.order_id}</span>
                          <span className="px-2 py-0.5 text-[10px] font-black rounded uppercase bg-amber-50 text-amber-600">
                            NEW REQUEST
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-700">{delivery.buyer_name}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                          <MapPin size={12} />
                          {delivery.destination}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block mr-4">
                        <p className="text-xs text-slate-400 font-bold uppercase">Order Value</p>
                        <p className="font-bold text-slate-900">₹{delivery.total_amount || 0}</p>
                      </div>
                      <button 
                        onClick={() => handleAcceptDelivery(delivery.id)}
                        className="btn-primary py-3 px-6 shadow-md shadow-primary/20"
                      >
                        Accept Delivery
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-6">Active Route Assignments</h3>
          <div className="space-y-4">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2].map(i => <div key={i} className="h-24 bg-slate-100 rounded-2xl"></div>)}
              </div>
            ) : deliveries.length === 0 ? (
              <div className="text-center py-12 text-slate-500">No active deliveries assigned</div>
            ) : (
              deliveries.map((delivery) => (
                <div key={delivery.id} className="p-6 border border-slate-100 rounded-2xl hover:border-primary/20 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Navigation size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-900">{delivery.order_id}</span>
                          <span className={`px-2 py-0.5 text-[10px] font-black rounded uppercase ${
                            delivery.status === 'shipped' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {delivery.status}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-700">{delivery.buyer_name}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                          <MapPin size={12} />
                          {delivery.destination}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
                        <Phone size={20} />
                      </button>
                      <button className="btn-primary py-3 px-6">
                        Start Delivery
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

          {/* Live Map Sidebar */}
          <div className="xl:col-span-1">
            <div className="glass-card p-0 h-[calc(100vh-160px)] sticky top-28 flex flex-col overflow-hidden shadow-xl shadow-slate-200/50 border-2 border-slate-100">
              <div className="p-6 border-b border-slate-100 bg-white/50 backdrop-blur-sm z-10 relative">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="text-primary" size={24} />
                  Live Route Map
                </h3>
                <p className="text-sm text-slate-500 mt-1">Real-time GPS tracking for assigned routes</p>
              </div>
              <div className="flex-1 relative bg-slate-100">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=82.9739%2C25.3176%2C83.0239%2C25.3576&amp;layer=mapnik" 
                  className="absolute inset-0"
                  title="Delivery Live Map"
                ></iframe>
                
                {/* Simulated markers overlay for realism */}
                {deliveries.length > 0 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                    <div className="bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded-lg mb-1 shadow-lg whitespace-nowrap">
                      {deliveries.length} Active Drops
                    </div>
                    <MapPin className="text-slate-900 drop-shadow-lg" size={32} fill="currentColor" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
