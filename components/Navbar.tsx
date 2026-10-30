'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, X, ArrowRight, Menu } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';

export default function Navbar() {
  const router = useRouter();
  const { cartCount, wishlistCount, setIsCartOpen, setIsWishlistOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.refCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#000000] text-[#FFFFFF] text-[10px] sm:text-[11px] font-mono-tech tracking-[0.2em] py-2 px-4 text-center uppercase border-b border-[#27272A] flex items-center justify-center gap-2.5">
        <span className="inline-block w-1.5 h-1.5 bg-[#FFFFFF] rounded-full animate-pulse" />
        <span>COMPLIMENTARY WORLDWIDE ARCHIVAL SHIPPING OVER $250</span>
        <span className="hidden sm:inline text-[#A1A1AA]">// EDITION 2026</span>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-[#E5E5E5] shadow-xs'
            : 'bg-[#FFFFFF] border-[#E5E5E5]'
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Left: Mobile hamburger & Desktop Department brand */}
          <div className="flex items-center gap-3 lg:gap-8">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-11 h-11 flex items-center justify-center text-[#0D0D0D] hover:opacity-70 transition-opacity active:scale-95"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Brand Logo */}
            <Link href="/" className="hidden lg:flex items-baseline gap-2 group">
              <span className="font-serif-luxury text-2xl lg:text-3xl font-bold tracking-[0.18em] text-[#0D0D0D] uppercase group-hover:opacity-80 transition-opacity">
                ALLURE
              </span>
              <span className="text-[9px] font-mono-tech text-[#71717A] uppercase tracking-widest">
                ATELIER
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1 pl-4 border-l border-[#E5E5E5]">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] px-2 py-0.5 bg-[#F4F4F5] text-[#0D0D0D] font-bold">
                NEW ARRIVALS
              </span>
            </div>
          </div>

          {/* Center: Mobile Centered Brand Logo */}
          <div className="lg:hidden flex items-center justify-center">
            <Link href="/" className="flex items-baseline gap-1.5">
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.16em] text-[#0D0D0D] uppercase">
                ALLURE
              </span>
            </Link>
          </div>

          {/* Center: Desktop Department Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            <Link
              href="/catalog?category=all"
              className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[#0D0D0D] hover:text-[#52525B] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#000000] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              All Clothing
            </Link>
            <Link
              href="/catalog?category=women"
              className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[#0D0D0D] hover:text-[#52525B] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#000000] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Women
            </Link>
            <Link
              href="/catalog?category=men"
              className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[#0D0D0D] hover:text-[#52525B] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#000000] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Men
            </Link>
            <Link
              href="/catalog?category=kids"
              className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[#0D0D0D] hover:text-[#52525B] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#000000] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Junior / Kids
            </Link>
            <Link
              href="/catalog?category=leather"
              className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[#0D0D0D] hover:text-[#52525B] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#000000] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Leather & Objects
            </Link>
            <Link
              href="/#try-the-look"
              className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[#0D0D0D] hover:text-[#52525B] transition-colors py-1 font-bold"
            >
              Try The Look
            </Link>
            <Link
              href="/#virtual-rack"
              className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-[#0D0D0D] hover:text-[#52525B] transition-colors py-1"
            >
              Virtual Rack
            </Link>
          </nav>

          {/* Right: Search, Wishlist, Cart, Profile (44px min tap targets) */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            {/* Search Input / Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-11 h-11 sm:w-auto sm:h-auto sm:px-3 sm:py-2 flex items-center justify-center gap-2 border border-transparent sm:border-[#E5E5E5] text-xs font-mono-tech uppercase tracking-wider text-[#52525B] hover:border-[#000000] hover:text-[#000000] transition-colors sm:bg-[#FAFAFA]"
              aria-label="Search archive"
            >
              <Search className="w-4 h-4 text-[#0D0D0D]" />
              <span className="hidden md:inline">Search Archives...</span>
            </button>

            {/* Wishlist Button with Counter */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsWishlistOpen(true);
              }}
              className="w-11 h-11 flex items-center justify-center text-[#0D0D0D] hover:opacity-70 transition-opacity relative active:scale-95"
              aria-label="Open wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#000000] text-[#FFFFFF] text-[9px] font-mono-tech w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Requisition Bag with Counter */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsCartOpen(true);
              }}
              className="w-11 h-11 flex items-center justify-center text-[#0D0D0D] hover:opacity-70 transition-opacity relative active:scale-95"
              aria-label="Open cart bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#000000] text-[#FFFFFF] text-[9px] font-mono-tech w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <Link
              href="/auth"
              className="w-11 h-11 hidden sm:flex items-center justify-center text-[#0D0D0D] hover:opacity-70 transition-opacity"
              aria-label="Client account"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Expandable Live Search Modal */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-[#E5E5E5] shadow-2xl py-6 px-4 sm:px-8 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 border-b-2 border-[#000000] pb-3">
                <Search className="w-5 h-5 text-[#0D0D0D]" />
                <input
                  type="text"
                  placeholder="SEARCH SILHOUETTE, HOODIE, SNEAKER, REF CODE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-sm sm:text-base font-mono-tech uppercase tracking-wider text-[#0D0D0D] placeholder-[#A1A1AA] focus:outline-none bg-transparent"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-[#71717A] hover:text-[#000000]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Suggestions */}
              {searchQuery.trim() === '' ? (
                <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono-tech">
                  <span className="text-[#A1A1AA] mr-2">POPULAR SEARCHES:</span>
                  {['BOX CUT HOODIE', 'MELTON OVERCOAT', 'ORBITAL SNEAKER', 'POPLIN TUNIC', 'CARGO POD'].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-2.5 py-1 border border-[#E5E5E5] hover:border-[#000000] text-[#0D0D0D] transition-colors"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              ) : (
                <div className="pt-4 max-h-[60vh] overflow-y-auto divide-y divide-[#E5E5E5]">
                  {searchResults.length === 0 ? (
                    <p className="py-6 text-xs font-mono-tech text-[#71717A] uppercase text-center">
                      No archival garments match &ldquo;{searchQuery}&rdquo;
                    </p>
                  ) : (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          router.push(`/product/${product.id}`);
                        }}
                        className="py-3 flex items-center justify-between hover:bg-[#F4F4F5] px-3 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={product.images.front}
                            alt={product.name}
                            className="w-12 h-16 object-cover bg-[#FFFFFF] border border-[#E5E5E5]"
                          />
                          <div>
                            <span className="text-[10px] font-mono-tech text-[#71717A]">
                              {product.refCode} // {product.category}
                            </span>
                            <h4 className="text-sm font-serif-luxury font-bold tracking-wide text-[#0D0D0D]">
                              {product.name}
                            </h4>
                            <p className="text-[11px] font-mono-tech text-[#71717A] line-clamp-1">
                              {product.fabric}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-mono-tech font-bold">
                            ${product.price} USD
                          </span>
                          <span className="block text-[9px] font-mono-tech text-[#71717A] uppercase">
                            {product.stockStatus}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#000000]/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FFFFFF] h-full shadow-2xl p-6 flex flex-col justify-between z-10 border-r border-[#E5E5E5]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E5E5E5]">
                <span className="font-serif-luxury text-2xl font-bold tracking-widest text-[#0D0D0D]">
                  ALLURE
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#0D0D0D] hover:opacity-70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-2 pt-6">
                {[
                  { label: 'Women', href: '/catalog?category=women' },
                  { label: 'Men', href: '/catalog?category=men' },
                  { label: 'Kids', href: '/catalog?category=kids' },
                  { label: 'Collections', href: '/catalog?category=all' },
                  { label: 'Editorial & Archives', href: '/#private-archive' },
                  { label: 'Try The Look (3D Studio)', href: '/#try-the-look' },
                  { label: 'Virtual Clothing Rack', href: '/#virtual-rack' },
                  { label: 'Leather & Objects', href: '/catalog?category=leather' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-mono-tech uppercase tracking-[0.2em] py-2.5 border-b border-[#F4F4F5] flex items-center justify-between hover:text-[#52525B]"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
                  </Link>
                ))}
              </nav>

              {/* Drawer Shortcut Triggers in Mobile Menu */}
              <div className="grid grid-cols-2 gap-2 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="py-3 px-2 border border-[#E5E5E5] bg-[#FAFAFA] text-[10px] font-mono-tech uppercase tracking-wider flex items-center justify-center gap-1.5 hover:border-[#000000]"
                >
                  <Heart className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span>Archive ({wishlistCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="py-3 px-2 border border-[#000000] bg-[#000000] text-[#FFFFFF] text-[10px] font-mono-tech uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Bag ({cartCount})</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E5E5]">
              <div className="text-[10px] font-mono-tech text-[#71717A] uppercase space-y-1">
                <p>EDITION 2026 // MONOCHROME STREETWEAR</p>
                <p>ALLURE ATELIER PARIS • LONDON • MILAN</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
