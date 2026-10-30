'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { Check } from 'lucide-react';

export default function ToastNotification() {
  const { notification } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-[#000000] text-[#FFFFFF] border border-[#333333] shadow-2xl px-5 py-3.5 flex items-center gap-3 text-xs font-mono-tech uppercase tracking-wider rounded-none pointer-events-auto"
          >
            <span className="w-5 h-5 bg-[#FFFFFF] text-[#000000] flex items-center justify-center font-bold">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
