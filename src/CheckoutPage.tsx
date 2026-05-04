import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, CreditCard, Apple, CheckCircle2, ChevronLeft, RefreshCcw, Lock } from 'lucide-react';
import { useCart } from './CartContext';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsOrdered(true);
      setTimeout(() => {
          clearCart();
          onNavigate('home');
      }, 5000);
    }, 2500);
  };

  if (isOrdered) {
    return (
      <div className="pt-40 pb-40 bg-[#F0F0F0] flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-tile p-16 bg-white text-center max-w-lg w-full relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-lime-accent rotate-45 translate-x-12 -translate-y-12" />
          <div className="w-20 h-20 bg-lime-accent flex items-center justify-center mx-auto mb-8 border-2 border-black">
            <CheckCircle2 size={40} className="text-black" strokeWidth={3} />
          </div>
          <h2 className="font-display font-black text-4xl uppercase tracking-tighter italic mb-4">Protocol Success</h2>
          <p className="text-black/50 font-black uppercase text-[10px] tracking-widest mb-10 leading-relaxed">
            Your order has been verified and processed. Tracking ID: NS-{Math.floor(Math.random() * 1000000)}
          </p>
          <button 
            onClick={() => { clearCart(); onNavigate('home'); }}
            className="w-full bg-black text-white py-5 font-display font-black uppercase tracking-widest text-xs hover:bg-lime-accent hover:text-black transition-all border-2 border-black"
          >
            Return to Core
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center space-x-4 mb-16">
          <h1 className="font-display font-black text-6xl md:text-8xl uppercase tracking-tighter italic leading-[0.85]">
            FINAL<br />PROTOCOL
          </h1>
          <div className="flex-1 h-0.5 bg-black/10" />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="bento-tile p-10 bg-white">
              <h3 className="font-display font-black text-sm uppercase tracking-widest border-b-2 border-black pb-4 mb-10 italic">01. Identity Node</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 italic ml-1">Alias/Full Name</label>
                  <input required type="text" className="w-full border-2 border-black bg-neutral-50 px-6 py-4 font-black text-xs uppercase tracking-widest focus:bg-lime-accent transition-colors outline-none" placeholder="DOE, JOHN" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 italic ml-1">Digital Mail</label>
                  <input required type="email" className="w-full border-2 border-black bg-neutral-50 px-6 py-4 font-black text-xs uppercase tracking-widest focus:bg-lime-accent transition-colors outline-none" placeholder="JD@PROTO.COL" />
                </div>
              </div>
            </div>

            <div className="bento-tile p-10 bg-white">
              <h3 className="font-display font-black text-sm uppercase tracking-widest border-b-2 border-black pb-4 mb-10 italic">02. Logistical Destination</h3>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 italic ml-1">Street Protocol</label>
                  <input required type="text" className="w-full border-2 border-black bg-neutral-50 px-6 py-4 font-black text-xs uppercase tracking-widest focus:bg-lime-accent transition-colors outline-none" placeholder="123 VECTOR AVE" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 italic ml-1">Sector/City</label>
                    <input required type="text" className="w-full border-2 border-black bg-neutral-50 px-6 py-4 font-black text-xs uppercase tracking-widest focus:bg-lime-accent transition-colors outline-none" placeholder="NEO TOKYO" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 italic ml-1">State/Code</label>
                    <input required type="text" className="w-full border-2 border-black bg-neutral-50 px-6 py-4 font-black text-xs uppercase tracking-widest focus:bg-lime-accent transition-colors outline-none" placeholder="TK" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 italic ml-1">Index/Zip</label>
                    <input required type="text" className="w-full border-2 border-black bg-neutral-50 px-6 py-4 font-black text-xs uppercase tracking-widest focus:bg-lime-accent transition-colors outline-none" placeholder="100-0001" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bento-tile p-10 bg-white">
              <h3 className="font-display font-black text-sm uppercase tracking-widest border-b-2 border-black pb-4 mb-10 italic">03. Transaction Method</h3>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 italic ml-1">Security Token Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20" size={18} />
                    <input required type="text" className="w-full border-2 border-black bg-neutral-50 px-16 py-4 font-black text-xs uppercase tracking-widest focus:bg-lime-accent transition-colors outline-none" placeholder="0000 0000 0000 0000" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 italic ml-1">Expiry Frame</label>
                    <input required type="text" className="w-full border-2 border-black bg-neutral-50 px-6 py-4 font-black text-xs uppercase tracking-widest focus:bg-lime-accent transition-colors outline-none" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 italic ml-1">CVV Logic</label>
                    <input required type="text" className="w-full border-2 border-black bg-neutral-50 px-6 py-4 font-black text-xs uppercase tracking-widest focus:bg-lime-accent transition-colors outline-none" placeholder="***" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bento-tile p-8 bg-black text-white sticky top-32">
              <h2 className="font-display font-black text-2xl uppercase tracking-tighter italic mb-8 border-b border-white/10 pb-4 text-lime-accent">Validation</h2>
              
              <div className="space-y-6 mb-10">
                {cart.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-white/5 pb-4">
                    <span className="truncate max-w-[150px]">{item.name} x{item.quantity}</span>
                    <span className="text-lime-accent">${item.price * item.quantity}.00</span>
                  </div>
                ))}
                
                <div className="pt-6 space-y-4">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                      <span>Subtotal Aggregate</span>
                      <span>${cartTotal}.00</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                      <span>Tax Protocol</span>
                      <span>${(cartTotal * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="h-0.5 bg-white/10" />
                    <div className="flex justify-between items-end">
                      <span className="font-display font-black text-xs uppercase tracking-widest italic">Final Total</span>
                      <span className="font-display font-black text-4xl italic text-lime-accent">${(cartTotal * 1.1).toFixed(2)}</span>
                    </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-lime-accent text-black py-6 font-display font-black text-xl uppercase tracking-[0.2em] italic border-2 border-black hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-3">
                    <RefreshCcw size={20} className="animate-spin text-black" />
                    <span>Synchronizing...</span>
                  </div>
                ) : (
                  <span>Submit Protocol</span>
                )}
              </button>
              
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between opacity-30 text-[9px] font-black uppercase tracking-[0.2em]">
                 <span className="flex items-center gap-1"><Lock size={10} /> 256-BIT ENCRYPTION</span>
                 <span className="flex items-center gap-1"><ShieldCheck size={10} /> NODE.VERIFIED</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
;
