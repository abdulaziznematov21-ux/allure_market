'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Currency } from '@/types';
import { ArrowUpRight, Check } from 'lucide-react';

export default function Footer() {
  const { currency, setCurrency, showNotification } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showNotification('DISPATCH CONFIDENTIAL ACCESS GRANTED.');
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'UZS'];

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E5E5E5] text-[#0D0D0D] pt-16 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E5E5E5]">
          {/* Brand Manifesto column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-luxury text-2xl font-normal tracking-[0.2em] uppercase">
                ALLURE
              </span>
              <span className="text-[10px] font-mono-tech text-[#5A5A5A] uppercase tracking-widest">
                ATELIER
              </span>
            </div>
            <p className="text-xs font-mono-tech text-[#5A5A5A] leading-relaxed max-w-sm uppercase">
              Architectural discipline meets contemporary luxury streetwear. Designed in limited
              monolithic runs with uncompromised material permanence.
            </p>
            <div className="pt-2 text-[10px] font-mono-tech text-[#737373] space-y-0.5">
              <p>EDITION 2026 // ALL RIGHTS RESERVED</p>
              <p>REGISTERED ARCHIVE // LONDON • PARIS • MILAN</p>
            </div>
          </div>

          {/* Client Concierge links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-mono-tech uppercase tracking-[0.2em] font-semibold text-[#0D0D0D]">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs font-mono-tech text-[#5A5A5A] uppercase">
              <li>
                <Link href="/catalog" className="hover:text-[#000000] transition-colors flex items-center gap-1">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#000000] transition-colors">
                  Sizing & Proportion Guide
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#000000] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#000000] transition-colors">
                  Material Care Archives
                </Link>
              </li>
            </ul>
          </div>

          {/* The House links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-mono-tech uppercase tracking-[0.2em] font-semibold text-[#0D0D0D]">
              The House
            </h4>
            <ul className="space-y-2 text-xs font-mono-tech text-[#5A5A5A] uppercase">
              <li>
                <Link href="/#manifesto" className="hover:text-[#000000] transition-colors">
                  Brand Ethics
                </Link>
              </li>
              <li>
                <Link href="/#try-the-look" className="hover:text-[#000000] transition-colors">
                  Editorial Lookbooks
                </Link>
              </li>
              <li>
                <Link href="/#material-permanence" className="hover:text-[#000000] transition-colors">
                  Circular Craft
                </Link>
              </li>
              <li>
                <Link href="/#private-archive" className="hover:text-[#000000] transition-colors">
                  Flagship Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Currency Selector */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <h4 className="text-[11px] font-mono-tech uppercase tracking-[0.2em] font-semibold text-[#0D0D0D] mb-2">
                Newsletter Dispatch
              </h4>
              <p className="text-xs font-mono-tech text-[#5A5A5A] uppercase mb-3">
                Receive confidential notification of capsule releases and archival presentations.
              </p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  placeholder="ENTER INSTITUTIONAL OR PERSONAL EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#F9F9F9] border border-[#E5E5E5] px-3 py-2 text-xs font-mono-tech uppercase tracking-wider text-[#0D0D0D] placeholder-[#A3A3A3] focus:outline-none focus:border-[#000000] rounded-none"
                />
                <button
                  type="submit"
                  className="bg-[#000000] text-[#FFFFFF] px-5 py-2 text-xs font-mono-tech uppercase tracking-widest hover:bg-[#262626] transition-colors rounded-none flex items-center gap-1"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : 'SUBSCRIBE'}
                </button>
              </form>
            </div>

            {/* Regional Market Currency Switcher */}
            <div className="pt-2">
              <span className="block text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#737373] mb-2">
                Regional Market:
              </span>
              <div className="inline-flex border border-[#E5E5E5]">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-3 py-1 text-xs font-mono-tech uppercase transition-colors ${
                      currency === curr
                        ? 'bg-[#000000] text-[#FFFFFF] font-bold'
                        : 'bg-[#FFFFFF] text-[#5A5A5A] hover:bg-[#F9F9F9] hover:text-[#000000]'
                    } ${curr !== 'UZS' ? 'border-r border-[#E5E5E5]' : ''}`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-tech text-[#737373] uppercase gap-4">
          <div>
            © 2026 ALLURE ATELIER INC. REPRODUCTION PROHIBITED.
          </div>
          <div className="flex space-x-6">
            <Link href="/catalog" className="hover:text-[#0D0D0D] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/catalog" className="hover:text-[#0D0D0D] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/catalog" className="hover:text-[#0D0D0D] transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
