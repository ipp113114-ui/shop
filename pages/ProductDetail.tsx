
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Shield, Truck, RotateCcw, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface ProductDetailProps {
  onAddToCart: (product: Product, color: string, size: string, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const found = MOCK_PRODUCTS.find(p => p.id === id);
    setTimeout(() => {
      if (found) {
        setProduct(found);
        setSelectedColor(found.colors[0]);
        setSelectedSize(found.sizes[0]);
      }
      setLoading(false);
    }, 400);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-pink-100 border-t-pink-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button 
          onClick={() => navigate('/products')} 
          className="px-8 py-3 bg-pink-400 text-white rounded-full font-bold"
        >
          Back to shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Product Images */}
        <div className="space-y-6">
          <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 shadow-sm relative group">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            {product.isNew && (
                <span className="absolute top-6 left-6 bg-pink-400 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">New</span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[product.image, product.image, product.image, product.image].map((img, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 opacity-60 hover:opacity-100 cursor-pointer transition-all hover:border-pink-200">
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-10 lg:pl-6">
          <div>
            <div className="flex items-center space-x-2 text-pink-400 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "text-pink-400" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Verified Style • 120 Reviews</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">{product.name}</h1>
            <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-gray-500 leading-relaxed font-medium text-sm border-l-4 border-pink-100 pl-6 italic">
            "{product.description}"
          </p>

          <div className="space-y-8">
            {/* Color Selection */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-5">Select Color: <span className="text-pink-400 font-bold ml-1">{selectedColor}</span></h4>
              <div className="flex space-x-4">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 p-1 transition-all flex items-center justify-center ${
                      selectedColor === color ? 'border-pink-400 scale-110 shadow-lg shadow-pink-100' : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-full h-full rounded-full bg-gray-200 shadow-inner" style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900">Choose Size</h4>
                <button className="text-[10px] font-bold text-pink-400 uppercase tracking-widest hover:underline">View Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[4rem] px-5 py-3 rounded-2xl border-2 text-xs font-bold transition-all ${
                      selectedSize === size 
                        ? 'bg-gray-900 border-gray-900 text-white shadow-xl translate-y-[-2px]' 
                        : 'bg-white border-gray-100 text-gray-500 hover:border-pink-200 hover:text-pink-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6">
              <div className="flex items-center border-2 border-gray-100 rounded-2xl px-5 py-3 bg-white h-14 shadow-sm">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-1 hover:text-pink-400 transition-colors">
                  <span className="text-gray-400 hover:text-pink-400"><Minus size={18} /></span>
                </button>
                <span className="mx-8 font-bold w-4 text-center text-lg text-black">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-1 hover:text-pink-400 transition-colors">
                  <span className="text-gray-400 hover:text-pink-400"><Plus size={18} /></span>
                </button>
              </div>
              <button 
                onClick={() => onAddToCart(product, selectedColor, selectedSize, quantity)}
                className="flex-1 bg-pink-400 text-white h-14 rounded-2xl font-bold hover:bg-pink-500 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-pink-100 hover:translate-y-[-2px]"
              >
                <ShoppingBag size={20} />
                <span>Add to Cart</span>
              </button>
              <button className="h-14 w-14 border-2 border-gray-100 rounded-2xl hover:bg-pink-50 hover:border-pink-100 transition-all flex items-center justify-center group shadow-sm">
                <Heart size={20} className="text-gray-300 group-hover:text-pink-400 group-hover:fill-pink-400 transition-all" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="bg-pink-50 p-3 rounded-xl"><Truck size={20} className="text-pink-400" /></div>
              <div>
                <p className="text-sm font-bold text-gray-900">Free Express</p>
                <p className="text-xs text-gray-400">Orders over $150</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-pink-50 p-3 rounded-xl"><RotateCcw size={20} className="text-pink-400" /></div>
              <div>
                <p className="text-sm font-bold text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-400">30 days period</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-pink-50 p-3 rounded-xl"><Shield size={20} className="text-pink-400" /></div>
              <div>
                <p className="text-sm font-bold text-gray-900">Payment Safety</p>
                <p className="text-xs text-gray-400">Secure & Encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
