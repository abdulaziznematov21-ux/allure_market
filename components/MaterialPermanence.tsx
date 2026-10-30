'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const MATERIALS = [
  {
    code: 'FBR-01 // IT',
    title: '620 GSM ITALIAN MELTON WOOL',
    origin: 'BIELLA, ITALY',
    description: 'Double-faced high-density virgin wool woven on heritage rapier looms. Calendered for an impervious wind barrier and monolithic architectural drape.',
    density: '620 GSM',
    weave: 'Tightly Felted Twill',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1000',
  },
  {
    code: 'FBR-02 // JP',
    title: '14OZ RAW KUROKI SELVEDGE',
    origin: 'OKAYAMA, JAPAN',
    description: 'Woven slowly on vintage Toyoda G9 shuttle looms using natural indigo dip-vats. Retains the stiff dimensional memory of raw Japanese cotton.',
    density: '14.25 OZ',
    weave: 'Right Hand Twill Selvedge',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&q=80&w=1000',
  },
  {
    code: 'FBR-03 // MN',
    title: '7-PLY PURE MONGOLIAN CASHMERE',
    origin: 'ULAANBAATAR, MONGOLIA',
    description: 'Combed solely from inner neck underdown with an ultra-fine 15.2-micron count. Twisted into seven dense plies for unmatched thermal retention without synthetic loft.',
    density: '480 GSM',
    weave: 'Drop-Needle Engineered Rib',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000',
  },
];

export default function MaterialPermanence() {
  return (
    <section id="material-permanence" className="bg-[#FFFFFF] py-24 border-b border-[#E5E5E5]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E5E5] gap-4">
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#737373] block mb-2">
              TEXTILE SCIENCE & PROVENANCE
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0D0D0D] uppercase">
              Material Permanence & Form
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#5A5A5A] block">
              Every textile custom-developed with European and Japanese master mills
            </span>
            <span className="text-[10px] font-mono-tech uppercase text-[#A3A3A3]">
              ZERO COMPROMISE STANDARDS // 2026
            </span>
          </div>
        </div>

        {/* 3-Column Material Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MATERIALS.map((mat) => (
            <div
              key={mat.code}
              className="border border-[#E5E5E5] bg-[#F9F9F9] flex flex-col justify-between group hover:border-[#000000] transition-colors"
            >
              {/* Macro Texture Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E5E5E5]">
                <img
                  src={mat.image}
                  alt={mat.title}
                  className="w-full h-full object-cover grayscale contrast-130 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#000000] text-[#FFFFFF] text-[9px] font-mono-tech uppercase px-2 py-0.5 tracking-widest">
                  {mat.code}
                </div>
                <div className="absolute bottom-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-xs text-[#000000] text-[9px] font-mono-tech uppercase px-2 py-0.5 tracking-widest font-semibold">
                  {mat.density}
                </div>
              </div>

              {/* Specs & Description */}
              <div className="p-6 bg-[#FFFFFF] flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#737373] block mb-1">
                    PROVENANCE: {mat.origin}
                  </span>
                  <h3 className="font-serif-luxury text-lg text-[#0D0D0D] tracking-wide uppercase">
                    {mat.title}
                  </h3>
                  <p className="text-xs font-mono-tech text-[#5A5A5A] uppercase tracking-wider leading-relaxed mt-2">
                    {mat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0F0F0] flex items-center justify-between text-[10px] font-mono-tech text-[#0D0D0D] uppercase font-semibold">
                  <span>WEAVE: {mat.weave}</span>
                  <span className="text-[#737373] group-hover:text-[#000000] flex items-center gap-1 transition-colors">
                    SPEC DOSSIER
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
