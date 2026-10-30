'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    formatPrice,
    setQuickViewProduct,
  } = useShop();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsWishlistOpen(false)}
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
          <div className="p-4 sm:p-6 border-b border-[#E5E5E5] bg-[#FAFAFA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#EF4444] fill-current" />
              <h3 className="font-serif-luxury font-bold text-lg uppercase tracking-wider text-[#0D0D0D]">
                Curated Private Archive
              </h3>
              <span className="text-xs font-mono-tech text-[#71717A]">[{wishlist.length}]</span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-[#0D0D0D] hover:opacity-70 transition-opacity"
              aria-label="Close archive drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 divide-y divide-[#E5E5E5]">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <Heart className="w-12 h-12 text-[#A1A1AA] mx-auto" />
                <p className="text-xs font-mono-tech uppercase tracking-widest text-[#52525B]">
                  No archival garments saved to your private archive yet
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-[#000000] text-[#FFFFFF] px-8 py-3.5 text-xs font-mono-tech uppercase tracking-widest hover:bg-[#27272A]"
                >
                  Discover Archival Releases
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-3.5">
                  <img
                    src={product.images.front}
                    alt={product.name}
                    className="w-20 h-26 object-cover bg-[#FFFFFF] border border-[#E5E5E5] cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setQuickViewProduct(product);
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-mono-tech text-[#71717A] uppercase truncate">
                          {product.brand || 'ALLURE'} • {product.refCode}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className="w-8 h-8 flex items-center justify-center text-[#71717A] hover:text-[#DC2626] -mr-2 -mt-1"
                          title="Remove from archive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setQuickViewProduct(product);
                        }}
                        className="text-xs sm:text-sm font-serif-luxury font-bold text-[#0D0D0D] uppercase tracking-wide cursor-pointer hover:underline truncate mt-0.5"
                      >
                        {product.name}
                      </h4>

                      <span className="text-xs sm:text-sm font-mono-tech font-bold text-[#0D0D0D] block mt-1">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                          toggleWishlist(product);
                        }}
                        className="flex-1 bg-[#000000] text-[#FFFFFF] py-2.5 text-[10px] font-mono-tech uppercase tracking-widest hover:bg-[#27272A] flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsWishlistOpen(false);
                          setQuickViewProduct(product);
                        }}
                        className="w-9 h-9 border border-[#E5E5E5] hover:border-[#000000] text-[#0D0D0D] flex items-center justify-center shrink-0"
                        title="3D Inspect"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#FAFAFA] border-t border-[#E5E5E5]">
              <Link
                href="/catalog"
                onClick={() => setIsWishlistOpen(false)}
                className="w-full bg-[#FFFFFF] border border-[#000000] text-[#000000] py-3.5 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors rounded-none flex items-center justify-center gap-2 block text-center"
              >
                <span>Continue Archival Exploration</span>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
