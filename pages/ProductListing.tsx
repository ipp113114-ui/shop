
import React, { useState, useMemo, useEffect } from 'react';
import { Filter, Search, ChevronDown, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { Link, useSearchParams } from 'react-router-dom';

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const queryParam = searchParams.get('q') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState('Featured');
  const [searchQuery, setSearchQuery] = useState(queryParam);

  // Sync state if URL changes (e.g., from Navbar search)
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, priceRange, sortBy, searchQuery]);

  const handleLocalSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    // Update URL without a full page reload to keep it in sync
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {searchQuery ? (
              <>Search Results for <span className="text-pink-400 italic">"{searchQuery}"</span></>
            ) : (
              <>Shop All <span className="text-pink-400">Collections</span></>
            )}
          </h1>
          <p className="text-gray-500 font-medium">{filteredProducts.length} items curated for you</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter results..." 
              value={searchQuery}
              onChange={handleLocalSearch}
              className="pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all w-full sm:w-64 shadow-sm"
            />
          </div>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-100 rounded-full text-sm font-bold hover:border-pink-200 hover:text-pink-400 transition-all shadow-sm">
              <span>Sort: {sortBy}</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-20 hidden group-hover:block animate-in fade-in slide-in-from-top-2">
              {['Featured', 'Price: Low to High', 'Price: High to Low', 'Rating'].map(option => (
                <button 
                  key={option}
                  onClick={() => setSortBy(option)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-400 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-8 flex items-center">
              <Filter size={16} className="mr-2 text-pink-400" /> Categories
            </h3>
            <div className="space-y-4">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    const newParams = new URLSearchParams(searchParams);
                    newParams.set('category', cat);
                    setSearchParams(newParams);
                  }}
                  className={`block w-full text-left text-sm transition-all relative ${
                    selectedCategory === cat ? 'text-pink-400 font-bold pl-4' : 'text-gray-500 hover:text-gray-900 pl-0'
                  }`}
                >
                  {selectedCategory === cat && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full"></span>}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-8 flex items-center">
              <SlidersHorizontal size={16} className="mr-2 text-pink-400" /> Price Range
            </h3>
            <div className="space-y-6">
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-pink-400"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold bg-pink-50 text-pink-400 px-3 py-1 rounded-full">$0</span>
                <span className="text-xs font-bold bg-pink-50 text-pink-400 px-3 py-1 rounded-full">${priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div className="p-8 bg-gradient-to-br from-pink-400 to-pink-300 rounded-[2rem] text-white shadow-xl shadow-pink-100 relative overflow-hidden group">
            <Sparkles className="absolute -top-4 -right-4 w-24 h-24 opacity-20 group-hover:scale-125 transition-transform duration-700" />
            <h4 className="font-bold mb-2 relative z-10">AI Fashion Stylist</h4>
            <p className="text-xs opacity-90 mb-4 leading-relaxed relative z-10">Get personalized outfit recommendations from our AI stylist.</p>
            <button className="text-[10px] font-bold uppercase tracking-widest bg-white text-pink-400 px-4 py-2 rounded-full hover:bg-pink-50 transition-colors relative z-10">Try Now</button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <Link key={product.id} to={`/products/${product.id}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-gray-100 border border-gray-100 mb-5">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm text-pink-400">New</span>
                    )}
                    <div className="absolute inset-0 bg-pink-400/0 group-hover:bg-pink-400/5 transition-colors duration-300"></div>
                  </div>
                  <div className="space-y-1 px-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">{product.category}</p>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-pink-400 transition-colors leading-tight">{product.name}</h3>
                    <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
              <p className="text-gray-400 mb-4">No products match your search "<span className="text-pink-400 font-bold">{searchQuery}</span>".</p>
              <button 
                onClick={() => { 
                  setSelectedCategory('All'); 
                  setPriceRange([0, 500]); 
                  setSearchQuery(''); 
                  setSearchParams({}); 
                }}
                className="text-pink-400 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
