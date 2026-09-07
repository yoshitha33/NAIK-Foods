import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  MapPin,
  Clock,
  RotateCcw,
  LogOut,
  ShoppingBag,
  ChevronRight,
  Truck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

export const AccountDashboard = () => {
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const { recentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-heritage text-2xl font-bold text-gray-900">Please Sign In</h2>
        <Link to="/login" className="px-6 py-2.5 bg-[#F28C28] text-white font-bold text-xs rounded-xl inline-block">
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Welcome Card */}
      <div className="bg-gradient-to-r from-[#FFF3E0] to-[#FFF8F0] p-6 sm:p-8 rounded-3xl border border-[#F28C28]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-2xl font-bold font-heritage shadow-md">
            {user.name.charAt(0)}
          </div>
          <div>
            <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider block">Customer Portal</span>
            <h1 className="font-heritage text-2xl sm:text-3xl font-extrabold text-gray-900">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xs text-gray-500">{user.email} • +91 {user.mobile}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Account Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-2 bg-white p-4 rounded-3xl border border-gray-100 h-fit">
          <Link
            to="/account"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#FFF3E0] text-[#F28C28] font-bold text-xs"
          >
            <User className="w-4 h-4" />
            <span>Account Dashboard</span>
          </Link>
          <Link
            to="/account/orders"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 font-bold text-xs transition-colors"
          >
            <Package className="w-4 h-4 text-[#2E7D32]" />
            <span>My Orders</span>
          </Link>
          <Link
            to="/account/reorder"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 font-bold text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-[#F28C28]" />
            <span>Buy Again / Reorder</span>
          </Link>
          <Link
            to="/account/wishlist"
            className="flex items-center justify-between px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 font-bold text-xs transition-colors"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Wishlist Favorites</span>
            </div>
            {wishlistCount > 0 && (
              <span className="bg-red-100 text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/track-order"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 font-bold text-xs transition-colors"
          >
            <Truck className="w-4 h-4 text-[#2E7D32]" />
            <span>Track Live Shipment</span>
          </Link>
          <Link
            to="/account/addresses"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 font-bold text-xs transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#F28C28]" />
            <span>Saved Addresses</span>
          </Link>
        </aside>

        {/* Main Dashboard Content */}
        <main className="lg:col-span-9 space-y-8">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              to="/account/orders"
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:border-[#F28C28] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-3">
                <Package className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 text-base group-hover:text-[#F28C28]">My Orders</h4>
              <p className="text-xs text-gray-400 mt-1">View active & past orders</p>
            </Link>

            <Link
              to="/account/reorder"
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:border-[#F28C28] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#FFF3E0] text-[#F28C28] flex items-center justify-center mb-3">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 text-base group-hover:text-[#F28C28]">Buy Again</h4>
              <p className="text-xs text-gray-400 mt-1">1-Click reorder favorite snacks</p>
            </Link>

            <Link
              to="/account/wishlist"
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:border-[#F28C28] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-900 text-base group-hover:text-[#F28C28]">Wishlist</h4>
              <p className="text-xs text-gray-400 mt-1">{wishlistCount} saved products</p>
            </Link>
          </div>

          {/* Recently Viewed Bar */}
          {recentlyViewed.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F28C28]" />
                  <span>Recently Viewed</span>
                </h3>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {recentlyViewed.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item.slug}`}
                    className="w-36 flex-shrink-0 bg-[#FFF8F0] p-2.5 rounded-2xl border border-gray-100 hover:border-[#F28C28] transition-all group"
                  >
                    <img src={item.thumbnail} alt="" className="w-full h-24 object-cover rounded-xl mb-2" />
                    <h5 className="font-bold text-xs text-gray-900 group-hover:text-[#F28C28] truncate">{item.name}</h5>
                    <span className="text-xs font-extrabold text-[#F28C28]">₹{item.price}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
