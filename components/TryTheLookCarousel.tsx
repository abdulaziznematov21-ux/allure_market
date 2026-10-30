'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CURATED_LOOKS } from '@/data/products';
import { LookOutfit, Product, Hotspot } from '@/types';
import { useShop } from '@/context/ShopContext';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Play,
  Pause,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Eye,
} from 'lucide-react';

export default function TryTheLookCarousel() {
  const { addToCart, addLookToCart, setQuickViewProduct, formatPrice } = useShop();

  const totalLooks = CURATED_LOOKS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [isMouseOverStage, setIsMouseOverStage] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  // Auto-advance loop when playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalLooks);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, totalLooks]);

  // Infinite navigation helpers
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalLooks);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalLooks) % totalLooks);
  };

  const currentLook = CURATED_LOOKS[activeIndex];
  const lookProducts = currentLook.products || [];

  // Calculate pricing
  const originalTotalPrice = lookProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscountPercent = currentLook.bundleDiscountPercent ?? 15;
  const discountedBundlePrice = Math.round(
    originalTotalPrice * (1 - bundleDiscountPercent / 100)
  );

  // Custom "VIEW" cursor tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section
      id="try-the-look"
      className="bg-[#FFFFFF] text-[#0D0D0D] py-16 sm:py-24 border-b border-[#E5E5E5] relative overflow-x-hidden"
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-5 border-b border-[#E5E5E5] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-[#000000] rounded-none animate-pulse" />
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-[#737373]">
                SIGNATURE 2026 ARCHIVAL STUDIO
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0D0D0D] uppercase">
              Try The Look.
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#5A5A5A] hidden md:inline">
              INFINITE STREETWEAR ARCHIVE // INTERACTIVE 3D ENSEMBLES
            </span>

            {/* Carousel Control Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center text-[#0D0D0D] hover:border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors rounded-none"
                aria-label={isPlaying ? 'Pause infinite carousel' : 'Play infinite carousel'}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center text-[#0D0D0D] hover:border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors rounded-none"
                aria-label="Previous model"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center text-[#0D0D0D] hover:border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors rounded-none"
                aria-label="Next model"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Split Screen Layout: Left 68-70% 3D Model Stage, Right 30-32% Sticky Look Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT: 3D-Style Full-Body Model Stage (Clean Bright Studio) */}
          <div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsMouseOverStage(true)}
            onMouseLeave={() => {
              setIsMouseOverStage(false);
              setHoveredHotspot(null);
            }}
            className="lg:col-span-8 relative bg-[#F4F4F5] border border-[#E5E5E5] rounded-none overflow-hidden h-[540px] sm:h-[680px] lg:h-[760px] flex items-center justify-center select-none"
          >
            {/* Custom Circular "VIEW" Cursor on Hover (Desktop) */}
            {isMouseOverStage && (
              <motion.div
                className="hidden lg:flex fixed pointer-events-none z-50 w-16 h-16 rounded-full bg-[#000000] text-[#FFFFFF] text-[10px] font-mono-tech font-bold uppercase tracking-widest items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-xl mix-blend-difference"
                animate={{
                  x: cursorPos.x + (stageRef.current?.getBoundingClientRect().left ?? 0),
                  y: cursorPos.y + (stageRef.current?.getBoundingClientRect().top ?? 0),
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.2 }}
              >
                VIEW
              </motion.div>
            )}

            {/* Subtle Studio Floor Grid Horizon */}
            <div className="absolute inset-0 bg-[radial-gradient(#E4E4E7_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

            {/* Infinite Horizontal Depth Formation (-2, -1, 0, 1, 2) */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {[-2, -1, 0, 1, 2].map((offset) => {
                // Modular infinite index
                const modelIdx = (activeIndex + offset + totalLooks * 2) % totalLooks;
                const look = CURATED_LOOKS[modelIdx];
                const isCenter = offset === 0;

                // 3D positioning
                const xPos = offset * 260; // pixel separation
                const zPos = -Math.abs(offset) * 140; // depth translation
                const scale = isCenter ? 1 : 0.82 - Math.abs(offset) * 0.08;
                const opacity = isCenter ? 1 : Math.max(0.3, 0.75 - Math.abs(offset) * 0.28);
                const blur = isCenter ? 0 : Math.abs(offset) * 2;
                const zIndex = 30 - Math.abs(offset) * 10;

                return (
                  <motion.div
                    key={`${look.id}-${offset}`}
                    onClick={() => {
                      if (!isCenter) {
                        setActiveIndex(modelIdx);
                      }
                    }}
                    animate={{
                      x: xPos,
                      z: zPos,
                      scale: scale,
                      opacity: opacity,
                      filter: `blur(${blur}px)`,
                    }}
                    transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                    drag={isCenter ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={(e, info) => {
                      if (info.offset.x < -40) handleNext();
                      else if (info.offset.x > 40) handlePrev();
                    }}
                    className={`absolute flex flex-col items-center justify-center cursor-pointer transition-shadow ${
                      isCenter ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                    }`}
                    style={{
                      zIndex: zIndex,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Model Portrait Container */}
                    <div
                      className={`relative w-[280px] sm:w-[360px] lg:w-[420px] aspect-[9/16] bg-[#FFFFFF] shadow-2xl border transition-all ${
                        isCenter
                          ? 'border-[#000000] shadow-[0_20px_60px_rgba(0,0,0,0.18)]'
                          : 'border-[#E5E5E5] shadow-md'
                      }`}
                    >
                      <img
                        src={look.modelImage}
                        alt={look.title}
                        className="w-full h-full object-cover object-top"
                        loading="eager"
                      />

                      {/* Studio Light Vignette (Light, Clean, Not Dark) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                      {/* Numbered Hotspot Pins (1, 2, 3) on Center Model */}
                      {isCenter &&
                        look.hotspots?.map((spot) => (
                          <div
                            key={spot.id}
                            className="absolute z-40"
                            style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuickViewProduct(spot.product);
                            }}
                          >
                            <button
                              onMouseEnter={() => setHoveredHotspot(spot)}
                              onMouseLeave={() => setHoveredHotspot(null)}
                              className="relative -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                              aria-label={`Hotspot pin ${spot.id}: ${spot.label}`}
                            >
                              {/* Pulsing ring */}
                              <span className="absolute inset-0 rounded-full bg-[#FFFFFF] opacity-80 animate-ping" />
                              {/* Pin core */}
                              <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-[#000000] text-[#FFFFFF] text-[10px] font-mono-tech font-bold border-2 border-[#FFFFFF] shadow-lg group-hover:scale-125 transition-transform">
                                {spot.id}
                              </span>
                            </button>

                            {/* Hotspot Preview Card on Hover */}
                            <AnimatePresence>
                              {hoveredHotspot?.id === spot.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 bg-[#FFFFFF] text-[#0D0D0D] p-3 shadow-2xl border border-[#000000] z-50 pointer-events-auto"
                                >
                                  <div className="flex gap-3">
                                    <img
                                      src={spot.product.images.front}
                                      alt={spot.product.name}
                                      className="w-14 h-18 object-cover bg-[#F4F4F5] border border-[#E5E5E5]"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <span className="text-[8px] font-mono-tech text-[#737373] uppercase block truncate">
                                        PIN #{spot.id} • {spot.product.brand || 'ALLURE'}
                                      </span>
                                      <h5 className="text-[11px] font-serif-luxury font-bold tracking-wide truncate mt-0.5">
                                        {spot.product.name}
                                      </h5>
                                      <span className="text-[11px] font-mono-tech font-bold text-[#0D0D0D] block mt-1">
                                        {formatPrice(spot.product.price)}
                                      </span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          addToCart(spot.product);
                                        }}
                                        className="mt-2 w-full bg-[#000000] text-[#FFFFFF] py-1 text-[9px] font-mono-tech uppercase tracking-widest hover:bg-[#262626] transition-colors"
                                      >
                                        + Quick Add
                                      </button>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}

                      {/* Bottom Model Indicator Badge */}
                      <div className="absolute bottom-3 left-3 bg-[#FFFFFF]/95 backdrop-blur-xs text-[#0D0D0D] px-2.5 py-1 text-[9px] font-mono-tech uppercase tracking-widest border border-[#E5E5E5] font-semibold">
                        MODEL {String(modelIdx + 1).padStart(2, '0')} // {look.season}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Controls Bar (Inside Stage) */}
            <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-xs font-mono-tech uppercase z-30 pointer-events-auto">
              {/* Pagination counter e.g. 01 —— 06 */}
              <div className="bg-[#FFFFFF]/90 backdrop-blur-xs px-3.5 py-1.5 border border-[#E5E5E5] flex items-center gap-2 font-bold text-[#0D0D0D]">
                <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="text-[#A1A1AA]">————</span>
                <span className="text-[#71717A]">{String(totalLooks).padStart(2, '0')}</span>
              </div>

              {/* Swipe / Drag Helper Indicator */}
              <div className="bg-[#000000]/85 backdrop-blur-xs text-[#FFFFFF] px-3 py-1.5 text-[10px] tracking-wider hidden sm:flex items-center gap-2">
                <span>SWIPE / DRAG HORIZONTALLY</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* RIGHT: Synchronized Outfit Panel ("In this look — 3 PIECES") */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="border border-[#E5E5E5] bg-[#FFFFFF] p-6 shadow-sm">
              {/* Panel Top Title */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#71717A] block">
                    SYNCHRONIZED ENSEMBLE
                  </span>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#0D0D0D] tracking-tight uppercase mt-0.5">
                    In this look — {lookProducts.length} Pieces
                  </h3>
                </div>
                <span className="text-[10px] font-mono-tech bg-[#F4F4F5] text-[#0D0D0D] px-2 py-1 uppercase font-bold border border-[#E5E5E5]">
                  SAVE {bundleDiscountPercent}%
                </span>
              </div>

              {/* Look Summary */}
              <p className="text-[11px] font-mono-tech text-[#52525B] uppercase leading-relaxed pt-3 pb-4">
                {currentLook.description}
              </p>

              {/* Exact 3 Individual Product Cards: Horizontal scrollable tray on mobile, stacked on desktop */}
              <div className="border-t border-[#E5E5E5] pt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLook.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex sm:flex-col overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory gap-3 pb-2"
                  >
                    {lookProducts.map((product, idx) => (
                      <div
                        key={product.id}
                        onClick={() => setQuickViewProduct(product)}
                        className="group relative flex items-center justify-between p-3 border border-[#E5E5E5] bg-[#FAFAFA] hover:bg-[#FFFFFF] hover:border-[#000000] transition-all cursor-pointer w-[270px] sm:w-auto shrink-0 snap-center sm:snap-none shadow-xs"
                      >
                        {/* Product Image & Details */}
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Pin Index Indicator */}
                          <div className="w-5 h-5 bg-[#000000] text-[#FFFFFF] text-[10px] font-mono-tech flex items-center justify-center font-bold shrink-0">
                            {idx + 1}
                          </div>

                          {/* Crisp Isolated Product Thumbnail */}
                          <div className="w-16 h-20 bg-[#FFFFFF] border border-[#E5E5E5] overflow-hidden shrink-0">
                            <img
                              src={product.images.front}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {/* Text info */}
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] font-mono-tech text-[#71717A] uppercase block truncate">
                              {product.brand || 'ALLURE'} • {product.refCode}
                            </span>
                            <h4 className="text-xs font-serif-luxury font-bold text-[#0D0D0D] uppercase tracking-wide truncate group-hover:text-[#52525B] transition-colors mt-0.5">
                              {product.name}
                            </h4>
                            <span className="text-xs font-mono-tech font-bold text-[#0D0D0D] block mt-1">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        </div>

                        {/* Quick-Add Single Item "+" Button with Strict Propagation Stopper (44px target) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="w-11 h-11 border border-[#E5E5E5] bg-[#FFFFFF] group-hover:border-[#000000] group-hover:bg-[#000000] group-hover:text-[#FFFFFF] text-[#0D0D0D] flex items-center justify-center transition-all shrink-0 ml-1.5 active:scale-95 shadow-xs"
                          aria-label={`Add ${product.name} to bag`}
                          title="Add single item to bag"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Complete the Look Bundle Card */}
              <div className="mt-6 pt-5 border-t border-[#E5E5E5] space-y-3.5 sticky bottom-4 sm:relative sm:bottom-0 bg-[#FFFFFF] z-20">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#71717A] block">
                    Complete The Look
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xs font-mono-tech text-[#059669] font-bold uppercase">
                      Bundle all {lookProducts.length} and save {bundleDiscountPercent}%
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono-tech text-[#A1A1AA] line-through">
                        {formatPrice(originalTotalPrice)}
                      </span>
                      <span className="text-lg font-mono-tech font-bold text-[#0D0D0D]">
                        {formatPrice(discountedBundlePrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Full-Width Black Bundle Button */}
                <button
                  type="button"
                  onClick={() => addLookToCart(currentLook)}
                  className="w-full bg-[#000000] text-[#FFFFFF] py-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold hover:bg-[#27272A] transition-colors rounded-none flex items-center justify-center gap-2 shadow-xl active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add full look to bag →</span>
                </button>

                <p className="text-[9px] font-mono-tech text-center uppercase text-[#71717A]">
                  Includes all {lookProducts.length} garments • Complimentary Archival Garment Bag
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
