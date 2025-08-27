import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, ViewMode, Product, CartItem, FilterState, Theme } from '../types';
import { mockUser } from '../data/mock-data';

// Initial state
const initialState: AppState = {
  currentView: 'home',
  selectedProduct: null,
  cart: [],
  user: mockUser,
  filters: {
    search: '',
    categories: [],
    priceRange: [0, 1500],
    sortBy: 'featured'
  },
  isLoading: false,
  theme: 'light'
};

// Action types
type AppAction =
  | { type: 'SET_VIEW'; payload: ViewMode }
  | { type: 'SET_SELECTED_PRODUCT'; payload: Product | null }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; selectedSize?: string; selectedColor?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_CART_FROM_STORAGE'; payload: CartItem[] }
  | { type: 'SET_THEME'; payload: Theme };

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    
    case 'ADD_TO_CART': {
      const { product, quantity, selectedSize, selectedColor } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        item => 
          item.product.id === product.id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      );

      let newCart: CartItem[];
      if (existingItemIndex >= 0) {
        newCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...state.cart, { product, quantity, selectedSize, selectedColor }];
      }

      // Save to localStorage
      localStorage.setItem('luxelane-cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    
    case 'REMOVE_FROM_CART': {
      const newCart = state.cart.filter(item => item.product.id !== action.payload);
      localStorage.setItem('luxelane-cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    
    case 'UPDATE_CART_QUANTITY': {
      const { productId, quantity } = action.payload;
      const newCart = quantity <= 0
        ? state.cart.filter(item => item.product.id !== productId)
        : state.cart.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          );
      
      localStorage.setItem('luxelane-cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    
    case 'CLEAR_CART':
      localStorage.removeItem('luxelane-cart');
      return { ...state, cart: [] };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'LOAD_CART_FROM_STORAGE':
      return { ...state, cart: action.payload };
    
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  navigateTo: (view: ViewMode) => void;
  selectProduct: (product: Product) => void;
  addToCart: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
} | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('luxelane-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART_FROM_STORAGE', payload: cartItems });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
    // Load theme preference
    const savedTheme = localStorage.getItem('luxelane-theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // System preference fallback
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme: Theme = prefersDark ? 'dark' : 'light';
      dispatch({ type: 'SET_THEME', payload: systemTheme });
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    }
  }, []);

  // Persist theme and apply class
  useEffect(() => {
    if (!state.theme) return;
    localStorage.setItem('luxelane-theme', state.theme);
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  // Helper functions
  const navigateTo = (view: ViewMode) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  };

  const selectProduct = (product: Product) => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    navigateTo('product-detail');
  };

  const addToCart = (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { product, quantity, selectedSize, selectedColor } 
    });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const updateFilters = (filters: Partial<FilterState>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  };

  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const toggleTheme = () => {
    const nextTheme: Theme = state.theme === 'dark' ? 'light' : 'dark';
    dispatch({ type: 'SET_THEME', payload: nextTheme });
  };

  const value = {
    state,
    dispatch,
    navigateTo,
    selectProduct,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    updateFilters,
    getCartTotal,
    getCartItemCount
    , setTheme
    , toggleTheme
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};