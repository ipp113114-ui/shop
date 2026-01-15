
import React, { useState, useMemo } from 'react';
import { Filter, Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { Link, useSearchParams } from 'react-router-dom';

const ProductListing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState('Featured');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop All</h1>
          <p className="text-gray-500 font-medium">{filteredProducts.length} items found</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all w-full sm:w-64"
            />
          </div>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-pink-200 transition-all">
              <span>Sort: {sortBy}</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-20 hidden group-hover:block">
              {['Featured', 'Price: Low to High', 'Price: High to Low', 'Rating'].map(option => (
                <button 
                  key={option}
                  onClick={() => setSortBy(option)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-400"
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
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center">
              <Filter size={16} className="mr-2" /> Categories
            </h3>
            <div className="space-y-3">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left text-sm transition-all ${
                    selectedCategory === cat ? 'text-pink-400 font-bold' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center">
              <SlidersHorizontal size={16} className="mr-2" /> Price Range
            </h3>
            <div className="space-y-4">
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-400"
              />
              <div className="flex justify-between text-xs font-bold text-gray-900">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <Link key={product.id} to={`/products/${product.id}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100 border border-gray-100 mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">New</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{product.category}</p>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-pink-400 transition-colors">{product.name}</h3>
                    <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-gray-50 rounded-3xl">
              <p className="text-gray-500">No products match your filters.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setPriceRange([0, 500]); setSearchQuery(''); }}
                className="mt-4 text-pink-400 font-bold hover:underline"
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
