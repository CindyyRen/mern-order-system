import { Schema, model, Types } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       properties:
 *         itemCode:
 *           type: string
 *         nameCn:
 *           type: string
 *         nameEn:
 *           type: string
 *         packageSize:
 *           type: integer
 *         packageUnit:
 *           type: string
 *         price:
 *           type: number
 *         currency:
 *           type: string
 *         description:
 *           type: string
 *         ingredients:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         spiceLevel:
 *           type: integer
 *         available:
 *           type: boolean
 *         image:
 *           type: string
 *         category:
 *           type: string
 */

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
