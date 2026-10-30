'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Lock, User, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function AuthPage() {
  const { showNotification } = useShop();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsAuthenticated(true);
      showNotification(`AUTHENTICATED // WELCOME TO ALLURE ARCHIVES, ${fullName || 'CLIENT'}`);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="bg-[#FFFFFF] text-[#0D0D0D] min-h-[80vh] py-16 px-4">
        <div className="max-w-3xl mx-auto border border-[#E5E5E5] p-8 sm:p-12 bg-[#FAFAFA] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E5E5] gap-4">
            <div>
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#737373] block mb-1">
                AUTHENTICATED CLIENT DOSSIER
              </span>
              <h1 className="font-serif-luxury text-3xl uppercase tracking-tight text-[#0D0D0D]">
                {fullName || 'Archival Client'}
              </h1>
              <p className="text-xs font-mono-tech uppercase text-[#5A5A5A] mt-1">{email}</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs font-mono-tech uppercase underline hover:text-[#000000]"
            >
              Sign Out
            </button>
          </div>

          {/* Client Privileges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-tech uppercase">
            <div className="p-4 border border-[#E5E5E5] bg-[#FFFFFF]">
              <span className="text-[#737373] text-[10px] block">VIP STATUS</span>
              <span className="font-bold text-[#0D0D0D] block mt-1">SERIES 04 PATRON</span>
            </div>
            <div className="p-4 border border-[#E5E5E5] bg-[#FFFFFF]">
              <span className="text-[#737373] text-[10px] block">ACQUISITION RUNS</span>
              <span className="font-bold text-[#0D0D0D] block mt-1">2 SILHOUETTES</span>
            </div>
            <div className="p-4 border border-[#E5E5E5] bg-[#FFFFFF]">
              <span className="text-[#737373] text-[10px] block">SALON PRIVILEGE</span>
              <span className="font-bold text-[#0D0D0D] block mt-1">PARIS / LONDON ACCESS</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/catalog"
              className="bg-[#000000] text-[#FFFFFF] px-8 py-3.5 text-xs font-mono-tech uppercase tracking-widest hover:bg-[#262626]"
            >
              Explore Private Collection
            </Link>
            <Link
              href="/#private-archive"
              className="border border-[#000000] text-[#000000] px-8 py-3.5 text-xs font-mono-tech uppercase tracking-widest hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors"
            >
              Book Flagship Salon
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] text-[#0D0D0D] min-h-[80vh] flex items-center justify-center p-4 py-16">
      <div className="max-w-md w-full border border-[#E5E5E5] bg-[#FAFAFA] p-8 sm:p-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 border-b border-[#E5E5E5] pb-6">
          <span className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-[#737373] block">
            CONFIDENTIAL CLIENT ACCESS
          </span>
          <h2 className="font-serif-luxury text-3xl uppercase tracking-tight text-[#0D0D0D]">
            {isLogin ? 'Client Identification' : 'Atelier Registration'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-mono-tech uppercase tracking-widest text-[#737373] mb-1.5">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                placeholder="E.G. JULIEN DUVAL"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase focus:border-[#000000] focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-mono-tech uppercase tracking-widest text-[#737373] mb-1.5">
              Client Email Address
            </label>
            <input
              type="email"
              required
              placeholder="CLIENT@DOMAIN.COM"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase focus:border-[#000000] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono-tech uppercase tracking-widest text-[#737373] mb-1.5">
              Archival Access Code / Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase focus:border-[#000000] focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#000000] text-[#FFFFFF] py-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold hover:bg-[#262626] transition-colors rounded-none"
            >
              {isLogin ? 'Access Private Vault' : 'Create Archival Profile'}
            </button>
          </div>
        </form>

        {/* Toggle Mode */}
        <div className="text-center pt-4 border-t border-[#E5E5E5]">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-mono-tech uppercase underline text-[#5A5A5A] hover:text-[#000000]"
          >
            {isLogin
              ? 'New to Allure? Register for Confidential Access'
              : 'Already an Archival Member? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
