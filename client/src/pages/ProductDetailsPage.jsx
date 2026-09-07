import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';

import { fetchProductBySlug } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useToast } from '../context/ToastContext';
import { RecommendationSection } from '../components/product/RecommendationSection';

export const ProductDetailsPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadProduct = async () => {
      setLoading(true);
      const data = await fetchProductBySlug(slug);
      if (isMounted) {
        setProduct(data);
        setSelectedImage(data.thumbnail || (data.images && data.images[0]));
        setLoading(false);
        addRecentlyViewed(data);
      }
    };
    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-sm font-bold text-gray-500">Loading Maharashtrian delicacy details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-heritage text-3xl font-bold text-gray-900">Product Not Found</h2>
        <Link to="/store" className="px-6 py-2.5 bg-[#F28C28] text-white font-bold text-xs rounded-xl inline-block">
          Return to Store
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product._id);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeStatus({ success: false, message: 'Please enter a valid 6-digit Pincode' });
      return;
    }
    setPincodeStatus({
      success: true,
      message: `Delivery available to ${pincode} in 2-3 business days!`
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <Link to="/" className="hover:text-[#F28C28]">Home</Link>
        <span>/</span>
        <Link to="/store" className="hover:text-[#F28C28]">Store</Link>
        <span>/</span>
        <span className="text-gray-900 font-bold">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-[#F28C28] text-white text-xs font-extrabold px-3 py-1 rounded-md shadow-xs">
                BEST SELLER
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img ? 'border-[#F28C28] scale-95' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Actions & Specs */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#2E7D32] uppercase tracking-wider bg-[#E8F5E9] px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="font-heritage text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-gray-600 leading-relaxed">{product.shortDescription}</p>

            {/* Price Box */}
            <div className="pt-2 flex items-baseline gap-3">
              <span className="font-extrabold text-3xl text-gray-900">₹{product.price}</span>
              {product.mrp && product.mrp > product.price && (
                <>
                  <span className="text-base text-gray-400 line-through font-semibold">₹{product.mrp}</span>
                  <span className="text-xs font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-md">
                    {product.discount}% OFF
                  </span>
                </>
              )}
              <span className="text-xs font-bold text-gray-500 ml-auto bg-gray-100 px-2.5 py-1 rounded-md">
                Pack Size: {product.weight}
              </span>
            </div>
          </div>

          {/* Pincode Delivery Checker */}
          <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F28C28]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
              <MapPin className="w-4 h-4 text-[#F28C28]" />
              <span>Check Delivery Speed & Pincode</span>
            </div>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode (e.g. 400028)"
                className="flex-1 px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#F28C28] hover:bg-[#E07B18] text-white text-xs font-bold rounded-xl transition-colors"
              >
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p
                className={`text-xs font-medium ${
                  pincodeStatus.success ? 'text-[#2E7D32]' : 'text-red-500'
                }`}
              >
                {pincodeStatus.message}
              </p>
            )}
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-200 text-gray-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:bg-gray-200 text-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                className="sm:col-span-6 py-3.5 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-sm rounded-2xl shadow-md shadow-[#F28C28]/20 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="sm:col-span-4 py-3.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm rounded-2xl shadow-md shadow-[#2E7D32]/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Buy Now</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`sm:col-span-2 py-3.5 rounded-2xl border flex items-center justify-center transition-all ${
                  isFavorited
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Micro Trust Icons */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-[11px] text-gray-500 text-center font-medium">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-[#2E7D32] mb-1" />
              <span>100% Authentic</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-[#F28C28] mb-1" />
              <span>Free Delivery &gt; ₹999</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-5 h-5 text-[#2E7D32] mb-1" />
              <span>Fresh Batch Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Detailed Information */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 space-y-6">
        <div className="flex border-b border-gray-100 gap-6 overflow-x-auto">
          {[
            { id: 'description', label: 'Story & Description' },
            { id: 'ingredients', label: 'Ingredients' },
            { id: 'nutrition', label: 'Nutrition Value' },
            { id: 'usage', label: 'Storage & Usage' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#F28C28] text-[#F28C28]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-700 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-3">
              <p>{product.description}</p>
              <p>
                Every batch is prepared in small artisanal quantities using authentic Maharashtrian preparation methods passed down through generations.
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Clean Ingredients:</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {product.ingredients?.map((ing, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-[#FFF8F0] p-2 rounded-lg text-gray-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="max-w-md bg-[#FFF8F0] p-4 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900 text-sm mb-3">Approximate Nutrition (per 100g):</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span>Energy / Calories</span>
                  <span className="font-bold text-gray-900">{product.nutritionInfo?.calories || '450 kcal'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span>Protein</span>
                  <span className="font-bold text-gray-900">{product.nutritionInfo?.protein || '8g'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span>Carbohydrates</span>
                  <span className="font-bold text-gray-900">{product.nutritionInfo?.carbs || '62g'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dietary Fiber</span>
                  <span className="font-bold text-gray-900">{product.nutritionInfo?.fiber || '4g'}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-900 text-xs uppercase text-[#F28C28]">Usage Instructions</h4>
                <p className="text-xs text-gray-600 mt-1">{product.usageInstructions}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs uppercase text-[#2E7D32]">Storage & Shelf Life</h4>
                <p className="text-xs text-gray-600 mt-1">{product.storageInstructions}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations & Cross-Selling */}
      <RecommendationSection currentProductId={product._id} />
    </div>
  );
};
