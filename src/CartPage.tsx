import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ArrowRight, Trash2, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from './CartContext';

interface CartPageProps {
  onNavigate: (page: string) => void;
  onProductClick: (product: any) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onProductClick }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="pt-40 pb-40 bg-[#F0F0F0] flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-tile p-16 bg-white text-center max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-neutral-100 flex items-center justify-center mx-auto mb-8 border-2 border-black rotate-12">
            <ShoppingBag size={40} className="text-black/20" />
          </div>
          <h2 className="font-display font-black text-4xl uppercase tracking-tighter italic mb-4">Cart Logic Null</h2>
          <p className="text-black/50 font-black uppercase text-[10px] tracking-widest mb-10 leading-relaxed">No active performance systems detected in your queue.</p>
          <button 
            onClick={() => onNavigate('list')}
            className="w-full bg-black text-white py-5 font-display font-black uppercase tracking-widest text-xs hover:bg-lime-accent hover:text-black transition-all border-2 border-black"
          >
            Back To Protocols
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
            SYSTEM<br />QUEUE
          </h1>
          <div className="flex-1 h-0.5 bg-black/10" />
          <span className="font-black text-xl italic bg-lime-accent px-4 py-2 border-2 border-black">
            {cartCount} UNITS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => (
              <motion.div 
                layout
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="bento-tile bg-white flex flex-col sm:flex-row p-6 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div 
                  className="w-full sm:w-40 aspect-square bg-neutral-50 border border-black/5 cursor-pointer overflow-hidden flex-shrink-0"
                  onClick={() => onProductClick(item)}
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                </div>
                
                <div className="flex-1 sm:ml-8 flex flex-col justify-between pt-4 sm:pt-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 
                        className="font-display font-black text-2xl uppercase tracking-tighter italic cursor-pointer hover:text-lime-accent transition-colors"
                        onClick={() => onProductClick(item)}
                      >
                        {item.name}
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-3">
                         <span className="text-[10px] font-black uppercase tracking-widest bg-neutral-100 px-2 py-1">Size: {item.selectedSize}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest bg-neutral-100 px-2 py-1">Color: {item.selectedColor}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="p-3 text-black/20 hover:text-black hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-8">
                    <div className="flex items-center border-2 border-black bg-neutral-50 h-10">
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, Math.max(1, item.quantity - 1))} className="px-4 h-full hover:bg-black hover:text-white transition-colors">
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="w-10 text-center font-black italic">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} className="px-4 h-full hover:bg-black hover:text-white transition-colors">
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                    <span className="font-display font-black text-xl italic">${item.price * item.quantity}.00</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bento-tile p-8 bg-white border-2 border-black sticky top-32">
              <h2 className="font-display font-black text-2xl uppercase tracking-tighter italic mb-8 border-b-2 border-black pb-4">Logic Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-black/40">
                   <span>Unit Aggregate</span>
                   <span className="text-black">${cartTotal}.00</span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-black/40">
                   <span>Logistics/Nodes</span>
                   <span className="text-black">FREE (ELIGIBLE)</span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-black/40">
                   <span>Tax Protocol</span>
                   <span className="text-black">${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="h-0.5 bg-black/10" />
                <div className="flex justify-between items-end">
                   <span className="font-display font-black text-xs uppercase tracking-widest italic">Total Requirement</span>
                   <span className="font-display font-black text-4xl italic">${(cartTotal * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('checkout')}
                className="w-full bg-black text-white py-6 font-display font-black text-xl uppercase tracking-[0.2em] italic border-2 border-black hover:bg-lime-accent hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] active:shadow-none mb-4"
              >
                Execute Checkout
              </button>
              
              <div className="flex items-center justify-center space-x-2 opacity-30">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Handshake Guaranteed</span>
              </div>
            </div>

            <div className="bento-tile p-8 bg-lime-accent border-2 border-black">
               <p className="text-[10px] font-black uppercase tracking-widest leading-loose">
                 * ALL SYSTEMS ARE SUBJECT TO OUR HIGH-PERFORMANCE SATISFACTION PROTOCOL. 30-DAY RESET PERIOD ACTIVE.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
