import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onQuickAdd }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative cursor-pointer bento-tile p-4 flex flex-col h-full hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-50 mb-6 border border-black/5">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-black text-[#E2FF00] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 italic">
              Special Edition
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
          className="absolute bottom-2 right-2 bg-[#E2FF00] text-black p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
        >
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-display font-black text-lg leading-none uppercase italic group-hover:text-black transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span className="font-display font-black text-sm whitespace-nowrap">${product.price}</span>
          </div>
          <p className="text-black/40 text-[10px] uppercase tracking-widest font-black">
            {product.category}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-[10px] font-black uppercase tracking-tighter">
            <Star size={10} className="fill-black text-black" />
            <span>{product.rating}</span>
            <span className="opacity-30">({product.reviewsCount})</span>
          </div>
          <div className="w-12 h-0.5 bg-black/10 group-hover:bg-lime-accent group-hover:w-full transition-all" />
        </div>
      </div>
    </motion.div>
  );
};
