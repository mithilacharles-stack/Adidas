import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { Category } from './types';

interface HeaderProps {
  onNavigate: (page: string, category?: Category) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories: Category[] = ['New Arrivals', 'Men', 'Women', 'Kids', 'Sports'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center border-b-2 border-black ${isScrolled ? 'bg-white shadow-lg' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between w-full">
        {/* Left: Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-black hover:bg-lime-accent/20 transition-colors" 
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="flex items-center space-x-1 mr-4">
            <div className="w-1.5 h-6 bg-black"></div>
            <div className="w-1.5 h-4 bg-black"></div>
            <div className="w-1.5 h-2 bg-black"></div>
          </div>
          <span className="font-display font-black tracking-tighter text-2xl uppercase italic">
            Performance
          </span>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex space-x-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onNavigate('list', cat)}
              className={`font-sans font-bold text-xs uppercase tracking-widest transition-all hover:text-black ${
                currentPage === 'list' && cat === categories[0] ? 'border-b-2 border-black' : 'text-black/40 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-8">
          <button className="px-2 text-black font-bold text-xs uppercase tracking-widest hidden md:block hover:opacity-70">
            Search
          </button>
          <button 
            className="relative flex items-center space-x-2 text-black font-bold text-xs uppercase tracking-widest group"
            onClick={() => onNavigate('cart')}
          >
            <span>Cart</span>
            <span className="bg-lime-accent text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-black font-black group-hover:scale-110 transition-transform">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-bottom border-neutral-100">
              <span className="font-display font-black tracking-tighter text-xl">NEO-STRIDE</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X size={28} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-8 px-4">
              <div className="space-y-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onNavigate('list', cat);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between w-full font-display font-black text-3xl uppercase tracking-tighter hover:translate-x-2 transition-transform"
                  >
                    {cat}
                    <ChevronRight size={32} strokeWidth={3} />
                  </button>
                ))}
              </div>
            </div>
            <div className="p-8 bg-neutral-900 text-white">
              <p className="font-display font-bold text-sm tracking-widest uppercase mb-4 opacity-50">Join the movement</p>
              <button className="w-full py-4 bg-white text-neutral-900 font-display font-black uppercase text-center tracking-widest">
                Login / Signup
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-20 px-6 md:px-10 border-t-2 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-1 mb-8">
              <div className="w-1.5 h-8 bg-lime-accent"></div>
              <div className="w-1.5 h-6 bg-white"></div>
              <div className="w-1.5 h-4 bg-white/20"></div>
            </div>
            <h3 className="font-display font-black text-4xl uppercase tracking-tighter italic mb-6">
              REDEFINING<br />THE STRIDE.
            </h3>
            <p className="text-white/40 max-w-sm text-xs font-black uppercase tracking-widest leading-loose">
              High-performance equipment engineered for the urban ecosystem. Join the evolution of athletic architecture.
            </p>
          </div>
          
          <div>
            <h4 className="font-sans font-black text-[10px] uppercase tracking-[0.3em] text-white/50 mb-8 italic">Nodes</h4>
            <ul className="space-y-4">
              {['New arrivals', 'Men', 'Women', 'Kids', 'Sports'].map(item => (
                <li key={item}>
                  <button className="font-sans font-bold text-xs uppercase tracking-widest hover:text-lime-accent transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-black text-[10px] uppercase tracking-[0.3em] text-white/50 mb-8 italic">Protocols</h4>
            <ul className="space-y-4">
              {['Store Finder', 'Size matrix', 'Returns', 'Contact node', 'Privacy'].map(item => (
                <li key={item}>
                  <button className="font-sans font-bold text-xs uppercase tracking-widest hover:text-lime-accent transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center space-x-10 text-[10px] font-black uppercase tracking-widest text-white/20 italic">
            <span>© 2026 NEO-STRIDE</span>
            <span>All System Rights Reserved</span>
          </div>
          
          <div className="flex space-x-8">
             {['Instagram', 'Twitter', 'Laboratory'].map(item => (
               <button key={item} className="text-[10px] font-black uppercase tracking-widest border-b border-transparent hover:border-lime-accent hover:text-lime-accent transition-all pb-1 italic">
                 {item}
               </button>
             ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
