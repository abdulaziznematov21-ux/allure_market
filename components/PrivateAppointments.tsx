'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { ArrowUpRight, Calendar } from 'lucide-react';

export default function PrivateAppointments() {
  const { setIsAppointmentModalOpen } = useShop();

  return (
    <section id="private-archive" className="bg-[#FFFFFF] py-24 border-b border-[#E5E5E5]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Consultation trigger */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-[#737373] block">
              FLAGSHIP SALONS // BY INVITATION & APPOINTMENT
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#0D0D0D] tracking-tight uppercase leading-[1.08]">
              Private Archive Viewings & Appointments
            </h2>

            <p className="text-xs font-mono-tech uppercase tracking-wider text-[#5A5A5A] leading-relaxed max-w-lg">
              Our salons in Paris, London, and Milan accommodate private appointments for archival
              viewing, bespoke proportion alterations, and confidential specimen acquisitions.
              Every silhouette can be custom-graded to exact anatomical specifications.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="bg-[#000000] text-[#FFFFFF] px-8 py-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold hover:bg-[#262626] transition-colors rounded-none flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Atelier Consultation</span>
              </button>
            </div>

            <div className="pt-6 border-t border-[#E5E5E5] grid grid-cols-3 gap-4 text-[10px] font-mono-tech text-[#737373] uppercase">
              <div>
                <span className="font-bold text-[#0D0D0D] block">PARIS SALON</span>
                <span>PLACE VENDÔME</span>
              </div>
              <div>
                <span className="font-bold text-[#0D0D0D] block">LONDON SALON</span>
                <span>REGENT MAYFAIR</span>
              </div>
              <div>
                <span className="font-bold text-[#0D0D0D] block">MILAN SALON</span>
                <span>MONTENAPOLEONE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Atelier Showroom Visual */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#E5E5E5] bg-[#F0F0F0]">
              <img
                src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=1200"
                alt="Allure Atelier Architectural Showroom"
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute top-4 left-4 bg-[#FFFFFF] text-[#000000] px-3 py-1 text-[9px] font-mono-tech uppercase tracking-widest font-bold">
                ATELIER INTERIOR // PLACE VENDÔME
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
