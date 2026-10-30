'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#0A0A0A] text-[#FFFFFF] overflow-hidden flex flex-col justify-between border-b border-[#27272A]">
      {/* Background Hero Studio Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2400&q=85"
          alt="Allure High Fashion Studio Hero"
          className="w-full h-full object-cover object-top opacity-70"
        />
        {/* Crisp Gradient Transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/85 via-transparent to-[#0A0A0A]/50" />
      </div>

      {/* Top Meta Header */}
      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between text-[10px] md:text-[11px] font-mono-tech tracking-[0.25em] text-[#A1A1AA] uppercase">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#FFFFFF]" />
          <span>AUTUMN / WINTER 2026</span>
          <span className="hidden sm:inline">// MONOLITHIC SERIES 04</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span>PARIS • LONDON • MILAN</span>
          <span className="text-[#FFFFFF]">ARCHIVAL EDITION</span>
        </div>
      </div>

      {/* Center / Lower Editorial Content */}
      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-6"
        >
          <div className="inline-block border border-[#FFFFFF]/40 px-3 py-1 text-[10px] sm:text-xs font-mono-tech uppercase tracking-[0.3em] backdrop-blur-xs bg-[#FFFFFF]/10 font-bold">
            Vol. IV Archival Presentation
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#FFFFFF] leading-[0.95] uppercase">
            Autumn / Winter
            <span className="block font-serif-luxury italic font-light">Monochrome</span>
          </h1>

          <p className="text-xs sm:text-sm font-mono-tech text-[#E4E4E7] max-w-xl leading-relaxed uppercase tracking-wider">
            An uncompromising architectural exploration into dense monolithic silhouettes,
            laser-welded seams, and combed Italian virgin wool for unyielding form.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/catalog"
              className="bg-[#FFFFFF] text-[#000000] px-8 py-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-bold hover:bg-[#E4E4E7] transition-colors rounded-none flex items-center gap-2 group shadow-xl"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="#try-the-look"
              className="bg-transparent border border-[#FFFFFF]/60 text-[#FFFFFF] px-8 py-4 text-xs font-mono-tech uppercase tracking-[0.2em] hover:bg-[#FFFFFF]/15 hover:border-[#FFFFFF] transition-colors rounded-none font-bold"
            >
              Try The Look Studio
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Ticker / Grid Specs */}
      <div className="relative z-10 w-full border-t border-[#FFFFFF]/20 backdrop-blur-xs bg-[#000000]/50">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between text-[10px] font-mono-tech text-[#D4D4D8] uppercase tracking-widest gap-2">
          <span>01 // STRUCTURAL PURITY</span>
          <span className="hidden sm:inline">02 // 620 GSM VIRGIN WOOL</span>
          <span className="hidden md:inline">03 // RAW KUROKI SELVEDGE</span>
          <a href="#try-the-look" className="flex items-center gap-2 text-[#FFFFFF] font-bold hover:underline">
            <span>SCROLL TO OUTFIT STUDIO</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
