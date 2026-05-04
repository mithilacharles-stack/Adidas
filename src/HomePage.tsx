import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { products } from './mockData';
import { ProductCard } from './ProductCard';
import { Category, Product } from './types';

interface HomeProps {
  onNavigate: (page: string, category?: Category) => void;
  onProductClick: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const HomePage: React.FC<HomeProps> = ({ onNavigate, onProductClick, onQuickAdd }) => {
  const trendingProducts = products.filter(p => p.isBestseller).slice(0, 1); // Get top one for bento
  const topProduct = trendingProducts[0];

  return (
    <div className="pt-24 pb-12 bg-[#F0F0F0] px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-6 h-auto md:h-[1200px]">
        {/* Main Hero Tile */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="md:col-span-8 md:row-span-4 bg-black text-white p-12 relative flex flex-col justify-end group cursor-pointer overflow-hidden border-2 border-black"
           onClick={() => onNavigate('list')}
        >
          <img 
            src="https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-10 right-10 flex flex-col items-end">
            <span className="text-lime-accent font-black text-7xl italic leading-none">-40%</span>
            <span className="font-bold uppercase tracking-tighter text-sm">Season Launch</span>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-7xl md:text-[120px] font-black leading-[0.85] uppercase tracking-tighter mb-6">
              Impossible<br />is Nothing
            </h1>
            <p className="max-w-md text-sm opacity-70 mb-10 font-medium leading-relaxed">
              Push your limits with the new Apex Predator running collection. Engineered for elite performance and urban resilience.
            </p>
            <button className="bg-white text-black font-black uppercase py-5 px-12 text-sm tracking-widest self-start hover:bg-lime-accent transition-colors shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none">
              Shop Collection
            </button>
          </div>
        </motion.div>

        {/* Featured Product Tile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-4 md:row-span-3 bg-white border-2 border-black p-8 flex flex-col justify-between cursor-pointer group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
          onClick={() => onProductClick(topProduct)}
        >
          <div className="flex justify-between items-start">
            <span className="font-black text-xs uppercase bg-black text-white px-3 py-1.5 italic">Trending Now</span>
            <span className="font-black text-lg">${topProduct.price}.00</span>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-56 h-56 bg-neutral-50 rounded-full flex items-center justify-center relative border border-black/5">
              <div className="w-40 h-1 bg-black absolute -rotate-45 opacity-10"></div>
              <img 
                src={topProduct.image} 
                alt={topProduct.name} 
                className="w-48 h-48 object-cover rotate-12 group-hover:scale-110 transition-transform duration-500" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-black text-2xl uppercase italic leading-none">{topProduct.name}</h3>
            <p className="text-[10px] uppercase opacity-50 font-black mt-2 tracking-widest leading-relaxed">Core Black / Solar Red / Cloud White</p>
            <button 
              onClick={(e) => { e.stopPropagation(); onQuickAdd(topProduct); }}
              className="mt-6 w-full border-2 border-black py-4 font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all bg-white"
            >
              Quick Add To Cart
            </button>
          </div>
        </motion.div>

        {/* Newsletter/Club Tile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-4 md:row-span-3 bg-lime-accent border-2 border-black p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <span className="text-xs uppercase font-black tracking-[0.3em] mb-6">Join the Collective</span>
          <h2 className="text-4xl font-black uppercase italic leading-tight mb-8">Unlock Your<br />15% Discount</h2>
          <div className="w-full flex border-b-2 border-black pb-3 mb-6">
            <input 
              type="text" 
              placeholder="ENTER EMAIL" 
              className="bg-transparent w-full text-xs font-black outline-none placeholder:text-black/30 placeholder:italic uppercase tracking-widest"
            />
            <span className="text-2xl font-black">→</span>
          </div>
          <p className="text-[11px] opacity-60 font-black uppercase tracking-tighter">Your data is yours. Performance is ours.</p>
        </motion.div>

        {/* Brand Story/Stats Tile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-4 md:row-span-2 bg-white border-2 border-black p-8 flex flex-col justify-center cursor-pointer hover:bg-neutral-50"
        >
          <h4 className="font-black uppercase text-xs tracking-widest opacity-30 mb-3">Our Core</h4>
          <p className="text-2xl font-black uppercase italic leading-[1.1] tracking-tighter">
            Architecting the future of human motion since 2026.
          </p>
          <div className="flex space-x-2 mt-6">
            <div className="w-12 h-1.5 bg-black"></div>
            <div className="w-12 h-1.5 bg-neutral-200"></div>
            <div className="w-12 h-1.5 bg-neutral-200"></div>
          </div>
        </motion.div>

        {/* Community Tile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="md:col-span-4 md:row-span-2 bg-black text-white flex items-center justify-center p-8 cursor-pointer relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-lime-accent opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="text-center relative z-10">
            <span className="block text-5xl font-black italic tracking-tighter text-lime-accent mb-2">1,200+</span>
            <span className="text-[11px] uppercase tracking-widest font-black opacity-60 px-4 block">World Class Athletes Registered</span>
            <div className="mt-6 flex justify-center space-x-2 text-lime-accent">
              {[1,2,3,4,5].map(i => <span key={i} className="text-xl">★</span>)}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Category Icons Row - Small Bento Tiles */}
      <div className="max-w-[1400px] mx-auto mt-6 grid grid-cols-2 md:grid-cols-5 gap-6">
        {['Men', 'Women', 'Kids', 'Sports', 'New Arrivals'].map((cat, i) => (
           <motion.div 
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + (i * 0.1) }}
            onClick={() => onNavigate('list', cat as Category)}
            className="bento-tile p-6 flex flex-col items-center justify-center cursor-pointer group hover:bg-black hover:text-white"
           >
             <span className="font-display font-black uppercase italic tracking-tighter text-xl group-hover:scale-110 transition-transform">
               {cat}
             </span>
             <span className="text-[10px] uppercase font-black tracking-widest mt-2 opacity-50 bg-neutral-100 group-hover:bg-neutral-800 px-2 py-0.5 transition-colors">
                Explore
             </span>
           </motion.div>
        ))}
      </div>
    </div>
  );
};
