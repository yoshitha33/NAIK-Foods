import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Gift,
  ArrowRight,
  Star,
  Package,
  Sparkles,
  CheckCircle2,
  Heart,
  Truck,
  Shield,
  Phone,
  ChevronRight,
  Flame,
  Award,
  ShoppingBag
} from 'lucide-react';
import { fetchGiftBoxes } from '../services/api';
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const FESTIVALS = [
  { name: 'Diwali', emoji: '🪔', desc: 'Brighten their festivities' },
  { name: 'Ganesh Chaturthi', emoji: '🐘', desc: 'Sacred traditional sweets' },
  { name: 'Holi', emoji: '🎨', desc: 'Colorful food celebration' },
  { name: 'Gudi Padwa', emoji: '🎋', desc: 'Maharashtrian New Year' },
  { name: 'Corporate Gifting', emoji: '🏢', desc: 'Impress your clients' },
  { name: 'Wedding Hampers', emoji: '💍', desc: 'Traditional gift baskets' },
];

const WHY_GIFT = [
  {
    icon: '🌾',
    title: '100% Authentic',
    desc: 'Every item is handcrafted using traditional Maharashtrian recipes passed down through generations.'
  },
  {
    icon: '📦',
    title: 'Premium Packaging',
    desc: 'Gold-embossed royal gift trunks with hand-tied silk ribbons and personalized greeting cards.'
  },
  {
    icon: '🚚',
    title: 'Pan-India Delivery',
    desc: 'Temperature-controlled packaging ensures freshness delivered anywhere across India within 3-5 days.'
  },
  {
    icon: '✍️',
    title: 'Personalized Cards',
    desc: 'Add your custom message in Marathi, Hindi or English — we handwrite it on premium ivory cards.'
  },
  {
    icon: '🎁',
    title: 'Custom Curation',
    desc: 'Call us to build a fully custom hamper based on recipient preferences and budget.'
  },
  {
    icon: '🏅',
    title: 'Award Winning',
    desc: 'Recognized as Best Regional Food Gift by Maharashtra Retail Excellence Awards 2025.'
  },
];

const TESTIMONIALS = [
  {
    name: 'Priya Kulkarni',
    city: 'Pune',
    rating: 5,
    text: 'Gifted the Utsav Box to my in-laws. They were absolutely thrilled! The packaging was royal and the Chakali quality is unmatched. Worth every rupee!'
  },
  {
    name: 'Rahul Mehta',
    city: 'Mumbai',
    rating: 5,
    text: 'Ordered 50 corporate gift boxes for Diwali. Every colleague loved them. The Prawns Pickle was the star — never seen it available commercially like this.'
  },
  {
    name: 'Ananya Desai',
    city: 'Nashik',
    rating: 5,
    text: 'The Konkan Coast box reminded me of my grandmother\'s kitchen. Authentic flavors in gorgeous packaging. Will definitely reorder for Christmas!'
  },
];

