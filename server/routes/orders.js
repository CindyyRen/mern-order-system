import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // 你可以添加分页和排序逻辑，防止数据量太大
    const orders = await Order.find()
      .sort({ created_at: -1 }) // 最新订单优先
      .limit(100); // 限制最多返回100条，后续可改成分页
    // .populate('placed_by_user', 'name email'); // 如果你User有name email字段

    res.json({ orders });
  } catch (error) {
    console.error('获取订单失败:', error);
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

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

    if (
      ![
        'customer_web',
        'staff_web',
        'phone_order',
        'uber_eats',
        'doordash',
        'panda',
        'menulog',
      ].includes(source)
    ) {
      return res.status(400).json({ message: '订单来源不合法' });
    }

    if (!['dine_in', 'takeaway', 'delivery'].includes(dining_type)) {
      return res.status(400).json({ message: '就餐类型不合法' });
    }

    // ===== 每个 item 自动计算 subtotal =====
    const processedItems = items.map((item) => {
      const { price, quantity } = item;
      if (
        typeof price !== 'number' ||
        typeof quantity !== 'number' ||
        quantity < 1
      ) {
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
// 👇 添加到 order routes 中
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const allowedFields = ['status', 'remarks', 'dining_type'];
    const updateData = {};

    // 只允许更新指定字段
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    });

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: '订单未找到' });
    }

    return res.json(updatedOrder);
  } catch (error) {
    console.error('更新订单失败:', error);
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

export default router;
