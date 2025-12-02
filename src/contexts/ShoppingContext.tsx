import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface ShoppingState {
  cart: CartItem[];
  wishlist: Product[];
  products: Product[];
  categories: string[];
  filters: {
    category: string;
    priceRange: [number, number];
    sizes: string[];
    colors: string[];
    sortBy: string;
  };
}

type ShoppingAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; size: string; color: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_FILTERS'; payload: Partial<ShoppingState['filters']> };

const initialState: ShoppingState = {
  cart: [],
  wishlist: [],
  products: [],
  categories: ['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'],
  filters: {
    category: 'All',
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
    sortBy: 'featured',
  },
};

function shoppingReducer(state: ShoppingState, action: ShoppingAction): ShoppingState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, color, quantity } = action.payload;
      const existingItem = state.cart.find(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === product.id && item.selectedSize === size && item.selectedColor === color
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...product, quantity, selectedSize: size, selectedColor: color }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => 
          !(item.id === action.payload.split('-')[0] && 
            item.selectedSize === action.payload.split('-')[1] && 
            item.selectedColor === action.payload.split('-')[2])
        ),
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'ADD_TO_WISHLIST':
      if (state.wishlist.find(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };

    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    default:
      return state;
  }
}

const ShoppingContext = createContext<{
  state: ShoppingState;
  dispatch: React.Dispatch<ShoppingAction>;
} | null>(null);

export function ShoppingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fashion-cart');
    const savedWishlist = localStorage.getItem('fashion-wishlist');
    
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        cart.forEach((item: CartItem) => {
          dispatch({
            type: 'ADD_TO_CART',
            payload: {
              product: item,
              size: item.selectedSize,
              color: item.selectedColor,
              quantity: item.quantity,
            },
          });
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }

    if (savedWishlist) {
      try {
        const wishlist = JSON.parse(savedWishlist);
        wishlist.forEach((product: Product) => {
          dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
        });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fashion-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fashion-wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    <ShoppingContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
}