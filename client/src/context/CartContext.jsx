import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { validateCouponAPI } from '../services/api';

const CartContext = createContext();
const FREE_DELIVERY_THRESHOLD = 999;
const STANDARD_DELIVERY_FEE = 70;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('naik_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem('naik_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('naik_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('naik_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('naik_coupon');
    }
  }, [coupon]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item._id === product._id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            _id: product._id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            mrp: product.mrp,
            thumbnail: product.thumbnail,
            weight: product.weight,
            category: product.category,
            quantity
          }
        ];
      }
    });
    addToast(`Added ${quantity} x "${product.name}" to cart!`, 'success');
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item._id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cartItems.find((i) => i._id === productId);
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.name}" from cart.`, 'info');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const applyCoupon = async (code) => {
    try {
      const result = await validateCouponAPI(code, subtotal);
      setCoupon(result);
      addToast(result.message, 'success');
      return result;
    } catch (error) {
      addToast(error.message || 'Invalid coupon code', 'error');
      throw error;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalMrp = cartItems.reduce((acc, item) => acc + (item.mrp || item.price) * item.quantity, 0);
  const totalSavings = Math.max(0, totalMrp - subtotal);
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const isFreeDeliveryUnlocked = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryCharge = subtotal > 0 && !isFreeDeliveryUnlocked ? STANDARD_DELIVERY_FEE : 0;
  const discountAmount = coupon ? coupon.calculatedDiscount : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryCharge);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        coupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        totalMrp,
        totalSavings,
        freeDeliveryProgress,
        remainingForFreeDelivery,
        isFreeDeliveryUnlocked,
        deliveryCharge,
        discountAmount,
        totalAmount,
        totalItemCount,
        FREE_DELIVERY_THRESHOLD
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
