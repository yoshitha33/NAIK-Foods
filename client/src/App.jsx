import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AccountDashboard } from './pages/AccountDashboard';
import { OrdersPage } from './pages/OrdersPage';
import { WishlistPage } from './pages/WishlistPage';
import { ReorderPage } from './pages/ReorderPage';
import { BlogListingPage } from './pages/BlogListingPage';
import { BlogDetailsPage } from './pages/BlogDetailsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { StoreLocatorPage } from './pages/StoreLocatorPage';
import { FestivalPage } from './pages/FestivalPage';
import {
  PrivacyPolicyPage,
  TermsPage,
  ShippingPolicyPage,
  ReturnPolicyPage
} from './pages/PolicyPages';

// 404 Not Found Page
const NotFoundPage = () => (
  <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
    <div className="w-20 h-20 bg-[#FFF3E0] text-[#F28C28] rounded-full flex items-center justify-center mx-auto text-3xl font-heritage font-bold">
      404
    </div>
    <h1 className="font-heritage text-3xl font-extrabold text-gray-900">
      Oops! This page took a wrong turn.
    </h1>
    <p className="text-xs text-gray-500 max-w-sm mx-auto">
      The Maharashtrian delicacy or page you were looking for seems to have moved or does not exist.
    </p>
    <div className="flex justify-center gap-3">
      <Link to="/" className="px-6 py-2.5 bg-[#F28C28] text-white font-bold text-xs rounded-xl shadow-md">
        Back to Home
      </Link>
      <Link to="/store" className="px-6 py-2.5 bg-white border border-gray-200 text-gray-800 font-bold text-xs rounded-xl">
        Shop Delicacies
      </Link>
    </div>
  </div>
);

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <div className="min-h-screen flex flex-col justify-between bg-[#FFF8F0]">
                <Navbar />

                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/store" element={<ShopPage />} />
                    <Route path="/store/:category" element={<ShopPage />} />
                    <Route path="/search" element={<ShopPage />} />
                    <Route path="/product/:slug" element={<ProductDetailsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-success/:id" element={<OrderSuccessPage />} />
                    <Route path="/track-order" element={<TrackOrderPage />} />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<LoginPage />} />

                    <Route path="/account" element={<AccountDashboard />} />
                    <Route path="/account/orders" element={<OrdersPage />} />
                    <Route path="/account/wishlist" element={<WishlistPage />} />
                    <Route path="/account/reorder" element={<ReorderPage />} />
                    <Route path="/account/addresses" element={<AccountDashboard />} />
                    <Route path="/account/profile" element={<AccountDashboard />} />
                    <Route path="/account/recently-viewed" element={<AccountDashboard />} />

                    <Route path="/blog" element={<BlogListingPage />} />
                    <Route path="/blog/:slug" element={<BlogDetailsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/store-locator" element={<StoreLocatorPage />} />
                    <Route path="/festival" element={<FestivalPage />} />
                    <Route path="/festival/:slug" element={<FestivalPage />} />

                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                    <Route path="/return-policy" element={<ReturnPolicyPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>

                <Footer />
              </div>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
