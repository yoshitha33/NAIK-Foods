import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, ShieldCheck, Truck, RefreshCw, Send } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Thank you for subscribing to Naik Foods newsletter!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-10 border-t-4 border-[#F28C28]">
      {/* Trust Highlights Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 pb-12 border-b border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#FFF3E0] text-[#F28C28] flex items-center justify-center mb-3">
            <Heart className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-gray-100">100% Authentic Recipe</h4>
          <p className="text-xs text-gray-400 mt-1">Heritage Maharashtrian flavors</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-gray-100">Zero Artificial Preservatives</h4>
          <p className="text-xs text-gray-400 mt-1">Handcrafted with pure oil & spices</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#FFF3E0] text-[#F28C28] flex items-center justify-center mb-3">
            <Truck className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-gray-100">Express All-India Shipping</h4>
          <p className="text-xs text-gray-400 mt-1">Free delivery above ₹999</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-3">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-gray-100">Fresh Batch Guarantee</h4>
          <p className="text-xs text-gray-400 mt-1">Small batch woodfire preparation</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-2.5 rounded-xl inline-block">
              <BrandLogo />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Naik Foods brings the authentic food culture, traditional recipes, crispy snacks, oil-cured pickles, and festive sweets of Maharashtra directly from traditional kitchens to your doorstep across India.
            </p>
            <div className="pt-2 text-xs text-gray-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F28C28]" />
                <span>Dadashri Heights, Ranade Road, Dadar West, Mumbai 400028</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2E7D32]" />
                <span>+91 (022) 2430 9800 | +91 98200 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F28C28]" />
                <span>support@naikfoods.in</span>
              </div>
            </div>
          </div>

          {/* Quick Shop */}
          <div>
            <h4 className="font-heritage text-lg font-bold text-[#F28C28] mb-4">Shop Regional</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li><Link to="/store/snacks-namkeen" className="hover:text-[#F28C28] transition-colors">Snacks & Namkeen</Link></li>
              <li><Link to="/store/pickles-condiments" className="hover:text-[#F28C28] transition-colors">Pickles & Lonche</Link></li>
              <li><Link to="/store/sweets-bakery" className="hover:text-[#F28C28] transition-colors">Sweets & Modak Mix</Link></li>
              <li><Link to="/store/spices-masalas" className="hover:text-[#F28C28] transition-colors">Kolhapuri Masalas</Link></li>
              <li><Link to="/festival" className="hover:text-[#F28C28] transition-colors">Festival Gift Boxes</Link></li>
              <li><Link to="/store?sort=popular" className="hover:text-[#F28C28] transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-heritage text-lg font-bold text-[#2E7D32] mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li><Link to="/track-order" className="hover:text-[#2E7D32] transition-colors">Track Your Order</Link></li>
              <li><Link to="/faq" className="hover:text-[#2E7D32] transition-colors">Help & FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-[#2E7D32] transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-[#2E7D32] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="hover:text-[#2E7D32] transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#2E7D32] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#2E7D32] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heritage text-lg font-bold text-[#F28C28] mb-4">Stay Connected</h4>
            <p className="text-xs text-gray-400 mb-4">
              Subscribe to get traditional festive recipe guides, new snack alerts & exclusive discount coupons.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-3 pr-10 py-2.5 text-xs bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-[#F28C28]"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#F28C28] hover:bg-[#E07B18] text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Naik Foods India Pvt. Ltd. All rights reserved. Crafted with Pride in Maharashtra.</p>
          <div className="flex items-center gap-4 text-gray-400 font-semibold">
            <span>Razorpay Secured</span>
            <span>•</span>
            <span>FSSAI Certified</span>
            <span>•</span>
            <span>UPI / NetBanking / COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
