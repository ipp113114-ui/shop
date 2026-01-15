
import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, color: string, size: string, delta: number) => void;
  onRemove: (id: string, color: string, size: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-2xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-500">
                  <X size={24} />
                </button>
              </div>

              <div className="mt-8">
                {items.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-4 text-gray-500">Your cart is empty.</p>
                    <button onClick={onClose} className="mt-6 text-pink-400 font-medium hover:text-pink-500">
                      Continue Shopping &rarr;
                    </button>
                  </div>
                ) : (
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-100">
                      {items.map((item, idx) => (
                        <li key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 border border-gray-100 rounded-md overflow-hidden bg-gray-50">
                            <img src={item.image} alt={item.name} className="w-full h-full object-center object-cover" />
                          </div>
                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">${item.price.toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.selectedColor} | Size {item.selectedSize}
                              </p>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                                <button 
                                  onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}
                                  className="p-1 hover:text-pink-400 disabled:opacity-30"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="mx-3 font-bold text-black">{item.quantity}</span>
                                <button 
                                  onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}
                                  className="p-1 hover:text-pink-400"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <button 
                                onClick={() => onRemove(item.id, item.selectedColor, item.selectedSize)}
                                className="font-medium text-pink-400 hover:text-pink-500 flex items-center"
                              >
                                <Trash2 size={16} className="mr-1" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-semibold text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="flex justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-pink-400 hover:bg-pink-500 transition-colors"
                  >
                    Checkout <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Mock to avoid import issues
import { ShoppingBag } from 'lucide-react';

export default CartDrawer;
