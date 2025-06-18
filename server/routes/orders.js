
import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      items = [],
      customer_info = {},
      source,
      placed_by,
      placed_by_user, // ObjectId or null
      tax = 0,
      service_fee = 0,
      discount = 0,
      dining_type,
      delivery_info = {},
      payment = {},
      notes,
      customer_notes,
    } = req.body;

    // ===== 校验逻辑 =====
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: '订单不能为空' });
    }

    if (!['customer', 'staff'].includes(placed_by)) {
      return res.status(400).json({ message: '下单来源不合法' });
    }

    if (!['customer_web', 'staff_web', 'phone_order', 'uber_eats', 'doordash', 'panda', 'menulog'].includes(source)) {
      return res.status(400).json({ message: '订单来源不合法' });
    }

    if (!['dine_in', 'takeaway', 'delivery'].includes(dining_type)) {
      return res.status(400).json({ message: '就餐类型不合法' });
    }

    // ===== 每个 item 自动计算 subtotal =====
    const processedItems = items.map(item => {
      const { price, quantity } = item;
      if (typeof price !== 'number' || typeof quantity !== 'number' || quantity < 1) {
        throw new Error('商品价格或数量无效');
      }

      const subtotal = price * quantity;
      return { ...item, subtotal };
    });

    // ===== 创建订单对象 =====
    const newOrder = new Order({
      items: processedItems,
      customer_info,
      source,
      placed_by,
      placed_by_user: placed_by === 'staff' ? placed_by_user : null,
      tax,
      service_fee,
      discount,
      dining_type,
      delivery_info,
      payment,
      notes,
      customer_notes,
    });

    newOrder.calculateTotal(); // 自动计算金额
    await newOrder.save();

    return res.status(201).json({
      message: '订单创建成功',
      order: newOrder,
    });
  } catch (error) {
    console.error('订单创建失败:', error);
    return res.status(500).json({
      message: '服务器错误',
      error: error.message,
    });
  }
});

export default router;
