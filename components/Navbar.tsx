
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, User, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/products' },
    { name: 'COLLECTIONS', path: '/products?category=Dresses' },
    { name: 'OUR STORY', path: '/about' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-pink-50 py-2' : 'bg-transparent border-b border-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 hover:text-pink-400 transition-colors p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center group">
            <span className="text-2xl font-bold tracking-tighter text-gray-900 group-hover:scale-105 transition-transform duration-300">
              LUMIÈ<span className="text-pink-400">RE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-xs font-bold tracking-widest transition-all duration-300 hover:text-pink-400 ${
                  location.pathname === link.path ? 'text-pink-400' : 'text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <button className="hidden sm:flex text-gray-900 hover:text-pink-400 transition-all p-2 hover:bg-pink-50 rounded-full">
              <Search size={20} />
            </button>
            <Link to="/auth" className="text-gray-900 hover:text-pink-400 transition-all p-2 hover:bg-pink-50 rounded-full">
              <User size={20} />
            </Link>
            <button className="hidden sm:flex text-gray-900 hover:text-pink-400 transition-all p-2 hover:bg-pink-50 rounded-full">
              <Heart size={20} />
            </button>
            <button onClick={onOpenCart} className="text-gray-900 hover:text-pink-400 transition-all p-2 hover:bg-pink-50 rounded-full relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-5 w-5 bg-pink-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-short border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="px-6 py-10 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={() => setIsOpen(false)} 
                className="block text-xl font-bold text-gray-900 hover:text-pink-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
