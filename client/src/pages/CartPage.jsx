import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Sparkles,
  Tag,
  CheckCircle2,
  X
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { RecommendationSection } from '../components/product/RecommendationSection';

export const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalMrp,
    totalSavings,
    freeDeliveryProgress,
    remainingForFreeDelivery,
    isFreeDeliveryUnlocked,
    deliveryCharge,
    coupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    totalAmount,
    FREE_DELIVERY_THRESHOLD
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    try {
      await applyCoupon(couponInput.trim());
      setCouponInput('');
    } catch (err) {
      setCouponError(err.message || 'Invalid coupon code');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#F28C28] mx-auto">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="font-heritage text-3xl font-bold text-gray-900">Your cart is waiting for something delicious</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Discover authentic snacks, pickles & traditional sweets from Maharashtra delivered fresh to your door.
        </p>
        <Link
          to="/store"
          className="px-8 py-3.5 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-sm rounded-2xl shadow-md inline-flex items-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-heritage text-3xl sm:text-4xl font-extrabold text-gray-900">Shopping Cart</h1>
        <p className="text-xs text-gray-500 mt-1">Review your regional delicacies before multi-step checkout</p>
      </div>

      {/* Free Delivery Progress Component */}
      <div className="bg-[#FFF3E0] p-5 rounded-2xl border border-[#F28C28]/30 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-800">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#2E7D32]" />
            {isFreeDeliveryUnlocked ? (
              <span className="text-[#2E7D32] flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> FREE NATIONWIDE DELIVERY UNLOCKED!
              </span>
            ) : (
              <span>
                Add <span className="text-[#F28C28] font-extrabold">₹{remainingForFreeDelivery}</span> more delicacies for FREE Shipping!
              </span>
            )}
          </div>
          <span>{freeDeliveryProgress}%</span>
        </div>
        <div className="w-full h-3 bg-white rounded-full overflow-hidden p-0.5 border border-[#F28C28]/20">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isFreeDeliveryUnlocked ? 'bg-[#2E7D32]' : 'bg-[#F28C28]'
            }`}
            style={{ width: `${freeDeliveryProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs flex gap-4 sm:gap-6 items-center"
            >
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-gray-100 flex-shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.weight} • {item.category}</p>
                <div className="text-sm font-extrabold text-[#F28C28] sm:hidden">
                  ₹{item.price * item.quantity}
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="p-1.5 hover:bg-gray-200 text-gray-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="p-1.5 hover:bg-gray-200 text-gray-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-xs font-semibold text-gray-400 hover:text-red-500 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="font-extrabold text-lg text-gray-900">₹{item.price * item.quantity}</span>
                {item.mrp && item.mrp > item.price && (
                  <p className="text-xs text-gray-400 line-through">₹{item.mrp * item.quantity}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-6">
          {/* Coupon Box */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
              <Tag className="w-4 h-4 text-[#F28C28]" />
              <span>Apply Discount Coupon</span>
            </div>

            {coupon ? (
              <div className="bg-[#E8F5E9] p-3 rounded-xl border border-[#2E7D32]/30 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-xs text-[#2E7D32]">{coupon.code} APPLIED</span>
                  <p className="text-[11px] text-gray-600">Saved ₹{coupon.calculatedDiscount} on this order</p>
                </div>
                <button onClick={removeCoupon} className="text-gray-400 hover:text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter code (NAIK100)"
                    className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28] uppercase font-bold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F28C28] hover:bg-[#E07B18] text-white text-xs font-bold rounded-xl"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-xs text-red-500 font-medium">{couponError}</p>}
                <p className="text-[10px] text-gray-400">Try <span className="font-bold text-[#F28C28]">NAIK100</span> (Orders &gt; ₹500)</p>
              </form>
            )}
          </div>

          {/* Order Summary Box */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4 shadow-xs">
            <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">Order Summary</h3>

            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-gray-900">₹{subtotal}</span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Product MRP Discounts</span>
                  <span className="font-bold">-₹{totalSavings}</span>
                </div>
              )}

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Coupon Discount ({coupon?.code})</span>
                  <span className="font-bold">-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping & Handing</span>
                <span className="font-bold">
                  {isFreeDeliveryUnlocked ? (
                    <span className="text-[#2E7D32] uppercase">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline text-base font-extrabold text-gray-900">
                <span>Total Amount</span>
                <span className="text-xl text-[#F28C28]">₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#F28C28]/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Sell Recommendations */}
      <RecommendationSection currentProductId={cartItems[0]?._id} />
    </div>
  );
};
