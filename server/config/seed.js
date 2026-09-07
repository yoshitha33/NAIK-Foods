import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Blog from '../models/Blog.js';
import GiftBox from '../models/GiftBox.js';
import Store from '../models/Store.js';
import Coupon from '../models/Coupon.js';
import User from '../models/User.js';

import {
  sampleCategories,
  sampleProducts,
  sampleBlogs,
  sampleGiftBoxes,
  sampleStores,
  sampleCoupons
} from './seedData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/naik_foods';
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing collections...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Blog.deleteMany({});
    await GiftBox.deleteMany({});
    await Store.deleteMany({});
    await Coupon.deleteMany({});

    console.log('Inserting Categories...');
    await Category.insertMany(sampleCategories);

    console.log('Inserting Products...');
    await Product.insertMany(sampleProducts);

    console.log('Inserting Blogs...');
    await Blog.insertMany(sampleBlogs);

    console.log('Inserting Gift Boxes...');
    await GiftBox.insertMany(sampleGiftBoxes);

    console.log('Inserting Stores...');
    await Store.insertMany(sampleStores);

    console.log('Inserting Coupons...');
    await Coupon.insertMany(sampleCoupons);

    // Create Demo Customer User if not exists
    const demoUser = await User.findOne({ email: 'demo@naikfoods.in' });
    if (!demoUser) {
      console.log('Creating Demo User Account (demo@naikfoods.in / demo123)...');
      await User.create({
        name: 'Siddharth Naik',
        email: 'demo@naikfoods.in',
        mobile: '9820098200',
        password: 'demo123',
        role: 'customer',
        addresses: [
          {
            fullName: 'Siddharth Naik',
            mobile: '9820098200',
            addressLine1: 'Flat 402, Shivneri Apartments, Ranade Road',
            addressLine2: 'Near Shivaji Park',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400028',
            isDefault: true
          }
        ]
      });
    }

    console.log('Database seeded successfully with Naik Foods authentic regional food dataset!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
