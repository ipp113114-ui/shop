
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const featured = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
            alt="Fashion Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl animate-in slide-in-from-left duration-1000">
            <span className="inline-block px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-bold tracking-widest text-pink-400 mb-6 uppercase">
              New Collection 2025
            </span>
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight mb-8">
              Elegance in <br />
              <span className="text-pink-400 italic font-serif">Every Stitch</span>
            </h1>
            <p className="text-lg text-white/90 mb-10 leading-relaxed font-light">
              Discover our curated selection of timeless pieces designed for the modern individual. Quality materials, ethical production, and effortless style.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/products" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all flex items-center justify-center">
                Shop Collection <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/about" className="px-8 py-4 bg-transparent border border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all flex items-center justify-center">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Global Shipping', value: '100+' },
              { label: 'Happy Customers', value: '50k+' },
              { label: 'New Designs', value: '120+' },
              { label: 'Sustainable Materials', value: '100%' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-pink-400 transition-colors">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Curated Favorites</h2>
              <div className="w-20 h-1 bg-pink-400 rounded-full" />
            </div>
            <Link to="/products" className="text-gray-900 font-semibold hover:text-pink-400 transition-colors flex items-center">
              View All Products <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100 border border-gray-100 mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">New</span>
                  )}
                  <button className="absolute bottom-6 right-6 p-3 bg-white/90 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                    <ArrowRight size={20} className="text-pink-400" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs text-gray-500 font-medium">{product.rating} / 5.0</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden bg-pink-100 h-96 flex items-center">
            <div className="absolute inset-0 opacity-20 grayscale">
              <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" alt="Pattern" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 px-12 md:px-24 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Join our newsletter for 15% off your first order</h2>
              <div className="flex max-w-md bg-white p-1 rounded-full shadow-lg">
                <input type="email" placeholder="Your email address" className="flex-1 px-6 py-3 bg-transparent text-sm focus:outline-none" />
                <button className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-black transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
