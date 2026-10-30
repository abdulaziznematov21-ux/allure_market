'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ArrowUpRight } from 'lucide-react';

const TABS = ['ALL', 'OUTERWEAR', 'TAILORING', 'STREETWEAR'];

export default function CuratedDrops() {
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === 'ALL') return true;
    return product.dropCategory?.toUpperCase() === activeTab;
  }).slice(0, 8);

  return (
    <section className="bg-[#FFFFFF] py-16 sm:py-24 border-b border-[#E5E5E5]">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-[#E5E5E5] gap-4 sm:gap-6">
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#71717A] block mb-1.5">
              VOL. IV PRESENTATION
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0D0D0D] uppercase">
              Curated Seasonal Drops
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center overflow-x-auto no-scrollbar gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-mono-tech uppercase tracking-widest border transition-colors shrink-0 ${
                  activeTab === tab
                    ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] font-bold'
                    : 'bg-[#FFFFFF] text-[#52525B] border-[#E5E5E5] hover:border-[#000000] hover:text-[#000000]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Mobile, 2-Col Tablet, 4-Col Desktop Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to Full Catalog */}
        <div className="mt-12 sm:mt-14 text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 border border-[#000000] bg-[#000000] text-[#FFFFFF] px-8 py-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold hover:bg-[#27272A] transition-colors rounded-none"
          >
            <span>View All Curated Pieces ({PRODUCTS.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
