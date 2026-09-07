import React, { useState } from 'react';
import { Search, Truck, CheckCircle2, Package, MapPin, Clock, ArrowRight } from 'lucide-react';
import { trackOrderAPI } from '../services/api';
import { useToast } from '../context/ToastContext';

export const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [mobile, setMobile] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!orderId.trim() || !mobile.trim()) {
      addToast('Please enter both Order ID and Mobile Number', 'error');
      return;
    }
    setLoading(true);
    try {
      const data = await trackOrderAPI(orderId, mobile);
      setOrderData(data);
    } catch (err) {
      addToast(err.message || 'Order not found', 'error');
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentStepIndex = orderData ? steps.indexOf(orderData.orderStatus) >= 0 ? steps.indexOf(orderData.orderStatus) : 2 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] uppercase tracking-widest bg-[#E8F5E9] px-3 py-1 rounded-full">
          <Truck className="w-4 h-4" />
          <span>Real-Time Shipment Tracking</span>
        </div>
        <h1 className="font-heritage text-3xl sm:text-4xl font-extrabold text-gray-900">
          Track Your Naik Foods Order
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Enter your Order ID and Mobile Number to track package status live.
        </p>
      </div>

      {/* Track Search Form */}
      <form onSubmit={handleTrackSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs max-w-xl mx-auto space-y-4">
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Order ID *</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. ORD987654 or mongo object id"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28] font-bold"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Mobile Number *</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit registered mobile number"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F28C28] font-bold"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>{loading ? 'Locating Order...' : 'Track Order Status'}</span>
        </button>
      </form>

      {/* Tracking Results Card */}
      {orderData && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-md space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-2">
            <div>
              <span className="text-xs text-gray-400 font-semibold">Order #{orderData._id}</span>
              <h3 className="font-bold text-gray-900 text-lg">Status: <span className="text-[#2E7D32]">{orderData.orderStatus}</span></h3>
            </div>
            <span className="text-xs font-bold bg-[#FFF3E0] text-[#F28C28] px-3 py-1.5 rounded-full">
              Estimated Delivery: 2-3 Days
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Fulfillment Stepper</span>
            <div className="grid grid-cols-5 gap-2 relative text-center">
              {steps.map((stepName, idx) => {
                const isCompleted = idx <= currentStepIndex;
                return (
                  <div key={stepName} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/20'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isCompleted ? '✓' : idx + 1}
                    </div>
                    <span className={`text-[10px] font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                      {stepName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Details Breakdown */}
          <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-gray-100 text-xs space-y-3">
            <h4 className="font-bold text-gray-900">Delivery Address</h4>
            <p className="text-gray-600">
              {orderData.shippingAddress?.fullName} • {orderData.shippingAddress?.mobile}<br />
              {orderData.shippingAddress?.addressLine1}, {orderData.shippingAddress?.city}, {orderData.shippingAddress?.pincode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
