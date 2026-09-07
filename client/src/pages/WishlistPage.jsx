import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';

export const WishlistPage = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-gray-200 pb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h1 className="font-heritage text-3xl font-extrabold text-gray-900">Your Favorite Wishlist</h1>
          <p className="text-xs text-gray-500">Saved delicacies you love to enjoy</p>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">No favorites saved yet</h3>
          <p className="text-xs text-gray-500">
            Click the heart icon on any snack, pickle, or masala card to save products you love and find them here later.
          </p>
          <Link
            to="/store"
            className="px-6 py-2.5 bg-[#F28C28] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
