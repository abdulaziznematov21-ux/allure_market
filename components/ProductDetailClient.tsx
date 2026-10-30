'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { Product, ProductColor } from '@/types';
import { useShop } from '@/context/ShopContext';
import {
  RotateCw,
  ShoppingBag,
  Heart,
  ArrowLeft,
  Check,
  ShieldCheck,
  Truck,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, formatPrice } = useShop();

  const isWishlisted = isInWishlist(product.id);

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'measurements' | 'care'>('specs');

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#FFFFFF] text-[#0D0D0D] min-h-screen">
      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-[#E5E5E5] py-4 bg-[#FAFAFA]">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#71717A]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#000000]">ARCHIVE</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-[#000000]">CATALOG</Link>
            <span>/</span>
            <span className="text-[#0D0D0D] font-bold">{product.refCode}</span>
          </div>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 hover:text-[#000000] p-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO ARCHIVE</span>
          </button>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left: 3D Front / Back Showcase & Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[3/4] max-w-2xl mx-auto bg-[#F4F4F5] border border-[#E5E5E5] perspective-1000 overflow-hidden shadow-sm">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative transform-style-3d cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Front Elevation */}
                <div className="absolute inset-0 backface-hidden bg-[#FFFFFF]">
                  <img
                    src={product.images.front}
                    alt={`${product.name} Front Elevation`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#000000] text-[#FFFFFF] px-3 py-1 text-[9px] font-mono-tech uppercase tracking-widest font-bold">
                    FRONT VIEW ELEVATION
                  </div>
                </div>

                {/* Back Elevation (180deg) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#FFFFFF]">
                  <img
                    src={product.images.back}
                    alt={`${product.name} Back Elevation`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#000000] text-[#FFFFFF] px-3 py-1 text-[9px] font-mono-tech uppercase tracking-widest font-bold">
                    POSTERIOR / BACK VIEW
                  </div>
                </div>
              </motion.div>

              {/* Hanging Physical Price Tag */}
              <div className="absolute top-6 right-6 bg-[#FFFFFF] text-[#000000] p-4 shadow-xl border border-[#000000] w-32 transform rotate-2 pointer-events-none">
                <span className="block text-[8px] font-mono-tech uppercase tracking-widest text-[#71717A]">
                  ALLURE ARCHIVE
                </span>
                <span className="block text-[10px] font-mono-tech font-bold truncate">
                  {product.refCode}
                </span>
                <span className="block text-sm font-mono-tech font-bold mt-1">
                  {formatPrice(product.price)}
                </span>
                <div className="mt-2 h-4 bg-[repeating-linear-gradient(90deg,#000,#000_1px,#fff_1px,#fff_3px)] w-full" />
              </div>
            </div>

            {/* Flip Control & Thumbnails */}
            <div className="max-w-2xl mx-auto flex items-center justify-between">
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="bg-[#000000] text-[#FFFFFF] px-5 py-3 text-xs font-mono-tech uppercase tracking-widest flex items-center gap-2 hover:bg-[#27272A] transition-colors rounded-none font-bold"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'SHOW FRONT ELEVATION' : 'ROTATE 180° TO BACK VIEW'}</span>
              </button>

              <div className="flex items-center gap-2">
                {[product.images.front, product.images.back, product.images.model || product.images.front].map(
                  (img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setIsFlipped(idx === 1)}
                      className="w-12 h-16 border border-[#E5E5E5] hover:border-[#000000] overflow-hidden"
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right: Product Dossier & Buying Panel */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-widest text-[#71717A]">
                <span>{product.brand || 'ALLURE'} • {product.refCode}</span>
                <span className="bg-[#F4F4F5] px-2 py-0.5 text-[#0D0D0D] font-bold border border-[#E5E5E5]">
                  {product.badge || product.stockStatus}
                </span>
              </div>

              <h1 className="font-serif-luxury font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#0D0D0D]">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-mono-tech font-bold text-[#0D0D0D]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono-tech text-[#A1A1AA] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs font-mono-tech uppercase text-[#52525B] tracking-wider leading-relaxed pt-2">
                {product.description}
              </p>
            </div>

            {/* Tonal Color Selection */}
            <div className="pt-4 border-t border-[#E5E5E5]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#71717A]">
                  Tonal Palette: <strong className="text-[#0D0D0D]">{selectedColor.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 border transition-all relative ${
                      selectedColor.name === color.name
                        ? 'border-[#000000] ring-2 ring-[#000000] ring-offset-2 scale-105'
                        : 'border-[#D4D4D8] hover:border-[#71717A]'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.name === color.name && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check
                          className={`w-4 h-4 ${
                            color.name.toLowerCase().includes('white') ? 'text-[#000000]' : 'text-[#FFFFFF]'
                          }`}
                        />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Proportions / Size Selector */}
            <div className="pt-4 border-t border-[#E5E5E5]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#71717A]">
                  Proportions / Size
                </span>
                <span className="text-[10px] font-mono-tech uppercase text-[#0D0D0D] underline cursor-pointer">
                  Anatomical Sizing Guide
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs font-mono-tech uppercase border transition-colors ${
                      selectedSize === size
                        ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] font-bold'
                        : 'bg-[#FFFFFF] text-[#52525B] border-[#E5E5E5] hover:border-[#000000]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons (Min 44px tap target) */}
            <div className="pt-6 border-t border-[#E5E5E5] space-y-3">
              <button
                onClick={() => addToCart(product, selectedColor, selectedSize, quantity)}
                className="w-full bg-[#000000] text-[#FFFFFF] py-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold hover:bg-[#27272A] transition-colors rounded-none flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Requisition Garment — {formatPrice(product.price)}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className={`w-full py-3.5 text-xs font-mono-tech uppercase tracking-widest border transition-colors flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'bg-[#F4F4F5] border-[#000000] text-[#EF4444] font-bold'
                    : 'border-[#E5E5E5] text-[#52525B] hover:border-[#000000] hover:text-[#000000]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#EF4444] text-[#EF4444]' : ''}`} />
                <span>{isWishlisted ? 'Garment Saved to Private Archive' : 'Save to Private Archive'}</span>
              </button>
            </div>

            {/* Reassurance Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E5E5] text-[10px] font-mono-tech uppercase text-[#71717A]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0D0D0D]" />
                <span>COMPLIMENTARY WORLDWIDE DELIVERY</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0D0D0D]" />
                <span>CERTIFICATE OF ARCHIVAL PROVENANCE</span>
              </div>
            </div>

            {/* Detailed Architectural Tabs */}
            <div className="pt-6 border-t border-[#E5E5E5]">
              <div className="flex border-b border-[#E5E5E5]">
                {[
                  { id: 'specs', label: 'FABRIC SCIENCE' },
                  { id: 'measurements', label: 'DIMENSIONS' },
                  { id: 'care', label: 'ARCHIVAL CARE' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 px-4 text-xs font-mono-tech uppercase tracking-widest border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#000000] text-[#000000] font-bold'
                        : 'border-transparent text-[#71717A] hover:text-[#000000]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 text-xs font-mono-tech uppercase text-[#52525B] leading-relaxed">
                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    <p><strong>FABRIC:</strong> {product.fabric}</p>
                    <p><strong>ORIGIN:</strong> {product.origin}</p>
                    <p><strong>FIT GEOMETRY:</strong> {product.specs.fit}</p>
                    <p><strong>CLOSURE:</strong> {product.specs.closure}</p>
                    <p><strong>HARDWARE:</strong> {product.specs.hardware}</p>
                  </div>
                )}
                {activeTab === 'measurements' && (
                  <div className="space-y-1.5">
                    <p>• Size S: Chest 112cm // Shoulder 50cm // Length 118cm</p>
                    <p>• Size M: Chest 118cm // Shoulder 52cm // Length 120cm</p>
                    <p>• Size L: Chest 124cm // Shoulder 54cm // Length 122cm</p>
                    <p>• Size XL: Chest 130cm // Shoulder 56cm // Length 124cm</p>
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="space-y-1.5">
                    <p>• Professional eco-friendly dry clean only</p>
                    <p>• Store on wide-shoulder contoured wooden hanger</p>
                    <p>• Avoid steam iron direct contact with bonded laser lapels</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Archival Pieces Section */}
        <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif-luxury font-bold text-2xl sm:text-3xl uppercase tracking-tight text-[#0D0D0D]">
              Complementary Archival Forms
            </h3>
            <Link
              href="/catalog"
              className="text-xs font-mono-tech uppercase underline text-[#52525B] hover:text-[#000000]"
            >
              View Full Archive
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
