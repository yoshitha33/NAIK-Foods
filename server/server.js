import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import giftBoxRoutes from './routes/giftBoxRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import couponRoutes from './routes/couponRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database connection helper
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/naik_foods';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully for Naik Foods'))
  .catch((err) => console.warn('MongoDB connection notice: Running with in-memory / fallback data mode if DB unvailable.', err.message));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/gift-boxes', giftBoxRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/coupons', couponRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    brand: 'Naik Foods — Authentic Maharashtra. Delivered to Your Door.',
    timestamp: new Date()
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Naik Foods REST API server running on port ${PORT}`);
});
