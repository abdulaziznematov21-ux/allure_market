'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { ChevronLeft, ChevronRight, Eye, RotateCw } from 'lucide-react';

export default function VirtualClothingRack() {
  const { setQuickViewProduct, formatPrice } = useShop();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Clothing rail items (8 garments)
  const baseProducts = PRODUCTS.slice(0, 8);
  const totalBase = baseProducts.length;

  // Infinite index tracking
  const [centerIndex, setCenterIndex] = useState(0);

  const handleNext = () => {
    setCenterIndex((prev) => (prev + 1) % totalBase);
  };

  const handlePrev = () => {
    setCenterIndex((prev) => (prev - 1 + totalBase) % totalBase);
  };

  // Generate 7 visible slots (-3, -2, -1, 0, 1, 2, 3) for endless wrapping
  const visibleSlots = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <section
      id="virtual-rack"
      className="bg-[#FAFAFA] text-[#0D0D0D] py-20 sm:py-28 border-b border-[#E5E5E5] relative overflow-hidden select-none"
    >
      {/* Background Architectural Studio Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5E5E5_1px,transparent_1px)] [background-size:32px_32px] opacity-60" />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#E5E5E5] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#000000]" />
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-[#71717A]">
                2026 SIGNATURE INTERACTION
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0D0D0D] uppercase">
              Virtual Clothing Rack
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#71717A] hidden sm:inline">
              DRAG OR CLICK TO SWAY GARMENTS // INFINITE CONTINUOUS RAIL
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-[#E5E5E5] bg-[#FFFFFF] flex items-center justify-center text-[#0D0D0D] hover:border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors rounded-none"
                aria-label="Slide rack left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 border border-[#E5E5E5] bg-[#FFFFFF] flex items-center justify-center text-[#0D0D0D] hover:border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors rounded-none"
                aria-label="Slide rack right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Industrial Polished Steel Suspended Rail */}
        <div className="relative pt-10 pb-16">
          {/* Ceiling suspension steel cables */}
          <div className="absolute top-0 left-16 w-[1.5px] h-10 bg-[#A1A1AA]" />
          <div className="absolute top-0 right-16 w-[1.5px] h-10 bg-[#A1A1AA]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-10 bg-[#A1A1AA]" />

          {/* Polished Metallic Steel Rail Bar */}
          <div className="relative w-full h-3 bg-gradient-to-r from-[#D4D4D8] via-[#71717A] to-[#D4D4D8] shadow-md border-y border-[#52525B]">
            {/* End Caps */}
            <div className="absolute -left-2 -top-1 w-4 h-5 bg-[#27272A] border border-[#000000]" />
            <div className="absolute -right-2 -top-1 w-4 h-5 bg-[#27272A] border border-[#000000]" />
            {/* Hanging Shadow */}
            <div className="absolute -bottom-6 left-0 right-0 h-4 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
          </div>

          {/* Infinite Garment Stage (Continuous Wrapping Carousel) */}
          <div className="relative h-[480px] sm:h-[520px] flex items-center justify-center overflow-hidden touch-pan-x">
            {visibleSlots.map((offset) => {
              const productIndex = (centerIndex + offset + totalBase * 2) % totalBase;
              const product = baseProducts[productIndex];
              const isCenter = offset === 0;
              const isHovered = hoveredId === `${product.id}-${offset}`;

              // Horizontal translation
              const xPos = offset * 240; // distance between hangers
              const scale = isCenter ? 1.05 : 0.95 - Math.abs(offset) * 0.05;
              const opacity = 1 - Math.abs(offset) * 0.18;
              const zIndex = 20 - Math.abs(offset);

              return (
                <motion.div
                  key={`${product.id}-${offset}`}
                  animate={{
                    x: xPos,
                    scale: isHovered ? scale * 1.04 : scale,
                    opacity: Math.max(0.2, opacity),
                  }}
                  transition={{ type: 'spring', stiffness: 240, damping: 25 }}
                  onClick={() => {
                    if (!isCenter) {
                      setCenterIndex(productIndex);
                    } else {
                      setQuickViewProduct(product);
                    }
                  }}
                  onHoverStart={() => setHoveredId(`${product.id}-${offset}`)}
                  onHoverEnd={() => setHoveredId(null)}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -30) handleNext();
                    else if (info.offset.x > 30) handlePrev();
                  }}
                  className="absolute flex flex-col items-center cursor-pointer"
                  style={{ zIndex }}
                >
                  {/* Metal Hanger Hook */}
                  <div className="flex flex-col items-center">
                    <svg
                      className={`w-14 h-9 transition-transform duration-300 ${
                        isHovered ? 'rotate-2' : ''
                      }`}
                      viewBox="0 0 64 40"
                      fill="none"
                    >
                      {/* Metal Loop */}
                      <path
                        d="M32 18 C32 9, 38 6, 38 12 C38 15, 34 16, 32 18"
                        stroke="#52525B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Hanger Body */}
                      <path
                        d="M6 38 L32 18 L58 38 Z"
                        stroke="#71717A"
                        strokeWidth="2"
                        fill="#E4E4E7"
                      />
                    </svg>
                  </div>

                  {/* Garment Card with Physics Sway & Profile-to-Front 3D Rotation */}
                  <motion.div
                    animate={{
                      rotateY: isHovered ? 0 : -22,
                      rotateZ: isHovered ? [0, -1.5, 1.5, 0] : 0,
                    }}
                    transition={{
                      rotateY: { duration: 0.4, ease: 'easeOut' },
                      rotateZ: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className={`relative w-56 sm:w-64 bg-[#FFFFFF] border transition-all shadow-xl overflow-hidden ${
                      isCenter || isHovered
                        ? 'border-[#000000] shadow-[0_15px_40px_rgba(0,0,0,0.15)]'
                        : 'border-[#E5E5E5]'
                    }`}
                  >
                    {/* Clothing Image (Clean Bright Studio) */}
                    <div className="relative aspect-[3/4] w-full bg-[#F4F4F5] overflow-hidden">
                      <img
                        src={product.images.front}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />

                      {/* Hanging Archival Tag attached to collar */}
                      <div className="absolute top-3 right-3 bg-[#FFFFFF] text-[#0D0D0D] p-2 shadow-md border border-[#E5E5E5] transform rotate-2">
                        <span className="block text-[8px] font-mono-tech uppercase font-bold text-[#71717A]">
                          {product.refCode}
                        </span>
                        <span className="block text-[10px] font-mono-tech font-bold text-[#0D0D0D]">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="bg-[#FFFFFF] text-[#0D0D0D] px-4 py-2 text-[10px] font-mono-tech uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-lg">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect 3D</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata strip */}
                    <div className="p-3.5 bg-[#FFFFFF] border-t border-[#E5E5E5]">
                      <span className="text-[9px] font-mono-tech text-[#71717A] uppercase block">
                        {product.brand || 'ALLURE'} • {product.category}
                      </span>
                      <h4 className="text-xs font-serif-luxury font-bold text-[#0D0D0D] uppercase truncate mt-0.5">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F4F4F5] text-[10px] font-mono-tech">
                        <span className="font-bold text-[#0D0D0D]">{formatPrice(product.price)}</span>
                        <span className="text-[#71717A] uppercase">{product.stockStatus}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Interaction instruction */}
        <div className="text-center pt-2">
          <p className="text-[11px] font-mono-tech uppercase tracking-[0.25em] text-[#71717A]">
            [ SWIPE OR CLICK GARMENTS TO ROTATE PROFILE • TAP CENTER GARMENT TO INSPECT 180° FRONT/BACK ]
          </p>
        </div>
      </div>
    </section>
  );
}
