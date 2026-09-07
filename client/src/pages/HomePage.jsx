import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  Star,
  Gift,
  Award,
  ChevronRight,
  ChevronLeft,
  Flame
} from 'lucide-react';

import { ProductCard } from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/common/SkeletonLoader';
import { fetchProducts, fetchCategories, fetchGiftBoxes, fetchBlogs } from '../services/api';
import { useCart } from '../context/CartContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

/* ─── BEST SELLERS CAROUSEL ────────────────────────────────── */
const BestSellersCarousel = ({ bestSellers, loading }) => {
  const trackRef = useRef(null);
  const autoRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Card width + gap (matches CSS below)
  const CARD_W = 288; // px — matches min-w in JSX
  const GAP = 24;     // gap-6 = 24px

  const total = bestSellers.length;

  const scrollTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, total - 1));
    setActiveIdx(clamped);
    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: clamped * (CARD_W + GAP),
        behavior: 'smooth',
      });
    }
  }, [total]);

  const prev = useCallback(() => scrollTo(activeIdx - 1), [activeIdx, scrollTo]);
  const next = useCallback(() => scrollTo(activeIdx + 1 >= total ? 0 : activeIdx + 1), [activeIdx, total, scrollTo]);

  // Auto-slide every 3 s
  useEffect(() => {
    if (loading || total === 0) return;
    autoRef.current = setInterval(() => {
      setActiveIdx(prev => {
        const next = prev + 1 >= total ? 0 : prev + 1;
        if (trackRef.current) {
          trackRef.current.scrollTo({ left: next * (CARD_W + GAP), behavior: 'smooth' });
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(autoRef.current);
  }, [loading, total]);

  // Pause auto on user interaction
  const pauseAuto = () => clearInterval(autoRef.current);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-[#F28C28]" />
            <span className="text-xs font-bold text-[#F28C28] uppercase tracking-widest">
              Customer Favorites
            </span>
          </div>
          <h2 className="font-heritage text-3xl sm:text-4xl font-bold text-gray-900">
            Maharashtra Best Sellers
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {/* Prev / Next Arrows */}
          <button
            onClick={() => { pauseAuto(); prev(); }}
            disabled={activeIdx === 0}
            className="w-10 h-10 rounded-full border-2 border-[#F28C28]/40 flex items-center justify-center text-[#F28C28] hover:bg-[#F28C28] hover:text-white hover:border-[#F28C28] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => { pauseAuto(); next(); }}
            disabled={activeIdx >= total - 1}
            className="w-10 h-10 rounded-full border-2 border-[#F28C28]/40 flex items-center justify-center text-[#F28C28] hover:bg-[#F28C28] hover:text-white hover:border-[#F28C28] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <Link
            to="/store?sort=popular"
            className="text-xs font-bold text-[#F28C28] hover:text-[#E07B18] flex items-center gap-1 group ml-2"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Carousel Track */}
      <div className="relative">
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FFF8F0] to-transparent z-10 pointer-events-none" />
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FFF8F0] to-transparent z-10 pointer-events-none" />

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="min-w-[288px] h-80 bg-white rounded-2xl animate-pulse border border-gray-100 flex-shrink-0" />
            ))}
          </div>
        ) : (
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
            onMouseEnter={pauseAuto}
            onMouseLeave={() => {
              autoRef.current = setInterval(() => {
                setActiveIdx(prev => {
                  const nxt = prev + 1 >= total ? 0 : prev + 1;
                  if (trackRef.current) {
                    trackRef.current.scrollTo({ left: nxt * (CARD_W + GAP), behavior: 'smooth' });
                  }
                  return nxt;
                });
              }, 3000);
            }}
          >
            {bestSellers.map((product, idx) => (
              <motion.div
                key={product._id}
                className="flex-shrink-0"
                style={{ minWidth: `${CARD_W}px`, scrollSnapAlign: 'start' }}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.07, ease: 'easeOut' }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Dot indicators */}
      {!loading && total > 0 && (
        <div className="flex justify-center gap-2 mt-5">
          {bestSellers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { pauseAuto(); scrollTo(idx); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIdx
                  ? 'bg-[#F28C28] w-6'
                  : 'bg-gray-300 hover:bg-[#F28C28]/50 w-2'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
/* ─────────────────────────────────────────────────────────── */

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    subtotal,
    freeDeliveryProgress,
    remainingForFreeDelivery,
    isFreeDeliveryUnlocked,
    FREE_DELIVERY_THRESHOLD
  } = useCart();

  const { recentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadHomeData = async () => {
      setLoading(true);
      try {
        const [cats, prods, gifts, blogList] = await Promise.all([
          fetchCategories(),
          fetchProducts({ limit: 12 }),
          fetchGiftBoxes(),
          fetchBlogs()
        ]);
        if (isMounted) {
          setCategories(cats);
          setBestSellers(prods.products.filter((p) => p.isBestSeller).slice(0, 8));
          setFeaturedProducts(prods.products.filter((p) => p.isFeatured).slice(0, 4));
          setGiftBoxes(gifts);
          setBlogs(blogList.slice(0, 3));
        }
      } catch (err) {
        console.warn('Error loading home data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadHomeData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF3E0]/70 via-[#FFF8F0] to-[#FFF8F0] pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F28C28]/30 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#F28C28]" />
                <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider">
                  Authentic Regional Food Brand
                </span>
              </div>

              <h1 className="font-heritage text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15]">
                The Taste of <span className="text-[#F28C28]">Maharashtra</span>, Delivered Home.
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Discover authentic Chakali, stone-ground pickles, spicy Kolhapuri masalas, puran poli mixes, and traditional snacks crafted from grandmother’s heritage recipes.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/store"
                  className="w-full sm:w-auto px-8 py-4 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-base rounded-2xl shadow-lg shadow-[#F28C28]/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Shop Delicacies Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/about"
                  className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#FFF8F0] border border-gray-200 text-gray-800 font-bold text-base rounded-2xl transition-colors text-center"
                >
                  Explore Our Story
                </Link>
              </div>

              {/* Badges Bar */}
              <div className="pt-8 border-t border-gray-200/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <h4 className="font-heritage text-2xl font-extrabold text-[#2E7D32]">100%</h4>
                  <p className="text-xs text-gray-500 font-medium">Authentic Recipes</p>
                </div>
                <div>
                  <h4 className="font-heritage text-2xl font-extrabold text-[#F28C28]">50,000+</h4>
                  <p className="text-xs text-gray-500 font-medium">Happy Families</p>
                </div>
                <div>
                  <h4 className="font-heritage text-2xl font-extrabold text-[#2E7D32]">4.9 ★</h4>
                  <p className="text-xs text-gray-500 font-medium">Verified Customer Rating</p>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1000&auto=format&fit=crop&q=80"
                    alt="Authentic Maharashtrian Snacks & Spices"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating Highlight Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3.5 max-w-xs">
                  <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">Fresh Woodfire Batches</h5>
                    <p className="text-xs text-gray-500">Pure cold-pressed oil & spices</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MAHARASHTRA STORY SECTION */}
      <section className="bg-gradient-to-r from-[#1A1A1A] to-[#2D1B00] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#F28C28] uppercase tracking-widest block">
                Heritage & Culture
              </span>
              <h2 className="font-heritage text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                From Maharashtra, With Tradition
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                For over three decades, Naik Foods has preserved the sacred culinary secrets of rural Maharashtrian households. From hand-pressed Chakali spirals roasted over low flames to sun-cured Byadgi chili seafood pickles, every product tells a story of authentic regional heritage.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-200 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                  <span>Woodfire Grain Roasting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F28C28]" />
                  <span>Stone-Ground Spices</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F28C28]" />
                  <span>Cold Pressed Oils</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                  <span>No Artificial Colors</span>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-sm rounded-xl transition-all shadow-md"
                >
                  <span>Discover Our Heritage Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1614777986387-015c2a89b696?w=600&auto=format&fit=crop&q=80"
                  alt="Traditional Pickle"
                  className="w-full h-56 sm:h-72 object-cover rounded-2xl border-2 border-gray-700"
                />
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80"
                  alt="Kolhapuri Masala Spices"
                  className="w-full h-56 sm:h-72 object-cover rounded-2xl border-2 border-gray-700 mt-6"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREE DELIVERY PROMOTION & DYNAMIC PROGRESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF3E0] rounded-3xl p-6 sm:p-10 border border-[#F28C28]/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-[#2E7D32] rounded-full text-xs font-extrabold uppercase tracking-wide">
              <Truck className="w-4 h-4" />
              <span>Express Nationwide Delivery</span>
            </div>
            <h3 className="font-heritage text-2xl sm:text-3xl font-bold text-gray-900">
              Enjoy FREE DELIVERY on orders above ₹{FREE_DELIVERY_THRESHOLD}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
              Currently cart value: <span className="font-extrabold text-gray-900">₹{subtotal}</span>.{' '}
              {isFreeDeliveryUnlocked ? (
                <span className="text-[#2E7D32] font-bold">Congratulations! Free Shipping is unlocked for your order.</span>
              ) : (
                <span>Add <span className="font-extrabold text-[#F28C28]">₹{remainingForFreeDelivery}</span> more delicacies to unlock free delivery!</span>
              )}
            </p>

            <div className="w-full max-w-md bg-white h-3 rounded-full overflow-hidden p-0.5 border border-[#F28C28]/30">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFreeDeliveryUnlocked ? 'bg-[#2E7D32]' : 'bg-[#F28C28]'
                }`}
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => navigate('/store')}
            className="px-8 py-4 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-sm rounded-2xl shadow-md shadow-[#F28C28]/20 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span>Start Shopping Delicacies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. FESTIVAL & GIFT BOXES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F28C28] uppercase tracking-widest">
            <Gift className="w-4 h-4" />
            <span>Gifting & Celebrations</span>
          </div>
          <h2 className="font-heritage text-3xl sm:text-4xl font-bold text-gray-900">
            Celebrate With Naik Foods Gift Boxes
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Royal gifting trunks for Diwali, Ganesh Chaturthi, Gudi Padwa, and Corporate Celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {giftBoxes.map((gift) => (
            <div
              key={gift._id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col sm:flex-row group"
            >
              <div className="sm:w-1/2 aspect-square sm:aspect-auto">
                <img
                  src={gift.thumbnail}
                  alt={gift.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFF3E0] text-[#F28C28] px-2.5 py-1 rounded-md">
                    {gift.festival}
                  </span>
                  <h3 className="font-heritage text-xl font-bold text-gray-900 mt-2">{gift.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{gift.description}</p>
                </div>

                <div className="space-y-1 text-xs text-gray-600 bg-[#FFF8F0] p-3 rounded-xl">
                  <span className="font-bold text-gray-800">Box Contains ({gift.itemCount} Items):</span>
                  <ul className="list-disc list-inside text-[11px] space-y-0.5 text-gray-500">
                    {gift.includedItems.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="truncate">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-lg font-extrabold text-gray-900">₹{gift.price}</span>
                    <span className="text-xs text-gray-400 line-through ml-2">₹{gift.mrp}</span>
                  </div>
                  <Link
                    to={`/festival/${gift.slug}`}
                    className="px-4 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    View Gift Box
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS & TRUST */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-widest">
              Loved Across Households
            </span>
            <h2 className="font-heritage text-3xl font-bold text-gray-900">
              What Food Lovers Say About Naik Foods
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFF8F0] border border-gray-100 space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                "The Corn Chakali reminded me of my grandmother’s house in Pune! Perfectly crisp, non-oily, and seasoned with authentic ajwain. Naik Foods is now our permanent tea snack brand."
              </p>
              <div>
                <h5 className="font-bold text-gray-900 text-xs">Priya Kulkarni</h5>
                <span className="text-[11px] text-gray-400">Verified Buyer • Mumbai</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFF8F0] border border-gray-100 space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                "Finding authentic Kolambi (Prawns) Lonche outside Konkan was impossible until I ordered from Naik Foods. Prawns are fresh, spicy, and mustard oil cure is spot on!"
              </p>
              <div>
                <h5 className="font-bold text-gray-900 text-xs">Rohit Sawant</h5>
                <span className="text-[11px] text-gray-400">Verified Buyer • Thane</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFF8F0] border border-gray-100 space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                "The Kolhapuri Kanda Lasun Masala gave my Misal Rassa the exact restaurant-style red tarragon color and woodfire aroma. Truly authentic ingredients!"
              </p>
              <div>
                <h5 className="font-bold text-gray-900 text-xs">Anagha Deshmukh</h5>
                <span className="text-[11px] text-gray-400">Verified Buyer • Pune</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOD STORIES & BLOGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold text-[#F28C28] uppercase tracking-widest block mb-1">
              Culinary Heritage Journal
            </span>
            <h2 className="font-heritage text-3xl font-bold text-gray-900">
              Food Stories & Recipes
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-xs font-bold text-[#F28C28] hover:text-[#E07B18] flex items-center gap-1"
          >
            <span>Read All Stories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#2E7D32] uppercase tracking-wider">
                    {blog.category} • {blog.readTime}
                  </span>
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-[#F28C28] transition-colors mt-1">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{blog.excerpt}</p>
                </div>
                <Link
                  to={`/blog/${blog.slug}`}
                  className="text-xs font-bold text-[#F28C28] flex items-center gap-1 pt-2"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
