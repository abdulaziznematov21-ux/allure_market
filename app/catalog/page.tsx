'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import { X, SlidersHorizontal, ChevronDown, Check, ArrowRight, Calendar, Filter } from 'lucide-react';
import Link from 'next/link';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category');
  const { setIsAppointmentModalOpen, formatPrice } = useShop();

  // Filter States
  const [selectedDepartment, setSelectedDepartment] = useState<string>(() => {
    if (initialCategoryParam === 'women') return 'WOMEN';
    if (initialCategoryParam === 'men') return 'MEN';
    if (initialCategoryParam === 'kids') return 'KIDS';
    if (initialCategoryParam === 'leather') return 'LEATHER & OBJECTS';
    return 'ALL';
  });

  const [selectedClassifications, setSelectedClassifications] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1350);
  const [selectedAllocation, setSelectedAllocation] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Classification categories and counts
  const classifications = [
    { name: 'Outerwear', count: 12 },
    { name: 'Tops', count: 18 },
    { name: 'Knitwear', count: 8 },
    { name: 'Trousers', count: 9 },
    { name: 'Footwear', count: 6 },
    { name: 'Leather & Objects', count: 4 },
  ];

  // Palette swatches
  const colorSwatches = [
    { name: 'OPTIC', hex: '#FFFFFF', border: true },
    { name: 'ASH', hex: '#737373' },
    { name: 'ONYX', hex: '#0D0D0D' },
    { name: 'MATTE', hex: '#404040' },
    { name: 'CONCRETE', hex: '#A3A3A3' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const allocations = [
    { id: 'IN STOCK', label: 'In-Stock Instantly' },
    { id: 'PRE-ORDER', label: 'Atelier Pre-Order (Waitlist)' },
    { id: 'ARCHIVAL RUN', label: 'Archival Vault Reserve' },
  ];

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Department
      if (selectedDepartment !== 'ALL') {
        if (selectedDepartment === 'WOMEN' && product.department !== 'Women') return false;
        if (selectedDepartment === 'MEN' && product.department !== 'Men') return false;
        if (selectedDepartment === 'KIDS' && product.department !== 'Junior / Kids') return false;
        if (selectedDepartment === 'LEATHER & OBJECTS' && product.category !== 'Leather & Objects')
          return false;
        if (selectedDepartment === 'STREETWEAR CAPSULE' && product.dropCategory !== 'Streetwear')
          return false;
        if (selectedDepartment === 'TAILORING' && product.dropCategory !== 'Tailoring')
          return false;
      }

      // Classification
      if (
        selectedClassifications.length > 0 &&
        !selectedClassifications.includes(product.category)
      ) {
        return false;
      }

      // Colors
      if (
        selectedColors.length > 0 &&
        !product.colors.some((c) =>
          selectedColors.some((sc) => c.name.toUpperCase().includes(sc))
        )
      ) {
        return false;
      }

      // Sizes
      if (
        selectedSizes.length > 0 &&
        !product.sizes.some((s) => selectedSizes.includes(s))
      ) {
        return false;
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      // Allocation
      if (
        selectedAllocation.length > 0 &&
        !selectedAllocation.includes(product.stockStatus)
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [
    selectedDepartment,
    selectedClassifications,
    selectedColors,
    selectedSizes,
    maxPrice,
    selectedAllocation,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedDepartment !== 'ALL' ? 1 : 0) +
    selectedClassifications.length +
    selectedColors.length +
    selectedSizes.length +
    (maxPrice < 1350 ? 1 : 0) +
    selectedAllocation.length;

  const resetFilters = () => {
    setSelectedDepartment('ALL');
    setSelectedClassifications([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setMaxPrice(1350);
    setSelectedAllocation([]);
  };

  const toggleClassification = (name: string) => {
    setSelectedClassifications((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const toggleColor = (name: string) => {
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const toggleAllocation = (alloc: string) => {
    setSelectedAllocation((prev) =>
      prev.includes(alloc) ? prev.filter((item) => item !== alloc) : [...prev, alloc]
    );
  };

  // Reusable Filter Sidebar Content
  const filterSidebarContent = (
    <div className="space-y-8 bg-[#FAFAFA] p-6 border border-[#E5E5E5]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
        <span className="text-xs font-mono-tech uppercase tracking-[0.2em] font-bold">
          REFINE SELECTION
        </span>
        <span className="text-[10px] font-mono-tech uppercase text-[#71717A]">
          {activeFiltersCount} FILTERS APPLIED
        </span>
      </div>

      {/* 1. CLASSIFICATION */}
      <div>
        <h4 className="text-xs font-mono-tech uppercase tracking-widest font-semibold mb-3">
          Classification
        </h4>
        <div className="space-y-2">
          {classifications.map((c) => {
            const isChecked = selectedClassifications.includes(c.name);
            return (
              <label
                key={c.name}
                className="flex items-center justify-between text-xs font-mono-tech uppercase cursor-pointer hover:text-[#000000]"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleClassification(c.name)}
                    className="w-4 h-4 rounded-none accent-[#000000] border-[#A1A1AA]"
                  />
                  <span className={isChecked ? 'font-bold' : 'text-[#52525B]'}>
                    {c.name}
                  </span>
                </div>
                <span className="text-[10px] text-[#A1A1AA]">{c.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. TONAL PALETTE */}
      <div className="pt-4 border-t border-[#E5E5E5]">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xs font-mono-tech uppercase tracking-widest font-semibold">
            Tonal Palette
          </h4>
          <span className="text-[10px] font-mono-tech text-[#71717A]">
            {colorSwatches.length} Colors
          </span>
        </div>
        <div className="flex items-center gap-2">
          {colorSwatches.map((swatch) => {
            const isSelected = selectedColors.includes(swatch.name);
            return (
              <button
                key={swatch.name}
                onClick={() => toggleColor(swatch.name)}
                className={`w-7 h-7 border relative transition-all ${
                  isSelected
                    ? 'border-[#000000] ring-2 ring-[#000000] ring-offset-1 scale-105'
                    : 'border-[#D4D4D8] hover:border-[#71717A]'
                }`}
                style={{ backgroundColor: swatch.hex }}
                title={swatch.name}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check
                      className={`w-3.5 h-3.5 ${
                        swatch.name === 'OPTIC' ? 'text-[#000000]' : 'text-[#FFFFFF]'
                      }`}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between text-[9px] font-mono-tech uppercase text-[#71717A] mt-2">
          {colorSwatches.map((s) => (
            <span key={s.name}>{s.name}</span>
          ))}
        </div>
      </div>

      {/* 3. PROPORTIONS / SIZE GRID */}
      <div className="pt-4 border-t border-[#E5E5E5]">
        <h4 className="text-xs font-mono-tech uppercase tracking-widest font-semibold mb-3">
          Proportions / Size
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((s) => {
            const isSelected = selectedSizes.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={`py-2 text-xs font-mono-tech uppercase border transition-colors ${
                  isSelected
                    ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] font-bold'
                    : 'bg-[#FFFFFF] text-[#52525B] border-[#E5E5E5] hover:border-[#000000]'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. VALUATION MATRIX (PRICE SLIDER) */}
      <div className="pt-4 border-t border-[#E5E5E5]">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-mono-tech uppercase tracking-widest font-semibold">
            Valuation Matrix
          </h4>
          <span className="text-xs font-mono-tech font-bold text-[#0D0D0D]">
            ${maxPrice} USD
          </span>
        </div>
        <input
          type="range"
          min="80"
          max="1350"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#000000] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono-tech text-[#71717A] mt-1">
          <span>$80</span>
          <span>$600</span>
          <span>$1,350</span>
        </div>
      </div>

      {/* 5. ALLOCATION STATE */}
      <div className="pt-4 border-t border-[#E5E5E5]">
        <h4 className="text-xs font-mono-tech uppercase tracking-widest font-semibold mb-3">
          Allocation State
        </h4>
        <div className="space-y-2">
          {allocations.map((alloc) => {
            const isChecked = selectedAllocation.includes(alloc.id);
            return (
              <label
                key={alloc.id}
                className="flex items-center gap-2.5 text-xs font-mono-tech uppercase cursor-pointer hover:text-[#000000]"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAllocation(alloc.id)}
                  className="w-4 h-4 rounded-none accent-[#000000] border-[#A1A1AA]"
                />
                <span className={isChecked ? 'font-bold' : 'text-[#52525B]'}>
                  {alloc.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Reset button */}
      <div className="pt-4 border-t border-[#E5E5E5]">
        <button
          onClick={resetFilters}
          className="w-full bg-[#FFFFFF] border border-[#000000] py-3 text-xs font-mono-tech uppercase tracking-widest font-semibold text-[#0D0D0D] hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors"
        >
          Reset Filter Parameters
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FFFFFF] text-[#0D0D0D] min-h-screen">
      {/* Page Header */}
      <div className="border-b border-[#E5E5E5] pt-8 sm:pt-10 pb-6 sm:pb-8 bg-[#FAFAFA]">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#71717A] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[#000000]">ARCHIVE</Link>
            <span>/</span>
            <span className="text-[#0D0D0D] font-bold">ALL CLOTHING & APPAREL</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#0D0D0D]">
                All Clothing & Apparel
              </h1>
              <p className="text-xs sm:text-sm font-mono-tech uppercase text-[#52525B] tracking-wider leading-relaxed mt-3">
                Vol. IV Archival presentation. Monolithic silhouettes crafted in uncompromised
                dense virgin wool, bonded twill, and combed Egyptian staple poplin.
              </p>
            </div>

            <div className="text-right border-l-2 border-[#000000] pl-4 lg:pl-6 hidden sm:block">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#0D0D0D] font-bold block">
                SHOWING {filteredProducts.length} CURATED PIECES
              </span>
              <span className="text-[10px] font-mono-tech uppercase text-[#71717A] block mt-0.5">
                EDITION 2026 // SERIES 04
              </span>
            </div>
          </div>

          {/* Department Filter Tabs */}
          <div className="mt-8 flex items-center overflow-x-auto no-scrollbar gap-2 pt-6 border-t border-[#E5E5E5]">
            {[
              { id: 'ALL', label: 'ALL' },
              { id: 'WOMEN', label: 'WOMEN' },
              { id: 'MEN', label: 'MEN' },
              { id: 'KIDS', label: 'KIDS' },
              { id: 'STREETWEAR CAPSULE', label: 'STREETWEAR CAPSULE' },
              { id: 'TAILORING', label: 'TAILORING' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedDepartment(tab.id)}
                className={`px-4 py-2 text-xs font-mono-tech uppercase tracking-widest border transition-colors shrink-0 ${
                  selectedDepartment === tab.id
                    ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] font-bold'
                    : 'bg-[#FFFFFF] text-[#52525B] border-[#E5E5E5] hover:border-[#000000] hover:text-[#000000]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Criteria Chips Bar & Sort Dropdown */}
          <div className="mt-6 pt-4 border-t border-[#E5E5E5] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center flex-wrap gap-2 text-xs font-mono-tech uppercase">
              <span className="text-[#71717A] text-[10px] tracking-widest mr-1">
                ACTIVE CRITERIA:
              </span>

              {selectedClassifications.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#000000] bg-[#FFFFFF] text-[#000000]"
                >
                  <span>CLASS: {c}</span>
                  <button onClick={() => toggleClassification(c)}>
                    <X className="w-3 h-3 hover:opacity-60" />
                  </button>
                </span>
              ))}

              {selectedColors.map((color) => (
                <span
                  key={color}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#000000] bg-[#FFFFFF] text-[#000000]"
                >
                  <span>COLOR: {color}</span>
                  <button onClick={() => toggleColor(color)}>
                    <X className="w-3 h-3 hover:opacity-60" />
                  </button>
                </span>
              ))}

              {selectedSizes.map((size) => (
                <span
                  key={size}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#000000] bg-[#FFFFFF] text-[#000000]"
                >
                  <span>SIZE: {size}</span>
                  <button onClick={() => toggleSize(size)}>
                    <X className="w-3 h-3 hover:opacity-60" />
                  </button>
                </span>
              ))}

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-[10px] font-mono-tech uppercase underline font-bold text-[#71717A] hover:text-[#000000] ml-2"
                >
                  CLEAR ALL
                </button>
              )}
            </div>

            {/* Mobile / Tablet Filter & Sort Trigger Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 border border-[#000000] bg-[#000000] text-[#FFFFFF] px-4 py-2.5 text-xs font-mono-tech uppercase font-bold"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>FILTER & SORT ({activeFiltersCount})</span>
              </button>

              <div className="flex items-center gap-2 border border-[#E5E5E5] px-3 py-2 bg-[#FFFFFF]">
                <span className="text-[10px] font-mono-tech uppercase text-[#71717A]">
                  SORT BY:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-mono-tech uppercase text-[#0D0D0D] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="featured">CURATED / FEATURED</option>
                  <option value="price-asc">PRICE: ASCENDING</option>
                  <option value="price-desc">PRICE: DESCENDING</option>
                  <option value="name">ALPHABETICAL</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar Filter Column */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            {filterSidebarContent}
          </aside>

          {/* Right: Product Grid (Mobile: 2-Col gap-3 px-3, Tablet: 3-Col gap-6, Desktop: 3-Col) */}
          <main className="lg:col-span-9 space-y-12">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center border border-[#E5E5E5] bg-[#FAFAFA] space-y-4">
                <p className="text-sm font-mono-tech uppercase tracking-wider text-[#52525B]">
                  No archival garments match the current parameter combination.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="bg-[#000000] text-[#FFFFFF] px-6 py-3 text-xs font-mono-tech uppercase tracking-widest"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 px-3 md:px-0">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination matching Mockup */}
            <div className="pt-8 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech uppercase">
              <span className="text-[#71717A]">
                Showing 1-{filteredProducts.length} of {filteredProducts.length} available
              </span>

              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 border border-[#E5E5E5] text-[#A1A1AA] hover:text-[#000000] hover:border-[#000000]">
                  PREV
                </button>
                <button className="px-3 py-1.5 border border-[#000000] bg-[#000000] text-[#FFFFFF] font-bold">
                  1
                </button>
                <button className="px-3 py-1.5 border border-[#E5E5E5] text-[#52525B] hover:border-[#000000]">
                  2
                </button>
                <button className="px-3 py-1.5 border border-[#E5E5E5] text-[#52525B] hover:border-[#000000]">
                  3
                </button>
                <button className="px-3 py-1.5 border border-[#E5E5E5] text-[#52525B] hover:border-[#000000]">
                  NEXT
                </button>
              </div>

              <button className="text-[10px] font-mono-tech uppercase tracking-widest underline hover:text-[#000000]">
                Requisition Next Page (9)
              </button>
            </div>
          </main>
        </div>

        {/* Bottom Bespoke Alterations CTA Banner */}
        <div className="mt-16 sm:mt-20 border border-[#E5E5E5] bg-[#FAFAFA] p-6 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="text-[9px] font-mono-tech uppercase tracking-[0.3em] text-[#71717A] block">
              PRIVATE ATELIER DISPATCH
            </span>
            <h3 className="font-serif-luxury font-bold text-2xl sm:text-3xl uppercase tracking-tight text-[#0D0D0D]">
              Need Bespoke Proportion Alterations?
            </h3>
            <p className="text-xs font-mono-tech uppercase text-[#52525B] leading-relaxed">
              Our Regent Atelier accommodates dimensional custom grading for every archival
              silhouette upon request.
            </p>
          </div>

          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="w-full sm:w-auto bg-[#000000] text-[#FFFFFF] px-8 py-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold hover:bg-[#27272A] transition-colors rounded-none shrink-0"
          >
            Schedule Atelier Consultation
          </button>
        </div>
      </div>

      {/* Floating Bottom Filter & Sort Button on Mobile */}
      <button
        type="button"
        onClick={() => setMobileFilterOpen(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 border border-[#000000] bg-[#000000] text-[#FFFFFF] px-6 py-3.5 shadow-2xl text-xs font-mono-tech uppercase font-bold tracking-widest active:scale-95 rounded-full"
        aria-label="Filter and Sort"
      >
        <span>Filter & Sort ⚙️</span>
        {activeFiltersCount > 0 && (
          <span className="w-5 h-5 bg-[#FFFFFF] text-[#000000] rounded-full flex items-center justify-center text-[10px] font-bold">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Mobile Slide-Up Bottom Drawer for Filter & Sort */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          <div
            className="fixed inset-0 bg-[#000000]/65 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-full max-h-[85vh] bg-[#FFFFFF] rounded-t-2xl shadow-2xl flex flex-col justify-between z-10 overflow-hidden border-t-2 border-[#000000] animate-in slide-in-from-bottom duration-300">
            {/* Top Bar with Drag Handle and Close */}
            <div className="pt-2.5 pb-2 bg-[#FAFAFA] border-b border-[#E5E5E5] flex flex-col items-center">
              <div className="w-12 h-1 bg-[#A1A1AA] rounded-full mb-2" />
              <div className="w-full px-5 flex items-center justify-between">
                <span className="text-xs font-mono-tech uppercase font-bold tracking-widest">
                  FILTER & SORT ⚙️
                </span>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-9 h-9 flex items-center justify-center text-[#0D0D0D]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {/* Sort selector inside bottom drawer */}
              <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
                <span className="text-xs font-mono-tech uppercase font-bold block">
                  Sort Order
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2.5 border border-[#E5E5E5] bg-[#FFFFFF] text-xs font-mono-tech uppercase text-[#0D0D0D] focus:outline-none"
                >
                  <option value="featured">CURATED / FEATURED</option>
                  <option value="price-asc">PRICE: ASCENDING</option>
                  <option value="price-desc">PRICE: DESCENDING</option>
                  <option value="name">ALPHABETICAL</option>
                </select>
              </div>

              {filterSidebarContent}
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-4 border-t border-[#E5E5E5] bg-[#FFFFFF]">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#000000] text-[#FFFFFF] py-4 text-xs font-mono-tech uppercase tracking-widest font-bold"
              >
                Apply Parameters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFFFF]" />}>
      <CatalogContent />
    </Suspense>
  );
}
