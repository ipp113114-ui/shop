
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import CartDrawer from './components/CartDrawer';
import AIStylist from './components/AIStylist';
import { Product, CartItem, ToastMessage } from './types';
import { X } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lumiere-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('lumiere-cart', JSON.stringify(cart));
  }, [cart]);

  const addToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleAddToCart = (product: Product, color: string, size: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === color && item.selectedSize === size);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, selectedColor: color, selectedSize: size, quantity }];
    });
    addToast(`${product.name} added to cart!`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, color: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedColor === color && item.selectedSize === size) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string, color: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedColor === color && item.selectedSize === size)));
    addToast('Item removed from cart', 'info');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-pink-100 selection:text-pink-600">
        <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route path="/checkout" element={<div className="py-40 text-center"><h1 className="text-3xl font-bold">Coming Soon</h1><p>Our checkout is being finalized for your luxury experience.</p></div>} />
            <Route path="/auth" element={<div className="py-40 text-center"><h1 className="text-3xl font-bold">Customer Portal</h1><p>Secure login coming soon.</p></div>} />
            <Route path="/about" element={<div className="py-40 text-center px-6"><h1 className="text-3xl font-bold mb-4">Our Story</h1><p className="max-w-xl mx-auto">Founded in 2025, Lumière brings the essence of modern light to fashion. We believe in transparency, quality, and timeless elegance.</p></div>} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
              <div className="col-span-1 md:col-span-1">
                <span className="text-2xl font-bold tracking-tight text-gray-900 mb-6 block">
                  LUMIÈ<span className="text-pink-400">RE</span>
                </span>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Elevating everyday essentials with premium craftsmanship and modern aesthetics.
                </p>
                <div className="flex space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-pink-100 hover:text-pink-400 cursor-pointer transition-colors" />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Shop</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">New Arrivals</li>
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">Best Sellers</li>
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">Collections</li>
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">Sale</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">Shipping Policy</li>
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">Return & Exchange</li>
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">Track Order</li>
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">FAQs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">Our Story</li>
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">Sustainability</li>
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">Contact Us</li>
                  <li className="hover:text-pink-400 transition-colors cursor-pointer">Terms & Conditions</li>
                </ul>
              </div>
            </div>
            <div className="text-center text-gray-400 text-xs border-t border-gray-50 pt-10">
              &copy; 2025 Lumière Fashion. All rights reserved. Made with love for modern style.
            </div>
          </div>
        </footer>

        {/* Global Components */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cart}
          onUpdateQuantity={updateCartQuantity}
          onRemove={removeFromCart}
        />
        <AIStylist />

        {/* Toast Container */}
        <div className="fixed bottom-6 left-6 z-[100] space-y-3 pointer-events-none">
          {toasts.map(toast => (
            <div 
              key={toast.id} 
              className={`pointer-events-auto flex items-center justify-between min-w-[300px] px-6 py-4 rounded-2xl shadow-xl animate-in slide-in-from-left duration-300 ${
                toast.type === 'success' ? 'bg-gray-900 text-white' : 'bg-pink-100 text-pink-700'
              }`}
            >
              <span className="text-sm font-medium">{toast.message}</span>
              <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="ml-4 opacity-70 hover:opacity-100">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Router>
  );
};

export default App;
