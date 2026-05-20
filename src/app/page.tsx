"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { Search, ShoppingCart, Eye, ArrowRight, Star, ShieldCheck, Truck, Clock } from 'lucide-react';

export default function Home() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.slice(0, 8)); // Show top 8 products on home page
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform origin-top-right -z-10"></div>
        <div className="absolute top-40 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-primary text-sm font-bold animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              India's Premier B2B Saree Destination
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-[5.5rem] font-display font-black text-slate-900 leading-[1.05] tracking-tight">
                Luxury <span className="text-primary">Heritage</span>, <br />
                Wholesale <span className="text-secondary italic">Prices</span>.
              </h1>
              <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
                Connect directly with master weavers and certified manufacturers. Access exclusive Banarasi, Kanjeevaram, and Silk collections at factory rates.
              </p>
            </div>

            <div className="flex flex-wrap gap-5 pt-4">
              <Link href="/products" className="btn-primary px-10 py-5 text-lg flex items-center gap-3 group shadow-2xl shadow-primary/40">
                Explore Collection
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/register?role=vendor" className="px-10 py-5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 hover:bg-slate-50 transition-all shadow-lg shadow-slate-200/50 flex items-center gap-2">
                Become a Vendor
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-slate-200/60">
              <div>
                <p className="text-3xl font-black text-slate-900">500+</p>
                <p className="text-sm text-slate-500 font-medium">Manufacturers</p>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">12k+</p>
                <p className="text-sm text-slate-500 font-medium">Retailers Trust</p>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">100%</p>
                <p className="text-sm text-slate-500 font-medium">Quality Assured</p>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative h-[700px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white animate-fade-in" style={{animationDelay: '0.2s'}}>
              <Image 
                src="/hero-saree.png" 
                alt="Premium Saree Hero" 
                fill 
                className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <div className="flex items-center gap-2 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-secondary text-secondary" />)}
                  <span className="text-sm font-bold ml-2">4.9/5 Rating</span>
                </div>
                <h3 className="text-4xl font-bold mb-2">Heritage Silk Series</h3>
                <p className="text-white/80 font-medium">Starting from ₹4,500 / Piece (Bulk)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Verified Sellers</h4>
              <p className="text-sm text-slate-500">100% Business Auth</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <Truck size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Pan India Delivery</h4>
              <p className="text-sm text-slate-500">Secure & Tracked</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <Clock size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Live Inventory</h4>
              <p className="text-sm text-slate-500">Real-time Stock Updates</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <ShoppingCart size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Easy Returns</h4>
              <p className="text-sm text-slate-500">7-Day Return Policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="collections" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.2em] text-sm">Curated Selection</span>
              <h2 className="text-5xl font-display font-black text-slate-900">Trending <span className="text-primary italic">Collections</span></h2>
              <p className="text-slate-500 max-w-lg">Handpicked designs that are currently dominating the retail market across India.</p>
            </div>
            <Link href="/products" className="group flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 hover:border-primary hover:text-primary transition-all shadow-sm">
              View Full Catalog
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="aspect-[3/4] bg-slate-200 rounded-[2rem]"></div>
                  <div className="h-6 bg-slate-200 rounded-full w-3/4 mx-auto"></div>
                  <div className="h-4 bg-slate-200 rounded-full w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.map((product) => (
                <div key={product.id} className="group relative bg-white p-4 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                  <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 bg-slate-50">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                      <Link href={`/products/${product.id}`} className="p-4 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-6 group-hover:translate-y-0 duration-500 shadow-xl">
                        <Eye size={24} />
                      </Link>
                      <button 
                        onClick={() => {
                          addToCart(product, product.min_bulk_quantity || 1);
                          router.push('/cart');
                        }}
                        className="p-4 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-6 group-hover:translate-y-0 duration-500 delay-75 shadow-xl"
                      >
                        <ShoppingCart size={24} />
                      </button>
                    </div>
                    
                    {product.images && product.images.length > 0 ? (
                      <Image 
                        src={product.images[0]} 
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 italic font-medium p-8 text-center">
                        {product.name}
                      </div>
                    )}
                    
                    <div className="absolute top-5 left-5 z-20">
                      <span className="px-4 py-2 bg-white/95 backdrop-blur text-primary text-xs font-black rounded-full shadow-lg border border-primary/10">
                        ₹{product.bulk_price} / PC
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-3 pb-4">
                    <p className="text-xs text-primary/60 font-black uppercase tracking-[0.15em] mb-2">{product.fabric_type}</p>
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <div>
                        <p className="text-2xl font-black text-slate-900">₹{product.price}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Sample Price</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-700 font-bold">Min. {product.min_bulk_quantity}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Quantity</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-slate-200" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500">New arrivals are coming soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl lg:text-6xl font-display font-black text-white mb-8 leading-tight">
                Ready to Grow Your <br />
                <span className="text-secondary">Saree Business?</span>
              </h2>
              <p className="text-white/80 text-xl mb-12 leading-relaxed">
                Join thousands of retailers who source their inventory from us. Scale your business with authentic quality and unmatched prices.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/register" className="px-10 py-5 bg-white text-primary font-black rounded-2xl hover:bg-secondary hover:text-primary transition-all shadow-xl">
                  Register Business Now
                </Link>
                <Link href="#" className="px-10 py-5 bg-primary-dark border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-display font-bold text-white tracking-tight">
                Saree<span className="text-primary">Market</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Leading B2B marketplace for authentic Indian sarees. Connecting tradition with technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-lg">Platform</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="/products" className="hover:text-white transition-colors">Browse Products</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Manufacturers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Bulk Inquiry</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Quality Control</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
            <p className="text-slate-400 mb-4">Get updates on new arrivals and market trends.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-white/10 border-none rounded-xl px-4 py-3 flex-1 focus:ring-1 focus:ring-primary" />
              <button className="bg-primary px-6 py-3 rounded-xl hover:bg-red-900 transition-all font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-16 mt-16 border-t border-white/5 text-center text-slate-500 text-sm">
          &copy; 2026 SareeMarket B2B. All rights reserved. Built with heritage.
        </div>
      </footer>
    </div>
  );
}
