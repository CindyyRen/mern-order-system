import { Schema, model, Types } from 'mongoose';

const OrderSchema = new Schema({
  // user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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


// const OrderSchema = new Schema({
//   items: [...],                // 如你所写
//   total_price: Number,
//   status: { type: String, enum: [...], default: 'pending' },
//   order_number: { type: String, unique: true },
//   customer_info: {
//     name: String,
//     phone: String,
//     tableNumber: String
//   },
//   source: String,
//   payment: {
//     method: String,
//     paid: Boolean
//   },
//   created_at: { type: Date, default: Date.now },
//   updated_at: { type: Date, default: Date.now },
// });
// payment: {
//   method: { type: String, enum: ['cash', 'card', 'google_pay', 'wechat'], default: 'cash' },
//   paid: { type: Boolean, default: false }
// }
// status: [
//   'pending',         // 客户刚下单
//   'accepted',        // 商家已接单
//   'in_kitchen',      // 厨房准备中
//   'ready',           // 可取餐
//   'completed',       // 已完成
//   'cancelled'        // 被取消
// ]
// order_number: {
//   type: String,
//   unique: true,
//   default: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
// }
