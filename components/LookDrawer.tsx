'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { X, ShoppingBag, Plus, ArrowRight } from 'lucide-react';
import { Product } from '@/types';

export default function LookDrawer() {
  const {
    activeLookDrawer,
    setActiveLookDrawer,
    addLookToCart,
    addToCart,
    formatPrice,
    setQuickViewProduct,
  } = useShop();

  if (!activeLookDrawer) return null;

  const look = activeLookDrawer;
  const items: Product[] =
    look.products || (look.hotspots?.map((h) => h.product) ?? []);

  const originalTotal = items.reduce((acc, p) => acc + p.price, 0);
  const discountPercent = look.bundleDiscountPercent ?? 15;
  const bundlePrice = Math.round(originalTotal * (1 - discountPercent / 100));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveLookDrawer(null)}
          className="fixed inset-0 bg-[#000000]/70 backdrop-blur-xs"
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-full sm:max-w-lg bg-[#FFFFFF] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#E5E5E5] text-[#0D0D0D]"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-6 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FAFAFA]">
            <div>
              <span className="text-[9px] font-mono-tech uppercase tracking-[0.25em] text-[#71717A] block">
                {look.season} // ENSEMBLE BREAKDOWN
              </span>
              <h3 className="font-serif-luxury font-bold text-lg sm:text-xl text-[#0D0D0D] tracking-wide mt-0.5">
                {look.title}
              </h3>
            </div>
            <button
              onClick={() => setActiveLookDrawer(null)}
              className="w-10 h-10 flex items-center justify-center text-[#0D0D0D] hover:opacity-70 transition-opacity"
              aria-label="Close look drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Garment List */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 divide-y divide-[#E5E5E5]">
            <p className="text-xs font-mono-tech uppercase text-[#52525B] leading-relaxed pb-3">
              {look.description}
            </p>

            {items.map((product, idx) => (
              <div key={product.id} className="pt-4 first:pt-0 flex gap-3.5">
                <img
                  src={product.images.front}
                  alt={product.name}
                  className="w-20 h-26 object-cover bg-[#FFFFFF] border border-[#E5E5E5] cursor-pointer hover:opacity-90 shrink-0"
                  onClick={() => {
                    setActiveLookDrawer(null);
                    setQuickViewProduct(product);
                  }}
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center justify-between text-[9px] font-mono-tech text-[#71717A] uppercase mb-1">
                      <span>PIECE #{idx + 1} // {product.refCode}</span>
                      <span>{product.category}</span>
                    </div>
                    <h4
                      onClick={() => {
                        setActiveLookDrawer(null);
                        setQuickViewProduct(product);
                      }}
                      className="text-xs sm:text-sm font-serif-luxury font-bold text-[#0D0D0D] cursor-pointer hover:underline truncate"
                    >
                      {product.name}
                    </h4>
                    <p className="text-[10px] font-mono-tech text-[#71717A] line-clamp-1 mt-0.5">
                      {product.fabric}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono-tech font-bold text-[#0D0D0D]">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="px-3 py-1.5 bg-[#000000] text-[#FFFFFF] text-[10px] font-mono-tech uppercase tracking-widest hover:bg-[#27272A] flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Item</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Bundle Button */}
          <div className="p-4 sm:p-6 bg-[#FAFAFA] border-t border-[#E5E5E5] space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#71717A] block">
                  COMPLETE BUNDLE ({items.length} PIECES)
                </span>
                <span className="text-[11px] font-mono-tech text-[#059669] font-bold">
                  SAVE {discountPercent}% • FREE COMPLIMENTARY SHIPPING
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono-tech text-[#A1A1AA] line-through block">
                  {formatPrice(originalTotal)}
                </span>
                <span className="text-lg sm:text-xl font-mono-tech font-bold text-[#0D0D0D]">
                  {formatPrice(bundlePrice)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                addLookToCart(look);
                setActiveLookDrawer(null);
              }}
              className="w-full bg-[#000000] text-[#FFFFFF] py-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold hover:bg-[#27272A] transition-colors rounded-none flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Full Look to Bag ({formatPrice(bundlePrice)})</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
