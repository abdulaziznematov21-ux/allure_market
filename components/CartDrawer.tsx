'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    formatPrice,
  } = useShop();

  const freeShippingThreshold = 250;
  const progressToFreeShipping = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const amountRemaining = Math.max(freeShippingThreshold - cartTotal, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Window */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-full sm:max-w-md bg-[#FFFFFF] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#E5E5E5] text-[#0D0D0D]"
          >
            {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#E5E5E5] bg-[#FAFAFA]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#0D0D0D]" />
                <h3 className="font-serif-luxury font-bold text-lg uppercase tracking-wider text-[#0D0D0D]">
                  Requisition Bag
                </h3>
                <span className="text-xs font-mono-tech text-[#71717A]">[{cartCount}]</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-[#0D0D0D] hover:opacity-70 transition-opacity"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shipping Progress bar */}
            <div className="mt-3 pt-3 border-t border-[#E5E5E5]">
              <div className="flex justify-between text-[10px] font-mono-tech uppercase mb-1.5 font-bold">
                <span>
                  {amountRemaining === 0
                    ? 'COMPLIMENTARY SHIPPING UNLOCKED'
                    : `ADD ${formatPrice(amountRemaining)} FOR FREE SHIPPING`}
                </span>
                <span>{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E5E5] overflow-hidden">
                <div
                  className="h-full bg-[#000000] transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 divide-y divide-[#E5E5E5]">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#A1A1AA] mx-auto" />
                <p className="text-xs font-mono-tech uppercase tracking-widest text-[#52525B]">
                  Your requisition bag is currently empty
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#000000] text-[#FFFFFF] px-8 py-3.5 text-xs font-mono-tech uppercase tracking-widest hover:bg-[#27272A]"
                >
                  Explore Archives
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                  className="pt-4 first:pt-0 flex gap-3.5"
                >
                  <img
                    src={item.product.images.front}
                    alt={item.product.name}
                    className="w-20 h-26 object-cover bg-[#FFFFFF] border border-[#E5E5E5] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-mono-tech text-[#71717A] uppercase truncate">
                          {item.product.brand || 'ALLURE'} • {item.product.refCode}
                        </span>
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.product.id,
                              item.selectedColor.name,
                              item.selectedSize
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#71717A] hover:text-[#DC2626] -mr-2 -mt-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs sm:text-sm font-serif-luxury font-bold text-[#0D0D0D] uppercase tracking-wide truncate mt-0.5">
                        {item.product.name}
                      </h4>

                      <div className="text-[10px] font-mono-tech text-[#52525B] uppercase mt-1 space-x-1.5">
                        <span>SIZE: {item.selectedSize}</span>
                        <span>•</span>
                        <span>{item.selectedColor.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls (Tap-friendly 36px) */}
                      <div className="flex items-center border border-[#E5E5E5]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor.name,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#52525B] hover:bg-[#F4F4F5] active:scale-95"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono-tech font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor.name,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#52525B] hover:bg-[#F4F4F5] active:scale-95"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-mono-tech font-bold text-[#0D0D0D]">
                        {formatPrice((item.unitPrice ?? item.product.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer (Sticky and prominent on Mobile & Desktop) */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#FAFAFA] border-t border-[#E5E5E5] space-y-3.5">
              <div className="space-y-1.5 text-xs font-mono-tech uppercase">
                <div className="flex justify-between text-[#52525B]">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[#52525B]">
                  <span>Packaging & Care:</span>
                  <span className="font-bold text-[#059669]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0D0D0D] pt-2 border-t border-[#E5E5E5]">
                  <span>Total Valuation:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-[#000000] text-[#FFFFFF] py-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold hover:bg-[#27272A] transition-colors rounded-none flex items-center justify-center gap-2 block text-center shadow-lg"
              >
                <span>Proceed to Archival Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[9px] font-mono-tech text-center uppercase text-[#71717A]">
                256-BIT ENCRYPTION • 30-DAY COMPLIMENTARY RETURNS
              </p>
            </div>
          )}
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
