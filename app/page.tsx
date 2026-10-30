'use client';

import React from 'react';
import Hero from '@/components/Hero';
import DepartmentGrid from '@/components/DepartmentGrid';
import VirtualClothingRack from '@/components/VirtualClothingRack';
import CuratedDrops from '@/components/CuratedDrops';
import EditorialManifesto from '@/components/EditorialManifesto';
import TryTheLookCarousel from '@/components/TryTheLookCarousel';
import OrbitSelector from '@/components/OrbitSelector';
import MaterialPermanence from '@/components/MaterialPermanence';
import PrivateAppointments from '@/components/PrivateAppointments';

export default function HomePage() {
  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* 1. Full-width Monochrome Hero Banner */}
      <Hero />

      {/* 2. The Archives by Department (4-column grid) */}
      <DepartmentGrid />

      {/* 3. Interactive Virtual Clothing Rack with Hanger Physics */}
      <VirtualClothingRack />

      {/* 4. Curated Seasonal Drops with Quick Filters */}
      <CuratedDrops />

      {/* 5. Dark-Mode Editorial Manifesto Block */}
      <EditorialManifesto />

      {/* 6. "Try the Look" Interactive Model Carousel & Hotspot Builder */}
      <TryTheLookCarousel />

      {/* 7. 3D Wheel / Orbit Product Selector for Footwear & Accessories */}
      <OrbitSelector />

      {/* 8. Material Permanence & Form (3-Column Textile Science) */}
      <MaterialPermanence />

      {/* 9. Private Archive Viewings & Appointments Section */}
      <PrivateAppointments />
    </div>
  );
}
