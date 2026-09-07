import React from 'react';
import { RotateCcw, ShoppingBag } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';

export const ReorderPage = () => {
  const { addToCart } = useCart();
  const repeatSnacks = mockProducts.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-gray-200 pb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#FFF3E0] text-[#F28C28] flex items-center justify-center">
          <RotateCcw className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-heritage text-3xl font-extrabold text-gray-900">Buy Again / Quick Reorder</h1>
          <p className="text-xs text-gray-500">1-Click reorder your household's favorite traditional Maharashtrian delicacies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {repeatSnacks.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <img src={item.thumbnail} alt="" className="w-full h-40 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
              <p className="text-xs text-gray-500">{item.weight} • {item.category}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="font-extrabold text-base text-gray-900">₹{item.price}</span>
              <button
                onClick={() => addToCart(item, 1)}
                className="px-4 py-2 bg-[#F28C28] hover:bg-[#E07B18] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buy Again</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
