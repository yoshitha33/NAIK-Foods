import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeDeliveryProgress,
    remainingForFreeDelivery,
    isFreeDeliveryUnlocked,
    totalItemCount
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FFF8F0]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#F28C28]" />
              <h2 className="font-bold text-gray-900 text-lg">Your Delicacies Cart</h2>
              <span className="bg-[#F28C28] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItemCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Free Delivery Progress Component */}
          <div className="bg-[#FFF3E0] p-4 border-b border-[#F28C28]/20">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-gray-800">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#2E7D32]" />
                {isFreeDeliveryUnlocked ? (
                  <span className="text-[#2E7D32] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> FREE DELIVERY UNLOCKED!
                  </span>
                ) : (
                  <span>
                    Add <span className="text-[#F28C28] font-extrabold">₹{remainingForFreeDelivery}</span> more for FREE Delivery!
                  </span>
                )}
              </div>
              <span>{freeDeliveryProgress}%</span>
            </div>

            <div className="w-full h-2.5 bg-white rounded-full overflow-hidden p-0.5 border border-[#F28C28]/20">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFreeDeliveryUnlocked ? 'bg-[#2E7D32]' : 'bg-[#F28C28]'
                }`}
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#F28C28] mb-4">
                  <ShoppingBag className="w-10 h-10 opacity-70" />
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-1">Your cart is waiting for something delicious</h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Discover authentic snacks, pickles & traditional sweets from Maharashtra.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/store');
                  }}
                  className="px-6 py-2.5 bg-[#F28C28] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#E07B18] transition-colors"
                >
                  Start Shopping Now
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-3 rounded-2xl bg-white border border-gray-100 hover:border-[#F28C28]/30 transition-all shadow-2xs"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-bold text-gray-900 text-sm truncate leading-tight">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-400 hover:text-red-500 p-0.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{item.weight}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="p-1.5 hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          className="p-1.5 hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-extrabold text-sm text-[#F28C28]">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-[#FFF8F0]">
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-xs">
                  <span>Delivery Charge</span>
                  <span className="font-semibold">
                    {isFreeDeliveryUnlocked ? (
                      <span className="text-[#2E7D32] font-bold uppercase">FREE</span>
                    ) : (
                      '₹70'
                    )}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-3 border border-[#F28C28] text-[#F28C28] font-bold text-xs rounded-xl hover:bg-[#FFF3E0] transition-colors"
                >
                  View Full Cart
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3 bg-[#F28C28] text-white font-bold text-xs rounded-xl hover:bg-[#E07B18] shadow-md shadow-[#F28C28]/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
