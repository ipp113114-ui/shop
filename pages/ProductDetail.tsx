
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
    // Simulate loading
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
        <div className="w-12 h-12 border-4 border-pink-100 border-t-pink-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button onClick={() => navigate('/products')} className="mt-4 text-pink-400">Back to shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Product Images */}
        <div className="space-y-6">
          <div className="aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-100 border border-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
                <img src={product.image} alt="thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center space-x-2 text-yellow-400 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-semibold">{product.rating} (120 reviews)</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-gray-600 leading-relaxed font-light">
            {product.description}
          </p>

          <div className="space-y-6">
            {/* Color Selection */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Color: <span className="text-gray-500 font-medium ml-1">{selectedColor}</span></h4>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${
                      selectedColor === color ? 'border-pink-400 scale-110' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className="w-full h-full rounded-full bg-gray-200" style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900">Size</h4>
                <button className="text-xs font-bold text-pink-400 hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full border text-sm font-medium transition-all ${
                      selectedSize === size ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-pink-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white h-14">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-1 hover:text-pink-400 transition-colors">
                  <Minus size={20} />
                </button>
                <span className="mx-6 font-bold w-4 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-1 hover:text-pink-400 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
              <button 
                onClick={() => onAddToCart(product, selectedColor, selectedSize, quantity)}
                className="flex-1 bg-pink-400 text-white h-14 rounded-full font-bold hover:bg-pink-500 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-pink-200 shadow-transparent"
              >
                <ShoppingBag size={20} />
                <span>Add to Cart</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-full hover:bg-gray-50 transition-all">
                <Heart size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <Truck size={20} className="text-pink-400" />
              <div className="text-xs">
                <p className="font-bold">Free Shipping</p>
                <p className="text-gray-500">On orders over $150</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw size={20} className="text-pink-400" />
              <div className="text-xs">
                <p className="font-bold">30-Day Returns</p>
                <p className="text-gray-500">Hassle-free exchanges</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield size={20} className="text-pink-400" />
              <div className="text-xs">
                <p className="font-bold">Secure Payment</p>
                <p className="text-gray-500">100% encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
