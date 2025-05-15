// import { Schema, model, Types } from 'mongoose';

// const OrderSchema = new Schema({
//   user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [
//     {
//       menu_item_id: { type: Types.ObjectId, ref: 'MenuItem', required: true },
//       quantity: { type: Number, required: true },
//       price_at_order: { type: Number, required: true },
//     },
//   ],
//   total_price: { type: Number, required: true },
//   status: {
//     type: String,
//     enum: ['pending', 'confirmed', 'completed', 'cancelled'],
//     default: 'pending',
//   },
//   created_at: { type: Date, default: Date.now },
//   updated_at: { type: Date, default: Date.now },
// });

// export default model('Order', OrderSchema);
import express from 'express';
import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

router.post('/orders', async (req, res) => {
  const { user_id, items, total_price } = req.body;

  // 基本校验
  if (!user_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Missing user_id or items' });
  }

  if (typeof total_price !== 'number' || total_price <= 0) {
    return res.status(400).json({ message: 'Invalid total_price' });
  }

  // 校验每个 menu_item_id 是否存在
  for (const item of items) {
    if (!item.menu_item_id || !item.quantity || !item.price_at_order) {
      return res.status(400).json({ message: 'Each item must have menu_item_id, quantity, and price_at_order' });
    }

    const exists = await MenuItem.exists({ _id: item.menu_item_id });
    if (!exists) {
      return res.status(404).json({ message: `Menu item not found: ${item.menu_item_id}` });
    }
  }

  try {
    const newOrder = new Order({
      user_id,
      items,
      total_price,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
});

export default router;
