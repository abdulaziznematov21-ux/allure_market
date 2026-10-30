'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Check } from 'lucide-react';

export default function OrbitSelector() {
  const { setQuickViewProduct, addToCart, formatPrice } = useShop();

  // Filter footwear and accessories for orbit selector
  const orbitItems = PRODUCTS.filter(
    (p) => p.category === 'Footwear' || p.category === 'Leather & Objects'
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedShoeSize, setSelectedShoeSize] = useState('42');

  const shoeSizes = ['40', '41', '42', '43', '44', '45'];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? orbitItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === orbitItems.length - 1 ? 0 : prev + 1));
  };

  const activeProduct = orbitItems[activeIndex];

  return (
    <section className="bg-[#FFFFFF] text-[#0D0D0D] py-20 sm:py-28 border-b border-[#E5E5E5] relative overflow-hidden select-none">
      {/* Background Studio Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5E5E5_1px,transparent_1px)] [background-size:28px_28px] opacity-60" />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#E5E5E5] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#000000]" />
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-[#71717A]">
                2026 KINETIC DISCOVERY
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0D0D0D] uppercase">
              3D Orbital Silhouette Selector
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#71717A] hidden sm:inline">
              FOOTWEAR & OBJECTS // 3D ORBIT WHEEL
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-[#E5E5E5] bg-[#FFFFFF] flex items-center justify-center text-[#0D0D0D] hover:border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors rounded-none"
                aria-label="Rotate orbit left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 border border-[#E5E5E5] bg-[#FFFFFF] flex items-center justify-center text-[#0D0D0D] hover:border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors rounded-none"
                aria-label="Rotate orbit right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Orbit Display Stage with Touch Support */}
        <div className="relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center perspective-1000 touch-pan-x">
          {/* Orbital Arc Guide Line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-4xl h-72 border-b-2 border-dashed border-[#D4D4D8] rounded-[50%] pointer-events-none opacity-60" />

          {/* Orbit Items */}
          <div className="relative w-full max-w-4xl h-80 flex items-center justify-center">
            {orbitItems.map((item, index) => {
              // Calculate relative offset from active item
              let offset = index - activeIndex;
              if (offset > orbitItems.length / 2) offset -= orbitItems.length;
              if (offset < -orbitItems.length / 2) offset += orbitItems.length;

              const isCurrent = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // Arc positioning
              const xTranslation = offset * 240;
              const zTranslation = -Math.abs(offset) * 160;
              const rotateY = -offset * 25;
              const scale = 1 - Math.abs(offset) * 0.22;
              const opacity = 1 - Math.abs(offset) * 0.4;

              return (
                <motion.div
                  key={item.id}
                  animate={{
                    x: xTranslation,
                    z: zTranslation,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveIndex(index)}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -30) handleNext();
                    else if (info.offset.x > 30) handlePrev();
                  }}
                  className={`absolute cursor-pointer transition-shadow ${
                    isCurrent ? 'z-30' : 'z-10'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className={`w-60 sm:w-72 bg-[#FFFFFF] border transition-all p-4 shadow-xl ${
                      isCurrent
                        ? 'border-[#000000] shadow-[0_20px_50px_rgba(0,0,0,0.14)]'
                        : 'border-[#E5E5E5] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-[#F4F4F5] mb-3">
                      <img
                        src={item.images.front}
                        alt={item.name}
                        className="w-full h-full object-cover transition-all hover:scale-105"
                      />
                      {isCurrent && (
                        <div className="absolute top-2 left-2 bg-[#000000] text-[#FFFFFF] text-[8px] font-mono-tech px-2 py-0.5 uppercase tracking-widest font-bold">
                          ACTIVE FOCUS
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <span className="text-[9px] font-mono-tech text-[#71717A] uppercase block">
                        {item.brand || 'ALLURE'} • {item.refCode}
                      </span>
                      <h4 className="text-xs font-serif-luxury font-bold text-[#0D0D0D] truncate mt-1">
                        {item.name}
                      </h4>
                      <span className="text-xs font-mono-tech font-bold text-[#0D0D0D] block mt-1">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Product Interactive Dossier & Shoe Size Selector */}
        {activeProduct && (
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-[#FAFAFA] border border-[#E5E5E5] p-6 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
          >
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[9px] font-mono-tech text-[#71717A] uppercase tracking-widest block">
                {activeProduct.refCode} • {activeProduct.origin}
              </span>
              <h3 className="font-serif-luxury font-bold text-xl text-[#0D0D0D] tracking-wide">
                {activeProduct.name}
              </h3>
              <p className="text-xs font-mono-tech text-[#52525B] uppercase line-clamp-1">
                {activeProduct.fabric}
              </p>

              {/* Shoe Size Pills on Mobile & Desktop */}
              <div className="pt-2 flex items-center justify-center md:justify-start gap-1.5">
                <span className="text-[10px] font-mono-tech text-[#71717A] mr-1">SIZE:</span>
                {shoeSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedShoeSize(sz)}
                    className={`w-8 h-8 text-[11px] font-mono-tech border transition-colors ${
                      selectedShoeSize === sz
                        ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] font-bold'
                        : 'bg-[#FFFFFF] text-[#52525B] border-[#E5E5E5] hover:border-[#000000]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-center">
              <div className="text-right hidden sm:block">
                <span className="text-lg font-mono-tech font-bold text-[#0D0D0D] block">
                  {formatPrice(activeProduct.price)}
                </span>
                <span className="text-[9px] font-mono-tech text-[#71717A] uppercase">
                  {activeProduct.stockStatus}
                </span>
              </div>

              <button
                onClick={() => setQuickViewProduct(activeProduct)}
                className="bg-[#FFFFFF] border border-[#E5E5E5] text-[#0D0D0D] px-4 py-3.5 text-xs font-mono-tech uppercase tracking-widest hover:border-[#000000] transition-colors rounded-none flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>3D Dossier</span>
              </button>

              <button
                onClick={() => addToCart(activeProduct, undefined, selectedShoeSize)}
                className="bg-[#000000] text-[#FFFFFF] px-6 py-3.5 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold hover:bg-[#27272A] transition-colors rounded-none flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
