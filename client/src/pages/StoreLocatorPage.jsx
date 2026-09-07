import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { fetchStores } from '../services/api';

export const StoreLocatorPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadStores = async () => {
      setLoading(true);
      const data = await fetchStores();
      if (isMounted) {
        setStores(data);
        setLoading(false);
      }
    };
    loadStores();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-gradient-to-r from-[#FFF3E0] to-[#FFF8F0] p-8 rounded-3xl border border-[#F28C28]/20 text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-widest bg-white px-3 py-1 rounded-full">
          <MapPin className="w-4 h-4 text-[#F28C28]" />
          <span>Physical Store Outlets</span>
        </div>
        <h1 className="font-heritage text-3xl sm:text-5xl font-extrabold text-gray-900">
          Find a Naik Foods Store Near You
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          Visit our heritage outlets in Mumbai and Pune to sample fresh hot snacks and traditional stone-ground pickles.
        </p>
      </div>

      {loading ? (
        <p className="text-xs font-bold text-gray-400 text-center">Locating stores...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stores.map((store) => (
            <div
              key={store._id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="aspect-video overflow-hidden">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-heritage text-xl font-bold text-gray-900">{store.name}</h3>

                  <div className="space-y-2 text-xs text-gray-600 font-medium">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#F28C28] flex-shrink-0 mt-0.5" />
                      <span>{store.address}, {store.city}, {store.state} - {store.pincode}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#2E7D32] flex-shrink-0" />
                      <span>{store.openingHours}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#F28C28] flex-shrink-0" />
                      <span>{store.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
