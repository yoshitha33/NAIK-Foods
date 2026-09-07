import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  MapPin,
  Gift
} from 'lucide-react';

import { BrandLogo } from './BrandLogo';
import { AnnouncementBar } from './AnnouncementBar';
import { SearchBarModal } from './SearchBarModal';
import { CartDrawer } from './CartDrawer';
import { WelcomeModal } from './WelcomeModal';

import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  }, [location]);

  return (
    <>
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-md border-b border-gray-100 py-2.5' : 'py-3.5 border-b border-gray-100'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 text-gray-700 hover:text-[#F28C28] rounded-xl hover:bg-[#FFF8F0] transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <BrandLogo />
            </div>

            {/* Middle: Desktop Navigation Links (ALL IN ONE SINGLE LINE NO WRAP) */}
            <nav className="hidden xl:flex items-center gap-6 lg:gap-7 whitespace-nowrap">
              {/* HOME */}
              <Link
                to="/"
                className={`text-sm font-semibold transition-all py-1 relative ${
                  location.pathname === '/'
                    ? 'text-[#F28C28]'
                    : 'text-gray-700 hover:text-[#F28C28]'
                }`}
              >
                Home
                {location.pathname === '/' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F28C28] rounded-full" />
                )}
              </Link>

              <Link
                to="/store"
                className={`text-sm font-semibold transition-all py-1 relative ${
                  location.pathname === '/store'
                    ? 'text-[#F28C28]'
                    : 'text-gray-700 hover:text-[#F28C28]'
                }`}
              >
                Shop All
                {location.pathname === '/store' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F28C28] rounded-full" />
                )}
              </Link>

              <Link
                to="/store?sort=popular"
                className="text-sm font-semibold text-gray-700 hover:text-[#F28C28] transition-all py-1 flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Best Sellers</span>
                <span className="bg-amber-100 text-[#F28C28] text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  HOT
                </span>
              </Link>

              <Link
                to="/festival"
                className={`text-sm font-semibold transition-all py-1 flex items-center gap-1.5 relative ${
                  location.pathname === '/festival'
                    ? 'text-[#F28C28]'
                    : 'text-gray-700 hover:text-[#F28C28]'
                }`}
              >
                <Gift className="w-4 h-4 text-[#F28C28]" />
                <span>Gift Boxes</span>
                {location.pathname === '/festival' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F28C28] rounded-full" />
                )}
              </Link>

              <Link
                to="/blog"
                className={`text-sm font-semibold transition-all py-1 relative ${
                  location.pathname.startsWith('/blog')
                    ? 'text-[#F28C28]'
                    : 'text-gray-700 hover:text-[#F28C28]'
                }`}
              >
                Stories &amp; Recipes
                {location.pathname.startsWith('/blog') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F28C28] rounded-full" />
                )}
              </Link>

              <Link
                to="/about"
                className={`text-sm font-semibold transition-all py-1 relative ${
                  location.pathname === '/about'
                    ? 'text-[#F28C28]'
                    : 'text-gray-700 hover:text-[#F28C28]'
                }`}
              >
                Our Heritage
                {location.pathname === '/about' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F28C28] rounded-full" />
                )}
              </Link>

              <Link
                to="/store-locator"
                className={`text-sm font-semibold transition-all py-1 flex items-center gap-1.5 relative ${
                  location.pathname === '/store-locator'
                    ? 'text-[#F28C28]'
                    : 'text-gray-700 hover:text-[#F28C28]'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#2E7D32]" />
                <span>Stores</span>
                {location.pathname === '/store-locator' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F28C28] rounded-full" />
                )}
              </Link>
            </nav>

            {/* Right: Actions (Search, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 whitespace-nowrap">
              {/* Search Pill */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 sm:px-3 sm:py-2 text-gray-700 hover:text-[#F28C28] bg-gray-50 hover:bg-[#FFF3E0] rounded-full border border-gray-200 transition-all flex items-center gap-2"
                aria-label="Search delicacies"
              >
                <Search className="w-4 h-4 text-gray-500" />
                <span className="hidden 2xl:inline text-xs font-medium text-gray-400 pr-1">Search...</span>
              </button>

              {/* Wishlist Link */}
              <Link
                to="/account/wishlist"
                className="p-2 sm:p-2.5 text-gray-700 hover:text-[#F28C28] hover:bg-[#FFF8F0] rounded-full transition-colors relative"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Account Menu */}
              <div className="relative">
                {isAuthenticated ? (
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-[#FFF8F0] border border-gray-200 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline text-xs font-bold text-gray-800 whitespace-nowrap">
                      Hi, {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-[#F28C28] px-3.5 py-2 rounded-full border border-gray-200 hover:border-[#F28C28] transition-all whitespace-nowrap"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#F28C28]" />
                    <span>Sign In</span>
                  </Link>
                )}

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-[11px] text-gray-400 font-medium">Logged in as</p>
                      <p className="text-xs font-bold text-gray-900 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/account"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#FFF8F0] hover:text-[#F28C28] transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-[#F28C28]" />
                      <span>Account Dashboard</span>
                    </Link>
                    <Link
                      to="/account/orders"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#FFF8F0] hover:text-[#F28C28] transition-colors"
                    >
                      <Package className="w-4 h-4 text-[#2E7D32]" />
                      <span>My Orders</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Shopping Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-[#F28C28] hover:bg-[#E07B18] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full font-bold text-xs shadow-md shadow-[#F28C28]/20 transition-all flex items-center gap-2 whitespace-nowrap"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="bg-white text-[#F28C28] text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                  {totalItemCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-100 bg-white py-4 px-6 space-y-1 shadow-lg">
            <Link
              to="/"
              className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm font-bold transition-colors ${
                location.pathname === '/'
                  ? 'text-[#F28C28] bg-[#FFF3E0]'
                  : 'text-gray-900 hover:text-[#F28C28] hover:bg-[#FFF8F0]'
              }`}
            >
              🏠 Home
            </Link>
            <Link
              to="/store"
              className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm font-bold transition-colors ${
                location.pathname === '/store'
                  ? 'text-[#F28C28] bg-[#FFF3E0]'
                  : 'text-gray-900 hover:text-[#F28C28] hover:bg-[#FFF8F0]'
              }`}
            >
              🛍️ Shop All Products
            </Link>
            <Link
              to="/store?sort=popular"
              className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm font-bold text-gray-900 hover:text-[#F28C28] hover:bg-[#FFF8F0] transition-colors"
            >
              🔥 Best Sellers
            </Link>
            <Link
              to="/festival"
              className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm font-bold transition-colors ${
                location.pathname === '/festival'
                  ? 'text-[#F28C28] bg-[#FFF3E0]'
                  : 'text-gray-900 hover:text-[#F28C28] hover:bg-[#FFF8F0]'
              }`}
            >
              🎁 Gift Boxes
            </Link>
            <Link
              to="/blog"
              className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm font-bold transition-colors ${
                location.pathname.startsWith('/blog')
                  ? 'text-[#F28C28] bg-[#FFF3E0]'
                  : 'text-gray-900 hover:text-[#F28C28] hover:bg-[#FFF8F0]'
              }`}
            >
              📖 Stories &amp; Recipes
            </Link>
            <Link
              to="/about"
              className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm font-bold transition-colors ${
                location.pathname === '/about'
                  ? 'text-[#F28C28] bg-[#FFF3E0]'
                  : 'text-gray-900 hover:text-[#F28C28] hover:bg-[#FFF8F0]'
              }`}
            >
              🚩 Our Heritage
            </Link>
            <Link
              to="/store-locator"
              className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm font-bold transition-colors ${
                location.pathname === '/store-locator'
                  ? 'text-[#F28C28] bg-[#FFF3E0]'
                  : 'text-gray-900 hover:text-[#F28C28] hover:bg-[#FFF8F0]'
              }`}
            >
              📍 Store Locator
            </Link>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchBarModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Welcome Sign In / Sign Up Modal Popup (Triggers after 5 seconds) */}
      <WelcomeModal />
    </>
  );
};
