import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  category: { type: String, required: true, index: true },
  subcategory: { type: String, default: '' },
  brand: { type: String, default: 'Naik Foods' },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  weight: { type: String, required: true }, // e.g. "250g", "500g", "1kg"
  images: [{ type: String, required: true }],
  thumbnail: { type: String, required: true },
  stock: { type: Number, required: true, default: 50 },
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 34 },
  ingredients: [{ type: String }],
  nutritionInfo: {
    calories: { type: String, default: '450 kcal' },
    protein: { type: String, default: '8.5g' },
    carbs: { type: String, default: '62g' },
    fat: { type: String, default: '18g' },
    fiber: { type: String, default: '4.2g' }
  },
  usageInstructions: { type: String, default: 'Ready to eat snack or accompany with tea / meals.' },
  storageInstructions: { type: String, default: 'Store in a cool, dry place. Keep in airtight container after opening.' },
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  festival: { type: String, default: '' } // e.g., 'diwali', 'ganesh-chaturthi'
}, { timestamps: true });

// Text index for search
productSchema.index({ name: 'text', description: 'text', category: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);
