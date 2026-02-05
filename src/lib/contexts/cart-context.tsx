'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { CartItem } from '@/lib/types/commerce';
import { setCookie, getCookie, deleteCookie } from '@/lib/commerce/utils';

const COOKIE_NAME = 'GUZEL_CART';

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; color: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; color: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { payload } = action;
      const existingIndex = state.findIndex(
        (item) =>
          item.productId === payload.productId &&
          item.color.name === payload.color.name &&
          item.size === payload.size
      );
      if (existingIndex >= 0) {
        return state.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: item.quantity + payload.quantity }
            : item
        );
      }
      return [...state, payload];
    }
    case 'REMOVE_ITEM': {
      const { productId, color, size } = action.payload;
      return state.filter(
        (item) =>
          !(item.productId === productId && item.color.name === color && item.size === size)
      );
    }
    case 'UPDATE_QUANTITY': {
      const { productId, color, size, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter(
          (item) =>
            !(item.productId === productId && item.color.name === color && item.size === size)
        );
      }
      return state.map((item) =>
        item.productId === productId && item.color.name === color && item.size === size
          ? { ...item, quantity: Math.min(quantity, 10) }
          : item
      );
    }
    case 'CLEAR_CART':
      return [];
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, color?: string, size?: string) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  // Hydrate from cookie on mount
  useEffect(() => {
    const saved = getCookie(COOKIE_NAME);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', payload: parsed });
        }
      } catch {
        // Invalid cookie data, ignore
      }
    }
  }, []);

  // Persist to cookie on every change
  useEffect(() => {
    if (items.length > 0) {
      setCookie(COOKIE_NAME, JSON.stringify(items), 30);
    } else {
      deleteCookie(COOKIE_NAME);
    }
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((productId: string, color: string, size: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, color, size } });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, color: string, size: string, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, color, size, quantity } });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const isInCart = useCallback(
    (productId: string, color?: string, size?: string) => {
      return items.some(
        (item) =>
          item.productId === productId &&
          (!color || item.color.name === color) &&
          (!size || item.size === size)
      );
    },
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
