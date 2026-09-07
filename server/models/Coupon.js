import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountAmount: { type: Number, required: true }, // e.g. 10 for 10% or 100 for ₹100
  minOrder: { type: Number, default: 0 },
  maxDiscount: { type: Number, default: 500 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);
