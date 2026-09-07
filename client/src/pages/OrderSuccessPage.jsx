import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Truck, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const OrderSuccessPage = () => {
  const { id: orderId } = useParams();
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      {/* Checkmark Animation Header */}
      <div className="w-24 h-24 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#2E7D32]/20 animate-bounce">
        <CheckCircle2 className="w-14 h-14" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-extrabold text-[#2E7D32] uppercase tracking-widest bg-[#E8F5E9] px-3 py-1 rounded-full">
          Order Confirmed
        </span>
        <h1 className="font-heritage text-3xl sm:text-4xl font-extrabold text-gray-900">
          Thank You For Ordering From Naik Foods!
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Your order has been received by our kitchen team. Freshly packed delicacies will be dispatched shortly.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs text-left max-w-lg mx-auto space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3 text-xs">
          <span className="text-gray-400 font-bold">Order ID:</span>
          <span className="font-extrabold text-gray-900">{orderId}</span>
        </div>

        {/* Visual Stepper Preview */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-gray-700 block">Fulfillment Progress:</span>
          <div className="grid grid-cols-4 gap-1 text-[10px] font-bold text-center">
            <div className="bg-[#E8F5E9] text-[#2E7D32] p-2 rounded-lg border border-[#2E7D32]/30">
              Confirmed ✓
            </div>
            <div className="bg-gray-100 text-gray-400 p-2 rounded-lg">Packed</div>
            <div className="bg-gray-100 text-gray-400 p-2 rounded-lg">Shipped</div>
            <div className="bg-gray-100 text-gray-400 p-2 rounded-lg">Delivered</div>
          </div>
        </div>
      </div>

      {/* Guest Account Registration Prompt */}
      {!isAuthenticated && (
        <div className="bg-[#FFF8F0] p-6 rounded-3xl border border-[#F28C28]/30 max-w-lg mx-auto text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F28C28]">
            <UserPlus className="w-4 h-4" />
            <span>Create Account for Fast Reordering</span>
          </div>
          <p className="text-xs text-gray-600">
            Create an account to save your shipping address, track orders live, and 1-click reorder your favorite snacks!
          </p>
          <Link
            to="/register"
            className="inline-block px-5 py-2.5 bg-[#F28C28] text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Create Account Now
          </Link>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/track-order"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2"
        >
          <Truck className="w-4 h-4" />
          <span>Track Live Order</span>
        </Link>

        <Link
          to="/store"
          className="w-full sm:w-auto px-8 py-3.5 bg-white border border-gray-200 text-gray-800 font-bold text-sm rounded-2xl hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
