'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { WishlistItem, CartItem } from '@/lib/types/commerce';
import { setCookie, getCookie, deleteCookie } from '@/lib/commerce/utils';

const COOKIE_NAME = 'Güzel_WISHLIST';

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'TOGGLE_ITEM'; payload: WishlistItem }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; payload: WishlistItem[] };

function wishlistReducer(state: WishlistItem[], action: WishlistAction): WishlistItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.some((item) => item.productId === action.payload.productId);
      if (exists) return state;
      return [...state, action.payload];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.productId !== action.payload);
    case 'TOGGLE_ITEM': {
      const exists = state.some((item) => item.productId === action.payload.productId);
      if (exists) {
        return state.filter((item) => item.productId !== action.payload.productId);
      }
      return [...state, action.payload];
    }
    case 'CLEAR':
      return [];
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

interface WishlistContextValue {
  items: WishlistItem[];
  itemCount: number;
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (
    productId: string,
    color: { name: string; hex: string },
    size: string,
    addToCart: (item: CartItem) => void
  ) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(wishlistReducer, []);

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

  const itemCount = items.length;

  const addItem = useCallback((item: WishlistItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  }, []);

  const toggleItem = useCallback((item: WishlistItem) => {
    dispatch({ type: 'TOGGLE_ITEM', payload: item });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => {
      return items.some((item) => item.productId === productId);
    },
    [items]
  );

  const moveToCart = useCallback(
    (
      productId: string,
      color: { name: string; hex: string },
      size: string,
      addToCart: (item: CartItem) => void
    ) => {
      const wishlistItem = items.find((item) => item.productId === productId);
      if (wishlistItem) {
        addToCart({
          productId: wishlistItem.productId,
          slug: wishlistItem.slug,
          name: wishlistItem.name,
          price: wishlistItem.price,
          originalPrice: wishlistItem.originalPrice,
          image: wishlistItem.image,
          color,
          size,
          quantity: 1,
        });
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
      }
    },
    [items]
  );

  const clearWishlist = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        moveToCart,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
