
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, CheckCircle, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onOrderComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onOrderComplete }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onOrderComplete();
    }, 2000);
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button 
          onClick={() => navigate('/products')}
          className="text-pink-400 font-bold hover:underline"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-100 text-pink-500 rounded-full mb-8">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-10">
          Your order has been placed successfully. We'll send you a confirmation email with your order details shortly.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-pink-400 text-white rounded-full font-bold hover:bg-pink-500 transition-all shadow-lg shadow-pink-100"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-bold text-gray-500 hover:text-pink-400 mb-8 transition-colors"
      >
        <ChevronLeft size={16} className="mr-1" /> BACK TO CART
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Form Section */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-pink-400 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-pink-400 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  required
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
                />
                <input
                  required
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
                />
              </div>
              <input
                required
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl mb-4 focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
                />
                <input
                  required
                  type="text"
                  name="zip"
                  placeholder="ZIP / Postal Code"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-pink-400 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                Payment Method
              </h2>
              <div className="p-6 border-2 border-pink-400 bg-pink-50/30 rounded-3xl mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <CreditCard className="text-pink-400 mr-2" />
                    <span className="font-bold text-gray-900">Credit Card</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <input
                    required
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      name="expiry"
                      placeholder="MM / YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className="px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
                    />
                    <input
                      required
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              disabled={isProcessing}
              type="submit"
              className="w-full py-5 bg-pink-400 text-white rounded-full font-bold text-lg hover:bg-pink-500 transition-all shadow-xl shadow-pink-100 disabled:opacity-50 flex items-center justify-center"
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Place Order • ${total.toFixed(2)}</>
              )}
            </button>
          </form>
        </div>

        {/* Summary Section */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 sticky top-28 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="max-h-64 overflow-y-auto mb-6 pr-2 scrollbar-hide space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500">
                      {item.selectedColor} / {item.selectedSize} • Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-50 pt-6 mb-6">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span className="flex items-center">Shipping <Truck size={14} className="ml-2 text-pink-400" /></span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-50">
                <span>Total</span>
                <span className="text-pink-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-pink-50 rounded-2xl p-4 text-xs text-pink-600 font-medium">
              Free shipping on orders over $150! You're {subtotal >= 150 ? 'all set' : `$${(150 - subtotal).toFixed(2)} away`}.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
