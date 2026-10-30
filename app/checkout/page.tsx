'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, formatPrice } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'white-glove'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'wire'>('card');
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const shippingCost = shippingMethod === 'white-glove' ? 45 : 0;
  const grandTotal = cartTotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeOrder = `ALR-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(fakeOrder);
    setIsCompleted(true);
    clearCart();

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#000000', '#5A5A5A', '#E5E5E5'],
      });
    } catch {}
  };

  if (isCompleted) {
    return (
      <div className="bg-[#FFFFFF] text-[#0D0D0D] min-h-[85vh] flex items-center justify-center p-4">
        <div className="max-w-xl w-full border border-[#0D0D0D] bg-[#FAFAFA] p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 bg-[#000000] text-[#FFFFFF] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-[#737373] block">
            REQUISITION DISPATCH CONFIRMED
          </span>

          <h1 className="font-serif-luxury text-3xl sm:text-4xl uppercase tracking-tight text-[#0D0D0D]">
            Order {orderNumber}
          </h1>

          <p className="text-xs font-mono-tech uppercase tracking-wider text-[#5A5A5A] leading-relaxed max-w-md mx-auto">
            Your archival garments are being prepared under strict temperature-controlled storage
            at our Paris fulfillment atelier. A certificate of provenance and tracking dossier
            have been transmitted to <strong>{email || 'your email'}</strong>.
          </p>

          <div className="pt-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-[#000000] text-[#FFFFFF] px-8 py-3.5 text-xs font-mono-tech uppercase tracking-widest hover:bg-[#262626]"
            >
              Return to Allure Atelier
            </Link>
            <Link
              href="/catalog"
              className="border border-[#000000] text-[#000000] px-8 py-3.5 text-xs font-mono-tech uppercase tracking-widest hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors"
            >
              Browse Archives
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#FFFFFF] text-[#0D0D0D] min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="font-serif-luxury text-2xl uppercase tracking-tight">
            Your Requisition Bag Is Empty
          </h2>
          <p className="text-xs font-mono-tech uppercase text-[#737373]">
            Select garments from the collection to proceed with archival checkout.
          </p>
          <Link
            href="/catalog"
            className="inline-block bg-[#000000] text-[#FFFFFF] px-8 py-3.5 text-xs font-mono-tech uppercase tracking-widest"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] text-[#0D0D0D] min-h-screen border-b border-[#E5E5E5]">
      {/* Checkout Minimal Header */}
      <div className="border-b border-[#E5E5E5] py-6 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="font-serif-luxury text-2xl tracking-[0.2em] uppercase">
            ALLURE <span className="text-xs font-mono-tech text-[#737373]">CHECKOUT</span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-mono-tech uppercase text-[#737373]">
            <Lock className="w-3.5 h-3.5 text-[#000000]" />
            <span>256-BIT ENCRYPTED ARCHIVAL PROTOCOL</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Checkout Steps */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Client Identity */}
            <div className="border border-[#E5E5E5] p-6 bg-[#FAFAFA] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
                <span className="text-xs font-mono-tech uppercase tracking-widest font-bold">
                  01 // Client Identification
                </span>
                <span className="text-[10px] font-mono-tech text-[#737373]">STEP 1 OF 3</span>
              </div>
              <div>
                <label className="block text-[10px] font-mono-tech uppercase tracking-widest text-[#737373] mb-1.5">
                  Email Address for Archival Dispatch
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
            </div>

            {/* 2. Destination */}
            <div className="border border-[#E5E5E5] p-6 bg-[#FAFAFA] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
                <span className="text-xs font-mono-tech uppercase tracking-widest font-bold">
                  02 // Delivery Destination
                </span>
                <span className="text-[10px] font-mono-tech text-[#737373]">STEP 2 OF 3</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase tracking-widest text-[#737373] mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ALEXANDER"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase focus:border-[#000000] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase tracking-widest text-[#737373] mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VANCE"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase focus:border-[#000000] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono-tech uppercase tracking-widest text-[#737373] mb-1.5">
                  Street Address & Residence
                </label>
                <input
                  type="text"
                  required
                  placeholder="740 PARK AVENUE, APT 14B"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase focus:border-[#000000] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase tracking-widest text-[#737373] mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="NEW YORK"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase focus:border-[#000000] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase tracking-widest text-[#737373] mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="10021"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase focus:border-[#000000] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase tracking-widest text-[#737373] mb-1.5">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase focus:border-[#000000] focus:outline-none"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Japan">Japan</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Courier Logistics */}
            <div className="border border-[#E5E5E5] p-6 bg-[#FAFAFA] space-y-4">
              <span className="text-xs font-mono-tech uppercase tracking-widest font-bold block border-b border-[#E5E5E5] pb-3">
                03 // Courier Logistics
              </span>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                    shippingMethod === 'standard'
                      ? 'border-[#000000] bg-[#FFFFFF]'
                      : 'border-[#E5E5E5] hover:border-[#A3A3A3]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-[#000000]"
                    />
                    <div>
                      <span className="text-xs font-mono-tech font-bold uppercase block">
                        Complimentary Archival Vault Courier
                      </span>
                      <span className="text-[10px] font-mono-tech text-[#737373] uppercase">
                        2-4 Business Days • Temperature-Controlled & Sealed
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono-tech font-bold uppercase">FREE</span>
                </label>

                <label
                  onClick={() => setShippingMethod('white-glove')}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                    shippingMethod === 'white-glove'
                      ? 'border-[#000000] bg-[#FFFFFF]'
                      : 'border-[#E5E5E5] hover:border-[#A3A3A3]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'white-glove'}
                      onChange={() => setShippingMethod('white-glove')}
                      className="accent-[#000000]"
                    />
                    <div>
                      <span className="text-xs font-mono-tech font-bold uppercase block">
                        White-Glove Private Courier (Paris / London / NYC Metro)
                      </span>
                      <span className="text-[10px] font-mono-tech text-[#737373] uppercase">
                        Same-Day Hand Delivery by Atelier Associate
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono-tech font-bold uppercase">$45 USD</span>
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full bg-[#000000] text-[#FFFFFF] py-4 text-xs font-mono-tech uppercase tracking-[0.25em] font-semibold hover:bg-[#262626] transition-colors rounded-none flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Authorize Archival Requisition ({formatPrice(grandTotal)})</span>
            </button>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-[#E5E5E5] p-6 bg-[#FAFAFA] space-y-6">
              <span className="text-xs font-mono-tech uppercase tracking-widest font-bold block border-b border-[#E5E5E5] pb-3">
                Requisition Summary ({cart.length} Silhouettes)
              </span>

              {/* Items List */}
              <div className="space-y-4 max-h-96 overflow-y-auto divide-y divide-[#E5E5E5]">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                    className="pt-4 first:pt-0 flex gap-4"
                  >
                    <img
                      src={item.product.images.front}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover bg-[#FFFFFF] border border-[#E5E5E5]"
                    />
                    <div className="flex-1">
                      <span className="text-[9px] font-mono-tech text-[#737373] uppercase">
                        {item.product.refCode}
                      </span>
                      <h4 className="text-xs font-serif-luxury text-[#0D0D0D] uppercase">
                        {item.product.name}
                      </h4>
                      <div className="text-[10px] font-mono-tech text-[#5A5A5A] uppercase mt-0.5">
                        QTY: {item.quantity} • SIZE: {item.selectedSize}
                      </div>
                      <span className="text-xs font-mono-tech font-bold text-[#0D0D0D] block mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="pt-4 border-t border-[#E5E5E5] space-y-2 text-xs font-mono-tech uppercase">
                <div className="flex justify-between text-[#5A5A5A]">
                  <span>Silhouettes Subtotal:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[#5A5A5A]">
                  <span>Courier Logistics:</span>
                  <span>{shippingCost === 0 ? 'COMPLIMENTARY' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-[#5A5A5A]">
                  <span>Duties & Tariffs:</span>
                  <span>PRE-CALCULATED</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0D0D0D] pt-2 border-t border-[#E5E5E5]">
                  <span>Requisition Valuation:</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
