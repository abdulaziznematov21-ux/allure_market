'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { X, RotateCw, ShoppingBag, Heart, ArrowUpRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function RackShowcaseModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
  } = useShop();

  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    quickViewProduct ? quickViewProduct.colors[0] : null
  );
  const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedSize(quickViewProduct.sizes[0] || 'M');
      setIsFlipped(false);
    }
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQuickViewProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 lg:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-[#000000]/75 backdrop-blur-xs"
        />

        {/* Modal Window: Mobile Bottom-Sheet (rounded-t-2xl) and Desktop Center Modal */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#FFFFFF] border-t-2 sm:border border-[#000000] text-[#0D0D0D] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col rounded-t-2xl sm:rounded-none"
        >
          {/* Mobile Drag Indicator Handle */}
          <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-[#FAFAFA] border-b border-[#E5E5E5]/60">
            <div className="w-12 h-1 bg-[#A1A1AA] rounded-full" />
          </div>
          {/* Top Bar with Suspended Rail & Close */}
          <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] px-4 sm:px-6 py-3.5 flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#71717A]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-[#000000]" />
              <span>VIRTUAL ARCHIVE SHOWCASE // {product.brand || 'ALLURE'} • {product.refCode}</span>
            </div>
            <button
              onClick={() => setQuickViewProduct(null)}
              className="w-9 h-9 flex items-center justify-center text-[#0D0D0D] hover:opacity-70 transition-opacity"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto no-scrollbar">
            {/* Left: 3D Garment Presentation with FRONT / BACK 180° Flip */}
            <div className="md:col-span-7 p-6 sm:p-10 flex flex-col items-center justify-center bg-[#F4F4F5] border-b md:border-b-0 md:border-r border-[#E5E5E5] relative">
              {/* Suspended Hanger Wire */}
              <div className="w-[1.5px] h-8 bg-[#A1A1AA]" />
              <div className="w-20 h-4 border-t-2 border-x-2 border-[#71717A] rounded-t-lg -mb-1 bg-[#E4E4E7]" />

              {/* 3D Flip Card Container */}
              <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000 mt-2">
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative transform-style-3d cursor-pointer shadow-xl"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  {/* Front View */}
                  <div className="absolute inset-0 backface-hidden border border-[#E5E5E5] bg-[#FFFFFF] overflow-hidden">
                    <img
                      src={product.images.front}
                      alt={`${product.name} Front View`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#000000] text-[#FFFFFF] px-2.5 py-1 text-[9px] font-mono-tech uppercase tracking-widest font-bold">
                      FRONT ELEVATION
                    </div>
                  </div>

                  {/* Back View (180deg rotated) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 border border-[#E5E5E5] bg-[#FFFFFF] overflow-hidden">
                    <img
                      src={product.images.back}
                      alt={`${product.name} Back View`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#000000] text-[#FFFFFF] px-2.5 py-1 text-[9px] font-mono-tech uppercase tracking-widest font-bold">
                      POSTERIOR / BACK VIEW
                    </div>
                  </div>
                </motion.div>

                {/* Hanging Archival Physical Price Tag */}
                <div className="absolute top-4 -right-3 sm:-right-8 bg-[#FFFFFF] text-[#000000] p-3 shadow-xl border border-[#000000] w-28 transform rotate-2">
                  <div className="border-b border-[#000000] pb-1 mb-1">
                    <span className="block text-[8px] font-mono-tech uppercase tracking-widest">
                      ALLURE ATELIER
                    </span>
                    <span className="block text-[9px] font-mono-tech font-bold truncate">
                      {product.refCode}
                    </span>
                  </div>
                  <div className="text-sm font-mono-tech font-bold">
                    {formatPrice(product.price)}
                  </div>
                  <div className="text-[7px] font-mono-tech text-[#71717A] uppercase mt-1">
                    {product.stockStatus}
                  </div>
                  {/* Barcode */}
                  <div className="mt-2 h-4 bg-[repeating-linear-gradient(90deg,#000,#000_1px,#fff_1px,#fff_3px)] w-full" />
                </div>
              </div>

              {/* 180° Flip Toggle Button */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="bg-[#000000] text-[#FFFFFF] px-5 py-2.5 text-xs font-mono-tech uppercase tracking-[0.2em] hover:bg-[#27272A] transition-colors flex items-center gap-2 rounded-none font-bold"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isFlipped ? 'SHOW FRONT ELEVATION' : 'ROTATE 180° TO BACK VIEW'}</span>
                </button>
              </div>
            </div>

            {/* Right: Technical Specs, Color, Size & Purchase */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FFFFFF]">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#71717A] uppercase mb-1.5">
                  <span>{product.brand || 'ALLURE ATELIER'}</span>
                  <span className="px-2 py-0.5 bg-[#F4F4F5] text-[#0D0D0D] border border-[#E5E5E5] font-bold">
                    {product.badge || product.stockStatus}
                  </span>
                </div>

                <h3 className="font-serif-luxury font-bold text-2xl sm:text-3xl tracking-tight text-[#0D0D0D] uppercase">
                  {product.name}
                </h3>

                <div className="text-xl font-mono-tech font-bold text-[#0D0D0D] mt-2 mb-4">
                  {formatPrice(product.price)}
                </div>

                <p className="text-xs font-mono-tech text-[#52525B] leading-relaxed uppercase mb-6">
                  {product.description}
                </p>

                {/* Fabric & Specs List */}
                <div className="border-t border-b border-[#E5E5E5] py-3 my-4 space-y-1.5 text-[11px] font-mono-tech text-[#71717A] uppercase">
                  <div className="flex justify-between">
                    <span>Material:</span>
                    <span className="text-[#0D0D0D] font-bold">{product.fabric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Origin:</span>
                    <span className="text-[#0D0D0D] font-bold">{product.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fit Geometry:</span>
                    <span className="text-[#0D0D0D] font-bold">{product.specs.fit}</span>
                  </div>
                </div>

                {/* Tonal Color Variant Palette */}
                <div className="mt-4">
                  <span className="block text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#71717A] mb-2">
                    Tonal Palette: <strong className="text-[#0D0D0D]">{selectedColor?.name}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 border transition-all ${
                          selectedColor?.name === color.name
                            ? 'border-[#000000] ring-2 ring-[#000000] ring-offset-1 scale-105'
                            : 'border-[#D4D4D8] opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Proportions / Size Selector */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#71717A]">
                      Proportions / Size (XS – XXL)
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#0D0D0D] uppercase underline cursor-pointer">
                      Sizing Dossier
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 sm:py-2.5 text-xs font-mono-tech uppercase border transition-colors rounded-full sm:rounded-none font-bold ${
                          selectedSize === size
                            ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                            : 'bg-[#FAFAFA] text-[#52525B] border-[#E5E5E5] hover:border-[#000000]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#E5E5E5]">
                <button
                  onClick={() => {
                    addToCart(product, selectedColor || product.colors[0], selectedSize);
                    setQuickViewProduct(null);
                  }}
                  className="w-full bg-[#000000] text-[#FFFFFF] py-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold hover:bg-[#27272A] transition-colors rounded-none flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Requisition Bag</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`flex-1 py-3 text-xs font-mono-tech uppercase tracking-widest border transition-colors flex items-center justify-center gap-2 ${
                      isWishlisted
                        ? 'bg-[#F4F4F5] border-[#000000] text-[#EF4444]'
                        : 'border-[#E5E5E5] text-[#52525B] hover:border-[#000000] hover:text-[#000000]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#EF4444] text-[#EF4444]' : ''}`} />
                    <span>{isWishlisted ? 'Saved in Archive' : 'Save to Archive'}</span>
                  </button>

                  <Link
                    href={`/product/${product.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="p-3 border border-[#E5E5E5] text-[#0D0D0D] hover:border-[#000000] transition-colors flex items-center justify-center"
                    title="View Full Product Page"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
