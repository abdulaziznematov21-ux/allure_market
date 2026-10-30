'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DEPARTMENTS = [
  {
    code: '01 // WM',
    title: 'WOMEN',
    subtitle: 'ARCHIVAL DRAPE & TAILORING',
    pieces: '24 PIECES',
    href: '/catalog?category=women',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1000',
  },
  {
    code: '02 // MN',
    title: 'MEN',
    subtitle: 'MONOLITHIC OVERCOATS & SHELLS',
    pieces: '32 PIECES',
    href: '/catalog?category=men',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=85&w=1000',
  },
  {
    code: '03 // JR',
    title: 'JUNIOR / KIDS',
    subtitle: 'PROPORTIONAL STREETWEAR CAPSULE',
    pieces: '12 PIECES',
    href: '/catalog?category=kids',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=85&w=1000',
  },
  {
    code: '04 // OB',
    title: 'LEATHER & OBJECTS',
    subtitle: 'FULL-GRAIN BRIDLE ACCESSORIES',
    pieces: '16 PIECES',
    href: '/catalog?category=leather',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=85&w=1000',
  },
];

export default function DepartmentGrid() {
  return (
    <section className="bg-[#FFFFFF] py-16 sm:py-24 border-b border-[#E5E5E5]">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-[#E5E5E5] gap-4">
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#71717A] block mb-1.5">
              CURATED CLASSIFICATION
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0D0D0D] uppercase">
              The Archives by Department
            </h2>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#52525B] block">
              Monolithic forms curated across specific garment classes
            </span>
            <span className="text-[10px] font-mono-tech uppercase text-[#A1A1AA]">
              84 TOTAL SPECIMENS // 2026 EDITION
            </span>
          </div>
        </div>

        {/* 2-Col Mobile, 4-Col Desktop Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {DEPARTMENTS.map((dept, index) => (
            <motion.div
              key={dept.code}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                href={dept.href}
                className="group block relative border border-[#E5E5E5] bg-[#FAFAFA] overflow-hidden hover:border-[#000000] hover:shadow-lg transition-all"
              >
                {/* Image Container with bright, clean photography */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F4F5]">
                  <img
                    src={dept.image}
                    alt={dept.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Code Tag */}
                  <div className="absolute top-2.5 left-2.5 bg-[#000000] text-[#FFFFFF] text-[9px] font-mono-tech uppercase px-2 py-0.5 tracking-widest">
                    {dept.code}
                  </div>

                  {/* Top Right Pieces count */}
                  <div className="absolute top-2.5 right-2.5 bg-[#FFFFFF]/90 backdrop-blur-xs text-[#0D0D0D] text-[9px] font-mono-tech uppercase px-2 py-0.5 tracking-widest font-bold">
                    {dept.pieces}
                  </div>
                </div>

                {/* Card Footer Content */}
                <div className="p-3.5 sm:p-5 bg-[#FFFFFF] border-t border-[#E5E5E5] flex items-center justify-between">
                  <div>
                    <h3 className="font-serif-luxury font-bold text-base sm:text-xl text-[#0D0D0D] tracking-wide group-hover:text-[#52525B] transition-colors">
                      {dept.title}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-wider text-[#71717A] mt-0.5">
                      {dept.subtitle}
                    </p>
                  </div>
                  <div className="w-8 h-8 border border-[#E5E5E5] flex items-center justify-center text-[#0D0D0D] group-hover:border-[#000000] group-hover:bg-[#000000] group-hover:text-[#FFFFFF] transition-all shrink-0 ml-2">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
