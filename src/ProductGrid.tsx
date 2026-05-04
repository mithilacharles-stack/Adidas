import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, SlidersHorizontal, Search } from 'lucide-react';
import { products } from './mockData';
import { ProductCard } from './ProductCard';
import { Category, Product } from './types';

interface ProductGridProps {
  initialCategory?: Category | null;
  onProductClick: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ initialCategory, onProductClick, onQuickAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'New Arrivals', 'Men', 'Women', 'Kids', 'Sports'];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="pt-32 pb-20 bg-[#F0F0F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="relative">
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-20 bg-lime-accent" />
              <h1 className="font-display font-black text-6xl md:text-8xl uppercase tracking-tighter italic leading-[0.85]">
                {selectedCategory === 'All' ? 'EQUIPMENT' : selectedCategory.toUpperCase()}
              </h1>
              <p className="text-black font-black uppercase tracking-[0.2em] text-[11px] mt-4 opacity-40">
                {filteredProducts.length} PERFORMANCE SYSTEMS DETECTED
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} />
                <input 
                  type="text" 
                  placeholder="FILTER BY PROTOCOL..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-2 border-black px-12 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:bg-lime-accent transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
          {/* Sidebar Filters (Desktop) */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bento-tile p-8">
              <h3 className="font-display font-black text-sm uppercase tracking-widest border-b-2 border-black pb-3 mb-8 italic">Category Filter</h3>
              <div className="space-y-4">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left font-display font-black text-xs tracking-widest uppercase transition-all flex items-center group ${
                      selectedCategory === cat ? 'text-black' : 'text-black/30 hover:text-black'
                    }`}
                  >
                    <span className={`w-2 h-2 bg-lime-accent mr-3 transition-opacity ${selectedCategory === cat ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bento-tile p-8">
              <h3 className="font-display font-black text-sm uppercase tracking-widest border-b-2 border-black pb-3 mb-8 italic">Sort Protocol</h3>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-neutral-50 px-4 py-4 text-[10px] font-black uppercase tracking-widest focus:outline-none border-2 border-black"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Value: Low to High</option>
                <option value="price-high">Value: High to Low</option>
                <option value="rating">Peak Rating</option>
              </select>
            </div>
            
            <div className="bg-black text-white p-8 border-2 border-black relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-lime-accent rotate-45 translate-x-8 -translate-y-8" />
              <p className="text-lime-accent font-display font-black text-2xl italic mb-4 leading-none">JOIN THE<br />ELITE</p>
              <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-8 leading-relaxed">
                Connect your account for early access to precision drops.
              </p>
              <button className="w-full py-4 bg-white text-black font-display font-black uppercase text-xs tracking-widest hover:bg-lime-accent transition-colors">
                Connect Auth
              </button>
            </div>
          </aside>

          {/* Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onClick={onProductClick} 
                    onQuickAdd={onQuickAdd} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bento-tile">
                <p className="font-display font-black text-3xl uppercase tracking-tighter italic text-black/20 mb-6">No systems found</p>
                <button 
                  onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                  className="font-display font-black uppercase tracking-widest text-xs border-b-2 border-black pb-1 hover:border-lime-accent transition-all"
                >
                  Reset Diagnostics
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
