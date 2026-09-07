import express from 'express';
import { getGiftBoxes, getGiftBoxBySlug } from '../controllers/giftBoxController.js';

const router = express.Router();
router.get('/', getGiftBoxes);
router.get('/:slug', getGiftBoxBySlug);

export default router;
