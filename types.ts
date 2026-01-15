
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
  rating: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}
