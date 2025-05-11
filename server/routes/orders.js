import express from 'express';
import Order from '../models/Order.js'; // 假设你有一个 Order 模型

const router = express.Router();

// 创建新订单
router.post('/orders', async (req, res) => {
  const { items, totalPrice, userId } = req.body;

  try {
    const newOrder = new Order({ items, totalPrice, userId });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
});

export default router;