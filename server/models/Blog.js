import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, required: true },
  category: { type: String, required: true }, // Recipes, Stories, Guides, Festival
  author: { type: String, default: 'Naik Foods Heritage Culinary Team' },
  readTime: { type: String, default: '4 min read' },
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  tags: [{ type: String }],
  seoTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
