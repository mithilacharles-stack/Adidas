/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './CartContext';
import { Header, Footer } from './Layout';
import { HomePage } from './HomePage';
import { ProductGrid } from './ProductGrid';
import { ProductDetail } from './ProductDetail';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { Category, Product } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedProduct]);

  const handleNavigate = (page: string, category?: Category) => {
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('detail');
  };

  const handleQuickAdd = (product: Product) => {
    addToCart(product, product.sizes[0], product.colors[0]);
    // Optionally trigger a toast or small notification here
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigate={handleNavigate} 
            onProductClick={handleProductClick}
            onQuickAdd={handleQuickAdd}
          />
        );
      case 'list':
        return (
          <ProductGrid 
            initialCategory={selectedCategory} 
            onProductClick={handleProductClick}
            onQuickAdd={handleQuickAdd}
          />
        );
      case 'detail':
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onNavigate={handleNavigate}
            onProductClick={handleProductClick}
          />
        ) : <HomePage onNavigate={handleNavigate} onProductClick={handleProductClick} onQuickAdd={handleQuickAdd} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} onProductClick={handleProductClick} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} onProductClick={handleProductClick} onQuickAdd={handleQuickAdd} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F0F0F0]">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedProduct?.id || '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Global conversion boosters */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center space-x-3 bg-black px-5 py-3 shadow-[8px_8px_0px_#000000] border-2 border-black">
        <div className="w-2 h-2 bg-lime-accent animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white italic">Live: 1,248 Athletes active in hub</span>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}

