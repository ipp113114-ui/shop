
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

  const suggestedProducts = searchQuery 
    ? MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4)
    : [];

  return (
    <>
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
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-900 hover:text-pink-400 transition-all p-2 hover:bg-pink-50 rounded-full"
              >
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

      {/* Global Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-white animate-in fade-in duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold tracking-tighter text-gray-900">
                LUMIÈ<span className="text-pink-400">RE</span> <span className="text-xs uppercase tracking-[0.3em] font-medium ml-4 text-gray-400">Search</span>
              </span>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-3 bg-gray-50 text-gray-400 hover:text-pink-400 hover:bg-pink-50 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 max-w-4xl mx-auto w-full">
              <form onSubmit={handleSearchSubmit} className="relative mb-16">
                <input 
                  ref={searchInputRef}
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-4xl md:text-6xl font-bold border-b-2 border-gray-100 focus:border-pink-400 outline-none pb-6 bg-transparent placeholder:text-gray-100 transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-full text-gray-300 hover:text-pink-400 transition-colors"
                >
                  <ArrowRight size={48} />
                </button>
              </form>

              {searchQuery && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-8">Suggested Products</h3>
                  {suggestedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {suggestedProducts.map(product => (
                        <Link 
                          key={product.id}
                          to={`/products/${product.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center group p-4 bg-gray-50 rounded-3xl hover:bg-pink-50 transition-all border border-transparent hover:border-pink-100"
                        >
                          <div className="w-20 h-20 bg-gray-200 rounded-2xl overflow-hidden flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="ml-6">
                            <h4 className="font-bold text-gray-900 group-hover:text-pink-400 transition-colors">{product.name}</h4>
                            <p className="text-sm font-bold text-gray-400">${product.price.toFixed(2)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-lg">No results found for "<span className="text-pink-400 font-bold">{searchQuery}</span>". Try something else.</p>
                  )}
                </div>
              )}

              {!searchQuery && (
                <div className="space-y-12">
                  <div>
                    <h3 className="text-gray-300 text-xs font-bold uppercase tracking-widest mb-6">Popular Searches</h3>
                    <div className="flex flex-wrap gap-4">
                      {['Silk Blouse', 'Linen Trousers', 'Knitwear', 'Floral Dresses'].map(term => (
                        <button 
                          key={term}
                          onClick={() => { setSearchQuery(term); }}
                          className="px-6 py-3 bg-gray-50 hover:bg-pink-50 hover:text-pink-400 rounded-full text-sm font-bold text-gray-500 transition-all"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
