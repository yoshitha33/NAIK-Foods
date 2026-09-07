import React from 'react';
import { Truck, Sparkles } from 'lucide-react';

export const AnnouncementBar = () => {
  return (
    <div className="bg-[#F28C28] text-white text-xs md:text-sm font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 tracking-wide shadow-xs">
      <Sparkles className="w-4 h-4 animate-pulse hidden sm:inline" />
      <span>🎉 FREE Delivery on All Orders Above ₹999 | Use Code <span className="underline decoration-wavy underline-offset-2">NAIK100</span> for ₹100 OFF</span>
      <Truck className="w-4 h-4 hidden sm:inline" />
    </div>
  );
};
