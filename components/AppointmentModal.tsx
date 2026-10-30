'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { X, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const ATELIERS = [
  { city: 'PARIS', address: '18 Place Vendôme, 75001 Paris' },
  { city: 'LONDON', address: '42 Regent Street, Mayfair, London' },
  { city: 'MILAN', address: 'Via Montenapoleone 8, 20121 Milano' },
];

const SERVICES = [
  'PRIVATE ARCHIVE VIEWING & TRY-ON',
  'BESPOKE PROPORTION & ALTERATIONS',
  'VAULT SPECIMEN CONFIDENTIAL ACQUISITION',
];

export default function AppointmentModal() {
  const { isAppointmentModalOpen, setIsAppointmentModalOpen, showNotification } = useShop();

  const [selectedCity, setSelectedCity] = useState('PARIS');
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState('2026-11-05');
  const [selectedTime, setSelectedTime] = useState('14:00 CET');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isAppointmentModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName && clientEmail) {
      setIsBooked(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#000000', '#5A5A5A', '#E5E5E5'],
        });
      } catch {}
      showNotification(`CONFIDENTIAL APPOINTMENT CONFIRMED FOR ${clientName.toUpperCase()}`);
    }
  };

  const handleClose = () => {
    setIsAppointmentModalOpen(false);
    setIsBooked(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#0D0D0D] shadow-2xl p-6 sm:p-10 z-10 text-[#0D0D0D] rounded-none max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-[#E5E5E5]">
            <div>
              <span className="text-[9px] font-mono-tech uppercase tracking-[0.25em] text-[#737373] block mb-1">
                ALLURE ATELIER CONCIERGE
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl tracking-tight uppercase">
                Private Archive Viewing
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1 text-[#0D0D0D] hover:opacity-70 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isBooked ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#000000] text-[#FFFFFF] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxury text-2xl text-[#0D0D0D] uppercase">
                Appointment Registered
              </h4>
              <p className="text-xs font-mono-tech uppercase tracking-wider text-[#5A5A5A] max-w-md mx-auto">
                Your private archive session in {selectedCity} has been requisitioned for {clientName}.
                A concierge invitation and access code have been dispatched to {clientEmail}.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="bg-[#000000] text-[#FFFFFF] px-8 py-3 text-xs font-mono-tech uppercase tracking-widest hover:bg-[#262626]"
                >
                  Return to Archive
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pt-6 space-y-6">
              {/* Atelier Location Selection */}
              <div>
                <label className="block text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#737373] mb-2">
                  1. Select Flagship Atelier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ATELIERS.map((atelier) => (
                    <button
                      type="button"
                      key={atelier.city}
                      onClick={() => setSelectedCity(atelier.city)}
                      className={`p-3 text-left border transition-colors ${
                        selectedCity === atelier.city
                          ? 'border-[#000000] bg-[#000000] text-[#FFFFFF]'
                          : 'border-[#E5E5E5] bg-[#F9F9F9] text-[#0D0D0D] hover:border-[#000000]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-mono-tech font-bold uppercase">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{atelier.city}</span>
                      </div>
                      <span className="block text-[9px] font-mono-tech mt-1 opacity-80 truncate">
                        {atelier.address}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#737373] mb-2">
                  2. Consultation Scope
                </label>
                <div className="space-y-2">
                  {SERVICES.map((srv) => (
                    <label
                      key={srv}
                      className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${
                        selectedService === srv
                          ? 'border-[#000000] bg-[#F9F9F9]'
                          : 'border-[#E5E5E5] hover:border-[#B0B0B0]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        checked={selectedService === srv}
                        onChange={() => setSelectedService(srv)}
                        className="accent-[#000000]"
                      />
                      <span className="text-xs font-mono-tech uppercase font-medium">{srv}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#737373] mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#F9F9F9] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase text-[#0D0D0D] focus:outline-none focus:border-[#000000]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#737373] mb-2">
                    Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#F9F9F9] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase text-[#0D0D0D] focus:outline-none focus:border-[#000000]"
                  >
                    <option value="11:00 CET">11:00 (Private Morning Salon)</option>
                    <option value="14:00 CET">14:00 (Afternoon Archive Session)</option>
                    <option value="16:30 CET">16:30 (Bespoke Alteration Slot)</option>
                    <option value="19:00 CET">19:00 (Evening VIP Viewing)</option>
                  </select>
                </div>
              </div>

              {/* Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#737373] mb-2">
                    Client Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.G. ALEXANDER VANCE"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#F9F9F9] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase text-[#0D0D0D] focus:outline-none focus:border-[#000000]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#737373] mb-2">
                    Confidential Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="VANCE@ATELIER.COM"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-[#F9F9F9] border border-[#E5E5E5] p-3 text-xs font-mono-tech uppercase text-[#0D0D0D] focus:outline-none focus:border-[#000000]"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#000000] text-[#FFFFFF] py-4 text-xs font-mono-tech uppercase tracking-[0.25em] font-semibold hover:bg-[#262626] transition-colors"
                >
                  Confirm Requisition for Private Salon
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
