import express from 'express';
import {
  processPayment,
  confirmManualPayment,
} from '../services/paymentService.js';

const router = express.Router();

// ⛳ 客户端发起支付请求
router.post('/:orderId/payment', async (req, res) => {
  try {
    const result = await processPayment(req.params.orderId, req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ⛳ 商家确认 Tyro 或 现金支付
router.post('/:orderId/payment/confirm', async (req, res) => {
  try {
    const result = await confirmManualPayment(req.params.orderId, req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
