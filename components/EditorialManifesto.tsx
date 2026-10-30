'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function EditorialManifesto() {
  return (
    <section id="manifesto" className="bg-[#000000] text-[#FFFFFF] py-24 sm:py-32 border-b border-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: High-Contrast Monolithic Portrait Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#2B2B2B] bg-[#141414]">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1200"
                alt="Editorial High-Fashion Monolith"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Technical Code Label */}
              <div className="absolute bottom-4 left-4 bg-[#FFFFFF] text-[#000000] px-3 py-1 text-[9px] font-mono-tech uppercase tracking-widest font-bold">
                DOSSIER // ARCHIVAL PURITY 2026
              </div>
            </div>
          </div>

          {/* Right: The Manifesto Statement */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-[#737373] block">
                ATELIER PHILOSOPHY // 004
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFFFFF] leading-[1.08] tracking-tight">
                &ldquo;We do not make garments for seasonal novelty. We build monolithic silhouettes engineered to outlive trends through structural purity and mathematical restraint.&rdquo;
              </h2>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-[#444444] bg-[#161616] flex items-center justify-center text-xs font-serif-luxury italic">
                JM
              </div>
              <div>
                <span className="block text-xs font-mono-tech uppercase tracking-widest font-semibold text-[#FFFFFF]">
                  Jonas Mercer
                </span>
                <span className="text-[10px] font-mono-tech uppercase text-[#737373]">
                  CHIEF DESIGNER // ALLURE ATELIER
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#262626]">
              <div>
                <span className="text-xl sm:text-2xl font-mono-tech font-bold text-[#FFFFFF] block">
                  100%
                </span>
                <span className="text-[9px] font-mono-tech uppercase tracking-wider text-[#A3A3A3] mt-1 block">
                  Noble Biella Wool & Mongolian Cashmere
                </span>
              </div>

              <div>
                <span className="text-xl sm:text-2xl font-mono-tech font-bold text-[#FFFFFF] block">
                  0%
                </span>
                <span className="text-[9px] font-mono-tech uppercase tracking-wider text-[#A3A3A3] mt-1 block">
                  Synthetic Microplastics or Fast Trend Fillers
                </span>
              </div>

              <div>
                <span className="text-xl sm:text-2xl font-mono-tech font-bold text-[#FFFFFF] block">
                  LIMIT: 120
                </span>
                <span className="text-[9px] font-mono-tech uppercase tracking-wider text-[#A3A3A3] mt-1 block">
                  Maximum Pieces Milled Per Archival Silhouette
                </span>
              </div>
            </div>

            {/* Read Complete Manifesto CTA */}
            <div className="pt-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 border border-[#444444] bg-[#141414] text-[#FFFFFF] px-6 py-3.5 text-xs font-mono-tech uppercase tracking-widest hover:border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000] transition-colors rounded-none"
              >
                <span>Read Full Architectural Charter</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
