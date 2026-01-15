
import { Product } from './types';

export const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Blend Blouse',
    price: 89.00,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop',
    description: 'A luxurious silk blend blouse with a modern cut and elegant drape.',
    colors: ['Cream', 'Soft Pink', 'Mint'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    isNew: true
  },
  {
    id: '2',
    name: 'High-Waist Linen Trousers',
    price: 120.00,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop',
    description: 'Breathable linen trousers designed for comfort and effortless style.',
    colors: ['Beige', 'White', 'Sage'],
    sizes: ['24', '26', '28', '30'],
    rating: 4.5
  },
  {
    id: '3',
    name: 'Pastel Knit Cardigan',
    price: 75.00,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    description: 'Soft pastel cardigan perfect for layering during breezy evenings.',
    colors: ['Lilac', 'Soft Yellow', 'Sky Blue'],
    sizes: ['S', 'M', 'L'],
    rating: 4.9,
    isNew: true
  },
  {
    id: '4',
    name: 'Flowy Midi Dress',
    price: 145.00,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop',
    description: 'A romantic midi dress with a floral print and delicate straps.',
    colors: ['Floral', 'Cream'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7
  },
  {
    id: '5',
    name: 'Structured Cotton Blazer',
    price: 195.00,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aec16adbb?q=80&w=800&auto=format&fit=crop',
    description: 'A versatile cotton blazer that transitions perfectly from office to dinner.',
    colors: ['Sand', 'Off-White'],
    sizes: ['S', 'M', 'L'],
    rating: 4.6
  },
  {
    id: '6',
    name: 'Minimalist Leather Tote',
    price: 210.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    description: 'Spacious and elegant leather tote for your daily essentials.',
    colors: ['Tan', 'Black'],
    sizes: ['One Size'],
    rating: 4.9
  }
];
