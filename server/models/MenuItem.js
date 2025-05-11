import { Schema, model, Types } from 'mongoose';

const menuItemSchema = new Schema({
  itemCode: { type: String, required: true, unique: true },
  nameCn: { type: String, required: true },
  nameEn: { type: String, required: true },
  packageSize: { type: Number, default: 1 },
  packageUnit: { type: String, default: 'pcs' },
  price: { type: Number, required: true },
  currency: { type: String, default: 'AUD' },
  description: String,
  ingredients: String,
  tags: [String],
  spiceLevel: Number,
  available: Boolean,
  image: String,
  category: {
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

export default model('MenuItem', menuItemSchema);