export const FestivalPage = () => {
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBox, setSelectedBox] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    const loadGifting = async () => {
      setLoading(true);
      const data = await fetchGiftBoxes();
      if (isMounted) {
        setGiftBoxes(data);
        setLoading(false);
        if (data.length > 0) setSelectedBox(data[0]);
      }
    };
    loadGifting();
    return () => { isMounted = false; };
  }, []);

  const popularGiftProducts = mockProducts.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="bg-[#FFF8F0] min-h-screen">

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0a00] via-[#3d1a00] to-[#5c2a00] text-white pt-16 pb-20 px-4">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F28C28]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeInUp} className="text-center space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-300 uppercase tracking-widest bg-white/10 backdrop-blur-sm border border-amber-400/30 px-4 py-2 rounded-full">
              <Gift className="w-4 h-4" />
              Festive &amp; Corporate Gifting Collection 2026
            </span>

            <h1 className="font-heritage text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
              Royal Maharashtra
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                Gift Trunks
              </span>
            </h1>

            <p className="text-sm sm:text-base text-amber-100/80 max-w-2xl mx-auto leading-relaxed">
              Share the soul of Maharashtra with exquisite handcrafted hampers. Each gift box is a curated journey through
              authentic regional flavors — from Diwali celebrations to corporate appreciation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="#gift-boxes"
                className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-orange-900/30 hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
              >
                <Gift className="w-4 h-4" />
                Explore Gift Boxes
              </a>
              <a
                href="tel:+919820012345"
                className="px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold text-sm rounded-2xl hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Custom Order Call
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs font-bold text-amber-200/80">
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-amber-400" /> Free shipping over ₹999</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-amber-400" /> 100% freshness guaranteed</span>
              <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-amber-400" /> Handcrafted with love</span>
            </div>
          </motion.div>
        </div>

        {/* Floating festival tags */}
        <div className="mt-10 overflow-x-auto pb-2">
          <div className="flex gap-3 justify-center px-4 min-w-max mx-auto">
            {FESTIVALS.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-center hover:bg-white/20 cursor-pointer transition-all"
              >
                <span className="text-2xl block">{f.emoji}</span>
                <span className="text-xs font-bold text-white block mt-1">{f.name}</span>
                <span className="text-[10px] text-amber-200/70">{f.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GIFT BOXES GRID ── */}
      <section id="gift-boxes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-3"
        >
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-[#F28C28] uppercase tracking-widest bg-[#FFF3E0] px-4 py-2 rounded-full border border-[#F28C28]/20">
            <Sparkles className="w-4 h-4" /> Curated Hamper Collections
          </span>
          <h2 className="font-heritage text-3xl sm:text-5xl font-extrabold text-gray-900">
            Choose Your Perfect Gift Box
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Every hamper is assembled by our artisan team in Pune, packed in eco-friendly golden-embossed trunks with a personalized note.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map(i => (
              <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {giftBoxes.map((gift, idx) => (
              <motion.div
                key={gift._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={gift.thumbnail}
                    alt={gift.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Festival badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full shadow-lg">
                      🎁 {gift.festival}
                    </span>
                  </div>

                  {/* Discount badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#2E7D32] text-white text-sm font-extrabold px-3 py-1.5 rounded-full shadow-lg">
                      {gift.discount}% OFF
                    </span>
                  </div>

                  {/* Price overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="font-heritage text-xl font-extrabold text-white leading-tight">
                        {gift.name}
                      </h3>
                      <p className="text-xs text-white/70 mt-0.5">{gift.itemCount} artisan products inside</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-amber-300">₹{gift.price}</div>
                      <div className="text-xs text-white/60 line-through">₹{gift.mrp}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                  <p className="text-sm text-gray-600 leading-relaxed">{gift.description}</p>

                  {/* Included Items */}
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                      What's Inside
                    </h4>
                    <div className="space-y-2">
                      {gift.includedItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />
                          <span className="font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Savings callout */}
                  <div className="bg-gradient-to-r from-[#FFF3E0] to-amber-50 border border-[#F28C28]/30 rounded-2xl px-4 py-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700">You save</span>
                    <span className="text-lg font-extrabold text-[#F28C28]">₹{gift.mrp - gift.price}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCart({ ...gift, images: gift.images, thumbnail: gift.thumbnail }, 1)}
                      className="flex-1 py-3 bg-gradient-to-r from-[#F28C28] to-orange-500 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-orange-200 hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <a
                      href="tel:+919820012345"
                      className="px-5 py-3 bg-gray-50 border border-gray-200 text-gray-700 font-bold text-sm rounded-2xl hover:border-[#F28C28] hover:text-[#F28C28] transition-all flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Customize
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Custom hamper CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-gradient-to-r from-[#1a0a00] to-[#3d1a00] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200')] opacity-10 bg-cover bg-center" />
          <div className="relative z-10 space-y-4">
            <span className="text-3xl">🎁</span>
            <h3 className="font-heritage text-2xl sm:text-4xl font-extrabold">
              Need a Custom Hamper?
            </h3>
            <p className="text-sm text-amber-100/80 max-w-xl mx-auto">
              Planning bulk corporate gifting or a special wedding hamper?
              Our gifting team will curate a bespoke box for any budget, any occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href="tel:+919820012345"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-400 text-[#1a0a00] font-extrabold text-sm rounded-2xl hover:bg-amber-300 transition-all"
              >
                <Phone className="w-4 h-4" />
                Call: +91 98200 12345
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 text-white font-bold text-sm rounded-2xl hover:bg-white/10 transition-all"
              >
                Send Enquiry <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── WHY GIFT NAIK FOODS ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 space-y-3"
          >
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-[#F28C28] uppercase tracking-widest bg-[#FFF3E0] px-4 py-2 rounded-full">
              <Award className="w-4 h-4" /> Why Choose Naik Foods Gifts
            </span>
            <h2 className="font-heritage text-3xl sm:text-5xl font-extrabold text-gray-900">
              A Gift That Tells a Story
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Our hampers aren't just products — they're a cultural experience. Here's what makes Naik Foods gifting extraordinary.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_GIFT.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#FFF8F0] rounded-2xl p-6 border border-[#F28C28]/10 hover:border-[#F28C28]/40 hover:shadow-lg transition-all group"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-bold text-base text-gray-900 mb-2 group-hover:text-[#F28C28] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR PRODUCTS TO ADD ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <span className="text-xs font-extrabold text-[#F28C28] uppercase tracking-widest">Individual Products</span>
            <h2 className="font-heritage text-2xl sm:text-4xl font-extrabold text-gray-900 mt-1">
              Build Your Own Hamper
            </h2>
            <p className="text-xs text-gray-500 mt-1">Pick individual bestsellers and add them to your cart</p>
          </div>
          <Link
            to="/store"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#F28C28] hover:underline"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularGiftProducts.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/store"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F28C28] text-white font-extrabold text-sm rounded-2xl shadow-md shadow-orange-200 hover:bg-[#E07B18] transition-all"
          >
            Browse Full Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-gradient-to-br from-[#FFF3E0] to-[#FFF8F0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 space-y-2"
          >
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-[#F28C28] uppercase tracking-widest">
              <Star className="w-4 h-4 fill-current" /> Happy Gift Recipients
            </span>
            <h2 className="font-heritage text-3xl sm:text-4xl font-extrabold text-gray-900">
              What People Are Saying
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-[#F28C28]/10 space-y-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic">"{t.text}"</p>
                <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F28C28] to-orange-400 flex items-center justify-center text-white font-extrabold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-gray-900">{t.name}</div>
                    <div className="text-[10px] text-gray-400">{t.city}, Maharashtra</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORPORATE GIFTING SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#1a0a00] via-[#3d1a00] to-[#5c2a00] rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-10 sm:p-14 space-y-6 text-white">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-300 uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full">
                🏢 Corporate Gifting Programme
              </span>
              <h2 className="font-heritage text-3xl sm:text-4xl font-extrabold leading-tight">
                Impress Clients &amp;
                <br />
                <span className="text-amber-300">Appreciate Teams</span>
              </h2>
              <p className="text-sm text-amber-100/80 leading-relaxed">
                Naik Foods Corporate Programme offers branded hampers, bulk ordering discounts up to 30%, 
                dedicated account manager, invoice billing, and pan-India delivery with same-day dispatch.
              </p>
              <ul className="space-y-2.5">
                {[
                  'Minimum order: 20 boxes',
                  'Custom logo &amp; branding available',
                  'Net-30 invoice payment for enterprises',
                  'GST invoice provided',
                  'Dedicated relationship manager'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs font-semibold text-amber-100/90">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 pt-2">
                <a
                  href="tel:+919820012345"
                  className="px-6 py-3 bg-amber-400 text-[#1a0a00] font-extrabold text-sm rounded-2xl hover:bg-amber-300 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Contact Sales
                </a>
                <Link
                  to="/contact"
                  className="px-6 py-3 border border-white/30 text-white font-bold text-sm rounded-2xl hover:bg-white/10 transition-all"
                >
                  Email Enquiry
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80"
                alt="Corporate gifting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a00]/40 to-transparent" />
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
