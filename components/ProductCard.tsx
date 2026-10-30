'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingBag, Eye, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart, setQuickViewProduct, formatPrice } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleInspect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      className="group relative border border-[#E5E5E5] bg-[#FFFFFF] flex flex-col justify-between transition-all duration-300 hover:border-[#000000] hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F4F5]">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={isHovered && product.images.back ? product.images.back : product.images.front}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top-Left Edition Tag */}
        {product.edition && (
          <div className="absolute top-2.5 left-2.5 bg-[#000000] text-[#FFFFFF] text-[8px] font-mono-tech uppercase tracking-widest px-2 py-0.5">
            {product.edition}
          </div>
        )}

        {/* Top-Right Wishlist Heart Button (Min 44x44px touch target) */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 w-11 h-11 bg-[#FFFFFF]/90 backdrop-blur-xs flex items-center justify-center text-[#0D0D0D] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors border border-[#E5E5E5] shadow-xs z-20"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? 'fill-[#EF4444] text-[#EF4444]'
                : 'text-[#0D0D0D] hover:text-[#FFFFFF]'
            }`}
          />
        </motion.button>

        {/* Hover / Quick Action Bar on Desktop */}
        <div className="hidden sm:flex absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/50 to-transparent items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={handleInspect}
            className="flex-1 bg-[#FFFFFF] text-[#0D0D0D] py-2.5 px-3 text-[10px] font-mono-tech uppercase tracking-widest font-bold hover:bg-[#F4F4F5] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>3D Inspect</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="w-10 h-9 bg-[#000000] text-[#FFFFFF] hover:bg-[#27272A] transition-colors flex items-center justify-center border border-white/20 shadow-sm"
            title="Quick add to bag"
            aria-label="Quick add to bag"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Quick-Add Button (Always visible on mobile, min 44x44px) */}
        <div className="sm:hidden absolute bottom-2 right-2 z-20">
          <button
            onClick={handleQuickAdd}
            className="w-11 h-11 bg-[#000000] text-[#FFFFFF] flex items-center justify-center shadow-md active:scale-95"
            aria-label="Add to bag"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-3.5 sm:p-4 bg-[#FFFFFF] border-t border-[#E5E5E5] flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[9px] font-mono-tech text-[#71717A] uppercase mb-1">
            <span>{product.brand || 'ALLURE'} • {product.refCode}</span>
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  className="w-2.5 h-2.5 border border-[#D4D4D8]"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="font-serif-luxury font-bold text-xs sm:text-sm text-[#0D0D0D] tracking-wide uppercase hover:text-[#52525B] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-[10px] font-mono-tech text-[#71717A] line-clamp-1 mt-1">
            {product.fabric}
          </p>
        </div>

        {/* Price & Stock Status Bar */}
        <div className="pt-3 mt-3 border-t border-[#F4F4F5] flex items-center justify-between text-xs font-mono-tech">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-[#0D0D0D]">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[10px] text-[#A1A1AA] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <span
            className={`text-[9px] uppercase tracking-wider font-semibold ${
              product.stockStatus === 'LOW STOCK'
                ? 'text-[#DC2626]'
                : product.stockStatus === 'ARCHIVAL RUN'
                ? 'text-[#71717A]'
                : 'text-[#0D0D0D]'
            }`}
          >
            {product.stockStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
