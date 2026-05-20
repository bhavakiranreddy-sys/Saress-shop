"use client";
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl text-slate-200">
            <ShoppingBag size={48} />
          </div>
          <h1 className="text-4xl font-display font-black text-slate-900 mb-4">Your cart is empty</h1>
          <p className="text-slate-500 mb-10 text-lg">Looks like you haven't added any premium sarees to your business inventory yet.</p>
          <Link href="/products" className="btn-primary px-10 py-4 text-lg">
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-24 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-display font-black text-slate-900 mb-12">Business Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => {
              const isBulk = item.quantity >= item.min_bulk_quantity;
              const price = isBulk ? item.bulk_price : item.price;
              
              return (
                <div key={item.id} className="glass-card p-6 flex flex-col sm:flex-row gap-8 hover:shadow-2xl transition-all group">
                  <div className="relative w-full sm:w-40 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <p className="text-primary font-black uppercase tracking-widest text-xs mb-4">
                        {isBulk ? 'Wholesale Order' : 'Sample Order'}
                      </p>
                      
                      <div className="flex flex-wrap gap-10">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Unit Price</p>
                          <p className="text-xl font-black text-slate-900">₹{price}</p>
                          {isBulk && <p className="text-[10px] text-green-600 font-bold">Wholesale Applied</p>}
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total</p>
                          <p className="text-xl font-black text-slate-900">₹{price * item.quantity}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                      <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-xl border border-slate-100">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-primary transition-all"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-black">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-primary transition-all"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      {!isBulk && (
                        <p className="text-xs text-slate-400 font-medium italic">
                          Add {item.min_bulk_quantity - item.quantity} more for wholesale price
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="glass-card p-8 sticky top-32 border-2 border-primary/10">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Order Summary</h3>
              
              <div className="space-y-4 pb-8 border-b border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Business Tax (GST 5%)</span>
                  <span className="font-bold">₹{Math.round(cartTotal * 0.05)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase tracking-widest text-xs">Free for Bulk</span>
                </div>
              </div>
              
              <div className="py-8 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Payable</p>
                  <p className="text-4xl font-black text-slate-900">₹{Math.round(cartTotal * 1.05)}</p>
                </div>
              </div>

              <Link href="/checkout" className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/30">
                Proceed to Checkout
                <ArrowRight size={20} />
              </Link>
              
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6">
                Secure Business Transaction
              </p>
            </div>
            
            <div className="glass-card p-6 bg-secondary/5 border-secondary/20">
              <h4 className="font-bold text-slate-900 mb-2">Bulk Benefits Applied</h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  Priority Manufacturing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  GST Invoice Provided
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                  Quality Check Report
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
