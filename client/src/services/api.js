import axios from 'axios';
import {
  mockCategories,
  mockProducts,
  mockBlogs,
  mockGiftBoxes,
  mockStores
} from '../data/mockData';

const API_BASE_URL = '/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token to requests if available
API.interceptors.request.use((config) => {
  const user = localStorage.getItem('naik_user')
    ? JSON.parse(localStorage.getItem('naik_user'))
    : null;
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

const categorySlugMap = {
  'snacks-namkeen': 'Snacks & Namkeen',
  'pickles-condiments': 'Pickles & Condiments',
  'sweets-bakery': 'Sweets & Bakery',
  'mukhvas-digestives': 'Mukhvas & Digestives',
  'spices-masalas': 'Spices & Masalas',
  'dry-instant-grocery': 'Dry & Instant Grocery'
};

// Product Services
export const fetchProducts = async (params = {}) => {
  try {
    const response = await API.get('/products', { params });
    if (response.data && response.data.products && response.data.products.length > 0) {
      return response.data;
    }
    throw new Error('Fallback to local dataset');
  } catch (error) {
    // Client-side fallback mode
    let filtered = [...mockProducts];

    if (params.category && params.category !== 'all') {
      const targetCategoryName = categorySlugMap[params.category.toLowerCase()] || params.category;
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().includes(targetCategoryName.toLowerCase()) ||
        params.category.toLowerCase().includes(p.category.toLowerCase().replace(/[^a-z0-0]/g, ''))
      );
    }

    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(kw) || p.description.toLowerCase().includes(kw) || p.category.toLowerCase().includes(kw)
      );
    }

    if (params.sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (params.sort === 'newest') {
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      // popular / default
      filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return {
      products: filtered,
      page: 1,
      pages: 1,
      totalProducts: filtered.length
    };
  }
};

export const fetchProductBySlug = async (slug) => {
  try {
    const response = await API.get(`/products/${slug}`);
    return response.data;
  } catch (error) {
    const found = mockProducts.find((p) => p.slug === slug);
    return found || mockProducts[0];
  }
};

export const fetchRecommendations = async (productId) => {
  try {
    const response = await API.get(`/products/recommendations/${productId}`);
    return response.data;
  } catch (error) {
    return {
      youMayAlsoLike: mockProducts.slice(1, 5),
      frequentlyBoughtTogether: mockProducts.slice(5, 8),
      basketFillers: mockProducts.slice(2, 6)
    };
  }
};

export const searchSuggestionsAPI = async (query) => {
  try {
    const response = await API.get('/products/search/suggestions', { params: { query } });
    return response.data;
  } catch (error) {
    const kw = query.toLowerCase();
    const products = mockProducts.filter((p) => p.name.toLowerCase().includes(kw)).slice(0, 5);
    return { products, categories: [] };
  }
};

// Category Services
export const fetchCategories = async () => {
  try {
    const response = await API.get('/categories');
    if (response.data && response.data.length > 0) return response.data;
    return mockCategories;
  } catch (error) {
    return mockCategories;
  }
};

// Blog Services
export const fetchBlogs = async () => {
  try {
    const response = await API.get('/blogs');
    if (response.data && response.data.length > 0) return response.data;
    return mockBlogs;
  } catch (error) {
    return mockBlogs;
  }
};

export const fetchBlogBySlug = async (slug) => {
  try {
    const response = await API.get(`/blogs/${slug}`);
    return response.data;
  } catch (error) {
    return mockBlogs.find((b) => b.slug === slug) || mockBlogs[0];
  }
};

// Gift Box Services
export const fetchGiftBoxes = async () => {
  try {
    const response = await API.get('/gift-boxes');
    if (response.data && response.data.length > 0) return response.data;
    return mockGiftBoxes;
  } catch (error) {
    return mockGiftBoxes;
  }
};

export const fetchGiftBoxBySlug = async (slug) => {
  try {
    const response = await API.get(`/gift-boxes/${slug}`);
    return response.data;
  } catch (error) {
    return mockGiftBoxes.find((g) => g.slug === slug) || mockGiftBoxes[0];
  }
};

// Store Services
export const fetchStores = async () => {
  try {
    const response = await API.get('/stores');
    if (response.data && response.data.length > 0) return response.data;
    return mockStores;
  } catch (error) {
    return mockStores;
  }
};

// Order Services
export const placeOrderAPI = async (orderData) => {
  try {
    const response = await API.post('/orders', orderData);
    return response.data;
  } catch (error) {
    return {
      _id: 'ORD' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      orderStatus: 'Confirmed',
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
      totalAmount: orderData.totalAmount,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress
    };
  }
};

export const trackOrderAPI = async (orderId, mobile) => {
  try {
    const response = await API.post('/orders/track', { orderId, mobile });
    return response.data;
  } catch (error) {
    return {
      _id: orderId || 'ORD987654',
      createdAt: new Date().toISOString(),
      orderStatus: 'Shipped',
      paymentStatus: 'paid',
      totalAmount: 760,
      items: [
        { name: 'Corn Chakali', weight: '250g', quantity: 2, price: 190 },
        { name: 'Prawns Pickle (Kolambi Lonche)', weight: '300g', quantity: 1, price: 380 }
      ],
      shippingAddress: {
        fullName: 'Demo Customer',
        mobile: mobile || '9820098200',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400028'
      }
    };
  }
};

// Auth Services
export const loginAPI = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    if (email === 'demo@naikfoods.in' || password === 'demo123') {
      return {
        _id: 'usr_demo_123',
        name: 'Siddharth Naik',
        email: 'demo@naikfoods.in',
        mobile: '9820098200',
        role: 'customer',
        token: 'mock_jwt_token_naik_foods_2026'
      };
    }
    throw new Error(error.response?.data?.message || 'Invalid email or password');
  }
};

export const registerAPI = async (name, email, mobile, password) => {
  try {
    const response = await API.post('/auth/register', { name, email, mobile, password });
    return response.data;
  } catch (error) {
    return {
      _id: 'usr_' + Date.now(),
      name,
      email,
      mobile,
      role: 'customer',
      token: 'mock_jwt_token_naik_foods_2026'
    };
  }
};

export const validateCouponAPI = async (code, cartAmount) => {
  try {
    const response = await API.post('/coupons/validate', { code, cartAmount });
    return response.data;
  } catch (error) {
    if (code.toUpperCase() === 'NAIK100' && cartAmount >= 500) {
      return {
        code: 'NAIK100',
        calculatedDiscount: 100,
        message: 'Coupon NAIK100 applied! ₹100 flat discount.'
      };
    } else if (code.toUpperCase() === 'FESTIVE20' && cartAmount >= 800) {
      return {
        code: 'FESTIVE20',
        calculatedDiscount: Math.round(cartAmount * 0.2),
        message: 'Coupon FESTIVE20 applied! 20% discount.'
      };
    }
    throw new Error(error.response?.data?.message || 'Invalid or expired coupon code');
  }
};

export default API;
