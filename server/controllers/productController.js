import Product from '../models/Product.js';

// Get products with query parameters (search, category, min/max price, sort, pagination)
export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 12;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
            { category: { $regex: req.query.keyword, $options: 'i' } },
            { tags: { $regex: req.query.keyword, $options: 'i' } }
          ]
        }
      : {};

    const category = req.query.category && req.query.category !== 'all'
      ? { category: { $regex: new RegExp(`^${req.query.category}$`, 'i') } }
      : {};

    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || 10000;
    const priceFilter = { price: { $gte: minPrice, $lte: maxPrice } };

    const filter = { ...keyword, ...category, ...priceFilter };

    // Sorting options
    let sort = {};
    if (req.query.sort === 'price-low') {
      sort = { price: 1 };
    } else if (req.query.sort === 'price-high') {
      sort = { price: -1 };
    } else if (req.query.sort === 'rating') {
      sort = { rating: -1 };
    } else if (req.query.sort === 'newest') {
      sort = { createdAt: -1 };
    } else if (req.query.sort === 'discount') {
      sort = { discount: -1 };
    } else {
      // Default: best seller / popular
      sort = { isBestSeller: -1, rating: -1 };
    }

    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search suggestions for predictive search
export const searchSuggestions = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim().length === 0) {
      return res.json({ products: [], categories: [] });
    }

    const regex = new RegExp(query, 'i');
    const products = await Product.find({
      $or: [{ name: regex }, { tags: regex }]
    })
      .select('name slug price thumbnail weight category')
      .limit(6);

    const categories = await Product.distinct('category', { category: regex });

    res.json({ products, categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product by slug
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Smart Rule-based Recommendation Engine
export const getRecommendations = async (req, res) => {
  try {
    const { productId } = req.params;
    const currentProduct = await Product.findById(productId);

    if (!currentProduct) {
      // Return featured items fallback
      const featured = await Product.find({ isFeatured: true }).limit(4);
      return res.json({
        youMayAlsoLike: featured,
        frequentlyBoughtTogether: featured.slice(0, 2),
        basketFillers: []
      });
    }

    // 1. You May Also Like (Same category excluding current)
    const youMayAlsoLike = await Product.find({
      category: currentProduct.category,
      _id: { $ne: currentProduct._id }
    }).limit(4);

    // 2. Frequently Bought Together (Complementary items like Mukhvas, Masala, Tea/Beverage)
    const frequentlyBoughtTogether = await Product.find({
      _id: { $ne: currentProduct._id },
      $or: [
        { category: 'Mukhvas & Digestives' },
        { category: 'Spices & Masalas' },
        { category: 'Snacks & Namkeen' }
      ]
    }).limit(3);

    // 3. Basket Fillers (Products between ₹80 - ₹250 to help user reach ₹999 free shipping)
    const basketFillers = await Product.find({
      _id: { $ne: currentProduct._id },
      price: { $gte: 80, $lte: 250 }
    }).limit(4);

    res.json({
      youMayAlsoLike,
      frequentlyBoughtTogether,
      basketFillers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
