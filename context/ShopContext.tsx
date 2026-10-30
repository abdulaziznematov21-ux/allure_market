'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, CartItem, LookOutfit, Currency } from '@/types';
import confetti from 'canvas-confetti';

interface ShopContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    color?: ProductColor,
    size?: string,
    quantity?: number,
    openDrawer?: boolean
  ) => void;
  addLookToCart: (look: LookOutfit) => void;
  removeFromCart: (productId: string, colorName?: string, size?: string) => void;
  updateQuantity: (
    productId: string,
    colorNameOrQty: string | number,
    size?: string,
    quantity?: number
  ) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  cartCount: number;
  cartTotal: number;

  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toggleWishlistDrawer: () => void;
  wishlistCount: number;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  activeLookDrawer: LookOutfit | null;
  setActiveLookDrawer: (look: LookOutfit | null) => void;

  isAppointmentModalOpen: boolean;
  setIsAppointmentModalOpen: (open: boolean) => void;

  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdPrice: number) => string;

  notification: string | null;
  showNotification: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; suffix?: string }> = {
  USD: { rate: 1, symbol: '$' },
  EUR: { rate: 0.92, symbol: '€' },
  GBP: { rate: 0.79, symbol: '£' },
  UZS: { rate: 12600, symbol: '', suffix: ' UZS' },
};

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeLookDrawer, setActiveLookDrawer] = useState<LookOutfit | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize from localStorage safely on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('allure_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('allure_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCurrency = localStorage.getItem('allure_currency') as Currency;
      if (savedCurrency && CURRENCY_RATES[savedCurrency]) setCurrency(savedCurrency);
    } catch {
      // ignore
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('allure_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('allure_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('allure_currency', currency);
    } catch {}
  }, [currency]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((current) => (current === msg ? null : current));
    }, 3500);
  };

  const addToCart = (
    product: Product,
    color?: ProductColor,
    size?: string,
    quantity: number = 1,
    openDrawer: boolean = true
  ) => {
    const chosenColor = color || product.colors[0];
    const chosenSize = size || product.sizes[0] || 'M';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === chosenColor.name &&
          item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          product,
          selectedColor: chosenColor,
          selectedSize: chosenSize,
          quantity,
          unitPrice: product.price,
        },
      ];
    });

    showNotification(`ADDED TO BAG: ${product.name}`);
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const addLookToCart = (look: LookOutfit) => {
    const discountFactor = 0.85; // 15% bundle discount
    const itemsToAdd = look.products || (look.hotspots?.map((h) => h.product) ?? []);

    const newItems: CartItem[] = itemsToAdd.map((product) => ({
      product,
      selectedColor: product.colors[0],
      selectedSize: product.sizes[1] || product.sizes[0] || 'M',
      quantity: 1,
      unitPrice: Math.round(product.price * discountFactor),
    }));

    setCart((prev) => {
      const merged = [...prev];
      for (const item of newItems) {
        const index = merged.findIndex(
          (m) =>
            m.product.id === item.product.id &&
            m.selectedColor.name === item.selectedColor.name &&
            m.selectedSize === item.selectedSize
        );
        if (index > -1) {
          merged[index].quantity += 1;
        } else {
          merged.push(item);
        }
      }
      return merged;
    });

    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#000000', '#5A5A5A', '#E5E5E5'],
      });
    } catch {}

    showNotification(`ADDED FULL LOOK BUNDLE (${itemsToAdd.length} PIECES) — 15% SAVINGS APPLIED!`);
    setIsCartOpen(true);
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const toggleWishlistDrawer = () => setIsWishlistOpen((prev) => !prev);

  const removeFromCart = (productId: string, colorName?: string, size?: string) => {
    setCart((prev) =>
      prev.filter((item) => {
        if (item.product.id !== productId) return true;
        if (colorName && item.selectedColor.name !== colorName) return true;
        if (size && item.selectedSize !== size) return true;
        return false;
      })
    );
  };

  const updateQuantity = (
    productId: string,
    colorNameOrQty: string | number,
    size?: string,
    quantity?: number
  ) => {
    let targetColor: string | undefined;
    let targetSize: string | undefined;
    let newQty: number;

    if (typeof colorNameOrQty === 'number') {
      newQty = colorNameOrQty;
    } else {
      targetColor = colorNameOrQty;
      targetSize = size;
      newQty = quantity ?? 1;
    }

    if (newQty <= 0) {
      removeFromCart(productId, targetColor, targetSize);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          if (
            (!targetColor || item.selectedColor.name === targetColor) &&
            (!targetSize || item.selectedSize === targetSize)
          ) {
            return { ...item, quantity: newQty };
          }
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showNotification(`REMOVED FROM PRIVATE ARCHIVE: ${product.name}`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showNotification(`SAVED TO PRIVATE ARCHIVE: ${product.name}`);
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.some((p) => p.id === productId);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + (item.unitPrice ?? item.product.price) * item.quantity,
    0
  );
  const wishlistCount = wishlist.length;

  const formatPrice = (usdPrice: number): string => {
    const config = CURRENCY_RATES[currency];
    const converted = Math.round(usdPrice * config.rate);
    if (currency === 'UZS') {
      return `${converted.toLocaleString('en-US')}${config.suffix}`;
    }
    return `${config.symbol}${converted.toLocaleString('en-US')}`;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        addLookToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        cartCount,
        cartTotal,
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlistDrawer,
        wishlistCount,
        quickViewProduct,
        setQuickViewProduct,
        activeLookDrawer,
        setActiveLookDrawer,
        isAppointmentModalOpen,
        setIsAppointmentModalOpen,
        currency,
        setCurrency,
        formatPrice,
        notification,
        showNotification,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
