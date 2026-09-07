import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  MapPin,
  Truck,
  CreditCard,
  User,
  Phone,
  Mail,
  ShieldCheck,
  ArrowRight,
  Lock,
  Package
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrderAPI } from '../services/api';
import { useToast } from '../context/ToastContext';

export const CheckoutPage = () => {
  const { cartItems, subtotal, deliveryCharge, discountAmount, totalAmount, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Address State
  const [formData, setFormData] = useState({
    fullName: user ? user.name : '',
    mobile: user ? user.mobile || '' : '',
    email: user ? user.email : '',
    addressLine1: '',
    addressLine2: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400028',
    landmark: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile || !formData.email || !formData.addressLine1 || !formData.pincode) {
      addToast('Please fill all required address fields', 'error');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.thumbnail,
          price: item.price,
          weight: item.weight,
          quantity: item.quantity
        })),
        shippingAddress: formData,
        subtotal,
        discount: discountAmount,
        deliveryCharge,
        totalAmount,
        paymentMethod,
        isGuest: !isAuthenticated
      };

      const createdOrder = await placeOrderAPI(orderPayload);
      clearCart();
      addToast('Order placed successfully! 🚀', 'success');
      navigate(`/order-success/${createdOrder._id || 'ORD' + Date.now()}`);
    } catch (error) {
      addToast(error.message || 'Failed to place order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="font-heritage text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
        <button
          onClick={() => navigate('/store')}
          className="px-6 py-2.5 bg-[#F28C28] text-white font-bold text-xs rounded-xl"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-heritage text-3xl font-extrabold text-gray-900">Express Checkout</h1>
        <p className="text-xs text-gray-500 mt-1">Complete your shipping address and payment option</p>
      </div>

      {/* Stepper Navigation */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-xs font-bold">
        <div
          className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
            step >= 1 ? 'border-[#F28C28] bg-[#FFF3E0] text-[#F28C28]' : 'border-gray-200 text-gray-400'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span className="hidden sm:inline">1. Shipping Address</span>
          <span className="sm:hidden">Address</span>
        </div>

        <div
          className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
            step >= 2 ? 'border-[#F28C28] bg-[#FFF3E0] text-[#F28C28]' : 'border-gray-200 text-gray-400'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span className="hidden sm:inline">2. Payment Method</span>
          <span className="sm:hidden">Payment</span>
        </div>

        <div
          className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
            step >= 3 ? 'border-[#2E7D32] bg-[#E8F5E9] text-[#2E7D32]' : 'border-gray-200 text-gray-400'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span className="hidden sm:inline">3. Review & Place</span>
          <span className="sm:hidden">Review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form Panel */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <form onSubmit={handleAddressSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 space-y-6 shadow-xs">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#F28C28]" />
                  <span>Shipping Address</span>
                </h3>
                {!isAuthenticated && (
                  <span className="text-xs text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-md font-bold">
                    Guest Checkout Mode
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    required
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="For order tracking & confirmation"
                    required
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">Street Address / House / Flat *</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="Flat 402, Shivneri Apartments, Ranade Road"
                    required
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="400028"
                    required
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Landmark (Optional)</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="Near Shivaji Park"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-sm rounded-2xl shadow-md flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 2 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 space-y-6 shadow-xs">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 border-b border-gray-100 pb-4">
                <CreditCard className="w-5 h-5 text-[#F28C28]" />
                <span>Select Payment Method</span>
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'razorpay'
                      ? 'border-[#F28C28] bg-[#FFF3E0] shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="accent-[#F28C28]"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Online Payment (Razorpay UPI / Cards / NetBanking)</h4>
                      <p className="text-xs text-gray-500">Fast, secure 256-bit encrypted online checkout</p>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#F28C28] bg-[#FFF3E0] shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#F28C28]"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Cash on Delivery (COD)</h4>
                      <p className="text-xs text-gray-500">Pay cash or scan QR at doorstep upon package delivery</p>
                    </div>
                  </div>
                  <Truck className="w-5 h-5 text-[#F28C28]" />
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-200 text-gray-700 font-bold text-xs rounded-2xl"
                >
                  Back to Address
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-sm rounded-2xl shadow-md flex items-center gap-2"
                >
                  <span>Review Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & PLACE */}
          {step === 3 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 space-y-6 shadow-xs">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 border-b border-gray-100 pb-4">
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                <span>Review & Confirm Order</span>
              </h3>

              <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-gray-100 text-xs space-y-2">
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Deliver To: {formData.fullName} ({formData.mobile})</span>
                  <button onClick={() => setStep(1)} className="text-[#F28C28] underline">Edit</button>
                </div>
                <p className="text-gray-600">
                  {formData.addressLine1}, {formData.city}, {formData.state} - {formData.pincode}
                </p>
              </div>

              <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-gray-100 text-xs space-y-1">
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Payment Mode: {paymentMethod.toUpperCase()}</span>
                  <button onClick={() => setStep(2)} className="text-[#F28C28] underline">Edit</button>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-gray-200 text-gray-700 font-bold text-xs rounded-2xl"
                >
                  Back
                </button>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="px-10 py-4 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-extrabold text-base rounded-2xl shadow-xl shadow-[#2E7D32]/25 transition-all flex items-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  <span>{loading ? 'Processing Order...' : `Place Order (₹${totalAmount})`}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4 shadow-xs">
            <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">Items in Order</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={item.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h5 className="font-bold text-gray-900 line-clamp-1">{item.name}</h5>
                      <span className="text-gray-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Discount</span>
                  <span className="font-bold">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between items-baseline font-extrabold text-gray-900 text-base">
                <span>Total Payable</span>
                <span className="text-xl text-[#F28C28]">₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
