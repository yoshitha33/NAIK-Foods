import express from 'express';
import {
  getProducts,
  searchSuggestions,
  getProductBySlug,
  getRecommendations
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/search/suggestions', searchSuggestions);
router.get('/recommendations/:productId', getRecommendations);
router.get('/:slug', getProductBySlug);

export default router;
