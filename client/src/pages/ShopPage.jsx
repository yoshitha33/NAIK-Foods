import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown, RefreshCw } from 'lucide-react';

import { ProductCard } from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/common/SkeletonLoader';
import { fetchProducts, fetchCategories } from '../services/api';

export const ShopPage = () => {
  const { category: categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(categorySlug || 'all');
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'popular');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    }
  }, [categorySlug]);

  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      const data = await fetchCategories();
      if (isMounted) setCategories(data);
    };
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      setLoading(true);
      const params = {
        category: selectedCategory,
        sort: sortOption,
        minPrice,
        maxPrice,
        keyword: searchParams.get('q') || ''
      };
      const res = await fetchProducts(params);
      if (isMounted) {
        setProducts(res.products || []);
        setLoading(false);
      }
    };
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, sortOption, minPrice, maxPrice, searchParams]);

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    setIsMobileFilterOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSortOption('popular');
    setMinPrice(0);
    setMaxPrice(1000);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#FFF3E0] to-[#FFF8F0] p-6 sm:p-8 rounded-3xl border border-[#F28C28]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#F28C28] uppercase tracking-widest block mb-1">
            Store Catalog
          </span>
          <h1 className="font-heritage text-3xl sm:text-4xl font-extrabold text-gray-900">
            {selectedCategory === 'all'
              ? 'All Maharashtrian Delicacies'
              : categories.find((c) => c.slug === selectedCategory)?.name || 'Product Listing'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Showing {products.length} authentic handcrafted food products
          </p>
        </div>

        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden px-4 py-2.5 bg-white border border-gray-200 text-gray-800 text-xs font-bold rounded-xl shadow-xs flex items-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#F28C28]" />
          <span>Filters & Sort</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-6 rounded-3xl border border-gray-100 h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#F28C28]" />
              <span>Filter Products</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-bold text-[#2E7D32] hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</h4>
            <div className="space-y-1">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#FFF3E0] text-[#F28C28]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-[#FFF3E0] text-[#F28C28]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Price Range (₹{minPrice} - ₹{maxPrice})
            </h4>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#F28C28]"
            />
          </div>
        </aside>

        {/* Main Product Catalog */}
        <main className="lg:col-span-9 space-y-6">
          {/* Sorting Control Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-medium text-gray-600">
            <div>
              <span>Showing <span className="font-bold text-gray-900">{products.length}</span> products</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-gray-400 font-bold whitespace-nowrap">Sort By:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#F28C28]"
              >
                <option value="popular">Best Sellers & Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <ProductCardSkeleton key={n} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4">
              <div className="w-16 h-16 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#F28C28] mx-auto">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">No products match your current filters</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try resetting your filters or search for another Maharashtrian snack category.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#F28C28] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#E07B18]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
