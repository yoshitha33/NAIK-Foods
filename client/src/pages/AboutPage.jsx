import React from 'react';
import { ShieldCheck, Heart, Award, Sparkles, MapPin, Flame, Utensils, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#FFF3E0] via-[#FFF8F0] to-[#FFF8F0] p-8 sm:p-16 rounded-3xl border border-[#F28C28]/20 text-center space-y-4 relative overflow-hidden">
        <span className="text-xs font-bold text-[#F28C28] uppercase tracking-widest bg-white px-3.5 py-1.5 rounded-full border border-[#F28C28]/30 shadow-2xs inline-block">
          Authentic Maharashtra Heritage
        </span>
        <h1 className="font-heritage text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
          Three Decades of Uncompromised Taste
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
          From rural household kitchens in Western Maharashtra to modern homes nationwide, Naik Foods represents a sacred commitment to pure ingredients, woodfire roasting, and uncompromised food heritage.
        </p>
      </div>

      {/* Process Pillars: How We Make Food */}
      <div className="space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest">
            The Naik Foods Standard
          </span>
          <h2 className="font-heritage text-3xl font-extrabold text-gray-900">
            How We Craft Our Delicacies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-3 relative group hover:border-[#F28C28] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] text-[#F28C28] flex items-center justify-center font-heritage font-bold text-lg">
              01
            </div>
            <h3 className="font-heritage text-xl font-bold text-gray-900">Selective Sourcing</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We source raw Ambemohar rice, Solapur peanuts, and Konkan Byadgi chilies directly from regional farm cooperatives.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-3 relative group hover:border-[#2E7D32] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center font-heritage font-bold text-lg">
              02
            </div>
            <h3 className="font-heritage text-xl font-bold text-gray-900">Woodfire Grain Roasting</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Grains are individually roasted on slow woodfire flames to unlock natural aroma and digestive lightness.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-3 relative group hover:border-[#F28C28] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] text-[#F28C28] flex items-center justify-center font-heritage font-bold text-lg">
              03
            </div>
            <h3 className="font-heritage text-xl font-bold text-gray-900">Stone-Ground Spicing</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Spices are stone-ground in traditional mortar mills to preserve essential oils without heat degradation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-3 relative group hover:border-[#2E7D32] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center font-heritage font-bold text-lg">
              04
            </div>
            <h3 className="font-heritage text-xl font-bold text-gray-900">Vacuum Sealed Fresh</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sealed in multi-layer food-grade foil to guarantee crunchiness for up to 6 months without preservatives.
            </p>
          </div>
        </div>
      </div>

      {/* Founder Narrative Banner */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2D1B00] text-white p-8 sm:p-14 rounded-3xl space-y-6 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-[#F28C28] uppercase tracking-widest block">
            A Letter From Our Culinary Founder
          </span>
          <h2 className="font-heritage text-3xl sm:text-4xl font-bold text-white">
            "Food is Not Just Taste; It is Cultural Memory."
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic">
            "When we founded Naik Foods, our goal was simple — to ensure that no Maharashtrian living anywhere in India ever misses the authentic taste of homemade thalipeeth, spicy Kolhapuri rassa, or Diwali Chakali. Every pouch we send carries the warmth of our heritage kitchens."
          </p>
          <div className="pt-2">
            <h5 className="font-bold text-white text-sm">Siddharth & Aniket Naik</h5>
            <span className="text-xs text-gray-400">Founders, Naik Foods India</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-[#FFF3E0] p-8 rounded-3xl border border-[#F28C28]/30 text-center space-y-4">
        <h3 className="font-heritage text-3xl font-bold text-gray-900">Experience Genuine Maharashtra Flavours</h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
          Explore our range of handcrafted snacks, oil pickles, sweet puran mixes, and Kolhapuri masalas.
        </p>
        <Link
          to="/store"
          className="px-8 py-3.5 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-xs rounded-2xl shadow-md inline-flex items-center gap-2"
        >
          <span>Shop Delicacies Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
