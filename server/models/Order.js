import mongoose from 'mongoose';
const { Schema } = mongoose;
import { generateOrderNumber } from '../utils/generateOrderNumber.js';

// ========== 1. OrderSchema 结构 ==========
const OrderSchema = new Schema({
  items: [
    {
      menu_item_id: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
      special_instructions: String,
      subtotal: { type: Number, required: true },
    },
  ],
  subtotal: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  service_fee: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total_price: { type: Number, required: true },

  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },

  order_number: {
    type: String,
    unique: true,
    default: generateOrderNumber,
  },
  placed_by_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null, // null表示顾客自己下单
  },

  cancelled_by_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  customer_info: {
    name: { type: String }, // 可选
    phone: { type: String }, // 可选
    table_number: String,
    email: String,
    is_guest: { type: Boolean, default: true },
  },

  source: {
    type: String,
    enum: [
      'customer_web', // 顾客自己扫码
      'staff_web', // 店员店内点单（面对面服务）
      'phone_order', // 顾客打电话下单（店员代点）
      'uber_eats',
      'doordash',
      'panda',
      'menulog',
    ],
    required: true,
  },

  dining_type: {
    type: String,
    enum: ['dine_in', 'takeaway', 'delivery'],
    required: true,
  },

  placed_by: {
    type: String,
    enum: ['customer', 'staff'],
    required: true,
  },

  delivery_info: {
    address: String,
    delivery_fee: { type: Number, default: 0 },
    estimated_time: Date,
    delivery_notes: String,
  },

  payment: {
    method: {
      type: String,
      enum: ['cash', 'google_pay', 'tyro', 'apple_pay'],
      default: 'tyro',
    },
    paid: { type: Boolean, default: false },
    paid_at: Date,
    transaction_id: String,
    amount_paid: Number,
  },

  estimated_ready_time: Date,
  accepted_at: Date,
  ready_at: Date,
  completed_at: Date,
  cancelled_at: Date,
  cancellation_reason: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

  notes: String,
  customer_notes: String,
});

// ========== 2. 索引 ==========
// OrderSchema.index({ order_number: 1 }, { unique: true });
OrderSchema.index({ status: 1 });
OrderSchema.index({ created_at: -1 });
OrderSchema.index({ 'customer_info.phone': 1 });

// ========== 3. 钩子 ==========
OrderSchema.pre('save', function (next) {
  this.calculateTotal();
  this.updated_at = new Date();
  next();
});

// ========== 4. 虚拟字段 ==========
OrderSchema.virtual('summary').get(function () {
  return `订单 ${this.order_number} - ${this.items.length} 项 - ¥${this.total_price}`;
});

// ========== 5. 实例方法 ==========
OrderSchema.methods.calculateTotal = function () {
  this.subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
  this.total_price =
    this.subtotal + this.tax + this.service_fee - this.discount;

  if (this.dining_type === 'delivery' && this.delivery_info?.delivery_fee) {
    this.total_price += this.delivery_info.delivery_fee;
  }
};

// ========== 6. 静态方法 ==========
OrderSchema.statics.getTodayStats = function () {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  return this.aggregate([
    { $match: { created_at: { $gte: startOfDay } } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        total_revenue: { $sum: '$total_price' },
      },
    },
  ]);
};

// ========== 7. 模型导出 ==========
export default mongoose.model('Order', OrderSchema);
