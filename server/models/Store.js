import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, default: 'Maharashtra' },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
  openingHours: { type: String, default: '9:00 AM - 9:00 PM (Mon-Sun)' },
  image: { type: String, required: true },
  mapUrl: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Store', storeSchema);
