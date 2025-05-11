import { Schema, model, Types } from 'mongoose';

const OrderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      menu_item_id: { type: Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, required: true },
      price_at_order: { type: Number, required: true },
    },
  ],
  total_price: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default model('Order', OrderSchema);
