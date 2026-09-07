import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  trackOrder,
  createRazorpayOrder,
  verifyPayment
} from '../controllers/orderController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuth, createOrder);
router.get('/myorders', protect, getMyOrders);
router.post('/track', trackOrder);
router.post('/create-razorpay-order', createRazorpayOrder);
router.post('/verify-payment', verifyPayment);
router.get('/:id', getOrderById);

export default router;
