
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag, Search, User, Heart, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/products' },
    { name: 'COLLECTIONS', path: '/products?category=Dresses' },
    { name: 'OUR STORY', path: '/about' },
  ];

  // Refined logic: Match from the start of the name (case-insensitive)
  const suggestedProducts = searchQuery 
    ? MOCK_PRODUCTS.filter(p => p.name.toLowerCase().startsWith(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-pink-50 shadow-sm' : 'bg-transparent border-b border-transparent py-2'}`}>
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
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`transition-all p-2 rounded-full ${isSearchOpen ? 'bg-pink-100 text-pink-500' : 'text-gray-900 hover:text-pink-400 hover:bg-pink-50'}`}
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
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

        {/* Compact Search Slide-down */}
        <div className={`absolute top-full left-0 w-full bg-white border-b border-pink-50 overflow-hidden transition-all duration-300 ease-in-out shadow-lg ${isSearchOpen ? 'max-h-96 py-6 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
          <div className="max-w-3xl mx-auto px-6">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-4">
              <input 
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-lg font-medium border-b-2 border-gray-100 focus:border-pink-400 outline-none pb-2 bg-transparent placeholder:text-gray-300 transition-all text-pink-400"
              />
              <button 
                type="submit"
                className="ml-4 text-pink-400 hover:text-pink-500 transition-colors"
              >
                <ArrowRight size={24} />
              </button>
            </form>
            
            {searchQuery && suggestedProducts.length > 0 && (
              <div className="animate-in fade-in slide-in-from-top-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Suggested Results</p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedProducts.map(product => (
                    <Link 
                      key={product.id}
                      to={`/products/${product.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center group p-2 rounded-xl hover:bg-pink-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-pink-400 transition-colors">{product.name}</h4>
                        <p className="text-xs text-gray-400">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {searchQuery && suggestedProducts.length === 0 && (
              <p className="text-xs text-gray-400 pb-2">No results matching from the start of the name.</p>
            )}
          </div>
        </div>

        {/* Mobile Nav Menu */}
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
    </>
  );
};

export default Navbar;
