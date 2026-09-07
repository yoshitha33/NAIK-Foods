import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, ChevronRight, ArrowUpRight } from 'lucide-react';
import { searchSuggestionsAPI } from '../../services/api';

export const SearchBarModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const popularSearches = ['Chakali', 'Prawns Pickle', 'Kanda Lasun Masala', 'Jwari Bhel', 'Modak Mix', 'Thalipith'];

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions({ products: [], categories: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const data = await searchSuggestionsAPI(query);
      setSuggestions(data);
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleTagClick = (tag) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-gray-100 p-4">
          <Search className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Chakali, Kolhapuri Masala, Prawns Pickle..."
            className="w-full pl-4 pr-10 py-2 text-base font-medium focus:outline-none text-gray-900 placeholder:text-gray-400"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Results / Popular Tags */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                <TrendingUp className="w-4 h-4 text-[#F28C28]" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="px-3.5 py-1.5 rounded-full bg-[#FFF3E0] text-[#F28C28] hover:bg-[#F28C28] hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <span>{tag}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {loading && <p className="text-sm text-gray-400 py-4 text-center">Searching Maharashtra delicacies...</p>}
              {!loading && suggestions.products.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600 font-medium">No direct matches found for "{query}"</p>
                  <p className="text-xs text-gray-400 mt-1">Try searching for snacks, pickles, or masalas</p>
                </div>
              )}
              {suggestions.products.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Products</span>
                  {suggestions.products.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => {
                        navigate(`/product/${p.slug}`);
                        onClose();
                      }}
                      className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[#FFF8F0] cursor-pointer transition-colors group"
                    >
                      <img
                        src={p.thumbnail}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#F28C28] truncate transition-colors">
                          {p.name}
                        </h4>
                        <p className="text-xs text-gray-500">{p.category} • {p.weight}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#F28C28]">₹{p.price}</span>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full mt-4 py-2.5 bg-[#FFF3E0] text-[#F28C28] font-bold text-xs rounded-xl hover:bg-[#F28C28] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View All Search Results for "{query}"</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
