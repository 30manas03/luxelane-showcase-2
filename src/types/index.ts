// Type definitions for LuxeLane e-commerce platform

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  imageUrls: string[];
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  estimatedDelivery: string;
}

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';
export type ViewMode = 'home' | 'products' | 'product-detail' | 'cart' | 'profile';
export type Theme = 'light' | 'dark' | 'system';

export interface FilterState {
  search: string;
  categories: string[];
  priceRange: [number, number];
  sortBy: SortOption;
}

export interface AppState {
  currentView: ViewMode;
  selectedProduct: Product | null;
  cart: CartItem[];
  user: User | null;
  filters: FilterState;
  isLoading: boolean;
  theme?: Theme;
}