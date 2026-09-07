import mongoose from 'mongoose';

const giftBoxSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  includedItems: [{ type: String, required: true }],
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  images: [{ type: String, required: true }],
  thumbnail: { type: String, required: true },
  festival: { type: String, default: 'General' }, // Diwali, Ganesh Chaturthi, Corporate, Gudi Padwa
  itemCount: { type: Number, required: true },
  stock: { type: Number, default: 25 },
  isFeatured: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('GiftBox', giftBoxSchema);
