"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ShieldCheck, Truck, Clock, ArrowLeft, Star, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setQuantity(data.min_bulk_quantity || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push('/cart');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>;

  if (!product) return <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
    <h2 className="text-2xl font-bold mb-4">Product not found</h2>
    <Link href="/products" className="btn-primary px-6">Back to Collections</Link>
  </div>;

  const currentPrice = quantity >= product.min_bulk_quantity ? product.bulk_price : product.price;

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-24 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-medium">
          <ArrowLeft size={20} />
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-white shadow-2xl border-8 border-white">
              {product.images && product.images.length > 0 ? (
                <Image 
                  src={product.images[activeImage]} 
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 italic">No image available</div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={product.name} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] rounded-full">
                {product.fabric_type} Collection
              </span>
              <h1 className="text-5xl font-display font-black text-slate-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-secondary text-secondary" />)}
                </div>
                <span className="text-slate-400 font-medium">|</span>
                <span className="text-slate-500 font-bold">4.8 Rating (120+ Bulk Orders)</span>
              </div>
            </div>

            <div className="p-8 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
              <div className="flex items-end gap-6">
                <div>
                  <p className="text-5xl font-black text-slate-900">₹{currentPrice}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-2">
                    {quantity >= product.min_bulk_quantity ? 'Wholesale Price' : 'Sample Price'}
                  </p>
                </div>
                {quantity < product.min_bulk_quantity && (
                  <div className="pb-1">
                    <p className="text-lg text-primary font-bold">Save ₹{(product.price - product.bulk_price)}/pc</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">with bulk order</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-700 uppercase tracking-widest">Select Quantity</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-primary transition-all"
                    >
                      <Minus size={20} />
                    </button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center bg-transparent font-black text-xl focus:outline-none"
                    />
                    <button 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-primary transition-all"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-slate-900">Min. Bulk: {product.min_bulk_quantity} units</p>
                    <p className="text-slate-500">Currently in stock: {product.stock_quantity}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-4 group shadow-2xl shadow-primary/30"
              >
                <ShoppingCart size={24} />
                Add to Business Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-md text-primary">
                  <ShieldCheck size={28} />
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400">Certified Quality</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-md text-primary">
                  <Truck size={28} />
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400">Fast Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-md text-primary">
                  <Clock size={28} />
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400">7-Day Return</p>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-200 space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Description</h3>
              <p className="text-slate-500 leading-relaxed">
                {product.description || "Experience the pinnacle of luxury with our premium saree collection. Hand-crafted with meticulous attention to detail, each piece tells a story of heritage and elegance."}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Fabric</p>
                  <p className="font-bold text-slate-900">{product.fabric_type}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Color</p>
                  <p className="font-bold text-slate-900">{product.color}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
