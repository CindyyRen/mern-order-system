// routes/exportOrders.js
import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

router.get('/export', async (req, res) => {
  try {
    const orders = await Order.find({}).lean(); // lean() 返回普通对象，更适合 JSON
    res.setHeader('Content-Disposition', 'attachment; filename="orders.json"'); // 浏览器下载
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to export orders', error: err });
  }
});

export default router;
