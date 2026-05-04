import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Truck, ShieldCheck, RefreshCcw, ChevronRight, Heart, Share2, Plus, Minus } from 'lucide-react';
import { useCart } from './CartContext';
import { Product } from './types';
import { products } from './mockData';
import { ProductCard } from './ProductCard';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: string) => void;
  onProductClick: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onNavigate, onProductClick }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        addToCart(product, selectedSize, selectedColor);
    }
    onNavigate('cart');
  };

  return (
    <div className="pt-32 pb-20 bg-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Display - Bento Tile */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bento-tile aspect-square relative overflow-hidden flex items-center justify-center p-12 bg-white"
            >
               <div className="absolute top-8 left-8 flex flex-col items-start z-10">
                 <span className="bg-black text-[#E2FF00] font-black italic px-4 py-1 text-sm tracking-widest uppercase mb-2">Authenticated</span>
                 <span className="font-bold text-xs opacity-30 mt-2 uppercase tracking-[0.3em]">Device.04 // {product.id}</span>
               </div>
               
               <img 
                 src={product.image} 
                 className="w-full h-full object-cover grayscale-0 group-hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                 alt={product.name}
                 referrerPolicy="no-referrer"
               />

               <div className="absolute bottom-8 right-8 flex space-x-4">
                 <button className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center hover:bg-lime-accent transition-colors">
                   <Heart size={20} />
                 </button>
                 <button className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center hover:bg-lime-accent transition-colors">
                   <Share2 size={20} />
                 </button>
               </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-6">
               {[1,2,3,4].map(i => (
                 <div key={i} className="bento-tile aspect-square cursor-pointer opacity-40 hover:opacity-100 p-2">
                    <img src={product.image} className="w-full h-full object-cover" alt="Thumb" referrerPolicy="no-referrer" />
                 </div>
               ))}
            </div>
          </div>

          {/* Info Tile */}
          <div className="lg:col-span-5 bento-tile p-10 bg-white">
            <div className="mb-10">
              <h1 className="font-display font-black text-5xl md:text-6xl leading-[0.9] uppercase tracking-tighter italic mb-6">
                {product.name}
              </h1>
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-3xl">${product.price}.00</span>
                <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest bg-lime-accent px-3 py-1 border border-black italic">
                   <Star size={12} className="fill-black" />
                   <span>{product.rating}</span>
                </div>
              </div>
            </div>

            {/* Selection */}
            <div className="space-y-10 mb-12">
              {/* Color */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 block mb-6 px-1 italic">Circuit Pattern</label>
                <div className="flex space-x-4">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-10 w-10 border-2 transition-all p-1 ${
                        selectedColor === color ? 'border-black bg-lime-accent shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'border-neutral-200'
                      }`}
                      title={color}
                    >
                      <div className={`w-full h-full ${color.toLowerCase().includes('black') ? 'bg-black' : 'bg-neutral-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <div className="flex justify-between items-center mb-6 px-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 italic">Force Dimension</label>
                  <button className="text-[9px] font-black uppercase tracking-widest underline opacity-40">Matrix Guide</button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 font-display font-black text-xs tracking-tighter border-2 transition-all italic ${
                        selectedSize === size ? 'bg-black border-black text-[#E2FF00] shadow-[3px_3px_0px_0px_rgba(226,255,0,0.3)] scale-105' : 'bg-transparent border-neutral-100 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logic Check - Quantity */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 italic px-1">Iterate Count</span>
                <div className="flex items-center border-2 border-black bg-neutral-50 h-14">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-14 h-full flex items-center justify-center hover:bg-black hover:text-white transition-colors border-r-2 border-black">
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <span className="w-14 text-center font-display font-black text-xl italic">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-14 h-full flex items-center justify-center hover:bg-black hover:text-white transition-colors border-l-2 border-black">
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-6 font-display font-black text-xl uppercase tracking-[0.2em] italic border-2 border-black hover:bg-lime-accent hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] active:shadow-none"
            >
              Add To System — ${product.price * quantity}.00
            </button>

            {/* Status Indicators */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t-2 border-neutral-100 pt-10">
               <div className="text-center">
                 <Truck size={20} className="mx-auto mb-3 opacity-30" />
                 <span className="block text-[8px] font-black uppercase tracking-widest leading-none">Global<br />Node Ship</span>
               </div>
               <div className="text-center">
                 <ShieldCheck size={20} className="mx-auto mb-3 opacity-30" />
                 <span className="block text-[8px] font-black uppercase tracking-widest leading-none">Encrypted<br />Protocol</span>
               </div>
               <div className="text-center">
                 <RefreshCcw size={20} className="mx-auto mb-3 opacity-30" />
                 <span className="block text-[8px] font-black uppercase tracking-widest leading-none">System<br />Reset/30d</span>
               </div>
            </div>
          </div>
        </div>

        {/* Technical Detail Bento Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8">
           <div className="md:col-span-4 bento-tile p-10 bg-black text-white">
              <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-8 italic text-lime-accent">THE SPEC</h3>
              <ul className="space-y-6">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="w-2 h-2 bg-lime-accent rotate-45 mt-1.5 flex-shrink-0" />
                    <span className="text-white/60 text-xs font-black uppercase tracking-widest leading-relaxed italic">{detail}</span>
                  </li>
                ))}
              </ul>
           </div>

           <div className="md:col-span-8 bento-tile p-12 bg-white flex flex-col justify-between">
              <div>
                <h3 className="font-display font-black text-4xl uppercase tracking-tighter mb-8 italic">CORE OPERATIVE</h3>
                <p className="text-black/60 text-lg font-medium leading-relaxed mb-10 uppercase italic tracking-tight">
                  {product.description} Integrated with neo-adaptive fibers engineered to synchronize with every kinetic chain. Architecture for those who exist at the intersection of raw performance and urban aesthetics. Built for high-frequency deployment in extreme conditions.
                </p>
              </div>
              <div className="aspect-[21/9] bg-neutral-900 overflow-hidden relative border-2 border-black">
                 <img 
                    src="https://images.unsplash.com/photo-1547941126-3d5322b218b0?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover opacity-60" 
                    alt="Action"
                    referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="text-center backdrop-blur-sm bg-black/20 p-8 border border-white/20">
                     <p className="text-white font-display font-black text-4xl italic uppercase">BUILT FOR VELOCITY</p>
                   </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Upsell Bento */}
        <div className="mt-20">
          <div className="flex items-center space-x-4 mb-12">
            <h3 className="font-display font-black text-4xl uppercase tracking-tighter italic">REC. GEAR</h3>
            <div className="flex-1 h-0.5 bg-black/10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} onQuickAdd={() => {}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
