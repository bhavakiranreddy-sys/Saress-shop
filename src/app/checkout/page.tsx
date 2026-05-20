"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { CreditCard, Truck, MapPin, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login?redirect=/checkout');
      return;
    }
    
    setLoading(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        shipping_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`
      };
      
      await api.post('/orders/', orderData);
      setSuccess(true);
      clearCart();
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err) {
      console.error(err);
      alert('Order failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white shadow-2xl shadow-green-200">
            <CheckCircle2 size={64} />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-display font-black text-slate-900">Order Placed!</h1>
            <p className="text-xl text-slate-500">Your wholesale request is being processed by the manufacturer.</p>
          </div>
          <p className="text-slate-400">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-24 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-12 font-medium">
          <ArrowLeft size={20} />
          Back to Cart
        </button>

        <div className="grid grid-cols-1 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-display font-black text-slate-900 mb-2">Checkout</h1>
              <p className="text-slate-500">Secure wholesale order processing</p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-10">

              <section className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin size={24} />
                  <h3 className="text-xl font-bold uppercase tracking-widest text-slate-900">Shipping Address</h3>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Street Address</label>
                    <input 
                      required
                      type="text" 
                      className="input-field" 
                      placeholder="Shop No. 4, Main Market Road"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">City</label>
                      <input 
                        required
                        type="text" 
                        className="input-field" 
                        placeholder="Varanasi"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">State</label>
                      <input 
                        required
                        type="text" 
                        className="input-field" 
                        placeholder="Uttar Pradesh"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 col-span-2 md:col-span-1">
                      <label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Pincode</label>
                      <input 
                        required
                        type="text" 
                        className="input-field" 
                        placeholder="221001"
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <button 
                disabled={loading}
                type="submit" 
                className="w-full btn-primary py-6 text-2xl flex items-center justify-center gap-4 group shadow-2xl shadow-primary/30 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <CreditCard size={28} />}
                Place Bulk Order
              </button>
            </form>
          </div>

          {/* Summary Section */}
          <div className="">
            <div className="glass-card p-10 bg-white border-2 border-slate-100">
              <h3 className="text-2xl font-bold mb-8">Order Highlights</h3>
              <div className="space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden shadow-md">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.quantity} units</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 pt-8 border-t border-slate-100 space-y-4">
                <div className="flex justify-between text-xl">
                  <span className="font-bold text-slate-500">Payable Amount</span>
                  <span className="font-black text-slate-900">₹{Math.round(cartTotal * 1.05)}</span>
                </div>
                <p className="text-xs text-slate-400 italic">Includes 5% GST and Free Business Shipping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
