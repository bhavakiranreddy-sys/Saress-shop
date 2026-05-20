"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, LogOut, LayoutDashboard, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-display font-bold text-slate-900 tracking-tight">
            Saree<span className="text-primary">Market</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 font-medium text-slate-600">
          <Link href="/products" className="hover:text-primary transition-colors relative group">
            Collections
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="#" className="hover:text-primary transition-colors relative group">
            Manufacturers
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="#" className="hover:text-primary transition-colors relative group">
            Bulk Inquiry
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-slate-600 hover:text-primary transition-colors">
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              {user.role === 'admin_seller' && (
                <Link href="/dashboard/vendor" className="flex items-center gap-2 px-4 py-2 text-slate-600 font-semibold hover:text-primary transition-colors">
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              )}
              {user.role === 'delivery' && (
                <Link href="/dashboard/delivery" className="flex items-center gap-2 px-4 py-2 text-slate-600 font-semibold hover:text-primary transition-colors">
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              )}
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-5 py-2.5 text-slate-600 font-bold hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-5 py-2 text-slate-600 font-semibold hover:text-primary transition-colors">Login</Link>
              <Link href="/register" className="btn-primary shadow-xl shadow-primary/30 px-6">Join as Partner</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
