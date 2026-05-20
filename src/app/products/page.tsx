"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { Search, Filter, ShoppingCart, Eye } from 'lucide-react';

export default function ProductListing() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        {/* Search & Filter Bar */}
        <div className="glass-card p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search sarees by fabric, color, or style..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-all">
              <Filter size={20} />
              Filters
            </button>
            <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
            <select className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 rounded-xl font-medium focus:outline-none">
              <option>Sort by: Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[3/4] bg-white rounded-3xl"></div>
                <div className="h-4 bg-white rounded-full w-3/4"></div>
                <div className="h-4 bg-white rounded-full w-1/2"></div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <div key={product.id} className="group glass-card p-3 hover:shadow-2xl transition-all duration-500 animate-fade-in">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <Link href={`/products/${product.id}`} className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                      <Eye size={20} />
                    </Link>
                    <button 
                      onClick={() => {
                        addToCart(product, product.min_bulk_quantity || 1);
                        router.push('/cart');
                      }}
                      className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                  {product.images && product.images.length > 0 ? (
                    <Image 
                      src={product.images[0]} 
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm font-medium italic">
                      {product.name}
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-primary text-xs font-black rounded-full shadow-sm">
                      BULK: ₹{product.bulk_price}
                    </span>
                  </div>
                </div>
                
                <div className="px-2 pb-2">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{product.fabric_type}</p>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-black text-slate-900">₹{product.price}</p>
                    <p className="text-xs text-slate-500 font-medium">Min. {product.min_bulk_quantity} units</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No sarees found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
