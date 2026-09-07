import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { fetchRecommendations } from '../../services/api';
import { Sparkles, ShoppingBag } from 'lucide-react';

export const RecommendationSection = ({ currentProductId }) => {
  const [recommendations, setRecommendations] = useState({
    youMayAlsoLike: [],
    frequentlyBoughtTogether: [],
    basketFillers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadRecs = async () => {
      setLoading(true);
      const data = await fetchRecommendations(currentProductId);
      if (isMounted) {
        setRecommendations(data);
        setLoading(false);
      }
    };
    if (currentProductId) {
      loadRecs();
    }
    return () => {
      isMounted = false;
    };
  }, [currentProductId]);

  if (loading || !recommendations.youMayAlsoLike.length) return null;

  return (
    <div className="space-y-12 my-12">
      {/* You May Also Like Section */}
      {recommendations.youMayAlsoLike.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#F28C28]" />
            <h3 className="font-heritage text-2xl font-bold text-gray-900">You May Also Like</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.youMayAlsoLike.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Frequently Bought Together */}
      {recommendations.frequentlyBoughtTogether.length > 0 && (
        <section className="bg-[#FFF8F0] p-6 rounded-2xl border border-[#F28C28]/20">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-5 h-5 text-[#2E7D32]" />
            <h3 className="font-heritage text-xl font-bold text-gray-900">Frequently Bought Together</h3>
          </div>
          <p className="text-xs text-gray-500 mb-6">Traditional pairings favored by authentic Maharashtrian households.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.frequentlyBoughtTogether.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
