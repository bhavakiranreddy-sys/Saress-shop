"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Truck, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const menuItems: any = {
  admin_seller: [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard/vendor' },
    { name: 'My Products', icon: Package, href: '/dashboard/vendor/products' },
    { name: 'Orders', icon: ShoppingCart, href: '/dashboard/vendor/orders' },
    { name: 'User Management', icon: Users, href: '/dashboard/vendor/users' },
    { name: 'Analytics', icon: BarChart3, href: '/dashboard/vendor/analytics' },
  ],
  delivery: [
    { name: 'Assigned', icon: Truck, href: '/dashboard/delivery' },
    { name: 'History', icon: Package, href: '/dashboard/delivery/history' },
  ]
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const role = user?.role || 'buyer';
  const items = menuItems[role] || [];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <span className="text-xl font-display font-bold text-slate-900">SareeMarket</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {items.map((item: any) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              pathname === item.href 
              ? 'bg-primary/5 text-primary font-semibold' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {user?.role === 'admin_seller' ? 'A' : 'D'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate capitalize">
              {user?.role?.replace('_', ' ')}
            </p>
            <p className="text-[10px] text-slate-500 truncate uppercase tracking-wider">Active Session</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium group"
        >
          <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
