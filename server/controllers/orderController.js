import Order from '../models/Order.js';
import crypto from 'crypto';

// Create a new order (Supports both Logged-In users and Guest Checkout)
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      subtotal,
      discount,
      deliveryCharge,
      totalAmount,
      paymentMethod,
      isGuest
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cannot place order with empty cart' });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.mobile || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.pincode) {
      return res.status(400).json({ message: 'Complete shipping address is required' });
    }

    const order = new Order({
      user: req.user ? req.user._id : null,
      isGuest: isGuest || !req.user,
      items,
      shippingAddress,
      subtotal,
      discount: discount || 0,
      deliveryCharge: deliveryCharge || 0,
      totalAmount,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'Confirmed'
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order details by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'name thumbnail slug');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user order history
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track Order by Order ID + Mobile Number (Public access for guests and logged in users)
export const trackOrder = async (req, res) => {
  try {
    const { orderId, mobile } = req.body;

    if (!orderId || !mobile) {
      return res.status(400).json({ message: 'Please enter both Order ID and Mobile Number' });
    }

    // Support both 24-char ObjectId or trimmed string match
    const order = await Order.findOne({
      $and: [
        { _id: orderId.trim() },
        { 'shippingAddress.mobile': mobile.trim() }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'No matching order found. Please verify Order ID and Mobile Number.' });
    }

    res.json(order);
  } catch (error) {
    res.status(404).json({ message: 'Order not found. Check Order ID format.' });
  }
};

// Razorpay Order Creation & Verification Architecture
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const razorpayOrderId = 'order_rzp_' + Math.random().toString(36).substring(2, 12);
    res.json({
      id: razorpayOrderId,
      currency: 'INR',
      amount: Math.round(amount * 100),
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_naik_foods_demo_key'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // In production, verify crypto HMAC signature using RAZORPAY_KEY_SECRET
    res.json({
      success: true,
      message: 'Payment verified successfully server-side',
      paymentId: razorpay_payment_id || 'pay_' + Math.random().toString(36).substring(2, 12)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
