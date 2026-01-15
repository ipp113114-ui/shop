
import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Search, User, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-pink-400 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              LUMIÈ<span className="text-pink-400">RE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-pink-400 transition-colors">HOME</Link>
            <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-pink-400 transition-colors">SHOP</Link>
            <Link to="/products?category=Dresses" className="text-sm font-medium text-gray-700 hover:text-pink-400 transition-colors">COLLECTIONS</Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-pink-400 transition-colors">OUR STORY</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:block text-gray-600 hover:text-pink-400 transition-colors p-2">
              <Search size={20} />
            </button>
            <Link to="/auth" className="text-gray-600 hover:text-pink-400 transition-colors p-2">
              <User size={20} />
            </Link>
            <button className="hidden sm:block text-gray-600 hover:text-pink-400 transition-colors p-2 relative">
              <Heart size={20} />
            </button>
            <button onClick={onOpenCart} className="text-gray-600 hover:text-pink-400 transition-colors p-2 relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-pink-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-gray-900 hover:bg-pink-50 rounded-lg">Home</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-gray-900 hover:bg-pink-50 rounded-lg">Shop</Link>
            <Link to="/products?category=Dresses" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-gray-900 hover:bg-pink-50 rounded-lg">Collections</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-gray-900 hover:bg-pink-50 rounded-lg">Our Story</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
