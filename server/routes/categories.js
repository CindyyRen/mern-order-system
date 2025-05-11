import express from 'express';
import Category from '../models/MenuCategory.js';

const router = express.Router();

// 获取分类列表
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
});

export default router;
