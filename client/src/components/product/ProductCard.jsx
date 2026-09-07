import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const isFavorited = isInWishlist(product._id);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 hover:border-[#F28C28]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative">
      {/* Top Image & Badges Container */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? 'bg-red-50 text-red-500 shadow-sm'
              : 'bg-white/80 backdrop-blur-xs text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Badge Indicator */}
        {product.isBestSeller && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#F28C28] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-xs tracking-wider">
            BEST SELLER
          </span>
        )}
        {!product.isBestSeller && product.isNew && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#2E7D32] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-xs tracking-wider">
            NEW
          </span>
        )}

        {/* Product Image */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Product Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-[#2E7D32] uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <Link to={`/product/${product.slug}`} className="block group-hover:text-[#F28C28] transition-colors">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
            {product.shortDescription || `${product.weight} authentic traditional recipe`}
          </p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-base sm:text-lg text-gray-900">
                ₹{product.price}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            <span className="text-[11px] text-gray-500 font-semibold">{product.weight}</span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-[#F28C28] hover:bg-[#E07B18] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm shadow-[#F28C28]/20 transition-all flex items-center gap-1.5 flex-shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
