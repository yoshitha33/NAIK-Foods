import GiftBox from '../models/GiftBox.js';

export const getGiftBoxes = async (req, res) => {
  try {
    const giftBoxes = await GiftBox.find({});
    res.json(giftBoxes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGiftBoxBySlug = async (req, res) => {
  try {
    const giftBox = await GiftBox.findOne({ slug: req.params.slug });
    if (!giftBox) {
      return res.status(404).json({ message: 'Gift box not found' });
    }
    res.json(giftBox);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
